import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity,TextInput } from "react-native";
import React from "react";



export default function Screen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImage}>
        <View style={styles.hd}>
          <Image 
            source={require('./student-img/cap.jpg')}
          alt="unicap" />
          <Text style={styles.headertxt1}>SmartMeet</Text>
        </View>
        <View style={styles.prono}>
          <Image
            source={require('./student-img/bell.png')}
            alt="unicap" />
        </View>
      </View>
      <main style={styles.main}>
        <section>
          <View style={styles.in}>
            <Image
              source={require('./student-img/search.png')}
              alt="unicap" 
              style={styles.img1}
              />

            <TextInput
                     style={styles.inputs}
                     placeholder="search name or subject "
                     autoCapitalize="none"
                     keyboardType="email-address"
                     
                   />
          </View>
          <View style={styles.dept}>
            <Text style={styles.text}> Departments</Text>
            <Text style={styles.text}>Clear all</Text>
          </View>

          <View style={styles.dept}>
            <Text style={styles.all}>All</Text>
            <Text style={styles.btn}>Lecturer</Text>
            <Text style={styles.btn}>Admin</Text>
          </View>
        </section>
        <section>
          <View style={styles.view1}>
            <View style={styles.div1}>
              <View>
                <Image alt="prof img" 
                source={require('./student-img/prof1.png')}
                />
              </View>
              <View>
                <Text style={styles.ava}>Available Today</Text>
                <Text style={styles.text}>Prof. James Wilson</Text>
                <Text style={styles.text}>Computer Science</Text>
              </View>
            </View>

            
            <TouchableOpacity style={styles.pressbtn}>
              <Text style={styles.prestxt}>View Profile</Text>
              <Image source={require('./student-img/arrow.png')} alt="arrow" />
            </TouchableOpacity>
          </View>
          {/* div 2 */}
          <View style={styles.view1}>
            <View style={styles.div1}>
              <View>
                <Image alt="prof img"
                  source={require('./student-img/prof2.png')}
                />
                
              </View>
              <View>
                <Text style={styles.ava}>Available Tomorrow</Text>
                <Text style={styles.text}>Dr. Elena Rodrigues</Text>
                <Text style={styles.text}>Information Techonolgy</Text>
              </View>
            </View>

            
            <TouchableOpacity style={styles.pressbtn}><Text style={styles.prestxt}>View Profile</Text>
            <Image source={require('./student-img/arrow.png')} alt="arrow"/>

            </TouchableOpacity>
          </View>

          {/* div 3 */}
          <View style={styles.view1}>
            <View style={styles.div1}>
              <View>
                <Image alt="prof img"
                  source={require('./student-img/prof3.png')}
                />
              
              </View>
              <View>
                <Text style={styles.ava}>Available Today</Text>
                <Text style={styles.text}>Prof. Sarah John</Text>
                <Text style={styles.text}>Networking</Text>
              </View>
            </View>

            
            <TouchableOpacity style={styles.pressbtn}>
              <Text style={styles.prestxt}>View Profile</Text>
              <Image source={require('./student-img/arrow.png')} alt="arrow" />
            </TouchableOpacity>
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
  },
  text:{
   fontSize:16,
  },
  headerImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
    marginTop: 20,
  },
  hd:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap:5
  },
  main: {
    width: '90%',
    padding: 5,
    paddingLeft:20
  },
  headertxt1: {
    fontSize: 20,
    color: '#001E40',
    fontWeight: '700',
  },
  prono: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  themedin: {
    width: '80%'
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
  },
  btn: {
    backgroundColor: '#C3C6D180',
    padding: 10,
    borderRadius: 10,
    fontSize: 17,},
 
  dept: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: 20,


  },
  all: {
  backgroundColor: '#001E40',
  fontSize: 17,
  padding:8,
  borderRadius:10,
  color:'#fff'
  },
 
  div1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  ava: {
    color: '#000',
    backgroundColor: '#4ADE80',
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 15,
    padding: 3,
    margin: 7,

  },
  view1: {
    borderRadius: 20,

    width: '95%',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,

  },
  pressbtn: {
    backgroundColor: '#001E40',
    
    width: '80%',
    marginLeft: 30,
    padding: 8,
    borderRadius: 10,
  
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
  },
  prestxt:{
    color: '#fff',
    fontSize: 17,
  },
  inputs: {
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 45,
    borderWidth: 2,
    paddingHorizontal: 40,
    margin: 10,
    marginBottom: 20,
    width: '90%',
    marginLeft:-30,

  },

 in:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',

 },
 img1:{
  marginBottom:6,
 }




});
