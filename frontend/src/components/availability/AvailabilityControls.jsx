import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import Text from "../InterText";
import AppModal from "../common/AppModal";

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
  const [open, setOpen] = useState(false);
  const parsed = parseTime(value);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState(parsed.period);

  const showPicker = () => {
    const current = parseTime(value);
    setHour(current.hour);
    setMinute(current.minute);
    setPeriod(current.period);
    setOpen(true);
  };

  const apply = () => {
    onChangeText(`${String(hour).padStart(2, "0")}:${minute} ${period}`);
    setOpen(false);
  };

  return (
    <View style={styles.timeField}>
      <Text style={styles.timeLabel}>{label}</Text>
      <Pressable style={styles.inputShell} onPress={showPicker} accessibilityRole="button" accessibilityLabel={`Select ${label.toLowerCase()} time`}>
        <Ionicons name="time-outline" size={16} color="#52708D" />
        <Text style={styles.input}>{value}</Text>
        <Ionicons name="chevron-down" size={14} color="#8794A0" />
      </Pressable>
      <AppModal visible={open} title={`Select ${label.toLowerCase()} time`} onClose={() => setOpen(false)}>
        <Text style={styles.pickerLabel}>HOUR</Text>
        <View style={styles.pickerGrid}>{Array.from({ length: 12 }, (_, index) => index + 1).map((item) => <TimeOption key={item} label={String(item)} selected={hour === item} onPress={() => setHour(item)} />)}</View>
        <Text style={styles.pickerLabel}>MINUTE</Text>
        <View style={styles.pickerRow}>{["00", "15", "30", "45"].map((item) => <TimeOption key={item} label={item} selected={minute === item} onPress={() => setMinute(item)} />)}</View>
        <Text style={styles.pickerLabel}>PERIOD</Text>
        <View style={styles.pickerRow}>{["AM", "PM"].map((item) => <TimeOption key={item} label={item} selected={period === item} onPress={() => setPeriod(item)} />)}</View>
        <Pressable style={styles.doneButton} onPress={apply}><Text style={styles.doneText}>Set time</Text></Pressable>
      </AppModal>
    </View>
  );
}

function TimeOption({ label, selected, onPress }) {
  return <Pressable style={[styles.timeOption, selected && styles.timeOptionActive]} onPress={onPress}><Text style={[styles.timeOptionText, selected && styles.timeOptionTextActive]}>{label}</Text></Pressable>;
}

function parseTime(value) {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  return match ? { hour: Number(match[1]), minute: match[2], period: match[3].toUpperCase() } : { hour: 9, minute: "00", period: "AM" };
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
  input: { flex: 1, color: "#263F57", fontSize: 13, fontWeight: "600" },
  pickerLabel: { marginTop: 12, marginBottom: 8, color: "#667584", fontSize: 11, fontWeight: "700" },
  pickerGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  pickerRow: { flexDirection: "row", gap: 8 },
  timeOption: { minWidth: 48, height: 38, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#D5DCE4", borderRadius: 8, backgroundColor: "#FFFFFF" },
  timeOptionActive: { borderColor: "#003F78", backgroundColor: "#E8F1F8" },
  timeOptionText: { color: "#526577", fontSize: 13, fontWeight: "600" },
  timeOptionTextActive: { color: "#003F78", fontWeight: "700" },
  doneButton: { height: 46, marginTop: 22, alignItems: "center", justifyContent: "center", borderRadius: 8, backgroundColor: "#003F78" },
  doneText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
