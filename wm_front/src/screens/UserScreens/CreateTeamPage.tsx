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
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";


const CreateTeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;
  const [allcamps, setAllcamps] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [existingTeam, setExistingTeam] = useState(false)
  const roles = ["Miembro","Admin"]
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  const handleCreateTeam = async () => {
    if (!teamName || !selectedRole) {
      setAllcamps(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/equipo/create", {
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
              role: selectedRole,
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
          style={{...normalInput.input,width: 300, borderColor: "#0F989C", borderWidth: 1, marginTop: "2%", color: "white"}}
          placeholder="Nombre del equipo"
          placeholderTextColor={"#294D61"}
          value={teamName}
          onChangeText={(text) => {
            setTeamName(text);
            setAllcamps(true);
          }}
        />
        {selectedRole == null ? (
          <Text style={{ color: "red" }}>El rol no es valido</Text>
        ) : null}
        <SelectList
              placeholder="Seleccionar rol"
              notFoundText="No se encuentra el rol"
              boxStyles={{
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: "#072E33",
                borderColor: "#0F989C",
                width: 300,
                alignSelf: "center",
                marginTop: "2%",
                paddingHorizontal: '1%',
              }}
              search={false}
              defaultOption={{ key: "0", value: roles[0] }}
              dropdownStyles={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#0F989C",
                backgroundColor: "#072E33",
                maxWidth: 300,
                width: 300,
                alignSelf: "center",
              }}
              arrowicon={
                <FontAwesome name="chevron-down" size={20} color={"#0F989C"} />
              }
              dropdownTextStyles={{ color: "white", fontSize: 16 }}
              closeicon={
                <FontAwesome name="user" size={20} color={"#0F989C"} />
              }
              searchicon={
                <FontAwesome name="search" size={20} color={"#0F989C"} />
              }
              searchPlaceholder="Buscar rol"
              searchPlaceholderTextColor={"white"}
              inputStyles={{ color: "white", fontSize: 16, marginLeft: 10 }}
              setSelected={(role) => setSelectedRole(role)}
              data={roles.map((role) => ({
                key: role,
                value: role,
              }))}
              save="key"
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
