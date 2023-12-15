import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

export const button = StyleSheet.create({
  style: {
    backgroundColor: "#0F989C",
    padding: 15,
    borderRadius: 40,
    width: "80%",
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    color: "#05161A",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export const smallButton = StyleSheet.create({
  style: {
    backgroundColor: "#0F989C",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    color: "#05161A",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const defaultButton = StyleSheet.create({
  style: {
    backgroundColor: "#0F989C",
    padding: 10,
    borderRadius: 10,
    width: 300, 
    height: 50, 
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'center', 
    marginTop: 5,
  },
  text: {
    color: "#05161A",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const equipoButton = StyleSheet.create({
  style: {
    backgroundColor: "#05161A",
    padding: 10,
    borderRadius: 5,
    width: 300, 
    height: 50, 
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'center', 
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#0F989C"
  },
  text: {
    color: "#0F989C",
    fontSize: 14,
    fontWeight: "bold",
  },
});


export default button;
