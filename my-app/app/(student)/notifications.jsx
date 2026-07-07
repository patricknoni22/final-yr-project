import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";



export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
              <View style={styles.imgh}>
                <Image 
                  source={require('./student-img/cap.jpg')} 
                  alt="unicap" 
                />
                <Text style={styles.headertxt1}>SmartMeet</Text>
              </View>
              <View style={styles.prono}>
                <Image
                  source={require('./student-img/bell.png')}
                  alt="unicap"
                />
                <Image
                  source={require('./student-img/profile.png')}
                  alt="unicap"
                  style={styles.img1}
                />
              </View>
            </View>
      <View style={styles.main}>
       
        {/* section 2 */}

          <View style={styles.sec2div1}>
            <Text style={styles.sec2txt1}>Upcoming Appointments</Text>
            
          </View>

           <View style={styles.sec2mdiv}>
                      <View style={styles.sec2div2}>
                       <View>
                          <Image
                            source={require('./student-img/sarah.png')}
                            alt="unicap"
                            style={
                              styles.img2}
                          />
                        
                         
                       </View>
                        <View >
                          <Text style={styles.sec2prof}>Dr. Sarah Smith</Text>
                          <Text style={styles.sec2dept}>IFT dept : Room 402</Text>
                        </View>
                      </View>
                      <View style={styles.sec2div31}>
                        <View style={styles.sec2div4}>
                          <Image
                            source={require('./student-img/cal.png')}
                            alt="unicap"
          
                          />
                          <Text style={styles.sec2date}>oct 12, 12:00pm </Text>
                        </View>
          
                        <View><Text style={styles.detail}> ◉Approved</Text></View>
                      </View>
                      <TouchableOpacity >
                        <Text style={styles.sec2btn}>details</Text></TouchableOpacity>
                    </View>
          
                    <View style={styles.sec2mdiv}>
                      <View style={styles.sec2div2}>
                        <View>
                          <Image
                            source={require('./student-img/james.png')}
                            alt="unicap"
                            style={
                              styles.img3}
                          />
          
                        </View>
                        <View >
                          <Text style={styles.sec2prof}>Prof. James Wilson</Text>
                          <Text style={styles.sec2dept}>CSC dept : Room 105</Text>
                        </View>
                      </View>
                      <View style={styles.sec2div3}>
                        <View style={styles.sec2div4}> 
                          <Image
                            source={require('./student-img/cal.png')}
                            alt="unicap"
                            
                          />
          
                          <Text style={styles.sec2date}>oct 15, 2:30pm </Text>
                        </View>
                        <Text style={styles.detail1}> ◉Pending</Text>
                      </View>
                      <TouchableOpacity >
                        <Text style={styles.sec2btn}>details</Text></TouchableOpacity>
                    </View>
                    

        <View style={styles.sec2mdiv}>
          <View style={styles.sec2div2}>
            <View>
              <Image
                source={require('./student-img/james.png')}
                alt="unicap"
                style={
                  styles.img3}
              />
             
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
        </View>
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
    color: '#1E3A8A',
    fontWeight: '700',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
 
  prono: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap:10

  },
  imgh: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,

  },
  img1: {
    borderRadius: '50%',
    width: '40px',
    height: '40px'
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
    color: '#003366'

  },
  sec2view: {
     gap:10,
    marginBottom: 20,
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
    fontWeight: '700',
    color: '#1E3A8A',
  },
  sec2dept: {
    fontSize: 17,
    padding:10,
    
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
  sec2div31: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    width: "90%",
    marginLeft: 15,
    gap: 10,
  },

  sec2date: {
    fontSize: 19,
  },
  detail: {
    fontSize: 17,
    color: '#4ADE80',
  },

  
  detail1: {
    fontSize: 17,
    color: '#FBBF24',
  },
  detail2: {
    fontSize: 17,
    color: '#BA1A1A',
  },
  sec2btn: {
    width: "80%",
    backgroundColor: '#F1F5F9',
    padding: 10,
    marginLeft: 25,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 10,
    color: '#00f',
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'capitalize',
    borderRadius:10,
  },
  sec2mdiv: {
    width: "95%",
    padding: 10,
    backgroundColor: "#C3C6D180",
    borderRadius: 10,
    marginBottom: 10,
    marginTop:5,
    textAlign: 'center',
   color:'#00f',
   
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
    
    backgroundColor: "#1E3A8A",
    borderRadius: 10,
    color:'#fff'
  },
  sec2btn3: {
    width: "50%",
    padding: 10,

    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
  },

    img3: {
      borderRadius: '50%',
      marginLeft: -10

    },
    sec2div4: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 5,
    }

});

