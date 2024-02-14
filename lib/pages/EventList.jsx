import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

const EventList = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = firestore()
            .collection("events")
            .onSnapshot((querySnapshot) => {
                const data = querySnapshot.docs.map((documentSnapshot) => ({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                }));

                setData(data);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    if (loading) {
        return (
            <View style={style.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={style.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={style.container}>
            <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
            <ScrollView contentContainerStyle={style.scrollViewContainer}>
                <Text style={style.header}>நிகழ்வுகள் பட்டியல்</Text>
                <Text style={style.header}>Events List</Text>

                {data.map((item) => (
                    <TouchableOpacity
                        key={item.key}
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
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    scrollViewContainer: {
        alignItems: 'center',
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
        color: 'black',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
        color: 'black',
    },
    textTamil: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 16,
        color: 'black',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginHorizontal: 16,
        color: '#66645e',
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

export default EventList;
