import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";



export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <header style={styles.header}>
        <View>
          <Image alt="unicap" />

          <Text style={styles.headertxt1}>SmartMeet</Text>
        </View>
        <View style={styles.prono}>
          <Text>notification </Text>
          <Text>profile</Text>
        </View>
      </header>
      <main style={styles.main}>

        {/* section 2 */}

        <View style={styles.sec2div1}>
          <Text style={styles.sec2txt1}>Upcoming Appointments</Text>

        </View>

        <View style={styles.sec2mdiv}>
          <View style={styles.sec2div2}>
            <View>
              <Text>img</Text>
            </View>
            <View >
              <Text style={styles.sec2prof}>Dr. Sarah Smith</Text>
              <Text style={styles.sec2dept}>IFT dept : Room 402</Text>
            </View>
          </View>
          <View style={styles.sec2div3}>
            <Text style={styles.sec2date}>oct 12, 12:00pm </Text>
            <Text style={styles.detail}> ◉Approved</Text>
          </View>
          <TouchableOpacity >
            <Text style={styles.sec2btn}>details</Text></TouchableOpacity>
        </View>

        <View style={styles.sec2mdiv}>
          <View style={styles.sec2div2}>
            <View>
              <Text>img</Text>
            </View>
            <View >
              <Text style={styles.sec2prof}>Prof. James Wilson</Text>
              <Text style={styles.sec2dept}>CSC dept : Room 105</Text>
            </View>
          </View>
          <View style={styles.sec2div3}>
            <Text style={styles.sec2date}>oct 15, 2:30pm </Text>
            <Text style={styles.detail1}> ◉Pending</Text>
          </View>
          <TouchableOpacity >
            <Text style={styles.sec2btn}>details</Text></TouchableOpacity>
        </View>

        <View style={styles.sec2mdiv}>
          <View style={styles.sec2div2}>
            <View>
              <Text>img</Text>
            </View>
            <View >
              <Text style={styles.sec2prof}>Prof. Patrick Bond</Text>
              <Text style={styles.sec2dept}>IFT dept : Admin office</Text>
            </View>
          </View>
          <View style={styles.sec2div3}>
            <Text style={styles.sec2date}>oct 15, 2:30pm </Text>
            <Text style={styles.detail2}> ◉ Rejeted</Text>
          </View>
          <TouchableOpacity >
            <Text style={styles.sec2btn}>details</Text></TouchableOpacity>
        </View>


      </main>


    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,

  },
  header: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headertxt1: {
    fontSize: 20,
    color: '#00f',
    fontWeight: 700,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  prono: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  sec2div1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 10,
    marginBottom: 20,
  },
  sec2txt1: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 10,
    color: '#00f'

  },
  sec2view: {
    fontSize: 20,
    fontWeight: 400,
    color: '#06063b'
  },
  sec2div2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    padding: 10,

  },
  sec2prof: {
    fontSize: 20,
    fontWeight: 600,
    color: '#00f',
  },
  sec2dept: {
    fontSize: 17,
  },
  sec2div3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
    width: "90%",
    marginLeft: 10,
  },

  sec2date: {
    fontSize: 19,
  },
  detail: {
    fontSize: 17,
    color: 'rgb(15, 145, 15)',
  },
  detail1: {
    fontSize: 17,
    color: '#ff8800',
  },
  detail2: {
    fontSize: 17,
    color: '#ff0000',
  },
  sec2btn: {
    width: "80%",
    backgroundColor: '#f0e9e9',
    padding: 10,
    marginLeft: 25,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 10,
    color: '#00f',
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'capitalize'
  },
  sec2mdiv: {
    width: "95%",
    padding: 10,
    backgroundColor: "#cac8c8",
    borderRadius: 10,
    marginBottom: 10,
  },
  sec2ft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    gap: 20,
  },
  sec2btn2: {
    width: "60%",
    padding: 10,

    backgroundColor: "#00f",
    borderRadius: 10,
    color: '#fff'
  },
  sec2btn3: {
    width: "50%",
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,

  },


});