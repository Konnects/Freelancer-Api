import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import Mainmenu from "./component/Mainmenu";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      auth: false,
    };
  }

  handlelogin() {
    window.btoa = require("Base64").btoa;
    Axios({
      method: "GET",
      url: "https://api.fluxgen.in/aquagen/v1/auth/login",
      auth: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => res.data)
      .then(async (response) => {
        if (response.status === "success") {
          try {
            await AsyncStorage.setItem("data", JSON.stringify(response));
          } catch (error) {
            console.log(error);
          }
          this.setState({ auth: true });
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "Alert",
          "Username or password is invalid",
          [{ text: "OK" }],
          { cancelable: false }
        );
      });
  }
  render() {
    if (this.state.auth) {
      return <Mainmenu />;
    } else {
      return (
        <ImageBackground
          source={require("./assets/loginbackground.png")}
          style={styles.ImageBackground}
        >
          <View style={styles.container}>
            <Image
              source={require("./assets/logo.png")}
              style={{ marginBottom: 150, height: 150, width: 150 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(e) => this.setState({ username: e })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(e) => this.setState({ password: e })}
            />
            <View>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  this.handlelogin();
                }}
              >
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
  },
  userBtn: {
    backgroundColor: "#FFD700",
    padding: 15,
    width: "45%",
  },
  ImageBackground: {
    flex: 1,
    width: null,
    height: null,
  },
});
