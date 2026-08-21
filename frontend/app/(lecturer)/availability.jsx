import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  AvailabilityDayCard,
  DurationPicker,
} from "../../src/components/availability/AvailabilityControls";
import Text from "../../src/components/InterText";
import NavHeader from "../../src/components/NavHeader";
import { useAvailability } from "../../src/features/availability/hooks/useAvailability";
import { useUpdateAvailability } from "../../src/features/availability/hooks/useUpdateAvailability";

const durationOptions = [15, 30, 45, 60];
const initialDays = [
  { name: "Monday", enabled: true, start: "09:00 AM", end: "01:30 PM" },
  { name: "Tuesday", enabled: true, start: "09:00 AM", end: "02:30 PM" },
  { name: "Wednesday", enabled: true, start: "09:00 AM", end: "01:30 PM" },
  { name: "Thursday", enabled: false, start: "09:00 AM", end: "01:30 PM" },
  { name: "Friday", enabled: true, start: "10:00 AM", end: "02:00 PM" },
];

export default function AvailabilityScreen() {
  const [duration, setDuration] = useState(30);
  const [days, setDays] = useState(initialDays);
  const { data } = useAvailability();
  const updateMutation = useUpdateAvailability({
    onSuccess: () => Alert.alert("Saved", "Your availability has been updated."),
    onError: (error) => Alert.alert("Could not save", error.response?.data?.message || error.message),
  });

  useEffect(() => {
    if (!data) return;
    setDuration(data.duration || 30);
    setDays((current) => current.map((day, index) => {
      const slot = data.availability?.find((item) => item.dayOfWeek === index + 1);
      return slot ? { ...day, enabled: true, start: to12Hour(slot.startTime), end: to12Hour(slot.endTime) } : { ...day, enabled: false };
    }));
  }, [data]);

  const updateDay = (index, changes) => {
    setDays((current) =>
      current.map((day, dayIndex) =>
        dayIndex === index ? { ...day, ...changes } : day,
      ),
    );
  };

  const save = () => updateMutation.mutate({
    duration,
    availability: days.flatMap((day, index) => day.enabled ? [{ dayOfWeek: index + 1, startTime: to24Hour(day.start), endTime: to24Hour(day.end) }] : []),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Availability</Text>
        <Text style={styles.subtitle}>
          Set when students can book consultations with you.
        </Text>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Appointment duration</Text>
              <Text style={styles.sectionDescription}>
                Default length for each consultation
              </Text>
            </View>
            <Text style={styles.durationBadge}>{duration} min</Text>
          </View>
          <View style={styles.durationPicker}>
            <DurationPicker
              options={durationOptions}
              value={duration}
              onChange={setDuration}
            />
          </View>
        </View>

        <View style={styles.hoursHeading}>
          <View>
            <Text style={styles.sectionTitle}>Weekly hours</Text>
            <Text style={styles.sectionDescription}>
              Enable the days you accept appointments
            </Text>
          </View>
          <Text style={styles.activeDays}>
            {days.filter((day) => day.enabled).length} active
          </Text>
        </View>
        <View style={styles.days}>
          {days.map((day, index) => (
            <AvailabilityDayCard
              key={day.name}
              day={day}
              onToggle={(enabled) => updateDay(index, { enabled })}
              onChangeTime={(field, value) =>
                updateDay(index, { [field]: value })
              }
            />
          ))}
        </View>

        <Pressable style={[styles.saveButton, updateMutation.isPending && { opacity: 0.65 }]} onPress={save} disabled={updateMutation.isPending}>
          <Ionicons name="save-outline" size={18} color="#FFFFFF" />
          <Text style={styles.saveText}>{updateMutation.isPending ? "Saving..." : "Save availability"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function to24Hour(value) {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);
  if (!match) return value;
  let hour = Number(match[1]);
  const period = match[3]?.toUpperCase();
  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

function to12Hour(value) {
  const match = String(value).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return value;
  const hour = Number(match[1]);
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, "0")}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  content: { padding: 20, paddingBottom: 40 },
  eyebrow: {
    color: "#52708D",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    marginTop: 3,
    color: "#102F4E",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  subtitle: { marginTop: 5, color: "#687887", fontSize: 14, lineHeight: 20 },
  infoBanner: {
    marginTop: 20,
    padding: 14,
    flexDirection: "row",
    gap: 11,
    borderWidth: 1,
    borderColor: "#CEE8DB",
    borderRadius: 12,
    backgroundColor: "#EEF9F3",
  },
  infoIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "#DDF2E7",
  },
  infoCopy: { flex: 1 },
  infoTitle: {
    color: "#185D40",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },
  infoText: { marginTop: 3, color: "#4F7564", fontSize: 12, lineHeight: 18 },
  sectionCard: {
    marginTop: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E6EC",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  sectionTitle: {
    color: "#173A5E",
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "700",
  },
  sectionDescription: {
    marginTop: 2,
    color: "#71808E",
    fontSize: 12,
    lineHeight: 17,
  },
  durationBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: "hidden",
    borderRadius: 999,
    color: "#003F78",
    backgroundColor: "#E6F0F9",
    fontSize: 11,
    fontWeight: "700",
  },
  durationPicker: { marginTop: 15 },
  hoursHeading: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeDays: { color: "#1D7A4D", fontSize: 12, fontWeight: "700" },
  days: { gap: 11 },
  saveButton: {
    minHeight: 50,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#003F78",
  },
  saveText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
