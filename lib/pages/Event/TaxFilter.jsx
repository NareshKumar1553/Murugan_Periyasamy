import React,{useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";

const TaxFilter = ({ navigation,route }) => {

    const eventName = route.params.eventName;
    const [data, setData] = useState([]);
    const [totalTax, setTotalTax] = useState(0);

    console.log("Data ",data);

    const getDataFromFirestore = async () => {
        let data = [];
        console.log("Getting data from firestore");
        try {
            const snapshot = await firestore()
                .collection(eventName)
                .where("tax", "!=", 0)
                .get();

            snapshot.forEach((doc) => {
                console.log(doc.data());
                data.push(doc.data());
            });

            setData(data);


            const taxSnapshot = await firestore()
                .collection('events')
                .doc(eventName)
                .get();

            const tax = taxSnapshot.data().totalTax;
            setTotalTax(tax);
        
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDataFromFirestore();
    }, []);


    return (
        <View style={style.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={style.header}>
                <Text style={style.text_header}>Tax Details</Text>
                <Text style={style.text_header}>Total Tax: ₹{totalTax}</Text>
            </View>
            <View style={style.footer}>

                {data.map((item, index) => (
                    <TouchableOpacity
                        style={[style.signIn, { marginBottom: 10 }]}
                        onPress={() => navigation.navigate("EventPangaliDetail", { event: item })}
                    >
                        <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={style.signIn}>
                            <Text style={style.textSign}>{item.name}</Text>
                            <Text style={style.textSign}>₹{item.tax}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
                                       
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
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});

