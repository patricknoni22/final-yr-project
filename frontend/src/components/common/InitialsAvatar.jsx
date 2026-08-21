import { StyleSheet, View } from "react-native";
import Text from "../InterText";

const honorifics = new Set(["dr", "prof", "professor", "mr", "mrs", "ms", "miss"]);

export function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean).filter((part) => !honorifics.has(part.replace(/\./g, "").toLowerCase()));
  if (!parts.length) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts.at(-1)[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function InitialsAvatar({ name, size = 48, style }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }, style]} accessibilityLabel={`${name || "User"} avatar`}>
      <Text style={[styles.text, { fontSize: Math.max(11, Math.round(size * 0.34)) }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: "center", justifyContent: "center", backgroundColor: "#DCEAF6" },
  text: { color: "#003F78", fontWeight: "700" },
});
