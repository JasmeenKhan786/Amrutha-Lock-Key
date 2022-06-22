import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
export default class MyRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      modalVisible: false,
      companyName: "",
      companyinfo: "",
      satisfaction: "",
      response: "",
      feedback: "",
      rating: "",
    };
  }
  submit = () => {
    db.collection("feedback").add({
      rating: this.state.rating,
      response: this.state.response,
      satisfaction: this.state.satisfaction,
      feedback: this.state.feedback,
      companyName: this.state.companyName,
      companyinfo: this.state.companyinfo,
      userEmail: firebase.auth().currentUser.email,
    });
  };

  getData = async () => {
    var response = await db
      .collection("request")
      .where("useremail", "==", firebase.auth().currentUser.email)
      .get();

    //for loop - map function - array

    response.docs.map((a) => {
      var temp = this.state.requests;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ requests: temp });
    });
  };

  componentDidMount() {
    this.getData();
  }
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
                this.props.navigation.navigate("home");
              }}
            >
              <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{ fontWeight: "bold", fontSize: 19 }}>Requests</Text>
            <Text></Text>
          </View>

          {this.state.requests.length===0?<Text style={{marginTop:'20%', marginHorizontal:'5%', fontSize:18, textAlign:'center'}}>Your requests will appear here!</Text>:this.state.requests.map((g) => {
            return (
              <View
              key={g.id}
                style={{
                  backgroundColor: "#26C989",
                  width: "90%",
                  padding: 10,
                  alignSelf: "center",
                  borderRadius: 10,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>{g.name}</Text>
                <Text style={{ color: "white" }}>
                  Company: {g.companyinfo.name}
                </Text>
                <Text style={{ color: "white", marginTop: 10 }}>
                  Start Date: {g.start}
                </Text>
                <Text style={{ color: "white" }}>End Date: {g.end}</Text>
                <Text style={{ color: "white", marginTop: 10 }}>
                  Type of Service: {g.type}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#eee",
                    borderRadius: 10,
                    padding: 7,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    this.setState({
                      modalVisible: true,
                      companyinfo: g.companyinfo,
                      companyName: g.companyinfo.name,
                    });
                  }}
                >
                  <Text style={{ color: "#17929B", fontWeight: "bold" }}>
                    Give Feedback
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                width: "100%",
                height: 700,
                backgroundColor: "#ccc",
                alignSelf: "center",
                marginTop: "15%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
                style={{ marginTop: 50, marginLeft: "5%" }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={{ marginHorizontal: "5%", marginTop: 30 }}>
                Please give the feedback for your experience with the company:
              </Text>
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
                <TextInput
                  style={{ width: "85%", height: 40, paddingLeft: 10 }}
                  onChangeText={(d) => {
                    this.setState({ rating: d });
                  }}
                  placeholder="Rating (1-5)"
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
                <TextInput
                  multiline={true}
                  style={{ width: "85%", height: 40, paddingLeft: 10 }}
                  onChangeText={(d) => {
                    this.setState({ response: d });
                  }}
                  placeholder="Did you recieve a response to your intial request?"
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
                <TextInput
                  multiline={true}
                  style={{ width: "85%", height: 40, paddingLeft: 10 }}
                  onChangeText={(d) => {
                    this.setState({ satisfaction: d });
                  }}
                  placeholder="Are you satisfied with our service?"
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
                <TextInput
                  style={{ width: "85%", height: 40, paddingLeft: 10 }}
                  onChangeText={(d) => {
                    this.setState({ feedback: d });
                  }}
                  placeholder="Any other feedback?"
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#26BEC9",
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
                  if(this.state.response && this.state.satisfaction && this.state.feedback && this.state.rating){
                    this.submit();
                    Alert.alert("Thank you for your valuable feedback");
                    this.setState({ modalVisible: false });
                  }
                  else{
                    alert('Please fill all the details!')

                  }
                 
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Submit Feedback
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
