import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Alert, TouchableHighlight,ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";

const TaxFilter = ({ navigation, route }) => {
    const eventName = route.params.eventName;
    const [data, setData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [totalTax, setTotalTax] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('Income');
    const [expense, setExpense] = useState('');
    const [amount, setAmount] = useState(0);

    const getDataFromFirestore = async () => {
        try {
            const data = [];
            const snapshot = await firestore()
                .collection(eventName)
                .where("tax", "!=", 0)
                .get();

            snapshot.forEach((doc) => {
                data.push(doc.data());
            });

            setData(data);

            const taxSnapshot = await firestore()
                .collection('events')
                .doc(eventName)
                .get();

            const tax = taxSnapshot.data().totalTax;
            const expense = taxSnapshot.data().totalExpense;
            setTotalTax(tax);
            setTotalExpense(expense);


            const expenseSnapshot = await firestore()
                .collection('events')
                .doc(eventName)
                .collection('Expense')
                .get();

            const expenseData = [];
            expenseSnapshot.forEach((doc) => {
                expenseData.push(doc.data());
            });

            setExpenseData(expenseData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDataFromFirestore();
    }, []);

    const addExpense = async () => {
        try {
            await firestore()
                .collection('events')
                .doc(eventName)
                .collection('Expense')
                .add({
                    name: expense,
                    tax: amount,
                });

            

            const updatedTotalExpense = Number(totalExpense) + Number(amount);

            await firestore()
                .collection('events')
                .doc(eventName)
                .update({
                    totalTax: totalTax - amount,
                    totalExpense: updatedTotalExpense,
                });

            getDataFromFirestore();

            Alert.alert("Success", "Expense added successfully");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error adding expense");
        }
    };

    return (
        <View style={style.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={style.header}>
                <Text style={style.text_header}>Tax Details</Text>
                <Text style={style.text_header}>Total Tax: ₹{totalTax}</Text>
            </View>
            <View style={style.footer}>
                <View style={style.category}>
                    <TouchableOpacity style={style.categoryButton} onPress={() => setSelectedCategory('Income')}>
                        <LinearGradient
                            colors={selectedCategory === 'Income' ? ["#08d4c4", "#01ab9d"] : ["#f9f5fa", "#f3e1f7"]}
                            style={style.signIn}
                        >
                            <Text style={style.categoryButtonText}>வரவு</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.categoryButton} onPress={() => setSelectedCategory('Expense')}>
                        <LinearGradient
                            colors={selectedCategory === 'Expense' ? ["#08d4c4", "#01ab9d"] : ["#f9f5fa", "#f3e1f7"]}
                            style={style.signIn}
                        >
                            <Text style={style.categoryButtonText}>செலவு</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                
                {selectedCategory === 'Income' ?
                <ScrollView>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[style.signIn, { marginBottom: 10 }]}
                            onPress={() => navigation.navigate("PangaliDetails", { event: item })}
                        >
                            <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={style.signIn}>
                                <Text style={style.textSign}>{item.name}</Text>
                                <Text style={style.textSign}>₹{item.tax}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))
                    }

                    <View>
                        <TouchableOpacity   style={[style.generateList, { marginTop: 10 }]}
                            onPress={() => navigation.navigate("GenerateXLS", { data: data, eventName: eventName, name: 'வரவு'})}
                        >
                           <Text style={style.categoryButtonText}>Generate List</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                    :
                    <ScrollView>
                        {expenseData.map((item, index) => (
                            <TouchableHighlight
                                key={index}
                                style={[style.signIn, { marginBottom: 10 }]}
                            >
                                <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={style.signIn}>
                                    <Text style={style.textSign}>{item.name}</Text>
                                    <Text style={style.textSign}>₹{item.tax}</Text>
                                </LinearGradient>
                            </TouchableHighlight>
                        ))}
                        <View style={style.category}>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderRadius: 10, borderWidth: 1, width: '50%', marginRight: 10, color: 'black' }}
                                placeholder="Enter the expense..."
                                placeholderTextColor="black"
                                onChangeText={(e) => { setExpense(e) }}
                            />
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderRadius: 10, borderWidth: 1, width: '45%', color: 'black' }}
                                placeholder="Enter the amount..."
                                placeholderTextColor="black"
                                keyboardType="numeric"
                                onChangeText={(e) => { setAmount(e) }}
                            />
                        </View>
                        <TouchableOpacity
                            style={[style.signIn, { marginTop: 10 }]}
                            onPress={() => addExpense()}
                        >
                            <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={style.signIn}>
                                <Text style={style.categoryButtonText}>Add</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    

                    <View>
                        <TouchableOpacity   style={[style.generateList, { marginTop: 10 }]}
                            onPress={() => navigation.navigate("GenerateXLS", { data: expenseData, eventName: eventName, name: 'செலவு'})}
                        >
                           <Text style={style.categoryButtonText}>Generate List</Text>
                        </TouchableOpacity>

                    </View>

                    </ScrollView>

                }
            </View>
        </View>
    );
};

export default TaxFilter;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryButton: {
        padding: 10,
        borderRadius: 10,
        width: '50%',
    },
    categoryButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: 'center',
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 'auto',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    generateList: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: 'center',
        marginTop: 20,
        backgroundColor:'#08d4c4',
        padding: 10,
        borderRadius: 10,
    
    },
});
