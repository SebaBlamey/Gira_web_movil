import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const normalInput = StyleSheet.create({
    input: {
      maxWidth:400,
      width: "80%",
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#38304C",
      backgroundColor: "#38304C",
      alignContent: "center",
      color: "#fff",
      fontSize: 18,
    },
    noInput: {
      width: "80%",
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#201A30",
      backgroundColor: "#201A30",
      alignContent: "center",
      color: "#fff",
      fontSize: 18,
    },
    
      descInput: {
        maxWidth: 400,
        width: "80%",
        padding: 15, // Aumenté el padding para hacerlo más grande
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#38304C",
        backgroundColor: "#38304C",
        alignContent: "center",
        color: "#fff",
        fontSize: 20, // Aumenté el tamaño de la fuente
      },
  });
export default normalInput;