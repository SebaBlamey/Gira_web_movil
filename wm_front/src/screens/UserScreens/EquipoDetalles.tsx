import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "../components/styles";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import { smallButton } from "../components/button";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Integrante {
  user: string;
  role: string;
  _id: string;
}

const EquipoDetalles: React.FC = () => {
  const route = useRoute();
  const teamData = route.params?.equipo;
  const [integrantes, setIntegrantes] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [allcamps, setAllcamps] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [existingEmail, setExistingEmail] = useState(false);
  const [userAdded, setUserAdded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/users/all");
        if (response.ok) {
          const data = await response.json();
          setAllUsers(data);
        }
      } catch (error) {
        console.error("Error al obtener la lista de usuarios", error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usersData = await Promise.all(
        teamData.integrantes.map(async (integrante: Integrante) => {
          const userId = integrante.user;
          const response = await fetch(
            `http://10.0.2.2:3000/users/findById/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const userData: User = await response.json();
          return userData;
        })
      );
      setIntegrantes(usersData);
    };

    fetchUsernames();
  }, [teamData.integrantes]);

  const isEmailValid = (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleNewMemberTeam = async () => {
    setUserAdded(false);
    if (!email) {
      setAllcamps(false);
      return;
    }
    if (!isEmailValid(email)) {
      setEmailValid(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:3000/equipo/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _idTeam: teamData._id,
          _userEmail: email,
          _role: "Miembro",
        }),
      });
      if (response.ok) {
        shouldLoad ? setShouldLoad(false) : setShouldLoad(true);
        setUserAdded(true);
        setTimeout(() => {}, 2000);
        setLoading(false);
      } else if (response.status === 409) {
        const errorResponse = await response.json();
        if (errorResponse.message) {
          setExistingEmail(true);
        }
      }
    } catch (error) {
      setUserAdded(false);
      console.error("Error de red", error);
    }
  };

  const teamName = teamData?.nombre || "Nombre del equipo";
  const proyecto = teamData?.trabajo || "Ninguno";

  return (
    <KeyboardAvoidingView
      behavior='height'
      style={{ flex: 1 }}
    >
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
          <Text style={{ ...prettyContainer.header, fontWeight: "bold" }}>
            {teamName.toString().toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            alignContent: "flex-start",
            marginTop: "10%",
            width: "80%",
            borderWidth: 1,
            borderColor: "#0DF5E3",
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Integrantes:
          </Text>
          <View>
            {integrantes.map((user, index) => (
              <Text key={index} style={{ color: "white", fontSize: 16 }}>
                {user.username} - {user.email}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            alignContent: "flex-start",
            marginTop: "5%",
            width: "80%",
            borderWidth: 1,
            borderColor: "#0DF5E3",
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Proyecto actual
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>{proyecto}.</Text>
        </View>
        <Text style={{ color: "white", fontSize: 20, marginTop: "10%" }}>
          Ingresar nuevo miembro:
        </Text>
        <SelectList
          boxStyles={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#0DF5E3",
            width: 300,
            alignSelf: "center",
            marginTop: "5%",
          }}
          inputStyles={{color:'white',fontSize:16}}
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
          dropdownTextStyles={{color:'white',fontSize:16}}
          closeicon={<FontAwesomeIcon icon={faXmarkCircle} color="white" size={20} />}
          searchicon={<FontAwesomeIcon icon={faMagnifyingGlass} color="white" size={20} />}
          searchPlaceholder="Buscar usuario"
          setSelected={(user) => setSelectedUser(user)}
          data={allUsers.map((user) => ({
            key: user._id,
            value: `${user.username} - ${user.email}`,
          }))}
          save="value"
        />

        <Pressable
          style={{...smallButton.style,marginTop:10}}
          onPress={handleNewMemberTeam}
          disabled={!loading || !selectedUser}
        >
          {!loading ? (
            <ActivityIndicator size="small" color="#201A30" />
          ) : (
            <Text style={smallButton.text}>{"Agregar"}</Text>
          )}
        </Pressable>
        {userAdded ? (
          <Text style={{ color: "green" }}>
            {"Usuario agregado exitosamente"}
          </Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EquipoDetalles;
