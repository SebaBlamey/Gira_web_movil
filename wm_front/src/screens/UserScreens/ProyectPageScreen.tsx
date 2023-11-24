import React, { useEffect, useState } from "react";
import { View, Image, Text, ActivityIndicator, Pressable } from "react-native";
import styles from "../components/styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { container, prettyContainer } from "../components/container";
import header from "../components/header";
import { defaultButton, equipoButton } from "../components/button";

const ProyectoPage: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
  const naviagtion = useNavigation();

  return (
    <View
      style={{
        ...prettyContainer.container,
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <View style={prettyContainer.headerContainer}>
        <Image
          source={require("../../../assets/proyecto-logo.png")}
          style={{ ...styles.image }}
        />
      </View>
      <Text style={{fontSize:20, color:'#fff',marginTop:'10%'}}>
        Tus proyectos:
      </Text>
    </View>
  );
};

export default ProyectoPage;
