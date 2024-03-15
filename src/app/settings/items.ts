interface SettingItem {
    name: string;
    label: string;
    type: string;
    defaultValue: number;
}

export const settingItems: SettingItem[] = [
    { name: "focus", label: "Focus", type: "number", defaultValue: 45 },
    { name: "focus", label: "Focus", type: "number", defaultValue: 5 },
    { name: "focus", label: "Focus", type: "number", defaultValue: 15 }]