import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
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
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    if (role === "lecturer") {
      router.push("/(lecturer)/dashboard");
      return;
    }
    router.push("/(student)/dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
         
            style={styles.logo}
          />
          <Text style={styles.sm}>Smart Meet</Text>
        </View>
      </View>
      <View style={styles.main}>
        <Text style={styles.txt2}>
          <Text style={styles.h2}>Welcome Back</Text>
          <Text style={styles.p1}>
            Please enter your credentials to access your portal.
          </Text>
        </Text>
        <View style={styles.but}>
          <Pressable
            style={[styles.roleButton, role === "student" && styles.roleButtonActive]}
            onPress={() => setRole("student")}
          >cd
            <Text style={styles.roleButtonText}>Student</Text>
          </Pressable>
          <Pressable
            style={[styles.roleButton, role === "lecturer" && styles.roleButtonActive]}
            onPress={() => setRole("lecturer")}
          >
            <Text style={styles.roleButtonText}>Lecturer</Text>
          </Pressable>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.button1}> Login</Text>
        </TouchableOpacity>

        <Text style={styles.ft}>
          <Text>Don t have an account? </Text>
          <TouchableOpacity onPress={() => { router.push("/sign-up") }}>
            <Text> Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  main: {
    marginLeft: 20,
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
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  roleButton: {
    padding: 7,
    width: "40%",
    borderRadius: 6,
    backgroundColor: "#efefef",
  },
  roleButtonActive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1f50ff",
  },
  roleButtonText: {
    textAlign: "center",
    fontWeight: "600",
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
    paddingHorizontal: 30,
    margin: 10,
    marginBottom: 20,
    width:'85%'

  },
  button: {
    margin: 10,
    backgroundColor: '#00f',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
  },
  button1:{
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  link: {
    color: '#080844',
    fontSize: 16,
    marginRight: 50,
  },
  pass: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  ft: {
    marginRight:30,
    padding: 10,
    textAlign: 'center',


  },


});

