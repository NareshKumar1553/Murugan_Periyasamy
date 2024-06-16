import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from "../pages/Home";
import LockPage from "../pages/lock";
import NewEvent from "../pages/NewEvent";
import Event from "../pages/Event";
import PangaliList from "../pages/PangaliList";
import EventPangaliList from "../pages/Event/EventPangali";
import EventPangaliDetail from "../pages/Event/EventPangaliDetail";
import PangaliDetail from "../pages/PangaliDetails";
import ErrorPage from "../pages/Developer";
import EventList from "../pages/EventList";
import AdminHome from "../pages/admin/AdminHome";
import PangaliEntry from "../pages/admin/PangaliEntry";
import AdminPangaliList from "../pages/admin/AdminPangaliList";
import NewChild from "../pages/admin/NewChild";
import TaxFilter from "../pages/Event/TaxFilter";
import NoNetwork from "../animation/NoNetwork";
import GenerateXLS from "../pages/Event/GenerateXLS";
import Test from "../testing/test";
import GoogleAuth from "../auth/GoogleAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../pages/Profile";
import Calender from "../pages/Hall/Calender";
import HallProfile from "../pages/Hall/HallProfile";
import HallBookingList from "../pages/Hall/HallBookingList";
import HallRegistration from "../pages/Hall/HallRegistration";
import BillConfirmation from "../pages/Hall/BillConfirmation";
import EventBillGeneration from "../pages/Event/EventBillGeneration";


const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    
    

    const [isFirstLaunch, setIsFirstLaunch] = useState(false);
    const [isEvent, setIsEvent] = useState(false);

    console.log("Page : StackNavigation.jsx", isFirstLaunch, isEvent);
    useEffect( () => {

    async function fetchData  (){
        console.log("Fetching Data...");
        try {
        const value = await AsyncStorage.getItem('isFirstLaunch');
        const isEvent = await AsyncStorage.getItem('eventName');
        
        if (value === null) {
            setIsFirstLaunch(true);
        } else {
            setIsFirstLaunch(false);
        }

        if(isEvent === null){
            setIsEvent(false);
        }else{
            setIsEvent(true);
        }

    }
    catch(e){
        console.log("Error at Fetching Data : ",e);
    }
    }
    fetchData();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    
                }}                    
            >   
                    {!isFirstLaunch && !isEvent ? (
                        <Stack.Screen name="Home1" component={HomeScreen} />
                        
                    ) : isEvent ? (
                        <Stack.Screen name="Event1" component={Event} />
                    ) : (
                        <Stack.Screen name="GoogleSign1" component={GoogleAuth} />                        
                    )}

                <Stack.Screen name="LockScreen" component={LockPage} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NewEvent" component={NewEvent} />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen name="PangaliList" component={PangaliList} />
                <Stack.Screen name="EventPangali" component={EventPangaliList} />
                <Stack.Screen name="EventPangaliDetail" component={EventPangaliDetail} />
                <Stack.Screen name="PangaliDetails" component={PangaliDetail} />
                <Stack.Screen name="#" component={ErrorPage} />
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="AdminHome" component={AdminHome} />
                <Stack.Screen name="PangaliEntry" component={PangaliEntry} />
                <Stack.Screen name="AdminPangaliList" component={AdminPangaliList} />
                <Stack.Screen name="NewChild" component={NewChild} />
                <Stack.Screen name="TaxFilter" component={TaxFilter} />
                <Stack.Screen name="NoNetwork" component={NoNetwork} />
                <Stack.Screen name="GenerateXLS" component={GenerateXLS} />
                <Stack.Screen name="Test" component={Test} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Calender" component={Calender} />
                <Stack.Screen name="HallProfile" component={HallProfile} />
                <Stack.Screen name="HallBookingList" component={HallBookingList} />
                <Stack.Screen name="GoogleSign" component={GoogleAuth} />
                <Stack.Screen name="HallRegistration" component={HallRegistration}  />
                <Stack.Screen name="BillConfirmation" component={BillConfirmation}  />
                <Stack.Screen name="EventBillGeneration" component={EventBillGeneration}    />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
