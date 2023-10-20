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
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    saveButton: {
        backgroundColor: "#007BFF",
        padding: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },





      
  });

export default styles;