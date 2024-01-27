import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView , ActivityIndicator} from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

// LinearGradient.defaultProps = {
//     useAngle: true,
//     angle: 45,
//     angleCenter: { x: 0.5, y: 0.5 },
//     colors: ["#FF9800", "#FF5722"],
// };

const EventList = ({ navigation }) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const subscriber = firestore()
        .collection("events")
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
            setLoading(false);
        });
    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    if (loading) {
        return(
            <View style={style.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={style.loadingText}>Loading...</Text>
            </View>
        );
    }
    
    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>
        <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={style.container}>
        <Text style={style.header}>நிகழ்வுகள் பட்டியல்</Text>
        <Text style={style.header}>Events List</Text>
        
        {data.map((item) => (
            <TouchableOpacity
            onPress={() => {
                navigation.push("#", {
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
        </LinearGradient>
    );
    }

export default EventList;


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:16,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f5fa',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        color:'black',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color:'black',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
        backgroundColor: '#fbd3e9',
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