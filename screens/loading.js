import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import firebase from "firebase";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace("home");
      } else {
        this.props.navigation.replace("login");
      }
    });
  }
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 18 }}>Loading..</Text>
        <ActivityIndicator color="#17929B" size="large" />
      </View>
    );
  }
}
