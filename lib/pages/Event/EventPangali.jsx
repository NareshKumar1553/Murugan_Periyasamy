import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

const EventPangaliList = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [ratio, setRatio] = useState("all");
    const [tax, setTax] = useState(0);

    useEffect(() => {
        const { eventName } = route.params;
        
        const subscriber = firestore()
            .collection(eventName)
            .onSnapshot((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    key: doc.id,
                }));
                setLoading(false);
                setData(data);
                setFilteredData(data);
            });

        const taxSubscriber = firestore()
            .collection('events')
            .doc(eventName)
            .onSnapshot((doc) => {
                const tax = doc.data().totalTax;
                setTax(tax);
            });

        return () => {
            subscriber();
            taxSubscriber();
        }
        
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

                <Text style={style.header}>Event Name : {route.params.eventName}</Text>
                <Text style={style.header}>பங்காளி பட்டியல்</Text>

                <View style={{flexDirection:'row'}}>
                    <View>
                    <TouchableOpacity onPress={() => navigation.push('GenerateXLS', { eventName: route.params.eventName, data: filteredData, name:ratio })} style={style.generateButton}>
                        <Text style={style.generateButtonText}>Generate List</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={() => navigation.push('TaxFilter', { eventName: route.params.eventName })} style={style.taxButton}>
                        <Text style={style.taxButtonText}>Total Tax : ₹{tax}</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.scrollViewContent}>
                    <View style={style.item}>
                        <TouchableOpacity onPress={() => handleFilter("all")} style={style.filterButton}>
                            <Text style={style.filterButtonText}>All</Text>
                        </TouchableOpacity>
                    </View>
                    {["சிங்களாந்தபுரம்", "தொட்டியம்", "பாலசமுத்திரம்", "சேலம்", "சென்னை", "துரையூர்", "மேட்டுப்பாளையம்", "நாமக்கல்", "பாலப்பட்டி", "பாண்டமங்கலம்", "பொத்தனூர்", "தண்ணீர்பள்ளி", "திருச்சி"].map((city) => (
                        <View style={style.item} key={city}>
                            <TouchableOpacity onPress={() => handleFilter(city)} style={style.filterButton}>
                                <Text style={style.filterButtonText}>{city}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View style={{alignItems:'center'}}>
                {filteredData.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        onPress={() => navigation.push("EventPangaliDetail", { event: item })}
                        style={style.button}
                    >
                        <Text style={style.textTamil}>{item.name}</Text>
                        <Text style={style.text}>{item.city}</Text>            
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default EventPangaliList;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    generateButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 150,
        marginTop: 0,
        borderRadius: 8,
        color: 'black',
        height: 40,
        justifyContent:'center'
    },
    generateButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
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
    filterButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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
    taxButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 170,
        marginTop: 0,
        borderRadius: 8,
        color: 'black',
        height: 40,
        justifyContent:'center'
    },
    taxButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
    },
});