import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ErrorPage = () => {
    return (
        <LinearGradient
            colors={['#83a4d4', '#FF5722']}
            style={{ flex: 1 }}
        >
        <StatusBar backgroundColor='#83a4d4' barStyle="light-content" />
        <View style={styles.container}>
            <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ErrorPage;
