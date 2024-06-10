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

import SelectDropdown from "react-native-select-dropdown";

const KanbanContent = ({ route, navigation }) => {

    const user = auth.currentUser;

    const [currentDropdownselection, SetCurSec] = useState("")

    const { projectId } = route.params;

    console.log("hello " + currentDropdownselection)

    const KanbanTitles = [
        { title: "A fazer" },
        { title: "Fazendo" },
        { title: "feito" }
    ];

    const ShowFirebaseFetchRes = () => {
        const [KI, setKI] = useState([]);

        useEffect(() => {

            const fetchData = async () => {
                try {
                    const snapshot = await db.collection("kanban-itens")
                        .where('item_status', '==', currentDropdownselection)
                        .where('project_uid', '==', projectId)
                        .get();

                    if (snapshot.empty) {
                        console.log('nao tem...');
                        return;
                    }

                    const data = snapshot.docs.map(doc => doc.data());
                    setKI(data);
                } catch (err) {
                    console.log('não foi possivel completar a ação: ', err);
                }
            };

            fetchData();
        })

        return (
            <View style={{ padding: 10 }}>
                {KI.map((item, index) => (
                    <TouchableOpacity onPress={() => { openKanbanWithId(item.item_uid) }}>
                        <View key={index} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
                            <Text style={{ color: "black", marginBottom: 5 }}>
                                item Name: {item.item_name}
                            </Text>
                            <Text style={{ color: "black", marginBottom: 5 }}>
                                item Owner: {item.item_owner_name}
                            </Text>
                            <Text style={{ color: "black" }}>
                                Delivery Date: {item.delivery_date}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }



    function updateContentDisplay(selectedItem) {

        console.log(selectedItem.title)
    }

    const openAddList = () => {

        navigation.navigate("addList", { projectId })

    }

    return (
        <ImageBackground
            source={require("./assets/images/bg/Gsg9-scaleform-bg.png")}
            style={styles.background}
        >

            <View style={styles.bgTint}></View>
            <View style={styles.posAbslt}>
                <Image source={require("./assets/images/logo/logovalve.png")} style={styles.valveLogo} />

                <View style={styles.afterLogo}>

                    <SelectDropdown
                        data={KanbanTitles}
                        onSelect={(selectedItem, index) => {
                            updateContentDisplay(selectedItem); SetCurSec(selectedItem.title)
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

                    <TouchableOpacity style={{ backgroundColor: "white" }} onPress={openAddList}><Text>Adicionar item</Text></TouchableOpacity>

                    <ShowFirebaseFetchRes></ShowFirebaseFetchRes>

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
        marginTop: 40,
        width: 105,
        height: 32

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

export default KanbanContent;
