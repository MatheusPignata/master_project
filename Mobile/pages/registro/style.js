import { StyleSheet } from "react-native";
export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#fff",
    },
    regText: {
        textAlign: 'center',
        fontSize:70,
        color: "#F00",
        textShadowColor: "rgba(0,0,0,0.2)",
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 10,
        marginBottom: 30
    },
    scroll:{
        flex: 1,
    },
    textAddPhoto: {
        fontSize: 30,
        color: "#F00",
        textAlign: "center",
    },
    picker: {
        width: '80%',
        alignSelf: "center",
        padding: 10,
    },
    addPhoto: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: "#FFF",
        borderColor: "#F00",
        borderWidth: 2,
        fontSize:25,
        padding: 10,
        margin: 10
    },
    msg: {
        backgroundColor: "#F00",
        color: "#FFF",
        textAlign:"center",
        fontSize: 27,
        width: "90%",
        alignSelf: "center",
        padding: 7
    },
    msgOff: {
        display:'none'
    }
})