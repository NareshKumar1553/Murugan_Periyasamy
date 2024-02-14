import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

const AdminPangaliList = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [ratio, setRatio] = useState("all");

    useEffect(() => {
        const subscriber = firestore()
            .collection('PangaliParent')
            .onSnapshot((querySnapshot) => {
                const data = [];
                console.log(querySnapshot.size);
                querySnapshot.forEach((documentSnapshot) => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setLoading(false);
                setData(data);
                setFilteredData(data);
            });

        return () => subscriber();
    }, []);

    const handleFilter = (ratio) => {
        setRatio(ratio);
        if (ratio === "all") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => item.city === ratio);
            setFilteredData(filtered);
        }
    };

    if (isLoading) {
        return (
            <View style={style.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={style.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={style.container}>
            <ScrollView contentContainerStyle={style.scrollViewContent}>
                <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />
                <Text style={style.header}>பங்காளி பட்டியல்</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={style.item}>
                        <TouchableOpacity onPress={() => handleFilter("all")} style={style.filterButton}>
                            <Text style={style.filterButtonText}>All</Text>
                        </TouchableOpacity>
                    </View>
                    {["சிங்களாந்தபுரம்", "தொட்டியம்", "பாலசமுத்திரம்", "சேலம்", "சென்னை", "துரையூர்", "மேட்டுப்பாளையம்", "நாமக்கல்",
                        "பாலப்பட்டி", "பாண்டமங்கலம்", "பொத்தனூர்", "தண்ணீர்பள்ளி", "திருச்சி"].map((city) => (
                            <View style={style.item} key={city}>
                                <TouchableOpacity onPress={() => handleFilter(city)} style={style.filterButton}>
                                    <Text style={style.filterButtonText}>{city}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                </ScrollView>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                {filteredData.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        onPress={() => {
                            navigation.push("PangaliEntry", {
                                event: item,
                            });
                        }}
                        style={style.button}
                    >
                        <Text style={style.textTamil}>{item.name}</Text>
                        <Text style={style.text}>{item.phno}</Text>
                        <Text style={style.text}>{item.city}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default AdminPangaliList;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    scrollViewContent: {
        paddingHorizontal: 16,
    },
    item: {
        height: 75,
        marginHorizontal: 8,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        color: 'black',
    },
    filterButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 16,
        borderRadius: 8,
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
        marginLeft: 16,
        marginRight: 16,
        color: 'black',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color: '#66645e',
    },
    button: {
        backgroundColor: '#fbd3e9',
        borderRadius: 16,
        width: 300,
        height: 'auto',
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