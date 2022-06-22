import React from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
            marginTop: "10%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace("login");
            }}
          >
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Forgot Password
          </Text>
          <Text></Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 70,
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

        <TouchableOpacity
          style={{
            backgroundColor: "#26C989",
            width: "70%",
            height: 40,
            alignSelf: "center",
            marginTop: 30,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (this.state.email) {
              firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .then(() => {
                  alert("Password reset link sent!");
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert(errorMessage);
                });
            } else {
              alert("Please enter a valid email!");
            }
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Sent password reset link{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
