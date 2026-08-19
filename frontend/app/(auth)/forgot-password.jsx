import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import { useForgotPassword } from "../../src/features/auth/hooks/useAuth";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const mutation = useForgotPassword({
    onSuccess: () => Alert.alert("Email sent", "Check your email for the password reset link."),
    onError: (error) => Alert.alert("Request failed", error.response?.data?.message || error.message),
  });

  const submit = () => {
    if (!email.trim()) return Alert.alert("Email required", "Enter your university email.");
    mutation.mutate({ email: email.trim().toLowerCase() });
  };

  return <SafeAreaView style={styles.page}><View style={styles.card}>
    <Ionicons name="key-outline" size={34} color="#003F78" />
    <Text style={styles.title}>Forgot password?</Text>
    <Text style={styles.copy}>Enter your email and we’ll send you a reset link.</Text>
    <Text style={styles.label}>UNIVERSITY EMAIL</Text>
    <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="name@university.edu" />
    <Pressable style={[styles.button, mutation.isPending && styles.disabled]} onPress={submit} disabled={mutation.isPending}><Text style={styles.buttonText}>{mutation.isPending ? "Sending..." : "Send reset link"}</Text></Pressable>
    <Pressable onPress={() => router.back()}><Text style={styles.link}>Back to login</Text></Pressable>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F8FC" },
  card: { width: "100%", maxWidth: 380, padding: 30, borderRadius: 12, backgroundColor: "#FFFFFF" },
  title: { marginTop: 18, fontSize: 26, fontWeight: "700", color: "#173A5E" },
  copy: { marginTop: 8, marginBottom: 26, color: "#65717D", lineHeight: 20 },
  label: { marginBottom: 7, fontSize: 11, fontWeight: "700", color: "#555A63" },
  input: { height: 48, paddingHorizontal: 12, borderWidth: 1, borderColor: "#C7CCD8", borderRadius: 8 },
  button: { height: 50, marginTop: 20, alignItems: "center", justifyContent: "center", borderRadius: 7, backgroundColor: "#003F78" },
  buttonText: { color: "#FFFFFF", fontWeight: "700" }, disabled: { opacity: 0.65 },
  link: { marginTop: 22, textAlign: "center", color: "#003F78", fontWeight: "600" },
});
