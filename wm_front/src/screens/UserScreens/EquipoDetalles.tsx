import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "../components/styles";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import normalInput from "../components/input";
import { smallButton } from "../components/button";

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
    const fetchUsernames = async () => {
      const usersData = await Promise.all(
        teamData.integrantes.map(async (integrante: Integrante) => {
          const userId = integrante.user;
          const response = await fetch(
            `http://localhost:3000/users/findById/${userId}`,
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
      const response = await fetch("http://localhost:3000/equipo/join", {
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
        Agrege a otro miembro
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Correo nuevo miembro"
        placeholderTextColor="#454052"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setAllcamps(true);
        }}
      />
      <Pressable
        style={smallButton.style}
        onPress={handleNewMemberTeam}
        disabled={!loading}
      >
        {!loading ? (
          <ActivityIndicator size="small" color="#201A30" />
        ) : (
          <Text style={smallButton.text}>{"Registrarse"}</Text>
        )}
      </Pressable>
      {userAdded ? (
        <Text style={{ color: "green" }}>
          {"Usuario agregado exitosamente"}
        </Text>
      ) : null}
    </View>
  );
};

export default EquipoDetalles;
