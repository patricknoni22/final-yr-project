import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthSession, getRoleFromToken } from "../../auth/utils/authStorage";
import { registerPushToken } from "../api/notificationApi";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function usePushNotifications() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      Platform.OS === "web" ||
      !Device.isDevice ||
      !getAuthSession()?.accessToken
    )
      return;
    let active = true;
    (async () => {
      if (Platform.OS === "android")
        await Notifications.setNotificationChannelAsync("default", {
          name: "Appointments",
          importance: Notifications.AndroidImportance.HIGH,
        });
      let { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted")
        ({ status } = await Notifications.requestPermissionsAsync());
      if (status !== "granted" || !active) return;
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;
      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;
      await registerPushToken({ token, platform: Platform.OS });
    })().catch((error) =>
      console.warn("Push registration failed", error.message),
    );

    const received = Notifications.addNotificationReceivedListener(() =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    );
    const responded = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const bookingId = response.notification.request.content.data?.bookingId;
        const base = getRoleFromToken(getAuthSession()?.accessToken) === "LECTURER" ? "/(lecturer)" : "/(student)";
        if (bookingId && base === "/(student)")
          router.push({
            pathname: "/(student)/booking-details/[bookingId]",
            params: { bookingId },
          });
        else router.push(`${base}/notifications`);
      },
    );
    return () => {
      active = false;
      received.remove();
      responded.remove();
    };
  }, [pathname, queryClient, router]);
}
