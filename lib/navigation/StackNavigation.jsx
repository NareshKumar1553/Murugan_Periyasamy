
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from "../pages/Home";
import ReadDataPage from "../testing/test1";
import LockPage from "../pages/lock";
import NewEvent from "../pages/NewEvent";
import Event from "../pages/Event";
import PangaliList from "../pages/PangaliList";
import MyPage from "../testing/test2";
import EventPangaliList from "../pages/Event/EventPangali";


const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    useEffect(() => {
        SplashScreen.hide();
      }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LockScreen" component={LockPage} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="test1" component={ReadDataPage} />
                <Stack.Screen name="NewEvent" component={NewEvent} />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen name="PangaliList" component={PangaliList} />
                <Stack.Screen name="test2" component={MyPage} />
                <Stack.Screen name="EventPangali" component={EventPangaliList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    }