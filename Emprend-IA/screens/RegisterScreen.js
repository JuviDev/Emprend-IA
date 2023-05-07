import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

// Firebase-Database
import { FIREBASE_AUTH, FIREBASE_DB } from "../database/firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
    );
  }

  const handleRegister = () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("Por favor ingrese todos los datos");
      setLoading(false);
      return;
    }
    try {
      const auth = FIREBASE_AUTH;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const db = FIREBASE_DB;
          addDoc(collection(db, "users"), {
            name: name,
            email: email,
            uid: user.uid,
          });

          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          setLoading(false);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.paragraph}>
        Registrate con tu cuenta de <Text style={styles.text}>Emprend-IA</Text>
      </Text>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Emprend.IA"
      />
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Ejemplo@correo.iue.edu.co"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="********"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
        <Text style={styles.text}>Resgistrar</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text2}>¿Ya tienes una cuenta? </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
