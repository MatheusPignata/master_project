import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Style from "./style";
import GStyle from "../global/style/style.js";
import { StatusBar } from 'expo-status-bar';
import md5 from "../global/script/md5.js";

export default function ResetSenha({navigation, route}){
    
    const {id} = route.params
    const [getSenha, setSenha] = React.useState("");
    const [getSenha2, setSenha2] = React.useState("");

    const json = [
        {text:"Senha", acao: (value)=>{setSenha(value)}, value: getSenha,},
        {text:"Conf. Senha", acao: (value)=>{setSenha2(value)}, value: getSenha2,},
    ];

    function changepass(){
        if(getSenha === getSenha2){
            async function put(){
                let settings = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({senha: md5(getSenha), resetsenha: false})
                }
                let item = await fetch(`http://192.168.0.102:3000/usuario/${id}`, settings);
                let resp = await item.json();
                return resp;
            }
            put().then(resp=>{
                if(resp[0].id!=undefined){
                    alert(`Senha alterada com sucesso`);
                    setTimeout(()=>{
                        navigation.navigate('Login');
                    }, 2000);
                }else{
                    alert(`Não foi possivel alterar a senha`);
                }
            })
        }else{
            
        }
    }

    return(
        <View style={Style.page}>
            <StatusBar hidden={true} />
            <View style={GStyle.header}>
                <Image style={GStyle.image} source={require('../global/assets/logo.png')}/>
            </View>
            <View style={Style.container}>
                <Text style={Style.text}>Resetar Senha</Text>
                <View>
                    {
                        json.map((e,index)=>{
                            let [getStyle, setStyle] = React.useState(GStyle.input);
                            return(<TextInput style={getStyle} key={index} placeholderTextColor="#000" onFocus={()=>{setStyle(GStyle.inputFocus)}} onBlur={()=>{setStyle(GStyle.input)}} onChangeText={(element)=>{e.acao(element)}} placeholder={e.text} secureTextEntry={true} value={e.value}></TextInput>);
                        })
                    }
                </View>
                <TouchableOpacity style={GStyle.button} onPress={()=>{changepass()}}><Text style={GStyle.textButton}>Salvar</Text></TouchableOpacity>
            </View>
        </View>
    );
}