import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import { useRegister } from "../../src/features/auth/hooks/useAuth";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [agreed, setAgreed] = useState(false);

  const registerMutation = useRegister({
    onSuccess: () => {
      Alert.alert("Account created", "You can now log in.", [
        { text: "Continue", onPress: () => router.replace("/sign-in") },
      ]);
    },
    onError: (error) => {
      Alert.alert("Registration failed", error.response?.data?.message || error.message || "Please try again.");
    },
  });

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing details", "Complete all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Enter the same password in both fields.");
      return;
    }
    if (!agreed) {
      Alert.alert("Terms required", "Agree to the Terms of Service and Privacy Policy.");
      return;
    }
    registerMutation.mutate({ username: fullName.trim(), email: email.trim().toLowerCase(), password, role: role.toUpperCase() });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the academic community today</Text>

          <FormField label="FULL NAME" icon="person-outline" placeholder="Dr. Jane Smith" value={fullName} onChangeText={setFullName} />
          <FormField label="UNIVERSITY EMAIL" icon="at-outline" placeholder="jane.smith@university.edu" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.label}>I AM A...</Text>
          <View style={styles.roleSelector}>
            {[["student", "Student"], ["lecturer", "Lecturer"]].map(([value, label]) => (
              <Pressable key={value} style={[styles.roleButton, role === value && styles.roleButtonActive]} onPress={() => setRole(value)}>
                <Text style={[styles.roleText, role === value && styles.roleTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </View>

          <FormField label="PASSWORD" icon="lock-closed-outline" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
          <FormField label="CONFIRM" icon="shield-checkmark-outline" placeholder="••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

          <Pressable style={styles.termsRow} onPress={() => setAgreed((value) => !value)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
            </View>
            <Text style={styles.termsText}>I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{"\n"}<Text style={styles.termsLink}>Privacy Policy.</Text></Text>
          </Pressable>

          <Pressable style={[styles.registerButton, registerMutation.isPending && styles.buttonDisabled]} onPress={handleRegister} disabled={registerMutation.isPending}>
            <Text style={styles.registerText}>{registerMutation.isPending ? "Registering..." : "Register"}</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>

          <View style={styles.accountRow}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/sign-in")}><Text style={styles.accountLink}>Login</Text></Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FormField({ label, icon, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name={icon} size={18} color="#7B8491" />
        <TextInput style={styles.input} placeholderTextColor="#7B8491" autoCapitalize="none" {...inputProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F8FC" },
  page: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: { width: "100%", maxWidth: 360, borderRadius: 10, backgroundColor: "#FFFFFF", paddingHorizontal: 30, paddingTop: 32, paddingBottom: 42, borderWidth: 1, borderColor: "#C7CCD8", shadowColor: "#001E40", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.09, shadowRadius: 12, elevation: 4 },
  title: { color: "#003F78", fontSize: 24, lineHeight: 30, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#777C84", fontSize: 14, lineHeight: 20, marginBottom: 29 },
  field: { marginBottom: 18 },
  label: { color: "#555A63", fontSize: 11, lineHeight: 14, fontWeight: "700", letterSpacing: 0.35, marginBottom: 7 },
  inputShell: { height: 48, borderWidth: 1, borderColor: "#C7CCD8", borderRadius: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  input: { flex: 1, height: "100%", color: "#17191C", fontSize: 13, padding: 0 },
  roleSelector: { height: 42, flexDirection: "row", backgroundColor: "#ECECF2", borderWidth: 1, borderColor: "#D0D3DD", borderRadius: 8, padding: 4, marginBottom: 18 },
  roleButton: { flex: 1, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  roleButtonActive: { backgroundColor: "#FFFFFF", shadowColor: "#001E40", shadowOpacity: 0.09, shadowRadius: 3, elevation: 2 },
  roleText: { color: "#50525B", fontSize: 13, fontWeight: "600" },
  roleTextActive: { color: "#003F78" },
  termsRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginTop: 2, marginBottom: 27 },
  checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: "#C7CCD8", borderRadius: 4, alignItems: "center", justifyContent: "center", marginTop: 1 },
  checkboxChecked: { backgroundColor: "#003F78", borderColor: "#003F78" },
  termsText: { color: "#656A72", fontSize: 12, lineHeight: 15 },
  termsLink: { color: "#003F78", fontWeight: "600" },
  registerButton: { height: 48, borderRadius: 7, backgroundColor: "#003F78", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  registerText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  buttonDisabled: { opacity: 0.65 },
  accountRow: { flexDirection: "row", justifyContent: "center", marginTop: 28 },
  accountText: { color: "#656A72", fontSize: 12 },
  accountLink: { color: "#003F78", fontSize: 12, fontWeight: "600" },
});



