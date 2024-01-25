import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import firestore from "@react-native-firebase/firestore";

const WriteDataPage = ({ navigation }) => {

    let a = ['சுப்ரமணி-பஞ்சவர்ணம்','நடராஜன்-ஆறுமுகம்பிள்ளை','நாகராஜ்-சுப்ரமணி(சித்தலவாய்)','முத்துகுமார்-பெரியண்ணன்பிள்ளை','பிரகாஷ்வேலு','பிரபு-கீதா','சிவகுமார்-சங்கீதா','முருகானந்தம்-கலைசெல்வி']
    console.log(a.length);
    const addPage = () => {
        
        for(let i=0;i<a.length;i++){
            let name = a[i];
            console.log(name);
        firestore()
            .collection('#')
            .doc(name)
            .set({
                name: name.trim(),
                city: 'திருச்சி',
                phno:''
            })
            .then(() => {
                console.log('User added!');
            });
        }
    };

    return(
        <View style={style.container}>
            <Text style={style.text}>புதிய நிகழ்வு</Text>
            <TouchableOpacity onPress={addPage} style={style.button}>
                <Text style={style.text}>Add</Text>
            </TouchableOpacity>
        </View>
    )
};

export default WriteDataPage;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:16,
        backgroundColor: '#f9f5fa',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'black',
        textDecorationLine: 'underline',
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: '#f9f5fa',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 32,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: .25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});