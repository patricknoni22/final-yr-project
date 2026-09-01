import { useQuery } from "@tanstack/react-query";
import { getNotifications, getUnreadCount } from "../api/notificationApi";

export const useNotifications = () => useQuery({ queryKey: ["notifications"], queryFn: getNotifications, refetchInterval: 30000 });
export const useUnreadNotificationCount = () => useQuery({ queryKey: ["notifications", "unread-count"], queryFn: getUnreadCount, refetchInterval: 30000 });
