

export default defineAppConfig({
  menu:{
    "admin-calendar-setting":{
      id:"admin-calendar-setting",
      name: 'calendar-setting',
      label: "adminMenu.calendarSetting",
      icon: "lucide:calendar",
      hoverIcon: "lucide:calendar",
      component: "LazyCalendarSetting",
      props:{
      },
    }
  },

})