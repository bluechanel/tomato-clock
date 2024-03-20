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
        const itemValue = global.localStorage.getItem(settingName)
        if (itemValue == null) {
            const v = this.items.find(item => item.name == settingName)
            if (v == undefined) {
                throw new Error(`haven't ${settingName} value `)
            }
            return v.defaultValue.toString()
        } else {
            return itemValue;
        }
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
