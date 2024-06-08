import React, { useState } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppRegistry, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { db, auth, provider } from "./components/firebase"

import SplashScreen from "./screens/splashscreen";
import Login from "./screens/login";
import PageList from "./pagelist";
import AddKanban from "./screens/addkanban";
import Addlist from "./screens/addlist";
import AddProfile from "./screens/_Dev_addProfile";
// import addkanban from "./screens/newlist";

import OverheadMessage from "./components/OverheadMessage";

AppRegistry.registerComponent("main", () => App);

const Stack = createStackNavigator();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("PageList");
  
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleNavigationChange = (routeName) => {
    setCurrentScreen(routeName);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        // DEVELOPER-- switch to Splash after all the software is completed
        initialRouteName="PageList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="_dev_addProfile"
          component={AddProfile}
          options={{
            headerShown: false,
            setMsg:{setMessage},
            setMsgType:{setMessageType}
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("_dev_addProfile"),
          })}
          // setMsg={setMessage}
          // setMsgType={setMessageType}
        />
        <Stack.Screen
          name="PageList"
          component={PageList}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("PageList"),
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("Login"),
          })}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("Splash"),
          })}
        />
        <Stack.Screen
          name="AddKanban"
          component={AddKanban}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("AddKanban"),
          })}
        />
        <Stack.Screen
          name="addlist"
          component={Addlist}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("addlist"),
          })}
        />
      </Stack.Navigator>

      {/* {route.params.messageType && route.params.messageType && (
        <OverheadMessage messageType={route.params.messageType} message={route.params.message} />
      )} */}

      {currentScreen != "Splash" && currentScreen != 'Login' && currentScreen != '_dev_addProfile' && (
        <Navbar />
      )}
    </NavigationContainer>
  );
}

const Navbar = () => {
  const navigation = useNavigation();
  const navbarHeight = 60;

  return (
    <View
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        bottom: 0,
        width: "100%",
        height: navbarHeight,
        justifyContent: "space-around",
        backgroundColor: "#2E2F30",
        alignItems: "center",

      }}
    >
      <TouchableOpacity onPress={() => { navigation.navigate('Login') }}><Image source={require("./screens/images/icons/samplePfp.png")} style={styles.pfpImg}></Image></TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('AddKanban') }}><Image source={require("./screens/images/icons/addkanban.png")} style={styles.pfpImgCenter}></Image></TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Splash') }}><Image source={require("./screens/images/icons/kanbanlist.png")} style={styles.pfpImg}></Image></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pfpImg: {
    borderRadius: 1000,
    height: 40,
    width: 40,
  },
  pfpImgCenter: {
    borderRadius: 1000,
    height: 50,
    width: 50,
  },

  quicksandLight: {
    fontFamily: 'Quicksand-Light',
    fontSize: 20,
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
  },
  ralewayItalic: {
    fontFamily: 'Raleway-Italic',
    fontSize: 20,
  },
  ralewayThin: {
    fontFamily: 'Raleway-ThinItalic',
    fontSize: 20,
  },

});

