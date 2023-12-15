import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const normalInput = StyleSheet.create({
    input: {
      maxWidth:400,
      width: "80%",
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#0DF5E3",
      backgroundColor: "#072E33",
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
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#0DF5E3",
        backgroundColor: "#072E33",
        alignContent: "center",
        color: "#fff",
        fontSize: 18, 
      },
  });
export default normalInput;