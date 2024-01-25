import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Event = ({navigation}) => {
    function AlertButton(){
        console.log("Alert Button");

        Alert.alert(
            "Delete Event",
            "If you delete the event, all the data will be lost. Are you sure you want to delete the event?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => AsyncStorage.clear().then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
                console.log("Event Deleted");
              })
              }
            ]
          );
    }


    console.log('Event Page');
    const [eventName, setEventName] = useState('');
    const [pagali, setPagali] = useState(false);
    const [female, setFemale] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            console.log('Text:', value);
            setEventName(value);

        AsyncStorage.getItem('pangali').then((value) => {
            console.log('Pagali :', value);
            setPagali(value);
        }
        );  

        AsyncStorage.getItem('female').then((value) => {
            console.log('Female :', value);
            setFemale(value);
        }
        );
        });

    }, []);
    return (
        <View style={style.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />

            <Text style={style.textTamil}>நிகழ்வு பெயர்: {eventName}</Text>
            <Text style={style.text}>Event Name: {eventName}</Text>
            
            {pagali=='true' && 
            <TouchableOpacity onPress={()=>{navigation.push('test1')}} style={style.button}>
                <Text style={style.textTamil}>பங்காளி பட்டியல்</Text>
                <Text style={style.text}>Pangali List</Text>
            </TouchableOpacity>
            }
            {female=='true' && 
            <TouchableOpacity onPress={()=>{navigation.push('test1')}} style={style.button}>
                <Text style={style.textTamil}>பெண்கள் பட்டியல் </Text>
                <Text style={style.text}>Female List</Text>
            </TouchableOpacity>
            }
            

            <TouchableOpacity onPress={()=>{AlertButton()}} style={style.deleteButton}>
                <Text style={style.buttonText}>Delete Event</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Event;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:16,
        backgroundColor: '#f9f5fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color:'black',
        textDecorationLine: 'underline',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
        textDecorationLine: 'underline',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
    },
    button: {
        backgroundColor: '#eed2f7',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
    },
    deleteButton: {
        backgroundColor: '#f52052',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
        height: 50,
        
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
});