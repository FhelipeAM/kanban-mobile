import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

import "../components/firebase"

import { auth, db } from "../components/firebase"

const Main = ({ navigation }) => {

    const user = auth.currentUser;
    const [username, setUsername] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userUid, setUid] = useState("");
    const [imgFilePath, setimgFilePath] = useState("./_assets/images/icons/samplePfp.webp");

    const [itemName, setItemName] = useState("");
    const [itemStatus, setItemStatus] = useState("");
    const [itemUid, setitemUid] = useState("");

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

        const fetchItemData = async () => {
            try {
                const itemDoc = await db.collection('kanban-itens')
                    .where('item_owner_name', '==', username)
                    .get();
                if (itemDoc.exists) {
                    const itemData = itemDoc.data();
                    setItemName(itemData.item_name);
                    setItemStatus(itemData.item_status);
                    setitemUid(itemData.item_uid);
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

    if (!user) {
        navigation.navigate("Login")
        return
    }

    const openKanbanWithId = (projectId) => {

        console.log(projectId)

        navigation.navigate("kanbanContent", { projectId })

    }

    const UserOwnedKanbans = () => {
        const [UOKInfo, setUOKInfo] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const snapshot = await db.collection("kanban")
                        .where('project_owner_email', '==', user.email)
                        .get();

                    if (snapshot.empty) {
                        console.log('nao tem...');
                        return;
                    }

                    const data = snapshot.docs.map(doc => doc.data());
                    setUOKInfo(data);
                } catch (err) {
                    console.log('não foi possivel completar a ação: ', err);
                }
            };

            fetchData();
        }, [user.email]);

        return (
            <View style={{ padding: 10 }}>
                {UOKInfo.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => openKanbanWithId(item.project_uid)}>
                        <View style={styles.kanbanItemContainer}>

                            <View style={styles.DFlex}>
                                {/* <View style={styles.colorDivCont}>
                                    <View style={getStatusStyle(itemStatus)}></View>
                                </View> */}

                                <View style={styles.kanbanPNPOCont}>
                                    <Text style={styles.kanbanTitle}>
                                        {item.project_name}
                                    </Text>
                                    <Text style={styles.kanbanPOText}>
                                        De: {item.project_owner_name}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.kanbanDeliverDate}>
                                Prazo: {item.delivery_date}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
                }
            </View >
        );
    };

    const UserIncludedKanbans = () => {

        const [UOKInfo, setUOKInfo] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const snapshot = await db.collection("kanban")
                        .where('participants', 'array-contains', user.email)
                        .get();

                    if (snapshot.empty) {
                        console.log('nao tem...');
                        return;
                    }

                    const data = snapshot.docs.map(doc => doc.data());
                    setUOKInfo(data);
                } catch (err) {
                    console.log('não foi possivel completar a ação: ', err);
                }
            };

            fetchData();
        }, [user.email]);

        return (
            <View style={{ padding: 10 }}>
                {UOKInfo.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => openKanbanWithId(item.project_uid)}>
                        <View key={index} style={styles.kanbanItemContainer}>

                            <View style={styles.DFlex}>
                                {/* <View style={styles.colorDivCont}>
                                    <View style={getStatusStyle(itemStatus)}></View>
                                </View> */}

                                <View style={styles.kanbanPNPOCont}>
                                    <Text style={styles.kanbanTitle}>
                                        {item.project_name}
                                    </Text>
                                    <Text style={styles.kanbanPOText}>
                                        De: {item.project_owner_name}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.kanbanDeliverDate}>
                                Prazo: {item.delivery_date}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
                }
            </View >
        );
    }
    // console.log()

    return (
        <ImageBackground
            source={require("./_assets/images/bg/Gsg9-scaleform-bg.png")}
            style={styles.background}
        >

            <View style={styles.bgTint}></View>
            <View style={styles.posAbslt}>
                <Image source={require("./_assets/images/logo/logovalve.png")} style={styles.valveLogo}></Image>

                <View style={styles.afterLogo}>

                    <UserOwnedKanbans />
                    <UserIncludedKanbans />

                </View>
            </View>
        </ImageBackground>
    );
};


//============================================ESTILIZAÇÃO========================================================================
const styles = StyleSheet.create({

    afterLogo: {

    },

    valveLogo: {
        position: "absolute",
        top: 0,
        marginTop: 20,
        width: 105,
        height: 32

    },

    kanbanItemContainer: {
        marginBottom: 60,
        padding: 10,
        backgroundColor: '#ffffff',
        width: 306,
        height: 88,
        borderRadius: 5
    },

    DFlex: {

        display: "flex",
        flexDirection: "row"

    },

    kanbanPNPOCont: {
        paddingLeft: 5

    },

    styleA: {

        width: 36,
        height: 36,

        backgroundColor: "#316933",

        borderRadius: 5

    },

    styleB: {

        width: 36,
        height: 36,

        backgroundColor: "#316933",

        borderRadius: 5

    },

    styleC: {

        width: 36,
        height: 36,

        backgroundColor: "#316933",

        borderRadius: 5

    },

    colorDivCont: {

        width: 36,
        height: 36,

    },

    kanbanTitle: {
        color: "black",
        fontSize: 32,
        marginTop: -6
    },

    kanbanPOText: {
        color: "black",
        fontSize: 12,
        marginTop: -6
    },

    kanbanDeliverDate: {
        color: "black",
        alignSelf: "flex-end",
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
        paddingTop: 25
    },

    background: {
        flex: 1,
    }

});

export default Main;
