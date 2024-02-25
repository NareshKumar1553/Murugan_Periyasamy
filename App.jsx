import React, { useState, useEffect } from "react";
import { View } from "react-native";
import StackNavigation from "./lib/navigation/StackNavigation";
import NetInfo from "@react-native-community/netinfo";
import NoNetwork from "./lib/animation/NoNetwork";
import SplashScreen from "react-native-splash-screen";

const App = () =>{
    console.log("Page : App.jsx");
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        SplashScreen.hide();
    }, []);


    NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setIsConnected(state.isConnected);
      });

    return(
        <View style={{flex: 1}}>
            {isConnected ? <StackNavigation /> : <NoNetwork />}
        </View>
    );
}

export default App;