
import type { InjectionKey } from 'vue'
import type { Graph, Node, Edge, Cell } from '@antv/x6'

// create injecttion key for bpmn provider

export const formTypeOptions = [
    {label:"String", value:"string"},
    {label:"Number", value:"long"},
    {label:"Date", value:'date'},
    {label:"Boolean", value:'boolean'},
]

export const BPMN_PROVIDER: InjectionKey<BPMNProvider> = Symbol('BPMN_PROVIDER_KEY')
export interface BPMNProvider {
    init: (bpmnXml: string, x6Json?: any) => void
    graph: Ref<Graph | undefined>,
    bpmnJson: any,
    flatGraphObject: any,
    allFormField: Ref<any>,
    key: symbol
}

export interface ConditionProvider {
    masterTableOption: Ref<any[]>,
    userGroupOption: Ref<any[]>,
    caseTableOption: Ref<any[]>,
}

export const CONDITION_PROVIDER: InjectionKey<ConditionProvider> = Symbol('CONDITION_PROVIDER_KEY')



// editor provider
export const EDITOR_PROVIDER: InjectionKey<EditorProvider> = Symbol('EDITOR_PROVIDER_KEY')
export interface EditorProvider {
    openSidebar:(component:string, node:Node | Edge | Cell) => void
    openForm: (node:Node) => Promise<void>,
    previewForm: (node:Node) => void,
    openPermission: () => void,
    openInfo: () => void,
    saveFormByNode: (node:Node, json:any) => Promise<any>,
    getFormByNode: (node:Node) => Promise<Object>,
    pasteForm: (node:Node) => void,
    copyForm: (node:Node, obj:any) => void
    copyObj: Ref<any>,
    copyKey: Ref<string | undefined>,
    conditionSetting: Ref<any>
    readonly: Ref<boolean>
}
export type BPMNJSON = {
    definitions :{
        attr_exporter: string,
        attr_exporterVersion: string,
        attr_expressionLanguage: string,
        attr_targetNamespace: string,
        attr_typeLanguage: string,
        attr_workflowTemplate: string,
        attr_xmlns: string,
        [key : string]: any
    },
    process:{
        'attr_flowable:candidateStarterGroups': string
        attr_id: string
        attr_isExecutable: boolean
        attr_name: string
        boundaryEvent:BoundaryEvent | BoundaryEvent[],
        endEvent: EndEvent,
        exclusiveGateway: ExclusiveGateway | ExclusiveGateway[],
        sequenceFlow: SequenceFlow | SequenceFlow[],
        serviceTask: ServiceTask | ServiceTask[],
        startEvent: StartEvent,
        userTask: UserTask | UserTask[],
        [key : string]: any
    }

}
export type StartEvent = {
    'attr_flowable:formFieldValidation':boolean
    attr_id:"start"
    attr_name:"Start"
    extensionElements?: FormExtensionElements
}
export type BoundaryEvent = {
    attr_attachedToRef:string
    attr_cancelActivity:true
    attr_id: string
    type?:string,
    timerEventDefinition:{timeDuration: string}
}

export type EndEvent = {
    attr_id: 'end', attr_name: 'End'
}

export type ExclusiveGateway = {
    attr_id: string,
    approve?: boolean
    type?:string,
}

export type SequenceFlow = {
    attr_id: string,
    attr_sourceRef: string,
    attr_targetRef: string,
    type?:string,
    conditionExpression?:{
        attr_xsi:string,
        __cdata:string
    }
}

export type FormExtensionElements = {
    'flowable:formProperty': BpmnFormField[]
}

export type TemplateExtensionElements = {
    'flowable:field' : TemplateField[]
}

export type TemplateField = {
    attr_name:string,
    'flowable:expression'? :{
        __cdata:string
    }
    'flowable:string'? :{
        __cdata:string
    }
    attr_path ?:string // only for document template path
    attr_required?: string,
    attr_type?:string,
    [key : string]: any
}

export type BpmnFormField = {
    attr_field_disabled?:boolean
    attr_field_hidden?:boolean
    attr_field_label?:string
    attr_field_required?: boolean
    attr_field_type?:string
    attr_field_valid?:boolean
    attr_field_writable?:boolean
    attr_fixed?: boolean
    attr_id:string
    attr_name:string
    attr_type:string
    [key : string]: any
}

export type ServiceTask ={
    'attr_flowable:async'?:true
    'attr_flowable:delegateExpression':string
    'attr_flowable:exclusive'?:boolean
    attr_id:string
    attr_name:string
    type?:string,
    extensionElements?: TemplateExtensionElements
}

export type UserTask = {
    'attr_flowable:candidateGroups':string
    'attr_flowable:formFieldValidation':true
    attr_id:string
    attr_name:string
    type?:string,
    extensionElements: {
        'flowable:formProperty': BpmnFormField[],
        'flowable:taskListener': {
            attr_delegateExpression: "${autoAssignTaskListener}"
            attr_event:string
            'flowable:field': {
                attr_name:string,
                'flowable:expression': {
                    __cdata:string
                }
            }
        },
        [key : string]: any
    }

}

export const conditionOptions = [
    {
      "type": "is_null",
      "source": {
          "type": "string"
      },
      "target": {
          "type": "is_null"
      },
      "validation": [
          {
              "label": "Is",
              "value": "is"
          }
      ]
    },
    {
        "type": "Boolean_Validation",
        "source": {
            "type": "boolean"
        },
        "target": {
            "type": "boolean"
        },
        "validation": [
            {
                "label": "Is",
                "value": "is"
            }
        ]
    },
    {
        "type": "String_Validation",
        "source": {
            "type": "string"
        },
        "target": {
            "type": "string"
        },
        "validation": [
            {
                "label": "Is",
                "value": "is"
            }
        ]
    },
    {
        "type": "Numbering_Validation",
        "source": {
            "type": "number"
        },
        "target": {
            "type": "number"
        },
        "validation": [
            {
                "label": "Is Greater Than",
                "value": "greater"
            },
            {
                "label": "Is Less Than",
                "value": "smaller"
            }
        ]
    },
    {
        "type": "Match_Master_Table",
        "source": {
            "type": "string"
        },
        "target": {
            "type": "masterTable"
        },
        "validation": [
            {
                "label": "Can Found",
                "value": "is"
            },
            {
                "label": "Not Found",
                "value": "not"
            }
        ]
    },
    {
        "type": "Match_Member_in_User_Group",
        "source": {
            "type": "string"
        },
        "target": {
            "type": "userGroup"
        },
        "validation": [
            {
                "label": "Is Member",
                "value": "is"
            },
            {
                "label": "Not Member",
                "value": "not"
            }
        ]
    },
    {
        "type": "Match_Case_Info",
        "source": {
            "type": "string"
        },
        "target": {
            "type": "caseTable"
        },
        "validation": [
            {
                "label": "Match",
                "value": "is"
            },
            {
                "label": "Not Match",
                "value": "not"
            }
        ]
    },
    {
        "type": "Compare_Case_Info",
        "source": {
            "type": "form"
        },
        "target": {
            "type": "caseTypeId"
        },
        "validation": [
            {
                "label": "Is Empty",
                "value": "isEmpty"
            },
            {
                "label": "Not Empty",
                "value": "notEmpty"
            },
            {
                "label": "Equal",
                "value": "equal"
            },
            {
                "label": "Is Greater Than",
                "value": "greater"
            },
            {
                "label": "Is Less Than",
                "value": "smaller"
            }
        ]
    }
]
