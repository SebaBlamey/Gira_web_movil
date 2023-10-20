import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import header from "./components/header";
import container from "./components/container";
import button from "./components/button";
import { useNavigation } from "@react-navigation/native";
import styles from "./components/styles";

const TeamPage: React.FC = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
        <Text >Hola mundo!</Text>
    </View>
  );
};

export default TeamPage;
