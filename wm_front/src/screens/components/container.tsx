import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const container = StyleSheet.create({
    style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#201A30',
        color: 'white',
    },
});

export const prettyContainer = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#201A30'
    },
    headerContainer: {
      backgroundColor: '#0DF5E3',
      width: '100%',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      alignItems: 'center',
      padding: 10,
    },
    image: {
      width: 50,
      height: 50,
    },
    header: {
      fontSize: 20,
    },
    team: {
      fontSize: 16,
      color: 'black',
    },
  });


export const roundedContainer = StyleSheet.create({
  container: {
    backgroundColor: "#201A30",
    padding: 10,
    borderRadius: 10,
    width: 300, 
    alignSelf: "center",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#0DF5E3"
  },
  title: {
    color: "#0DF5E3",
    fontSize: 14,
    fontWeight: "bold",
  },
  content: {
    color: "white",
    fontSize: 16,
  },
});


export default container