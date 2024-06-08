import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
} from "react-native";

// DEVELOPER SCREEN!!! DELETE/MAKE UNREACHABLE AFTER DEVELOPMENT COMPLETED
const PageList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to AddProfile"
        onPress={() => navigation.navigate("_dev_addProfile")}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Splash"
        onPress={() => navigation.navigate("Splash")}
      />
      <Button
        title="Go to Novo Kanban"
        onPress={() => navigation.navigate("AddKanban")}
      />
      <Button
        title="Go to Nova lista"
        onPress={() => navigation.navigate("addlist")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    opacity: 0.6,
  },
  Logo: {
    height: 200,
    width: 200,
  },
});

export default PageList;
