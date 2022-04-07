import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    text: {
        textAlign: 'center',
        fontSize:50,
        color: "#F00",
        textShadowColor: "rgba(0,0,0,0.2)",
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 10,
    }
})