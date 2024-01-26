
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from "../pages/Home";
import LockPage from "../pages/lock";
import NewEvent from "../pages/NewEvent";
import Event from "../pages/Event";
import PangaliList from "../pages/PangaliList";
import EventPangaliList from "../pages/Event/EventPangali";
import EventPangaliDetail from "../pages/Event/EventPangaliDetail";
import LoadingPage from "../animation/LoadingPage";
import TestPage from "../testing/test1";
import GenerateList from "../pages/GenerateList";



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
                <Stack.Screen name="test1" component={TestPage} />
                <Stack.Screen name="NewEvent" component={NewEvent} />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen name="PangaliList" component={PangaliList} />
                <Stack.Screen name="EventPangali" component={EventPangaliList} />
                <Stack.Screen name="EventPangaliDetail" component={EventPangaliDetail} />
                <Stack.Screen name="LoadingPage" component={LoadingPage} />
                <Stack.Screen name="GenerateList" component={GenerateList}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
    }