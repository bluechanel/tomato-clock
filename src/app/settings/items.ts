interface SettingItem {
    name: string;
    label: string;
    type: string;
    value: number | undefined;
    defaultValue: number;
}

export const settingItems: SettingItem[] = [
    { name: "focus", label: "Focus", type: "number", value: global.localStorage.getItem("focus") ? Number(localStorage.getItem("focus")) : undefined, defaultValue: 45 },
    { name: "break", label: "Break", type: "number", value: global.localStorage.getItem("break") ? Number(localStorage.getItem("focus")) : undefined, defaultValue: 5 },
    { name: "longBreak", label: "Long Break", type: "number", value: global.localStorage.getItem("longBreak") ? Number(localStorage.getItem("focus")) : undefined, defaultValue: 15 }]