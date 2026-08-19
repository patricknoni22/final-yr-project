import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../InterText";

const tones = {
  Approved: { background: "#E8F7EF", text: "#1D7A4D", icon: "checkmark-circle" },
  Pending: { background: "#FFF5DB", text: "#9A6700", icon: "time" },
  Completed: { background: "#EAF0F7", text: "#526577", icon: "checkmark-done-circle" },
};

export default function BookingCard({ booking, role = "student", onPress }) {
  const tone = tones[booking.status] || tones.Pending;
  const isLecturer = role === "lecturer";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={booking.image} style={styles.avatar} />
        <View style={styles.personCopy}>
          <Text style={styles.name}>{booking.name}</Text>
          <Text style={styles.secondary}>{booking.topic || booking.department}</Text>
        </View>
        <View style={[styles.status, { backgroundColor: tone.background }]}>
          {!isLecturer && <Ionicons name={tone.icon} size={13} color={tone.text} />}
          <Text style={[styles.statusText, { color: tone.text }]}>{booking.status}</Text>
        </View>
      </View>

      {isLecturer ? (
        <View style={styles.metaBox}>
          <Meta icon="calendar-outline" text={booking.date} />
          <Meta icon="time-outline" text={booking.time} />
          <Meta icon="location-outline" text={booking.location} />
        </View>
      ) : (
        <>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Detail icon="calendar-outline" label="Date" value={booking.date} />
            <Detail icon="time-outline" label="Time" value={booking.time} />
          </View>
          <Detail icon="location-outline" label="Location" value={booking.location} horizontal />
        </>
      )}

      {isLecturer && booking.status === "Pending" ? (
        <View style={styles.actions}>
          <ActionButton label="Decline" icon="close" secondary />
          <ActionButton label="Approve" icon="checkmark" />
        </View>
      ) : (
        <Pressable style={[styles.fullButton, isLecturer && styles.lightButton]} onPress={onPress}>
          <Text style={[styles.fullButtonText, isLecturer && styles.lightButtonText]}>View booking details</Text>
          <Ionicons name="arrow-forward" size={16} color={isLecturer ? "#003F78" : "#FFFFFF"} />
        </Pressable>
      )}
    </View>
  );
}

function Detail({ icon, label, value, horizontal }) {
  return (
    <View style={[styles.detail, horizontal && styles.horizontalDetail]}>
      <View style={styles.detailIcon}><Ionicons name={icon} size={16} color="#315D86" /></View>
      <View><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>
    </View>
  );
}

function Meta({ icon, text }) {
  return <View style={styles.meta}><Ionicons name={icon} size={16} color="#52708D" /><Text style={styles.metaText}>{text}</Text></View>;
}

function ActionButton({ label, icon, secondary }) {
  return (
    <Pressable style={[styles.actionButton, secondary && styles.secondaryButton]}>
      <Ionicons name={icon} size={17} color={secondary ? "#526577" : "#FFFFFF"} />
      <Text style={[styles.actionText, secondary && styles.secondaryText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderColor: "#E0E6EC", borderRadius: 14, backgroundColor: "#FFFFFF", shadowColor: "#173A5E", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  header: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#E8EDF3" },
  personCopy: { flex: 1, marginLeft: 12 },
  name: { color: "#173A5E", fontSize: 16, lineHeight: 22, fontWeight: "700" },
  secondary: { marginTop: 2, color: "#71808E", fontSize: 12, lineHeight: 18 },
  status: { paddingHorizontal: 8, paddingVertical: 5, flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 999 },
  statusText: { fontSize: 11, fontWeight: "700" },
  divider: { height: 1, marginVertical: 14, backgroundColor: "#EDF0F3" },
  detailRow: { flexDirection: "row", gap: 12 },
  detail: { flex: 1, flexDirection: "row", alignItems: "center", gap: 9 },
  horizontalDetail: { marginTop: 14 },
  detailIcon: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 8, backgroundColor: "#EDF4FA" },
  detailLabel: { color: "#84909C", fontSize: 11, lineHeight: 15 },
  detailValue: { marginTop: 1, color: "#31475C", fontSize: 13, lineHeight: 18, fontWeight: "600" },
  metaBox: { marginTop: 15, padding: 12, gap: 10, borderRadius: 10, backgroundColor: "#F5F8FA" },
  meta: { flexDirection: "row", alignItems: "center", gap: 9 },
  metaText: { color: "#40566B", fontSize: 13, lineHeight: 18, fontWeight: "500" },
  actions: { marginTop: 14, flexDirection: "row", gap: 10 },
  actionButton: { flex: 1, minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 9, backgroundColor: "#003F78" },
  secondaryButton: { borderWidth: 1, borderColor: "#CBD4DC", backgroundColor: "#FFFFFF" },
  actionText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  secondaryText: { color: "#526577" },
  fullButton: { minHeight: 44, marginTop: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 9, backgroundColor: "#003F78" },
  fullButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  lightButton: { marginTop: 14, backgroundColor: "#EAF1F7" },
  lightButtonText: { color: "#003F78" },
});
