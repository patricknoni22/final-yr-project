import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../InterText";

export default function BookingFilterTabs({ filters, activeFilter, onChange }) {
  return (
    <View style={styles.filters}>
      {filters.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => onChange(filter)}
          style={[styles.filter, activeFilter === filter && styles.activeFilter]}
        >
          <Text style={[styles.text, activeFilter === filter && styles.activeText]}>
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function BookingEmptyState({ title, message }) {
  return <View style={styles.empty}><Ionicons name="calendar-outline" size={28} color="#7790A8" /><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyText}>{message}</Text></View>;
}

const styles = StyleSheet.create({
  filters: { padding: 4, flexDirection: "row", borderRadius: 10, backgroundColor: "#E8EDF3" },
  filter: { flex: 1, minHeight: 38, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  activeFilter: { backgroundColor: "#FFFFFF", shadowColor: "#16324D", shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  text: { color: "#667584", fontSize: 13, fontWeight: "600" },
  activeText: { color: "#003F78", fontWeight: "700" },
  empty: { padding: 34, alignItems: "center", borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 14, backgroundColor: "#FFFFFF" },
  emptyTitle: { marginTop: 10, color: "#173A5E", fontSize: 16, fontWeight: "700" },
  emptyText: { marginTop: 5, color: "#71808E", fontSize: 13, lineHeight: 19, textAlign: "center" },
});
