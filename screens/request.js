import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
export default class Request extends React.Component {
  sendrequest = () => {
    db.collection("request").add({
      name: this.state.name,
      type: this.state.type,
      start: this.state.start,
      end: this.state.end,
      quantity: this.state.quantity,
      budget: this.state.budget,
      address: this.state.address,
      contact: this.state.contact,
      comments: this.state.comments,
      code: this.state.code,
      companyinfo: this.state.companyinfo,
      useremail: firebase.auth().currentUser.email,
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      start: "",
      end: "",
      quantity: "",
      budget: "",
      address: "",
      contact: "",
      code: "",
      comments:'',
      companyinfo: props.route.params.info,
    };
  }
  sendEmail = () => {
    var emailTo = this.state.companyinfo.email;
    var message =
      "Hi " +
      this.state.companyinfo.name + 
      ", this is \n\n\n\n" +
      this.state.name +
      ". I am interested in your services. Following are my requirements: \n\n\n\n" +
      "Type of Service - \n\n\n\n" +
      this.state.type +
      "   Start of Service - \n\n\n\n" +
      this.state.start +
      "   End of Service - \n\n\n\n" +
      this.state.end +
      "   Quantity of Service Members - \n\n\n\n" +
      this.state.quantity +
      "   Budget - \n\n\n\n" +
      this.state.budget +
      "   Services required at - \n\n\n\n" +
      this.state.address +
      "   Contact Info - \n\n\n\n" +
      this.state.contact +
      "   Additional Comments - " +
      this.state.comments +
      "   Dscount Codes - " +
      this.state.code;

    Linking.openURL(
      "mailTo:" +
        emailTo +
        "?subject=Lock And Key Service Request&body= " +
        message
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
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
                this.props.navigation.goBack();
              }}
            >
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{ fontWeight: "bold", fontSize: 19 }}>
              Make A Request
            </Text>
            <Text></Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              onChangeText={(d) => {
                this.setState({ name: d });
              }}
              placeholder="Name"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ type: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Type of Service Wanted"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ quantity: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Quantity of Service Members"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ start: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Start Date of Service"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ end: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="End Date of Service"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ budget: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Budget for Service"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ address: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Address"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ contact: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Contact Info"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ comments: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Additional Comments"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: "#fff",
              width: "80%",
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              onChangeText={(d) => {
                this.setState({ code: d });
              }}
              style={{ width: "85%", height: 40, paddingLeft: 10 }}
              placeholder="Discount Codes(Not Required)"
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
              marginBottom: 20,
            }}
            onPress={() => {
              if (
                this.state.name &&
                this.state.start &&
                this.state.end &&
                this.state.quantity &&
                this.state.budget &&
                this.state.address &&
                this.state.contact &&
                this.state.comments
              ) {
                this.sendrequest();
                this.sendEmail();
              } else {
                alert("Please fill all the details!");
              }
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Submit Request
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
