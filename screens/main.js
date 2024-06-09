import React, { useState } from "react";
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

    return (
        <ImageBackground
            source={require("./assets/images/bg/Gsg9-scaleform-bg.png")}
            style={styles.background}
        >

            <View style={styles.bgTint}></View>
            <View style={styles.posAbslt}>
                <Image source={require("./assets/images/logo/logovalve.png")} style={styles.valveLogo}></Image>

                <Text>Main</Text>
            </View>
        </ImageBackground>
    );
};


//============================================ESTILIZAÇÃO========================================================================
const styles = StyleSheet.create({
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
