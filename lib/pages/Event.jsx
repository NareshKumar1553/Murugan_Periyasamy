import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import LinearGradient from "react-native-linear-gradient";

const Event = ({ navigation }) => {
    const [eventName, setEventName] = useState('');
    const [pagali, setPagali] = useState(false);
    const [female, setFemale] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('eventName').then((value) => {
            setEventName(value);
        });
        AsyncStorage.getItem('pangali').then((value) => {
            setPagali(value);
        });
        AsyncStorage.getItem('female').then((value) => {
            setFemale(value);
        });
        setLoading(false);
    }, []);

   

    

    const handleDeleteEvent = () => {
        Alert.alert(
            "Delete Event",
            "If you delete the event, all the data will be lost. Are you sure you want to delete the event?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        AsyncStorage.clear().then(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                            console.log("Event Deleted");
                        });
                    }
                }
            ]
        );
    }

    if (loading) {
        return (
            <View style={style.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{ flex: 1 }}>
            <View style={style.container}>
                <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
                <Text style={style.textTamil}>நிகழ்வு பெயர்: {eventName}</Text>
                <Text style={style.text}>Event Name: {eventName}</Text>
                {pagali === 'true' && (
                    <TouchableOpacity onPress={() => { navigation.push('EventPangali', { eventName: eventName }) }} style={style.button}>
                        <Text style={style.textTamil}>பங்காளி பட்டியல்</Text>
                        <Text style={style.text}>Pangali List</Text>
                    </TouchableOpacity>
                )}
                {female === 'true' && (
                    <TouchableOpacity onPress={() => { navigation.push('#') }} style={style.button}>
                        <Text style={style.textTamil}>பெண்கள் பட்டியல் </Text>
                        <Text style={style.text}>Female List</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleDeleteEvent} style={style.deleteButton}>
                    <Text style={style.buttonText}>Delete Event</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

export default Event;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color: 'black',
        textDecorationLine: 'underline',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
        textDecorationLine: 'underline',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    button: {
        backgroundColor: '#fbd3e9',
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