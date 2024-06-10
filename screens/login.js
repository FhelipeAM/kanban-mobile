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

import { auth } from "../components/firebase";

const Login = ({ navigation }) => {

  // const user = auth.currentUser;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, seterrorMessage] = useState("");

  // if (user) {

  //   // CHANGE TO MAIN PAGE
  //   navigation.navigate('PageList')

  // }

  // console.log(user);

  const logIn = ({ navigation }) => {

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;

        const userInfo = {
          email: user.email,
          uid: user.uid,
        };

        navigation.navigate('Main', { userInfo });
      })
      .catch(error => {

        switch (error.code) {

          case 'auth/user-not-found':
            seterrorMessage('Usuário não encontrado. Verifique seu email e tente novamente.');
            break;
          case 'auth/invalid-credential':
            seterrorMessage('Usuário não encontrado. Verifique seu email e tente novamente.');
            break;
          case 'auth/wrong-password':
            seterrorMessage('Senha incorreta. Verifique sua senha e tente novamente.');
            break;
          case 'auth/invalid-email':
            seterrorMessage('Email incorreto. Verifique seu email e tente novamente.');
            break;
          default:
            seterrorMessage(`Ocorreu um erro inesperado. Tente novamente mais tarde`);
            break;
        }

        console.log(error)

      });

  };

  return (
    <ImageBackground
      source={require("./_assets/images/bg/Gsg9-scaleform-bg.png")}
      style={styles.background}
    >
      <View style={styles.bgTint}></View>

      <View style={styles.posAbslt}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.Veiga}
            source={require("./_assets/images/logo/logovalve.png")}
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
            Email:
          </Text>
          <TextInput
            placeholder="User@gmail.com"
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
        </View>

        <Text
          style={{
            color: "white",
            alignItems: "center",
          }}
        >
          Esqueci minha Senha
        </Text>

        {/* <Text
          style={{
            color: "white",
            alignItems: "center",
          }}
        >
          Não tem uma conta? <Text style={{ color: "red" }}>Cadastre-se.</Text>
        </Text> */}

        {errorMessage != "" && (
          <Text
            style={styles.errormsg}
          >
            {errorMessage}
          </Text>

        )}

        <TouchableOpacity style={styles.button} onPress={() => logIn({ navigation })}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/*     <TouchableOpacity style={styles.buttonText2} onPress={() => googleAuthLogIn({navigation})}>
          <Text style={styles.google}>
            <Image
              style={styles.gogle}
              source={require("./_assets/images/icons/google.png")}
            />
            Entrar com google
          </Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    height: "100",
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
    marginTop: 40,
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
