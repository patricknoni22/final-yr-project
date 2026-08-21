import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Text from "../InterText";

export default function AppModal({ visible, title, children, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable style={styles.close} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close">
              <Ionicons name="close" size={20} color="#526577" />
            </Pressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(9, 28, 46, 0.48)" },
  card: { width: "100%", maxWidth: 420, padding: 20, borderRadius: 14, backgroundColor: "#FFFFFF" },
  header: { marginBottom: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#173A5E", fontSize: 19, fontWeight: "700" },
  close: { width: 34, height: 34, alignItems: "center", justifyContent: "center", borderRadius: 17, backgroundColor: "#F1F4F7" },
});
