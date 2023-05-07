import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import "react-native-url-polyfill/auto";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Firebase-Database
import { FIREBASE_AUTH, FIREBASE_DB } from "./database/firebase";
import { getDocs, doc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/reducer";

const store = createStore(reducer);

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const myOptions = {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "black",
    },
    headerRight: () => (
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      >
        Cerrar Sesión
      </Button>
    ),
  };

  // get user from firebase
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === user.uid) {
            setUser(doc.data());
          }
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              options={{ ...myOptions, title: "Inicio" }}
            >
              {(props) => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <LoginScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <RegisterScreen {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  btn: {
    backgroundColor: "#00FF38",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
