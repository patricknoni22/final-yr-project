import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React from "react";



export default function Screen() {
  const [text, setText] = React.useState('');
  const [password , setpassword] = React.useState('')
  return (
    <ScrollView style={styles.container}>
      <header style={styles.header}>
        <View style={styles.header1}>
          <Text>img</Text>
          <Image alt="unicap" />
          <Text style={styles.headertxt1}>SmartMeet</Text>
        </View>
        <View style={styles.header1}>
          <Text>search </Text>
          <Text>Profile</Text>

        </View>
      </header>
      <main>
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
            <Text>img</Text>
            <Image alt="person icon" />
          
            <Text style={styles.text}>Profile Details</Text>
          </View>

          <View style={styles.div2sec2}>
            <Text>img</Text>
            <Image alt="bell icon" />
            <Text>Notifications</Text>
          </View>


          <View style={styles.div2sec2}>
            <Text>img</Text>
            <Image alt="key icon" />
            <Text>Security</Text>
          </View>

          <View style={styles.div2sec2}>
            <Text>img</Text>
            <Image alt="eye icon" />
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
              value={text}
              onChangeText={setText}
              style={styles.input}
            />
          </View>

          <View style={styles.div33}>
            <Text>Student Email</Text>
            <TextInput
              placeholder="enter your email"
              value={text}
              onChangeText={setText}
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
            <Text style={styles.div4txt}>
              <Text style={styles.div4h2}>Search Visibility</Text>

              <Text style={styles.div4par}>Allow lecturers and staff to find your profile via student directory.

              </Text>
            </Text>
            <input type="checkbox" checked name="visibility" id="visibility" />

          </View>


          <View style={styles.div4main}>
            <Text style={styles.div4txt}>
              <Text style={styles.div4h2}>Social Metadata</Text>

              <Text style={styles.div4par}>Share academic achievement badges on linked social accounts.
              </Text>

            </Text>
            <input type="checkbox" name="visibility" id="visibility" />

          </View>

          <View>
            <Text style={styles.div6main}>
              <Text style={styles.div6h1}>Danger Zone</Text>

              <Text style={styles.div6par}>Permanetly delete your account and all associated data
              </Text>

            <TouchableOpacity>
                <Text style={styles.div6link}>
                   Delete My Account
                </Text>
            </TouchableOpacity>

            </Text>

          </View>

        </View>

      </main>

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
    gap: 5,
  },
  headertxt1: {
    fontSize: 20,
    color: '#00f',
    fontWeight: 700,
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
    color: 'rgb(27, 27, 117)',
    fontWeight: '600',
  },
  div1par: {
    width: '50%',
    fontSize: 16,


  },
  btn1: {
    backgroundColor: '#00F',
    color:'#fff',
    padding:8,
    fontSize: 17,
    width: '25%',
    borderRadius:15,
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
    gap:5,
 
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
    color:'#15153b',
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
    color: '#15153b',
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
    color: '#15153b',
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
color:'#141438',
backgroundColor:'#b4b4b4',
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
div6h1:{
  marginBottom: 10,
  marginTop: 10,
  fontSize: 20,
  color: '#ff0000',
  fontWeight: '600',
},
div6par:{
  width: '80%',
  fontSize: 17,
  color: '#ff0000',
},
div6link:{
  fontSize: 17,
  color: '#ff0000',
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
