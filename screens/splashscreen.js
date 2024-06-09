import { NavigationContext } from "@react-navigation/native";
import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
} from "react-native";

const SplashScreen = ({ navigation }) => {

  async function redirectAfterTime() {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }

  redirectAfterTime();

  return (
    <ImageBackground
      source={require("./assets/images/bg/Captura de tela 2024-06-06 160614.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}></View>
      <Image
        source={require("./assets/images/logo/logovalve.png")}
        style={styles.Logo}
      ></Image>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    position: "relative",
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    opacity: 0.6,
  },
  Logo: {
    position: "absolute",
    height: 60,
    width: 200,
  },
});

export default SplashScreen;
