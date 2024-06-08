import React, { useState } from "react";
import {
    Image,
    View,
    Text,
    Button
} from "react-native";

import { auth } from "../components/firebase";

const Profile = ({navigation}) => {
    const [user, setUser] = useState(null);

    auth.onAuthStateChanged((user) => { setUser(user) });
    
    function userSignOut() {
        auth.signOut()
        navigation.navigate("Login")
    }

    if (user) {
        return (
            <View style={{marginTop:20}}>
                <Image source={user.imageUrl}/>
                <Text>nome: {user.username}</Text>
                <Text>email: {user.email}</Text>
                <Text>uid: {user.uid}</Text>
                <Button title="Logout" onPress={userSignOut} />
            </View>
        ) 
    } else {
        return (
            <View style={{marginTop:20}}>
                <Text>Sem usuário autenticado</Text>
            </View>
        ) 
    }

}

export default Profile