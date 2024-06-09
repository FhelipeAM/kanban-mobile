import React, { useState, useEffect } from "react";
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { auth, db } from "../../components/firebase";

const Profile = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userUid, setUid] = useState("");
    const [imgFilePath, setimgFilePath] = useState("");

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

    function userSignOut() {
        auth.signOut()
        navigation.navigate("Login")
    }

    function editProfile() {
        navigation.navigate("editProfile")
    }

    if (user) {

        console.log("imgFilePath: ", imgFilePath);

        return (
            <View style={styles.screen}>
                <Image source={require("../assets/images/logo/logovalve.png")} style={styles.valveLogo}></Image>

                <View style={styles.afterLogo}>
                    <Image source={require("../assets/images/icons/samplePfp.webp")} style={styles.pfp} />

                    <Text style={[styles.textColor, styles.userName]}>Olá, {username}</Text>
                    {/* <Text style={styles.text}>email: {userEmail}</Text> */}
                    {/* <Text>uid: {userUid}</Text> */}
                    <TouchableOpacity style={styles.nonDangerousBtn} onPress={editProfile} ><Text style={styles.buttonText}>Alterar informações</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.nonDangerousBtn} ><Text style={styles.buttonText}>Notificações</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.DangerousBtn} onPress={userSignOut}><Text style={[styles.textColor, styles.buttonText]}>Logout</Text></TouchableOpacity>
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
        paddingTop: 10,
        alignItems: "center",
        color: "white",
    },

    pfp: {
        width: 100,
        height: 100,
        borderRadius: 200,

        marginTop: -120
    },

    valveLogo: {
        position: "absolute",
        top: 0,
        marginTop: 40,
        width: 105,
        height: 32,
        color: "white",

    },

    userName: {
        color: "#ffffff",
        fontSize: 32
    },

    textColor: {
        color: "#ffffff"
    },

    buttonText: {
        fontSize: 20
    },

    afterLogo: {
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginTop: 120,
        width: 340,
        height: 476,
        backgroundColor: "#333639",
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

export default Profile