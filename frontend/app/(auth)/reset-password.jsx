import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import { useResetPassword } from "../../src/features/auth/hooks/useAuth";

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams();
  const [token, setToken] = useState(typeof params.token === "string" ? params.token : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useResetPassword({
    onSuccess: () => Alert.alert("Password reset", "You can now log in with your new password.", [{ text: "Log in", onPress: () => router.replace("/sign-in") }]),
    onError: (error) => Alert.alert("Reset failed", error.response?.data?.message || error.message),
  });

  const submit = () => {
    if (!token.trim() || !password) return Alert.alert("Missing details", "Enter the reset token and your new password.");
    if (password !== confirmPassword) return Alert.alert("Passwords do not match", "Enter the same password twice.");
    mutation.mutate({ token: token.trim(), newPassword: password });
  };

  return <SafeAreaView style={styles.page}><View style={styles.card}>
    <Text style={styles.title}>Reset password</Text>
    <Text style={styles.copy}>Enter the token from your email and choose a new password.</Text>
    <Field label="RESET TOKEN" value={token} onChangeText={setToken} autoCapitalize="none" />
    <Field label="NEW PASSWORD" value={password} onChangeText={setPassword} secureTextEntry />
    <Field label="CONFIRM PASSWORD" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
    <Pressable style={[styles.button, mutation.isPending && styles.disabled]} onPress={submit} disabled={mutation.isPending}><Text style={styles.buttonText}>{mutation.isPending ? "Resetting..." : "Reset password"}</Text></Pressable>
  </View></SafeAreaView>;
}

function Field({ label, ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = Boolean(props.secureTextEntry);
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><View style={styles.inputShell}>
    <TextInput style={styles.input} {...props} secureTextEntry={isPassword && !passwordVisible} />
    {isPassword ? <Pressable onPress={() => setPasswordVisible((visible) => !visible)} hitSlop={10} accessibilityRole="button" accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}>
      <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="#7B8491" />
    </Pressable> : null}
  </View></View>;
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#F8F8FC" },
  card: { width: "100%", maxWidth: 380, padding: 30, borderRadius: 12, backgroundColor: "#FFFFFF" },
  title: { fontSize: 26, fontWeight: "700", color: "#173A5E" },
  copy: { marginTop: 8, marginBottom: 24, color: "#65717D", lineHeight: 20 }, field: { marginBottom: 16 },
  label: { marginBottom: 7, fontSize: 11, fontWeight: "700", color: "#555A63" },
  inputShell: { height: 48, paddingHorizontal: 12, borderWidth: 1, borderColor: "#C7CCD8", borderRadius: 8, flexDirection: "row", alignItems: "center" },
  input: { flex: 1, height: "100%" },
  button: { height: 50, marginTop: 6, alignItems: "center", justifyContent: "center", borderRadius: 7, backgroundColor: "#003F78" },
  buttonText: { color: "#FFFFFF", fontWeight: "700" }, disabled: { opacity: 0.65 },
});
