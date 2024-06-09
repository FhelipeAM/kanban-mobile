import React, { useState } from "react";
import {
    Image,
    View,
    Text,
    Button
} from "react-native";

import { auth } from "../../components/firebase";

// import { getStorage } from "firebase/storage";

const Profile = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState();

    auth.onAuthStateChanged((user) => { setUser(user) });

    function userSignOut() {
        auth.signOut()
        navigation.navigate("Login")
    }

    async function addNewTodo() {
        await firestore.collection('users').doc(user.uid).set({
            username: username,
            email: email
          });
    }

    if (user) {
        return (
            <View style={{ marginTop: 20 }}>
                <Image source={user.imageUrl} />

                <Text>nome: {user.username}</Text>
                <TextInput
                    placeholder="User@gmail.com"
                    onChangeText={(value) => setUsername(value)}
                    style={styles.input}
                />
                <Text>email: {user.email}</Text>
                <Text>uid: {user.uid}</Text>
                <Button title="Logout" onPress={userSignOut} />
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