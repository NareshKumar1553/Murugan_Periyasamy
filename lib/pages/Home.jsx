import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const HomeScreen = ({ navigation }) => {

    const [name, setName] = useState('Sri Periya Samy Kovil');
    const [loading, setLoading] = useState(true);

    const [images, setImages] = useState(['https://firebasestorage.googleapis.com/v0/b/sriperiyasamy-96.appspot.com/o/SriPeriyaSamyKovil%2FFrontView.png?alt=media&token=74abe6bd-7258-4fde-8464-212ab0efaae1','https://firebasestorage.googleapis.com/v0/b/sriperiyasamy-96.appspot.com/o/SriPeriyaSamyKovil%2Fperiyasamy.png?alt=media&token=1127dd60-6900-4df2-a4fb-94a398d21a5c']);

    useEffect(() => {
        const subcribe = firestore().collection('Images').doc('home').onSnapshot((snapshot) => {
            if (snapshot.exists) {
                setImages(snapshot.data().img);
                setLoading(false);
            }
            AsyncStorage.getItem('name').then((value) => {
                console.log("Name : ", value);
                setName(value);
            }
            );
        }
        );
        
    }, []);

    return (
        console.log("Page : Home.jsx"),
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>

            <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />

                   <ScrollView style={{ flex: 1 }}>

                    <View style={styles.containerCar}>
                        <Carousel
                            loop
                            width={width}
                            height={width / 1.3}
                            autoPlay={true}
                            data={images}
                            scrollAnimationDuration={3000}
                            renderItem={({ item, index }) => (

                                loading ? (
                                    <View style={styles.item}>
                                        <ActivityIndicator size="small" color="blue" />
                                    </View>
                                ) : (
                                    <View style={styles.item}>
                                        <Image
                                            resizeMode='stretch'
                                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                            source={{ uri: item }}
                                        />
                                    </View>
                                )
                                
                            )}
                        />
                        
                    </View>

                    <View style={{marginTop:10}}>
                        <Text style={styles.header}>வணக்கம்,{name}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.push('PangaliList') }} style={styles.button}>
                            <Text style={styles.textTamil}>பங்காளி பட்டியல்</Text>
                            <Text style={styles.text}>Pangali List</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.push('#') }} style={styles.button}>
                            <Text style={styles.textTamil}>பெண்கள் பட்டியல் </Text>
                            <Text style={styles.text}>Female List</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.push('NewEvent') }} style={styles.button}>
                            <Text style={styles.textTamil}>புதிய நிகழ்வு</Text>
                            <Text style={styles.text}>New Event</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.push('EventList') }} style={styles.button}>
                            <Text style={styles.textTamil}>அனைத்து நிகழ்வுகளும்</Text>
                            <Text style={styles.text}>All Events</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={() => { navigation.push('Browser',{url:'https://nareshkumar.me'}) }} style={styles.button}>
                    <Text style={styles.textTamil}>அனைத்து நிகழ்வுகளும்</Text>
                    <Text style={styles.text}>Test</Text>
                </TouchableOpacity>
                </View> */}

                </ScrollView>
                    <View style={styles.fabContainer}>
                        <TouchableOpacity style={styles.fabButton} onPress={() => { 
                            navigation.push('Profile')
                         }}>
                            <Image source={require('../assets/profile.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

                

        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 16,
        marginHorizontal: 16,
        color: '#000',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginHorizontal: 16,
        color: '#000',
    },
    button: {
        backgroundColor: '#fbd3e9',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
    },
    containerCar: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        flex: 1,
        width: width,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    fabButton: {
        backgroundColor: '#fbd3e9',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fabText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },


});