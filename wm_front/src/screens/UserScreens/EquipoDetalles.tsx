import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable, ActivityIndicator } from "react-native";
import styles from "../components/styles";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { prettyContainer } from "../components/container";
import { smallButton } from "../components/button";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
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
  const roles = ["Miembro", "Lider"];
  const [selectedRole, setSelectedRole] = useState<string>("Miembro");

  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
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
          const allUsersData = await response.json();

          const usersNotOnTeam = await Promise.all(
            allUsersData.map(async (user) => {
              const response = await fetch(
                `http://10.0.2.2:3000/equipo/${teamData._id}/${user.email}/userOnTeam`
              );
              const isUserOnTeam = await response.json();
              return isUserOnTeam ? null : user;
            })
          );

          const filteredUsers = usersNotOnTeam.filter(Boolean);

          setAllUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error al obtener la lista de usuarios", error);
      }
    };

    fetchAllUsers();
  }, [teamData._id]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usersData = await Promise.all(
        teamData.integrantes.map(async (integrante: Integrante) => {
          const userId = integrante.user;

          const responseRole = await fetch(
            `http://10.0.2.2:3000/${teamData._id}/${userId}/roleOnTeam`
          );
          const role = responseRole.ok ? await responseRole.text() : "Miembro";

          // Obtener los detalles del usuario
          const responseUser = await fetch(
            `http://10.0.2.2:3000/users/findById/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const userData: User = await responseUser.json();

          return {
            ...userData,
            role,
          };
        })
      );
      setIntegrantes(usersData);
    };

    fetchUsernames();
  }, [teamData._id]);

  const handleNewMemberTeam = async () => {
    setUserAdded(false);
    if (!selectedUser) return;
    console.log(`Usuario seleccionado: ${selectedUser}`);

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:3000/equipo/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _idTeam: teamData._id,
          _userEmail: selectedUser,
          _role: selectedRole,
        }),
      });
      if (response.ok) {
        shouldLoad ? setShouldLoad(false) : setShouldLoad(true);
        setUserAdded(true);
        setTimeout(() => {}, 2000);
        setLoading(false);
      }
    } catch (error) {
      setUserAdded(false);
      console.error("Error de red", error);
    }
  };

  const teamName = teamData?.nombre || "Nombre del equipo";
  const proyecto = teamData?.trabajo || "Ninguno";

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
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
                {user.email} [{user.role}]
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
            maxWidth: 300,
            width: 300,
            alignSelf: "center",
            marginTop: "5%",
          }}
          placeholder="Seleccionar usuario"
          notFoundText="No hay usuarios disponibles"
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
          setSelected={(user) => setSelectedUser(user)}
          data={allUsers.map((user) => ({
            key: user.email,
            value: `${user.username} - ${user.email}`,
          }))}
          save="key"
        />
        {selectedUser && (
          <SelectList
            placeholder="Seleccionar rol"
            notFoundText="No se encuentra el rol"
            boxStyles={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0DF5E3",
              width: 300,
              alignSelf: "center",
              marginTop: "2%",
            }}
            search={false}
            defaultOption={{ key: "0", value: roles[0] }}
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
            searchicon={
              <FontAwesome name="search" size={20} color={"#0DF5E3"} />
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
        )}

        <Pressable
          style={{ ...smallButton.style, marginTop: 10 }}
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
