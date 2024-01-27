import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
LinearGradient.defaultProps = {
    ...LinearGradient.defaultProps,
    colors: ['#f9f5fa', '#f3e1f7', '#f3e1f7'],
};



const HomeScreen = ({navigation}) => {
    return (
        console.log("Home Screen"),
        <LinearGradient colors={['#f9f5fa', '#f3e1f7', '#f3e1f7']} style={{flex:1}}>
        <View style={style.container}>
            <StatusBar backgroundColor='#f9f5fa' barStyle="dark-content" />
            <Text style={style.header}>வணக்கம்</Text>
            
            <TouchableOpacity onPress={()=>{navigation.push('PangaliList')}} style={style.button}>
                <Text style={style.textTamil}>பங்காளி பட்டியல்</Text>
                <Text style={style.text}>Pangali List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.push('#')}} style={style.button}>
                <Text style={style.textTamil}>பெண்கள் பட்டியல் </Text>
                <Text style={style.text}>Female List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.push('NewEvent')}} style={style.button}>
                <Text style={style.textTamil}>புதிய நிகழ்வு</Text>
                <Text style={style.text}>New Event</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.push('EventList')}} style={style.button}>
                <Text style={style.textTamil}>அனைத்து நிகழ்வுகளும்</Text>
                <Text style={style.text}>All Events</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={()=>{navigation.push('test1')}} style={style.button}>
                <Text style={style.textTamil}>எங்களை பற்றி</Text>
                <Text style={style.text}>About Us</Text>
            </TouchableOpacity> */}
        </View>
        </LinearGradient>
    );
};

export default HomeScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:16,
        // backgroundColor: '#f9f5fa',
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
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'#000',
        
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        color:'#000'
    },
    button: {
        backgroundColor: '#fbd3e9',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        width: 300,
    },
});