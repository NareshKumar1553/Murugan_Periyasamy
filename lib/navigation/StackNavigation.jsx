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
import GenerateList from "../pages/GenerateList";
import PangaliDetail from "../pages/PangaliDetails";
import ErrorPage from "../pages/Developer";
import EventList from "../pages/EventList";
import AdminHome from "../pages/admin/AdminHome";
import PangaliEntry from "../pages/admin/PangaliEntry";
import AdminPangaliList from "../pages/admin/AdminPangaliList";
import NewChild from "../pages/admin/NewChild";

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
                <Stack.Screen name="NewEvent" component={NewEvent} />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen name="PangaliList" component={PangaliList} />
                <Stack.Screen name="EventPangali" component={EventPangaliList} />
                <Stack.Screen name="EventPangaliDetail" component={EventPangaliDetail} />
                <Stack.Screen name="GenerateList" component={GenerateList} />
                <Stack.Screen name="PangaliDetails" component={PangaliDetail} />
                <Stack.Screen name="#" component={ErrorPage} />
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="AdminHome" component={AdminHome} />
                <Stack.Screen name="PangaliEntry" component={PangaliEntry} />
                <Stack.Screen name="AdminPangaliList" component={AdminPangaliList} />
                <Stack.Screen name="NewChild" component={NewChild} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
