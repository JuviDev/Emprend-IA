import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí
  };

  return (
    // <KeyboardAvoidingView behavior="position">

    // </KeyboardAvoidingView>
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/Banner.png")} />
      <View style={styles.container1}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.paragraph}>
          Inicia sesión con tu cuenta de Emprend-IA
        </Text>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Exaple@email.com"
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.paragraph}>¿No tienes una cuenta? </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020202",
  },
  container1: {
    flex: 1,
    padding: 30,
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
