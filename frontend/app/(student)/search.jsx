import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import Text, { InterTextInput as TextInput } from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";

const lecturers = [
  {
    id: "james",
    name: "Prof. James Wilson",
    department: "Computer Science",
    availability: "AVAILABLE TODAY",
    rating: "4.8",
    reviews: "128 reviews",
    next: "Next: 2:00 PM",
    image: require("./student-img/prof1.png"),
  },
  {
    id: "elena",
    name: "Dr. Elena Rodriguez",
    department: "Engineering",
    availability: "AVAILABLE TOMORROW",
    rating: "4.8",
    reviews: "96 reviews",
    next: "Next: Tomorrow 10:00 AM",
    image: require("./student-img/prof2.png"),
  },
  {
    id: "sarah",
    name: "Prof. Sarah Chen",
    department: "Arts & Design",
    availability: "AVAILABLE TODAY",
    rating: "5.0",
    reviews: "120 reviews",
    next: "Next: 3:30 PM",
    image: require("./student-img/prof3.png"),
  },
];

const departments = ["All", "Computer Science", "Engineering"];

export default function SearchScreen() {
  const router = useRouter();
  const [department, setDepartment] = useState("All");
  const [availableToday, setAvailableToday] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#718096" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or subject..."
            placeholderTextColor="#7A8491"
            returnKeyType="search"
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
          {departments.map((item) => {
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
          {lecturers.map((lecturer) => (
            <View key={lecturer.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Image source={lecturer.image} style={styles.avatar} />

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
                  <Ionicons name="star" size={13} color="#F4B400" />
                  <Text style={styles.rating}>{lecturer.rating}</Text>
                  <Text style={styles.metaText}>({lecturer.reviews})</Text>
                </View>
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
    backgroundColor: "#FFFFFF",
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
    paddingTop: 14,
    paddingBottom: 24,
  },
  searchBox: {
    height: 44,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderWidth: 1,
    borderColor: "#C9D0D8",
    borderRadius: 6,
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
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0B2740",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 5,
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
