import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../../../src/components/InterText";
import { useBookingDetails } from "../../../src/features/bookings/hooks/useBookingDetails";
import { formatBooking } from "../../../src/features/bookings/utils/bookingView";
import LoadingState from "../../../src/components/common/LoadingState";

export default function BookingDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const bookingId = typeof params.bookingId === "string" ? params.bookingId : "";
  const { data, isLoading } = useBookingDetails(bookingId);
  if (isLoading) return <LoadingState title="Loading booking details" message="We’re retrieving the latest appointment information." />;
  const booking = data ? formatBooking(data, "student") : params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}><Ionicons name="arrow-back" size={21} color="#173A5E" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Booking details</Text><View style={styles.spacer} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.status}><Ionicons name="time-outline" size={15} color="#9A6700" /><Text style={styles.statusText}>{booking.status || "Pending"}</Text></View>
          <Text style={styles.name}>{booking.name || "Lecturer"}</Text>
          <Text style={styles.department}>{booking.department}</Text>
          <View style={styles.divider} />
          <Detail icon="calendar-outline" label="Date" value={booking.date} />
          <Detail icon="time-outline" label="Time" value={booking.time} />
          <Detail icon="location-outline" label="Physical location" value={booking.location} />
        </View>
        <View style={styles.notice}><Ionicons name="information-circle-outline" size={21} color="#003F78" /><Text style={styles.noticeText}>This appointment will take place physically at the location shown above.</Text></View>
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/(student)/bookings")}><Text style={styles.buttonText}>Back to bookings</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Detail({ icon, label, value }) {
  return <View style={styles.detail}><View style={styles.icon}><Ionicons name={icon} size={19} color="#315D86" /></View><View><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value || "Not available"}</Text></View></View>;
}

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:"#F6F8FB"},header:{height:70,paddingTop:8,paddingHorizontal:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between",backgroundColor:"#FFF",borderBottomWidth:1,borderBottomColor:"#E7E9EF"},back:{width:38,height:38,alignItems:"center",justifyContent:"center",borderRadius:19,backgroundColor:"#F1F4F7"},headerTitle:{color:"#173A5E",fontSize:17,fontWeight:"700"},spacer:{width:38},content:{padding:20},card:{padding:20,borderWidth:1,borderColor:"#E0E6EC",borderRadius:14,backgroundColor:"#FFF"},status:{alignSelf:"flex-start",paddingHorizontal:9,paddingVertical:6,flexDirection:"row",alignItems:"center",gap:5,borderRadius:20,backgroundColor:"#FFF5DB"},statusText:{color:"#9A6700",fontSize:12,fontWeight:"700"},name:{marginTop:18,color:"#102F4E",fontSize:22,fontWeight:"800"},department:{marginTop:4,color:"#687887",fontSize:14},divider:{height:1,marginVertical:18,backgroundColor:"#EDF0F3"},detail:{marginBottom:16,flexDirection:"row",alignItems:"center",gap:12},icon:{width:40,height:40,alignItems:"center",justifyContent:"center",borderRadius:10,backgroundColor:"#EDF4FA"},label:{color:"#84909C",fontSize:11},value:{marginTop:2,color:"#31475C",fontSize:14,fontWeight:"600"},notice:{marginTop:15,padding:14,flexDirection:"row",gap:10,borderRadius:10,backgroundColor:"#EAF2F8"},noticeText:{flex:1,color:"#52708D",fontSize:12,lineHeight:18},button:{height:50,marginTop:20,alignItems:"center",justifyContent:"center",borderRadius:8,backgroundColor:"#003F78"},buttonText:{color:"#FFF",fontSize:15,fontWeight:"700"},
});
