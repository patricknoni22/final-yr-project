import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
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
import { useLogout } from "../../src/features/auth/hooks/useAuth";

function SectionTitle({ icon, children }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Ionicons name={icon} size={17} color="#173A5E" />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput defaultValue={value} style={styles.input} />
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
  const logoutMutation = useLogout({ onSettled: () => router.replace("/sign-in") });

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => logoutMutation.mutate() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader avatarSource={require("./lect-img/lec.png")} />

      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.panel}>
          <SectionTitle icon="person-outline">Profile Information</SectionTitle>
          <Field label="Full Name" value="Dr. Sarah Mitchell" />
          <Field label="Academic Title" value="Senior Lecturer" />
          <Field label="Department" value="History" />
          <Field label="Office Location" value="Room A-12" />
        </View>

        <View style={styles.panel}>
          <SectionTitle icon="school-outline">Academic Focus</SectionTitle>
          <View style={styles.tags}>
            {["Medieval History", "European Studies", "Cultural History"].map(
              (tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ),
            )}
            <TouchableOpacity style={styles.addTag}>
              <Ionicons name="add" size={11} color="#566675" />
              <Text style={styles.addTagText}>Add focus</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.panel}>
          <SectionTitle icon="document-text-outline">Biography</SectionTitle>
          <TextInput
            defaultValue="Dr. Mitchell specializes in medieval European history and cultural studies. She is passionate about helping students connect historical ideas to the modern world."
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
          <TouchableOpacity style={styles.deactivateButton}>
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
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
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
  page: { padding: 14, paddingBottom: 28, gap: 12 },
  panel: {
    padding: 13,
    borderWidth: 1,
    borderColor: "#E1E6EB",
    borderRadius: 7,
    backgroundColor: "#FAFBFC",
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
  logoutButton: { height: 46, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: "#D56969", borderRadius: 7 },
  logoutText: { color: "#B92D2D", fontSize: 14, fontWeight: "700" },
});
