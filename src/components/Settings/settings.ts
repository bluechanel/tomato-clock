'use client'
interface SettingItem {
    name: string;
    label: string;
    type: string;
    value?: number | undefined;
    defaultValue: number;
}

class Settings {

    private items: SettingItem[] = [
        { name: "focus", label: "Focus", type: "number", defaultValue: 45 },
        { name: "break", label: "Break", type: "number", defaultValue: 5 },
        { name: "longBreak", label: "Long Break", type: "number", defaultValue: 15 }]

    getItem(settingName: string): string {
        let v = this.items.find(item => item.name == settingName)
        if (v == undefined) {
            throw new Error(`Not found ${settingName} value `)
        } else {
            if (typeof window !== 'undefined' && window.localStorage) {
                const t = localStorage.getItem(settingName);
                if (t == null) {
                    return v.defaultValue.toString();
                } else {
                    return t;
                }
            }
        }
        return v.defaultValue.toString();
    }

    setItems(settingName: string, value: any): void {
        global.localStorage.setItem(settingName, value);
    }

    allItem(): SettingItem[] {
        this.items.map((item) => {
            item.value = Number(this.getItem(item.name));
        })
        return this.items;
    }
}

export const setting = new Settings();
