import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../../../src/components/InterText";
import { fallbackLecturer, lecturersById } from "../../../src/data/lecturers";
import { useLecturerDetails } from "../../../src/features/lecturers/hooks/useLecturerDetails";
import { formatLecturer } from "../../../src/features/lecturers/utils/lecturerView";
import InitialsAvatar from "../../../src/components/common/InitialsAvatar";
import LoadingState from "../../../src/components/common/LoadingState";

export default function LecturerDetailsScreen() {
  const router = useRouter();
  const { lecturerId } = useLocalSearchParams();
  const resolvedId = typeof lecturerId === "string" ? lecturerId : "";
  const { data, isLoading } = useLecturerDetails(resolvedId);
  if (isLoading) return <LoadingState title="Loading lecturer profile" message="We’re checking their details and availability." />;
  const lecturer = data ? formatLecturer(data, require("../student-img/profile.png")) : lecturersById[resolvedId] || fallbackLecturer;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={21} color="#173A5E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lecturer profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <InitialsAvatar name={lecturer.name} size={92} style={styles.avatar} />
          <Text style={styles.name}>{lecturer.name}</Text>
          <Text style={styles.title}>{lecturer.title}</Text>
          <View style={styles.availableBadge}>
            <View style={styles.dot} />
            <Text style={styles.availableText}>
              Available for physical consultation
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.body}>{lecturer.about}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Consultation location</Text>
          <View style={styles.locationRow}>
            <View style={styles.iconBox}>
              <Ionicons name="location-outline" size={20} color="#003F78" />
            </View>
            <View style={styles.locationCopy}>
              <Text style={styles.locationLabel}>Physical meeting</Text>
              <Text style={styles.body}>{lecturer.office}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: "/(student)/book-appointment/[lecturerId]",
              params: { lecturerId: lecturer.id },
            })
          }
        >
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
          <Text style={styles.primaryText}>Book appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  header: {
    height: 70,
    paddingTop: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E9EF",
  },
  back: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#F1F4F7",
  },
  headerTitle: { color: "#173A5E", fontSize: 17, fontWeight: "700" },
  headerSpacer: { width: 38 },
  content: { padding: 20, paddingBottom: 110, gap: 14 },
  profileCard: {
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E6EC",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  avatar: { width: 92, height: 92, borderRadius: 12 },
  name: { marginTop: 14, color: "#102F4E", fontSize: 22, fontWeight: "800" },
  title: { marginTop: 4, color: "#687887", fontSize: 14 },
  availableBadge: {
    marginTop: 14,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 16,
    backgroundColor: "#E2F7EA",
  },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#198754" },
  availableText: { color: "#137642", fontSize: 11, fontWeight: "700" },
  ratingRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: { color: "#334455", fontSize: 13, fontWeight: "700" },
  reviews: { color: "#7A8490", fontSize: 13 },
  card: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#E0E6EC",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: { color: "#173A5E", fontSize: 17, fontWeight: "700" },
  body: { marginTop: 7, color: "#687887", fontSize: 14, lineHeight: 21 },
  locationRow: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#EAF2F8",
  },
  locationCopy: { flex: 1 },
  locationLabel: { color: "#26384A", fontSize: 14, fontWeight: "600" },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E6EC",
  },
  primaryButton: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    backgroundColor: "#003F78",
  },
  primaryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
