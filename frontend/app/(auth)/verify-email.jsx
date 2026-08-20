import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import { useResendVerificationEmail, useVerifyEmail } from "../../src/features/auth/hooks/useAuth";

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams();
  const email = typeof params.email === "string" ? params.email : "";
  const maskedEmail = maskEmail(email);
  const inputRef = useRef(null);
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
    if (normalizedToken.length !== 6) return Alert.alert("Code incomplete", "Enter all 6 digits from your verification email.");
    verifyMutation.mutate({ token: normalizedToken });
  };

  return <SafeAreaView style={styles.page}><View style={styles.card}>
    <View style={styles.iconBox}><Ionicons name="mail-outline" size={30} color="#003F78" /></View>
    <Text style={styles.title}>Verify your email</Text>
    <Text style={styles.copy}>Enter the 6-digit code sent to{maskedEmail ? `\n${maskedEmail}` : " your email address"}.</Text>
    <Text style={styles.label}>VERIFICATION CODE</Text>
    <Pressable style={styles.otpRow} onPress={() => inputRef.current?.focus()} accessibilityRole="button" accessibilityLabel="Enter 6-digit verification code">
      {Array.from({ length: 6 }, (_, index) => (
        <View key={index} style={[styles.otpBox, token.length === index && styles.otpBoxActive, token[index] && styles.otpBoxFilled]}>
          <Text style={styles.otpDigit}>{token[index] || ""}</Text>
        </View>
      ))}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={token}
        onChangeText={(value) => setToken(value.replace(/\D/g, "").slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        autoCorrect={false}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        caretHidden
      />
    </Pressable>
    <Pressable style={[styles.button, verifyMutation.isPending && styles.disabled]} onPress={verify} disabled={verifyMutation.isPending}>
      <Text style={styles.buttonText}>{verifyMutation.isPending ? "Verifying..." : "Verify email"}</Text>
    </Pressable>
    {email ? <Pressable onPress={() => resendMutation.mutate({ email })} disabled={resendMutation.isPending}>
      <Text style={styles.link}>{resendMutation.isPending ? "Sending..." : "Resend verification email"}</Text>
    </Pressable> : null}
    <Pressable onPress={() => router.replace("/sign-in")}><Text style={styles.secondaryLink}>Back to login</Text></Pressable>
  </View></SafeAreaView>;
}

function maskEmail(email) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "";
  const visible = name.slice(0, Math.min(2, name.length));
  return `${visible}${"*".repeat(Math.max(3, name.length - visible.length))}@${domain}`;
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F8FC" },
  card: { width: "100%", maxWidth: 380, padding: 30, borderRadius: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E0E3EA" },
  iconBox: { width: 58, height: 58, alignItems: "center", justifyContent: "center", borderRadius: 29, backgroundColor: "#EAF2F8" },
  title: { marginTop: 18, fontSize: 26, fontWeight: "700", color: "#173A5E" },
  copy: { marginTop: 8, marginBottom: 26, color: "#65717D", lineHeight: 20 },
  label: { marginBottom: 7, fontSize: 11, fontWeight: "700", color: "#555A63", letterSpacing: 0.35 },
  otpRow: { position: "relative", flexDirection: "row", justifyContent: "space-between", gap: 5 },
  otpBox: { width: 34, height: 48, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#C7CCD8", borderRadius: 7, backgroundColor: "#FFFFFF" },
  otpBoxActive: { borderColor: "#003F78", borderWidth: 2 },
  otpBoxFilled: { borderColor: "#7894AE", backgroundColor: "#F4F8FB" },
  otpDigit: { color: "#173A5E", fontSize: 19, fontWeight: "700" },
  hiddenInput: { position: "absolute", width: 1, height: 1, opacity: 0 },
  button: { height: 50, marginTop: 20, alignItems: "center", justifyContent: "center", borderRadius: 7, backgroundColor: "#003F78" },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  disabled: { opacity: 0.65 },
  link: { marginTop: 22, textAlign: "center", color: "#003F78", fontWeight: "600" },
  secondaryLink: { marginTop: 18, textAlign: "center", color: "#65717D", fontWeight: "600" },
});
