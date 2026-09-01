import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import Text, {
  InterTextInput as TextInput,
} from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import InitialsAvatar from "../../src/components/common/InitialsAvatar";
import { useLogout } from "../../src/features/auth/hooks/useAuth";
import { useMyProfile, useUpdateMyProfile } from "../../src/features/profile/hooks/useProfile";

function SectionTitle({ icon, children }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Ionicons name={icon} size={17} color="#173A5E" />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

function Field({ label, value, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} style={styles.input} {...props} />
    </View>
  );
}

function ToggleRow({ title, description, value, onValueChange }) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleCopy}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#DDE2E7", true: "#76A7D4" }}
        thumbColor="#FFFFFF"
        style={styles.switch}
      />
    </View>
  );
}

export default function LecturerSettingsScreen() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [form, setForm] = useState({ username: "", title: "", department: "", office: "", bio: "" });
  const { data: profile } = useMyProfile();
  const updateMutation = useUpdateMyProfile({ onSuccess: () => Alert.alert("Saved", "Your profile has been updated."), onError: (error) => Alert.alert("Could not save", error.response?.data?.message || error.message) });
  const logoutMutation = useLogout({ onSettled: () => router.replace("/sign-in") });

  useEffect(() => {
    if (!profile) return;
    setForm({ username: profile.username || "", title: profile.title || "", department: profile.department || "", office: profile.office || "", bio: profile.bio || "" });
  }, [profile]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const saveProfile = () => updateMutation.mutate({
    username: form.username.trim(),
    title: form.title.trim(),
    department: form.department.trim(),
    office: form.office.trim(),
    bio: form.bio.trim(),
  });

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => logoutMutation.mutate() },
    ]);
  };

  const deactivate = () => Alert.alert("Deactivate account", "Students will no longer be able to find or book you. Continue?", [
    { text: "Cancel", style: "cancel" },
    { text: "Deactivate", style: "destructive", onPress: () => updateMutation.mutate({ isActive: false }, { onSuccess: () => logoutMutation.mutate() }) },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />

      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHero}>
          <InitialsAvatar name={form.username || "Lecturer"} size={64} style={styles.profileAvatar} />
          <View style={styles.profileCopy}><Text style={styles.profileName}>{form.username || "Lecturer"}</Text><Text style={styles.profileMeta}>{form.title || "Lecturer"} · {form.department || "Department"}</Text></View>
          <View style={styles.roleBadge}><Text style={styles.roleText}>LECTURER</Text></View>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile} disabled={updateMutation.isPending}>
            <Ionicons name="save-outline" size={14} color="#FFFFFF" />
            <Text style={styles.saveText}>{updateMutation.isPending ? "Saving..." : "Save changes"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.panel}>
          <SectionTitle icon="person-outline">Profile Information</SectionTitle>
          <Field label="Full Name" value={form.username} onChangeText={(value) => setField("username", value)} />
          <Field label="Academic Title" value={form.title} onChangeText={(value) => setField("title", value)} />
          <Field label="Department" value={form.department} onChangeText={(value) => setField("department", value)} />
          <Field label="Office Location" value={form.office} onChangeText={(value) => setField("office", value)} />
        </View>

        <View style={styles.panel}>
          <SectionTitle icon="document-text-outline">Biography</SectionTitle>
          <TextInput
            value={form.bio}
            onChangeText={(value) => setField("bio", value)}
            multiline
            textAlignVertical="top"
            style={styles.biography}
          />
        </View>

        <View style={styles.panel}>
          <SectionTitle icon="notifications-outline">
            Notification Preferences
          </SectionTitle>
          <ToggleRow
            title="Email Alerts"
            description="Receive booking summaries and reminders via email."
            value={emailAlerts}
            onValueChange={setEmailAlerts}
          />
          <ToggleRow
            title="Push Notifications"
            description="Instant alerts for new appointment requests on your device."
            value={pushAlerts}
            onValueChange={setPushAlerts}
          />
        </View>

        <View style={styles.deactivatePanel}>
          <View style={styles.deactivateCopy}>
            <Text style={styles.deactivateTitle}>Deactivate Portal Access</Text>
            <Text style={styles.deactivateDescription}>
              Temporarily disable your profile from the student booking portal.
            </Text>
          </View>
          <TouchableOpacity style={styles.deactivateButton} onPress={deactivate}>
            <Text style={styles.deactivateButtonText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={logoutMutation.isPending}>
          <Ionicons name="log-out-outline" size={18} color="#B92D2D" />
          <Text style={styles.logoutText}>{logoutMutation.isPending ? "Logging out..." : "Log Out"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    minHeight: 68,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E7EBEF",
  },
  identity: { flex: 1, flexDirection: "row", alignItems: "center", gap: 9 },
  avatar: { width: 34, height: 34, borderRadius: 17 },
  portalLabel: { color: "#173A5E", fontSize: 12, fontWeight: "700" },
  lecturerName: {
    marginTop: 2,
    color: "#7A8794",
    fontSize: 12,
    lineHeight: 18,
  },
  saveButton: {
    height: 34,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 5,
    backgroundColor: "#003F78",
  },
  saveText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600" },
  page: { padding: 20, paddingBottom: 36, gap: 14 },
  profileHero: { padding: 20, flexDirection: "row", alignItems: "center", gap: 13, borderRadius: 24, backgroundColor: "#003F78" },
  profileAvatar: { borderWidth: 3, borderColor: "rgba(255,255,255,0.35)" },
  profileCopy: { flex: 1 },
  profileName: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  profileMeta: { marginTop: 4, color: "#C8DDEE", fontSize: 11 },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.15)" },
  roleText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
  topActions: { flexDirection: "row", justifyContent: "flex-end" },
  panel: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#E1E6EB",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#102F4E", shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  sectionTitleRow: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  sectionTitle: {
    color: "#173A5E",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  field: { marginBottom: 9 },
  label: {
    marginBottom: 6,
    color: "#526271",
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
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#DFEBFA",
  },
  tagText: { color: "#24517D", fontSize: 12, fontWeight: "600" },
  addTag: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9BA7B2",
    borderRadius: 12,
  },
  addTagText: { color: "#566675", fontSize: 12 },
  biography: {
    minHeight: 94,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D5DCE3",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    color: "#526271",
    fontSize: 14,
    lineHeight: 14,
  },
  toggleRow: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECEF",
  },
  toggleCopy: { flex: 1 },
  toggleTitle: {
    color: "#34495C",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  toggleDescription: {
    marginTop: 3,
    color: "#788592",
    fontSize: 12,
    lineHeight: 11,
  },
  switch: {
    transform: [{ scaleX: 0.62 }, { scaleY: 0.62 }],
    marginHorizontal: -8,
  },
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
  logoutButton: { height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: "#D56969", borderRadius: 14, backgroundColor: "#FFF9F9" },
  logoutText: { color: "#B92D2D", fontSize: 14, fontWeight: "700" },
});
