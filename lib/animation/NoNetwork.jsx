import LottieView from "lottie-react-native";
import React from "react";
import { StatusBar, Text, TouchableOpacity, Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const NoNetwork = () => {
    console.log("Page : NoNetwork.jsx");
    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            <LottieView source={require('../assets/NO Network.json')} autoPlay loop style={styles.animation}/>
            <TouchableOpacity onPress={() => {Linking.openSettings()}} style={styles.button}>
                <Text style={styles.text}>No Network</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default NoNetwork;

const styles = {
    animation: {
        width: 300,
        height: 300,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color: 'white',
    },
    button: {
        backgroundColor: '#368f5b',
        padding: 16,
        borderRadius: 8,
        margin: 16,
    }

};