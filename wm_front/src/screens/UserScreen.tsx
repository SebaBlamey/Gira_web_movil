import React from "react";
import { View, Text, StyleSheet } from "react-native";
import container from "./components/container";
import header from "./components/header";
import { useRoute } from "@react-navigation/native";

const UserScreen: React.FC = () => {
  const route = useRoute();
  const userData = route.params?.userData;
  const userName = userData?.username || "Nombre del Usuario";

  return (
    <View style={container.style}>
        <Text style={header.style}>{userName}</Text>
    </View>
  );
};

export default UserScreen;
