import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

// Firebase-Database
import { FIREBASE_AUTH } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
    );
  }
  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Por favor ingrese todos los datos");
      setLoading(false);
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      setLoading(false);
    } catch (err) {
      alert("Correo o Contraseña Incorrecta");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <Image style={styles.img} source={require("../assets/Banner.png")} />
      </View>
      <View style={styles.container1}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.paragraph}>
          Inicia sesión con tu cuenta de{" "}
          <Text style={styles.text}>Emprend-IA</Text>
        </Text>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Example@correo.iue.edu.co"
          keyboardType="email-address"
          outlineColor="#52b788"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Contraseña"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.text}>Inciar sesión</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text2}>¿No tienes una cuenta? </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  container: {
    backgroundColor: "#020202",
  },
  container1: {
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
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#00FF38",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  text2: {
    color: "white",
    fontSize: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
