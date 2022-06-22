import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: [],
    };
  }

  getData = async () => {
    var response = await db.collection("company").limit(4).get();

    //for loop - map function - array

    response.docs.map((a) => {
      var temp = this.state.companies;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ companies: temp });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ width: "100%", height: 300 }}>
            <ImageBackground
              source={require("../assets/bg.png")}
              style={{ width: "100%", height: "100%" }}
            >
              <TouchableOpacity
                style={{
                  marginTop: "15%",
                  alignSelf: "flex-end",
                  marginHorizontal: "5%",
                }}
                onPress={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      this.props.navigation.replace("login");
                    })
                    .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      Alert.alert("Something Went Wrong. Try later!");
                    });
                }}
              >
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>

              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginHorizontal: "5%",
                  marginTop: 20,
                }}
              >
                Welcome Back to
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  marginHorizontal: "5%",
                  fontWeight: "bold",
                }}
              >
                Lock & Key
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: "5%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    width: "80%",
                    height: 40,
                    borderRadius: 30, 
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  <TouchableOpacity onPress={()=>{
                    alert('Feature coming soon!')
                  }}>
                  <AntDesign name="search1" size={24} color="grey" />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Search"
                    style={{ paddingLeft: 20, color: "grey" }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#F09479",
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={()=>{
                    alert('Feature coming soon!')
                  }}
                >
                  <Ionicons name="filter-sharp" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={{ backgroundColor: "#f0f0f0", flex: 1 }}>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "5%",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Security Companies
              </Text>
              <Text
                style={{ color: "grey" }}
                onPress={() => {
                  this.props.navigation.navigate("company");
                }}
              >
                See all
              </Text>
            </View>
            <ScrollView horizontal style={{ marginBottom: 15 }}>
              {this.state.companies.length === 0 ? (
                <Text
                  style={{
                    color:'grey',
                    fontWeight:'600',
                    fontSize: 18,
                    alignSelf: "center",
                    marginVertical: 50, 
                    marginHorizontal:20
                  }}
                >
                  Fetching companies for you!
                </Text>
              ) : (
                this.state.companies.map((b) => {
                  return (
                    <View
                    key={b.id}
                      style={{
                        width: 150,
                        marginTop: 20,
                        marginHorizontal: 10,
                        padding: 10,
                        backgroundColor: "white",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: 100,
                          alignSelf: "center",
                          resizeMode: "contain",
                        }}
                        source={{ uri: b.image }}
                      />
                      <Text
                        style={{
                          fontWeight: "700",
                          marginHorizontal: 10,
                          marginTop: 10,
                          textAlign: "center",
                        }}
                      >
                        {b.name}
                      </Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>

          <Image
            source={require("../assets/Birthday.png")}
            style={{
              width: "90%",
              height: 190,
              alignSelf: "center",
              borderRadius: 20,
              resizeMode: "stretch",
              overflow: "hidden",
              marginVertical: 20,
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
