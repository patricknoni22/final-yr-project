import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text, { InterTextInput as TextInput } from "../../../src/components/InterText";
import { fallbackLecturer, lecturersById } from "../../../src/data/lecturers";
import { useLecturerDetails } from "../../../src/features/lecturers/hooks/useLecturerDetails";
import { useCreateBooking } from "../../../src/features/bookings/hooks/useCreateBooking";
import { buildBookableDates, buildTimeSlots, formatLecturer } from "../../../src/features/lecturers/utils/lecturerView";
import InitialsAvatar from "../../../src/components/common/InitialsAvatar";
import LoadingState from "../../../src/components/common/LoadingState";

export default function BookAppointment() {
  const router = useRouter();
  const { lecturerId } = useLocalSearchParams();
  const resolvedId = typeof lecturerId === "string" ? lecturerId : "";
  const { data, isLoading } = useLecturerDetails(resolvedId);
  const fallback = lecturersById[resolvedId] || fallbackLecturer;
  const lecturer = data ? formatLecturer(data, require("../student-img/profile.png")) : fallback;
  const dates = data ? buildBookableDates(lecturer.service?.availability) : fallback.dates;
  const [dateId, setDateId] = useState("");
  const date = dates.find((item) => item.id === dateId) || dates[0];
  const slots = data ? buildTimeSlots(lecturer.service?.availability, date, lecturer.service?.duration) : fallback.slots.map((label) => ({ label }));
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [sent, setSent] = useState(false);
  const createMutation = useCreateBooking({
    onSuccess: () => setSent(true),
    onError: (error) => Alert.alert("Booking failed", error.response?.data?.message || error.message || "Please try again."),
  });

  if (isLoading) return <LoadingState title="Preparing appointment times" message="We’re checking the lecturer’s latest availability." />;

  const submit = () => {
    if (!data) return Alert.alert("Please wait", "Lecturer availability is still loading.");
    const selectedSlot = slots.find((item) => item.label === time);
    if (!date || !selectedSlot?.value) return;
    const end = new Date(selectedSlot.value.getTime() + (lecturer.service.duration || 30) * 60000);
    createMutation.mutate({ lecturerId: lecturer.id, serviceId: lecturer.service?.id, startTime: selectedSlot.value.toISOString(), endTime: end.toISOString(), reason: reason.trim() });
  };

  if (sent) return (
    <SafeAreaView style={s.safe}>
      <View style={s.success}>
        <View style={s.check}><Ionicons name="checkmark" size={38} color="#FFF" /></View>
        <Text style={s.successTitle}>Request sent</Text>
        <Text style={s.successText}>Your physical appointment request has been sent to {lecturer.name}. You’ll be notified when it is approved.</Text>
        <View style={s.summary}>
          <Info icon="calendar-outline" label={date.label} />
          <Info icon="time-outline" label={time} />
          <Info icon="location-outline" label={lecturer.office} />
        </View>
        <TouchableOpacity style={s.button} onPress={() => router.replace("/(student)/bookings")}><Text style={s.buttonText}>View my bookings</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}><Ionicons name="arrow-back" size={21} color="#173A5E" /></TouchableOpacity>
        <Text style={s.headerTitle}>Book appointment</Text><View style={s.spacer} />
      </View>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <View style={s.lecturer}>
          <InitialsAvatar name={lecturer.name} size={62} style={s.avatar} />
          <View style={s.grow}><Text style={s.name}>{lecturer.name}</Text><Text style={s.muted}>{lecturer.department}</Text><Text style={s.physical}>● Physical consultation</Text></View>
        </View>
        <Heading number="1" title="Choose a date" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
          {dates.map((item) => <TouchableOpacity key={item.id} style={[s.date, date?.id === item.id && s.active]} onPress={() => { setDateId(item.id); setTime(""); }}><Text style={[s.day, date?.id === item.id && s.white]}>{item.day}</Text><Text style={[s.number, date?.id === item.id && s.white]}>{item.date}</Text></TouchableOpacity>)}
        </ScrollView>
        <Heading number="2" title="Choose a time" />
        <View style={s.times}>{slots.map((item) => <TouchableOpacity key={item.label} style={[s.time, time === item.label && s.active]} onPress={() => setTime(item.label)}><Text style={[s.timeText, time === item.label && s.white]}>{item.label}</Text></TouchableOpacity>)}</View>
        <Heading number="3" title="Reason for appointment" />
        <TextInput style={s.input} multiline maxLength={250} value={reason} onChangeText={setReason} placeholder="Briefly tell the lecturer what you would like to discuss..." placeholderTextColor="#8793A0" textAlignVertical="top" />
        <View style={s.notice}><Ionicons name="information-circle-outline" size={21} color="#003F78" /><View style={s.grow}><Text style={s.noticeTitle}>This is a physical appointment</Text><Text style={s.noticeText}>Meeting location: {lecturer.office}</Text></View></View>
      </ScrollView>
      <View style={s.footer}><TouchableOpacity disabled={!time || reason.trim().length < 3 || createMutation.isPending} style={[s.button, (!time || reason.trim().length < 3 || createMutation.isPending) && s.disabled]} onPress={submit}><Text style={s.buttonText}>{createMutation.isPending ? "Sending..." : "Send booking request"}</Text></TouchableOpacity></View>
    </SafeAreaView>
  );
}

function Heading({ number, title }) { return <View style={s.heading}><View style={s.step}><Text style={s.stepText}>{number}</Text></View><Text style={s.headingText}>{title}</Text></View>; }
function Info({ icon, label }) { return <View style={s.info}><Ionicons name={icon} size={20} color="#003F78" /><Text style={s.infoText}>{label}</Text></View>; }

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:"#F6F8FB"},grow:{flex:1},header:{height:70,paddingTop:8,paddingHorizontal:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between",backgroundColor:"#FFF",borderBottomWidth:1,borderBottomColor:"#E7E9EF"},back:{width:38,height:38,alignItems:"center",justifyContent:"center",borderRadius:19,backgroundColor:"#F1F4F7"},headerTitle:{color:"#173A5E",fontSize:17,fontWeight:"700"},spacer:{width:38},content:{padding:20,paddingBottom:110},
  lecturer:{padding:14,flexDirection:"row",alignItems:"center",gap:13,borderWidth:1,borderColor:"#E0E6EC",borderRadius:14,backgroundColor:"#FFF"},avatar:{width:62,height:62,borderRadius:9},name:{color:"#102F4E",fontSize:16,fontWeight:"700"},muted:{marginTop:3,color:"#687887",fontSize:13},physical:{marginTop:7,color:"#137642",fontSize:11,fontWeight:"700"},
  heading:{marginTop:24,marginBottom:12,flexDirection:"row",alignItems:"center",gap:9},step:{width:24,height:24,alignItems:"center",justifyContent:"center",borderRadius:12,backgroundColor:"#003F78"},stepText:{color:"#FFF",fontSize:12,fontWeight:"700"},headingText:{color:"#173A5E",fontSize:17,fontWeight:"700"},row:{gap:10},date:{width:76,height:82,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#D5DCE4",borderRadius:10,backgroundColor:"#FFF"},day:{color:"#687887",fontSize:10,fontWeight:"700"},number:{marginTop:5,color:"#173A5E",fontSize:23,fontWeight:"800"},active:{borderColor:"#003F78",backgroundColor:"#003F78"},white:{color:"#FFF"},
  times:{flexDirection:"row",flexWrap:"wrap",gap:10},time:{width:"47%",height:43,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#D5DCE4",borderRadius:8,backgroundColor:"#FFF"},timeText:{color:"#334455",fontSize:11,fontWeight:"600"},input:{minHeight:112,padding:13,color:"#26384A",fontSize:13,lineHeight:20,borderWidth:1,borderColor:"#C9D0D8",borderRadius:9,backgroundColor:"#FFF"},notice:{marginTop:20,padding:14,flexDirection:"row",gap:10,borderRadius:10,backgroundColor:"#EAF2F8"},noticeTitle:{color:"#173A5E",fontSize:13,fontWeight:"700"},noticeText:{marginTop:3,color:"#52708D",fontSize:12,lineHeight:18},
  footer:{position:"absolute",left:0,right:0,bottom:0,padding:16,paddingBottom:20,backgroundColor:"#FFF",borderTopWidth:1,borderTopColor:"#E0E6EC"},button:{width:"100%",height:50,alignItems:"center",justifyContent:"center",borderRadius:8,backgroundColor:"#003F78"},disabled:{backgroundColor:"#9DAAB6"},buttonText:{color:"#FFF",fontSize:15,fontWeight:"700"},success:{flex:1,padding:24,alignItems:"center",justifyContent:"center"},check:{width:76,height:76,alignItems:"center",justifyContent:"center",borderRadius:38,backgroundColor:"#198754"},successTitle:{marginTop:20,color:"#102F4E",fontSize:27,fontWeight:"800"},successText:{marginTop:9,textAlign:"center",color:"#687887",fontSize:14,lineHeight:21},summary:{width:"100%",marginVertical:25,padding:17,gap:16,borderWidth:1,borderColor:"#E0E6EC",borderRadius:14,backgroundColor:"#FFF"},info:{flexDirection:"row",alignItems:"center",gap:12},infoText:{flex:1,color:"#26384A",fontSize:13,fontWeight:"600"},
});
