import React from "react";
import GStyle from "../global/style/style.js";
import Style from "./style.js";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaskInput from "react-native-mask-input";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserPage({navigator, route}){
    const {nome, cpf, email, telefone, foto, id} = route.params
    const [cpfIcon, setCpfIcon] = React.useState({num:1, icons: ["eye","eye-off"]})
    const [getCpf, setCpf] = React.useState("***.***.***-**")
    const [getEmail, setEmail] = React.useState(email);
    const [getTelefone, setTelefone] = React.useState(telefone);

    const json = [
        {text:"Email", value: getEmail, acao: (value)=>{setEmail(value)}},
        {text:"Telefone" , value: getTelefone, acao: (value)=>{setTelefone(value)}, mask: ["(", /\d/, /\d/, ")", ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    ]

    const alterar = () => {
        let alt = {
            email: getEmail,
            telfone: getTelefone,
        }
        async function alterarInfo(){
            let settings = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(alt)
            }
            let info = await fetch(`http://192.168.0.102:3000/usuario/${id}`, settings);
            let resp = info.json();
            return resp;
        }
        alterarInfo().then(resp=>{
            if(resp[0].id != undefined){
                alert("Informações alteradas com sucesso");
            }else{
                alert("Não foi possivel alterar as informações");
            }
        })
    }

    
    return(
        <View style={Style.page}>
            <StatusBar hidden={true} />
            <View style={GStyle.header}>
                <Image style={GStyle.image} source={require('../global/assets/logo.png')}/>
            </View>
            <ScrollView>
                <Image style={Style.Img} source={{uri: foto}}/>
                <View style={Style.backInfo}>
                    <Text style={Style.nome}>{nome}</Text>
                    <View style={Style.cpf}>
                        <Text style={Style.cpfText}> CPF </Text>
                        <View style={Style.cpfView}>
                            <MaterialCommunityIcons name={cpfIcon.icons[cpfIcon.num]}
                            style={{marginRight: 15}}
                            onPress={()=>{
                                if(cpfIcon.num == 0){
                                    setCpfIcon({num:1, icons: ["eye","eye-off"]});
                                    setCpf("***.***.***-**");
                                }else{
                                    setCpfIcon({num:0, icons: ["eye","eye-off"]});
                                    setCpf(cpf);
                                }
                            }} color={"#000"} size={20} />
                            <Text style={Style.cpfInfo}> {getCpf} </Text>
                        </View>
                    </View>
                    <View style={Style.form}>
                        <Text style={Style.altInfoText}>Alterar Informações</Text>
                        {
                            json.map((e,index)=>{
                                let [getStyle, setStyle] = React.useState(GStyle.input);
                                return(<MaskInput key={index} style={getStyle} placeholderTextColor="#000" onFocus={()=>{setStyle(GStyle.inputFocus)}} onBlur={()=>{setStyle(GStyle.input)}} placeholder={e.text} value={e.value} onChangeText={(element)=>{e.acao(element)}} mask={e.mask}></MaskInput>)
                            })
                        }
                    </View>
                    <TouchableOpacity style={Style.button}><Text style={Style.textButton} onPress={()=>{alterar()}}>Alterar informações</Text></TouchableOpacity>
                </View>
            </ScrollView> 
        </View>
    );
}