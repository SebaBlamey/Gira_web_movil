import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = () => {
		// logica
	}
	return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;
