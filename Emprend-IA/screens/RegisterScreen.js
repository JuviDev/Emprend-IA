import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Lógica de registro aquí
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.paragraph}>
        Registrate con tu cuenta de Emprend-IA
      </Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Contraseña"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.paragraph}>¿Ya tienes una cuenta? </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#020202",
    justifyContent: "center",
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
