import type { CalendarEventExternal } from '@schedule-x/calendar'
import { clientApi } from 'api'
import type { CalendarTaskRespDTO } from 'api/src/generate/client'
import dayjs from 'dayjs'
import {useCalenarLocation} from '../composables/useCalendar'

export const viewName = [
    'day','week','month-grid','month-agenda'
]

export type DocPalEventType = CalendarTaskRespDTO & {
    user: string
}

export type CalendarOptions = {
    allowCreate: boolean,
    standalone?: boolean
    editable: boolean,
    showWorkflowFilter: boolean,
    showLocationFilter: boolean,
    showUserFilter: boolean,
    showCategoryFilter: boolean,
    defaultCategory:string,
    defaultLocation:string,
    defaultUser:string,
    locationLabel?:string,
    categoryLabel?:string,
    userLabel?:string,
    userFilterGroup?:string,
    officeStartTime?:string, // office start time default to 08:00
    officeEndTime?:string, // office end time default to 20:00
    view?:  'day' | 'week' |'month-grid' |'month-agenda'
    firstDayOfWeek?:  "MONDAY" | "SUNDAY",
    addtionalCheckBeforeEventUpdate?:(oldEvent:CalendarEventExternal, editedEvent:CalendarEventExternal) => boolean
}

export function convertSiteEventToCalendarEvent(event:DocPalEventType, defaultCalendarId:string):CalendarEventExternal {
    const calendarLocation = useCalenarLocation()
    const format = event.isAllDay ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
    const locationName = event.location ? calendarLocation.value.find(item => item.id === event.location)?.name : undefined
   
    const newEvent= {
        id: event.id || new Date().valueOf().toString(),
        start: dayjs(event.startTime).format(format),
        end: dayjs(event.endTime).format(format),
        title: event.eventName,
        description: event.title,
        location: locationName,
        people: event.relatedUsers ? [event.relatedUsers.user] : [],
        detail: {...event},
        calendarId: event.category || undefined,
        _options:{
            disableResize: true,
            disableDND: true,
        }
    }
    return newEvent
}

export function getEventFromApi(calendarApp:any, calendarControls:any, filter:any){
    const range = calendarControls.getRange()
    const params:any = {
        startTime: dayjs(range.start).toISOString(),
        endTime: dayjs(range.end).toISOString(),
    }
    const defaultCalendarId = Object.keys(calendarControls.getCalendars())[0]
    const user = localStorage.getItem('docpal-user')
    const userId = user ? JSON.parse(user).userId : undefined
    // TODO : backend is missing filter
    clientApi.api.postCalendarsList(params).then( res => {
        const data = res.data
        if(!data) return
        const events = data.filter( (event:any) => {
            if(filter.category) {
                const matCat = event.category === filter.category
                if(!matCat) return false
            }
            if(filter.location) {
                const matLoc = event.location === filter.location
                if(!matLoc) return false
            }
            if(filter.user) {
                console.log("filter.user", filter.user)
                const userFilter = filter.user === 'currentUser' ? userId : filter.user
                const mapUser = event.assignee === userFilter || event.modifiedBy === userFilter
                const userInRelated = event.relatedUsers ? event.relatedUsers.user === userFilter : false
                if(!mapUser && !userInRelated) return false
            }
            return true
        }).map((ev) => convertSiteEventToCalendarEvent(ev, defaultCalendarId))
        // filter events
    
        // dummy full date event
        //TODO： remove later
        events.push({
            id: new Date().valueOf().toString(),
            start: dayjs().format('YYYY-MM-DD'),
            end: dayjs().add(1, 'hour').add(1, 'day').format('YYYY-MM-DD'),
            title: 'David Annual Leave',
            people:['sean-admin'],
            description: 'New Event',
            calendarId: defaultCalendarId,
        })
        calendarApp.eventsService.set(events);
    })
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
