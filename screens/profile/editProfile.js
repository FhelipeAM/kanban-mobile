import React, { useState, useEffect } from "react";
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from "react-native";

import { auth, db } from "../../components/firebase";

// import { getStorage } from "firebase/storage";

const EditProfile = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userUid, setUid] = useState("");
    const [imgFilePath, setimgFilePath] = useState("./_assets/images/icons/samplePfp.webp");

    const [newUsername, setNewUsername] = useState(username);

    const [itemName, setItemName] = useState("");
    const [itemStatus, setItemStatus] = useState("");
    const [itemUid, setitemUid] = useState("");
    const [projectUid, setprojectUid] = useState("");

    const user = auth.currentUser;

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

        fetchUserData();

        setNewUsername(username)
    }, []);

    var curUsername = "";

    console.log(username + userEmail + imgFilePath)
    function updateUserInfo() {

        db.collection('users').doc(userUid).set({
            username: newUsername,
            email: userEmail,
            imgUrl: imgFilePath,
        });

        auth.signOut()
        navigation.navigate("Login")
    }

    function cancelUserInfoUpdate() {

        navigation.navigate("Main")

    }

    if (user) {

        return (

            <View style={styles.screen}>
                <Image source={require("../_assets/images/logo/logovalve.png")} style={styles.valveLogo}></Image>

                <View style={styles.afterLogo}>
                    <Image source={require("../_assets/images/icons/samplePfp.webp")} style={styles.pfp} />

                    <Text style={[styles.textColor, styles.userName]}>{newUsername}</Text>
                    <TextInput
                        placeholder="Digite seu novo nome"
                        value={newUsername}
                        onChangeText={(value) => setNewUsername(value)}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.nonDangerousBtn} onPress={updateUserInfo} ><Text style={styles.buttonText}>Aplicar alterações</Text></TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ marginTop: 20 }}>
                <Text>Sem usuário autenticado</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: "#183042",

        paddingTop: 10,
        alignItems: "center",
        color: "white",
    },

    pfp: {
        width: 100,
        height: 100,
        borderRadius: 200,

        marginTop: 20
    },

    valveLogo: {
        position: "absolute",
        top: 0,
        marginTop: 40,
        width: 105,
        height: 32,

    },


    userName: {
        color: "#ffffff",
        fontSize: 32
    },

    textColor: {
        color: "#ffffff"
    },

    buttonText: {
        fontSize: 20,
        

    },

    afterLogo: {
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        width: "100%",
        height: "100%",
        borderRadius: 10

    },

    nonDangerousBtn: {
        width: 254,
        height: 66,
        borderWidth: 2,
        borderColor: "black",
        margin: 20,
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10
    },

    input: {
        fontSize: 19,
        width: 254,
        height: 66,
        borderWidth: 2,
        borderColor: "black",
        margin: 20,
        display: "flex",
        textAlign: "left",
        paddingLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10
    },

    DangerousBtn: {
        width: 254,
        height: 66,
        borderWidth: 2,
        borderColor: "black",
        margin: 20,
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F74843",
        borderRadius: 10
    }
})

export default EditProfile