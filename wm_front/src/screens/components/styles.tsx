import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: "#201A30", 
      padding: 10,
    },
    username: {
      fontSize: 34,
      fontWeight: "bold",
      marginBottom: 10,
    },
    email: {
      fontSize: 24,
      color: "#666",
    },
    team: {
        backgroundColor: '#eb94d0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 24,
    },
    image: {
        width: 100,
        height: 100,
    },
    button: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: '#eb94d0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        color: '#fff',
        shadowRadius: 2,
        elevation: 2,
    },

    label: {
        fontSize: 18,
    },
    optionButton: {
        backgroundColor: "#007BFF",
        padding: 12,
        alignItems: "center",
        marginTop: 10,
    },
    optionText: {
        color: "#fff",
        fontSize: 18,
    },
    label2: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        height: 60,
        width: 70,
        color:'white',
        fontSize: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      saveButton: {
        backgroundColor: '#eb94d0',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      create: {
        backgroundColor: "#007BFF", // Color de fondo
    color: "white", // Color del texto
    padding: 10, // Relleno interno
    borderRadius: 5, // Bordes redondeados
    textAlign: "center", // Alineación del texto
    fontSize: 18, // Tamaño del texto
    },

    infoteam: {
      fontSize: 20, // Tamaño del texto
      fontWeight: "bold", // Texto en negrita
      marginVertical: 10, // Margen vertical
      textAlign: 'center',
      
    },




      
  });

export default styles;