import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import db from "../config";
export default class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route.params.id,
      info: [],
      services: [],
      feedbacks: [],
    };
  }

  getData = async () => {
    var response = await db.collection("company").doc(this.state.id).get();
    this.setState({
      info: response.data(),
      services: response.data().services.split(","),
    });

    this.getFeedbacks(response.data().email);
  };
  getFeedbacks = async (companyEmail) => {
    var response = await db
      .collection("feedback")
      .where("companyinfo.email", "==", companyEmail)
      .limit(3)
      .get();

    response.docs.map((a) => {
      var temp = this.state.feedbacks;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ feedbacks: temp });
    });
  };
  componentDidMount = () => {
    this.getData();
  };
  render() {

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
              Company Details
            </Text>
            <Text></Text>
          </View>

          <View
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#26C989",
              height: "100%",
              marginTop: 100,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Image
              source={{ uri: this.state.info.image }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                position: "absolute",
                top: -30,
              }}
            />

            <Text
              style={{
                marginLeft: "5%",
                fontWeight: "bold",
                fontSize: 18,
                marginTop: "25%",
              }}
            >
              {this.state.info.name}
            </Text>
            <Text style={{ marginHorizontal: "5%", color: "gray" }}>
              {this.state.info.email}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: "5%",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <AntDesign name="phone" size={20} color="black" />
              <Text style={{ marginTop: 5, marginLeft: 5 }}>
                {this.state.info.contact}
              </Text>
            </View>
            <Text
              style={{
                marginHorizontal: "5%",
                fontSize: 15,
                marginTop: 20,
              }}
            >
              {this.state.info.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: "5%",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <EvilIcons name="location" size={24} color="black" />
              <Text style={{}}>{this.state.info.address}</Text>
            </View>

            <Text
              style={{
                marginHorizontal: "5%",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Services
            </Text>
            <ScrollView
              horizontal
              contentContainerStyle={{
                height: 70,
                marginTop: 20,
              }}
            >
              {this.state.services.map((h) => {
                return (
                  <View
                  key={h}
                    style={{
                      backgroundColor: "white",
                      width: 100,
                      height: "100%",
                      borderRadius: 10,
                      marginHorizontal: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#17929B",
                        fontWeight: "bold",
                      }}
                    >
                      {h}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>

            {this.state.feedbacks.length === 0 ? (
              <Text></Text>
            ) : (
              <Text
                style={{
                  marginHorizontal: "5%",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 30,
                }}
              >
                Feedbacks
              </Text>
            )}

            <ScrollView horizontal>
              {this.state.feedbacks.length === 0 ? (
                <Text></Text>
              ) : (
                this.state.feedbacks.map((k) => {
                  return (
                    <View
                    key={k.id}
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 10,
                        width: 200,
                        height:100,
                        marginTop: 10, 
                        borderRadius: 10,
                        alignSelf: "center",
                        justifyContent: "center",
                        marginHorizontal: 10,
                      }}
                    >
                      <Text style={{}}>{k.feedback}</Text>
                    </View>
                  );
                })
              )}
            </ScrollView>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
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
                this.props.navigation.navigate("request", {
                  info: this.state.info,
                });
              }}
            >
              <Text
                style={{
                  color: "#17929B",

                  fontWeight: "bold",
                }}
              >
                Place Request
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
