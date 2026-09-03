import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Text from "../InterText";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "../../features/notifications/hooks/useMarkNotificationAsRead";
import LoadingState from "../common/LoadingState";

const iconForType = (type = "") => type.includes("REMINDER") ? "alarm-outline" : type.includes("CREATED") ? "calendar-outline" : type.includes("CONFIRMED") ? "checkmark-circle-outline" : type.includes("REJECTED") || type.includes("CANCELLED") ? "close-circle-outline" : "notifications-outline";

export default function NotificationCenter({ role }) {
  const router = useRouter();
  const { data, isLoading, isRefetching, refetch } = useNotifications();
  const readOne = useMarkNotificationAsRead();
  const readAll = useMarkAllNotificationsAsRead();
  const items = data?.items || [];
  const unreadCount = data?.unreadCount || 0;

  const openItem = (item) => {
    if (!item.isRead) readOne.mutate(item.id);
    if (item.bookingId && role === "student") router.push({ pathname: "/(student)/booking-details/[bookingId]", params: { bookingId: item.bookingId } });
    else if (item.bookingId) router.push("/(lecturer)/bookings");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={8}><Ionicons name="arrow-back" size={21} color="#173A5E" /></Pressable>
        <View style={styles.headingCopy}><Text style={styles.title}>Notifications</Text><Text style={styles.subtitle}>{unreadCount ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}` : "You're all caught up"}</Text></View>
        <Pressable disabled={!unreadCount || readAll.isPending} onPress={() => readAll.mutate()} hitSlop={8}><Text style={[styles.readAll, !unreadCount && styles.disabled]}>Read all</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#003F78" />}>
        {isLoading ? <LoadingState compact title="Loading notifications" message="We’re checking for your latest appointment updates." /> : items.length ? items.map((item) => (
          <Pressable key={item.id} onPress={() => openItem(item)} style={[styles.card, !item.isRead && styles.unreadCard]}>
            <View style={[styles.iconBox, !item.isRead && styles.unreadIcon]}><Ionicons name={iconForType(item.type)} size={21} color="#003F78" /></View>
            <View style={styles.copy}><View style={styles.titleRow}><Text style={styles.itemTitle}>{item.title}</Text>{!item.isRead && <View style={styles.dot} />}</View><Text style={styles.message}>{item.message}</Text><Text style={styles.time}>{formatRelativeTime(item.createdAt)}</Text></View>
            {item.bookingId && <Ionicons name="chevron-forward" size={18} color="#8A98A6" />}
          </Pressable>
        )) : <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name="notifications-off-outline" size={30} color="#52708D" /></View><Text style={styles.emptyTitle}>No notifications yet</Text><Text style={styles.emptyText}>Booking updates and appointment reminders will appear here.</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

function formatRelativeTime(value) {
  const date = new Date(value); const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined });
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
  header: { minHeight: 82, paddingHorizontal: 18, paddingTop: 10, flexDirection: "row", alignItems: "center", gap: 12, borderBottomWidth: 1, borderBottomColor: "#E4E9EE", backgroundColor: "#FFFFFF" },
  backButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 14, backgroundColor: "#F1F5F8" },
  headingCopy: { flex: 1 }, title: { color: "#102F4E", fontSize: 21, fontWeight: "800" }, subtitle: { marginTop: 2, color: "#71808E", fontSize: 11 },
  readAll: { color: "#003F78", fontSize: 12, fontWeight: "700" }, disabled: { opacity: 0.35 },
  content: { padding: 18, paddingBottom: 40, gap: 11 },
  card: { minHeight: 104, padding: 15, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#E1E7ED", borderRadius: 18, backgroundColor: "#FFFFFF" },
  unreadCard: { borderColor: "#C9DEEF", backgroundColor: "#F1F7FC" },
  iconBox: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 14, backgroundColor: "#EEF3F7" }, unreadIcon: { backgroundColor: "#DCEBF6" },
  copy: { flex: 1 }, titleRow: { flexDirection: "row", alignItems: "center", gap: 7 }, itemTitle: { flexShrink: 1, color: "#173A5E", fontSize: 14, fontWeight: "700" }, dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#003F78" },
  message: { marginTop: 4, color: "#5F7080", fontSize: 12, lineHeight: 18 }, time: { marginTop: 7, color: "#8A98A6", fontSize: 10, fontWeight: "600" },
  stateText: { paddingVertical: 50, color: "#71808E", textAlign: "center" },
  empty: { marginTop: 60, padding: 30, alignItems: "center" }, emptyIcon: { width: 68, height: 68, alignItems: "center", justifyContent: "center", borderRadius: 22, backgroundColor: "#E7EFF6" }, emptyTitle: { marginTop: 16, color: "#173A5E", fontSize: 17, fontWeight: "800" }, emptyText: { marginTop: 6, maxWidth: 260, color: "#71808E", fontSize: 13, lineHeight: 19, textAlign: "center" },
});
