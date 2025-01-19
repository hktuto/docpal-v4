export type CMMN_JSON = {
    "?xml" ?: XML,
    definitions: Definitions
}


export type CaseItemType = 'case' | 'stage' | 'humanTask' | 'milestone'  | 'processTask' | 'userEventListener' | "exitCriterion" | "entryCriterion"
type XML = {
    attr_encoding: string,
    attr_version: string,
    [key: string]: any
}

type Definitions = {
    // some attributes start with attr_
    case: Case
    [key: string]: any
}

type Case = {
    attr_id: string,
    attr_name:string,
    casePlanModel:{
        attr_id: string,
        attr_name:string,
        extensionElements?: {
            "docpal:attributes" :FormAttributes[],
            "docpal:form" : FormField[]
        },
        planItem ?: PlanItem[],
        stage ?: Stage[],
        humanTask ?: HumanTask[],
        sentry ?: Sentry[],
        milestone?:Milestone[],
        processTask?: ProcessTask[],
        userEventListener?: UserEventListener[]
        caseTask: CaseTask[]
        exitCriterion?: {
            attr_id: string
            attr_sentryRef: string
        },
        entryCriterion?:{
            attr_id: string
            attr_sentryRef: string
        } 
    }
}

type FormAttributes = {
    "#text": string,
    attr_group: string,
    attr_name: string,
    attr_ref: string,
    field: [
        {
            attr_id: string,
            attr_accesstype : 'hidden' | 'mask' | 'edit' | 'read'
        }
    ]
}

type FormField = {
    attr_casetable:string, // unique and cannot delete
    attr_id: string,
    attr_name: string,
    field:[
        {
            attr_id: string,
            attr_name: string,
            attr_type: 'string' | 'user_group' | 'document'
        }
    ]
}


export type Stage = {
    attr_id: string
    attr_name: string
    planItem ?: PlanItem[]
    humanTask ?: HumanTask[]
    sentry ?: Sentry[],
    milestone?:Milestone[],
    processTask?: ProcessTask[],
    userEventListener?: UserEventListener[]
    caseTask: CaseTask[]
    stage: Stage[]
}

export type CaseTask = {
    attr_id: string,
    attr_name: string,
    caseRefExpression?:{
        __cdata:string
    },
    extensionElements?:{
        "flowable:in": {attr_source:string, attr_target:string}[],
        "flowable:out": {attr_source:string, attr_target:string}[],
    }
}
export type UserEventListener = {
    "attr_flowable:availableCondition": string // ${ case variable }
    attr_id: string
    attr_name: string
}
export type ProcessTask = {
    "attr_flowable:fallbackToDefaultTenant": boolean
    attr_id: string
    attr_name: string,
    extensionElements:{
        "flowable:in": {attr_source:string, attr_target:string}[],
        "flowable:out": {attr_source:string, attr_target:string}[],
    },
    processRefExpression:{
        __cdata: string
    }
}
export type Milestone = {
    attr_id: string
    attr_name: string
}
export type Sentry = {
    attr_id:string,
    attr_name: string,
    planItemOnPart?:{
        attr_id: string
        attr_sourceRef: string
        standardEvent: 'complete' | 'occur' | 'exit',
    },
    ifPart?: {
        condition: {__cdata: string}
    }
}

export type PlanItem = {
    attr_definitionRef: string // where the plan item is defined
    attr_id: string
    attr_name: string
    itemControl?: ItemControlRules,
    exitCriterion?: {
        attr_id: string
        attr_sentryRef: string
    },
    entryCriterion?:{
        attr_id: string
        attr_sentryRef: string
    }
}

export type HumanTask = {
    'attr_flowable:assignee': string,
    'attr_flowable:formFieldValidation' : boolean,
    attr_id: string
    attr_name: string
    extensionElements?: {
        'docpal:attributes'?: FormAttributes[],
        'docpal:form'?: FormField[],
        'flowable:variable'?: {
            attr_name: string
            attr_type: string
        }[],
        'modeler:assignee-info-email' ?: ModelerField,
        'modeler:assignee-info-firstname' ?: ModelerField,
        'modeler:assignee-info-lastname' ?: ModelerField,
        'modeler:flowable-idm-assignee' ?: ModelerField,
        'modeler:initiator-can-complete' ?: ModelerField
    }
}

type ModelerField = {
    "attr_xmlns:modeler": string,
    __cdata: string
}

type ItemControlRules = {
    manualActivationRule?: string
    repetitionRule :{
        "attr_flowable:counterVariable": string,
        condition :{
            __cdata: string // $vars expression
        },
        extensionElements: string,
    }
}
