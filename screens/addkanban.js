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

import { auth, db } from "../components/firebase"

import SelectDropdown from "react-native-select-dropdown";

const InputsContainer = ({ navigation }) => {

  var i = 0

  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userUid, setUid] = useState("");
  const [imgFilePath, setimgFilePath] = useState("");

  const [participants, setparticipants] = useState([]);
  const [projName, setprojName] = useState("");
  const [deliverDate, setdeliverDate] = useState(9);
  const [participantEmail, setparticipantEmail] = useState("");

  const KanbanTitles = [
    { title: "A fazer" },
    { title: "Fazendo" },
    { title: "feito" }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await db.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setEmail(userData.email);
            setUid(user.uid)
            setimgFilePath(userData.imgUrl)
          }
        }
      }
      catch (error) {
        console.log("Erro: ", error);
      }
    };

    fetchUserData();

  }, []);

  const createKanban = ({ navigation }) => {

    if (user) {

      db.collection('kanban').doc(user.uid).set({
        project_name: projName,
        delivery_date: deliverDate,
        project_owner_name: username,
        project_owner_email: userEmail,
        project_owner_uid: userUid,
        participants: participants
      });

      navigation.navigate("PageList")
    }

  }

  const addParticipant = () => {

    if (participantEmail != "") {

      setparticipants({...participants, participantEmail})
      setparticipantEmail("")

      i ++

    }

    console.log(participants)

  }

  const removeParticipant = (e) => {

    setparticipants(
      participants.splice(e.index, e.index + 1)
    )

    i = 0

    console.log(e)
    console.log(participants)

  }

  return (
    <ImageBackground
      // source={require("./assets/images/bg/fundin.webp")}
      style={styles.background}
    >
      <View style={styles.container}>

        <View style={styles.box}>

          <Text style={styles.textotitulo}>Novo Kanban</Text>

          <TextInput
            style={styles.input}
            value={projName}
            onChangeText={setprojName}
            placeholder="Nome do projeto"
          />
          {/* <Text style={styles.label}>Data de entrega: </Text> */}
          <TextInput
            style={styles.input}
            value={deliverDate}
            onChangeText={setdeliverDate}
            placeholder="Data de entrega"
          />
          <TextInput
            style={styles.participantsInput}
            value={participantEmail}
            onChangeText={setparticipantEmail}
            placeholder="participante@email.com"
          />
          <TouchableOpacity style={styles.al} onPress={() => addParticipant()}>
            <Text style={styles.addUser}>+</Text>
          </TouchableOpacity>

          {
            participants !== undefined && participants.length > 0 ?

              participants && participants.map(item => {

                return <TouchableOpacity style={styles.offset} onPress={() => removeParticipant()}><Image key={item} source={require("./assets/images/icons/samplePfp.webp")} style={styles.pfp} /><Text key={item} style={styles.participant}>{item}</Text></TouchableOpacity>

              })
              : <Text></Text>


          }
          <TouchableOpacity style={styles.al} onPress={() => createKanban({ navigation })}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
//============================================ESTILIZAÇÃO========================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  offset: {

    marginLeft: 50

  },

  pfp: {
    position: "absolute",
    margin: 7,
    marginLeft: 10,
    borderRadius: 100,
    zIndex: 1,
    height: 40,
    width: 40
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
    height: "auto",
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
  participantsInput: {
    backgroundColor: "#F0E5E5",
    height: 43,
    width: 226,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden", // Ensure button corners are rounded
    width: 134,
    height: 40,
    marginLeft: 80,

  },
  addUser: {
    backgroundColor: "#F0E5E5",
    position: "absolute",
    fontSize: 15, // Aumenta o tamanho da fonte do texto do botão
    padding: 10,
    right: 0,
    display: "flex",
    marginTop: -51.5,
    marginRight: 8,
    textAlign: "center",
    borderLeftColor: "black",
    borderLeftWidth: 2,
    width: 50,
    overflow: "hidden", // Ensure button corners are rounded
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

  },

  label: {
    color: "white",
    marginLeft: 10
  },

  participant: {
    backgroundColor: "#F0E5E5",
    height: 43,
    width: 236,
    borderColor: "gray",
    display: "flex",
    textAlign: "right",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 5,
    marginRight: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
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

export default InputsContainer;
