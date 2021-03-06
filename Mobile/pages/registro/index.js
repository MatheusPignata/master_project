import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import GStyle from "../global/style/style.js";
import { StatusBar } from "expo-status-bar";
import md5 from "../global/script/md5.js"
import React, {useState} from "react";
import Style from "./style";
import MaskInput from "react-native-mask-input";
import {Picker} from '@react-native-picker/picker';

export default function Registro({ navigator }){

    const [getMSG, setMSG] = useState({text: "", style: Style.msgOff});
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photo,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        
        
        let item = result.uri.split(".")
        if (!result.cancelled) {
            setFoto(`data:image/${item[item.length-1]};base64,`+result.base64);
        }
    };
    
    const [getFoto, setFoto] = useState("");
    const [getCPF, setCPF] = useState("");
    const [getNome, setNome] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getTelefone, setTelefone] = useState("");
    const [getSenha, setSenha] = useState("");
    const [getSenha2, setSenha2] = useState("");
    const [getCargo, setCargo] = useState("");
 
    const items = [
        {text: "CPF" ,acao: (value)=>{setCPF(value)}, value: getCPF, mask: [/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-',/\d/, /\d/], keyboardtype:'number-pad'},
        {text: "Nome", acao: (value)=>{setNome(value)}, value: getNome},
        {text: "Email", acao: (value)=>{setEmail(value)}, value: getEmail},
        {text: "Telefone", acao: (value)=>{setTelefone(value)}, value: getTelefone, mask: ["(", /\d/, /\d/, ")", ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], keyboardtype:'number-pad'},
        {text: "Senha", acao: (value)=>{setSenha(value)}, value: getSenha, type: "pass"},
        {text: "Conf. Senha", acao: (value)=>{setSenha2(value)}, value: getSenha2, type: "pass"}
    ]

    const registrar = () => {
        if((getSenha === getSenha2 && getSenha != "" && getSenha2 != "" && getCPF != "" && getNome != "" && getEmail != "" && getTelefone != "")){
            let reg = {
                nome: getNome,
                telefone: getTelefone,
                cargo : "professor",
                email: getEmail,
                senha: md5(getSenha),
                foto: getFoto,
                cpf: getCPF,
                cargo: getCargo,
                resetsenha: false
            }
            let settings = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reg),
            }
            async function post() {
                let info = await fetch("http://192.168.0.102:3000/usuario ", settings);
                let resp = await info.json();
                return resp;
            }
            post().then(resp=>{
                if(resp.id === undefined){
                    setMSG({text: resp.msg || "Algum campo j?? existe, tente novamente.", style: Style.msg});
                    setTimeout(()=>{
                        setMSG({text: "", style: Style.msgOff});
                    },4000);
                }else{
                    setCPF("");
                    setNome("");
                    setEmail("");
                    setTelefone("");
                    setFoto("");
                    setSenha("");
                    setSenha2("");
                    setMSG({text: "Adicionado com sucesso", style: Style.msg});
                    setTimeout(()=>{
                        setMSG({text: "", style: Style.msgOff});
                        alert("Cadastrado com sucesso")
                    },4000);
                }
            })
        }else{
            setMSG({text: "Algum campo n??o est?? preencido, tente novamente.", style: Style.msg});
            setTimeout(()=>{
                setMSG({text: "", style: Style.msgOff});
            },4000);
        }
    }

    return(
        <View style={Style.page}>
            <StatusBar hidden={true} />
            <View style={GStyle.header}>
                <Image style={GStyle.image} source={require('../global/assets/logo.png')}/>
            </View>
            <ScrollView style={Style.scroll}>
                <Text style={Style.regText}>Registro</Text>
                <Text style={getMSG['style']}>{getMSG["text"]}</Text>
                {
                    items.map((e, index)=>{
                        let [getStyle, setStyle] = React.useState(GStyle.input);
                        if(e.type == "pass"){
                            return(<TextInput style={getStyle} key={index} placeholderTextColor="#000" onChangeText={(element)=>{e.acao(element)}} onFocus={()=>{setStyle(GStyle.inputFocus)}} onBlur={()=>{setStyle(GStyle.input)}} placeholder={e.text} value={e.value}  secureTextEntry={true}></TextInput>);
                        }else{
                            return(<MaskInput style={getStyle} key={index} placeholderTextColor="#000" onChangeText={(element)=>{e.acao(element)}} onFocus={()=>{setStyle(GStyle.inputFocus)}} onBlur={()=>{setStyle(GStyle.input)}} placeholder={e.text} value={e.value} mask={e.mask} keyboardType={e.keyboardtype}></MaskInput>)
                        }
                    })
                }
                <Picker style={Style.picker} selectedValue={getCargo} onValueChange={(value) => setCargo(value)}>
                    <Picker.Item label="Analista de Qualidade de Vida" value="Analista de Qualidade de Vida"/>
                    <Picker.Item label="Assistente de Apoio T??cnico" value="Assistente de Apoio T??cnico"/>
                    <Picker.Item label="Assistente de Servi??o Administrativo" value="Assistente de Servi??o Administrativo"/>
                    <Picker.Item label="Auxiliar de Manuten????o" value="Auxiliar de Manuten????o"/>
                    <Picker.Item label="Bibliotec??ria" value="Bibliotec??ria"/>
                    <Picker.Item label="Coordenador de Atividades T??cnicas" value="Coordenador de Atividades T??cnicas"/>
                    <Picker.Item label="Coordenador de Relacionamento Com a Industria" value="Coordenador de Relacionamento Com a Industria"/>
                    <Picker.Item label="Diretor de Unidade de Forma????o Profissional" value="Diretor de Unidade de Forma????o Profissional"/>
                    <Picker.Item label="Gerente Administrativo Financeiro" value="Gerente Administrativo Financeiro"/>
                    <Picker.Item label="Instrutor de Forma????o Profissional" value="Instrutor de Forma????o Profissional"/>
                    <Picker.Item label="Oficial de Manuten????o" value="Oficial de Manuten????o"/>
                    <Picker.Item label="Orientador de Pr??tica Profissional" value="Orientador de Pr??tica Profissional"/>
                    <Picker.Item label="Professor CAI e CT" value="Professor CAI e CT"/>
                </Picker>
                <TouchableOpacity style={Style.addPhoto} onPress={()=>{pickImage()}}>
                    <Text style={Style.textAddPhoto}>Escolha uma foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={GStyle.button} onPress={()=>registrar()}>
                    <Text style={GStyle.textButton}>Registrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}