import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

import "../components/firebase"

import { auth, db } from "../components/firebase"

const Main = ({ navigation }) => {

    const user = auth.currentUser;

    if (!user) {
        navigation.navigate("Login")
        return
    }

    const UserOwnedKanbans = () => {
        const [UOKInfo, setUOKInfo] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const snapshot = await db.collection("kanban")
                        .where('project_owner_email', '==', user.email)
                        .get();

                    if (snapshot.empty) {
                        console.log('nao tem...');
                        return;
                    }

                    const data = snapshot.docs.map(doc => doc.data());
                    setUOKInfo(data);
                } catch (err) {
                    console.log('não foi possivel completar a ação: ', err);
                }
            };

            fetchData();
        }, [user.email]);

        return (
            <View style={{ backgroundColor: "white", padding: 10 }}>
                {UOKInfo.map((item, index) => (
                    <View key={index} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
                        <Text style={{ color: "black", marginBottom: 5 }}>
                            Project Name: {item.project_name}
                        </Text>
                        <Text style={{ color: "black", marginBottom: 5 }}>
                            Project Owner: {item.project_owner_name}
                        </Text>
                        <Text style={{ color: "black" }}>
                            Delivery Date: {item.delivery_date}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    const UserIncludedKanbans = () => {

        const [UOKInfo, setUOKInfo] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const snapshot = await db.collection("kanban")
                        .where('participants', 'array-contains', user.email)
                        .get();

                    if (snapshot.empty) {
                        console.log('nao tem...');
                        return;
                    }

                    const data = snapshot.docs.map(doc => doc.data());
                    setUOKInfo(data);
                } catch (err) {
                    console.log('não foi possivel completar a ação: ', err);
                }
            };

            fetchData();
        }, [user.email]);

        return (
            <View style={{ backgroundColor: "white", padding: 10 }}>
                {UOKInfo.map((item, index) => (
                    <View key={index} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
                        <Text style={{ color: "black", marginBottom: 5 }}>
                            Project Name: {item.project_name}
                        </Text>
                        <Text style={{ color: "black", marginBottom: 5 }}>
                            Project Owner: {item.project_owner_name}
                        </Text>
                        <Text style={{ color: "black" }}>
                            Delivery Date: {item.delivery_date}
                        </Text>
                    </View>
                ))}
            </View>
        );
    }
    // console.log()

    return (
        <ImageBackground
            source={require("./assets/images/bg/Gsg9-scaleform-bg.png")}
            style={styles.background}
        >

            <View style={styles.bgTint}></View>
            <View style={styles.posAbslt}>
                <Image source={require("./assets/images/logo/logovalve.png")} style={styles.valveLogo}></Image>

                <View style={styles.afterLogo}>

                    <UserOwnedKanbans />
                    <UserIncludedKanbans />

                </View>
            </View>
        </ImageBackground>
    );
};


//============================================ESTILIZAÇÃO========================================================================
const styles = StyleSheet.create({

    afterLogo: {
        backgroundColor: "white"

    },

    valveLogo: {
        position: "absolute",
        top: 0,
        marginTop: 40,
        width: 105,
        height: 32

    },

    bgTint: {
        position: "relative",
        height: "100%",
        width: "100%",
        backgroundColor: "#000",
        opacity: 0.6,
    },

    posAbslt: {
        position: "absolute",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 25
    },

    background: {
        flex: 1,
    }

});

export default Main;
