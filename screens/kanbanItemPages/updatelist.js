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

import { auth, db } from "../../components/firebase"

const UpdateList = ({ route, navigation }) => {

  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userUid, setUid] = useState("");
  const [imgFilePath, setimgFilePath] = useState("./_assets/images/icons/samplePfp.webp");

  const [itemName, setItemName] = useState("");
  const [itemStatus, setItemStatus] = useState("");

  const { itemUid, projectId } = route.params;

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
          }
        }
      }
      catch (error) {
        console.log("Erro: ", error);
      }
    };

    const fetchItemData = async () => {
      try {
        const itemDoc = await db.collection('kanban-itens').doc(itemUid).get();
        if (itemDoc.exists) {
          const itemData = itemDoc.data();
          setItemName(itemData.item_name);
          setItemStatus(itemData.item_status);
        }

        console.log(itemData)
      }
      catch (error) {
        console.log("Erro: ", error);
      }
    };

    fetchUserData();
    fetchItemData();

  }, []);

  const KanbanTitles = [
    { title: "A fazer" },
    { title: "Fazendo" },
    { title: "feito" }
  ];

  const submit = () => {

    console.log(itemUid)

    db.collection('kanban-itens').doc(itemUid).set({
      item_name: itemName,
      item_uid: itemUid,
      item_status: itemStatus,
      item_owner_name: username,
      item_owner_email: userEmail,
      item_owner_uid: userUid,
      project_uid: projectId,
    });


    navigation.navigate("kanbanContent", { projectId })
  }

  const cancel = () => {
    navigation.navigate("kanbanContent", { projectId })
  }

  return (
    <ImageBackground
      // source={require("./_assets/images/bg/fundin.webp")}
      style={styles.background}
    >
      <View style={styles.container}>

        <View style={styles.box}>

          <Text style={styles.textotitulo}>Atualizar</Text>
          <Text style={styles.textosubtitulo}>{itemName}</Text>

          <SelectDropdown
            data={KanbanTitles}
            onSelect={(selectedItem, index) => {
              setItemStatus(selectedItem.title)
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {selectedItem ? selectedItem.title : "Escolha a categoria"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="Nome da tarefa"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.al}>
              <Text style={styles.buttonText2} onPress={submit}>EDITAR</Text>
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
    height: 329,
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
    padding: 4,
  },
  textosubtitulo: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    padding: 5,
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

export default UpdateList;
