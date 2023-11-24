import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

export const button = StyleSheet.create({
  style: {
    backgroundColor: "#0DF5E3",
    padding: 15,
    borderRadius: 40,
    width: "80%",
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    color: "#201A30",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export const smallButton = StyleSheet.create({
  style: {
    backgroundColor: "#0DF5E3",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    color: "#201A30",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const defaultButton = StyleSheet.create({
  style: {
    backgroundColor: "#0DF5E3",
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
    color: "#201A30",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const equipoButton = StyleSheet.create({
  style: {
    backgroundColor: "#201A30",
    padding: 10,
    borderRadius: 10,
    width: 300, 
    height: 50, 
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'center', 
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#0DF5E3"
  },
  text: {
    color: "#0DF5E3",
    fontSize: 14,
    fontWeight: "bold",
  },
});


export default button;
