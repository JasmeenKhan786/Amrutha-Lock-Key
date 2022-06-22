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

export default class Login extends React.Component {
  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        Alert.alert("Welcome Back");
        this.props.navigation.replace("home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
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
            Welcome back!
          </Text>

          <Text style={{ alignSelf: "center", color: "grey" }}>
            Log in to your existant account with us
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
              secureTextEntry={true}
              onChangeText={(val) => {
                this.setState({ pass: val });
              }}
            />
          </View>

          <Text
            style={{
              marginTop: 10,
              fontWeight: "bold",
              color: "#26C989",
              alignSelf: "flex-end",
              marginRight: "10%",
            }}
            onPress={() => {
              this.props.navigation.replace("forgot");
            }}
          >
            Forgot Password?
          </Text>

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
              if(this.state.email && this.state.pass){
                this.login();

              }
              else{
                alert('Please fill all the details!')
              }
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>LOG IN</Text>
          </TouchableOpacity>

          <Text
            style={{ alignSelf: "center", marginVertical: 30 }}
            onPress={() => {
              this.props.navigation.replace("signup");
            }}
          >
            Dont have an account?{" "}
            <Text style={{ color: "#26C989", fontWeight: "bold" }}>
              {" "}
              Sign Up{" "}
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
