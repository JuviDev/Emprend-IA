import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  const handleHome = () => {
    // Lógica de registro aquí
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre de la compañia</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCompanyName(text)}
        value={companyName}
        placeholder="Emprend.IA"
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.TextArea}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#020202",
    alignContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#52b788",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  TextArea: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderColor: "#52b788",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#021b0e",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  img: {
    width: "100%",
    height: 230,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
