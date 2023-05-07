import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

// OpenAI
import { Configuration, OpenAIApi } from "openai";
import { API_TOKEN } from "@env";

// Save Image
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

export default function HomeScreen({ navigation, user }) {
  const [prompt, onChangePrompt] = useState("");
  const [companyName, onChangeCompanyName] = useState("");
  const [description, onChangeDescription] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePlaceholder, setimagePlaceholder] = useState(
    "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png"
  );

  const configuration = new Configuration({
    apiKey: API_TOKEN,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      const prompts = `High-end logo of title ${companyName}, with this features ${description}`;

      setLoading(true);

      const res = await openai.createImage({
        prompt: prompts,
        n: 4,
        size: "256x256",
      });

      setResult(
        res.data.data.map((item) => {
          return {
            url: item.url,
          };
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const downloadFromUrl = async (url) => {
    const fileName = "logo.png";

    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + fileName
    );

    save(result.uri, fileName, result.headers["Content-Type"]);
  };

  const save = async (uri, fileName, mimeType) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          mimeType
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });

            alert("Imagen guardada satisfactoriamente");
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Nombre de la Compañia</Text>
        <View style={styles.TextInputcontainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeCompanyName}
            value={companyName}
            editable
            placeholder="Emprem.IA"
          />
        </View>
        <Text style={styles.titleText}>Descripción</Text>
        <View style={styles.TextInputcontainerArea}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeDescription}
            value={description}
            editable
            multiline
            numberOfLines={4}
            placeholder="Esta compañia..."
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={generateImage}>
          <Text style={styles.generateButtonText}>Generar</Text>
        </TouchableOpacity>
        {loading ? (
          <>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Generando...</Text>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.generatedImageContainer}>
          {result.length > 0 ? (
            <View style={styles.generatedImageContainer2}>
              {result.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      downloadFromUrl(item.url);
                    }}
                  >
                    <Image
                      key={index}
                      style={styles.generatedImage}
                      source={{
                        uri: item.url,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <>
              <Image
                style={styles.generatedImage2}
                source={{
                  uri: imagePlaceholder,
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  loadingContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  TextInputcontainer: {
    height: 50,
    backgroundColor: "#c7c7c7",
    borderWidth: 2,
    borderColor: "#52b788",
    borderRadius: 10,
    marginVertical: 10,
  },

  TextInputcontainerArea: {
    height: 150,
    backgroundColor: "#c7c7c7",
    borderWidth: 2,
    borderColor: "#52b788",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  generateButton: {
    height: 50,
    width: "100%",
    backgroundColor: "#00FF38",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  generatedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  generatedImageContainer2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  generatedImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    borderRadius: 10,
  },
  generatedImage2: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
