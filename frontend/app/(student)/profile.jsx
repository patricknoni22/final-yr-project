import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text, {
  InterTextInput as TextInput,
} from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useLogout } from "../../src/features/auth/hooks/useAuth";
import { useChangePassword, useMyProfile, useUpdateMyProfile } from "../../src/features/profile/hooks/useProfile";

function Field({ label, value, secureTextEntry = false, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

function Panel({ title, children }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function StudentSettingsScreen() {
  const [username, setUsername] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [level, setLevel] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { data: profile } = useMyProfile();
  const updateMutation = useUpdateMyProfile({ onSuccess: () => Alert.alert("Saved", "Your profile has been updated."), onError: (error) => Alert.alert("Could not save", error.response?.data?.message || error.message) });
  const passwordMutation = useChangePassword({ onSuccess: () => { setCurrentPassword(""); setNewPassword(""); Alert.alert("Password updated", "Your password has been changed."); }, onError: (error) => Alert.alert("Could not update password", error.response?.data?.message || error.message) });
  const logoutMutation = useLogout({
    onSettled: () => router.replace("/sign-in"),
  });

  useEffect(() => {
    if (!profile) return;
    setUsername(profile.username || "");
    setStudentId(profile.studentId || "");
    setDepartment(profile.department || "");
    setFaculty(profile.faculty || "");
    setLevel(profile.level || "");
  }, [profile]);

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => logoutMutation.mutate() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader
        actionIcon="search-outline"
      />

      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Settings</Text>
        <View style={styles.titleRow}>
          <Text style={styles.subtitle}>
            Manage your student profile and account preferences
          </Text>
          <TouchableOpacity style={styles.saveButton} onPress={() => updateMutation.mutate({ username: username.trim(), studentId: studentId.trim(), department: department.trim(), faculty: faculty.trim(), level: level.trim() })} disabled={updateMutation.isPending}>
            <Ionicons name="save-outline" size={13} color="#FFFFFF" />
            <Text style={styles.saveText}>{updateMutation.isPending ? "Saving..." : "Save All Changes"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsGrid}>
          <View style={styles.panels}>
            <Panel title="Personal Information">
              <Field label="Full Name" value={username} onChangeText={setUsername} />
              <Field label="Student ID" value={studentId} onChangeText={setStudentId} />
              <Field label="Department" value={department} onChangeText={setDepartment} />
              <Field label="Faculty" value={faculty} onChangeText={setFaculty} />
              <Field label="Level" value={level} onChangeText={setLevel} keyboardType="number-pad" />
              <Field
                label="Student Email"
                value={profile?.email || ""}
                editable={false}
              />
            </Panel>

            <Panel title="Password Change">
              <Field
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
              />
              <Field label="New Password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
              <TouchableOpacity style={styles.secondaryButton} onPress={() => passwordMutation.mutate({ oldPassword: currentPassword, newPassword })} disabled={!currentPassword || newPassword.length < 6 || passwordMutation.isPending}>
                <Text style={styles.secondaryButtonText}>{passwordMutation.isPending ? "Updating..." : "Update Password"}</Text>
              </TouchableOpacity>
            </Panel>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={logoutMutation.isPending}>
              <Ionicons name="log-out-outline" size={18} color="#B92D2D" />
              <Text style={styles.logoutText}>{logoutMutation.isPending ? "Logging out..." : "Log Out"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    height: 58,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EBEF",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 5 },
  brandText: { color: "#003F78", fontSize: 16, fontWeight: "800" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerAvatar: { width: 28, height: 28, borderRadius: 14 },
  page: { padding: 16, paddingBottom: 28 },
  pageTitle: {
    color: "#173A5E",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },
  titleRow: {
    marginTop: 3,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  subtitle: { flex: 1, color: "#71808E", fontSize: 14, lineHeight: 20 },
  saveButton: {
    height: 31,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 5,
    backgroundColor: "#003F78",
  },
  saveText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  settingsGrid: { width: "100%" },
  panels: { width: "100%", gap: 12 },
  panel: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E1E6EB",
    borderRadius: 7,
    backgroundColor: "#FAFBFC",
  },
  panelTitle: {
    marginBottom: 14,
    color: "#173A5E",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  field: { marginBottom: 9 },
  label: {
    marginBottom: 6,
    color: "#4A5A69",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  input: {
    height: 44,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: "#D5DCE3",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    color: "#263A4D",
    fontSize: 14,
  },
  settingRow: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF0F3",
  },
  settingCopy: { flex: 1 },
  settingTitle: {
    color: "#263A4D",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  settingDescription: {
    marginTop: 4,
    color: "#788592",
    fontSize: 12,
    lineHeight: 18,
  },
  switch: {
    transform: [{ scaleX: 0.62 }, { scaleY: 0.62 }],
    marginHorizontal: -8,
  },
  secondaryButton: {
    alignSelf: "flex-start",
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#E7EFF7",
  },
  secondaryButtonText: { color: "#003F78", fontSize: 13, fontWeight: "700" },

  deactivatePanel: {
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#F0CACA",
    borderRadius: 7,
    backgroundColor: "#FFF9F9",
  },
  deactivateCopy: { flex: 1 },
  deactivateTitle: { color: "#B92D2D", fontSize: 14, fontWeight: "700" },
  deactivateDescription: {
    marginTop: 4,
    color: "#8A6161",
    fontSize: 12,
    lineHeight: 11,
  },
  deactivateButton: {
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#D56969",
    borderRadius: 5,
  },
  deactivateButtonText: {
    color: "#B92D2D",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold",
  },
  logoutButton: { height: 46, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: "#D56969", borderRadius: 7 },
  logoutText: { color: "#B92D2D", fontSize: 14, fontWeight: "700" },
});
