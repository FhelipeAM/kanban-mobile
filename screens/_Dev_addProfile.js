import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button
} from "react-native";

import "../components/firebase"

import { auth, db } from "../components/firebase"

const AddProfile = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConfPassword] = useState("");
  const [imgFilePath, setimgFilePath] = useState("./assets/images/icons/samplePfp.webp");

  const [errorMessage, seterrorMessage] = useState("");

  const register = ({ navigation }) => {

    // console.log(`username = ${username}, email = ${email}, password = ${password}, confPassword = ${conPassword} `)

    if (password != conPassword) {
      seterrorMessage('As senhas não se coincidem.');
      return
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;

        db.collection('users').doc(user.uid).set({
          username: username,
          email: email,
          imgUrl: imgFilePath,
        });

        navigation.navigate("PageList", { messageType: "success", message: "Usuário cadastrado com sucesso!" })
      })
      .catch(error => {

        switch (error.code) {
          case 'auth/email-already-in-use':
            seterrorMessage('Este email já está em uso. Por favor, use outro email.');
            break;
          case 'auth/invalid-email':
            seterrorMessage('Formato de email inválido. Por favor, insira um email válido.');
            break;
          case 'auth/operation-not-allowed':
            seterrorMessage('O registro de usuários está desativado. Por favor, entre em contato com o suporte.');
            break;
          case 'auth/weak-password':
            seterrorMessage('A senha é muito curta. Por favor, insira uma senha com pelo menos 6 caracteres.');
            break;
          default:
            seterrorMessage('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
            break;
        }

        console.log(error)

      });
  }

  return (
    <ImageBackground
      source={require("./assets/images/bg/Gsg9-scaleform-bg.png")}
      style={styles.background}
    >

      <View style={styles.bgTint}></View>

      <View style={styles.posAbslt}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.Veiga}
            source={require("./assets/images/logo/logovalve.png")}
          />
        </View>
        <View style={{ textAlign: "left" }}>

          <Text
            style={{
              color: "white",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            Username:
          </Text>
          <TextInput
            placeholder="Nome de usuário"
            onChangeText={(value) => setUsername(value)}
            style={styles.input}
          />

          <Text
            style={{
              color: "white",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            Email:
          </Text>
          <TextInput
            placeholder="Usuario@gmail.com"
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>
        <View style={{ textAlign: "left" }}>
          <Text
            style={{
              color: "white",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            Senha:
          </Text>

          <TextInput
            placeholder="*****************"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            style={styles.input}
          />

          <Text
            style={{
              color: "white",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            Confirmar senha:
          </Text>

          <TextInput
            placeholder="*****************"
            secureTextEntry={true}
            onChangeText={(value) => setConfPassword(value)}
            style={styles.input}
          />
        </View>

        {errorMessage != "" && (
          <Text
            style={styles.errormsg}
          >
            {errorMessage}
          </Text>

        )}

        <TouchableOpacity style={styles.button} onPress={() => register({ navigation })}>
          <Text style={styles.buttonText}>registrar</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};


//============================================ESTILIZAÇÃO========================================================================
const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
  },
  imageContainer: {
    width: "auto",
    height: "auto",

    padding: 40,
  },
  Veiga: {
    width: 240,
    height: 69,
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
  },

  input: {
    color: "black",
    fontSize: 15,
    backgroundColor: "#f0e5e5",
    borderRadius: 5,
    margin: 10,
    textAlign: "left",
    paddingLeft: 10,
    width: 300,
    height: 50,
  },
  buttonContainer: {
    marginTop: 30,
    width: 120,
    height: 130,
    borderRadius: 5,
    overflow: "hidden", // Ensure button corners are rounded
  },
  buttonText: {
    color: "white",
    fontSize: 32, // Aumenta o tamanho da fonte do texto do botão
    backgroundColor: "#F74843",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden", // Ensure button corners are rounded
    width: 153.19,
    height: 53.53,
    padding: "auto",
  },
  buttonText2: {
    width: 253,
    height: 53,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 0
  },
  gogle: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  google: {
    position: "absolute",
    color: "black",
    fontSize: 22, // Aumenta o tamanho da fonte do texto do botão
  },
  errormsg: {
    color: "#FA352D",
    alignItems: "center",
    backgroundColor: "#323232",
    borderRadius: 10,
    padding: 7,
    margin: 10
  }
});

export default AddProfile;
