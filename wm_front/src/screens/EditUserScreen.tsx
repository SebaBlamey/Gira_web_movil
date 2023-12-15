import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./components/styles";
import { useRoute } from "@react-navigation/native";
import container from "./components/container";
import header from "./components/header";
import { smallButton } from "./components/button";
import normalInput from "./components/input";
import { Image } from "react-native";
import { prettyContainer } from "./components/container";
import { Popup } from "react-native-popup-confirm-toast";

const EditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const [newUsername, setNewUsername] = useState(userData.user?.username);
  const [newEmail, setNewEmail] = useState(userData.user?.email);
  const [newPassword, setNewPassword] = useState(userData.user?.pass);

  const saveChanges = async () => {
    const requestData = {
      newUsername,
    };

    try {
      const response = await fetch(
        `http://10.0.2.2:3000/users/${userData.user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            username: newUsername,
           }),
        }
      );
      console.log(userData.user._id);
      if (response.ok) {
        console.log("Sí se pudo");
      } else {
        console.log("No se pudo");
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error");
    }

    navigation.navigate("UserScreen", { userData });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#05161A" }}>
        <View
          style={{
            ...prettyContainer.container,
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <View style={prettyContainer.headerContainer}>
            <Image
              source={require("../../assets/persona.png")}
              style={{ ...styles.image }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ ...header.style, paddingTop: "10%" }}>
              Editar Usuario
            </Text>
            <Text style={header.subheader}>Edite su usuario</Text>
            <Text style={{ ...styles.label2, fontSize: 18 }}>
              Nuevo Nombre de Usuario:
            </Text>
            <TextInput
              style={{ ...normalInput.input, width: 300 }}
              placeholder="Correo"
              placeholderTextColor="#454052"
              value={newUsername}
              onChangeText={(text) => {
                setNewUsername(text);
              }}
            />
            <Pressable
              style={{
                ...smallButton.style,
                alignContent: "center",
                width: 300,
              }}
              onPress={() =>
                Popup.show({
                    type: 'confirm',
                    title: 'Guardar cambios',
                    textBody:'Estas seguro que quieres aplicar cambios?',
                    buttonText: 'Si',
                    confirmText: 'No',
                    iconEnabled: false,
                    modalContainerStyle : {
                      backgroundColor: '#072E33',
                      borderColor: '#0F989C',
                      borderRadius: 8,
                      borderWidth: 1,
                    },
                    titleTextStyle: {
                      color: '#0F989C',
                      fontSize: 25,
                      fontWeight: 'bold',
                    },
                    descTextStyle: {
                      color: '#fff',
                    },
                    okButtonStyle: {
                      backgroundColor: '#0F989C',
                      padding: 10,
                    },
                    confirmButtonStyle: {
                      color: '#fff',
                      borderWidth: 1,
                      borderColor: '#0F989C',
                    },
                    callback: () => {
                        saveChanges();
                        Popup.hide();
                    },
                    cancelCallback: () => {
                        Popup.hide();
                    },
                })
            }
              >
              <Text style={smallButton.text}>{"Guardar cambios"}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditUserScreen;
