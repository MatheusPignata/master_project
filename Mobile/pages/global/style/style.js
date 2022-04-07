import { StyleSheet } from "react-native";
export default StyleSheet.create({
    header:{
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: "#F00",
        height: 60,
    },
    image: {
        marginLeft: 15,
        width: 160,
        height: 40,
    },
    input: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: "#FFF",
        borderColor: "#F00",
        borderBottomWidth: 2,
        fontSize:25,
        padding: 10,
        margin: 10,
    },
    inputFocus: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: "#FFF",
        borderColor: "#F00",
        borderWidth: 2,
        fontSize:25,
        padding: 10,
        margin: 10,
    },
    button: {
        backgroundColor: "#F00",
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        color: "#FFF",
        width: 200,
        padding: 10,
        alignSelf:'center',
        marginTop: 40,
        marginBottom: 30
    },
    textButton: {
        fontSize: 40,
        color: "#FFF",
    }
})