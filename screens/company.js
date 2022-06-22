import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";

export default class Company extends React.Component {
  constructor() {
    super(); 
    this.state = { 
      companies: [],
    };
  }

  getData = async () => {
    var response = await db.collection("company").get();

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
      <View style={{ flex: 1, backgroundColor:'#26BEC9' }}>
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "5%",
                marginTop: "10%",
                marginBottom: 15,
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
                Companies
              </Text>
              <Text></Text>
            </View>
            {this.state.companies.length === 0 ? (
              <Text
                style={{
                  color: "grey",
                  fontWeight: "600",
                  fontSize: 18,
                  alignSelf: "center",
                  marginVertical: 50,
                  marginHorizontal: 20,
                }}
              >
                Companies will appear here!
              </Text>
            ) : (
              this.state.companies.map((b) => {
                return (
                  <TouchableOpacity
                  key={b.id}
                    style={{
                      backgroundColor: "white",
                      width: "90%",
                      height: 110,
                      alignSelf: "center",
                      marginTop: 10,
                      borderRadius: 15,
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("services", { id: b.id });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: b.image }}
                        style={{
                          width: "40%",
                          height: "80%",
                          borderRadius: 10,
                          resizeMode: "contain",
                        }}
                      />

                      <View
                        style={{ justifyContent: "center", marginLeft: 10 }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            width: "97%",
                          }}
                        >
                          {b.name}
                        </Text>
                        <Text style={{ color: "grey" }}>{b.email}</Text>
                        <Text style={{ color: "black" }}>{b.address}</Text>

                        <Text style={{ color: "black" }}>{b.contact}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
