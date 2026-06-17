import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default function Screen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.div1}>
        <View style={styles.span1}>
          <Image
            source={require('./lect-img/lec.png')}
            alt="avatar" />
          <Text style={styles.txt1}>Lecturer Portal</Text>
        </View>
        <View style={styles.div2}>
          <Image
            source={require('./lect-img/save.png')}
            alt="avatar"
          />
          <TouchableOpacity>
            <Text style={styles.txt2}>Save Changes</Text>
          </TouchableOpacity>
        </View>

      </View>
      {/* main */}
      <View style={styles.main}>
        {/* first div */}
        <View style={styles.view1}>

          <View style={styles.span2}>
            <Image
             source={require('./lect-img/pro.png')}
            alt="profile" />
            <Text style={styles.txt3}>Profile Information</Text>
          </View>
          <View>
            <Text style={styles.p1}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your NAME"
            />
          </View>
          <View>
            <Text style={styles.p1}>Department</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your dept"
            />
          </View>
          <View>
            <Text style={styles.p1}>Office Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your dept"
            />
          </View>




        </View>
        {/* second */}
        <View style={styles.view2}>
          <View style={styles.span2}>
            <Image source={require('./lect-img/caps.png')} 
            alt="cap"/>
            <Text style={styles.txt3}>Academic Focus</Text>
          </View>

          <Text style={styles.vdiv}>
            <Text style={styles.vtxt}>Medieval Period</Text>
            <Text style={styles.vtxt}> Cultural history</Text>
            <Text style={styles.vtxt}> Cultural history</Text>
            <TouchableOpacity>
              <Text style={styles.vtxt1}> Add Focus</Text>
            </TouchableOpacity>
             

          </Text>

        </View>
        {/* third */}
        <View style={styles.view2}>
          <View style={styles.span3}>
            <Image source={require('./lect-img/bib.png')} />
            <Text style={styles.txt3}>Biography</Text>
          </View>
          <textarea name="txt" id="txt" placeholder="lorem"
          
          cols="20" rows="7"></textarea>
        </View>


        {/* fifth */}
        <View style={styles.view2}>
          <View style={styles.span2}>
            <Image  source={require('./lect-img/no.png')}
            alt="notification"/>
            <Text style={styles.txt4}>Notification preferences</Text>
          </View>

            <View style={styles.view4}>
            <Text style={styles.v2}>
              <Text style={styles.vtxt3}>Email alerts</Text>
              <Text style={styles.p4}>Receive bokking summaries and reminders via email.</Text>
              </Text>
            <input type="checkbox" name="" id="" />
            </View>
      

          <View style={styles.span2}>
            <Text style={styles.v2}>
              <Text style={styles.vtxt3}>Push Notifications</Text>
              <Text style={styles.p5}>instant alerts for new appointments request on your device.</Text>
            </Text>
            <input type="checkbox" checked name="" id="" />

          </View>

        </View>
        {/* sixth */}
        <View style={styles.view5}>
          <View style={styles.div5}>
            <Text style={styles.span5}>
              <Text style={styles.t5}>Deactivate Portal Access</Text>
              <Text style={styles.t6}>Temporarily disable your profile from the student booking portal.</Text>
            </Text>
            <Text style={styles.btn6}>Deactivate</Text>
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
  div1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 5,
  },
  span1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10
  },
  txt1: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003366',
    width: '50%'
  },
  div2: {
    backgroundColor:'#001E40',
    borderRadius:12,
    padding:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    gap:10,
  },
  txt2: {
    fontSize: 17,
    color: '#ffffff',
    width: '80%',
    textAlign:'center',
  },
  view1:{
     backgroundColor:'#f8f8f8',
     borderRadius:10,
     padding:10,
     marginBottom:20,
  },
  span2:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom:20
  },
txt3:{
  fontSize: 20,
  color: '#003366',
  fontWeight:'700',
},
p1:{
  textTransform:'uppercase',
},
view2:{
  marginTop:10,
  backgroundColor: '#f8f8f8',
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
},
vtxt:{
  backgroundColor:'#D5E3FF',
  color:"#1E3A8A",
 fontSize:17,
 padding:10,
 borderRadius:17,
},
  vtxt1: {
    color: "#000000",
    fontSize: 17,
    padding: 10,
    borderRadius: 17,
    borderStyle:'dashed',
    borderWidth:1
  },
vdiv:{
display:'flex',
flexDirection:'row',
flexWrap:'wrap',
gap:10
},

  span3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    marginBottom: 20
  },
txt4:{
  fontSize: 20,
  fontWeight: '700',
  color: '#003366',
  width: '50%'
},
view4:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'flex-start',
  gap:10
},
v2:{
  display:'flex',
  flexDirection:'column',
  alignItems:'flex-start',
  justifyContent:'flex-start',
  gap:5,
  marginBottom: 10,
},
vtxt3:{
fontSize:17,
fontWeight:'700',
  color:'#003366',

},
p4:{
 width:'80%',
 fontSize:17,
},
  p5: {
    width: '80%',
    fontSize: 17,
  },

  view5:{
borderRadius:10,
borderWidth:1,
borderStyle:'solid',
marginTop:10,
  },
 div5:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'flex-start',
  padding:10

 },
span5:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
},
t5:{
fontSize:20,
fontWeight:'700',
  color:'#BA1A1A'
},
t6:{
 fontSize:17,
},
btn6:{
  color:'#BA1A1A',
fontSize:17,
borderRadius:10,
borderStyle:'solid',
borderWidth:1,
padding:10,

},

  input: {
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 30,
    margin: 10,
    marginBottom: 20,
    width: '85%'

  },

});

