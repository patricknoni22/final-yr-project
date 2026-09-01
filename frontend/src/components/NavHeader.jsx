import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import Text from "./InterText";
import InitialsAvatar from "./common/InitialsAvatar";
import { useMyProfile } from "../features/profile/hooks/useProfile";
import { useUnreadNotificationCount } from "../features/notifications/hooks/useNotifications";

const NavHeader = ({
  actionIcon = "notifications-outline",
}) => {
  const { data: profile } = useMyProfile();
  const { data: unreadData } = useUnreadNotificationCount();
  const router = useRouter();
  const pathname = usePathname();
  const unreadCount = unreadData?.unreadCount || 0;
  const isNotificationAction = actionIcon.includes("notification");
  const isLecturer = profile?.role === "LECTURER" || pathname.includes("lecturer");
  const handleAction = () => router.push(isNotificationAction ? (isLecturer ? "/(lecturer)/notifications" : "/(student)/notifications") : "/(student)/search");
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Ionicons name="school-outline" size={19} color="#003F78" />
        <Text style={styles.brandText}>SmartMeet</Text>
      </View>
      <View style={styles.headerActions}>
        <Pressable style={styles.iconButton} hitSlop={8} onPress={handleAction} accessibilityRole="button" accessibilityLabel={isNotificationAction ? `${unreadCount} unread notifications` : "Search"}>
          <Ionicons name={actionIcon} size={20} color="#38516C" />
          {isNotificationAction && unreadCount > 0 && <View style={styles.notificationBadge}><Text style={styles.notificationCount}>{unreadCount > 9 ? "9+" : unreadCount}</Text></View>}
        </Pressable>
        <InitialsAvatar name={profile?.username || "User"} size={28} style={styles.avatarSmall} />
      </View>
    </View>
  );
};

export default NavHeader;
const styles = StyleSheet.create({
  header: {
    minHeight: 68,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E9EF",
    paddingTop: 10,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandText: { color: "#003F78", fontSize: 17, fontWeight: "800", letterSpacing: -0.3 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconButton: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderRadius: 19, backgroundColor: "#F3F6F9" },
  notificationBadge: { position: "absolute", right: -3, top: -4, minWidth: 18, height: 18, paddingHorizontal: 4, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: "#B42318", borderWidth: 2, borderColor: "#FFFFFF" },
  notificationCount: { color: "#FFFFFF", fontSize: 9, lineHeight: 11, fontWeight: "800" },
  avatarSmall: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: "#DDEAF4" },
  greeting: {
    marginTop: 28,
    marginHorizontal: 22,
    color: "#001E40",
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
  },
});
