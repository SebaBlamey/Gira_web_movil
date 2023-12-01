import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
} from "react-native";
import styles from "../components/styles";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import header from "../components/header";
import { defaultButton, equipoButton, smallButton } from "../components/button";
import normalInput from "../components/input";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";

interface Team{
    name: string;
    _id: string;
}

const CreateProjectPage: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const [allcamps, setAllcamps] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [existingProject, setExistingProject] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={header.style}>Crear Proyecto</Text>
        <Text style={header.subheader}>Cree un proyecto</Text>
        {projectName == null ? (
          <Text style={{ color: "red" }}>El equipo no es valido</Text>
        ) : null}
        <TextInput
          style={{ ...normalInput.input, width: 200 }}
          placeholder="Nombre del proyecto"
          placeholderTextColor={"#454052"}
          value={projectName}
          onChangeText={(text) => {
            setProjectName(text);
            setAllcamps(true);
          }}
        />
        <TextInput
          style={{
            ...normalInput.descInput,
            width: 300,
            height: 120,
            textAlignVertical: "top",
          }}
          multiline={true}
          placeholder="Descripcion del proyecto"
          placeholderTextColor={"#454052"}
          value={projectDescription}
          onChangeText={(text) => {
            setProjectDescription(text);
            setAllcamps(true);
          }}
        />
        <SelectList
          boxStyles={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#0DF5E3",
            maxWidth: 300,
            width: 300,
            alignSelf: "center",
            marginTop: "5%",
          }}
          placeholder="Seleccionar usuario"
          notFoundText="No se encuentra el usuario"
          dropdownStyles={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#0DF5E3",
            maxWidth: 300,
            width: 300,
            alignSelf: "center",
          }}
          arrowicon={
            <FontAwesome name="chevron-down" size={20} color={"#0DF5E3"} />
          }
          dropdownTextStyles={{ color: "white", fontSize: 16 }}
          closeicon={<FontAwesome name="user" size={20} color={"#0DF5E3"} />}
          searchicon={<FontAwesome name="search" size={20} color={"#0DF5E3"} />}
          searchPlaceholder="Buscar usuario"
          searchPlaceholderTextColor={"white"}
          inputStyles={{ color: "white", fontSize: 16, marginLeft: 10 }}
          setSelected={(team) => setSelectedTeam(team)}
          data={team.map((team) => ({
            key: team.name,
            value: `${team.name}`
          }))}
          save="key"
        />
      </View>
    </View>
  );
};

export default CreateProjectPage;
