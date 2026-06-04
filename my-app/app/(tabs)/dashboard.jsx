import { View, Text, ScrollView, StyleSheet, Image, Pressable } from "react-native";

export default function Screen() {
  return (
    <ScrollView style={styles.container}>
      <header style={styles.header}>
        <View style={styles.header1}>
          <Image
            source={require("./cap.png")}
            alt="unicap" />
          <Text>

            <Text style={styles.h1}>SmartMeet</Text>
          </Text>
        </View>
        <View>
          <Text>notification </Text>
        </View>
      </header>

      <main style={styles.main}>
        <View>
          <View style={styles.sec1div}>
            <Text>DASHBOARD</Text>
            <Text style={styles.sec1h2}>Welcome back, Dr Chen</Text>
            <Text style={styles.div1par}>You have 4 new booking requests for this week.</Text>
          </View>
          <p style={styles.pblue}>Manage Availability</p>
        </View>
        {/* section 2 */}
        <View>
          <View style={styles.sec2divs}>
            <View style={styles.sec2div}>
              <img alt="img" />
              <Image alt="people" />
              <Text>+12%</Text>
            </View>

            <Text style={styles.sec2txt1}>Total students</Text>
            <Text style={styles.sec2txt2}>142</Text>
          </View>
          {/* div 2  */}
          <View style={styles.sec2divs}>
            <View>
              <img alt="clock" />
              <Image alt="clock" />
            </View>

            <Text style={styles.sec2txt1}>Hours Consulted</Text>
            <Text style={styles.sec2txt2}>48.5</Text>
          </View>
          {/* div 3 */}
          <View style={styles.sec2divs}>
            <View>
              <img alt="Star" />
              <Image alt="star" />
            </View>

            <Text style={styles.sec2txt1}>Average rating</Text>
            <Text style={styles.sec2txt2}>4.9</Text>
          </View>
          {/* div 4 */}
          <View style={styles.sec2divs}>
            <View>
              <img alt="pending" />
              <Image alt="pending" />
            </View>

            <Text style={styles.sec2txt1}>Pending Reviews</Text>
            <Text style={styles.sec2txt2}>03</Text>
          </View>
        </View>
        {/* section 3 */}
        <View style={styles.main}>
          <View style={styles.sec3header}>
            <Text style={{
              color:'#0c0c36',
              fontSize:20,
              fontWeight:'700'
            }}>Booking Request</Text>
            <Text style={{
              fontSize:17,
            }}>View All</Text>
          </View>
          {/* div 2 */}
          <View style={styles.sec3div}>
            <View style={styles.sec3min}>
              <View>
                <img alt="image" />
                <Image alt="img"/>
              </View>

              <View>
                <Text style={styles.sec3h1}>Alex Thompson</Text>
                <Text style={styles.sec3par}>Thesis Review ∘ Tomorrow, 10:00 AM</Text>
              </View>
            </View>
            <View style={styles.sec3btn}>
              <Pressable style={styles.sec3btn1}>Approve</Pressable>
              <Pressable style={styles.sec3btn2}>Reject</Pressable>
            </View>
          </View>
          {/* div 3 */}
          <View style={styles.sec3div}>
            <View style={styles.sec3min}>
              <View>
                <img alt="image" />
              </View>

              <View>
                <Text style={styles.sec3h1}>Sarah miller</Text>
                <Text style={styles.sec3par}>Course Inquiry ∘ jun 24, 01:00 PM</Text>
              </View>
            </View>
            <View style={styles.sec3btn}>
              <Pressable style={styles.sec3btn1}>Approve</Pressable>
              <Pressable style={styles.sec3btn2}>Reject</Pressable>
            </View>
          </View>
        </View>
        {/* section 4 */}
        <View>
          <View style={styles.sec4header}>
            <Text style={styles.sec4txt1}>Today Schedule </Text>
            <Text style={styles.sec4txt2}>Oct 22, 2026</Text>
          </View>
          <View style={styles.sec4div}>
            <View>
              <Text style={styles.sec4time}>09:00</Text>
              <Text style={styles.sec4time}>AM</Text>
            </View>
            <View>
              <Text style={styles.sec4h3}>Office Hours</Text>
              <Text style={styles.sec4time}>Room 402 ∘ Public session</Text>
            </View>
          </View>
          {/* div 2 */}
          <View style={styles.sec4div}>
            <View>
              <Text style={styles.sec4time}>11:30</Text>
              <Text style={styles.sec4time}>AM</Text>
            </View>
            <View>
              <Text style={styles.sec4h3}>James Wilson</Text>
              <Text style={styles.sec4time}>Project Guidance ∘ Virtual</Text>
            </View>
          </View>
          {/* div 3 */}
          <View style={styles.sec4div}>
            <View>
              <Text style={styles.sec4time}>02:00</Text>
              <Text style={styles.sec4time}>PM</Text>
            </View>
            <View>
              <Text style={styles.sec4h3}>Department meeting</Text>
              <Text style={styles.sec4time}>Conference Hall</Text>
            </View>
          </View>
          {/* div 4 */}
          <View style={styles.sec4div}>
            <View>
              <Text style={styles.sec4time}>04:15</Text>
              <Text style={styles.sec4time}>PM</Text>
            </View>
            <View>
              <Text style={styles.sec4h3}>Elena Rodriguez</Text>
              <Text style={styles.sec4time}>Grade Appeal ∘ Room 402</Text>
            </View>
          </View>
          <Pressable style={styles.sec4btn}>View Full Calendar</Pressable>
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
  main:{
     marginTop:30,
     marginBottom:30,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom:5,
  },
  header1:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:9,
  },
  h1:{
    fontSize: 20,
    color: '#00f',
    fontWeight: 700,

  },
  sec1div: {
    width: "90%",
  },
  sec1h2: {
    color: "#141436",
    fontSize:20,
    fontWeight:'700',
    marginTop:5,
    marginBottom:5,

    },
    div1par:{
    fontSize:17,

    },
  pblue: {
    backgroundColor: "#131352",
    padding: 12,
    color: "#fff",
    width:'84%',
    borderRadius: 10,
    fontSize:17,
  },
  sec2divs: {
    backgroundColor: "#f0efef",
    padding: 20,
    width: "90%",
    borderRadius: 15,
    marginTop: 20,
  
  },
  sec2div: {
    display: "flex",
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-between",
    gap:10,
    padding: 10,
  },
  sec2txt1:{
    fontSize: 17,
    marginTop:6,
    marginBottom:6,
  },
  sec2txt2: {
    fontSize: 30,
    fontWeight:'700',
    color:'#0c0c36'
  },
  sec3header: {
    display: "flex",
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    gap:20,
    
  },

  sec3div: {
    backgroundColor: "#ece3e3",
    padding: 15,
    width: "90%",
    borderRadius: 15,
    marginTop: 20,
   
  },
  sec3btn: {
    display: "flex",
     flexDirection:"row",
     gap:5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  sec3min: {
    display: "flex",
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    margin:10,
  },
  sec3btn1: {
    padding: 12,
    width: '40%',
    borderRadius: 12,
    backgroundColor:'#101044',
    color:'#fff',
    fontWeight: '500',
    fontSize: 17,
  },
  sec3btn2: {
    padding: 12,
    width: '40%',
    borderRadius: 12,
    color: '#011096',
    borderWidth:2,
    borderStyle:'solid',
    borderColor:'#000',
    backgroundColor:'#fff',
    fontWeight:'500',
    fontSize:17,
  },


  sec3h1: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101044'
  },
  sec3par:{
  width:'80%',
  fontSize:17,

  },
  sec4header: {
    marginTop: 20,
    display: "flex",
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-around",
  },
  sec4div: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    marginTop:20,
    borderLeftWidth:5,
    borderLeftColor:'#0f0fa8',
    marginBottom:20,
  },
  sec4h3: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  sec4btn: {
    padding: 10,
    marginLeft: 40,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    color: "#3232f1",
    backgroundColor: "#ebeaea",
    borderStyle: "solid",
    textAlign:'center',
    fontSize: 18,
    borderRadius: 10,
  },
  sec4txt1:{
    fontSize:20,
    fontWeight:'700',
    color:'#131350',
  },
  sec4txt2: {
    fontSize: 20,
    fontWeight: '700',
    color: '#010166',
    backgroundColor:'#87a6df',
    padding:10,
    borderRadius:20,
  },
 
  sec4time:{
  fontSize:17,
  },



});
