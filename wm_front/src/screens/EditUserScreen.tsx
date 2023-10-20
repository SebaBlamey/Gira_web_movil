import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./components/styles";
import { useRoute } from "@react-navigation/native";
import container from "./components/container";
import header from "./components/header";
import { smallButton } from "./components/button";
import normalInput from "./components/input";

const EditUserScreen: React.FC = () => {
<<<<<<< HEAD
    const navigation = useNavigation();
    const route = useRoute();
    const userData = route.params?.userData;
  
    const [newUsername, setNewUsername] = useState(userData.user?.username);
    const [newEmail, setNewEmail] = useState(userData.user?.email);
    const [newPassword, setNewPassword] = useState(userData.user?.pass);
    
    const saveChanges = async () => {

      const requestData = {
        newUsername: userData.user.username,
        newEmail: userData.user.email,
        newPassword: userData.user.password,
      };
        
        try {
          const response = await fetch(`http://10.0.2.2:3000/users/updateUser/${userData.user._id}`, {
            
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify({requestData}),
            
          });
          if(response.ok){
            console.log('Si se pudoo');
          }
          else{
            console.log('no se pudoo');
            console.log(response.status)
          }
        } catch (error) {
          console.error("Error");
        }
        navigation.navigate("UserScreen", { userData});
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Nuevo Nombre de Usuario:</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
        />
  
        <Text style={styles.label}>Nuevo Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
        />
  
        <Text style={styles.label}>Nueva Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
  
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    );
};

=======
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData;

  const [newUsername, setNewUsername] = useState(userData.user?.username);
  const [newEmail, setNewEmail] = useState(userData.user?.email);
  const [newPassword, setNewPassword] = useState(userData.user?.pass);

  const saveChanges = () => {
    userData.user.username = newUsername;
    userData.user.email = newEmail;
    userData.user.pass = newPassword;

    navigation.navigate("UserScreen", { userData });
  };

  return (
    <View style={container.style}>
      <Text
        style={{ ...header.subheader, color: "white", textAlign: "center" }}
      >
        Nuevo nombre de usuario:
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#454052"
        //value={newUsername}
        onChangeText={(text) => {
          setNewUsername(text);
        }}
      />

      <Text style={{ ...header.subheader, color: "white" }}>
        Nuevo correo electrónico:
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="Email" 
        placeholderTextColor="#454052"
        //value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />

      <Text style={{ ...header.subheader, color: "white" }}>
        Nueva contraseña:
      </Text>
      <TextInput
        style={normalInput.input}
        placeholder="****"
        placeholderTextColor="#454052"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />

      <Pressable style={smallButton.style} onPress={saveChanges}>
        <Text style={smallButton.text}>Guardar cambios</Text>
      </Pressable>
    </View>
  );
};

>>>>>>> 1e427cabc0118fda5e2ae7b1b95acfc4b0bbf067
export default EditUserScreen;
