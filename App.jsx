import React, { useState, useEffect } from "react";
import { View } from "react-native";
import StackNavigation from "./lib/navigation/StackNavigation";
import NetInfo from "@react-native-community/netinfo";
import NoNetwork from "./lib/animation/NoNetwork";
import SplashScreen from "react-native-splash-screen";
import { requestUserPermission, NotificationListener } from "./src/utils/PushNotification";

const App = () =>{
    
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        SplashScreen.hide();
        NetworkCheck();
        requestUserPermission();
        NotificationListener();
    }, []);

    const NetworkCheck =()=> NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
      });

    return(
        console.log("Page : App.jsx"),
        <View style={{flex: 1}}>
            {!isConnected ?  <NoNetwork />: <StackNavigation />}
        </View>
    );
}

export default App;