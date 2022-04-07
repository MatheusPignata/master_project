import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Style from "./style";
import GStyle from "../global/style/style.js";
import { StatusBar } from "expo-status-bar";
import md5 from "../global/script/md5";
import MaskInput from "react-native-mask-input";

export default function Login({navigation}){
    
    const [getMSG, setMSG] = React.useState({text: "", style: Style.msgOff});

    const json = [
        {text:"CPF", keyboardtype: "number-pad"},
        {text:"Senha",type: "pass"},
    ];

    const [getSenha, setSenha] =  React.useState("");
    const [getCPF, setCPF] =  React.useState("");

    const logar = () => {
        let json = {
            cpf: getCPF,
            senha: md5(getSenha)
        }
        let settings = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        }
        async function post() {
            let info = await fetch("http://192.168.0.102:3000/loginmobile", settings);
            let resp = await info.json();
            return resp;
        }
        post().then(resp=>{
            if(resp.length === 1){
                if(resp[0].resetsenha == true && getSenha == "123456789"){
                    navigation.navigate('ResetSenha', resp[0]);
                }else{
                    navigation.navigate('App', resp[0]);
                }
            }else{
                setMSG({text: "CPF ou Senha incorretos", style: Style.msg});
                setTimeout(()=>{
                    setMSG({text: "", style: Style.msgOff});
                },4000);
            }
        })
    }

    return(
        <View style={Style.page}>
            <StatusBar hidden={true} />
            <View style={GStyle.header}>
                <Image style={GStyle.image} source={require('../global/assets/logo.png')}/>
            </View>
            <View style={Style.container}>
                <Text style={Style.loginText}>Login</Text>
                <View style={Style.form}>
                    {
                        json.map((e,index)=>{
                            let [getStyle, setStyle] = React.useState(GStyle.input);
                            if(e.type == "pass"){
                                return(<TextInput style={getStyle} key={index} placeholderTextColor="#000" onFocus={()=>{setStyle(GStyle.inputFocus)}} onBlur={()=>{setStyle(GStyle.input)}} onChangeText={(e)=>setSenha(e)} placeholder={e.text} secureTextEntry={true}></TextInput>);
                            }else{
                                return(<MaskInput style={getStyle} value={getCPF} key={index} placeholderTextColor="#000" onFocus={()=>{setStyle(GStyle.inputFocus)}} onBlur={()=>{setStyle(GStyle.input)}} onChangeText={(e, e2)=>{setCPF(e)}} placeholder={e.text} mask={[/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-',/\d/, /\d/]} keyboardType={e.keyboardtype}></MaskInput>)
                            }
                        })
                    }
                </View>
                <Text style={getMSG.style}>{getMSG.text}</Text>
                <TouchableOpacity style={GStyle.button} onPress={()=>logar()}>
                    <Text style={GStyle.textButton}>Logar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}