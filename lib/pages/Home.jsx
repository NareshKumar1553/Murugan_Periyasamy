import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');
const HomeScreen = ({ navigation }) => {

    const [images, setImages] = useState(['https://media.istockphoto.com/id/1653095643/photo/indian-ganesha-festival-lord-ganesha.webp?b=1&s=170667a&w=0&k=20&c=p5kJclCRbmKlvV64ghDjgl0te9MITI9R5bf2sd5AW-I=',]);

    useEffect(() => {
        const subcribe = firestore().collection('Images').doc('home').onSnapshot((snapshot) => {
            if (snapshot.exists) {
                setImages(snapshot.data().img);
            }
        }
        );
    }, []);

    return (
        console.log("Page : Home.jsx"),
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={styles.container}>

            <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />

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
                            <View style={{ flex: 1, borderWidth: 0, justifyContent: 'center' }}>
                                <Image
                                    resizeMode='stretch'
                                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                    source={{ uri: item }}
                                />
                            </View>
                        )}
                    />
                    
                </View>

                <View>
                    <Text style={styles.header}>வணக்கம்</Text>
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
});