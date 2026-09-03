import { ActivityIndicator, StyleSheet, View } from "react-native";
import Text from "../InterText";

/** Shared initial-loading UI for API-backed screens and sections. */
export default function LoadingState({
  title = "Getting things ready",
  message = "This should only take a moment.",
  compact = false,
  style,
}) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`${title}. ${message}`}
      style={[styles.container, compact && styles.compact, style]}
    >
      <View style={styles.loaderShell}>
        <View style={styles.loaderGlow} />
        <ActivityIndicator size="large" color="#003F78" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotStrong]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 360,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8FB",
  },
  compact: {
    flex: 0,
    minHeight: 220,
    borderRadius: 18,
    backgroundColor: "transparent",
  },
  loaderShell: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D8E6F1",
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    shadowColor: "#173A5E",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 4,
  },
  loaderGlow: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF3FA",
  },
  title: {
    marginTop: 20,
    color: "#173A5E",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  message: {
    maxWidth: 280,
    marginTop: 6,
    color: "#71808E",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  dots: { marginTop: 17, flexDirection: "row", gap: 6 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#BDD0DF" },
  dotStrong: { width: 16, backgroundColor: "#315D86" },
});
