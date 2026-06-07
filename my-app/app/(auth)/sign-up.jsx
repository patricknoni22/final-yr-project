import {
  Pressable,

  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function Screen() {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");


  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headtx}>Create Account</Text>
          <Text style={styles.txt}>Join the academic community Today
          </Text>

        </View>
      </View>
      <View>
        <View>
          <View style={styles.inpuDIV}>
            <Text StyleSheet={styles.input}>
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

          <View style={styles.butt}>
            <Text style={styles.txt}>I AM A...</Text>
            <View style={
              styles.buts
            }><View style={styles.but}>
                <Pressable
                  style={[styles.roleButton, role === "student" && styles.roleButtonActive]}
                  onPress={() => setRole("student")}
                >
                  <Text style={styles.roleButtonText}>Student</Text>
                </Pressable>
                <Pressable
                  style={[styles.roleButton, role === "lecturer" && styles.roleButtonActive]}
                  onPress={() => setRole("lecturer")}
                >
                  <Text style={styles.roleButtonText}>Lecturer</Text>
                </Pressable>
              </View>
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
            <Text style={styles.checkbox}><input type="checkbox" name="terms" id="terms" checked /></Text>
            <Text style={styles.term1}>I agree to the Terms OF Service and Privacy Policy </Text>
          </Text>
          <Pressable style={styles.reg}>Register</Pressable>
          <View style={styles.ftp}>
            <Text style={styles.txt}>Already have an account?</Text>

            <TouchableOpacity onPress={() => { router.push("/sign-in") }}>
              <Text style={styles.log}>Login</Text></TouchableOpacity>

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
  header: {
    padding: 10,
    marginBottom: 10,
  },
  headtx: {
    fontSize: 20,
    color: "#00f",
    fontWeight: 600,
    padding: 5,
  },
  but: {

    marginTop: 10,
    marginBottom: 20,
    padding: 1,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-evenly',
    width: "90%",
    gap: 10,
    borderRadius: 10,

  },
  roleButton: {
    padding: 7,
    width: "60%",
    borderRadius: 6,
    backgroundColor: "#efefef",

  },
  roleButtonActive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1938aa",
  },
  roleButtonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
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
  inpuDIV: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    paddingLeft: 5,
    justifyContent: 'center',
    gap: 1,

  },

  butt: {
    padding: 10,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    width: "80%",
    fontSize: 20,
  },

  buttons: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 5,
  },
  inputtxt: {
    marginLeft: 5,
  },
  foot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    gap: 10,
    fontSize: 17,
    marginLeft: 10,
  },
  footpar: {
    marginLeft: 10,
    fontSize: 17,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'flex-start',
    gap: 10,

  },
  reg: {
    backgroundColor: '#00f',
    padding: 8,
    borderRadius: 6,
    color: '#fff',
    width: '80%',
    textAlign: 'center',
    marginBottom:10,
    marginLeft:40,

  },
  ftp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    gap: 3,

  }
  ,
  checkbox: {
    marginRight: 8,
  },
  term1: {
    width: '80%',
    marginBottom: 10,
    marginTop: 20

  },
   txt:{
fontSize:17
   },
   log:{
     textTransform:'uppercase',
     fontSize:17,
       textDecorationLine:'underline',
       color:'rgb(23, 23, 78)',
       fontWeight:'600'
       
    },
});
