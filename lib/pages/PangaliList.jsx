import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";

const PangaliList = ({ navigation }) => {
    const [data, setData] = React.useState([]);
    
    React.useEffect(() => {
        const subscriber = firestore()
        .collection("PangaliParent")
        .onSnapshot((querySnapshot) => {
            const data = [];
            console.log(querySnapshot.size);
            querySnapshot.forEach((documentSnapshot) => {
            data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
            });
    
            setData(data);
        });
    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);
    
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={style.container}>
        <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
        <Text style={style.header}>பங்காளி பட்டியல்</Text>
        
        {data.map((item) => (
            <TouchableOpacity
            onPress={() => {
                navigation.push("Event", {
                event: item,
                });
            }}
            style={style.button}
            >
            <Text style={style.textTamil}>{item.name}</Text>
            <Text style={style.text}>{item.city}</Text>            
            </TouchableOpacity>
        ))}
        </ScrollView>
    );
    }

export default PangaliList;


const style = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
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
        // marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'#66645e',
    },
    button: {
        backgroundColor: '#f9f5fa',
        borderRadius: 16,
        width: '80%',
        height: 100,
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});