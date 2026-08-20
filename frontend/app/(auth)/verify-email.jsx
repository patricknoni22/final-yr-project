import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import { useResendVerificationEmail, useVerifyEmail } from "../../src/features/auth/hooks/useAuth";

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams();
  const email = typeof params.email === "string" ? params.email : "";
  const [token, setToken] = useState("");
  const verifyMutation = useVerifyEmail({
    onSuccess: () => Alert.alert("Email verified", "Your account is ready. You can now log in.", [
      { text: "Log in", onPress: () => router.replace("/sign-in") },
    ]),
    onError: (error) => Alert.alert("Verification failed", error.response?.data?.message || error.message || "Check the token and try again."),
  });
  const resendMutation = useResendVerificationEmail({
    onSuccess: (response) => Alert.alert("Email sent", response.message || "A new verification token was sent."),
    onError: (error) => Alert.alert("Could not resend", error.response?.data?.message || error.message || "Please try again."),
  });

  const verify = () => {
    const normalizedToken = token.trim();
    if (!normalizedToken) return Alert.alert("Token required", "Enter the token from your verification email.");
    verifyMutation.mutate({ token: normalizedToken });
  };

  return <SafeAreaView style={styles.page}><View style={styles.card}>
    <View style={styles.iconBox}><Ionicons name="mail-outline" size={30} color="#003F78" /></View>
    <Text style={styles.title}>Verify your email</Text>
    <Text style={styles.copy}>Enter the verification token sent to{email ? `\n${email}` : " your email address"}.</Text>
    <Text style={styles.label}>VERIFICATION TOKEN</Text>
    <TextInput style={styles.input} value={token} onChangeText={(value) => setToken(value.replace(/\D/g, "").slice(0, 8))} keyboardType="number-pad" maxLength={8} autoCorrect={false} placeholder="Enter 8-digit code" placeholderTextColor="#7B8491" />
    <Pressable style={[styles.button, verifyMutation.isPending && styles.disabled]} onPress={verify} disabled={verifyMutation.isPending}>
      <Text style={styles.buttonText}>{verifyMutation.isPending ? "Verifying..." : "Verify email"}</Text>
    </Pressable>
    {email ? <Pressable onPress={() => resendMutation.mutate({ email })} disabled={resendMutation.isPending}>
      <Text style={styles.link}>{resendMutation.isPending ? "Sending..." : "Resend verification email"}</Text>
    </Pressable> : null}
    <Pressable onPress={() => router.replace("/sign-in")}><Text style={styles.secondaryLink}>Back to login</Text></Pressable>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F8FC" },
  card: { width: "100%", maxWidth: 380, padding: 30, borderRadius: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E0E3EA" },
  iconBox: { width: 58, height: 58, alignItems: "center", justifyContent: "center", borderRadius: 29, backgroundColor: "#EAF2F8" },
  title: { marginTop: 18, fontSize: 26, fontWeight: "700", color: "#173A5E" },
  copy: { marginTop: 8, marginBottom: 26, color: "#65717D", lineHeight: 20 },
  label: { marginBottom: 7, fontSize: 11, fontWeight: "700", color: "#555A63", letterSpacing: 0.35 },
  input: { height: 48, paddingHorizontal: 12, borderWidth: 1, borderColor: "#C7CCD8", borderRadius: 8, color: "#17191C" },
  button: { height: 50, marginTop: 20, alignItems: "center", justifyContent: "center", borderRadius: 7, backgroundColor: "#003F78" },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  disabled: { opacity: 0.65 },
  link: { marginTop: 22, textAlign: "center", color: "#003F78", fontWeight: "600" },
  secondaryLink: { marginTop: 18, textAlign: "center", color: "#65717D", fontWeight: "600" },
});
