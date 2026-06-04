import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";



export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <header style={styles.header}>
        <View>
          <Image 
            
          alt="unicap" />

          <Text style={styles.headertxt1}>SmartMeet</Text>
        </View>
        <View style={styles.prono}>
          <Text>notification </Text>
          <Text>profile</Text>
        </View>
      </header>
      <main style={styles.main}>
        {/* section 1 */}
        <section>
          <View>
            <Text>
              {" "}
              <Text style={styles.sec1h2}>Hello Alex!</Text>
            </Text>
            <Text style={styles.sec1p1}>
              ready for your academy consultations today?
            </Text>
          </View>
          <View style={styles.sec1div1}>
            <Text style={styles.mar1}>img</Text>
            <Text style={styles.sec1h3}>2</Text>
            <Text style={styles.mar1}>Upcoming Boookings</Text>
          </View>
          <View style={styles.sec1div1}>
            <Text style={styles.mar1}>img</Text>
            <Text style={styles.sec1h3}>12</Text>
            <Text style={styles.mar1}>Past consultations</Text>
          </View>
          <View style={styles.sec1div2}>
            <Text style={styles.quick}>Quick Actions</Text>
            <Text style={styles.sec1p2}>Find a lecturer</Text>
            <Text style={styles.sec1p2}>Booking History</Text>
          </View>
        </section>
        {/* section 2 */}
        <section>
          <View style={styles.sec2div1}>
            <Text style={styles.sec2txt1}>Upcoming Appointments</Text>
            <Text style={styles.sec2view}> View All</Text>
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
          

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 50,
              borderRadius:1,
              borderStyle:'solid',
              borderColor:'#dd9191',
              borderWidth:4,
              padding:10,
              width:'95%'
            }}
          >
            <Text 
            style={{ 
              fontSize:20,
              fontWeight:500,
              color:"#070735",
              paddingLeft:20,
              padding:10,
             }}>
              Academic Portal
            </Text>
            <Text
              style={{
                width: "80%",
                lineHeight: 25,
                paddingLeft: 10,
                marginBottom:10,
              
              }}
            >
              Manage your office hour booking, view academic calendars, and
              adjust your notification setting in one place.
            </Text>
            <View style={styles.sec2ft}>
              <TouchableOpacity style={styles.sec2btn2}>Go to Calendar</TouchableOpacity>
              <TouchableOpacity style={styles.sec2btn3}>Settings</TouchableOpacity>
            </View>
          </View>
        </section>
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
  main: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 17,
  },
  prono: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  headertxt1: {
    fontSize: 20,
    color:'#00f',
    fontWeight:700,
  },
  sec1h2: {
    margin: 2,
    fontSize: 30,
    fontWeight:600,
    color:'rgb(30, 30, 78)'
  },
  sec1p1: {
    width: "90%",
    marginTop:5,
    fontSize:17,
  },
  sec1div1: {
    backgroundColor: "#f0d1d1",
    padding: 10,
    width: "90%",
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#1b1b58',
    marginTop: 20,
  },
  sec1h3: {
    fontSize: 30,
    fontWeight:600,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
  },
  mar1: {
    marginLeft: 10,
    fontSize: 17,
  },
  sec1div2: {
    backgroundColor: "#00F",
    padding: 10,
    width: "90%",
    borderRadius: 15,
    marginTop: 20,
  },
  quick:{
    fontSize:17,
    color:'#fff',
    padding:10,

  },
  sec1p2: {
    padding: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    margin: 10,
    width: "60%",
    color:'#fff',
    fontSize:17,
  },
  sec2div1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginRight: 40,
    marginBottom: 20,
  },
  sec2txt1:{
    fontSize:20,
    fontWeight:700,
    marginBottom:10,
    width: '50%',
    color:'#00f'
     
  },
  sec2view:{
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
    padding:10,
    
  },
  sec2prof:{
   fontSize:20,
   fontWeight:600,
   color:'#00f',
  },
  sec2dept:{
   fontSize:17,
  },
  sec2div3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:3,
    width: "90%",
    marginLeft:10,
  },

  sec2date:{
    fontSize: 19,
  },
  detail:{
    fontSize:17,
    color:'rgb(15, 145, 15)',
  },
  detail1: {
    fontSize: 17,
    color: '#ff8800',
  },
  sec2btn: {
    width: "80%",
    backgroundColor: '#f0e9e9',
    padding: 10,
    marginLeft:25,
    marginTop:5,
    textAlign: 'center',
    marginBottom: 10,
    color:'#00f',
    fontSize:18,
    fontWeight:500,
    textTransform:'capitalize'
  },
  sec2mdiv: {
    width: "95%",
    padding:10,
    backgroundColor:"#cac8c8",
    borderRadius:10,
    marginBottom:10,
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
    color:'#fff'
  },
  sec2btn3: {
    width: "50%",
    padding: 10,
    borderRadius:10,
    borderStyle:'solid',
    borderWidth:2,

  },


});
