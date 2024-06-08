import React, { useState } from "react";
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

const Addlist = () => {
  const [categoria, setCategoria] = useState("");
  const [colunas, setColunas] = useState("");
  const [nomeColuna1, setNomeColuna1] = useState("");
  const [nomeColuna2, setNomeColuna2] = useState("");

  const KanbanTitles = [
    { title: "A fazer" },
    { title: "Fazendo" },
    { title: "feito" }
  ];

  return (
    <ImageBackground
      // source={require("./assets/images/bg/fundin.webp")}
      style={styles.background}
    >
      <View style={styles.container}>
        
        <View style={styles.box}>
          
          <Text style={styles.textotitulo}>Nova Lista</Text>

          <SelectDropdown
            data={KanbanTitles}
            onSelect={(selectedItem, index) => {
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) ||
                        "Escolha a categoria"}
                    </Text>
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Escolha a categoria"}
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
            value={colunas}
            onChangeText={setColunas}
            placeholder="Título"
          />
          
          <TouchableOpacity style={styles.al}>
            <Text style={styles.buttonText}>ADICIONAR</Text>
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
    height: 363,
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
    marginTop: 40,
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
