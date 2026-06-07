import { View, Text, ScrollView, StyleSheet, Image,TextInput } from "react-native";

export default function Screen() {
  return (
   <ScrollView style={styles.container}>
        <header style={styles.header}>
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
          </header>
        

      {/* fourth */}
      <View>
        <View style={styles.div1}>
          <Image source={require('./lect-img/cls.png')}
          alt="clock" />
          <Text style={styles.txt1}>Office Hours management</Text>
          <Text style={styles.txt2}>Auto confirms based on availability</Text>
        </View>

        <View style={styles.main1}>
          <Text>
            <input type="checkbox" name="" id="" />
            <Text style={styles.txt2}>Monday</Text>
          </Text>
          <View style={styles.div2}>
            <TextInput
              style={styles.input}
              value="09:00am"
            />
            <Text>to</Text>
            <TextInput
              style={styles.input}
              value="01:30pm"
            />

          </View>
        </View>


        <View style={styles.main1}>
          <Text>
            <input type="checkbox" name="" id="" />
            <Text style={styles.txt2}>Tuesday</Text>
          </Text>
          <View style={styles.div2}>
            <TextInput
              style={styles.input}
              value="09:00am"
            />
            <Text>to</Text>
            <TextInput
              style={styles.input}
              value="02:30pm"
            />

          </View>
        </View>


        <View style={styles.main1}>
          <Text>
            <input type="checkbox" name="" id="" />
            <Text style={styles.txt2}>Wednesday</Text>
          </Text>
          <View style={styles.div2}>
            <TextInput
              style={styles.input}
              value="09:00am"
            />
            <Text>to</Text>
            <TextInput
              style={styles.input}
              value="01:30pm"
            />

          </View>
        </View>
 

        <View style={styles.main1}>
          <Text>
            <input type="checkbox" name="" id="" />
            <Text style={styles.txt2}>Thursday</Text>
          </Text>
          <View style={styles.div2}>
            <TextInput
              style={styles.input}
              value="09:00am"
            />
            <Text>to</Text>
            <TextInput
              style={styles.input}
              value="01:30pm"
            />

          </View>
        </View>

        <View style={styles.main1}>
          <Text>
            <input type="checkbox" name="" id="" />
            <Text style={styles.txt2}>Friday</Text>
          </Text>
          <View style={styles.div2}>
            <TextInput
              style={styles.input}
              value="09:00am"
            />
            <Text>to</Text>
            <TextInput
              style={styles.input}
              value="01:30pm"
            />

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
  main:{
     marginTop:30,
     marginBottom:30,
  },
  header: {
    display: "flex",
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
    color: 'rgb(26, 26, 90)',
    fontWeight: '700',

  },
  div1:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    gap:10
  },
  div2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 5
  },
  main1:{
   marginTop:20,
  },
  txt1:{
    fontSize:20,
    fontWeight:'700',
    color:'#10103d',

  },
  txt2:{
 fontSize:17
  },


  input: {
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 20,
    margin: 10,
    marginBottom: 20,
    width: '40%'

  },



});

