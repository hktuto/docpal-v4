import { clientApi } from 'api'
import type { CalendarTaskRespDTO } from 'api/src/generate/client'
import dayjs from 'dayjs'

export const viewName = [
    'day','week','month-grid','month-agenda'
]

export type DocPalEventType = CalendarTaskRespDTO 

export type CalendarOptions = {
    allowCreate: boolean,
    editable: boolean,
    showWorkflowFilter: boolean,
    showLocationFilter: boolean,
    showUserFilter: boolean,
    showCategoryFilter: boolean,
    defaultCategory:string,
    defaultLocation:string,
    defaultUser:string,
    locationLabel:string,
    categoryLabel:string,
    userLabel:string,
    userFilterGroup?:string,
    view:  'day' | 'week' |'month-grid' |'month-agenda'
    firstDayOfWeek:  "MONDAY" | "SUNDAY"
}

export function convertSiteEventToCalendarEvent(event:DocPalEventType):CalendarEvent {
    const format = event.isAllDay ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
    return {
        id: event.eventId || new Date().valueOf().toString(),
        start: dayjs(event.startTime).format(format),
        end: dayjs(event.endTime).format(format),
        title: event.eventName,
        description: event.eventName,
        location: event.location,
        detail: {...event},
        _options:{
            disableResize: true,
            disableDND: true,
        }
    }
}

export function getEventFromApi(calendarApp:any, calendarControls:any, filter){
    const range = calendarControls.getRange()
    const params:any = {
        startTime: dayjs(range.start).toISOString(),
        endTime: dayjs(range.end).toISOString(),
    }
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
                const matUser = event.assignee === filter.user || event.modifiedBy === filter.user || event.relatedUsers.includes(filter.user)
                if(!matUser) return false
            }
            return true
        }).map(convertSiteEventToCalendarEvent)
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
