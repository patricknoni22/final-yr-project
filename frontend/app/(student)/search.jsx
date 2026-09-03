import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useLecturers } from "../../src/features/lecturers/hooks/useLecturers";
import { useDepartments } from "../../src/features/departments/hooks/useDepartments";
import InitialsAvatar from "../../src/components/common/InitialsAvatar";
import { formatLecturerName } from "../../src/features/lecturers/utils/lecturerView";
import LoadingState from "../../src/components/common/LoadingState";

const lecturers = [
  {
    id: "james",
    name: "Prof. James Wilson",
    department: "Computer Science",
    availability: "AVAILABLE TODAY",
    next: "Next: 2:00 PM - 2:30 PM",
    image: require("./student-img/prof1.png"),
  },
  {
    id: "elena",
    name: "Dr. Elena Rodriguez",
    department: "Engineering",
    availability: "AVAILABLE TOMORROW",
    next: "Next: Tomorrow 10:00 AM - 10:30 AM",
    image: require("./student-img/prof2.png"),
  },
  {
    id: "sarah",
    name: "Prof. Sarah Chen",
    department: "Arts & Design",
    availability: "AVAILABLE TODAY",
    next: "Next: 3:30 PM - 4:00 PM",
    image: require("./student-img/prof3.png"),
  },
];

const departments = ["All", "Computer Science", "Engineering"];

export default function SearchScreen() {
  const router = useRouter();
  const [department, setDepartment] = useState("All");
  const [availableToday, setAvailableToday] = useState(false);
  const [search, setSearch] = useState("");
  const { data: lecturerData, isLoading: lecturersLoading } = useLecturers({ search: search || undefined, department: department === "All" ? undefined : department });
  const { data: departmentData, isLoading: departmentsLoading } = useDepartments();
  if (lecturersLoading || departmentsLoading) return <LoadingState title="Finding lecturers" message="We’re loading departments and current availability." />;
  const apiDepartments = ["All", ...(departmentData || []).map((item) => item.name)];
  const today = new Date().getDay();
  const apiLecturers = (lecturerData || []).filter((item) => !availableToday || item.service?.some((service) => service.availability?.some((slot) => slot.dayOfWeek === today))).map((item) => {
    const available = item.service?.some((service) => service.availability?.some((slot) => slot.dayOfWeek === today));
    return { id: item.id, name: formatLecturerName(item.username, item.title), department: item.department || "Department not set", availability: available ? "AVAILABLE TODAY" : "VIEW AVAILABILITY", next: available ? "Available today" : "Check available days", image: item.imageUrl ? { uri: item.imageUrl } : require("./student-img/profile.png") };
  });
  const visibleLecturers = lecturerData ? apiLecturers : lecturers;
  const visibleDepartments = departmentData ? apiDepartments : departments;

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageEyebrow}>FIND YOUR LECTURER</Text>
        <Text style={styles.pageTitle}>Who would you like to meet?</Text>
        <Text style={styles.pageSubtitle}>Search by lecturer, department, or subject area.</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#718096" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or subject..."
            placeholderTextColor="#7A8491"
            returnKeyType="search"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Departments</Text>
          <TouchableOpacity onPress={() => setDepartment("All")}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {visibleDepartments.map((item) => {
            const selected = department === item;

            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, selected && styles.selectedChip]}
                onPress={() => setDepartment(item)}
              >
                <Text style={[styles.chipText, selected && styles.selectedChipText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.availabilityRow}>
          <Switch
            value={availableToday}
            onValueChange={setAvailableToday}
            trackColor={{ false: "#E4E8ED", true: "#8FC3AF" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E4E8ED"
            style={styles.switch}
          />
          <Text style={styles.availabilityText}>Available Today Only</Text>
        </View>

        <View style={styles.cards}>
          {visibleLecturers.map((lecturer) => (
            <View key={lecturer.id} style={styles.card}>
              <View style={styles.cardTop}>
                <InitialsAvatar name={lecturer.name} size={62} style={styles.avatar} />

                <View style={styles.lecturerInfo}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{lecturer.availability}</Text>
                  </View>
                  <Text style={styles.name}>{lecturer.name}</Text>
                  <Text style={styles.department}>{lecturer.department}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={13} color="#7D8793" />
                  <Text style={styles.metaText}>{lecturer.next}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.profileButton}
                activeOpacity={0.85}
                onPress={() => router.push({ pathname: "/(student)/lecturer-details/[lecturerId]", params: { lecturerId: lecturer.id } })}
              >
                <Text style={styles.profileButtonText}>View Profile</Text>
                <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EBEF",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  brandText: {
    color: "#003F78",
    fontSize: 16,
    fontWeight: "800",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 36,
  },
  pageEyebrow: { color: "#52708D", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  pageTitle: { marginTop: 5, color: "#102F4E", fontSize: 26, lineHeight: 32, fontWeight: "800", letterSpacing: -0.5 },
  pageSubtitle: { marginTop: 5, marginBottom: 18, color: "#687887", fontSize: 13, lineHeight: 19 },
  searchBox: {
    height: 52,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderWidth: 1,
    borderColor: "#C9D0D8",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    color: "#172B3F",
    fontSize: 13,
  },
  sectionHeader: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#26384A",
    fontSize: 13,
    fontWeight: "600",
  },
  clearText: {
    color: "#003F78",
    fontSize: 13,
    fontWeight: "500",
  },
  chips: {
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
  },
  chip: {
    minHeight: 32,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#F0F2F4",
  },
  selectedChip: {
    backgroundColor: "#003F78",
  },
  chipText: {
    color: "#344454",
    fontSize: 13,
    fontWeight: "500",
  },
  selectedChipText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  availabilityRow: {
    marginTop: 7,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    marginHorizontal: -8,
  },
  availabilityText: {
    color: "#52606D",
    fontSize: 13,
  },
  cards: {
    gap: 14,
  },
  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#D3DAE2",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0B2740",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 14,
    resizeMode: "cover",
  },
  lecturerInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  badge: {
    marginBottom: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "#B9F2CE",
  },
  badgeText: {
    color: "#137642",
    fontSize: 10,
    fontWeight: "800",
  },
  name: {
    color: "#192C3E",
    fontSize: 14,
    fontWeight: "500",
  },
  department: {
    marginTop: 3,
    color: "#5F6C79",
    fontSize: 13,
  },
  metaRow: {
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  rating: {
    color: "#334455",
    fontSize: 12,
    fontWeight: "600",
  },
  metaText: {
    color: "#7A8490",
    fontSize: 12,
  },
  profileButton: {
    height: 36,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 5,
    backgroundColor: "#003F78",
  },
  profileButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
