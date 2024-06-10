import React, { useState } from "react";
import { AppRegistry, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { auth } from "./components/firebase"

// imports de telas
import SplashScreen from "./screens/splashscreen";
import Login from "./screens/login";
import PageList from "./pagelist";
import AddKanban from "./screens/kanbanPages/addkanban";
import AddProfile from "./screens/_Dev_addProfile";
import Profile from "./screens/profile/profile";
import EditProfile from "./screens/profile/editProfile";
import KanbanContent from "./screens/kanbanPages/kanban-content";
import Main from "./screens/main";
import Addlist from "./screens/kanbanItemPages/addlist";
import UpdateList from "./screens/kanbanItemPages/updatelist";
import DeleteList from "./screens/kanbanItemPages/deletelist";

AppRegistry.registerComponent("main", () => App);

const Stack = createStackNavigator();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("PageList");

  const user = auth.currentUser;

  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleNavigationChange = (routeName) => {
    setCurrentScreen(routeName);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        // DEVELOPER-- switch to Splash after all the software is completed
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="_dev_addProfile"
          component={AddProfile}
          options={{
            headerShown: false,
            setMsg: { setMessage },
            setMsgType: { setMessageType }
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("_dev_addProfile"),
          })}
        />
        {/* DEVELOPER SCREEN!!! DELETE/MAKE UNREACHABLE AFTER DEVELOPMENT COMPLETED */}
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
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("PageList"),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("Profile"),
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
          name="addList"
          component={Addlist}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("addlist"),
          })}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("editProfile"),
          })}
        />
        <Stack.Screen
          name="kanbanContent"
          component={KanbanContent}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("editProfile"),
          })}
        />
        <Stack.Screen
          name="updateList"
          component={UpdateList}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("updateList"),
          })}
        />
        <Stack.Screen
          name="deleteList"
          component={DeleteList}
          options={{
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            focus: () => handleNavigationChange("deleteList"),
          })}
        />
      </Stack.Navigator>

      {/* {route.params.messageType && route.params.messageType && (
        <OverheadMessage messageType={route.params.messageType} message={route.params.message} />
      )} */}

      {currentScreen != "Splash" && currentScreen != 'Login' && currentScreen != '_dev_addProfile' && (
        <Navbar user={user} cs={currentScreen} />
      )}
    </NavigationContainer>
  );
}

const Navbar = ({ user, cs }) => {
  const navigation = useNavigation();

  // if (!user && cs != "Login") {

  //   navigation.navigate('Login')

  // } 
  if (user) {
    return (
      <View
        style={styles.navbar}
      >

        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}><Image source={require("./screens/_assets/images/icons/samplePfp.webp")} style={styles.pfpImg}></Image></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('AddKanban') }}><Image source={require("./screens/_assets/images/icons/addkanban.png")} style={styles.pfpImgCenter}></Image></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Main') }}><Image source={require("./screens/_assets/images/icons/kanbanlist.png")} style={styles.pfpImg}></Image></TouchableOpacity>

      </View>
    );
  } else {
    return (
      <View
        style={styles.navbar}
      >

        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}><Image source={require("./screens/_assets/images/icons/npPfp_noUser.jpg")} style={styles.pfpImg}></Image></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('AddKanban') }}><Image source={require("./screens/_assets/images/icons/addkanban.png")} style={styles.pfpImgCenter}></Image></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Splash') }}><Image source={require("./screens/_assets/images/icons/kanbanlist.png")} style={styles.pfpImg}></Image></TouchableOpacity>

      </View>
    );
  }
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

  navbar: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    bottom: 0,
    width: "100%",
    height: 60,
    justifyContent: "space-around",
    backgroundColor: "#2E2F30",
    alignItems: "center",

  }

});

