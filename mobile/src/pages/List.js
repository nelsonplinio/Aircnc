import React, { useEffect, useState } from "react";
import { AsyncStorage, FlatList, Image, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import socketio from "socket.io-client";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";
import env from '../../env';

const List = ({ navigation }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {

    AsyncStorage.getItem("user").then(user_id => {
      
    });

    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio(env.baseUrl, {
        query: {
          user_id
        }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}.`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(techs => techs.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("techs");
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <FlatList
        data={techs}
        style={styles.list}
        keyExtractor={tech => tech}
        renderItem={({ item }) => <SpotList tech={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 30,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 52,
    marginBottom: 32
  }
});

export default List;
