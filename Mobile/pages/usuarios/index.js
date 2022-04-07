import React from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import Style from './style.js';
import GStyle from '../global/style/style.js'

export default function Usuarios({ navigation }) {
    const [getUsers, setUsers] = React.useState([]);
    const [getPesquisa, setPesquisa] = React.useState("");
    const [getData, setData] = React.useState([]);

    function passwordReset(id, nome){
        async function put(){
            let settings = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({senha: "25f9e794323b453885f5181f1b624d0b", resetsenha: true})
            }
            let item = await fetch(`http://192.168.0.102:3000/usuario/${id}`, settings);
            let resp = await item.json();
            return resp;
        }
        put().then(resp=>{
            if(resp[0].id!=undefined){
                alert(`Senha de ${nome} foi redefinida com sucesso`)
            }else{
                alert(`Não foi possivel redefinir a senha de ${nome}`)
            }
        })
    }

    React.useEffect(()=>{
        let data = []
        getUsers.map(e=>{
            if(e.cpf.includes(getPesquisa) || e.nome.toLowerCase().includes(getPesquisa.toLowerCase())){
                data.push(e)
            }else if(getPesquisa == ""){
                setData = getUsers
            }
        })
        setData(data)
    }, [getPesquisa])

    function getUsuarios(){
        async function get(){
            let item = await fetch("http://192.168.0.102:3000/usuario");
            let resp = await item.json();
            return resp;
        }
        get().then(resp=>{
            setUsers(resp);
            setData(resp);
        })
    }
    React.useEffect(()=>{
        getUsuarios();
    },[])
    
    let container = (a, b, s, id, nome) => {
        return(
            <View style={s}>
                <Text style={Style.cpf}>{a}</Text>
                <Text style={Style.nome}>{b}</Text>
                <TouchableOpacity onPress={()=>{passwordReset(id, nome)}} style={Style.botaoReset}><Text style={Style.textReset}>Resetar Senha</Text></TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={Style.page}>
            <View style={GStyle.header}>
                <Image style={GStyle.image} source={require('../global/assets/logo.png')} />
            </View>
            <ScrollView>
                <Text style={Style.userText}>Usuarios</Text>
                <TextInput style={GStyle.input} placeholder={"Pesquisa"} placeholderTextColor="#000" onChangeText={(e)=>setPesquisa(e)}></TextInput>
                {
                    getData.map((e, index)=>{
                        if(index%2 == 0){
                            return(
                                container(e.cpf, e.nome, Style.containerBlack, e.id, e.nome)
                            );
                        }else{
                            return(
                                container(e.cpf, e.nome, Style.container, e.id, e.nome)
                            );
                        }
                    })
                }
            </ScrollView>
        </View>
    );
}