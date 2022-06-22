import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";
//Components - Functional & Class

//Component Lifecycle - Mounting, Updating, Unmounting

//States - to store anything
//Props - to pass information from one component/screen to another

//JSON - format
// {key:value, kay:value}

//justifyContent - main axis
//alignItems - cross axis

//margin and padding

//sequence - alignSelf, justifyContent, alignItems, margin and padding

export default class Signup extends React.Component {
  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then((userCredential) => {
        Alert.alert("Welcome to Lock&Key");
        db.collection("users").add({
          email: this.state.email,
          username: this.state.username,
        });
        this.props.navigation.replace("home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert("Something went wrong...Try again later");
      });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      confirm: "",
      username: "",
    };
  }

  render() {
    //JSX - JS + HTML
    return (
      <View style={{ flex: 1, backgroundColor: "#eee" }}>
        <ScrollView>
          <Image
            source={require("../assets/lockkey.png")}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: "15%",
            }}
          />

          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Sign Up
          </Text>

          <Text style={{ alignSelf: "center", color: "grey" }}>
            Sign up for an account with us
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              alignSelf: "center",
              backgroundColor: "white",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="user" size={24} color="grey" />
            <TextInput
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Email"
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              alignSelf: "center",
              backgroundColor: "white",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="user" size={24} color="grey" />
            <TextInput
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Username"
              onChangeText={(val) => {
                this.setState({ username: val });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "white",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="lock" size={24} color="grey" />
            <TextInput
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Password"
              onChangeText={(val) => {
                this.setState({ pass: val });
              }}
              secureTextEntry={true} 
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "white",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="lock" size={24} color="grey" />
            <TextInput
            secureTextEntry={true}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Confirm Password"
              onChangeText={(val) => {
                this.setState({ confirm: val });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#26C989",
              width: "50%",
              height: 40,
              alignSelf: "center",
              marginTop: 30,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }} 
            onPress={() => {
              if (
                this.state.email &&
                this.state.pass &&
                this.state.confirm &&
                this.state.username
              ) {
                if (this.state.pass === this.state.confirm) {
                  this.signUp();
                } else {
                  alert("Passwords do not match!");
                }
              } else {
                alert("Please fill all the details!");
              }
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>SIGN UP</Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: "center", marginVertical: 30 }}>
            Already have an account?{" "}
            <Text
              style={{ color: "#26C989", fontWeight: "bold" }}
              onPress={() => {
                this.props.navigation.replace("login");
              }}
            >
              {" "}
              Log In{" "}
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
