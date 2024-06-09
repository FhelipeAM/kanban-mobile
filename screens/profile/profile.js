import React, { useState, useEffect } from "react";
import {
    Image,
    View,
    Text,
    Button
} from "react-native";

import { auth, db } from "../../components/firebase";

const Profile = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userUid, setUid] = useState("");

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
                    }
                }
            } 
            catch (error) {
                console.log("Erro: ", error);
                // setError(error);
            } 
            // finally {
            //     setLoading(false);
            // }
        };

        fetchUserData();
    }, []);

    function userSignOut() {
        auth.signOut()
        navigation.navigate("Login")
    }

    if (user) {

        return (
            <View style={{ marginTop: 20 }}>
                <Image source={user.imageUrl} />

                <Text>nome: {username}</Text>
                <Text>email: {userEmail}</Text>
                <Text>uid: {userUid}</Text>
                <Button title="Logout" onPress={() => userSignOut} />
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

export default Profile