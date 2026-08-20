import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import { useLogin } from "../../src/features/auth/hooks/useAuth";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("student");

  const loginMutation = useLogin({
    onSuccess: (response) => {
      router.replace(response.data?.user?.role === "LECTURER" ? "/(lecturer)/dashboard" : "/(student)/dashboard");
    },
    onError: (error) => {
      if (error.response?.data?.code === "EMAIL_NOT_VERIFIED") {
        Alert.alert("Email not verified", "Verify your email before logging in.", [
          { text: "Cancel", style: "cancel" },
          { text: "Verify", onPress: () => router.push({ pathname: "/verify-email", params: { email: email.trim().toLowerCase() } }) },
        ]);
        return;
      }
      Alert.alert("Login failed", error.response?.data?.message || error.message || "Please try again.");
    },
  });

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }
    loginMutation.mutate({ email: email.trim().toLowerCase(), password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.brand}>
            <View style={styles.logoBox}>
              <Ionicons name="school-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.brandName}>SmartMeet</Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Please enter your credentials to{"\n"}access your portal.
          </Text>

          <RoleSelector role={role} setRole={setRole} />

          <FieldLabel>UNIVERSITY EMAIL</FieldLabel>
          <View style={styles.inputShell}>
            <Ionicons name="mail-outline" size={18} color="#7B8491" />
            <TextInput
              style={styles.input}
              placeholder="e.g. smith.j@university.edu"
              placeholderTextColor="#7B8491"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.passwordHeading}>
            <FieldLabel>PASSWORD</FieldLabel>
            <Pressable onPress={() => router.push("/forgot-password")}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </Pressable>
          </View>
          <View style={styles.inputShell}>
            <Ionicons name="lock-closed-outline" size={18} color="#7B8491" />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#7B8491"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setPasswordVisible((visible) => !visible)} hitSlop={10} accessibilityRole="button" accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}>
              <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="#7B8491" />
            </Pressable>
          </View>

          <Pressable style={[styles.primaryButton, loginMutation.isPending && styles.buttonDisabled]} onPress={handleLogin} disabled={loginMutation.isPending}>
            <Text style={styles.primaryText}>{loginMutation.isPending ? "Logging in..." : "Log In"}</Text>
            <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
          </Pressable>

          <View style={styles.accountRow}>
            <Text style={styles.accountText}>Don&apos;t have an account? </Text>
            <Pressable onPress={() => router.push("/sign-up")}>
              <Text style={styles.accountLink}>Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FieldLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

function RoleSelector({ role, setRole }) {
  return (
    <View style={styles.roleSelector}>
      {[
        ["student", "Student"],
        ["lecturer", "Lecturer"],
      ].map(([value, label]) => (
        <Pressable
          key={value}
          style={[styles.roleButton, role === value && styles.roleButtonActive]}
          onPress={() => setRole(value)}
        >
          <Text
            style={[styles.roleText, role === value && styles.roleTextActive]}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F8FC" },
  page: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 36,
    shadowColor: "#001E40",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 42,
  },
  logoBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#003F78",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: { color: "#003F78", fontSize: 18, fontWeight: "700" },
  title: {
    color: "#17191C",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    marginBottom: 5,
  },
  subtitle: {
    color: "#60656D",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 36,
  },
  roleSelector: {
    height: 42,
    flexDirection: "row",
    backgroundColor: "#ECECF2",
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  roleButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#001E40",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  roleText: { color: "#50525B", fontSize: 13, fontWeight: "600" },
  roleTextActive: { color: "#002B55" },
  label: {
    color: "#555A63",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 0.35,
    marginBottom: 7,
  },
  passwordHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  forgot: {
    color: "#001E40",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  inputShell: {
    height: 48,
    borderWidth: 1,
    borderColor: "#C7CCD8",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#17191C",
    fontSize: 13,
    padding: 0,
  },
  primaryButton: {
    height: 54,
    borderRadius: 7,
    backgroundColor: "#003F78",
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  buttonDisabled: { opacity: 0.65 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 52,
    marginBottom: 32,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#CFD3DC" },
  dividerText: {
    color: "#646870",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  socialRow: { flexDirection: "row", gap: 20 },
  socialButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#C7CCD8",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  socialText: { color: "#17191C", fontSize: 13, fontWeight: "500" },
  accountRow: { flexDirection: "row", justifyContent: "center", marginTop: 42 },
  accountText: { color: "#4E535B", fontSize: 12 },
  accountLink: { color: "#001E40", fontSize: 12, fontWeight: "600" },
});





