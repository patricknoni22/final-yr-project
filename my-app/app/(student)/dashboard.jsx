import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import React from "react";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Image  />

          <Text>Smart Meet</Text>

        </View>
        <View>
          <Text>notification </Text>
          <Text>profile</Text>
        </View>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container:{
    flexGrow:1,
    backgroundColor:'#fff',
    padding:20,
  },
  header:{
     marginTop:10,

  }


});