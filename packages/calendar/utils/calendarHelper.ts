export const viewName = [
    'day','week','month-grid','month-agenda'
]

export type CalendarOptions = {
    allowCreate: boolean,
    editable: boolean,
    showLocationFilter: boolean,
    showUserFilter: boolean,
    showCategoryFilter: boolean,
    view: "day" | "week" | "month-grid" ,
}
/**
 * example workflow setting
 * {
    "type": "calendar",
        "data": {
            "allowCreate": true,
            "showLocationFilter": true,
            "showUserFilter": true,
            "fieldMapping": {
            "startTime":"starttime",
            "endtime":"endtime",
            "category":"category",
            "location":"location",
            "caseId": "caseId",
            "taskId":"taskId"
            }
        }
    }
 * 
 * 
 */