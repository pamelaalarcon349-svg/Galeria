import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";

export function HomeView() {
  return (

      <View style={styles.container}>
        <Text style={styles.title}>App</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/gallery");
          }}
        >
          <Text style={styles.text}>Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/account");
          }}
        >
          <Text style={styles.text}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/notas");
          }}
        >
          <Text style={styles.text}>Notas</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 60,
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
 
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#f4e154",
    borderRadius: 50,
    //width: 250,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff00c8ff",
    marginBottom: 30,
  },
});
