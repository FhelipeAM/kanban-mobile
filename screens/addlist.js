import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";

import { auth, db } from "../components/firebase"

const Addlist = ({ route, navigation }) => {

  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userUid, setUid] = useState("");
  const [imgFilePath, setimgFilePath] = useState("./assets/images/icons/samplePfp.webp");

  const { projectId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await db.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setEmail(userData.email.toLowerCase());
            setUid(user.uid)
            // setimgFilePath(userData.imgUrl)
          }
        }
      }
      catch (error) {
        console.log("Erro: ", error);
      }
    };

    fetchUserData();

  }, []);

  const [itemName, setitemName] = useState("");

  const KanbanTitles = [
    { title: "A fazer" },
    { title: "Fazendo" },
    { title: "feito" }
  ];

  const submit = () => {

    var item_uid = Math.random().toString(36).substr(2)

    if (user) {

      db.collection('kanban-itens').doc(item_uid).set({
        item_name: itemName,
        item_uid: item_uid,
        item_status: "A fazer",
        item_owner_name: username,
        item_owner_email: userEmail,
        item_owner_uid: userUid,
        project_uid: projectId,
      });

      navigation.navigate("PageList")
    }


    navigation.navigate("kanbanContent", { projectId })
  }

  const cancel = () => {
    navigation.navigate("kanbanContent", { projectId })
  }

  return (
    <ImageBackground
      // source={require("./assets/images/bg/fundin.webp")}
      style={styles.background}
    >
      <View style={styles.container}>

        <View style={styles.box}>

          <Text style={styles.textotitulo}>Nova Lista</Text>

          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setitemName}
            placeholder="Nome da tarefa"
          />

          {/* <TextInput
            style={styles.input}
            value={colunas}
            onChangeText={setColunas}
            placeholder="Título"
          /> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.al}>
              <Text style={styles.buttonText2} onPress={submit}>ADICIONAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.al}>
              <Text style={styles.buttonText} onPress={cancel}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
//============================================ESTILIZAÇÃO========================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //IMAGEM DE FUNDO
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
  },
  //CAIXINHA CINZA
  box: {
    backgroundColor: "#2E2F30",
    padding: 20,
    borderRadius: 10,
    width: 333,
    height: 269,
  },
  //INPUTS
  input: {
    backgroundColor: "#F0E5E5",
    height: 43,
    width: 276,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textotitulo: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 15, // Aumenta o tamanho da fonte do texto do botão
    backgroundColor: "#F74843",
    marginTop: 20,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden", // Ensure button corners are rounded
    width: 134,
    height: 40,
    marginLeft: 20,

  },
  buttonText2: {
    color: "black",
    fontSize: 15, // Aumenta o tamanho da fonte do texto do botão
    backgroundColor: "#ffffff",
    marginTop: 20,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden", // Ensure button corners are rounded
    width: 134,
    height: 40,

  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row"
  },

  dropdownButtonStyle: {
    height: 43,
    width: 276,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    margin: 10
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    // fontWeight: "500",
    color: "black",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },

  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default Addlist;
