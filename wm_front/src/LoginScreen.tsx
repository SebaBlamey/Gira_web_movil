import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen: React.FC = () => {
	const [username, setUsename] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		// despues implementar logica
		console.log(`Usuario: ${username}, Contrasena: ${password}`)
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Iniciar Sesion</Text>
			<TextInput
				style={styles.input}
				placeholder='Nombre de usuario'
				value={username}
				onChangeText={text => setUsename(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder='Contrasena'
				secureTextEntry
				value={password}
				onChangeText={text => setPassword(text)}
			/>
			<Button title='Iniciar Sesion' onPress={handleLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: '80%',
		padding: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
	}
});

export default LoginScreen;
