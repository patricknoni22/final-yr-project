import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function Screen() {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headtx}>Create Account</Text>
          <Text>Join the academic community Today
          </Text>

        </View>
      </View>
      <View>
        <View>
          <View style={styles.inpuDIV}>
            <Text StyleSheet={styles.inputtt}>
              FULL NAME</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              autoCapitalize="none"
              keyboardType="text"
              value={fullname}
              aria-label="Enter your full name"
              onChangeText={setfullname}
            />
          </View>
           
           <View style={styles.inpuDIV}>
            <Text style={styles.uemail}>UNIVERSITY EMAIL</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Enter your Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              aria-label="Enter your email"
              onChangeText={setEmail}
            />
           </View>
          
          <View style={styles.but}>
            <Text>I AM A...</Text>
            <View style={
              styles.buts
            }>
              <Pressable style={styles.buttons}>Student</Pressable>
              <Pressable style={styles.buttons}>Lecturer</Pressable>
            </View>
            
          </View>

        </View>

        <View style={styles.inpuDIV}>
          <Text style={styles.uemail}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            secureTextEntry
            value={password}
            aria-label="Enter your Password"
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inpuDIV}>
          <Text style={styles.uemail}>CONFIRM</Text>
          <TextInput
            style={styles.input}
            placeholder="Renter your Password"
            secureTextEntry
            aria-label="Renter your Password"
            value={password}
            onChangeText={setPassword}
          />

        </View>

        
      </View>
      <View>
        <View style={styles.foot}>
          <Text style={styles.footpar}>
            <Text style={styles.checkbox}>[]</Text>
            <Text >I agree to the Terms OF Service and Privacy Policy </Text>
          </Text>
          <Pressable style={styles.reg}>Register</Pressable>
          <View style={styles.ftp}>
            <Text>Already have an account?</Text>
            
            <TouchableOpacity onPress={() => {router.push("/sign-in")}}>
                        Login</TouchableOpacity>

          </View>
        </View>
      </View>

    </SafeAreaView>

  );
}




const styles = StyleSheet.create({

    container: {
      margin: 10,
      fontSize:17,
      borderRadius:10,
      backgroundColor:"#ebebeb",
    },
    header:{
      padding:10,
      marginBottom:10,
    },
    headtx:{
     fontSize:20,
     color:"#00f",
     fontWeight:600,
     padding:5,
    },
  input: {
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 45,
    borderWidth: 2,
    paddingHorizontal: 45,
    margin: 10,
    marginBottom: 12,

  },
  inputs: {
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 45,
    borderWidth: 2,
    paddingHorizontal: 45,
    margin: 10,
    marginBottom: 10,
   

  },
  inpuDIV:{
   display:'flex',
   flexDirection:'column',
   alignItems:'flex-start',
   marginLeft:10,
   paddingLeft:5,
   justifyContent:'center',
   gap:1,

  },

  but: {
    padding: 10,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    width: "80%",
    fontSize: 20,
  },
  buts:{
    borderRadius: 10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgb(211, 211, 212)',
    padding:10,
    gap:15,
  },
  buttons:{
    backgroundColor:'#fff',
    padding:7,
    borderRadius:5,
  },
  inputtxt:{
    marginLeft:5,
  },
  foot:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width: '70%',
    gap:10,
    fontSize:17,
    marginLeft: 10,
  },
  footpar:{
   marginLeft:10,
   fontSize:17,
   display:'flex',
   flexDirection:'row',
   gap:10,

  },
  reg:{
    backgroundColor:'#00f',
    padding:8,
    borderRadius:6,
    color:'#fff',
    width:'80%',
    textAlign:'center',

  },
  ftp:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,

  }
  ,
  checkbox: {
    marginRight: 8,
  },

});
