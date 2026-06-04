import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";



export default function Screen() {
  return (
    <ScrollView style={styles.container}>
<<<<<<< HEAD
      <header style={styles.headerImage}>
        <View>
          <Image alt="unicap" />


          <Text style={styles.headertxt1}>SmartMeet</Text>
        </View>
        <View style={styles.prono}>
          <Text>notification </Text>
        </View>
      </header>
      <main style={styles.main}>
        <section>
          <View style={styles.in}>
            <input
              type="text"
              placeholder="Search by name or subject"
              style={styles.input}
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
                <Image alt="prof img" />
                <Text>img</Text>
              </View>
              <View>
                <Text style={styles.ava}>Available Today</Text>
                <Text style={styles.text}>Prof. James Wilson</Text>
                <Text style={styles.text}>Computer Science</Text>
              </View>
            </View>

            <View style={styles.dept}>
              <Image alt="star" />
              <Text style={styles.text}>4.9(128 review)</Text>
              <Text style={styles.text}>Next 2:00PM</Text>
            </View>
            <TouchableOpacity style={styles.pressbtn}>View Profile</TouchableOpacity>
          </View>
          {/* div 2 */}
          <View style={styles.view1}>
            <View style={styles.div1}>
              <View>
                <Image alt="prof img" />
                <Text>img</Text>
              </View>
              <View>
                <Text style={styles.ava}>Available Tomorrow</Text>
                <Text style={styles.text}>Dr. Elena Rodrigues</Text>
                <Text style={styles.text}>Information Techonolgy</Text>
              </View>
            </View>

            <View style={styles.dept}>
              <Image alt="star" />
              <Text style={styles.text}>4.9(128 review)</Text>
              <Text style={styles.text}>Next  Tomorrow 10:00 AM</Text>
            </View>
            <TouchableOpacity style={styles.pressbtn}>View Profile</TouchableOpacity>
          </View>

          {/* div 3 */}
          <View style={styles.view1}>
            <View style={styles.div1}>
              <View>
                <Image alt="prof img" />
                <Text>img</Text>
              </View>
              <View>
                <Text style={styles.ava}>Available Today</Text>
                <Text style={styles.text}>Prof. Sarah John</Text>
                <Text style={styles.text}>Networking</Text>
              </View>
            </View>

            <View style={styles.dept}>
              <Image alt="star" />
              <Text style={styles.text}>5.0(128 review)</Text>
              <Text style={styles.text}>Next 3:30PM</Text>
            </View>
            <TouchableOpacity style={styles.pressbtn}>View Profile</TouchableOpacity>
          </View>
        </section>
      </main>
    </ScrollView>
=======
          <header style={styles.headerImage}>
            <View>
              <Image alt="unicap" />
            
    
              <Text style={styles.headertxt1}>SmartMeet</Text>
            </View>
            <View style={styles.prono}>
              <Text>notification </Text>
            </View>
          </header>
          <main style={styles.main}>
            <section>
              <View style={styles.in}>
                <input
                  type="text"
                  placeholder="Search by name or subject"
                  style={styles.input}
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
                    <Image alt="prof img" />
                    <Text>img</Text>
                  </View>
                  <View>
                    <Text style={styles.ava}>Available Today</Text>
                    <Text style={styles.text}>Prof. James Wilson</Text>
                <Text style={styles.text}>Computer Science</Text>
                  </View>
                </View>
    
                <View style={styles.dept}>
                  <Image alt="star" />
              <Text style={styles.text}>4.9(128 review)</Text>
              <Text style={styles.text}>Next 2:00PM</Text>
                </View>
                <TouchableOpacity style={styles.pressbtn}>View Profile</TouchableOpacity>
              </View>
              {/* div 2 */}
              <View style={styles.view1}>
                <View style={styles.div1}>
                  <View>
                    <Image alt="prof img" />
                    <Text>img</Text>
                  </View>
                  <View>
                    <Text style={styles.ava}>Available Tomorrow</Text>
                <Text style={styles.text}>Dr. Elena Rodrigues</Text>
                <Text style={styles.text}>Information Techonolgy</Text>
                  </View>
                </View>
    
                <View style={styles.dept}>
                  <Image alt="star" />
              <Text style={styles.text}>4.9(128 review)</Text>
              <Text style={styles.text}>Next  Tomorrow 10:00 AM</Text>
                </View>
                <TouchableOpacity style={styles.pressbtn}>View Profile</TouchableOpacity>
              </View>
    
              {/* div 3 */}
              <View style={styles.view1}>
                <View style={styles.div1}>
                  <View>
                    <Image alt="prof img" />
                    <Text>img</Text>
                  </View>
                  <View>
                    <Text style={styles.ava}>Available Today</Text>
                <Text style={styles.text}>Prof. Sarah John</Text>
                <Text style={styles.text}>Networking</Text>
                  </View>
                </View>
    
                <View style={styles.dept}>
                  <Image alt="star" />
              <Text style={styles.text}>5.0(128 review)</Text>
              <Text style={styles.text}>Next 3:30PM</Text>
                </View>
                <TouchableOpacity style={styles.pressbtn}>View Profile</TouchableOpacity>
              </View>
            </section>
          </main>
     </ScrollView>
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
  );
}




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
<<<<<<< HEAD
  text: {
    fontSize: 16,
=======
  text:{
   fontSize:16,
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
  },
  headerImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
<<<<<<< HEAD
    gap: 20,
=======
    gap:20,
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
    marginTop: 20,
  },
  main: {
    width: '90%',
    marginLeft: 15,
    padding: 5,
  },
  headertxt1: {
    fontSize: 20,
    color: '#00f',
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
<<<<<<< HEAD
  btn: {
    backgroundColor: '#c5c2c2',
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
=======
  btn:{
    backgroundColor:'#c5c2c2',
    padding:10,
    borderRadius:10,
    fontSize:17,
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
  },
  dept: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: 20,
<<<<<<< HEAD

  },
  all: {
    backgroundColor: '#0202ff',
    fontSize: 17,
=======
    
  },
  all: {
    backgroundColor: '#0202ff',
    fontSize:17,
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
    padding: 8,
    borderRadius: 10,
    color: '#fff'

  },
  div1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  ava: {
    color: 'rgb(5, 5, 5)',
    backgroundColor: '#0f0',
    borderRadius: 30,
    textAlign: 'center',
<<<<<<< HEAD
    fontSize: 17,
=======
    fontSize:17,
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
    padding: 8,
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
    backgroundColor: '#00f',
    color: '#fff',
    textAlign: 'center',
    width: '80%',
    marginLeft: 30,
    padding: 8,
    borderRadius: 10,
<<<<<<< HEAD
    fontSize: 17,
=======
    fontSize:17,
>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1

  }









});
<<<<<<< HEAD
=======





















>>>>>>> 4555a0b51dbb45b9b8314dd8870d9a3def470ec1
