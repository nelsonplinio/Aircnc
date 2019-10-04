import React, { useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import api from "../services/api";


const Book = ({ navigation }) => {
  console.log(navigation);
  const { _id } = navigation.getParam("spot");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      setUser(user);
    });
  }, []);

  async function handleSubmit() {
    await api.post(
      `/spots/${_id}/bookings`,
      {
        date
      },
      {
        headers: {
          user
        }
      }
    );

    Alert.alert("Solicitacao de reserva enviada.");
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual  data você quer reservar?"
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize="words"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Solicitar reservar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    textAlign: "center"
  }
});

export default Book;
