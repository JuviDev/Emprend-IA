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
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import Carousel from "react-native-snap-carousel";

export default function HomeScreen() {
  const [prompt, onChangePrompt] = React.useState(
    "Cthulu, intricate sand sculpture, high detail,UHD"
  );
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imagePlaceholder, setimagePlaceholder] = React.useState(
    "https://furntech.org.za/wp-content/uploads/2017/05/placeholder-image-300x225.png"
  );

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      onChangePrompt(`Search ${prompt}..`);
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
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

  const renderItems = ({ item, index }) => (
    <Image
      style={styles.generatedImage}
      source={{
        uri: item.url,
      }}
      key={index}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>React Native Dalle-E</Text>
        <View style={styles.TextInputcontainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePrompt}
            value={prompt}
            editable
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={generateImage}>
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
        {loading ? (
          <>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Generating...</Text>
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={styles.generatedImageContainer}>
          {result.length > 0 ? (
            <Carousel
              layout={"stack"}
              layoutCardOffset={18}
              data={result}
              renderItem={renderItems}
              sliderWidth={300}
              itemWidth={300}
            />
          ) : (
            <>
              <Image
                style={styles.generatedImage}
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
  containerImages: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: 10,
  },
  loadingContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  TextInputcontainer: {
    height: 100,
    backgroundColor: "#c7c7c7",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 10,
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  generateButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
  },
  generatedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  generatedImage: {
    width: 280,
    height: 280,
  },
});
