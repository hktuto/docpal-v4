export interface CalendarSettingProvider {
    saveSetting: () => Promise<void>
}


export const CalendarSettingKey: InjectionKey<CalendarSettingProvider> = Symbol('calendarSettingProvider')