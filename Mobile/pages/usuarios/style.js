import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    page:{
        backgroundColor: "#FFF",
        flex: 1
    },
    userText: {
        textAlign: 'center',
        fontSize:70,
        color: "#F00",
        textShadowColor: "rgba(0,0,0,0.2)",
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 10,
        marginBottom: 40
    },
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    containerBlack: {
        backgroundColor: "#e7e7e7",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    botaoReset: {
        backgroundColor: "#F00",
        height: "100%",
    },
    textReset:{
        color: "#FFF",
        fontSize: 15,
        padding: 7
    },
    nome: {
        width: 150,
        textAlign: "center",
    },
    
})