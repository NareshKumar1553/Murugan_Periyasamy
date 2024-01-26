import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        </View>
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
        color: 'red',
    },
});

export default ErrorPage;
