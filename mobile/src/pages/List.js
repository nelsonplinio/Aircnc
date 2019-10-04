import React, { useState, useEffect } from "react";
import { FlatList, AsyncStorage, Image, StyleSheet, Link } from "react-native";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
const List = ({ navigation }) => {
  const [techs, setTechs] = useState([]);

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
