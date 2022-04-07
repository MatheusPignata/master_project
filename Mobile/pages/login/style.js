import { StyleSheet } from "react-native";
export default StyleSheet.create({
    page:{
        backgroundColor: "#FFF",
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    loginText: {
        textAlign: 'center',
        fontSize:70,
        color: "#F00",
        textShadowColor: "rgba(0,0,0,0.2)",
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 10,
    },
    form: {
        alignItems: 'center',
    },
    msg: {
        backgroundColor: "#F00",
        color: "#FFF",
        textAlign:"center",
        fontSize: 30,
        width: "90%",
        alignSelf: "center",
        padding: 10
    },
    msgOff: {
        display:'none'
    }
})