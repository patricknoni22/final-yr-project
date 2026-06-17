import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React from "react";



export default function Screen() {
  const [text, setText] = React.useState('');
  const [text1, setText1] = React.useState(''); 
  const [text2, setText2] = React.useState('');
  const [password , setpassword] = React.useState('')
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header1}>
          
          <Image 
          source={require('./student-img/cap.jpg')}
          alt="unicap" />
          <Text style={styles.headertxt1}>SmartMeet</Text>
        </View>
        <View style={styles.header1}>
          <Image
            source={require('./student-img/search.png')}
            alt="unicap" />
          <Image
            source={require('./student-img/avatar.png')}
            alt="unicap" />
          
          

        </View>
      </View>
      <View>
        <View >

          <Text style={styles.div1h1}>Settings</Text>
          <Text style={styles.div1}>
            <Text style={styles.div1par}>Manage your stundent profile and account preferences</Text>
            <TouchableOpacity style={styles.btn1}>
              <Text>Save All Changes</Text>
            </TouchableOpacity>

          </Text>

        </View> 
        {/* div2  */}
        <View style={styles.div2}>

          <View style={styles.div2sec2}>
           
            <Image alt="person icon" 
            source={require('./student-img/person.png')}/>
          
            <Text style={styles.text}>Profile Details</Text>
          </View>

          <View style={styles.div2sec2}>
           
            <Image
             source={require('./student-img/bell.png')}
             alt="bell icon" />
            <Text>Notifications</Text>
          </View>


          <View style={styles.div2sec2}>
         
            <Image 
              source={require('./student-img/key.png')}
            alt="key icon" />
            <Text>Security</Text>
          </View>

          <View style={styles.div2sec2}>
          
            <Image
              source={require('./student-img/eye.png')}
             alt="eye icon" />
            <Text>Privacy</Text>
          </View>


        </View>

        <View style={styles.div3}>
          <Text style={styles.div3h1}>Personal Information</Text>

          <View style={styles.div33}>
            <Text>Full Name</Text>
            <TextInput
              placeholder="enter your name"
              value={text}
              onChangeText={setText}
              style={styles.input}
            />
          </View>

          <View style={styles.div33}>
            <Text>Student ID</Text>
            <TextInput
              placeholder="enter your reg no"
              value={text1}
              onChangeText={setText1}
              style={styles.input}
            />
          </View>

          <View style={styles.div33}>
            <Text>Student Email</Text>
            <TextInput
              placeholder="enter your email"
              value={text2}
              onChangeText={setText2}
              style={styles.input}
            />
          </View>

        </View>
        {/* div 4 */}

        <View style={styles.div4}>
          <Text style={styles.div4h1}>Notifications Preferences</Text>

          <View style={styles.div4main}>
            <Text style={styles.div4txt}>
              <Text style={styles.div4h2}>Booking Confirmations</Text>

              <Text style={styles.div4par}>Get notified when a lecturer accepts your meeting request.

              </Text>

            </Text>
            <input type="checkbox" checked name="notification" id="notification" />

          </View>


          <View style={styles.div4main}>
            <Text style={styles.div4txt}>
              <Text style={styles.div4h2}>Class reminders</Text>

              <Text style={styles.div4par}>SMS and emails alerts 30 minutes before your scheduled sessions.

              </Text>

            </Text>
            <input type="checkbox" name="notification" id="notification" />

          </View>

        </View>


        {/* div 5 */}
        <View style={styles.div5}>
          <Text style={styles.didv5h1}>Password</Text>
          <View style={styles.div5sm}>
            <Text>Current Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setpassword}
              style={styles.input}
            />
          </View>

          <View style={styles.div5sm}>
            <Text>New Password</Text>
            <TextInput
              placeholder="enter new password"
              value={password}
              onChangeText={setpassword}
              style={styles.input}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.div5btn}>Update Password</Text>
          </TouchableOpacity>

        </View>

         {/* div 6 */}
        <View style={styles.div4}>
          <Text style={styles.didv5h1}>Account Pivacy</Text>

          <View style={styles.div4main}>
            <Image 
            source={require('./student-img/search.png')}
            alt="search"
            />
            <Text style={styles.div4txt}>
              <Text style={styles.div4h2}>Search Visibility</Text>

              <Text style={styles.div4par}>Allow lecturers and staff to find your profile via student directory.

              </Text>
            </Text>
            <input type="checkbox" checked name="visibility" id="visibility" />

          </View>


          <View style={styles.div6}>
            <View style={styles.div6main}>
              <View style={styles.div6min}>
                <Image
                source={require('./student-img/danger.png')
                }
                 alt="danger"/>
                <Text style={styles.div6h1}>Danger Zone</Text>
              </View>
             

              <Text style={styles.div6par}>Permanetly delete your account and all associated data
              </Text>

              <TouchableOpacity>
                <Text style={styles.div6link}>
                   Delete My Account
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  header1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 8,
  },
  headertxt1: {
    fontSize: 20,
    color: '#003366',
    fontWeight: '700',
  },
  div1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:5,
    marginBottom:20,

  },
  div1h1: {
    fontSize: 30,
    color: '#003366',
    fontWeight: '700',
  },
  div1par: {
    width: '50%',
    fontSize: 17,
  },
  btn1: {
    backgroundColor: '#001E40',
    color:'#fff',
    padding:8,
    fontSize: 17,
    width: '35%',
    borderRadius:15,
    textAlign:'center'
  },

  div2:{
   display:'flex',
   flexDirection:'column',
   alignItems:'flex-start',
   justifyContent:'flex-start',
   gap:10,
    marginBottom:20,
  },
  div2sec2:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    gap:10,
    padding:9,

 
  },
  div3:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
     gap:5,
     width:'90%',
    marginBottom: 10,
    
  },
  div3h1:{
    marginBottom:20,
    marginTop:20,
    fontSize:30,
    color:'#003366',
    fontWeight: '600',

  },
  div33: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 3,
    marginBottom:10,

  },
  div4: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 20,
    marginTop:20,
  },
  div4h1:{
    marginBottom: 10,
    marginTop: 10,
    fontSize: 30,
    color: '#003366',
    width:'60%',
    fontWeight: '600',
  },
  div4h2:{
    fontSize:18,
    color:'#000',
    fontWeight:'600'

  },
  div4txt:{
    display:'flex',
    flexDirection:'column',
    alignItems:"flex-start",
    justifyContent:'center',
    gap:10,
  },
  div4par:{
    width:'80%',
    fontSize:17,
  },
  div4main:{
   display:'flex',
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-evenly',
   gap:12,
  },

  div5:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
    width: '90%',
    marginBottom: 10,

  },
  didv5h1:{
    marginBottom: 20,
    marginTop: 20,
    fontSize: 30,
    fontWeight:'600',
    color: '#003366',
  },
div5sm:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: 3,
  marginBottom: 10,
},
div5btn:{
marginTop:10,
  color:'#003366',
  backgroundColor:'#C3C6D180',
padding:10,
borderRadius:10,
fontSize:17,
},
div6main:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: "flex-start",
  justifyContent: 'center',
  gap: 9,
},
div6min:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: "center",
  justifyContent: 'flex-start',
  gap:10
},
div6:{
  marginTop: 20,
},
div6h1:{
  marginBottom: 10,
  marginTop: 10,
  fontSize: 20,
  color: '#BA1A1A',
  fontWeight: '600',
},
div6par:{
  width: '80%',
  fontSize: 17,
  color: '#BA1A1A',
},
div6link:{
  fontSize: 17,
  color: '#BA1A1A',
  textDecorationLine:'underline',

},

  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: 12,
    padding: 10,
    width: '100%',
    paddingHorizontal: 60,
  }



});
