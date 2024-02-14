import React,{useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar,TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const NewChild = ({ navigation,route }) => {

    const gender = route.params.gender;

    console.log("New Child Screen", gender);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [phno, setPhno] = useState("");

    const handleNavigation = (screen) => {
        navigation.push(screen);
    };

    const saveData = async(collectionName) => {
        console.log("Save Data",collectionName);
        try{
        await firestore().collection(collectionName).doc(name).set({
            name : name,
            age : age,
            city : city,
            phno : phno,
        });
        await firestore().collection('log').doc(name).set({
            name : name,
            age : age,
            city : city,
            phno : phno,
            time : firebase.firestore.FieldValue.serverTimestamp(),
        });
        }
        catch(e){
            console.log(e);
        }
    }

    const handleSave = async() => {

        if(name === "" || age === "" || city === "" || phno === ""){
            Alert.alert(
                'பிழை',
                'அனைத்து புலம்பல்களை நிரப்புக',
                [
                    {
                        text: 'சரி',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        else{
            if(gender === 'male'){
                saveData('Checking');
                Alert.alert(
                    'சேமி',
                    'பங்காளி சேமிக்கப்பட்டது',
                    [
                        {
                            text: 'சரி',
                            onPress: () => navigation.pop(),
                        },
                    ],
                    { cancelable: false },
                );
            }
            else{
                saveData('Testing')
                Alert.alert(
                    'சேமி',
                    'பெண்கள் சேமிக்கப்பட்டது',
                    [
                        {
                            text: 'சரி',
                            onPress: () => {navigation.pop()},
                        },
                    ],
                    { cancelable: false },
                );
            }
        } 

        console.log("Save");
    }

    return (
        <LinearGradient colors={["#f9f5fa", "#f3e1f7", "#f3e1f7"]} style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.header}>புதிய பங்காளி</Text>
                <Text style={styles.label}>பெயர்</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="பெயர்"
                />
                <Text style={styles.label}>வயது</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setAge(text)}
                    value={age}
                    placeholder="வயது"
                    keyboardType="number-pad"
                />
                <Text style={styles.label}>நகரம்</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setCity(text)}
                    value={city}
                    placeholder="நகரம்"
                />
                <Text style={styles.label}>தொலைபேசி எண்</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPhno(text)}
                    value={phno}
                    placeholder="தொலைபேசி எண்"
                    keyboardType="number-pad"

                />
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>சேமி</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}


export default NewChild;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 16,
    },
    form: {
        width: "80%",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 0,
        color: "black",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 16,
        color: "black",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        color:'black'
    },
    button: {
        backgroundColor: "black",
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});
