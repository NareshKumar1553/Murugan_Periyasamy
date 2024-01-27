import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";

const PangaliList = ({ navigation,route }) => {
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [filteredData, setFilteredData] = React.useState([]);
    const [ratio, setRatio] = React.useState("all");

    React.useEffect(() => {      
        
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
        
    
        // Unsubscribe from events when no longer in use
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

        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>

        
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={style.container}>
        <StatusBar backgroundColor="#f9f5fa" barStyle="dark-content" />

        <Text style={style.header}>பங்காளி பட்டியல்</Text>

         <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.scrollViewContent}
            
        >
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("all")} style={style.filterButton}>
                <Text style={style.filterButtonText}>All</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("சிங்களாந்தபுரம்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Singalandapuram</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("தொட்டியம்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Thottiyam</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("பாலசமுத்திரம்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Balasamuthiram</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("சேலம்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Salem</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("சென்னை")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Chennai</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("துரையூர்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Duraiyur</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("மேட்டுப்பாளையம்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Metupalayam</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("நாமக்கல்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Namakkal</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("பாலப்பட்டி")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Palapatti</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("பாண்டமங்கலம்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Pandamangalam</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("பொத்தனூர்")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Pothanur</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("தண்ணீர்பள்ளி")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Thannirpalli</Text>
            </TouchableOpacity>
        </View>
        <View style={style.item}>
            <TouchableOpacity onPress={() => handleFilter("திருச்சி")} style={style.filterButton}>
                <Text style={style.filterButtonText}>Trichy</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        
        {filteredData.map((item) => (
            <TouchableOpacity
            onPress={() => {
                navigation.push("PangaliDetails", {
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



export default PangaliList;


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:16,

    },
    
    generateButton:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 200,
        marginTop: 0,
        borderRadius: 8,
        color: 'black',
        height: 40
    },
    generateButtonText:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    scrollViewContent: {
        paddingHorizontal: 16,
    },
    item: {
        // width: 100,
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
        color:'black',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
        marginLeft: 16,
        
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        // height: 50
    },

    filterButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        // width: 100,
        marginTop: 16,
        borderRadius: 8,
        color: 'black',
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
});