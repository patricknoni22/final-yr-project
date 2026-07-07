import { View, Text, ScrollView, StyleSheet,Image } from "react-native";

export default function Screen() {
  return (
    <ScrollView style={styles.container}>
           <View style={styles.header}>
              <View style={styles.header1}>
                <Image
                  source={require("./lect-img/cap.png")}
                  alt="unicap" />
                <Text>
      
                  <Text style={styles.h1}>SmartMeet</Text>
                </Text>
              </View>
              <View>
                <Image
            source={require('./lect-img/lec.png')}
                  alt="unicap" />
                
              </View>
            </View>

      {/* section 4 */}
      <View>
        <View style={styles.sec4header}>
          <Text style={styles.sec4txt1}>Today Schedule </Text>

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
        {/* div5 */}

        <View style={styles.sec4div}>
          <View>
            <Text style={styles.sec4time}>04:15</Text>
            <Text style={styles.sec4time}>PM</Text>
          </View>
          <View>
            <Text style={styles.sec4h3}>patrick noni</Text>
            <Text style={styles.sec4time}>Grade Appeal ∘ Room 402</Text>
          </View>
        </View>
        {/* div3 */}
        <View style={styles.sec4div}>
          <View>
            <Text style={styles.sec4time}>05:00</Text>
            <Text style={styles.sec4time}>PM</Text>
          </View>
          <View>
            <Text style={styles.sec4h3}>Department meeting</Text>
            <Text style={styles.sec4time}>Conference Hall</Text>
          </View>
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
  main: {
    marginTop: 30,
    marginBottom: 30,
  },
  header: {
    display: "flex",
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  header1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  h1: {
    fontSize: 20,
    color: '#003366',
    fontWeight:'700',

  },

  sec4header: {
    marginTop: 20,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
  },
  sec4div: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    marginTop: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#001E40',
    marginBottom: 20,
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
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  sec4txt1: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003366',
  },
  sec4txt2: {
    fontSize: 20,
    fontWeight: '700',
    color: 'v',
    backgroundColor: '#87a6df',
    padding: 10,
    borderRadius: 20,
  },

  sec4time: {
    fontSize: 17,
  },



});

