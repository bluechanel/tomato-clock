import { siteConfig } from "@/config/site";


export function showNotification(content: string) {
    return new Notification(
        siteConfig.name, {
        body: content,
        icon: "favicon.ico",
        requireInteraction: true
    });
}