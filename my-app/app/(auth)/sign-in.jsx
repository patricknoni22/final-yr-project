import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <SafeAreaView style={styles.container}>

      <header >
        <View style={styles.header}>
          <img src="" alt="icon" />


          <Text style={styles.sm}>Smart Meet</Text>
        </View>
      </header>
      <main style={styles.main}>
        <Text style={styles.txt2}>
          <Text style={styles.h2}>Welcome Back</Text>
          <Text style={styles.p1}>
            Please enter your credentials to access your portal.
          </Text>
        </Text>
        <View style={styles.but}>
          <Pressable style={styles.but1}>Student</Pressable>
          <Pressable style={styles.but2}>Lecturer</Pressable>
        </View>
        <Text style={styles.uemail}>university email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.pass}>
          <Text>PASSWORD </Text>
          <Link href={'/'} style={styles.link}
          > Forgot Password?</Link>

        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/dashboard") }}>
          <Text style={styles.button1}> Login</Text>
        </TouchableOpacity>

        <Text style={styles.ft}>
          <Text>Don t have an account? </Text>
          <TouchableOpacity onPress={() => { router.push("/sign-up") }}>
            <Text> Register</Text>
          </TouchableOpacity>
        </Text>
      </main>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  main: {
    marginLeft: 10,
  },
  header: {
    textAlign: "left",
    margin: 10,
    fontSize: 20,
    color: "blue",
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    gap: 5,
  },
  sm: {
    fontSize: 40,
  },
  h2: {
    color: '#000',
    fontSize: 35,
    fontWeight: 600,
  },

  p1: {
    width: "70%",
    fontSize: 17,

  },
  but: {
    margin: 10,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#dbd4d4",
    padding: 10,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
    borderRadius: 10,
    fontSize: 20,
  },
  but1: {
    padding: 7,
    width: "40%",
    borderRadius: 6,
    backgroundColor: '#fff'

  },
  but2: {
    padding: 7,
    borderRadius: 6,
    width: "40%",
    marginRight: 10,
    backgroundColor: '#fff'

  },
  txt2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: 10,
  },
  uemail: {
    textTransform: 'uppercase',
    margin: 10,
  },
  input: {
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 45,
    borderWidth: 2,
    paddingHorizontal: 50,
    margin: 10,
    marginBottom: 20,

  },
  button: {
    margin: 10,
    backgroundColor: '#00f',
    padding: 15,
    borderRadius: 10,
    width: '75%',
    marginBottom: 20,
  },
  button1:{
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  link: {
    color: '#080844',
    fontSize: 16.5,
    marginRight: 50,
  },
  pass: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',

  },
  ft: {
    marginLeft: 15,

    padding: 10,
    textAlign: 'center',


  },


});

