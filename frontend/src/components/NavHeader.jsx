import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Text from "./InterText";
import InitialsAvatar from "./common/InitialsAvatar";
import { useMyProfile } from "../features/profile/hooks/useProfile";

const NavHeader = ({
  actionIcon = "notifications-outline",
}) => {
  const { data: profile } = useMyProfile();
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Ionicons name="school-outline" size={19} color="#003F78" />
        <Text style={styles.brandText}>SmartMeet</Text>
      </View>
      <View style={styles.headerActions}>
        <Ionicons name={actionIcon} size={18} color="#38516C" />
        <InitialsAvatar name={profile?.username || "User"} size={28} style={styles.avatarSmall} />
      </View>
    </View>
  );
};

export default NavHeader;
const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E9EF",
    paddingTop: 10,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandText: { color: "#003F78", fontSize: 16, fontWeight: "800" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 15 },
  avatarSmall: { width: 28, height: 28, borderRadius: 14 },
  greeting: {
    marginTop: 28,
    marginHorizontal: 22,
    color: "#001E40",
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
  },
});
