import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import styles from "../components/styles";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { container, prettyContainer } from "../components/container";
import header from "../components/header";
import { defaultButton, equipoButton, smallButton } from "../components/button";
import normalInput from "../components/input";

const CreateTeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [roleName, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const [allcamps, setAllcamps] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [existingTeam, setExistingTeam] = useState(false)


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  const handleCreateTeam = async () => {
    if (!teamName || !roleName) {
      setAllcamps(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:3000/equipo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: teamName,
          trabajo: "",
          integrantes: [
            {
              userId: userData.user._id,
              role: roleName,
            },
          ],
        }),
      });
      if (response.ok) {
        shouldLoad ? setShouldLoad(false) : setShouldLoad(true);
        setTimeout(() => {
          navigation.navigate("TeamPage", { userData });
        }, 2000);
        setLoading(false);
      } else if (response.status == 409) {
        const errorResponse = await response.json();
        if (errorResponse.message) {
          setExistingTeam(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          source={require("../../../assets/team-logo.png")}
          style={{ ...styles.image }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={header.style}>Crear Equipo</Text>
        <Text style={header.subheader}>Cree su equipo</Text>
        {teamName == null ? (
          <Text style={{ color: "red" }}>El equipo no es valido</Text>
        ) : null}
        <TextInput
          style={{...normalInput.input,width: 200}}
          placeholder="Nombre del equipo"
          placeholderTextColor={"#454052"}
          value={teamName}
          onChangeText={(text) => {
            setTeamName(text);
            setAllcamps(true);
          }}
        />
        {roleName == null ? (
          <Text style={{ color: "red" }}>El rol no es valido</Text>
        ) : null}
        <TextInput
          style={{...normalInput.input,width: 200}}
          placeholder="Rol"
          placeholderTextColor={"#454052"}
          value={roleName}
          onChangeText={(text) => {
            setRole(text);
            setAllcamps(true);
          }}
        />
        <Text style={{ color: "red" }}>
          {existingTeam ? "El equipo ya existe" : null}
        </Text>
        <Text style={{ color: "red" }}>
          {allcamps ? null : "Debe llenar todos los campos"}
        </Text>
        <Pressable
          style={{...smallButton.style, alignContent: "center"}}
          onPress={handleCreateTeam}
          disabled={!loading}
        >
          {!loading ? (
            <ActivityIndicator size="small" color="#201A30" />
          ) : (
            <Text style={smallButton.text}>{"Crear"}</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default CreateTeamPage;
