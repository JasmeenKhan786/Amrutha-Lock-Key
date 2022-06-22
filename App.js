import React from "react"
import { Stylesheet, Text, View, Image, ImageBackground } from "react-native"
import Home from "./screens/home"
import MyStack from "./navigations/navigate";
import { NavigationContainer } from "@react-navigation/native";
export default class App extends React.Component {
render () {
return (
<NavigationContainer>
< MyStack/>
</NavigationContainer>   
)   
}}

   