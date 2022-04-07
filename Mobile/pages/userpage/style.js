import {StyleSheet} from "react-native";
export default StyleSheet.create({
    page:{
        backgroundColor: "#FFF",
        flex: 1,
    },
    Img:{
        marginTop: 50,
        zIndex: 999,
        width:150,
        height:150,
        alignSelf: "center",
        borderWidth: 4,
        marginBottom: -40,
        borderRadius: 50
    },
    backInfo: {
        paddingTop: 40,
        paddingBottom: 50,
    },
    nome: {
        width: 350,
        fontSize: 30,
        textAlign: "center",
        marginTop: 15,
        marginBottom: 30,
        borderBottomWidth: 2 ,
        borderBottomColor: "#F00",
        alignSelf: "center"
    },
    cpf: {
        borderBottomWidth: 2,
        borderBottomColor: "#F00",
        width: 300,
        alignSelf: "center",
        marginBottom: 30,
    },
    cpfView:{
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
    },
    cpfText:{
        fontSize: 20,
        color: "#F00",
        textAlign: "left",
    },
    cpfInfo: {
        textAlign: "right",
        fontSize: 20
    },
    form: {
        width: 300,
        alignSelf: "center"
    },
    altInfoText: {
        color: "#F00",
        textAlign: "right",
        marginRight: 10,
        fontSize: 20
    },
    button: {
        backgroundColor: "#F00",
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        color: "#FFF",
        width: 230,
        padding: 10,
        alignSelf:'center',
        marginTop: 20,
    },
    textButton: {
        fontSize: 20,
        color: "#FFF",
    }
})