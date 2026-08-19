import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../InterText";

export function DurationPicker({ options, value, onChange }) {
  return (
    <View style={styles.durationGrid}>
      {options.map((minutes) => (
        <Pressable
          key={minutes}
          onPress={() => onChange(minutes)}
          style={[styles.durationOption, value === minutes && styles.activeDuration]}
        >
          <Text style={[styles.durationValue, value === minutes && styles.activeDurationText]}>{minutes}</Text>
          <Text style={[styles.durationUnit, value === minutes && styles.activeDurationText]}>min</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function AvailabilityDayCard({ day, onToggle, onChangeTime }) {
  return (
    <View style={[styles.dayCard, !day.enabled && styles.disabledCard]}>
      <View style={styles.dayHeader}>
        <View style={styles.dayIdentity}>
          <View style={[styles.dayIcon, day.enabled && styles.activeDayIcon]}>
            <Ionicons name="calendar-outline" size={17} color={day.enabled ? "#003F78" : "#8794A0"} />
          </View>
          <View>
            <Text style={styles.dayName}>{day.name}</Text>
            <Text style={styles.dayStatus}>{day.enabled ? "Available" : "Unavailable"}</Text>
          </View>
        </View>
        <Switch
          value={day.enabled}
          onValueChange={onToggle}
          trackColor={{ false: "#D6DCE2", true: "#86B5A2" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {day.enabled && (
        <View style={styles.timeRow}>
          <TimeField label="Starts" value={day.start} onChangeText={(value) => onChangeTime("start", value)} />
          <Ionicons name="arrow-forward" size={17} color="#8794A0" />
          <TimeField label="Ends" value={day.end} onChangeText={(value) => onChangeTime("end", value)} />
        </View>
      )}
    </View>
  );
}

function TimeField({ label, value, onChangeText }) {
  return (
    <View style={styles.timeField}>
      <Text style={styles.timeLabel}>{label}</Text>
      <View style={styles.inputShell}>
        <Ionicons name="time-outline" size={16} color="#52708D" />
        <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  durationGrid: { flexDirection: "row", gap: 8 },
  durationOption: { flex: 1, minHeight: 58, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#DCE3E9", borderRadius: 10, backgroundColor: "#F8FAFC" },
  activeDuration: { borderColor: "#003F78", backgroundColor: "#E8F1F8" },
  durationValue: { color: "#31475C", fontSize: 17, lineHeight: 21, fontWeight: "800" },
  durationUnit: { marginTop: 1, color: "#7A8794", fontSize: 10, fontWeight: "600" },
  activeDurationText: { color: "#003F78" },
  dayCard: { padding: 15, borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 12, backgroundColor: "#FFFFFF" },
  disabledCard: { backgroundColor: "#F7F8FA" },
  dayHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dayIdentity: { flexDirection: "row", alignItems: "center", gap: 10 },
  dayIcon: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: "#E9EDF1" },
  activeDayIcon: { backgroundColor: "#E5EFF8" },
  dayName: { color: "#263F57", fontSize: 15, lineHeight: 20, fontWeight: "700" },
  dayStatus: { marginTop: 1, color: "#7A8794", fontSize: 11, lineHeight: 15 },
  timeRow: { marginTop: 14, paddingTop: 14, flexDirection: "row", alignItems: "flex-end", gap: 9, borderTopWidth: 1, borderTopColor: "#EDF0F3" },
  timeField: { flex: 1 },
  timeLabel: { marginBottom: 5, color: "#667584", fontSize: 11, fontWeight: "600" },
  inputShell: { height: 42, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 7, borderWidth: 1, borderColor: "#CBD4DC", borderRadius: 8, backgroundColor: "#FFFFFF" },
  input: { flex: 1, height: "100%", paddingVertical: 0, color: "#263F57", fontSize: 13, fontWeight: "600" },
});
