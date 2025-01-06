/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Result {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: object;
}

export interface ResultObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: object;
}

export interface ResultString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: string;
}

/** Group */
export interface GroupDTO {
    /** Group ID */
    id?: string;
    /** Group Name */
    name?: string;
    /** is Can Modified  */
    isCanModified?: boolean;
}

export interface ResultUserDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** User */
    data?: UserDTO;
}

/** User */
export interface UserDTO {
    /** Is user connected */
    isConnected?: boolean;
    /**
     * Token timeout time
     * @format int32
     */
    timeout?: number;
    /** User session ID */
    sessionId?: string;
    /** Username */
    username?: string;
    /** User ID */
    userId?: string;
    /** User ID */
    id?: string;
    /** First Name */
    firstName?: string;
    /** Last Name */
    lastName?: string;
    /** User Email */
    email?: string;
    /** User Password */
    password?: string;
    /** Datetime token expired at */
    jwtExpiredAt?: string;
    /** User Properties */
    properties?: Record<string, object>;
    /** User groups */
    groupDTOList?: GroupDTO[];
    /** active status , A = active , D = unActive */
    status?: string;
}

/** Document Type */
export interface DocumentTypeDTO {
    /** Document Type Name */
    name?: string;
    /** Is Folder Type */
    isFolder?: boolean;
    /** Document Type keywords */
    keywords?: KeywordDTO[];
}

/** Keyword */
export interface KeywordDTO {
    /** Keyword Name */
    name?: string;
    /** Keyword Type */
    type?: string;
    /** Keyword Value */
    value?: object;
    /** Schema That Belong To Keyword */
    schema?: string;
    /** Keyword Is Multiple Value */
    isMultiValue?: boolean;
    /** Keyword Default Value */
    defaultValue?: object;
    /** Value Scope Of This Keyword */
    valueScope?: KeywordValueScope;
}

/** Value Scope Of This Keyword */
export interface KeywordValueScope {
    scope?: string;
    scopeName?: string;
}

export interface ResultListDocumentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTypeDTO[];
}

/** Field */
export interface FieldDTO {
    /** Field Label */
    label?: string;
    /** Field Type */
    type?: FieldTypeDTO;
    /** Is Multi value? */
    isMultiValue?: boolean;
    /** Default value */
    defaultValue?: string;
    /** Only For Complex Type */
    subFields?: Record<string, FieldDTO>;
}

/** Field Type */
export interface FieldTypeDTO {
    /** id */
    id?: string;
}

export interface ResultSetupDocumentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document Type */
    data?: SetupDocumentTypeDTO;
}

/** Schema */
export interface SchemaDTO {
    /** Schema ID */
    id?: string;
    /** Schema Prefix */
    prefix?: string;
    /** Fields */
    fields?: Record<string, FieldDTO>;
    /** Is Local Schema */
    isLocalSchema?: boolean;
}

/** Document Type */
export interface SetupDocumentTypeDTO {
    /** Document Type ID */
    id?: string;
    /** Document Type Label */
    label?: string;
    /** The super type of this document type. Inherit from File or from Folder or else. */
    inheritType?: string;
    /** Container Types */
    containerTypes?: string[];
    /** Accepted Children Type */
    childTypes?: string[];
    /** Is Folder */
    isFolder?: boolean;
    /** Is Local DocType */
    isLocalDocType?: boolean;
    /** Add extra schemas to this document type. */
    extraSchemas?: SchemaDTO[];
    /** Add custom schema */
    customSchema?: Record<string, FieldDTO>;
}

export interface ResultListSetupDocumentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: SetupDocumentTypeDTO[];
}

export interface ResultSetString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** @uniqueItems true */
    data?: string[];
}

/** Document */
export interface DocumentDTO {
    /** Document ID */
    id?: string;
    /** Document Name */
    name?: string;
    /** Document Description */
    description?: string;
    /** Document Path */
    path?: string;
    /** Document Type */
    type?: string;
    /** Document Version */
    version?: string;
    /** Document Creator */
    createdBy?: string;
    /**
     * Document Created Date
     * @format date-time
     */
    createdDate?: string;
    /**
     * Docuemnt Modification Date
     * @format date-time
     */
    modifiedDate?: string;
    /** Is Document Folder */
    isFolder?: boolean;
    /** Is Document Checked Out */
    isCheckedOut?: boolean;
    /** Document Properties */
    properties?: Record<string, object>;
    /** parentRef */
    parentRef?: string;
    /** logicalPath */
    logicalPath?: string;
}

export interface ResultListDocumentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentDTO[];
}

export interface ResultSetUserDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** @uniqueItems true */
    data?: UserDTO[];
}

/** Identity (Request) */
export interface IdentityRequestDTO {
    /** Id */
    id?: string;
    /** Group Id */
    groupId?: string;
    /** Group Name */
    groupName?: string;
    /** User Id */
    userId?: string;
    /** User First Name */
    firstName?: string;
    /** User Last Name */
    lastName?: string;
    /** User Email Address */
    email?: string;
    /** User Login Password */
    password?: string;
    /** User Status */
    status?: string;
    /** Group Id List */
    groups?: string[];
    /** User Id List */
    users?: string[];
    /** User Properties */
    properties?: Record<string, object>;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    userNameOrEmail?: string;
}

/** Access Control Entry (Request) */
export interface AccessControlRequestDTO {
    /** Document ID or Path */
    idOrPath?: string;
    /** ACE ID */
    aceId?: string;
    /** User ID */
    userId?: string;
    /** Permission */
    permission?: string;
    /** Is Block Inheritance */
    blockInheritance?: boolean;
    /**
     * Start Date
     * @format date-time
     */
    startDate?: string;
    /**
     * End Date
     * @format date-time
     */
    endDate?: string;
    /** docpal permission id list */
    dpId?: string[];
}

/** Virtual Folder Setting (Request) */
export interface VirtualFolderSettingRequestDTO {
    /** Virtual Folder ID */
    id?: string;
    /** Virtual Folder Setting in JSON format */
    jsonValue?: string;
    type?: string;
    user?: string;
    userAllowList?: string[];
    groupAllowList?: string[];
}

export interface ResultVirtualFolderSettingResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: VirtualFolderSettingResponseDTO;
}

export interface VirtualFolderSettingResponseDTO {
    id?: string;
    jsonValue?: string;
    userAllowList?: string[];
    groupAllowList?: string[];
    virtualFolderName?: string;
}

export interface WhatsAppSettingDTO {
    accessToken?: string;
    whatsAppSwitch?: boolean;
}

export interface ResultVoid {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: object;
}

export interface EmailTemplate {
    id?: string;
    /** @format int64 */
    emailLayoutId?: number;
    emailTemplateJson?: string;
    emailTemplateVariable?: string;
    to?: string;
    from?: string;
    label?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    body?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    emailLayoutName?: string;
}

/** Email Template ResponseDTO */
export interface EmailTemplateResponseDTO {
    id?: string;
    /** @format int64 */
    emailLayoutId?: number;
    /** @format int64 */
    emailLayoutName?: number;
    emailTemplateJson?: string;
    emailTemplateVariable?: string;
    to?: string;
    label?: string;
    from?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    body?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    useMap?: Record<string, object>;
}

export interface ResultEmailTemplateResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Email Template ResponseDTO */
    data?: EmailTemplateResponseDTO;
}

export interface EmailLayout {
    /** @format int64 */
    id?: number;
    name?: string;
    layoutContent?: string;
    status?: string;
    createdBy?: string;
    /** @format date-time */
    createdDate?: string;
    modifiedBy?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultEmailLayout {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EmailLayout;
}

/** Document Template RequestDTO */
export interface DocumentTemplateRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** id */
    id?: string;
    /** Document Template Name */
    name?: string;
    /** Nuxeo Document Id */
    documentId?: string;
    /** Document Template File Type */
    fileType?: string;
    /** Document Template Variable */
    templateVariable?: string;
    /** Document Template Description */
    description?: string;
    /** Document Template CreatedBy */
    createdBy?: string;
    /** Document Template ModifiedBy */
    modifiedBy?: string;
    /**
     * Document Template CreatedDate
     * @format date-time
     */
    createdDate?: string;
    /**
     * Document Template ModifiedDate
     * @format date-time
     */
    modifiedDate?: string;
    /** @format binary */
    file?: File;
    fileTypes?: string[];
    createdBys?: string[];
    variables?: Record<string, object>;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface SortObject {
    sorted?: boolean;
    empty?: boolean;
    unsorted?: boolean;
}

/** Document Template ResponseDTO */
export interface DocumentTemplateResponseDTO {
    /** id */
    id?: string;
    /** Document Template Name */
    name?: string;
    /** Nuxeo Document Id */
    documentId?: string;
    /** Document Template File Type */
    fileType?: string;
    /** Document Template Variable */
    templateVariable?: string;
    /** Document Template Description */
    description?: string;
    /** Document Template CreatedBy */
    createdBy?: string;
    /** Document Template ModifiedBy */
    modifiedBy?: string;
    /**
     * Document Template CreatedDate
     * @format date-time
     */
    createdDate?: string;
    /**
     * Document Template ModifiedDate
     * @format date-time
     */
    modifiedDate?: string;
}

export interface ResultDocumentTemplateResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document Template ResponseDTO */
    data?: DocumentTemplateResponseDTO;
}

/** RetentionPolicy event */
export interface RetentionPolicyEvent {
    /** @format int64 */
    id?: number;
    /** @format int64 */
    policyRetentionId?: number;
    eventType?: string;
    eventLabel?: string;
    eventValue?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

/** Retention Policy RequestDTO */
export interface RetentionPolicyRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /**
     * RetentionPolicy ID
     * @format int64
     */
    id?: number;
    /** the name of retention policy */
    policyName?: string;
    /** the status of retention policy */
    status?: string;
    /** Is Auto */
    isAuto?: boolean;
    /** the approval user */
    approvalId?: string;
    /**
     * the period number
     * @format int32
     */
    periodNum?: number;
    /** the period unit */
    periodUnit?: string;
    /** the action type */
    actionType?: string;
    /**
     * the action delay day
     * @format int32
     */
    actionDelayDay?: number;
    /** RetentionPolicy trigger list */
    triggers?: RetentionPolicyTrigger[];
    /** RetentionPolicy event */
    events?: RetentionPolicyEvent[];
    /** Document Type list */
    documentTypes?: string[];
    /** ApprovalId list */
    approvalIds?: string[];
    /** the list of retention policy id */
    ids?: number[];
    sort?: SortObject;
    descSort?: SortObject;
}

/** RetentionPolicy trigger list */
export interface RetentionPolicyTrigger {
    /** @format int64 */
    id?: number;
    /** @format int64 */
    policyRetentionId?: number;
    documentType?: string;
    triggerMetaData?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultRetentionPolicyResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Retention Policy ResponseDTO */
    data?: RetentionPolicyResponseDTO;
}

/** Retention Policy ResponseDTO */
export interface RetentionPolicyResponseDTO {
    /**
     * RetentionPolicy ID
     * @format int64
     */
    id?: number;
    /** the name of retention policy */
    policyName?: string;
    /** the status of retention policy */
    status?: string;
    /** Is Auto */
    isAuto?: boolean;
    /** the approval user */
    approvalId?: string;
    /**
     * the period number
     * @format int32
     */
    periodNum?: number;
    /** the period unit */
    periodUnit?: string;
    /** the action type */
    actionType?: string;
    /**
     * the action delay day
     * @format int32
     */
    actionDelayDay?: number;
    /** RetentionPolicy trigger list */
    triggers?: RetentionPolicyTrigger[];
    /** RetentionPolicy event */
    events?: RetentionPolicyEvent[];
}

export interface HoldPolicy {
    /** @format int64 */
    id?: number;
    policyName?: string;
    isHoldAuto?: boolean;
    isHoldReasonReq?: boolean;
    holdApprovalId?: string;
    isRemoveAuto?: boolean;
    isRemoveReasonReq?: boolean;
    removeApprovalId?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultHoldPolicy {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: HoldPolicy;
}

export interface PersonalDashboardRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** @format int64 */
    id?: number;
    name?: string;
    groupId?: string;
    styleJson?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface MasterTable {
    id?: string;
    name?: string;
    status?: string;
    tableName?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultBoolean {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: boolean;
}

/** Relation Record */
export interface MTRecordDTO {
    /** Table Id */
    tableId?: string;
    /** Record Id */
    recordId?: string;
    /** Record Data List */
    data?: Record<string, object>;
}

/** Master Table Record RequestDTO */
export interface MTRecordRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Master Table ID */
    id?: string;
    /** Master Table Name */
    name?: string;
    /** Master Table Status */
    status?: boolean;
    /** Query Keyword Condition */
    q?: string;
    /** Record Data List */
    data?: Record<string, object>[];
    /** Where Condition */
    where?: Record<string, object>;
    /** In Condition */
    in?: Record<string, object>;
    /** Relation Record */
    relationRecords?: MTRecordDTO[];
    sort?: SortObject;
    descSort?: SortObject;
}

export interface EasyFormResult {
    /** Action Item Id */
    id?: string;
    /** Action Type, Example value： Email、Workflow、CaseType  */
    actionType?: string;
    /** Bound business Key, Example value：customApproval */
    actionKey?: string;
    /** DeploymentId of Bound business, Example value：customApproval:1:7212b388-36f3-4aff-9b03-bc500537dd23 */
    actionId?: string;
    /** Name of Bound business */
    actionName?: string;
    /** Status, Active or Deactivated */
    status?: string;
    /** Mapping data structure between form columns and bound business fields */
    dataMapping?: ParamMappingDTO[];
    /** Email Subject */
    subject?: string;
    /** Email Body Text */
    text?: string;
    /** Email TO */
    to?: string;
    /** Email CC */
    cc?: string;
    /** Email BCC */
    bcc?: string;
}

/** Mapping data structure between form columns and bound business fields */
export interface ParamMappingDTO {
    source?: string;
    target?: string;
}

/** DAM setting. (Request) */
export interface DAMConversionSettingRequestDTO {
    /**
     * id
     * @format int64
     */
    id?: number;
    /** name */
    name?: string;
    /** sourceType */
    sourceType?: string;
    /** targetType */
    targetType?: string;
    /** label */
    label?: string;
    /** operation */
    operation?: string;
}

export interface CaseType {
    id?: string;
    name?: string;
    uniqueName?: string;
    caseIdPrefix?: string;
    /** @format int32 */
    caseIdDigit?: number;
    /** @format int32 */
    startNumber?: number;
    enable?: boolean;
    publishStatus?: string;
    primaryForm?: string;
    productionVersion?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    caseDefinitionKey?: string;
    caseDefinitionId?: string;
    latestVersion?: string;
}

export interface ResultCaseType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseType;
}

export interface CmmnDashboard {
    id?: string;
    caseTypeId?: string;
    deploymentId?: string;
    cmmnVersionId?: string;
    label?: string;
    userGroup?: string;
    status?: string;
    styleJson?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultCmmnDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnDashboard;
}

/** Case model dashboard (RequestDTO) */
export interface CmmnDashboardRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    id?: string;
    caseTypeId?: string;
    label?: string;
    userGroup?: string;
    versionNumber?: string;
    styleJson?: string;
    q?: string;
    businessKey?: string;
    status?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

/** Calendar (Request) */
export interface CalendarTaskReq {
    /** Task ID */
    taskId?: string;
    /** Task Description */
    title?: string;
    /** Operate User */
    operator?: string;
    /**
     * Start Time
     * @format date-time
     */
    startTime?: string;
    /**
     * End Time
     * @format date-time
     */
    endTime?: string;
    /** Task Category */
    category?: string;
    /** Task Assignee */
    assignee?: string;
    /** Task Location */
    location?: string;
    /**
     * Task Level
     * @format int32
     */
    level?: number;
    /** Task Status */
    status?: string;
    /** Task Remark */
    remark?: string;
    /** Business ID */
    bizId?: string;
    /** ID */
    id?: string;
    /** Event ID */
    eventId?: string;
    /** Event Name */
    eventName?: string;
    /** Action Type[Create/Edit/Cancel/Remove] */
    actionType?: string;
    /** Event all day */
    isAllDay?: boolean;
    /** Business Data */
    bizData?: Record<string, object>;
    /** Event Related User */
    relatedUsers?: Record<string, object>;
    /** Event Related Case */
    relatedCases?: Record<string, object>;
    /** Event Related Workflow */
    relatedWorkflows?: Record<string, object>;
    /** Reminder Providers */
    reminders?: TaskReminder[];
    /** Fuzzy Search */
    q?: string;
    /** Where AND Condition */
    where?: Record<string, object>;
    users?: string[];
    processKeys?: string[];
    caseKeys?: string[];
}

export interface EmailReminder {
    emailTemplateId?: string;
    receiverType?: string;
    from?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    variables?: Record<string, object>;
}

/** Reminder Providers */
export interface TaskReminder {
    id?: string;
    taskId?: string;
    reminderType?: string;
    /** @format int32 */
    intervalTime?: number;
    reminderJson?: string;
    createdBy?: string;
    /** @format date-time */
    createdDate?: string;
    modifiedBy?: string;
    /** @format date-time */
    modifiedDate?: string;
    whatsApp?: WhatsApp;
    emailReminder?: EmailReminder;
}

export interface WhatsApp {
    phoneNumber?: string;
    content?: string;
}

/** Calendar Task ResponseDTO */
export interface CalendarTaskRespDTO {
    /** ID */
    id?: string;
    /** Event ID */
    eventId?: string;
    /** Event Name */
    eventName?: string;
    /** Action Type */
    actionType?: string;
    /** Event all day */
    isAllDay?: boolean;
    /** Event Related Users */
    relatedUsers?: Record<string, object>;
    /** Event Related Case */
    relatedCases?: Record<string, object>;
    /** Event Related Workflow */
    relatedWorkflows?: Record<string, object>;
    taskId?: string;
    title?: string;
    location?: string;
    /** @format date-time */
    startTime?: string;
    /** @format date-time */
    endTime?: string;
    bizId?: string;
    category?: string;
    assignee?: string;
    status?: string;
    /** @format int32 */
    level?: number;
    remark?: string;
    createdBy?: string;
    /** @format date-time */
    createdDate?: string;
    modifiedBy?: string;
    /** @format date-time */
    modifiedDate?: string;
    assigneeName?: string;
    reminders?: TaskReminder[];
}

export interface ResultCalendarTaskRespDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Calendar Task ResponseDTO */
    data?: CalendarTaskRespDTO;
}

export interface AzureOcrSettingDTO {
    cutOffTime?: string;
    /** @format int32 */
    readThreshold?: number;
    /** @format int32 */
    preBuildThreshold?: number;
    /** @format int32 */
    customModelThreshold?: number;
    alertEmail?: string;
    emailTemplate?: string;
}

export interface ProfileMappingRequestDTO {
    /** @format int64 */
    id?: number;
    name?: string;
    scanProfile?: string;
    normalizeSetting?: string;
    status?: string;
}

export interface AzureOcrApiKeyDTO {
    apiKey?: string;
    description?: string;
}

export interface WorkflowInstanceDTO {
    processDefinitionKey?: string;
    creator?: string;
    messageName?: string;
    businessKey?: string;
    instanceId?: string;
    startTime?: string;
    state?: string;
    inputData?: {
        empty?: boolean;
        innerMap?: Record<string, object>;
        [key: string]: any;
    };
    variables?: {
        empty?: boolean;
        innerMap?: Record<string, object>;
        [key: string]: any;
    };
    dateFormatVariables?: string[];
}

export interface WorkflowInstanceRequest {
    currWorkflowInstance?: WorkflowInstanceDTO;
    nextWorkflowInstance?: WorkflowInstanceDTO;
}

export interface VerificationPermissionReq {
    key?: string;
    userId?: string;
    businessId?: string;
    businessType?: string;
    operation?: string;
}

export interface AuditLogRequestDTO {
    collapseField?: string;
    mustFilterMap?: Record<string, string>;
    wildcardFilterMap?: Record<string, string>;
    sourceIncludes?: string[];
    sourceExcludes?: string[];
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    orderBy?: string;
    isDesc?: boolean;
}

/** Define audit template */
export interface AuditTemplateDTO {
    id?: string;
    eventId?: string;
    nuxeoEventId?: string;
    documentId?: string;
    comment?: string;
    docPath?: string;
    docType?: string;
    eventType?: string;
    eventCategory?: string;
    /** @format date-time */
    createTime?: string;
    /** @format date-time */
    updateTime?: string;
    eventDateFrom?: string;
    eventDateTo?: string;
    principalName?: string;
    creators?: string[];
    businessNames?: string[];
    collapseField?: string;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    orderBy?: string;
    isDesc?: boolean;
    excludeUser?: string;
}

export interface PaginationDTOAuditTemplateDTO {
    entryList?: AuditTemplateDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOAuditTemplateDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOAuditTemplateDTO;
}

export interface AuditModel {
    /** @format int64 */
    id?: number;
    principalName?: string;
    eventId?: string;
    eventDate?: string;
    logDate?: string;
    docUUID?: string;
    docType?: string;
    docPath?: string;
    category?: string;
    comment?: string;
    docLifeCycle?: string;
    repositoryId?: string;
    preprocessedComment?: string;
    entity__type?: string;
    extended?: Record<string, object>;
}

/** Define information of user related permission that access control permission */
export interface AclUserPermission {
    id?: string;
    /** the id of acl user or user group */
    belongTo: string;
    /** the type of business, may be from business sub project */
    belongType: "U" | "G";
    /** the id of business, may be from business sub project */
    businessId: string;
    /** the type of business, may be from business sub project */
    businessType: "F" | "D" | "MT";
    /** the name of access control permission */
    aces: string;
    /** the scope of permission */
    scope: "local" | "inherited";
    /**
     * begin date
     * @format date-time
     */
    begin?: string;
    /**
     * end date
     * @format date-time
     */
    end?: string;
    /** Delete flag */
    deleteFlag: "YES" | "NO";
}

export interface ResultAclUserPermission {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Define information of user related permission that access control permission */
    data?: AclUserPermission;
}

/** Define access control permission */
export interface AccessControlPermission {
    id?: string;
    /**
     * 名称
     * @example "Everything"
     */
    name: string;
    /** 类型 */
    type?: "System" | "Document";
    /** The id of access control entry */
    permissionEntryId: string;
    /** Permission status */
    state: "VALID" | "INVALID";
    /**
     * Delete flag
     * @example "NO"
     */
    deleteFlag: "YES" | "NO";
    /** created user id */
    createdBy: string;
    /** modified user id */
    modifiedBy: string;
    /**
     * Created date
     * @format date-time
     */
    createdDate: string;
    /**
     * modified date
     * @format date-time
     */
    modifiedDate: string;
}

export interface ResultAccessControlPermission {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Define access control permission */
    data?: AccessControlPermission;
}

export interface ResultListAccessControlPermission {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AccessControlPermission[];
}

export interface ResultListString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: string[];
}

/** Define access control entry */
export interface AccessControlEntry {
    id?: string;
    /**
     * 名称
     * @example "Write"
     */
    name: string;
    /**
     * 标签
     * @example "Write"
     */
    label?: string;
    /** 类型 */
    type?: "System" | "Document";
    /** 是否删除的标记 */
    deleteFlag?: "YES" | "NO";
    /**
     * 创建者
     * @example "Administrator"
     */
    createdBy?: string;
    /**
     * 更新者
     * @example "Administrator"
     */
    modifiedBy?: string;
    /**
     * Created Date
     * @format date-time
     */
    createdDate?: string;
    /**
     * Modified Date
     * @format date-time
     */
    modifiedDate?: string;
}

export interface AclPermissionDTO {
    id?: string;
    /**
     * 名称
     * @example "Everything"
     */
    name: string;
    /** 类型 */
    type?: "System" | "Document";
    /** The id of access control entry */
    permissionEntryId: string;
    /** Permission status */
    state: "VALID" | "INVALID";
    /**
     * Delete flag
     * @example "NO"
     */
    deleteFlag: "YES" | "NO";
    /** created user id */
    createdBy: string;
    /** modified user id */
    modifiedBy: string;
    /**
     * Created date
     * @format date-time
     */
    createdDate: string;
    /**
     * modified date
     * @format date-time
     */
    modifiedDate: string;
    permissionEntrys?: AccessControlEntry[];
}

export interface ResultAclPermissionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AclPermissionDTO;
}

/** Define information of user that access control */
export interface AclUserInformation {
    id?: string;
    /** user id */
    userId: string;
    /** user name */
    username: string;
    /** user first name */
    firstName: string;
    /** user last name */
    lastName: string;
    /** email */
    email?: string;
    /** password */
    password: string;
    /** tenant id */
    tenantId?: string;
    /** source */
    source?: string;
    /** status */
    status?: string;
    properties?: Record<string, object>;
    /**
     * Delete flag
     * @example "NO"
     */
    deleteFlag: "YES" | "NO";
    /** created user id */
    createdBy: string;
    /** modified user id */
    modifiedBy: string;
    /**
     * Created date
     * @format date-time
     */
    createdDate: string;
    /**
     * modified date
     * @format date-time
     */
    modifiedDate: string;
}

export interface ResultAclUserInformation {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Define information of user that access control */
    data?: AclUserInformation;
}

/** Define relationship between acl user group with acl user */
export interface AclUserRelationshipWithUserGroup {
    id?: string;
    /** the id of acl user */
    userId: string;
    /** the id of acl user group */
    groupId: string;
    /**
     * Delete flag
     * @example "NO"
     */
    deleteFlag: "YES" | "NO";
}

/** Define information of user group that access control */
export interface AclUserGroup {
    id?: string;
    /**
     * user group name
     * @example "ITSales"
     */
    groupName: string;
    /**
     * user group label
     * @example "IT sale dept"
     */
    groupLabel?: string;
    /**
     * Delete flag
     * @example "NO"
     */
    deleteFlag: "YES" | "NO";
    /** created user id */
    createdBy: string;
    /** modified user id */
    modifiedBy: string;
    /**
     * Created date
     * @format date-time
     */
    createdDate: string;
    /**
     * modified date
     * @format date-time
     */
    modifiedDate: string;
}

export interface ResultAclUserGroup {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Define information of user group that access control */
    data?: AclUserGroup;
}

export interface AclUserGroupDTO {
    id?: string;
    /**
     * user group name
     * @example "ITSales"
     */
    groupName: string;
    /**
     * user group label
     * @example "IT sale dept"
     */
    groupLabel?: string;
    /**
     * Delete flag
     * @example "NO"
     */
    deleteFlag: "YES" | "NO";
    /** created user id */
    createdBy: string;
    /** modified user id */
    modifiedBy: string;
    /**
     * Created date
     * @format date-time
     */
    createdDate: string;
    /**
     * modified date
     * @format date-time
     */
    modifiedDate: string;
    users?: AclUserInformation[];
}

export interface ResultAccessControlEntry {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Define access control entry */
    data?: AccessControlEntry;
}

/** Vocabulary Entry */
export interface VocabularyEntryRequestDTO {
    /** Entry ID */
    id?: string;
    /** Entry Label */
    label?: string;
    /** Select the id of one of the entries in the parent vocabulary, required for Child Vocabulary and Hierarchical Vocabulary Creation */
    parentEntryID?: string;
    /**
     * Ordering of entries，only valid for simple vocabulary entries
     * @format int32
     */
    order?: number;
    /** Select true if the Entry is obsolete */
    obsolete?: boolean;
}

/** User batch active params */
export interface UserBatchActiveDTO {
    /** acl_user ids */
    ids?: string[];
    /** keycloak user ids */
    userIds?: string[];
    /** active A/D */
    active?: string;
}

/** Policy (Versioning Configuration) */
export interface VersioningPolicyRequestDTO {
    /** A unique id which allows to override default policies */
    policyId?: string;
    /** The increment policy (between NONE, MINOR or MAJOR) */
    increment?: string;
    /** If the versioning has to be applied before or after the actual modification */
    beforeUpdate?: boolean;
    /**
     * The order in which the policy should be taken into account related to other policies.
     * @format int32
     */
    order?: number;
    /** Filters state whether or not document needs to be versioned. */
    filterIds?: string[];
}

/** Filter (Versioning Configuration) */
export interface VersioningFilterRequestDTO {
    /** The Filter Id */
    id?: string;
    /** On which document type the versioning applies */
    types?: string[];
    /** Apply the versioning if the document contains this schema */
    schemas?: string[];
    /** Apply the versioning if the document contains this facet */
    facets?: string[];
    /** Defines a condition in EL to access properties of the document before/after modification */
    conditions?: string[];
}

/** Vocabulary (Request) */
export interface VocabularyRequestDTO {
    /** Vocabulary ID */
    id?: string;
    /** Vocabulary Type */
    type?: string;
    /** Select an existing vocabulary as the parent if create a child vocabulary. */
    parentID?: string;
    /** The entries in the vocabulary */
    vocabularyEntries?: VocabularyEntryRequestDTO[];
    /** Table Creation Policy */
    tableCreationPolicy?: string;
}

export interface ResultListVocabularyDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: VocabularyDTO[];
}

/** Nuxeo Vocabulary */
export interface VocabularyDTO {
    /** Vocabulary ID */
    id?: string;
    /** Vocabulary Type */
    type?: string;
    /** Parent Vocabulary */
    parent?: string;
    /** The entries in the vocabulary */
    vocabularyEntries?: VocabularyEntryDTO[];
    /** Table Creation Policy */
    tableCreationPolicy?: string;
    /** Is Local Vocabulary */
    isLocalVocabulary?: boolean;
}

/** Vocabulary Entry */
export interface VocabularyEntryDTO {
    /** Entry ID */
    id?: string;
    /** Entry Label */
    label?: string;
    /** Select the id of one of the entries in the parent vocabulary, required for Child Vocabulary and Hierarchical Vocabulary Creation */
    parentEntryID?: string;
    /**
     * Ordering of entries，only valid for simple vocabulary entries
     * @format int32
     */
    order?: number;
    /** Select true if the Entry is obsolete */
    obsolete?: boolean;
}

/** Directory Field Type (Request) */
export type DirectoryFieldTypeRequestDTO = FieldTypeRequestDTO & {
    /** Directory Name */
    directoryName?: string;
};

/** Document Field Type (Request) */
export type DocumentFieldTypeRequestDTO = FieldTypeRequestDTO & {
    /** Value Stored */
    valueStored?: string;
};

/** Field (Request) */
export interface FieldRequestDTO {
    /** Field Label */
    label?: string;
    fieldType?:
        | FieldTypeRequestDTO
        | DirectoryFieldTypeRequestDTO
        | DocumentFieldTypeRequestDTO
        | UserGroupFieldTypeRequestDTO;
    /** Is Multi Values */
    isMultiValue?: boolean;
    /** Default Value */
    defaultValue?: string;
    /** Only For Complex Type */
    subFields?: Record<string, FieldRequestDTO>;
}

/** Field Type (Request) */
export interface FieldTypeRequestDTO {
    /** Type */
    type?: string;
    /** Field Type Id */
    fieldTypeId?: string;
}

/** Schema (Request) */
export interface SchemaRequestDTO {
    /** Schema ID */
    id?: string;
    /** Schema Prefix */
    prefix?: string;
    /** Fields */
    fields?: Record<string, FieldRequestDTO>;
}

/** User/Group Field Type (Request) */
export type UserGroupFieldTypeRequestDTO = FieldTypeRequestDTO & {
    /** Can contain */
    canContain?: string;
};

/** Document Type (Request) */
export interface DocumentTypeRequestDTO {
    /** Document Type ID */
    id?: string;
    /** Document Type Label */
    label?: string;
    /** The super type of this document type. Inherit from File or from Folder or else. */
    inheritType?: string;
    /** Container Types */
    containerTypes?: string[];
    /** Accepted Children Type */
    childTypes?: string[];
    /** Add extra schemas to this document type. */
    extraSchemas?: string[];
    /** Add custom schema */
    customSchema?: Record<string, FieldRequestDTO>;
}

/** EasyShare (Request) */
export interface SharePageRequestDTO {
    /**
     * page
     * @format int32
     */
    page?: number;
    /**
     * size
     * @format int32
     */
    size?: number;
    /** orderByAsc */
    orderByAsc?: string;
    /** orderByDesc */
    orderByDesc?: string;
    /** searchKey */
    searchKey?: string;
}

export interface ResultMapObjectObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object>;
}

/** SmartFolder RequestDTO */
export interface SmartFolderRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    id?: string;
    name?: string;
    bind?: string;
    json_value?: string;
    userGroupIds?: string[];
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOSmartFolderResponseDTO {
    entryList?: SmartFolderResponseDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOSmartFolderResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOSmartFolderResponseDTO;
}

/** Smart Folder */
export interface SmartFolderResponseDTO {
    id?: string;
    name?: string;
    bind?: string;
    json_value?: string;
    userGroups?: string[];
}

export interface ElasticSearchFilterDTO {
    documentTypes?: string[];
    collections?: string[];
    tags?: string[];
    creators?: string[];
    authors?: string[];
    createdDate?: string;
    modified?: string;
}

export interface MatchDTO {
    queryType?: string;
    type?: string;
    value?: object;
    option?: OptionDTO;
}

export interface OptionDTO {
    matchCase?: boolean;
    fullMatch?: boolean;
    synonyms?: boolean;
    includeLanguages?: string[];
}

export interface QueryConditionDTO {
    condition?: string;
    matchs?: MatchDTO[];
}

export interface SearchRequestDTO {
    condition?: string;
    docId?: string;
    /** @format int32 */
    pageSize?: number;
    /** @format int32 */
    currentPageIndex?: number;
    isExport?: boolean;
    filter?: ElasticSearchFilterDTO;
    query?: QueryConditionDTO[];
}

export interface ResultMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object>;
}

/** NestedSearch (Request) */
export interface NestedSearchRequestDTO {
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /**
     * Current Page Index
     * @format int32
     */
    currentPageIndex?: number;
    /** type */
    type?: string[];
    /** query params in text search */
    paramsInTextSearch?: string[];
    /** Include full text search,all meta or ocr content */
    textSearchType?: string;
    /** like */
    like?: string[];
    /** tags */
    tags?: string[];
    /** collections */
    collections?: string[];
    /** or */
    or?: string[];
    /** authors */
    authors?: string[];
    /** creator */
    creator?: string[];
    /** modified */
    modified?: string;
    /**
     * size
     * @format int32
     */
    size?: number;
    /** assetType */
    assetType?: string;
    /** duration */
    duration?: string[];
    /** mimeType */
    mimeType?: string[];
    /** height */
    height?: string[];
    /** width */
    width?: string[];
    /** includeFolder */
    includeFolder?: boolean;
    /** Document Properties */
    properties?: Record<string, object>;
    /** @uniqueItems true */
    orderList?: string[];
    emailId?: string;
    isExport?: boolean;
    orderBy?: string;
    isDesc?: boolean;
}

export interface PaginationDTODocumentDTO {
    entryList?: DocumentDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTODocumentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTODocumentDTO;
}

/** Versioning (Request) */
export interface VersioningRequestDTO {
    /** Document ID or Path */
    idOrPath?: string;
    /** Version Number */
    versionNum?: string;
    /** Increment */
    increment?: string;
}

export interface ResultDocumentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document */
    data?: DocumentDTO;
}

/** Batch delete users */
export interface BatchDeleteUserDTO {
    /** keycloak user ids */
    userIds?: string[];
}

/** Batch delete users */
export interface BatchAddUsersToGroupsDTO {
    /** keycloak user ids */
    userIds?: string[];
    /** groups ids */
    groupIds?: string[];
}

export interface ResultListUserDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: UserDTO[];
}

/** Batch add groups to user */
export interface UserBatchAddGroupsDTO {
    /** acl_user id */
    userId?: string;
    /** group ids */
    groupIds?: string[];
}

export interface ResultListGroupDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: GroupDTO[];
}

/** Batch add users to group */
export interface GroupBatchAddUsersDTO {
    /** groupId */
    groupId?: string;
    /** keycloak user ids */
    userIds?: string[];
}

export interface ResultGroupDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Group */
    data?: GroupDTO;
}

export interface ResultMapStringInstant {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, string>;
}

/** Document (Request) */
export interface DocumentRequestDTO {
    /** Document ID or Path */
    idOrPath?: string;
    /** Document Name */
    name?: string;
    /** Document Creator */
    creator?: string;
    /** Document Type */
    type?: string;
    /** Document Properties */
    properties?: Record<string, object>;
    /** Document Language */
    languages?: string[];
    /**
     * Page Number
     * @format int32
     */
    pageNumber?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** File Type */
    fileType?: string;
    emailId?: string;
    /** FolderCabinet Template Id */
    templateId?: string;
    /** Every level folder cabinet template Id */
    layoutId?: string;
    oldDocPalType?: string;
    title?: string;
}

/** Document (Request) */
export interface DocumentRequestForVirtureFolderDTO {
    /** Document ID or Path */
    idOrPath?: string;
    /** Document Name */
    name?: string;
    /** Document Creator */
    creator?: string;
    /** Document Type */
    type?: string;
    /** Document Properties */
    properties?: Record<string, object>[];
    /** Document Language */
    languages?: string[];
    /** Page Number */
    pageNumber?: string;
    /** Page Size */
    pageSize?: string;
    /** File Type */
    fileType?: string;
}

export interface PaginationDTOVirtualFolderDocumentDTO {
    entryList?: VirtualFolderDocumentDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOVirtualFolderDocumentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOVirtualFolderDocumentDTO;
}

/** Document */
export interface VirtualFolderDocumentDTO {
    /** Document ID */
    id?: string;
    /** Document Name */
    name?: string;
    /** Document Description */
    description?: string;
    /** Document Path */
    path?: string;
    /** Document Type */
    type?: string;
    /** Document Version */
    version?: string;
    /** Document Creator */
    createdBy?: string;
    /**
     * Document Created Date
     * @format date-time
     */
    createdDate?: string;
    /**
     * Docuemnt Modification Date
     * @format date-time
     */
    modifiedDate?: string;
    /** Is Document Folder */
    isFolder?: boolean;
    /** Is Document Checked Out */
    isCheckedOut?: boolean;
    /** Document Properties */
    properties?: Record<string, object>;
    /** parentRef */
    parentRef?: string;
    /** logicalPath */
    logicalPath?: string;
    vfConfigType?: object;
}

export interface AuditTemplateResponseExtendDTO {
    /** @format int64 */
    id?: number;
    label?: string;
    eventId?: string;
    nuxeoEventId?: string;
    documentId?: string;
    comment?: string;
    docPath?: string;
    docType?: string;
    eventType?: string;
    eventCategory?: string;
    /** @format date-time */
    eventDate?: string;
    envetDateStr?: string;
    principalName?: string;
    extended?: Record<string, object>;
    currentPath?: string;
    logicalPath?: string;
}

export interface PaginationDTOAuditTemplateResponseExtendDTO {
    entryList?: AuditTemplateResponseExtendDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOAuditTemplateResponseExtendDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOAuditTemplateResponseExtendDTO;
}

export interface DuplicateNameRequestDTO {
    /** @uniqueItems true */
    titles?: string[];
    path?: string;
}

export interface DuplicateNameDTO {
    titles?: Record<string, DuplicateNameDetailDTO>;
    path?: string;
    /** @format int32 */
    size?: number;
    hasDuplicateTitle?: boolean;
}

export interface DuplicateNameDetailDTO {
    idOrPath?: string;
    uniqueName?: string;
}

export interface ResultDuplicateNameDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DuplicateNameDTO;
}

/** Document */
export interface DocumentThumbnailDTO {
    /** Document ID */
    id?: string;
    /** Document Name */
    name?: string;
    /** Document Path */
    path?: string;
    /** Is Document Folder */
    isFolder?: boolean;
    /** Document lastModified */
    modifiedDate?: string;
    /** Document create date */
    createdDate?: string;
    mimeType?: string;
    documentType?: string;
    docPalType?: string;
    contributors?: string[];
    tags?: string[];
    version?: string;
    collections?: Record<string, string>[];
}

export interface PaginationDTODocumentThumbnailDTO {
    entryList?: DocumentThumbnailDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTODocumentThumbnailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTODocumentThumbnailDTO;
}

/** Access Control Entry */
export interface AccessControlEntryDTO {
    /** Access Control Entry ID */
    id?: string;
    /** User ID */
    userId?: string;
    /** User Permission */
    permission?: string;
    /** Granted By */
    grarntedBy?: string;
    /**
     * Start Date
     * @format date-time
     */
    startDate?: string;
    /**
     * End Date
     * @format date-time
     */
    endDate?: string;
}

/** Access Control List */
export interface AccessControlListDTO {
    /** Access Control Name */
    name?: string;
    /** Access Control Entries */
    aces?: AccessControlEntryDTO[];
}

export interface ResultListAccessControlListDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AccessControlListDTO[];
}

export interface ResultListVirtualFolderSettingResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: VirtualFolderSettingResponseDTO[];
}

export interface BusinessResultRecord {
    /** @format int64 */
    id?: number;
    messageId?: string;
    idOrPath?: string;
    userId?: string;
    businessId?: string;
    fileName?: string;
    filePath?: string;
    /** @format int64 */
    fileSize?: number;
    logicalPath?: string;
    category?: "OCR" | "PDF" | "CONVERSION" | "DAM" | "OTHER" | "EXTRACT";
    status: "CREATE" | "PENDING" | "COMPLETED" | "FINISH" | "ERROR" | "PENDING_FOR_SENDING_MESSAGE";
    operation?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    lastUpdateDate?: string;
    /** @format date-time */
    startDate?: string;
    /** @format date-time */
    endDate?: string;
    errorCode?: string;
    errorMsg?: string;
    /** @format int64 */
    reSubmitCount?: number;
}

export interface PageBusinessResultRecord {
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    /** @format int32 */
    number?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    numberOfElements?: number;
    content?: BusinessResultRecord[];
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    pageable?: PageableObject;
    empty?: boolean;
}

export interface PageableObject {
    paged?: boolean;
    unpaged?: boolean;
    /** @format int32 */
    pageNumber?: number;
    /** @format int32 */
    pageSize?: number;
    /** @format int64 */
    offset?: number;
    sort?: SortObject;
}

export interface ResultPageBusinessResultRecord {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PageBusinessResultRecord;
}

export interface DocPalTypeMetadata {
    id?: string;
    docpalTypeId?: string;
    schemaName?: string;
    metadata?: string;
    metaDataType?: string;
    dataType?: string;
    display?: boolean;
    options?: string;
    isRequire?: boolean;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    docPalType?: string;
}

/** DocPalType (RequestDTO) */
export interface DocPalTypeRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    id?: string;
    name?: string;
    category?: string;
    dataType?: string;
    enable?: boolean;
    metadata?: DocPalTypeMetadata[];
    types?: string[];
    categories?: string[];
    createBys?: string[];
    sort?: SortObject;
    descSort?: SortObject;
}

export interface DocPalTypeResponseDTO {
    id?: string;
    name?: string;
    category?: string;
    dataType?: string;
    enable?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    metadata?: DocPalTypeMetadata[];
}

export interface ResultDocPalTypeResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeResponseDTO;
}

export interface DocPalType {
    id?: string;
    name?: string;
    category?: string;
    dataType?: string;
    enable?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface PaginationDTODocPalType {
    entryList?: DocPalType[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTODocPalType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTODocPalType;
}

export interface DocPalTypeRelated {
    id?: string;
    docPalTypeId?: string;
    rootDocPalType?: string;
    metaData?: string;
    docPalType?: string;
}

export interface ResultDocPalTypeRelated {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeRelated;
}

export interface ImportDocPalTypeDTO {
    name?: string;
    category?: string;
    dataType?: string;
    metadata?: MetadataOption[];
}

export interface MetadataOption {
    schemaName?: string;
    metadata?: string;
    dataType?: string;
    display?: boolean;
    isRequire?: boolean;
    options?: string;
}

/** DocPalType (RequestDTO) */
export interface DocPalTypeMetadataRequestDTO {
    docType?: string;
    metaData?: string;
    dataType?: string;
    display?: boolean;
    options?: string;
    isRequire?: boolean;
    status?: string;
}

export interface ProcessDefinitionDraftRequestDTO {
    /** Process Definition Draft ID */
    draftId?: string;
    /** Whether draft */
    isDraft?: boolean;
    /** Process Definition Draft Key */
    key?: string;
    /** Process Definition Draft Name */
    name?: string;
    /** Process Definition Draft Status */
    status?: string;
    /** Publish Status of process definition */
    publishStatus?: string;
    /** Process Definition Name Space */
    nameSpace?: string;
    /** Process Definition Json */
    jsonValue?: string;
    /** @format binary */
    file?: File;
    /** Email Template List */
    templateIds?: string[];
    /** Folder Cabinet Setting ID */
    folderCabinetSettingId?: string;
    /**  Permissions [Start Or View] */
    permissions?: Record<string, string>[];
    /** Process Definition Version Id */
    versionId?: string;
    /** Process Definition Version Number */
    versionNumber?: string;
}

export interface BizPermissionDTO {
    id?: string;
    permissionId?: string;
    permissionName?: string;
    licensee?: string;
}

/** Process Definition ResponseDTO */
export interface ProcessDefinitionResponseDTO {
    /** Process Definition Draft ID */
    draftId?: string;
    /** Process Definition Name */
    name?: string;
    /** Process Definition Key */
    key?: string;
    /** Process Definition Status */
    status?: string;
    /** Publish Status of process definition */
    publishStatus?: string;
    "Latest Version"?: string;
    "Production Version"?: string;
    /** Process Definition Target Name Space */
    nameSpace?: string;
    /** Process Definition ID */
    processDefinitionId?: string;
    /** Process Definition is draft */
    isDraft?: boolean;
    /** Folder Cabinet Setting ID */
    folderCabinetSettingId?: string;
    permissions?: BizPermissionDTO[];
    /** @format int32 */
    deployVersion?: number;
}

export interface ResultProcessDefinitionResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Process Definition ResponseDTO */
    data?: ProcessDefinitionResponseDTO;
}

/** Process Definition Version RequestDTO */
export interface ProcessVersionRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    id?: string;
    draftId?: string;
    versionNumber?: string;
    jsonValue?: string;
    /** @format binary */
    file?: File;
    name?: string;
    publishStatus?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOProcessDefinitionVersion {
    entryList?: ProcessDefinitionVersion[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ProcessDefinitionVersion {
    id?: string;
    draftId?: string;
    versionNumber?: string;
    productionVersion?: string;
    source?: string;
    publishStatus?: string;
    isProduction?: string;
    processDefinitionId?: string;
    processDefinitionKey?: string;
    bytes?: string[];
    jsonValue?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultPaginationDTOProcessDefinitionVersion {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOProcessDefinitionVersion;
}

export interface ResultProcessDefinitionVersion {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDefinitionVersion;
}

export interface DocumentTypeMetadataMapping {
    /** @format int64 */
    id?: number;
    name?: string;
    metaDataMapper?: string;
    /** @format int32 */
    version?: number;
    createUserId?: string;
    createUserName?: string;
    /** @format date-time */
    createTime?: string;
    updateUserId?: string;
    updateUserName?: string;
    /** @format date-time */
    updateTime?: string;
}

/** Workflow (Request) */
export interface WorkflowRequestDTO {
    /** Deployment ID */
    deploymentId?: string;
    /** Process Key */
    processKey?: string;
    /** Message Name */
    messageName?: string;
    /** Process Business Key */
    businessKey?: string;
    /** Fuzzy query process Business Key */
    businessKeyLike?: string;
    /** Process Definition Id */
    processDefinitionId?: string;
    /** Process Instance Id */
    processInstanceId?: string;
    /** creator */
    creator?: string;
    /** User ID */
    userId?: string;
    /** Task ID */
    taskId?: string;
    /** Task Delete Reason */
    deleteReason?: string;
    /**
     * Task Due Date
     * @format date-time
     */
    dueDate?: string;
    /** process Category */
    processCategory?: string;
    /** Groups */
    groups?: string[];
    /** Form Properties */
    properties?: Record<string, string>;
    /** Variables */
    variables?: Record<string, object>;
    /** Form Attachments */
    attachments?: Record<string, string>;
    /** Activity ID */
    activityId?: string;
    /**
     * Page num
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** processKeys */
    processKeys?: string[];
    /** createdDate */
    createdDate?: string[];
    /** Task Due Date */
    dueDates?: string[];
    involvedUser?: string;
    assignedUser?: string;
    candidateUser?: string;
    candidateOrAssigned?: string;
    interrelatedUserId?: string;
}

/** Process Instance */
export interface InstanceDTO {
    /** Execution Id */
    id?: string;
    /** Activity Id */
    activityId?: string;
    /** Business Key */
    businessKey?: string;
    /** Calllback Id */
    callbackId?: string;
    /** Callback Type */
    callbackType?: string;
    /** Deployment Id */
    deploymentId?: string;
    /** Description */
    description?: string;
    /** Localized Description */
    localizedDescription?: string;
    /** Localized Name */
    localizedName?: string;
    /** Name */
    name?: string;
    /** Parent Id */
    parentId?: string;
    /** Process Definition Id */
    processDefinitionId?: string;
    /** Process Definition Key */
    processDefinitionKey?: string;
    /** Process Definition Name */
    processDefinitionName?: string;
    /**
     * Process Definition Version
     * @format int32
     */
    processDefinitionVersion?: number;
    /** Process Instance Id */
    processInstanceId?: string;
    /** Process Variables */
    processVariables?: Record<string, object>;
    /** Propagated Stage Instance Id */
    propagatedStageInstanceId?: string;
    /** Reference Id */
    referenceId?: string;
    /** Reference Type */
    referenceType?: string;
    /** Root Process Instance Id */
    rootProcessInstanceId?: string;
    /** Super Execution Id */
    superExecutionId?: string;
    /**
     * Start Time
     * @format date-time
     */
    startTime?: string;
    /** Start User Id */
    startUserId?: string;
    /** Tenant Id */
    tenantId?: string;
    /** Is Ended */
    isEnded?: boolean;
    /** Is Suspended */
    isSuspended?: boolean;
}

export interface PaginationDTOTaskDTO {
    entryList?: TaskDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOTaskDTO;
}

/** Task */
export interface TaskDTO {
    /** Task ID */
    id?: string;
    /** Task Name */
    name?: string;
    /** Task Description */
    description?: string;
    /** Task Definition ID */
    taskDefinitionId?: string;
    /** Task Definition Key */
    taskDefinitionKey?: string;
    /** Task Assignee */
    assignee?: string;
    /** Task Form Key */
    formKey?: string;
    /** Task Instance ID */
    instanceId?: string;
    /** Task Parent ID */
    parentId?: string;
    /**
     * Task Creation Date
     * @format date-time
     */
    createDate?: string;
    /**
     * Task Due Date
     * @format date-time
     */
    dueDate?: string;
    /**
     * Task Claim Date
     * @format date-time
     */
    claimDate?: string;
    /** Process Instance */
    taskInstance?: InstanceDTO;
    variables?: Record<string, object>;
}

export interface ResultListTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: TaskDTO[];
}

export interface ResultTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Task */
    data?: TaskDTO;
}

export interface DocPalDocumentType {
    /** @format int64 */
    id?: number;
    name?: string;
    metaDataMapper?: Record<string, string>;
}

export interface DocPalDocumentTypeMapping {
    documentType?: DocPalDocumentType[];
}

export interface ResultListDocumentTypeMetadataMapping {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTypeMetadataMapping[];
}

export interface DocumentTypeProfileSettingRequest {
    /** @format int64 */
    id?: number;
    documentType?: string;
    profileID?: string;
    profileName?: string;
    rootPath?: string;
    folder?: Folder;
    /** @format int32 */
    version?: number;
    createUserId?: string;
    createUserName?: string;
    /** @format date-time */
    createTime?: string;
    updateUserId?: string;
    updateUserName?: string;
    /** @format date-time */
    updateTime?: string;
}

export interface Folder {
    name?: string;
    title?: string;
    folder?: Folder;
}

export interface DocumentTypeProfileSetting {
    /** @format int64 */
    id?: number;
    documentType?: string;
    profileID?: string;
    profileName?: string;
    rootPath?: string;
    folder?: string;
    /** @format int32 */
    version?: number;
    createUserId?: string;
    createUserName?: string;
    /** @format date-time */
    createTime?: string;
    updateUserId?: string;
    updateUserName?: string;
    /** @format date-time */
    updateTime?: string;
}

export interface ResultDocumentTypeProfileSetting {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTypeProfileSetting;
}

export interface WorkflowRetryManagerDTO {
    /** @format int64 */
    id?: number;
    /** @format int32 */
    tryCount?: number;
    creator?: string;
    groupId?: string;
    messageName?: string;
    businessKey?: string;
    startTime?: string;
    state?: string;
}

export interface QueryWorkflowJobRequest {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    state?: string;
    businessKey?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOWorkflowRetryManagerDTO {
    entryList?: WorkflowRetryManagerDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOWorkflowRetryManagerDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOWorkflowRetryManagerDTO;
}

/** Form Property */
export interface FormPropertyDTO {
    /** Property Key */
    id?: string;
    /** Property Name */
    name?: string;
    /** Property Type */
    type?: string;
    /** Property Value */
    value?: string;
    /** Is Property Readable */
    readable?: boolean;
    /** Is Property Required */
    required?: boolean;
    /** Is Property Writable */
    writable?: boolean;
    /** Enum Options */
    options?: Record<string, string>;
    /**
     * time
     * @format date-time
     */
    time?: string;
}

export interface ResultListFormPropertyDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FormPropertyDTO[];
}

/** Process Definition */
export interface ProcessDTO {
    /** Process ID */
    id?: string;
    /** Process Key */
    key?: string;
    /** Process Name */
    name?: string;
    /** Process Category */
    category?: string;
    /** Process Resource Name */
    resourceName?: string;
    /** Process Diagram Resource Name */
    diagramName?: string;
    /**
     * Process Version
     * @format int32
     */
    version?: number;
}

export interface ResultListProcessDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDTO[];
}

export interface ResultListInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: InstanceDTO[];
}

export interface ProcessDefinitionDraft {
    id?: string;
    key?: string;
    name?: string;
    status?: string;
    publishStatus?: string;
    latestVersion?: string;
    productionVersion?: string;
    folderCabinetSettingId?: string;
    bytes?: string[];
    jsonValue?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    folderCabinetSettingName?: string;
}

/** Workflow Process Definition RequestDTO */
export interface ProcessDefinitionRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Process Definition ID */
    id?: string;
    /** Process Definition Key */
    key?: string;
    /** Process Definition Name */
    name?: string;
    /** DeploymentId of Process Definition */
    deploymentId?: string;
    /** Process Definition Status */
    status?: string;
    /** publish Status */
    publishStatus?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOProcessDefinitionDraft {
    entryList?: ProcessDefinitionDraft[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOProcessDefinitionDraft {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOProcessDefinitionDraft;
}

export interface ConditionValidationReq {
    processDefinitionKey?: string;
    processInstanceId?: string;
    validationData?: Record<string, object>;
    conditionRules?: Record<string, string>[][];
}

export interface BasePageRequest {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOWhatsAppLogDTO {
    entryList?: WhatsAppLogDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultWhatsAppOverviewResponse {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: WhatsAppOverviewResponse;
}

export interface WhatsAppLogDTO {
    /** @format int64 */
    id?: number;
    status?: string;
    responseMessage?: string;
    /** @format date-time */
    createdDate?: string;
}

export interface WhatsAppOverviewResponse {
    whatsAppSetting?: WhatsAppSettingDTO;
    responseTime?: string;
    successPercent?: string;
    status?: string;
    whatsAppLogDTOPage?: PaginationDTOWhatsAppLogDTO;
}

export interface ResultPaginationDTOWhatsAppLogDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOWhatsAppLogDTO;
}

export interface Font {
    /**
     * @format int32
     * @min 1
     * @max 144
     */
    size?: number;
    color?: string;
    name?: string;
}

export interface Offset {
    /** @format float */
    x?: number;
    /** @format float */
    y?: number;
}

export interface WMKTemplateRequestDTO {
    id?: string;
    name: string;
    enabled?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    watermarkSettings?: WatermarkSettingsDTO[];
}

export interface WatermarkSettingsDTO {
    id?: string;
    /** @format int32 */
    order?: number;
    name?: string;
    type?: string;
    content?: string;
    contentType?: string;
    position?: string;
    offset?: Offset;
    centerOffset?: Offset;
    /** @format int32 */
    rotate?: number;
    scale?: string;
    font?: Font;
    /** @format float */
    opacity?: number;
    templateId?: string;
    enabled?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    data?: string;
}

export interface ResultWMKTemplateRequestDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: WMKTemplateRequestDTO;
}

export interface PageWatermarkSettingsTemplate {
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    /** @format int32 */
    number?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    numberOfElements?: number;
    content?: WatermarkSettingsTemplate[];
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    pageable?: PageableObject;
    empty?: boolean;
}

export interface ResultPageWatermarkSettingsTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PageWatermarkSettingsTemplate;
}

export interface WatermarkSettingsTemplate {
    id?: string;
    name?: string;
    enabled?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultWatermarkSettingsDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: WatermarkSettingsDTO;
}

/** Email Template RequestDTO */
export interface EmailTemplateRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Email Template ID */
    id?: string;
    /** The status of Email Template */
    status?: string;
    /** The email subject or name */
    subject?: string;
    /** The email template label */
    label?: string;
    /**
     * Email Layout ID
     * @format int64
     */
    emailLayoutId?: number;
    /** Email Template JSON */
    emailTemplateJson?: string;
    /** Email Template Variable */
    emailTemplateVariable?: string;
    /** The email recipient's key */
    to?: string;
    from?: string;
    /** The email cc's key */
    cc?: string;
    /** The email bcc's key */
    bcc?: string;
    /** The email main body */
    body?: string;
    /** Email Template Created By */
    createdBy?: string;
    /** Email Template Modified By */
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** Email Layout ID List */
    emailLayoutIds?: number[];
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOEmailTemplate {
    entryList?: EmailTemplate[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOEmailTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOEmailTemplate;
}

export interface MailSendRequest {
    fromEmail?: string;
    to?: string;
    tos?: string[];
    ccs?: string[];
    bcc?: string[];
    subject?: string;
    text?: string;
    templateId?: string;
    variables?: Record<string, object>;
    files?: File[];
    accessToken?: string;
}

/** Email Layout RequestDTO */
export interface EmailLayoutRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /**
     * Email Layout ID
     * @format int64
     */
    id?: number;
    /** Email Layout Name */
    name?: string;
    /** The status of Email Layout */
    status?: string;
    /** Email Layout Layout Content */
    layoutContent?: string;
    /** Email Layout Created By */
    createdBy?: string;
    /** Email Layout Modified By */
    modifiedBy?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOEmailLayout {
    entryList?: EmailLayout[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOEmailLayout {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOEmailLayout;
}

export interface DocumentTemplate {
    id?: string;
    name?: string;
    documentId?: string;
    fileType?: string;
    templateVariable?: string;
    description?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface PaginationDTODocumentTemplate {
    entryList?: DocumentTemplate[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTODocumentTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTODocumentTemplate;
}

export interface LanguageEntity {
    /** @format int64 */
    id?: number;
    locale?: string;
    languageKey?: string;
    languageContent?: string;
}

export interface ResultLanguageEntity {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: LanguageEntity;
}

export interface FormPropertiesRelation {
    /** @format int64 */
    id?: number;
    processKey?: string;
    userTaskId?: string;
    jsonValue?: string;
    versionId?: string;
}

export interface ErrorEnumEntity {
    /** @format int64 */
    id?: number;
    language?: string;
    /** @format int32 */
    errorCode?: number;
    errorMessage?: string;
    createUserId?: string;
    createUserName?: string;
    /** @format date-time */
    createTime?: string;
    updateUserId?: string;
    updateUserName?: string;
    /** @format date-time */
    updateTime?: string;
}

export interface ErrorEnumEntityDTO {
    /** @format int64 */
    id?: number;
    language?: string;
    /** @format int32 */
    errorCode?: number;
    errorMessage?: string;
    createUserId?: string;
    createUserName?: string;
    /** @format date-time */
    createTime?: string;
    updateUserId?: string;
    updateUserName?: string;
    /** @format date-time */
    updateTime?: string;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    entity?: ErrorEnumEntity;
}

export interface PaginationDTORetentionPolicy {
    entryList?: RetentionPolicy[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTORetentionPolicy {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTORetentionPolicy;
}

export interface RetentionPolicy {
    /** @format int64 */
    id?: number;
    policyName?: string;
    isAuto?: boolean;
    approvalId?: string;
    /** @format int32 */
    periodNum?: number;
    periodUnit?: string;
    actionType?: string;
    /** @format int32 */
    actionDelayDay?: number;
    status?: string;
    lastModifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** @uniqueItems true */
    triggers?: RetentionPolicyTrigger[];
    /** @uniqueItems true */
    events?: RetentionPolicyEvent[];
}

/** HoldPolicy RequestDTO */
export interface HoldPolicyRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** HoldPolicy ID */
    id?: string;
    /** HoldPolicy name */
    policyName?: string;
    /** HoldPolicy status */
    status?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOHoldPolicy {
    entryList?: HoldPolicy[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOHoldPolicy {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOHoldPolicy;
}

export interface PaginationDTOPersonalDashboard {
    entryList?: PersonalDashboard[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface PersonalDashboard {
    /** @format int64 */
    id?: number;
    name?: string;
    creator?: string;
    editor?: string;
    groupId?: string;
    styleJson?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultPaginationDTOPersonalDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOPersonalDashboard;
}

export interface OAuth2SettingRequestDTO {
    clientId: string;
    clientSecret: string;
    tenantId?: string;
    redirectUri: string;
    authenticationMethod: "DEFAULT" | "MICROSOFT_OFFICE_365" | "GOOGLE";
    senderAddress?: string;
    /** @format date-time */
    expireTime?: string;
    userId?: string;
    code?: string;
    state?: string;
    scope?: string;
}

/** All Table Fields */
export interface MTFieldInfo {
    fieldName?: string;
    dataType?: string;
    required?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
    relationTable?: string;
    relationField?: string;
    displayField?: string;
}

/** Master Table RequestDTO */
export interface MasterTableRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Master Table ID */
    id?: string;
    /** Master Table Name */
    name?: string;
    /** Master Table Status is Active or Disable (A or D) */
    status?: string;
    /** Create by list */
    createdBys?: string[];
    /** All Table Fields */
    fields?: MTFieldInfo[];
    /** New Data List */
    data?: Record<string, object>[];
    /** Where Condition */
    where?: Record<string, object>;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface MTColumnInfo {
    columnName?: string;
    dataType?: string;
    /** @format int32 */
    length?: number;
    relationTable?: string;
    relationField?: string;
    displayField?: string;
    nullRelation?: boolean;
    /** @format int32 */
    sort?: number;
    primaryKey?: boolean;
    required?: boolean;
    unique?: boolean;
}

/** Master Table ResponseDTO */
export interface MasterTableResponseDTO {
    id?: string;
    name?: string;
    status?: string;
    description?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    fields?: MTColumnInfo[];
}

export interface ResultMasterTableResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Master Table ResponseDTO */
    data?: MasterTableResponseDTO;
}

export interface PaginationDTOMapStringObject {
    entryList?: Record<string, object>[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOMapStringObject;
}

export interface ResultListMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object>[];
}

export interface PaginationDTOMasterTableResponseDTO {
    entryList?: MasterTableResponseDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOMasterTableResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOMasterTableResponseDTO;
}

/** Master Table Logs RequestDTO */
export interface MTAuditLogRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Master Table ID */
    id?: string;
    /** Master Table Name */
    name?: string;
    /** Master Table Logs eventId */
    eventId?: string;
    /** Master Table Logs Event Category list */
    categories?: string[];
    /** Master Table Logs Principal Name list */
    creators?: string[];
    sort?: SortObject;
    descSort?: SortObject;
}

export interface MTAddColumnRequestDTO {
    id?: string;
    fieldName?: string;
    dataType?: string;
    required?: boolean;
    defaultValue?: object;
    unique?: boolean;
    relationTable?: string;
    relationField?: string;
    displayField?: string;
}

export interface DeleteMTRecordRequestDTO {
    tableId?: string;
    recordIds?: string[];
}

export interface MTPermissionDTO {
    aces?: string;
    masterTableId?: string;
    masterTableName?: string;
    userId?: string;
    userName?: string;
    userType?: string;
    read?: boolean;
    edit?: boolean;
    create?: boolean;
    enable?: boolean;
}

export interface BaseResultLicenseContent {
    /** @format int32 */
    code?: number;
    message?: string;
    data?: LicenseContent;
}

export interface LicenseContent {
    holder?: {
        name?: string;
        encoded?: string[];
    };
    issuer?: {
        name?: string;
        encoded?: string[];
    };
    subject?: string;
    /** @format date-time */
    issued?: string;
    /** @format date-time */
    notBefore?: string;
    /** @format date-time */
    notAfter?: string;
    consumerType?: string;
    /** @format int32 */
    consumerAmount?: number;
    info?: string;
    extra?: object;
}

export interface InternalShareQueryDTO {
    /** @format int64 */
    id?: number;
    internalShareId?: string;
    shareByUserId?: string;
    shareByUserIds?: string[];
    permission?: string;
    /** @format date-time */
    startDate?: string;
    /** @format date-time */
    expiredDate?: string;
    /** @format date-time */
    beforeExpiredDate?: string;
    /** @format date-time */
    afterExpiredDate?: string;
    isSendEmail?: boolean;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    beforeCreatedDate?: string;
    /** @format date-time */
    afterCreatedate?: string;
    createdUserId?: string;
    modifiedUserId?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** @format int64 */
    detailId?: number;
    /** @format int64 */
    biggerThenDetailId?: number;
    shareToUserId?: string;
    shareToUserIds?: string[];
    documentId?: string;
    documentName?: string;
    documentType?: string;
    /** @format date-time */
    documentLastModifiedDate?: string;
    permissionId?: string;
    isAddAcl?: boolean;
    isFolder?: boolean;
    /** @format date-time */
    detailCreatedDate?: string;
    /** @format date-time */
    detailModifiedDate?: string;
    ids?: number[];
    detailIds?: number[];
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    /** @format int32 */
    status?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** @format int64 */
    biggerThenId?: number;
}

export interface PaginationDTOObject {
    entryList?: object[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOObject;
}

export interface GenerateXApiKeyRequestDTO {
    userId?: string;
}

/** Form Designer (Request) */
export interface FormDesignRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Form Design ID */
    id?: string;
    /** Form Design Name */
    name?: string;
    /** Form Design Publish Status (value is A or D) */
    publishStatus?: string;
    /** Form Designer Process Definition Key */
    processDefinitionKey?: string;
    /** Form Design Permission */
    permission?: string;
    /** Disable or Enable form design */
    enable?: boolean;
    /** Form Design Information List */
    information?: PlanTableFieldDTO[];
    /** Form Design Preview Style */
    previewStyle?: string;
    /** Form Design Form Result List */
    formResult?: EasyFormResult[];
    /** New Data List */
    data?: Record<string, object>[];
    /** Where Condition */
    where?: Record<string, object>;
    /** Where Condition (Not Equal) */
    notEquals?: Record<string, object>;
    /** Where Condition (Equal) */
    equals?: Record<string, object>;
    /** Fuzzy query parameter name */
    q?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

/** Form Design Information List */
export interface PlanTableFieldDTO {
    id?: string;
    name?: string;
    type?: string;
    accesstype?: string;
    fieldMappingId?: string;
    masterTable?: string;
    documentType?: string;
    displayField?: string;
    vocabulary?: string;
    require?: string;
    readOnly?: string;
}

/** Form Designer (Response) */
export interface FormDesignResponseDTO {
    /** Form Design ID */
    id?: string;
    /** Form Design Name */
    name?: string;
    /** Form Design Publish Status */
    publishStatus?: string;
    /** Form Designer Process Definition Key */
    processDefinitionKey?: string;
    /** Form Design Permission */
    permission?: string;
    /** Disable or Enable form design */
    enable?: boolean;
    /** Form Design Information List */
    information?: PlanTableFieldDTO[];
    /** Form Design Preview */
    previewStyle?: string;
    /** Form Design Form Result List */
    formResult?: EasyFormResult[];
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    formInfo?: FormInfoDTO;
}

export interface FormFieldMapping {
    id?: string;
    formInfoId?: string;
    columnName?: string;
    fieldName?: string;
    dataType?: string;
    status?: string;
    required?: boolean;
    unique?: boolean;
    primaryKey?: boolean;
}

export interface FormInfoDTO {
    id?: string;
    bizId?: string;
    label?: string;
    tableName?: string;
    tableNamePrefix?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    fieldMappings?: FormFieldMapping[];
}

export interface ResultFormDesignResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Form Designer (Response) */
    data?: FormDesignResponseDTO;
}

/** Form Designer (Request) */
export interface FormDesignDataDTO {
    /** Form Design ID */
    id?: string;
    /** Form Data */
    data?: Record<string, object>;
    /** Business Number */
    bizNo?: string;
    /** Business Type */
    bizType?: string;
}

/** Easy Form Result (RequestDTO) */
export interface EasyFormResultRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Form Design ID */
    id?: string;
    /** Form Design Name */
    name?: string;
    formResult?: EasyFormResult;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface ResultEasyFormResult {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EasyFormResult;
}

export interface ResultListLinkedHashMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object>[];
}

/** Dict RequestDTO */
export interface DictRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /**
     * ID
     * @format int64
     */
    id?: number;
    /** categoryCode */
    categoryCode?: string;
    /** categoryDesc */
    categoryDesc?: string;
    /** dataType */
    dataType?: string;
    /** dictDesc */
    dictDesc?: string;
    /** language */
    language?: string;
    /** status */
    status?: string;
    /** locateCode */
    locateCode?: string;
    /** parentCode */
    parentCode?: string;
    /** remark */
    remark?: string;
    /** dictCode */
    dictCode?: string;
    /**
     * sortNo
     * @format int32
     */
    sortNo?: number;
    /**
     * version
     * @format int32
     */
    version?: number;
    sort?: SortObject;
    descSort?: SortObject;
}

/** Dict ResponseDTO */
export interface DictResponseDTO {
    /** @format int64 */
    id?: number;
    categoryCode?: string;
    categoryDesc?: string;
    parentCode?: string;
    dictCode?: string;
    dictDesc?: string;
    dataType?: string;
    language?: string;
    status?: string;
    locateCode?: string;
    remark?: string;
    /** @format int32 */
    sortNo?: number;
    /** @format int32 */
    version?: number;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    children?: DictResponseDTO[];
}

export interface ResultDictResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Dict ResponseDTO */
    data?: DictResponseDTO;
}

export interface ExecuteSqlDTO {
    executeQuerySqlTemplate?: string;
    tableName?: string;
    taskName?: string;
    /** @format int32 */
    initStartDate?: number;
    /** @format int32 */
    initEndDate?: number;
}

export interface RetryOcrRequestDTO {
    startDate?: string;
    endDate?: string;
    documentIds?: string[];
}

/** Case Table ResponseDTO */
export interface CaseTableResponseDTO {
    id?: string;
    caseTypeId?: string;
    label?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    fields?: MTColumnInfo[];
}

export interface CaseTypeInfo {
    caseTypeId?: string;
    label?: string;
    metadata?: string;
    dataType?: string;
    options?: string;
    require?: boolean;
    status?: string;
}

export interface CaseTypeResponseDTO {
    id?: string;
    name?: string;
    caseIdPrefix?: string;
    /** @format int32 */
    caseIdDigit?: number;
    /** @format int32 */
    startNumber?: number;
    latestVersion?: string;
    productionVersion?: string;
    enable?: boolean;
    publishStatus?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    caseDefinitionKey?: string;
    caseDefinitionId?: string;
    /** Case Model PlanItem Information DTO */
    startTask?: PlanItemDefinitionDTO;
    caseVersions?: CmmnVersion[];
    informations?: CaseTypeInfo[];
}

export interface CmmnVersion {
    id?: string;
    deploymentId?: string;
    caseTypeId?: string;
    versionNumber?: string;
    caseDefinitionId?: string;
    caseDefinitionKey?: string;
    productionVersion?: string;
    publishStatus?: string;
    primaryForm?: string;
    bytes?: string[];
    styleJson?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** Case Table ResponseDTO */
    upPrimaryForm?: CaseTableResponseDTO;
    production?: boolean;
}

/** Case Model PlanItem Information DTO */
export interface PlanItemDefinitionDTO {
    /** PlanItem Definition Id */
    key?: string;
    /** PlanItem Definition Name */
    name?: string;
    /** PlanItem Definition Type */
    type?: string;
    /** PlanItem Definition ParentId */
    parent?: string;
    /** PlanItem Definition criterion */
    criterion?: Record<string, string>;
    form?: Record<string, string>;
    /** PlanItem Definition Sub-List */
    subItems?: PlanItemDefinitionDTO[];
    fields?: PlanTableFieldDTO[];
}

export interface ResultCaseTypeResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseTypeResponseDTO;
}

export interface CaseModelDraft {
    id?: string;
    caseTypeId?: string;
    caseDefinitionKey?: string;
    caseDefinitionId?: string;
    bytes?: string[];
    styleJson?: string;
    serialNo?: string;
    createdBy?: string;
    /** @format date-time */
    createdDate?: string;
    fileName?: string;
}

export interface ResultCaseModelDraft {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseModelDraft;
}

/** Case Model Data Permission DTO */
export interface CmmnDataFilterPermission {
    /** User Group Id */
    userGroupId?: string;
    /** metadata */
    metadata?: string;
    /** Condition Type */
    conditionType?: string;
    /** Field Value */
    fieldValue?: string;
    /** Field Mapping Id */
    fieldMappingId?: string;
}

/** Case Model Plan Permission DTO */
export interface CmmnPlanPermissionDTO {
    ref?: string;
    referenceTable?: string;
    name?: string;
    group?: string;
    dataPermissions?: PlanTableFieldDTO[];
    filterPermissions?: CmmnDataFilterPermission[];
}

export interface CmmnVersionRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** ID of case type */
    caseTypeId?: string;
    /** Version Number */
    versionNumber?: string;
    /** The style json */
    styleJson?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOCmmnVersion {
    entryList?: CmmnVersion[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOCmmnVersion {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOCmmnVersion;
}

export interface ResultCmmnVersion {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnVersion;
}

/** Case Type RequestDTO */
export interface CaseTypeRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** ID */
    id?: string;
    /** Name */
    name?: string;
    /** is enable */
    enable?: boolean;
    caseIds?: string[];
    sort?: SortObject;
    descSort?: SortObject;
}

export interface PaginationDTOCaseType {
    entryList?: CaseType[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOCaseType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOCaseType;
}

export interface ResultListCaseTypeResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseTypeResponseDTO[];
}

/** Case Table RequestDTO */
export interface CaseTableRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Case Table ID */
    id?: string;
    /** Case Table label */
    label?: string;
    /** Case Type ID */
    caseTypeId?: string;
    startCmmnVersion?: CmmnVersion;
    /** Case Table Name */
    tableName?: string;
    /** Case Table Status is Active or Disable (A or D) */
    status?: string;
    /** All Table Fields */
    fields?: MTFieldInfo[];
    /** Create by list */
    createdBys?: string[];
    /** New Data List */
    data?: Record<string, object>[];
    /** Where Condition */
    where?: Record<string, object>;
    /** Where And Condition */
    andConditions?: WhereCondition[];
    c?: Record<string, object>;
    /** Fuzzy Search */
    q?: string;
    /** User */
    operator?: UserDTO;
    sort?: SortObject;
    descSort?: SortObject;
}

/** Where And Condition */
export interface WhereCondition {
    columnName?: string;
    operator?: "EQ" | "NEQ" | "LIKE" | "IN" | "NOT_IN" | "NOT_EXIST" | "RANGE" | "GT" | "LT" | "GTE" | "LTE";
    value?: object;
    arrays?: object[];
    start?: object;
    end?: object;
}

export interface CaseTable {
    id?: string;
    caseTypeId?: string;
    label?: string;
    tableName?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultCaseTable {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseTable;
}

export interface ResultCaseTableResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Table ResponseDTO */
    data?: CaseTableResponseDTO;
}

/** Case Instance TaskDTO (Request) */
export interface CaseInstanceTaskDTO {
    caseInstanceId?: string;
    taskId?: string;
    assignee?: string;
    variables?: Record<string, object>;
}

/** Task */
export interface CmmnTaskDTO {
    /** Task ID */
    id?: string;
    /** Task Name */
    name?: string;
    /** Task Description */
    description?: string;
    /** Task Definition ID */
    taskDefinitionId?: string;
    /** Task Definition Key */
    taskDefinitionKey?: string;
    /** Task Assignee */
    assignee?: string;
    /** Task Form Key */
    formKey?: string;
    /** Task Instance ID */
    instanceId?: string;
    /** Task Parent ID */
    parentId?: string;
    /**
     * Task Creation Date
     * @format date-time
     */
    createDate?: string;
    /**
     * Task Due Date
     * @format date-time
     */
    dueDate?: string;
    /**
     * Task Claim Date
     * @format date-time
     */
    claimDate?: string;
    /** Process Instance */
    taskInstance?: InstanceDTO;
    variables?: Record<string, object>;
    state?: string;
    processDefinitionName?: string;
    /** @format date-time */
    endTime?: string;
    /** @format int64 */
    durationInMillis?: number;
}

export interface ResultListCmmnTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnTaskDTO[];
}

/** Case Instance (Request) */
export interface CaseInstanceRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    caseTypeId?: string;
    /** Case Definition ID */
    caseDefinitionId?: string;
    /** Case Definition Key */
    caseDefinitionKey?: string;
    /** Case ID or alias business key */
    businessKey?: string;
    /** Case Instance ID */
    caseInstanceId?: string;
    /** Is Active */
    isActive?: boolean;
    /** Request Parameters */
    parameters?: Record<string, object>;
    /** Operation User Id */
    operator?: string;
    /** State */
    state?: string;
    /** Execution ID */
    executionId?: string;
    /** PlanItem Instance Id list */
    planItemInstanceIds?: string[];
    /** PlanItem Definition Type list */
    planItemDefinitionTypes?: string[];
    sort?: SortObject;
    descSort?: SortObject;
}

/** Case Instance (Request) */
export interface CaseInstanceDTO {
    id?: string;
    parentId?: string;
    businessKey?: string;
    businessStatus?: string;
    name?: string;
    caseDefinitionId?: string;
    caseDefinitionKey?: string;
    caseDefinitionName?: string;
    /** @format int32 */
    caseDefinitionVersion?: number;
    caseDefinitionDeploymentId?: string;
    state?: string;
    /** @format date-time */
    startTime?: string;
    startUserId?: string;
    /** @format date-time */
    lastReactivationTime?: string;
    lastReactivationUserId?: string;
    callbackId?: string;
    callbackType?: string;
    referenceId?: string;
    referenceType?: string;
    completable?: boolean;
    tenantId?: string;
    variables?: Record<string, object>;
}

export interface ResultCaseInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Instance (Request) */
    data?: CaseInstanceDTO;
}

/** PlanItemInstanceDTO */
export interface PlanItemInstanceDTO {
    caseDefinitionId?: string;
    caseInstanceId?: string;
    derivedCaseDefinitionId?: string;
    formKey?: string;
    id?: string;
    name?: string;
    planItemDefinitionId?: string;
    planItemDefinitionType?: string;
    referenceId?: string;
    referenceType?: string;
    stageInstanceId?: string;
    startUserId?: string;
    state?: string;
    /** @format date-time */
    completedTime?: string;
    /** @format date-time */
    createTime?: string;
    /** @format date-time */
    endedTime?: string;
    /** @format date-time */
    exitTime?: string;
    active?: boolean;
    variables?: Record<string, object>;
    subItems?: PlanItemInstanceDTO[];
}

export interface ResultListPlanItemInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PlanItemInstanceDTO[];
}

export interface PaginationDTOCmmnDashboard {
    entryList?: CmmnDashboard[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOCmmnDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOCmmnDashboard;
}

/** Case Process RequestDTO */
export interface CmmnProcessRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    caseInstanceId?: string;
    businessKey?: string;
    caseDefinitionId?: string;
    /** @uniqueItems true */
    processDefinitionKeys?: string[];
    q?: string;
    assignee?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

/** Case Instance Process Instance Information */
export interface CmmnProcessInstanceDTO {
    /** process Instance ID */
    processInstanceId?: string;
    /** Business Key */
    businessKey?: string;
    /** Task ID */
    taskId?: string;
    /** is complete state */
    complete?: boolean;
    /** process Instance state */
    state?: string;
    /** Assigned user of current task */
    assignedUser?: string;
    /** Error Message */
    errorMsg?: string;
    /** Process Instance */
    instance?: InstanceDTO;
    tasks?: TaskDTO[];
    /** process Instance ID */
    caseInstanceId?: string;
    /**
     * Start Time
     * @format date-time
     */
    startTime?: string;
    /**
     * End Time
     * @format date-time
     */
    endTime?: string;
    /** Start UserId */
    startUserId?: string;
    /** Process Definition Id */
    processDefinitionId?: string;
    /** Process Definition Key */
    processDefinitionKey?: string;
    /** Process Definition Name */
    processDefinitionName?: string;
    /** Process Definition Deployment Id */
    deploymentId?: string;
}

export interface PaginationDTOCmmnProcessInstanceDTO {
    entryList?: CmmnProcessInstanceDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOCmmnProcessInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOCmmnProcessInstanceDTO;
}

export interface ResultListCalendarTaskRespDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CalendarTaskRespDTO[];
}

/** The folder cabinet metadata */
export interface FCMetadata {
    /** Name */
    name?: string;
    /** Type */
    type?: string;
    /** Value */
    value?: object;
}

export interface FCNotificationConfig {
    id?: string;
    folderCabinetId?: string;
    reminderType?: string;
    /** @format int32 */
    intervalTime?: number;
    /**
     * @deprecated
     * @format int32
     */
    notificationReminder?: number;
    /**
     * @deprecated
     * @format int32
     */
    reportDay?: number;
    /**
     * @deprecated
     * @format int32
     */
    emailReminder?: number;
    tos?: string;
    ccs?: string;
}

/** Email Reminder */
export interface FCReminder {
    /**
     * Interval Time
     * @format int32
     */
    intervalTime?: number;
    /** Recipients list */
    tos?: string[];
    /** ccRecipients list */
    ccs?: string[];
}

/** The bind owners of this folder cabinet */
export interface FolderCabinetBinds {
    /** @format int64 */
    id?: number;
    folderCabinetId?: string;
    bindId?: string;
    type?: string;
}

/** Folder Cabinet RequestDTO */
export interface FolderCabinetRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** Folder Cabinet ID */
    id?: string;
    /** Document ID of Nuxeo */
    rootId?: string;
    /** The parent ID of this folder cabinet */
    parentId?: string;
    /** The name of folder cabinet */
    label?: string;
    /** The document type of nuxeo */
    documentType?: string;
    /** The document path of nuxeo */
    documentPath?: string;
    /** Whether it is a folder? */
    folder?: boolean;
    /** Whether it allow other document-type file? */
    allow?: boolean;
    /** Whether it allow multiple file? */
    multiple?: boolean;
    repeatName?: boolean;
    pathIds?: string;
    /** The create user of this folder cabinet */
    createdBy?: string;
    /** The last modify user of this folder cabinet */
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** choose metadata */
    metadata?: FCMetadata[];
    /** The label Rule list */
    labelRule?: string;
    /** The bind owners of this folder cabinet */
    binds?: FolderCabinetBinds[];
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
    /** The default value list of label rule */
    metadataValue?: string;
    systemReminderConfig?: FCNotificationConfig;
    summaryReportEmail?: FCNotificationConfig;
    delayEmail?: FCNotificationConfig;
    sort?: SortObject;
    descSort?: SortObject;
}

/** Document Access Control Entry */
export interface DocumentACLEntryDTO {
    /** Access Control Entry ID */
    id?: string;
    /** User ID */
    userId?: string;
    /** User Permission */
    permission?: string;
    /** Granted By */
    grarntedBy?: string;
    /** Start Date */
    startDate?: string;
    /** End Date */
    endDate?: string;
    print?: boolean;
}

/** Folder Cabinet ResponseDTO */
export interface FolderCabinetResponseDTO {
    /** FolderCabinet ID */
    id?: string;
    /** Folder Cabinet Setting ID */
    folderCabinetSettingId?: string;
    /** Document ID of Nuxeo */
    rootId?: string;
    /** The parent ID of this folder cabinet */
    parentId?: string;
    /** The name of folder cabinet */
    label?: string;
    /** The document type of nuxeo */
    documentType?: string;
    /** The document path of nuxeo */
    documentPath?: string;
    /** Whether it is a folder? */
    folder?: boolean;
    /** Whether it allow other document-type file? */
    allow?: boolean;
    /** Whether it allow multiple file? */
    multiple?: boolean;
    pathIds?: string;
    /** The create user of this folder cabinet */
    createdBy?: string;
    /** The last modify user of this folder cabinet */
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** The bind owners of this folder cabinet */
    binds?: FolderCabinetBinds[];
    /** The label Rule list */
    labelRule?: string;
    /** The sublist of this folder cabinet */
    children?: FolderCabinetResponseDTO[];
    /** choose metadata */
    metadata?: FCMetadata[];
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
    repeatName?: boolean;
    metadataValue?: string;
    acls?: DocumentACLEntryDTO[];
}

export interface ResultFolderCabinetResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Folder Cabinet ResponseDTO */
    data?: FolderCabinetResponseDTO;
}

export interface PaginationDTOFolderCabinetResponseDTO {
    entryList?: FolderCabinetResponseDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOFolderCabinetResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOFolderCabinetResponseDTO;
}

export interface OcrTransactionLogRequestDTO {
    /**
     * Page Number
     * @format int32
     */
    pageNum?: number;
    /**
     * Page Size
     * @format int32
     */
    pageSize?: number;
    /** The sortBy fields */
    orderBy?: string;
    /** The sort ASC or DESC */
    isDesc?: boolean;
    /** businessName */
    businessName?: string;
    /** workflow */
    workflow?: string;
    /** state */
    state?: string;
    /** ocrProfileName */
    ocrProfileName?: string;
    /** scanType */
    scanType?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface OcrTransactionLogDTO {
    /** @format int64 */
    id?: number;
    businessName?: string;
    workflow?: string;
    state?: string;
    ocrProfileName?: string;
    scanType?: string;
    processStatus?: string;
    /** @format date-time */
    createdDate?: string;
}

export interface PaginationDTOOcrTransactionLogDTO {
    entryList?: OcrTransactionLogDTO[];
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginationDTOOcrTransactionLogDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOOcrTransactionLogDTO;
}

/** Define block inherited permission of document */
export interface BlockInheritedPermission {
    /** @format int64 */
    id?: number;
    /** the document id */
    docId?: string;
    /** the document path */
    docPath?: string;
    /** the block id of document */
    blockId?: string;
}

export interface ResultBlockInheritedPermission {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Define block inherited permission of document */
    data?: BlockInheritedPermission;
}

export interface DocDTO {
    /** the document id */
    docId?: string;
    /** the document path */
    docPath?: string;
    /** the parent document id */
    parentDocId?: string;
}

export interface ResultListDocDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocDTO[];
}

/** ResetEasyShare (Request) */
export interface ShareSaveRequestDTO {
    /** Share Id */
    shareId?: string;
    /** Document shared to a list of email */
    emailList?: string[];
    /** Password for shared document(s) */
    password?: string;
    /**
     * How long the token can last for? (in # of minutes)
     * @format int32
     */
    tokenLiveInMinutes?: number;
}

/** EasyShare */
export interface EasyShareDTO {
    /** Token for access shared document */
    access_token?: string;
    /** UUID of saved Nuxeo PATH */
    shareId?: string;
    /** document in Nuxeo with PATH */
    documentURL?: string;
}

export interface ResultEasyShareDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** EasyShare */
    data?: EasyShareDTO;
}

export interface ResultSmartFolderResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Smart Folder */
    data?: SmartFolderResponseDTO;
}

export interface ViewSettingRequestDTO {
    id?: string;
    json_value?: string;
}

export interface ResultViewSettingResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ViewSettingResponseDTO;
}

export interface ViewSettingResponseDTO {
    json_value?: string;
}

export interface ResultListAclPermissionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AclPermissionDTO[];
}

export interface ResultListAclUserRelationshipWithUserGroup {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AclUserRelationshipWithUserGroup[];
}

export interface ResultAclUserGroupDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AclUserGroupDTO;
}

export interface ResultVocabularyDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Nuxeo Vocabulary */
    data?: VocabularyDTO;
}

export interface ResultDocumentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document Type */
    data?: DocumentTypeDTO;
}

export interface ResultVersioningPolicyDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Policy (Versioning Configuration) */
    data?: VersioningPolicyDTO;
}

/** Policy (Versioning Configuration) */
export interface VersioningPolicyDTO {
    /** A unique id which allows to override default policies */
    policyId?: string;
    /** The increment policy (between NONE, MINOR or MAJOR) */
    increment?: string;
    /** If the versioning has to be applied before or after the actual modification */
    beforeUpdate?: boolean;
    /**
     * The order in which the policy should be taken into account related to other policies.
     * @format int32
     */
    order?: number;
    /** Filters state whether or not document needs to be versioned. */
    filterIds?: string[];
}

export interface ResultVersioningFilterDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Filter (Versioning Configuration) */
    data?: VersioningFilterDTO;
}

/** Filter (Versioning Configuration) */
export interface VersioningFilterDTO {
    /** The Filter Id */
    id?: string;
    /** On which document type the versioning applies */
    types?: string[];
    /** Apply the versioning if the document contains this schema */
    schemas?: string[];
    /** Apply the versioning if the document contains this facet */
    facets?: string[];
    /** Defines a condition in EL to access properties of the document before/after modification */
    conditions?: string[];
}

export interface ResultSchemaDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Schema */
    data?: SchemaDTO;
}

export interface DocumentSchemaVO {
    keyword?: string;
    canEdit?: boolean;
}

export interface ResultListDocumentSchemaVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentSchemaVO[];
}

export interface DocumentTypeVO {
    docTypeId?: string;
    canEdit?: boolean;
}

export interface ResultListDocumentTypeVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTypeVO[];
}

/** All Condition ResponseDTO */
export interface ConditionResponseDTO {
    key?: string;
    label?: string;
    type?: string;
    options?: Record<string, object>[];
    belong?: string;
    isMultiple?: boolean;
}

export interface ResultListConditionResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ConditionResponseDTO[];
}

export interface ResultListSmartFolderResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: SmartFolderResponseDTO[];
}

/** Document Access Control List */
export interface DocAccessControlListDTO {
    /** Inherited Access Control Entries */
    inherited?: AccessControlEntryDTO[];
    /** Local Access Control Entries */
    local?: AccessControlEntryDTO[];
}

export interface ResultDocAccessControlListDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document Access Control List */
    data?: DocAccessControlListDTO;
}

/** Define audit template */
export interface AuditTemplate {
    id?: string;
    eventId?: string;
    nuxeoEventId?: string;
    documentId?: string;
    comment?: string;
    docPath?: string;
    docType?: string;
    eventType?: string;
    eventCategory?: string;
    label?: string;
    /** @format date-time */
    createTime?: string;
    /** @format date-time */
    updateTime?: string;
}

export interface ResultListAuditTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AuditTemplate[];
}

/** CustomIcon */
export interface CustomIconDTO {
    docTypeId?: string;
}

export interface ResultListCustomIconDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CustomIconDTO[];
}

export interface ResultListBusinessResultRecord {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: BusinessResultRecord[];
}

export interface MQMessageTotalDTO {
    streamKey?: string;
    /** @format int64 */
    messageTotal?: number;
}

export interface ResultListMQMessageTotalDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MQMessageTotalDTO[];
}

export interface MQConsumeGroupStatusDTO {
    consumeGroup?: string;
    create?: number;
    pending?: number;
    completed?: number;
    finish?: number;
    error?: number;
}

export interface ResultListMQConsumeGroupStatusDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MQConsumeGroupStatusDTO[];
}

export interface MQDayTotalDTO {
    daytime?: string;
    num?: number;
}

export interface ResultListMQDayTotalDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MQDayTotalDTO[];
}

export interface ResultListDocPalTypeRelated {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeRelated[];
}

export interface ResultListDocPalType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalType[];
}

export interface ResultListLong {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: number[];
}

export interface DirectoryEntryDTO {
    id?: string;
    directoryName?: string;
    properties?: Record<string, object>;
}

export interface MSOptions {
    dropdownType?: string;
    vocabulary?: string;
    masterTable?: string;
    masterTableColumn?: string;
    documentType?: string;
    displayField?: string;
    isMultiple?: boolean;
    /** @format int32 */
    length?: number;
    regex?: string;
    formatDate?: string;
}

export interface MetadataSettingResponseDTO {
    /** @format int64 */
    id?: number;
    documentType?: string;
    metaData?: string;
    metaDataType?: string;
    isRequire?: boolean;
    display?: boolean;
    creatorId?: string;
    creatorName?: string;
    /** @format date-time */
    creationTime?: string;
    modifiedId?: string;
    modifiedName?: string;
    /** @format date-time */
    modifiedTime?: string;
    /** @format int32 */
    status?: number;
    dataType?: string;
    directoryEntries?: DirectoryEntryDTO[];
    options?: MSOptions;
}

export interface ResultListMetadataSettingResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MetadataSettingResponseDTO[];
}

export interface ResultListDocumentTypeProfileSetting {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTypeProfileSetting[];
}

export interface ResultMapStringListMapStringString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, Record<string, string>[]>;
}

/** Form Property */
export interface FormPropertiesDTO {
    /** Property Key */
    id?: string;
    /** Property Name */
    name?: string;
    /** Property Type */
    type?: string;
    /** Property Value */
    value?: string;
    /** Is Property Readable */
    readable?: boolean;
    /** Is Property Required */
    required?: boolean;
    /** Is Property Writable */
    writable?: boolean;
    /** Property expression */
    expression?: string;
    /** Property variable */
    variable?: string;
    /** Property defaultExpression */
    defaultExpression?: string;
    /** Enum Options */
    options?: Record<string, string>;
}

export interface ProcessDefinitionDTO {
    id?: string;
    category?: string;
    name?: string;
    key?: string;
    description?: string;
    /** @format int32 */
    version?: number;
    resourceName?: string;
    deploymentId?: string;
    diagramResourceName?: string;
    hasStartFormKey?: boolean;
    hasGraphicalNotation?: boolean;
    getTenantId?: string;
    getDerivedFrom?: string;
    getDerivedFromRoot?: string;
    /** @format int32 */
    getDerivedVersion?: number;
    getEngineVersion?: string;
    userTasks?: UserTaskDTO[];
    permissions?: Record<string, string>[];
    fcDataMapping?: Record<string, string>[];
    suspended?: boolean;
}

export interface ResultListProcessDefinitionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDefinitionDTO[];
}

export interface UserTaskDTO {
    id?: string;
    name?: string;
    flowElementType?: string;
    formProperties?: FormPropertiesDTO[];
}

export interface ResultProcessDefinitionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDefinitionDTO;
}

/** BPMN Dynamic Form Information DTO */
export interface BpmnDynamicFormDTO {
    id?: string;
    name?: string;
    type?: string;
    properties?: FormPropertyDTO[];
}

export interface ResultListBpmnDynamicFormDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: BpmnDynamicFormDTO[];
}

export interface ResultBpmnDynamicFormDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** BPMN Dynamic Form Information DTO */
    data?: BpmnDynamicFormDTO;
}

export interface ResultKeywordDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Keyword */
    data?: KeywordDTO;
}

export interface DirectoryEntry {
    id?: string;
    directoryName?: string;
    properties?: Record<string, object>;
    "entity-type"?: string;
}

export interface ResultListDirectoryEntry {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DirectoryEntry[];
}

export interface ResultListWatermarkSettingsTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: WatermarkSettingsTemplate[];
}

export interface ResultListWatermarkSettingsDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: WatermarkSettingsDTO[];
}

export interface ResultListWMContentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: WMContentTypeDTO[];
}

export interface WMContentTypeDTO {
    value?: string;
    label?: string;
    metadata?: string;
}

export interface ResultEmailTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EmailTemplate;
}

export interface ResultListEmailLayout {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EmailLayout[];
}

export interface ResultListEmailTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EmailTemplate[];
}

export interface ResultDocumentTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTemplate;
}

export interface ResultListDocumentTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTemplate[];
}

export interface ResultMapStringString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, string>;
}

export interface ResultMapStringBoolean {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, boolean>;
}

/** KeyCloakPropertyDTO */
export interface KeyCloakPropertyDTO {
    /** url */
    url?: string;
    /** 域 */
    realm?: string;
    /** clientId */
    clientId?: string;
    /** sslRequired */
    sslRequired?: string;
    /** publicClient */
    publicClient?: boolean;
    /**
     * confidentialPort
     * @format int32
     */
    confidentialPort?: number;
    /** enable SSO */
    enableSSO?: boolean;
}

/** KeyCloakPropertyVO */
export interface KeyCloakPropertyVO {
    /** isLdap */
    isLdap?: boolean;
    /** KeyCloakPropertyDTO */
    keyCloakProperty?: KeyCloakPropertyDTO;
}

export interface ResultKeyCloakPropertyVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** KeyCloakPropertyVO */
    data?: KeyCloakPropertyVO;
}

export interface ResultListRetentionPolicyTrigger {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: RetentionPolicyTrigger[];
}

export interface ResultPersonalDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PersonalDashboard;
}

export interface ResultOAuth2SettingRequestDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: OAuth2SettingRequestDTO;
}

export interface ResultOAuth2AuthenticationMethod {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ("DEFAULT" | "MICROSOFT_OFFICE_365" | "GOOGLE")[];
}

export interface ResultListMasterTableResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MasterTableResponseDTO[];
}

export interface MTRelationOptionDTO {
    value?: object;
    label?: string;
}

export interface MTRelationResponseDTO {
    key?: string;
    options?: MTRelationOptionDTO[];
}

export interface ResultListMTRelationResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MTRelationResponseDTO[];
}

export interface MTFieldTypeMapping {
    value?: string;
    label?: string;
    key?: string;
    unique?: boolean;
}

export interface ResultListMTFieldTypeMapping {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MTFieldTypeMapping[];
}

export interface ResultMapStringMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, Record<string, object>>;
}

/** Process Definition ResponseDTO */
export interface PDResponseDTO {
    key?: string;
    label?: string;
    type?: string;
    properties?: FormPropertyDTO[];
}

export interface ResultListPDResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PDResponseDTO[];
}

export interface ResultListDictResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DictResponseDTO[];
}

export interface ConversionSupportDestType {
    targetFileType?: string;
    type?: "Document" | "Image" | "Video";
    operation?: Record<string, string>;
}

export interface ResultHashMapStringListConversionSupportDestType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, ConversionSupportDestType[]>;
}

export interface ResultListCaseType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseType[];
}

export interface ResultListCmmnVersion {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnVersion[];
}

export interface ResultListPlanItemDefinitionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PlanItemDefinitionDTO[];
}

export interface CmmnInstance {
    id?: string;
    procInstId?: string;
    caseId?: string;
    caseTypeId?: string;
    deploymentId?: string;
    cmmnVersionId?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultListCmmnInstance {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnInstance[];
}

/** Case Model Deployment DTO */
export interface CmmnDeploymentDTO {
    id?: string;
    name?: string;
    category?: string;
    key?: string;
    caseDefinitionId?: string;
    parentDeploymentId?: string;
    /** @format date-time */
    deploymentTime?: string;
    newState?: boolean;
    derivedFrom?: string;
    derivedFromRoot?: string;
    engineVersion?: string;
    inserted?: boolean;
    idPrefix?: string;
    updated?: boolean;
    deleted?: boolean;
    primaryForm?: string;
    caseTables?: CmmnPlanFormDTO[];
    permissions?: CmmnPlanPermissionDTO[];
}

/** Case Model Plan Form DTO */
export interface CmmnPlanFormDTO {
    id?: string;
    name?: string;
    type?: string;
    casetable?: string;
    fields?: PlanTableFieldDTO[];
}

export interface ResultCmmnDeploymentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Model Deployment DTO */
    data?: CmmnDeploymentDTO;
}

export interface ResultListCaseTable {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseTable[];
}

/** Case Model Information DTO */
export interface CaseDefinitionDTO {
    id?: string;
    category?: string;
    name?: string;
    key?: string;
    description?: string;
    /** @format int32 */
    version?: number;
    resourceName?: string;
    deploymentId?: string;
    diagramResourceName?: string;
    tenantId?: string;
    primaryForm?: string;
    planForms?: CmmnPlanFormDTO[];
    planItems?: PlanItemDefinitionDTO[];
    permissions?: CmmnPlanPermissionDTO[];
}

export interface ResultListCaseDefinitionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseDefinitionDTO[];
}

export interface ResultListPlanTableFieldDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PlanTableFieldDTO[];
}

export interface ResultListCmmnPlanFormDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnPlanFormDTO[];
}

export interface ResultListUserEventInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: UserEventInstanceDTO[];
}

/** Case User Event InstanceDTO */
export interface UserEventInstanceDTO {
    id?: string;
    name?: string;
    elementId?: string;
    caseInstanceId?: string;
    caseDefinitionId?: string;
    planItemDefinitionId?: string;
    stageInstanceId?: string;
    state?: string;
}

export interface CaseFormFieldData {
    id?: string;
    name?: string;
    type?: string;
    value?: object;
    masterTable?: string;
    documentType?: string;
    displayField?: string;
    vocabulary?: string;
    require?: string;
    readOnly?: string;
}

/** Case Model Form Data DTO */
export interface CaseInstanceFormDataDTO {
    id?: string;
    name?: string;
    type?: string;
    casetable?: string;
    fields?: PlanTableFieldDTO[];
    rows?: CaseFormFieldData[];
}

export interface ResultCaseInstanceFormDataDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Model Form Data DTO */
    data?: CaseInstanceFormDataDTO;
}

export interface ResultCmmnPlanFormDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Model Plan Form DTO */
    data?: CmmnPlanFormDTO;
}

export interface ResultListCaseInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseInstanceDTO[];
}

/** case instance activity item */
export interface CmmnActivityItem {
    id?: string;
    name?: string;
    planItemDefinitionId?: string;
    planItemDefinitionType?: string;
    state?: string;
    /** @format date-time */
    completedTime?: string;
    /** @format date-time */
    createTime?: string;
    /** @format date-time */
    endedTime?: string;
    /** @format date-time */
    occurredTime?: string;
}

export interface ResultListCmmnActivityItem {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnActivityItem[];
}

export interface ResultListCmmnDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnDashboard[];
}

export interface FolderCabinet {
    id?: string;
    parentId?: string;
    pathIds?: string;
    label?: string;
    documentType?: string;
    documentPath?: string;
    documentId?: string;
    allow?: boolean;
    multiple?: boolean;
    complete?: boolean;
    folder?: boolean;
    metadata?: FCMetadata[];
    labelRule?: string;
    permission?: string;
    repeatName?: boolean;
    metadataValue?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    binds?: FolderCabinetBinds[];
}

export interface ResultFolderCabinet {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FolderCabinet;
}

export interface ResultListDocumentACLEntryDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentACLEntryDTO[];
}

export interface ResultListFolderCabinetResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FolderCabinetResponseDTO[];
}

export interface AzureOcrProfileMapping {
    /** @format int64 */
    id?: number;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    createdBy?: string;
    modifiedBy?: string;
    ocrProfileName?: string;
    scanProfile?: string;
    normalizeSetting?: string;
    scanType?: string;
    status?: string;
}

export interface AzureSettingDTO {
    azureOcrApiKey?: AzureOcrApiKeyDTO;
    azureOcrSetting?: AzureOcrSettingDTO;
    azureOcrProfileMappings?: AzureOcrProfileMapping[];
    ocrTransactionLogs?: PaginationDTOOcrTransactionLogDTO;
}

export interface ResultAzureSettingDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AzureSettingDTO;
}

export interface AclEntryDTO {
    id?: string;
    /**
     * 名称
     * @example "Write"
     */
    name: string;
    /**
     * 标签
     * @example "Write"
     */
    label?: string;
    /** 类型 */
    type?: "System" | "Document";
    /** 是否删除的标记 */
    deleteFlag?: "YES" | "NO";
    /**
     * 创建者
     * @example "Administrator"
     */
    createdBy?: string;
    /**
     * 更新者
     * @example "Administrator"
     */
    modifiedBy?: string;
    /**
     * Created Date
     * @format date-time
     */
    createdDate?: string;
    /**
     * Modified Date
     * @format date-time
     */
    modifiedDate?: string;
    ids?: string[];
}

export interface ResultIdentityRequestDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Identity (Request) */
    data?: IdentityRequestDTO;
}

/** Delete Workflow (Request) */
export interface DeleteWorkflowReq {
    /** Process Business Key */
    businessKey?: string;
    /** Process Instance Id */
    processInstanceId?: string;
    /** Start User Id */
    startUserId?: string;
    /** Assigned User ID */
    assignee?: string;
    /** Relation User ID */
    relationUserId?: string;
    /** Task ID */
    taskId?: string;
    /** Task Delete Reason */
    deleteReason?: string;
}

export interface ResultListFormPropertiesRelation {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FormPropertiesRelation[];
}

export interface ResultListLanguageEntity {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: LanguageEntity[];
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || "http://admin.app4.wclsolution.com",
        });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        if (input instanceof FormData) {
            return input;
        }
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<T> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body);
        }

        return this.instance
            .request({
                ...requestParams,
                headers: {
                    ...(requestParams.headers || {}),
                    ...(type ? { "Content-Type": type } : {}),
                },
                params: query,
                responseType: responseFormat,
                data: body,
                url: path,
            })
            .then((response) => response.data);
    };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://admin.app4.wclsolution.com
 */
export class Admin<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    userNuxeo = {
        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetUser
         * @summary Get User
         * @request GET:/api/nuxeo/user/{userId}
         */
        getUser: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostUser
         * @summary Get User
         * @request POST:/api/nuxeo/user/{userId}
         */
        postUser: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/${userId}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetDeprecate
         * @summary Get User
         * @request GET:/api/nuxeo/user/{userId}/
         */
        getDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/${userId}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostDeprecate
         * @summary Get User
         * @request POST:/api/nuxeo/user/{userId}/
         */
        postDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/${userId}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PutStatus
         * @summary Update User State
         * @request PUT:/api/nuxeo/user/status
         */
        putStatus: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostActive
         * @summary Batch update user active status
         * @request POST:/api/nuxeo/user/batch/active
         */
        postActive: (data: UserBatchActiveDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/batch/active`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostUsers
         * @request POST:/api/nuxeo/user/async/users
         */
        postUsers: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/async/users`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetKeycloak
         * @summary Get keycloak user through keycloak user id
         * @request GET:/api/nuxeo/user/keycloak/{keycloakUserId}
         */
        getKeycloak: (keycloakUserId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/keycloak/${keycloakUserId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetGetapplication
         * @summary Get current user
         * @request GET:/api/nuxeo/user/getApplication
         */
        getGetapplication: (params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/user/getApplication`,
                method: "GET",
                ...params,
            }),
    };
    configurationNuxeo = {
        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetTypes
         * @summary Get all document types
         * @request GET:/api/nuxeo/types
         */
        getTypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/types`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostTypes
         * @summary Get all document types
         * @request POST:/api/nuxeo/types
         */
        postTypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/types`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate
         * @summary Get all document types
         * @request GET:/api/nuxeo/types/
         */
        getDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/types/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate
         * @summary Get all document types
         * @request POST:/api/nuxeo/types/
         */
        postDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/types/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetTypes2
         * @summary Get a document type
         * @request GET:/api/nuxeo/setup/types/{docType}
         * @originalName getTypes
         * @duplicate
         */
        getTypes2: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types/${docType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostTypes2
         * @summary Get a document type
         * @request POST:/api/nuxeo/setup/types/{docType}
         * @originalName postTypes
         * @duplicate
         */
        postTypes2: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types/${docType}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate2
         * @summary Get a document type
         * @request GET:/api/nuxeo/setup/types/{docType}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types/${docType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate2
         * @summary Get a document type
         * @request POST:/api/nuxeo/setup/types/{docType}/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types/${docType}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate3
         * @summary Get all document types
         * @request GET:/api/nuxeo/setup/types/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate3
         * @summary Get all document types
         * @request POST:/api/nuxeo/setup/types/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetTypes3
         * @summary Get all document types
         * @request GET:/api/nuxeo/setup/types
         * @originalName getTypes
         * @duplicate
         */
        getTypes3: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostTypes3
         * @summary Get all document types
         * @request POST:/api/nuxeo/setup/types
         * @originalName postTypes
         * @duplicate
         */
        postTypes3: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/types`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate4
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/setup/updateVocabularies/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/updateVocabularies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostUpdatevocabularies
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/setup/updateVocabularies
         */
        postUpdatevocabularies: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/updateVocabularies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostCreatedocpaltype
         * @summary Create Global File DocPal Type
         * @request POST:/api/nuxeo/setup/createDocPalType
         */
        postCreatedocpaltype: (params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/createDocPalType`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostExport
         * @request POST:/api/nuxeo/folderStructure/export
         */
        postExport: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/folderStructure/export`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate5
         * @request POST:/api/nuxeo/folderStructure/export/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/folderStructure/export/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetType
         * @summary Obtain metadata list of this documentType
         * @request GET:/api/nuxeo/type/{documentType}
         */
        getType: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/type/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetMetadata
         * @summary Obtain metadata list of this documentType
         * @request GET:/api/nuxeo/type/{documentType}/metadata
         */
        getMetadata: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/type/${documentType}/metadata`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate4
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/setup/vocabulary/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetVocabulary
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/setup/vocabulary/{id}
         */
        getVocabulary: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetSchema
         * @summary Get Schema detail by id
         * @request GET:/api/nuxeo/setup/schema/{id}
         */
        getSchema: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/schema/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate5
         * @summary Get Schema detail by id
         * @request GET:/api/nuxeo/setup/schema/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate5: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/schema/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate6
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/setup/listSchemaIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate6: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/listSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetListschemaids
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/setup/listSchemaIDs
         */
        getListschemaids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/listSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetListdoctypeids
         * @summary List available Doc Type IDs
         * @request GET:/api/nuxeo/setup/listDocTypeIDs
         */
        getListdoctypeids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/listDocTypeIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate7
         * @summary List available Doc Type IDs
         * @request GET:/api/nuxeo/setup/listDocTypeIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate7: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/listDocTypeIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate8
         * @summary Get Doc Type detail by id
         * @request GET:/api/nuxeo/setup/docType/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate8: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/docType/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDoctype
         * @summary Get Doc Type detail by id
         * @request GET:/api/nuxeo/setup/docType/{id}
         */
        getDoctype: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setup/docType/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetMetadata2
         * @summary Obtain metadata list of this schema
         * @request GET:/api/nuxeo/schema/{schemaId}/metadata
         * @originalName getMetadata
         * @duplicate
         */
        getMetadata2: (schemaId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/schema/${schemaId}/metadata`,
                method: "GET",
                ...params,
            }),
    };
    formNuxeo = {
        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name GetList
         * @request GET:/api/nuxeo/form/metadata/list
         */
        getList: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/form/metadata/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name PostList
         * @request POST:/api/nuxeo/form/metadata/list
         */
        postList: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/form/metadata/list`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name GetDeprecate
         * @request GET:/api/nuxeo/form/metadata/list/
         */
        getDeprecate: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/form/metadata/list/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name PostDeprecate
         * @request POST:/api/nuxeo/form/metadata/list/
         */
        postDeprecate: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/form/metadata/list/`,
                method: "POST",
                query: query,
                ...params,
            }),
    };
    collectionNuxeo = {
        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetCollection
         * @summary Get user visible collections
         * @request GET:/api/nuxeo/collection
         */
        getCollection: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/collection`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostCollection
         * @summary Get user visible collections
         * @request POST:/api/nuxeo/collection
         */
        postCollection: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/collection`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetAll
         * @request GET:/api/nuxeo/collection/all
         */
        getAll: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/collection/all`,
                method: "GET",
                ...params,
            }),
    };
    workflow = {
        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate
         * @summary Retrieve task candidates by process task definition
         * @request GET:/api/docpal/workflow/task/candidatesByTaskDefinitionKey/
         */
        getDeprecate: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/candidatesByTaskDefinitionKey/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate
         * @summary Retrieve task candidates by process task definition
         * @request POST:/api/docpal/workflow/task/candidatesByTaskDefinitionKey/
         */
        postDeprecate: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/candidatesByTaskDefinitionKey/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetCandidatesbytaskdefinitionkey
         * @summary Retrieve task candidates by process task definition
         * @request GET:/api/docpal/workflow/task/candidatesByTaskDefinitionKey
         */
        getCandidatesbytaskdefinitionkey: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/candidatesByTaskDefinitionKey`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostCandidatesbytaskdefinitionkey
         * @summary Retrieve task candidates by process task definition
         * @request POST:/api/docpal/workflow/task/candidatesByTaskDefinitionKey
         */
        postCandidatesbytaskdefinitionkey: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/candidatesByTaskDefinitionKey`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostUpdatemetadatamapping
         * @request POST:/api/docpal/workflow/updateMetadataMapping
         */
        postUpdatemetadatamapping: (data: DocumentTypeMetadataMapping, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/updateMetadataMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostUser
         * @request POST:/api/docpal/workflow/tasks/user
         */
        postUser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/tasks/user`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate2
         * @request POST:/api/docpal/workflow/tasks/user/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/tasks/user/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate3
         * @request POST:/api/docpal/workflow/tasks/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/tasks/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostTasks
         * @request POST:/api/docpal/workflow/tasks
         */
        postTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/tasks`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate4
         * @request POST:/api/docpal/workflow/task/unclaim/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/unclaim/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostUnclaim
         * @request POST:/api/docpal/workflow/task/unclaim
         */
        postUnclaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/unclaim`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostMove
         * @request POST:/api/docpal/workflow/task/move
         */
        postMove: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/move`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate5
         * @request POST:/api/docpal/workflow/task/move/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/move/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostClaim
         * @request POST:/api/docpal/workflow/task/claim
         */
        postClaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/claim`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate6
         * @request POST:/api/docpal/workflow/task/claim/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/task/claim/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSavemetadatamapping
         * @request POST:/api/docpal/workflow/saveMetadataMapping
         */
        postSavemetadatamapping: (data: DocPalDocumentTypeMapping, params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeMetadataMapping, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/saveMetadataMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSavedocumenttypeprofile
         * @request POST:/api/docpal/workflow/saveDocumentTypeProfile
         */
        postSavedocumenttypeprofile: (data: DocumentTypeProfileSettingRequest, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeProfileSetting, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/saveDocumentTypeProfile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostRetryFailWorkflow
         * @request POST:/api/docpal/workflow/retry_fail_workflow
         */
        postRetryFailWorkflow: (data: WorkflowRetryManagerDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/retry_fail_workflow`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate7
         * @request POST:/api/docpal/workflow/retry_fail_workflow/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate7: (data: WorkflowRetryManagerDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/retry_fail_workflow/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostQueryWorkflowRetryPage
         * @request POST:/api/docpal/workflow/query_workflow_retry_page
         */
        postQueryWorkflowRetryPage: (data: QueryWorkflowJobRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOWorkflowRetryManagerDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/query_workflow_retry_page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate8
         * @request POST:/api/docpal/workflow/query_workflow_retry_page/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (data: QueryWorkflowJobRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOWorkflowRetryManagerDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/query_workflow_retry_page/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostProperties
         * @request POST:/api/docpal/workflow/properties
         */
        postProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFormPropertyDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/properties`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostModel
         * @summary Retrieve process model (BPMN) XML
         * @request POST:/api/docpal/workflow/process/model
         */
        postModel: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/model`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate9
         * @summary Retrieve process model (BPMN) XML
         * @request POST:/api/docpal/workflow/process/model/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/model/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostList
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process/list
         */
        postList: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListProcessDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate10
         * @request POST:/api/docpal/workflow/process/instance/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate10: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/instance/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostInstance
         * @request POST:/api/docpal/workflow/process/instance
         */
        postInstance: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/instance`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostValidate
         * @request POST:/api/docpal/workflow/process/condition/validate
         */
        postValidate: (data: ConditionValidationReq, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/condition/validate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeletemetadatamapping
         * @request POST:/api/docpal/workflow/deleteMetadataMapping
         */
        postDeletemetadatamapping: (data: DocumentTypeMetadataMapping, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/deleteMetadataMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostChecknameortitle
         * @request POST:/api/docpal/workflow/checkNameOrTitle
         */
        postChecknameortitle: (data: Record<string, string>, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/checkNameOrTitle`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetQuerydocumenttypeprofileid
         * @request GET:/api/docpal/workflow/querydocumentTypeProFileId
         */
        getQuerydocumenttypeprofileid: (
            query: {
                documentType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLong, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/querydocumentTypeProFileId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetQuerymetadatamapping
         * @request GET:/api/docpal/workflow/queryMetadataMapping
         */
        getQuerymetadatamapping: (
            query?: {
                /** @format int64 */
                id?: number;
                name?: string;
                metaDataMapper?: string;
                /** @format int32 */
                version?: number;
                createUserId?: string;
                createUserName?: string;
                /** @format date-time */
                createTime?: string;
                updateUserId?: string;
                updateUserName?: string;
                /** @format date-time */
                updateTime?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeMetadataMapping, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/queryMetadataMapping`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetQuerymetadatamappingnames
         * @request GET:/api/docpal/workflow/queryMetadataMappingNames
         */
        getQuerymetadatamappingnames: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/queryMetadataMappingNames`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetQuerymetavalidationrule
         * @request GET:/api/docpal/workflow/queryMetaValidationRule
         */
        getQuerymetavalidationrule: (
            query?: {
                /** @format int64 */
                id?: number;
                documentType?: string;
                metaData?: string;
                dataType?: string;
                operation?: string;
                isRequire?: boolean;
                display?: boolean;
                /**
                 * @deprecated
                 * @format int32
                 */
                length?: number;
                /** @deprecated */
                vocabulary?: string;
                /** @format int32 */
                status?: number;
                creatorId?: string;
                creatorName?: string;
                /** @format date-time */
                creationTime?: string;
                modifiedId?: string;
                modifiedName?: string;
                /** @format date-time */
                modifiedTime?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMetadataSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/queryMetaValidationRule`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetQuerydocumenttypeprofile
         * @request GET:/api/docpal/workflow/queryDocumentTypeProfile
         */
        getQuerydocumenttypeprofile: (
            query?: {
                /** @format int64 */
                id?: number;
                documentType?: string;
                profileID?: string;
                profileName?: string;
                rootPath?: string;
                folder?: string;
                /** @format int32 */
                version?: number;
                createUserId?: string;
                createUserName?: string;
                /** @format date-time */
                createTime?: string;
                updateUserId?: string;
                updateUserName?: string;
                /** @format date-time */
                updateTime?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeProfileSetting, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/queryDocumentTypeProfile`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetQuerydocumenttypeprofilesettings
         * @request GET:/api/docpal/workflow/queryDocumentTypeProFileSettings
         */
        getQuerydocumenttypeprofilesettings: (params: RequestParams = {}) =>
            this.request<ResultMapStringListMapStringString, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/queryDocumentTypeProFileSettings`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetprocessdefinitionlist
         * @request GET:/api/docpal/workflow/process/getProcessDefinitionList
         */
        getGetprocessdefinitionlist: (
            query: {
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/getProcessDefinitionList`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetvocabularynames
         * @request GET:/api/docpal/workflow/getVocabularyNames
         */
        getGetvocabularynames: (params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/getVocabularyNames`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetvocabularymap
         * @request GET:/api/docpal/workflow/getVocabularyMap
         */
        getGetvocabularymap: (params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/getVocabularyMap`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetdocumenttypes
         * @request GET:/api/docpal/workflow/getDocumentTypes
         */
        getGetdocumenttypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/getDocumentTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetdatatypebyname
         * @request GET:/api/docpal/workflow/getDataTypeByName
         */
        getGetdatatypebyname: (
            query: {
                name: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultKeywordDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/getDataTypeByName`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetdatabyvocabularyname
         * @request GET:/api/docpal/workflow/getDataByVocabularyName
         */
        getGetdatabyvocabularyname: (
            query: {
                vocabularyName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDirectoryEntry, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/getDataByVocabularyName`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetForms
         * @summary Get the list of form properties associated with the process definition
         * @request GET:/api/docpal/workflow/forms
         */
        getForms: (
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListBpmnDynamicFormDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/forms`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetForms2
         * @summary Get form properties of single element associated with the process definition
         * @request GET:/api/docpal/workflow/forms/{elementKey}
         * @originalName getForms
         * @duplicate
         */
        getForms2: (
            elementKey: string,
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetCheckmetadatavalues
         * @request GET:/api/docpal/workflow/checkMetaDataValues
         */
        getCheckmetadatavalues: (
            query: {
                documentType: string;
                metaData: string;
                value: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/checkMetaDataValues`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteUser
         * @summary Delete process instance by user id
         * @request DELETE:/api/docpal/workflow/process/user
         */
        deleteUser: (
            query: {
                /** Delete Workflow (Request) */
                deleteWorkflowReq: DeleteWorkflowReq;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/user`,
                method: "DELETE",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteProcess
         * @request DELETE:/api/docpal/workflow/process
         */
        deleteProcess: (
            query?: {
                processInstanceId?: string;
                /** @format date-time */
                createdDate?: string;
                /** @format date-time */
                endedDate?: string;
                completed?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeprecate
         * @request DELETE:/api/docpal/workflow/process/
         */
        deleteDeprecate: (
            query?: {
                processInstanceId?: string;
                /** @format date-time */
                createdDate?: string;
                /** @format date-time */
                endedDate?: string;
                completed?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeletedocumenttypeprofile
         * @request DELETE:/api/docpal/workflow/deleteDocumentTypeProfile
         */
        deleteDeletedocumenttypeprofile: (
            query: {
                /** @format int64 */
                profileID: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/deleteDocumentTypeProfile`,
                method: "DELETE",
                query: query,
                ...params,
            }),
    };
    documentNuxeo = {
        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PutDeprecate
         * @request PUT:/api/nuxeo/document/acl/replace/
         */
        putDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/replace/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PutReplace
         * @request PUT:/api/nuxeo/document/acl/replace
         */
        putReplace: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/replace`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostTrainingdata
         * @request POST:/api/nuxeo/document/trainingData
         */
        postTrainingdata: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/trainingData`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbypropertiesforvirtualfolder
         * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder
         */
        postSearchbypropertiesforvirtualfolder: (
            data: DocumentRequestForVirtureFolderDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginationDTOVirtualFolderDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/searchByPropertiesForVirtualFolder`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate
         * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder/
         */
        postDeprecate: (data: DocumentRequestForVirtureFolderDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOVirtualFolderDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/searchByPropertiesForVirtualFolder/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate2
         * @request POST:/api/nuxeo/document/searchByProperties/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/searchByProperties/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbyproperties
         * @request POST:/api/nuxeo/document/searchByProperties
         */
        postSearchbyproperties: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/searchByProperties`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostQueryauditevent
         * @request POST:/api/nuxeo/document/queryAuditEvent
         */
        postQueryauditevent: (data: AuditTemplateDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOAuditTemplateResponseExtendDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/queryAuditEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate3
         * @request POST:/api/nuxeo/document/preview/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/preview/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostPreview
         * @request POST:/api/nuxeo/document/preview
         */
        postPreview: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/preview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostMove
         * @request POST:/api/nuxeo/document/move
         */
        postMove: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/move`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate4
         * @request POST:/api/nuxeo/document/move/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/move/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostIsduplicatename
         * @summary isDuplicateName
         * @request POST:/api/nuxeo/document/isDuplicateName
         */
        postIsduplicatename: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/isDuplicateName`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate5
         * @summary isDuplicateName
         * @request POST:/api/nuxeo/document/isDuplicateName/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/isDuplicateName/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload
         * @request POST:/api/nuxeo/document/download
         */
        postDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate6
         * @request POST:/api/nuxeo/document/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDetail
         * @request POST:/api/nuxeo/document/detail
         */
        postDetail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/detail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate7
         * @request POST:/api/nuxeo/document/createFolders/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate7: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/createFolders/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCreatefolders
         * @request POST:/api/nuxeo/document/createFolders
         */
        postCreatefolders: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/createFolders`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate8
         * @request POST:/api/nuxeo/document/createDocument/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/createDocument/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCreatedocument
         * @request POST:/api/nuxeo/document/createDocument
         */
        postCreatedocument: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/createDocument`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate9
         * @request POST:/api/nuxeo/document/copy/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/copy/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCopy
         * @request POST:/api/nuxeo/document/copy
         */
        postCopy: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/copy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostThumbnail
         * @request POST:/api/nuxeo/document/children/thumbnail
         */
        postThumbnail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocumentThumbnailDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/children/thumbnail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate10
         * @request POST:/api/nuxeo/document/children/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate10: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/children/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostChildren
         * @request POST:/api/nuxeo/document/children
         */
        postChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/children`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostBreadcrumb
         * @request POST:/api/nuxeo/document/breadcrumb
         */
        postBreadcrumb: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/breadcrumb`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate11
         * @request POST:/api/nuxeo/document/breadcrumb/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate11: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/breadcrumb/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate12
         * @request POST:/api/nuxeo/document/acls/
         * @deprecated
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate12: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acls/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAcls
         * @request POST:/api/nuxeo/document/acls
         * @deprecated
         */
        postAcls: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acls`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate13
         * @request POST:/api/nuxeo/document/acl/
         * @deprecated
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate13: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAcl
         * @request POST:/api/nuxeo/document/acl
         * @deprecated
         */
        postAcl: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostUnblock
         * @request POST:/api/nuxeo/document/acl/unblock
         */
        postUnblock: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/unblock`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate14
         * @request POST:/api/nuxeo/document/acl/unblock/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate14: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/unblock/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostBlock
         * @request POST:/api/nuxeo/document/acl/block
         */
        postBlock: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/block`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate15
         * @request POST:/api/nuxeo/document/acl/block/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate15: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/block/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAdd
         * @request POST:/api/nuxeo/document/acl/add
         */
        postAdd: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate16
         * @request POST:/api/nuxeo/document/acl/add/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate16: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDocument
         * @request GET:/api/nuxeo/document
         */
        getDocument: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchDocument
         * @request PATCH:/api/nuxeo/document
         */
        patchDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate
         * @request GET:/api/nuxeo/document/
         */
        getDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchDeprecate
         * @request PATCH:/api/nuxeo/document/
         */
        patchDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate2
         * @request GET:/api/nuxeo/document/{documentId}/acls/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultDocAccessControlListDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/${documentId}/acls/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetAcls
         * @request GET:/api/nuxeo/document/{documentId}/acls
         */
        getAcls: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultDocAccessControlListDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/${documentId}/acls`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetQueryaudittemplate
         * @request GET:/api/nuxeo/document/queryAuditTemplate
         */
        getQueryaudittemplate: (params: RequestParams = {}) =>
            this.request<ResultListAuditTemplate, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/queryAuditTemplate`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetInitializa
         * @request GET:/api/nuxeo/document/initializa
         */
        getInitializa: (
            query: {
                beanName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/initializa`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetInitvocabulary
         * @request GET:/api/nuxeo/document/initVocabulary
         */
        getInitvocabulary: (params: RequestParams = {}) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/initVocabulary`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetInitsharedocument
         * @request GET:/api/nuxeo/document/initShareDocument
         */
        getInitsharedocument: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/initShareDocument`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetInitdamclearup
         * @request GET:/api/nuxeo/document/initDAMClearUp
         */
        getInitdamclearup: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/initDAMClearUp`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetGetdocumenttypesbyflag
         * @request GET:/api/nuxeo/document/getDocumentTypesByFlag
         */
        getGetdocumenttypesbyflag: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/getDocumentTypesByFlag`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDestruction
         * @request GET:/api/nuxeo/document/destruction
         */
        getDestruction: (
            query: {
                beanName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/destruction`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate
         * @request DELETE:/api/nuxeo/document/trash/
         */
        deleteDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/trash/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteTrash
         * @request DELETE:/api/nuxeo/document/trash
         */
        deleteTrash: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/trash`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate2
         * @request DELETE:/api/nuxeo/document/acl/remove/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate2: (
            query: {
                idOrPath: string;
                userId: string;
                permission?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/remove/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteRemove
         * @request DELETE:/api/nuxeo/document/acl/remove
         */
        deleteRemove: (
            query: {
                idOrPath: string;
                userId: string;
                permission?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/document/acl/remove`,
                method: "DELETE",
                query: query,
                ...params,
            }),
    };
    nuxeoAdminController = {
        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetSetting
         * @request GET:/api/nuxeo/admin/virtualfolder/setting
         */
        getSetting: (params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/virtualfolder/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutSetting
         * @request PUT:/api/nuxeo/admin/virtualfolder/setting
         */
        putSetting: (data: VirtualFolderSettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/virtualfolder/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PostSetting
         * @request POST:/api/nuxeo/admin/virtualfolder/setting
         */
        postSetting: (data: VirtualFolderSettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/virtualfolder/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetSetting2
         * @request GET:/api/nuxeo/admin/setting
         * @originalName getSetting
         * @duplicate
         */
        getSetting2: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutSetting2
         * @request PUT:/api/nuxeo/admin/setting
         * @originalName putSetting
         * @duplicate
         */
        putSetting2: (systemId: string, data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetSetting3
         * @request GET:/api/nuxeo/admin/setting/{system_id}
         * @originalName getSetting
         * @duplicate
         */
        getSetting3: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/setting/${systemId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutSetting3
         * @request PUT:/api/nuxeo/admin/setting/{system_id}
         * @originalName putSetting
         * @duplicate
         */
        putSetting3: (systemId: string, data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/setting/${systemId}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetIcon
         * @request GET:/api/nuxeo/admin/icon
         */
        getIcon: (
            query: {
                docTypeId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/icon`,
                method: "GET",
                query: query,
                format: "blob",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutIcon
         * @request PUT:/api/nuxeo/admin/icon
         */
        putIcon: (
            data: {
                id: string;
                image: {
                    direct?: boolean;
                    char?: string;
                    /** @format int32 */
                    short?: number;
                    /** @format int32 */
                    int?: number;
                    /** @format int64 */
                    long?: number;
                    /** @format float */
                    float?: number;
                    /** @format double */
                    double?: number;
                    readOnly?: boolean;
                };
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/icon`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetSetting4
         * @request GET:/api/nuxeo/admin/virtualfolder/setting/{id}
         * @originalName getSetting
         * @duplicate
         */
        getSetting4: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/virtualfolder/setting/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name DeleteSetting
         * @request DELETE:/api/nuxeo/admin/virtualfolder/setting/{id}
         */
        deleteSetting: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/virtualfolder/setting/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetLanguage
         * @request GET:/api/nuxeo/admin/setting/language
         */
        getLanguage: (params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/setting/language`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetIcons
         * @request GET:/api/nuxeo/admin/icons
         */
        getIcons: (params: RequestParams = {}) =>
            this.request<ResultListCustomIconDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/admin/icons`,
                method: "GET",
                ...params,
            }),
    };
    workflowProcessDefinitionController = {
        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PutChangekey
         * @request PUT:/api/docpal/workflow/process/definition/changeKey
         */
        putChangekey: (
            query?: {
                key?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/changeKey`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostValidation
         * @summary Validate BPMN 2.0 XML file whether process definition grammatical
         * @request POST:/api/docpal/workflow/process/definition/validation
         */
        postValidation: (
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/validation`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostUpload
         * @summary Save workflow (process definition)
         * @request POST:/api/docpal/workflow/process/definition/upload
         */
        postUpload: (
            query: {
                requestDTO: ProcessDefinitionDraftRequestDTO;
            },
            data: {
                /** @format binary */
                file?: File;
                /** @format string */
                draftId?: string;
                /** @format string */
                name?: string;
                /** @format string */
                key?: string;
                /** @format boolean */
                isDraft?: boolean;
                /** @format boolean */
                versionId?: string;
                /** @format string */
                jsonValue?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/upload`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetJson
         * @summary Get json of process definition
         * @request GET:/api/docpal/workflow/process/definition/draft/{draftId}/json
         */
        getJson: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}/json`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostJson
         * @summary Update json of process definition, please use string json
         * @request POST:/api/docpal/workflow/process/definition/draft/{draftId}/json
         */
        postJson: (draftId: string, data: ProcessDefinitionDraft, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}/json`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostPage
         * @summary Pagination search of process definition model
         * @request POST:/api/docpal/workflow/process/definition/draft/page
         */
        postPage: (data: ProcessDefinitionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOProcessDefinitionDraft, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostActive
         * @request POST:/api/docpal/workflow/process/definition/active/{draftId}
         */
        postActive: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/active/${draftId}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteSetting
         * @summary Delete folder cabinet setting into the process definition
         * @request DELETE:/api/docpal/workflow/process/definition/draft/{draftId}/cabinet/setting
         */
        deleteSetting: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}/cabinet/setting`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PatchSetting
         * @summary Update folder cabinet setting into the process definition
         * @request PATCH:/api/docpal/workflow/process/definition/draft/{draftId}/cabinet/setting
         */
        patchSetting: (draftId: string, data: ProcessDefinitionDraftRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}/cabinet/setting`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetDefinition
         * @summary Get deployed process definition through process definition key
         * @request GET:/api/docpal/workflow/process/definition/{processDefinitionKey}
         */
        getDefinition: (processDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/${processDefinitionKey}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetHistory
         * @summary Find historical process definitions through process definition key
         * @request GET:/api/docpal/workflow/process/definition/{processDefinitionKey}/history
         */
        getHistory: (processDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/${processDefinitionKey}/history`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetNamespace
         * @summary Get name-space of deployed process definition
         * @request GET:/api/docpal/workflow/process/definition/nameSpace
         */
        getNamespace: (params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/nameSpace`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetForms
         * @summary Get the list of form properties associated with the process definition
         * @request GET:/api/docpal/workflow/process/definition/forms
         */
        getForms: (
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListBpmnDynamicFormDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/forms`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetForms2
         * @summary Get form properties of single element associated with the process definition
         * @request GET:/api/docpal/workflow/process/definition/forms/{elementKey}
         * @originalName getForms
         * @duplicate
         */
        getForms2: (
            elementKey: string,
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetStart
         * @summary Get start-form properties associated with the process definition
         * @request GET:/api/docpal/workflow/process/definition/forms/start
         */
        getStart: (
            query: {
                /** Workflow Process Definition RequestDTO */
                requestDTO: ProcessDefinitionRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBpmnDynamicFormDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/forms/start`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetDraft
         * @summary Get draft through process definition key
         * @request GET:/api/docpal/workflow/process/definition/draft/{draftId}
         */
        getDraft: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteDraft
         * @summary Delete process definition through process definition draft id
         * @request DELETE:/api/docpal/workflow/process/definition/draft/{draftId}
         */
        deleteDraft: (
            draftId: string,
            query?: {
                enforce?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetXml
         * @summary Get draft BPMN2.0 XML file through draft id
         * @request GET:/api/docpal/workflow/process/definition/draft/{draftId}/download/xml
         */
        getXml: (draftId: string, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/draft/${draftId}/download/xml`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetXml2
         * @summary Download BPMN2.0 XML file through process definition ID
         * @request GET:/api/docpal/workflow/process/definition/download/xml
         * @originalName getXml
         * @duplicate
         */
        getXml2: (
            query: {
                processDefinitionId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/download/xml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteSuspend
         * @summary Suspend a process definition
         * @request DELETE:/api/docpal/workflow/process/definition/suspend/{draftId}
         */
        deleteSuspend: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/process/definition/suspend/${draftId}`,
                method: "DELETE",
                ...params,
            }),
    };
    whatsAppController = {
        /**
         * No description
         *
         * @tags whats-app-controller
         * @name PutUpdateWhatsappSetting
         * @request PUT:/api/docpal/whatsapp/update_whatsapp_setting
         */
        putUpdateWhatsappSetting: (data: WhatsAppSettingDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/whatsapp/update_whatsapp_setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name PostOverview
         * @request POST:/api/docpal/whatsapp/overview
         */
        postOverview: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultWhatsAppOverviewResponse, ResultObject | Result | ResultString>({
                path: `/api/docpal/whatsapp/overview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name PostFindWhatsappLog
         * @request POST:/api/docpal/whatsapp/find_whatsapp_log
         */
        postFindWhatsappLog: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOWhatsAppLogDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/whatsapp/find_whatsapp_log`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name GetTestConnection
         * @request GET:/api/docpal/whatsapp/test_connection
         */
        getTestConnection: (params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/whatsapp/test_connection`,
                method: "GET",
                ...params,
            }),
    };
    nuxeoUserController = {
        /**
         * No description
         *
         * @tags NuxeoUserController
         * @name GetSetting
         * @summary Load User Setting
         * @request GET:/api/docpal/user/setting
         */
        getSetting: (params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/user/setting`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoUserController
         * @name PutSetting
         * @request PUT:/api/docpal/user/setting
         */
        putSetting: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/user/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoUserController
         * @name PatchSetting
         * @request PATCH:/api/docpal/user/setting
         */
        patchSetting: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/user/setting`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    emailController = {
        /**
         * No description
         *
         * @tags EmailController
         * @name PutTemplate
         * @summary Modify (Email Template)
         * @request PUT:/api/docpal/template/email/template
         */
        putTemplate: (data: EmailTemplate, params: RequestParams = {}) =>
            this.request<ResultEmailTemplateResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/template`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplate
         * @summary Create Email Template
         * @request POST:/api/docpal/template/email/template
         */
        postTemplate: (data: EmailTemplate, params: RequestParams = {}) =>
            this.request<ResultEmailTemplateResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/template`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PutLayout
         * @summary Update (Email Layout)
         * @request PUT:/api/docpal/template/email/layout
         */
        putLayout: (data: EmailLayout, params: RequestParams = {}) =>
            this.request<ResultEmailLayout, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/layout`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostLayout
         * @summary Create (Email Layout)
         * @request POST:/api/docpal/template/email/layout
         */
        postLayout: (data: EmailLayout, params: RequestParams = {}) =>
            this.request<ResultEmailLayout, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/layout`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostPage
         * @summary Pagination search (Email Template)
         * @request POST:/api/docpal/template/email/template/page
         */
        postPage: (data: EmailTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOEmailTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/template/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostSend
         * @summary Send test email using email template
         * @request POST:/api/docpal/template/email/send
         */
        postSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostCustomize
         * @summary Send Customize Email
         * @request POST:/api/docpal/template/email/send/customize
         */
        postCustomize: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/send/customize`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostPage2
         * @summary Pagination search (Email Layout)
         * @request POST:/api/docpal/template/email/layout/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: EmailLayoutRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOEmailLayout, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/layout/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplate
         * @summary Obtain email template detail
         * @request GET:/api/docpal/template/email/template/{id}
         */
        getTemplate: (id: string, params: RequestParams = {}) =>
            this.request<ResultEmailTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/template/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name DeleteTemplate
         * @summary Delete email template by id
         * @request DELETE:/api/docpal/template/email/template/{id}
         */
        deleteTemplate: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/template/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetLayouts
         * @summary Obtain all layouts used by email template
         * @request GET:/api/docpal/template/email/template/layouts
         */
        getLayouts: (params: RequestParams = {}) =>
            this.request<ResultListEmailLayout, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/template/layouts`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetLayout
         * @summary Obtain email layout by id
         * @request GET:/api/docpal/template/email/layout/{id}
         */
        getLayout: (id: number, params: RequestParams = {}) =>
            this.request<ResultEmailLayout, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/layout/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name DeleteLayout
         * @summary Delete email layout by id
         * @request DELETE:/api/docpal/template/email/layout/{id}
         */
        deleteLayout: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/layout/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetAll
         * @summary Obtain all email layout
         * @request GET:/api/docpal/template/email/layout/all
         */
        getAll: (params: RequestParams = {}) =>
            this.request<ResultListEmailLayout, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/layout/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetAll2
         * @request GET:/api/docpal/template/email/all
         * @originalName getAll
         * @duplicate
         */
        getAll2: (params: RequestParams = {}) =>
            this.request<ResultListEmailTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/email/all`,
                method: "GET",
                ...params,
            }),
    };
    documentTemplateController = {
        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PutDocument
         * @summary Update (Document Template)
         * @request PUT:/api/docpal/template/document
         */
        putDocument: (data: DocumentTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplateResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PostDocument
         * @summary Create (Document Template)
         * @request POST:/api/docpal/template/document
         */
        postDocument: (
            query: {
                /** Document Template RequestDTO */
                requestDTO: DocumentTemplateRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentTemplateResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PutUpload
         * @summary Upload File (Document Template)
         * @request PUT:/api/docpal/template/document/upload
         */
        putUpload: (
            query: {
                /** Document Template RequestDTO */
                requestDTO: DocumentTemplateRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentTemplateResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/upload`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PostPage
         * @summary Pagination search (Document Template)
         * @request POST:/api/docpal/template/document/page
         */
        postPage: (data: DocumentTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocumentTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PostFile
         * @summary Download Test File (Use Document Template)
         * @request POST:/api/docpal/template/document/generate/file
         */
        postFile: (data: DocumentTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/generate/file`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetDocument
         * @summary Get Document Template
         * @request GET:/api/docpal/template/document/{id}
         */
        getDocument: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name DeleteDocument
         * @summary Delete Document Template by id
         * @request DELETE:/api/docpal/template/document/{id}
         */
        deleteDocument: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetFiletype
         * @request GET:/api/docpal/template/document/support/fileType
         */
        getFiletype: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/support/fileType`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetRefresh
         * @summary Refresh document template variables
         * @request GET:/api/docpal/template/document/refresh/{id}
         */
        getRefresh: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplateResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/refresh/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/template/document/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetAll
         * @summary Get All Document Template
         * @request GET:/api/docpal/template/document/all
         */
        getAll: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/template/document/all`,
                method: "GET",
                ...params,
            }),
    };
    retentionPolicyController = {
        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PutRetentions
         * @summary Modify retention policy
         * @request PUT:/api/docpal/policy/retentions
         */
        putRetentions: (data: RetentionPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PostRetentions
         * @summary Create a new retention policy
         * @request POST:/api/docpal/policy/retentions
         */
        postRetentions: (data: RetentionPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PostPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/retentions/page
         */
        postPage: (data: RetentionPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTORetentionPolicy, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PatchStatus
         * @summary Modify status by id
         * @request PATCH:/api/docpal/policy/retentions/{id}/status/{status}
         */
        patchStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetRetentions
         * @summary Obtain RetentionPolicy detail
         * @request GET:/api/docpal/policy/retentions/{id}
         */
        getRetentions: (id: number, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name DeleteRetentions
         * @summary Delete the retention policy it must not have been used yet
         * @request DELETE:/api/docpal/policy/retentions/{id}
         */
        deleteRetentions: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/policy/retentions/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetUsed
         * @summary Query used document-type of retention policies
         * @request GET:/api/docpal/policy/retentions/documentType/used
         */
        getUsed: (
            query: {
                documentType: string;
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListRetentionPolicyTrigger, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/retentions/documentType/used`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    holdPolicyController = {
        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PutHolds
         * @summary Update hold policy
         * @request PUT:/api/docpal/policy/holds
         */
        putHolds: (data: HoldPolicy, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/holds`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PostHolds
         * @summary Create a new hold policy
         * @request POST:/api/docpal/policy/holds
         */
        postHolds: (data: HoldPolicy, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/holds`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PostPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/holds/page
         */
        postPage: (data: HoldPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOHoldPolicy, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/holds/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PatchStatus
         * @summary Modify status by id
         * @request PATCH:/api/docpal/policy/holds/{id}/status/{status}
         */
        patchStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/holds/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name GetHolds
         * @summary Obtain hold policy detail
         * @request GET:/api/docpal/policy/holds/{id}
         */
        getHolds: (id: number, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/holds/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name DeleteHolds
         * @summary Delete the hold policy it must not have been used yet
         * @request DELETE:/api/docpal/policy/holds/{id}
         */
        deleteHolds: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/policy/holds/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    personalDashboardController = {
        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name PutUpdate
         * @request PUT:/api/docpal/personal/dashboard/update
         */
        putUpdate: (data: PersonalDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/personal/dashboard/update`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name PostDashboard
         * @request POST:/api/docpal/personal/dashboard
         */
        postDashboard: (data: PersonalDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOPersonalDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/personal/dashboard`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name PostSave
         * @request POST:/api/docpal/personal/dashboard/save
         */
        postSave: (data: PersonalDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/personal/dashboard/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name GetDashboard
         * @summary Obtain a dashboard detail
         * @request GET:/api/docpal/personal/dashboard/{id}
         */
        getDashboard: (id: number, params: RequestParams = {}) =>
            this.request<ResultPersonalDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/personal/dashboard/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name DeleteDashboard
         * @request DELETE:/api/docpal/personal/dashboard/{id}
         */
        deleteDashboard: (id: number, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/personal/dashboard/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    masterTableController = {
        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetTables
         * @summary Get all master tables
         * @request GET:/api/docpal/master/tables
         */
        getTables: (params: RequestParams = {}) =>
            this.request<ResultListMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutTables
         * @summary Update information (Master Table)
         * @request PUT:/api/docpal/master/tables
         */
        putTables: (data: MasterTable, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostTables
         * @summary Creation (Master Table)
         * @request POST:/api/docpal/master/tables
         */
        postTables: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutRecord
         * @summary update data (master table)
         * @request PUT:/api/docpal/master/tables/{id}/record
         */
        putRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteRecord
         * @summary Delete record
         * @request DELETE:/api/docpal/master/tables/{id}/record
         */
        deleteRecord: (
            id: string,
            query: {
                recordId: string;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record`,
                method: "DELETE",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutRecord2
         * @request PUT:/api/docpal/master/tables/{id}/batch/record
         * @originalName putRecord
         * @duplicate
         */
        putRecord2: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/batch/record`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostExport
         * @summary Export data of a master table
         * @request POST:/api/docpal/master/tables/{id}/record/export
         */
        postExport: (
            id: string,
            query?: {
                operation?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record/export`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostField
         * @summary Add single field to master table
         * @request POST:/api/docpal/master/tables/{id}/field
         */
        postField: (id: string, data: MTFieldInfo, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/field`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetRecord
         * @summary query record with related fields of master table
         * @request GET:/api/docpal/master/tables/record
         */
        getRecord: (
            query: {
                id: string;
                recordId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/record`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostRecord
         * @summary Insert data into a master table
         * @request POST:/api/docpal/master/tables/record
         */
        postRecord: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/record`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostPage
         * @summary Pagination Search (Master Table Record)
         * @request POST:/api/docpal/master/tables/record/page
         */
        postPage: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostNonpermission
         * @request POST:/api/docpal/master/tables/record/page/nonPermission
         */
        postNonpermission: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/record/page/nonPermission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostImport
         * @summary Upload json for import data into a master table
         * @request POST:/api/docpal/master/tables/record/import
         */
        postImport: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/record/import`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostFile
         * @summary Upload .csv file for import data into a master table
         * @request POST:/api/docpal/master/tables/record/import/file
         */
        postFile: (
            query: {
                /** @format binary */
                file: File;
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/record/import/file`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostPage2
         * @summary Pagination search (Master Table)
         * @request POST:/api/docpal/master/tables/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostLogs
         * @summary Pagination Search (Audit Logs of master table)
         * @request POST:/api/docpal/master/tables/logs
         */
        postLogs: (data: MTAuditLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/logs`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostConditions
         * @request POST:/api/docpal/master/tables/logs/page/conditions
         */
        postConditions: (data: MTAuditLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/logs/page/conditions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostFields
         * @summary Add multiple fields to master table
         * @request POST:/api/docpal/master/tables/fields
         */
        postFields: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/fields`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostAdd
         * @summary For master table adding column
         * @request POST:/api/docpal/master/tables/column/add
         */
        postAdd: (data: MTAddColumnRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/column/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostDelete
         * @summary delete master table record
         * @request POST:/api/docpal/master/tables/batch/delete
         */
        postDelete: (data: DeleteMTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/batch/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostRemove
         * @summary Remove permission of current master table
         * @request POST:/api/docpal/master/tables/acls/remove
         */
        postRemove: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/acls/remove`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostUpdate
         * @summary Remove permission of current master table
         * @request POST:/api/docpal/master/tables/acls/update
         */
        postUpdate: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/acls/update`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostDelete2
         * @summary Delete permission of current master table
         * @request POST:/api/docpal/master/tables/acls/delete
         * @originalName postDelete
         * @duplicate
         */
        postDelete2: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/acls/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostAdd2
         * @summary Add permission of current master table
         * @request POST:/api/docpal/master/tables/acls/add
         * @originalName postAdd
         * @duplicate
         */
        postAdd2: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/acls/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PatchStatus
         * @summary Enable or Disable Record
         * @request PATCH:/api/docpal/master/tables/{id}/record/status
         */
        patchStatus: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record/status`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PatchStatus2
         * @request PATCH:/api/docpal/master/tables/{id}/batch/record/status
         * @originalName patchStatus
         * @duplicate
         */
        patchStatus2: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/batch/record/status`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetTables2
         * @summary Get all fields of master table and include associated data structures
         * @request GET:/api/docpal/master/tables/{id}
         * @originalName getTables
         * @duplicate
         */
        getTables2: (id: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteTables
         * @request DELETE:/api/docpal/master/tables/{id}
         */
        deleteTables: (
            id: string,
            query?: {
                enforceable?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetStructure
         * @summary Get data structure of master table，but not relation fields
         * @request GET:/api/docpal/master/tables/{id}/structure
         */
        getStructure: (id: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/structure`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetRecord2
         * @summary Query row data record in single master table
         * @request GET:/api/docpal/master/tables/{id}/record/{recordId}
         * @originalName getRecord
         * @duplicate
         */
        getRecord2: (id: string, recordId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record/${recordId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetTemplate
         * @summary Download excel template file of master table for use import data
         * @request GET:/api/docpal/master/tables/{id}/record/template
         */
        getTemplate: (
            id: string,
            query?: {
                operation?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record/template`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetAcls
         * @summary Obtain all permission of current master table
         * @request GET:/api/docpal/master/tables/{id}/acls
         */
        getAcls: (id: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/acls`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetStructure2
         * @summary For repair structure of master table ( Add column [status] if does not exist )
         * @request GET:/api/docpal/master/tables/repair/structure
         * @originalName getStructure
         * @duplicate
         */
        getStructure2: (params: RequestParams = {}) =>
            this.request<Record<string, object>, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/repair/structure`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetRelation
         * @summary query relation of master table
         * @request GET:/api/docpal/master/tables/relation/{id}
         */
        getRelation: (id: string, params: RequestParams = {}) =>
            this.request<ResultListMTRelationResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/relation/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetRecords
         * @summary query records with related fields of master table
         * @request GET:/api/docpal/master/tables/records
         */
        getRecords: (
            query: {
                relationTable: string;
                relationField: string;
                displayField: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/records`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetConditions
         * @request GET:/api/docpal/master/tables/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetName
         * @summary Obtain structure of master table through table label
         * @request GET:/api/docpal/master/tables/name/{name}
         */
        getName: (name: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetFailure
         * @summary Download data that failed to upload .csv file
         * @request GET:/api/docpal/master/tables/download/failure
         */
        getFailure: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/download/failure`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMapping
         * @summary Obtain dataType mapping of master table
         * @request GET:/api/docpal/master/tables/dataType/mapping
         */
        getMapping: (params: RequestParams = {}) =>
            this.request<ResultListMTFieldTypeMapping, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/dataType/mapping`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteBatch
         * @summary Batch delete record by id array
         * @request DELETE:/api/docpal/master/tables/{id}/record/batch
         */
        deleteBatch: (
            id: string,
            query: {
                recordIds: string[];
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/record/batch`,
                method: "DELETE",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteFields
         * @summary Delete field when not data (Master Table)
         * @request DELETE:/api/docpal/master/tables/{id}/fields
         */
        deleteFields: (
            id: string,
            query: {
                columnName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/master/tables/${id}/fields`,
                method: "DELETE",
                query: query,
                ...params,
            }),
    };
    formDesignController = {
        /**
         * No description
         *
         * @tags FormDesignController
         * @name PutStatus
         * @request PUT:/api/docpal/form/design/{draftId}/formResult/status
         */
        putStatus: (draftId: string, data: EasyFormResult, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/${draftId}/formResult/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostDesign
         * @summary Create a form design
         * @request POST:/api/docpal/form/design
         */
        postDesign: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostData
         * @summary Submit form data
         * @request POST:/api/docpal/form/design/submit/data
         */
        postData: (
            query: {
                /** Form Designer (Request) */
                formDataDTO: FormDesignDataDTO;
            },
            data: FormDesignDataDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/submit/data`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostPreview
         * @summary Save preview style
         * @request POST:/api/docpal/form/design/save/preview
         */
        postPreview: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/save/preview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostPermission
         * @summary Save Permission
         * @request POST:/api/docpal/form/design/save/permission
         */
        postPermission: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/save/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostInformation
         * @summary Save information
         * @request POST:/api/docpal/form/design/save/information
         */
        postInformation: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/save/information`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormresult
         * @summary Save Form Result
         * @request POST:/api/docpal/form/design/save/formResult
         */
        postFormresult: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/save/formResult`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostAppend
         * @request POST:/api/docpal/form/design/save/formResult/append
         */
        postAppend: (data: EasyFormResultRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEasyFormResult, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/save/formResult/append`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostRecords
         * @request POST:/api/docpal/form/design/records
         */
        postRecords: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListLinkedHashMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/records`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostPage
         * @summary Paging search form data
         * @request POST:/api/docpal/form/design/record/page
         */
        postPage: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostPublish
         * @summary Publish Form Design
         * @request POST:/api/docpal/form/design/publish
         */
        postPublish: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/publish`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostPage2
         * @summary Paging Query (form design)
         * @request POST:/api/docpal/form/design/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostDatapatch
         * @request POST:/api/docpal/form/design/dataPatch
         */
        postDatapatch: (params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/dataPatch`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PatchName
         * @summary Update name of form design
         * @request PATCH:/api/docpal/form/design/name
         */
        patchName: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/name`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PatchEnable
         * @summary Enable a form design
         * @request PATCH:/api/docpal/form/design/enable/{id}
         */
        patchEnable: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/enable/${id}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PatchDisable
         * @summary Disable a form design
         * @request PATCH:/api/docpal/form/design/disable/{id}
         */
        patchDisable: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/disable/${id}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetDetail
         * @summary Retrieve form design detail of published
         * @request GET:/api/docpal/form/design/{id}/detail
         */
        getDetail: (id: string, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/${id}/detail`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetDefinitions
         * @request GET:/api/docpal/form/design/process/definitions
         */
        getDefinitions: (params: RequestParams = {}) =>
            this.request<ResultListPDResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/process/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetDraft
         * @summary Retrieve form design draft
         * @request GET:/api/docpal/form/design/draft/{id}
         */
        getDraft: (id: string, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/draft/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetMapping
         * @summary Obtain dataType mapping of form design
         * @request GET:/api/docpal/form/design/dataType/mapping
         */
        getMapping: (params: RequestParams = {}) =>
            this.request<ResultListMTFieldTypeMapping, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/dataType/mapping`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name DeleteDesign
         * @request DELETE:/api/docpal/form/design/{id}
         */
        deleteDesign: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name DeleteFormresult
         * @request DELETE:/api/docpal/form/design/{draftId}/formResult/{formResultId}
         */
        deleteFormresult: (draftId: string, formResultId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/form/design/${draftId}/formResult/${formResultId}`,
                method: "DELETE",
                ...params,
            }),
    };
    damSettingController = {
        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PutSetting
         * @request PUT:/api/docpal/dam/setting
         */
        putSetting: (data: DAMConversionSettingRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/dam/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PostGetallsetting
         * @request POST:/api/docpal/dam/getAllSetting
         */
        postGetallsetting: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dam/getAllSetting`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PostEditsetting
         * @request POST:/api/docpal/dam/editSetting
         */
        postEditsetting: (data: DAMConversionSettingRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/dam/editSetting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PostDeletesettings
         * @request POST:/api/docpal/dam/deleteSettings
         */
        postDeletesettings: (data: number[], params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/dam/deleteSettings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name GetGetsupportedformat
         * @request GET:/api/docpal/dam/getSupportedFormat
         */
        getGetsupportedformat: (params: RequestParams = {}) =>
            this.request<ResultHashMapStringListConversionSupportDestType, ResultObject | Result | ResultString>({
                path: `/api/docpal/dam/getSupportedFormat`,
                method: "GET",
                ...params,
            }),
    };
    caseTypeController = {
        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetTypes
         * @summary Retrieve all case types
         * @request GET:/api/docpal/case/types
         */
        getTypes: (
            query?: {
                name?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCaseType, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PutTypes
         * @summary Update case type
         * @request PUT:/api/docpal/case/types
         */
        putTypes: (data: CaseType, params: RequestParams = {}) =>
            this.request<ResultCaseType, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostTypes
         * @summary Create a new case type
         * @request POST:/api/docpal/case/types
         */
        postTypes: (data: CaseType, params: RequestParams = {}) =>
            this.request<ResultCaseType, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PutEnable
         * @summary Enable or Disable case type
         * @request PUT:/api/docpal/case/types/enable
         */
        putEnable: (data: CaseType, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/enable`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPublish
         * @summary Publish CMMN file to workflow application
         * @request POST:/api/docpal/case/types/{id}/publish
         */
        postPublish: (
            id: string,
            data: {
                /** @format binary */
                file?: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/publish`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostSave
         * @summary Save draft cmmn xml
         * @request POST:/api/docpal/case/types/{id}/draft/save
         */
        postSave: (
            id: string,
            query: {
                /** @format binary */
                file: File;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseModelDraft, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/draft/save`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostDownload
         * @summary Download draft cmmn xml (case model definition)
         * @request POST:/api/docpal/case/types/{id}/draft/download
         */
        postDownload: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/draft/download`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCopy
         * @summary New Case for new case type
         * @request POST:/api/docpal/case/types/{id}/copy
         */
        postCopy: (id: string, data: CaseType, params: RequestParams = {}) =>
            this.request<ResultCaseTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/copy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetPermissions
         * @request GET:/api/docpal/case/types/{caseTypeId}/permissions
         */
        getPermissions: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${caseTypeId}/permissions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPermissions
         * @summary Save case type permissions
         * @request POST:/api/docpal/case/types/{caseTypeId}/permissions
         */
        postPermissions: (caseTypeId: string, data: CmmnPlanPermissionDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${caseTypeId}/permissions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostNew
         * @summary Create a new version of case type
         * @request POST:/api/docpal/case/types/version/{versionId}/new
         */
        postNew: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultCaseTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/version/${versionId}/new`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostActive
         * @summary Deploy a version case type
         * @request POST:/api/docpal/case/types/version/{versionId}/active
         */
        postActive: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/version/${versionId}/active`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPage
         * @summary Paging query case-model version
         * @request POST:/api/docpal/case/types/version/page
         */
        postPage: (data: CmmnVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/version/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostSave2
         * @summary Save style json of cmmn xml
         * @request POST:/api/docpal/case/types/styleJson/save
         * @originalName postSave
         * @duplicate
         */
        postSave2: (data: CmmnVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCmmnVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/styleJson/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostRepair
         * @request POST:/api/docpal/case/types/repair
         */
        postRepair: (
            query?: {
                id?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/repair`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPage2
         * @summary Pagination search (Case Type)
         * @request POST:/api/docpal/case/types/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCaseType, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostList
         * @summary Retrieve case list through the list of case id
         * @request POST:/api/docpal/case/types/list
         */
        postList: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListCaseTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PatchSave
         * @summary Query cmmn version information of the last successfully deployed version
         * @request PATCH:/api/docpal/case/types/version/{versionId}/save
         */
        patchSave: (
            versionId: string,
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/version/${versionId}/save`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PatchSaveall
         * @summary Query cmmn version information of the last successfully deployed version
         * @request PATCH:/api/docpal/case/types/version/{versionId}/saveAll
         */
        patchSaveall: (
            versionId: string,
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/version/${versionId}/saveAll`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetTypes2
         * @summary Retrieve case type detail
         * @request GET:/api/docpal/case/types/{id}
         * @originalName getTypes
         * @duplicate
         */
        getTypes2: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name DeleteTypes
         * @summary Delete the case type it must not have been used yet
         * @request DELETE:/api/docpal/case/types/{id}
         */
        deleteTypes: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetVersions
         * @summary Create a new version case type
         * @request GET:/api/docpal/case/types/{id}/versions
         */
        getVersions: (id: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/versions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetStylejson
         * @summary Query style json of cmmn xml
         * @request GET:/api/docpal/case/types/{id}/styleJson
         */
        getStylejson: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/styleJson`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetStarttask
         * @summary Retrieve start humanTask of a case model definition
         * @request GET:/api/docpal/case/types/{id}/startTask
         */
        getStarttask: (
            id: string,
            query?: {
                startMatchSign?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/startTask`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetXml
         * @summary Download draft cmmn xml (case model definition)
         * @request GET:/api/docpal/case/types/{id}/download/xml
         */
        getXml: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/download/xml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetVersion
         * @summary Download latest version cmmn xml (case model definition)
         * @request GET:/api/docpal/case/types/{id}/download/deploy/version
         */
        getVersion: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/download/deploy/version`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetVersion2
         * @summary Query cmmn version information of the last successfully deployed version
         * @request GET:/api/docpal/case/types/{id}/deploy/version
         * @originalName getVersion
         * @duplicate
         */
        getVersion2: (id: string, params: RequestParams = {}) =>
            this.request<ResultCaseModelDraft, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${id}/deploy/version`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetPermissions2
         * @request GET:/api/docpal/case/types/{caseTypeId}/permissions/{userId}
         * @originalName getPermissions
         * @duplicate
         */
        getPermissions2: (caseTypeId: string, userId: string, params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${caseTypeId}/permissions/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetDeployment
         * @request GET:/api/docpal/case/types/{caseDefinitionKey}/deployment
         */
        getDeployment: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultCmmnDeploymentDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${caseDefinitionKey}/deployment`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetVersion3
         * @summary Retrieve detail of case model version
         * @request GET:/api/docpal/case/types/version/{versionId}
         * @originalName getVersion
         * @duplicate
         */
        getVersion3: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/version/${versionId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetRules
         * @summary Retrieve case type permission rules
         * @request GET:/api/docpal/case/types/permissions/rules
         */
        getRules: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/permissions/rules`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetMapping
         * @summary Obtain support column mapping
         * @request GET:/api/docpal/case/types/dataType/mapping
         */
        getMapping: (params: RequestParams = {}) =>
            this.request<ResultListMTFieldTypeMapping, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/dataType/mapping`,
                method: "GET",
                ...params,
            }),
    };
    cmmnDashboardController = {
        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PutDashboard
         * @summary Update case dashboard
         * @request PUT:/api/docpal/case/dashboard
         */
        putDashboard: (data: CmmnDashboard, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostDashboard
         * @summary Create a new case dashboard
         * @request POST:/api/docpal/case/dashboard
         */
        postDashboard: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PutStatus
         * @request PUT:/api/docpal/case/dashboard/status
         */
        putStatus: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostStyle
         * @summary Save dashboard Json
         * @request POST:/api/docpal/case/dashboard/save/style
         */
        postStyle: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/save/style`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostPage
         * @summary Pagination search (Case Dashboard)
         * @request POST:/api/docpal/case/dashboard/page
         */
        postPage: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostTasks
         * @summary Query sub-process tasks of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/tasks
         */
        postTasks: (caseId: string, data: CmmnProcessRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/process/instance/tasks`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostPage2
         * @summary Pagination Search process instance of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (caseId: string, data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnProcessInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/process/instance/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetDashboard
         * @summary Retrieve case dashboard detail
         * @request GET:/api/docpal/case/dashboard/{id}
         */
        getDashboard: (id: string, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name DeleteDashboard
         * @summary Delete the case dashboard it must not have been used yet
         * @request DELETE:/api/docpal/case/dashboard/{id}
         */
        deleteDashboard: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetStatus
         * @summary Obtain Milestone Status of a case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseInstanceId}/milestone/status
         */
        getStatus: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseInstanceId}/milestone/status`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetTasks
         * @summary Retrieve all tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/tasks
         */
        getTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetStages
         * @summary Retrieve stages of current case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/stages
         */
        getStages: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetData
         * @summary Retrieve primary form data (Case Dashboard) structure
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/primaryForm/data
         */
        getData: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceFormDataDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/primaryForm/data`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetPlanitems
         * @summary Retrieve planItems
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/planItems
         */
        getPlanitems: (
            caseId: string,
            query: {
                type: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/planItems`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetTasks2
         * @summary Retrieve personal tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/personal/tasks
         * @originalName getTasks
         * @duplicate
         */
        getTasks2: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/personal/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetEvents
         * @summary Retrieve all events of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/events
         */
        getEvents: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetActivity
         * @summary Retrieve activities of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/activity
         */
        getActivity: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnActivityItem, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetActions
         * @summary Retrieve activities of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/actions
         */
        getActions: (
            caseId: string,
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/actions`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetPlanitems2
         * @summary Retrieve all planItem instance of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/stage/planItems
         * @originalName getPlanitems
         * @duplicate
         */
        getPlanitems2: (
            query: {
                /** Case Instance Id */
                caseInstanceId: any;
                /** Stage Plan Item Definition Id */
                stageDefinitionId: any;
                /** PlanItemInstanceDTO */
                planItemInstanceDTO: PlanItemInstanceDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/instance/stage/planItems`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCasetype
         * @summary Retrieve all Case View Dashboard
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}
         */
        getCasetype: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetVersionnumber
         * @summary Retrieve case dashboard detail
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/versionNumber/{versionNumber}
         */
        getVersionnumber: (caseTypeId: string, versionNumber: string, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/versionNumber/${versionNumber}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetStages2
         * @summary Retrieve stages of current case instance
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/stages
         * @originalName getStages
         * @duplicate
         */
        getStages2: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetPrimaryform
         * @summary Retrieve primary form (Case Dashboard)
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/primaryForm
         */
        getPrimaryform: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnPlanFormDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/primaryForm`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetActivity2
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/activity
         * @originalName getActivity
         * @duplicate
         */
        getActivity2: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetActions2
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/actions
         * @originalName getActions
         * @duplicate
         */
        getActions2: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/actions`,
                method: "GET",
                ...params,
            }),
    };
    taskController = {
        /**
         * No description
         *
         * @tags TaskController
         * @name PutCalendars
         * @summary Update Event Task
         * @request PUT:/api/docpal/calendars
         */
        putCalendars: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultCalendarTaskRespDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostCalendars
         * @summary Create a new event task
         * @request POST:/api/docpal/calendars
         */
        postCalendars: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultCalendarTaskRespDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetSetting
         * @summary Obtain calendar widget settings
         * @request GET:/api/docpal/calendars/widget/setting
         */
        getSetting: (params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/widget/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostSetting
         * @summary Save calendar settings
         * @request POST:/api/docpal/calendars/widget/setting
         */
        postSetting: (data: Record<string, object>, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/widget/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetSetting2
         * @summary Obtain calendar settings
         * @request GET:/api/docpal/calendars/setting
         * @originalName getSetting
         * @duplicate
         */
        getSetting2: (params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostSetting2
         * @summary Save calendar settings
         * @request POST:/api/docpal/calendars/setting
         * @originalName postSetting
         * @duplicate
         */
        postSetting2: (data: Record<string, object>, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostList
         * @summary Query list
         * @request POST:/api/docpal/calendars/list
         */
        postList: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultListCalendarTaskRespDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PatchStatus
         * @summary Modify status by id
         * @request PATCH:/api/docpal/calendars/{id}/status/{status}
         */
        patchStatus: (id: string, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetCalendars
         * @request GET:/api/docpal/calendars/{id}
         */
        getCalendars: (id: string, params: RequestParams = {}) =>
            this.request<ResultCalendarTaskRespDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name DeleteCalendars
         * @summary Delete the Task  it must not have been used yet
         * @request DELETE:/api/docpal/calendars/{id}
         */
        deleteCalendars: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetActive
         * @request GET:/api/docpal/calendars/active
         */
        getActive: (params: RequestParams = {}) =>
            this.request<ResultListCalendarTaskRespDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/calendars/active`,
                method: "GET",
                ...params,
            }),
    };
    azureOcrController = {
        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutDeprecate
         * @request PUT:/api/docpal/azure/ocr/updateOcrSetting/
         */
        putDeprecate: (data: AzureOcrSettingDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/updateOcrSetting/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutUpdateocrsetting
         * @request PUT:/api/docpal/azure/ocr/updateOcrSetting
         */
        putUpdateocrsetting: (data: AzureOcrSettingDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/updateOcrSetting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutUpdateocrprofilemapping
         * @request PUT:/api/docpal/azure/ocr/updateOcrProfileMapping
         */
        putUpdateocrprofilemapping: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/updateOcrProfileMapping`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutDeprecate2
         * @request PUT:/api/docpal/azure/ocr/updateOcrProfileMapping/
         * @originalName putDeprecate
         * @duplicate
         */
        putDeprecate2: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/updateOcrProfileMapping/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutUpdateapisetting
         * @request PUT:/api/docpal/azure/ocr/updateApiSetting
         */
        putUpdateapisetting: (data: AzureOcrApiKeyDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/updateApiSetting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutDeprecate3
         * @request PUT:/api/docpal/azure/ocr/updateApiSetting/
         * @originalName putDeprecate
         * @duplicate
         */
        putDeprecate3: (data: AzureOcrApiKeyDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/updateApiSetting/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostDeprecate
         * @request POST:/api/docpal/azure/ocr/queryOcrTransactionLogs/
         */
        postDeprecate: (data: OcrTransactionLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOOcrTransactionLogDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/queryOcrTransactionLogs/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostQueryocrtransactionlogs
         * @request POST:/api/docpal/azure/ocr/queryOcrTransactionLogs
         */
        postQueryocrtransactionlogs: (data: OcrTransactionLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOOcrTransactionLogDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/queryOcrTransactionLogs`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostCreateocrprofilemapping
         * @request POST:/api/docpal/azure/ocr/createOcrProfileMapping
         */
        postCreateocrprofilemapping: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/createOcrProfileMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostDeprecate2
         * @request POST:/api/docpal/azure/ocr/createOcrProfileMapping/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/createOcrProfileMapping/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetDeprecate
         * @request GET:/api/docpal/azure/ocr/queryAzureSetting/
         */
        getDeprecate: (params: RequestParams = {}) =>
            this.request<ResultAzureSettingDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/queryAzureSetting/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetQueryazuresetting
         * @request GET:/api/docpal/azure/ocr/queryAzureSetting
         */
        getQueryazuresetting: (params: RequestParams = {}) =>
            this.request<ResultAzureSettingDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/queryAzureSetting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetDeprecate2
         * @request GET:/api/docpal/azure/ocr/queryAzureOcrModels/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/queryAzureOcrModels/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetQueryazureocrmodels
         * @request GET:/api/docpal/azure/ocr/queryAzureOcrModels
         */
        getQueryazureocrmodels: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/queryAzureOcrModels`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetDeprecate3
         * @request GET:/api/docpal/azure/ocr/conditions/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/conditions/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetConditions
         * @request GET:/api/docpal/azure/ocr/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/conditions`,
                method: "GET",
                ...params,
            }),
    };
    workflowManager = {
        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostUpdateVariables
         * @request POST:/api/workflow/manager/update_variables
         */
        postUpdateVariables: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/update_variables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostDeprecate
         * @request POST:/api/workflow/manager/update_variables/
         */
        postDeprecate: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/update_variables/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostStartMiddleWorkflow
         * @request POST:/api/workflow/manager/start_middle_workflow
         */
        postStartMiddleWorkflow: (data: WorkflowInstanceRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/start_middle_workflow`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostDeprecate2
         * @request POST:/api/workflow/manager/start_middle_workflow/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: WorkflowInstanceRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/start_middle_workflow/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostStartFirstWorkflow
         * @request POST:/api/workflow/manager/start_first_workflow
         */
        postStartFirstWorkflow: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/start_first_workflow`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostDeprecate3
         * @request POST:/api/workflow/manager/start_first_workflow/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/start_first_workflow/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostChangeWorkflowStateForSubmit
         * @request POST:/api/workflow/manager/change_workflow_state_for_submit
         */
        postChangeWorkflowStateForSubmit: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/change_workflow_state_for_submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostDeprecate4
         * @request POST:/api/workflow/manager/change_workflow_state_for_submit/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/change_workflow_state_for_submit/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostDeprecate5
         * @request POST:/api/workflow/manager/change_workflow_state/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/change_workflow_state/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostChangeWorkflowState
         * @request POST:/api/workflow/manager/change_workflow_state
         */
        postChangeWorkflowState: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/change_workflow_state`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostCalendars
         * @request POST:/api/workflow/manager/calendars
         */
        postCalendars: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/workflow/manager/calendars`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    verificationPermissionController = {
        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostPermission
         * @summary verification access control permission of acl user
         * @request POST:/api/verification/permission
         */
        postPermission: (data: VerificationPermissionReq, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/verification/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostQuerycollapsefieldvalues
         * @request POST:/api/verification/permission/queryCollapseFieldValues
         */
        postQuerycollapsefieldvalues: (data: AuditLogRequestDTO, params: RequestParams = {}) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/queryCollapseFieldValues`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostQueryauditevent
         * @request POST:/api/verification/permission/queryAuditEvent
         */
        postQueryauditevent: (data: AuditTemplateDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/queryAuditEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostAuditevent
         * @request POST:/api/verification/permission/auditEvent
         */
        postAuditevent: (data: AuditModel, params: RequestParams = {}) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/auditEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetTypes
         * @request GET:/api/verification/permission/event/types
         */
        getTypes: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/event/types`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetBusiness
         * @request GET:/api/verification/permission/business/{businessId}
         */
        getBusiness: (businessId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/business/${businessId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetDeprecate
         * @request GET:/api/verification/permission/acl/permission/
         */
        getDeprecate: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/acl/permission/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetPermission
         * @request GET:/api/verification/permission/acl/permission
         */
        getPermission: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/verification/permission/acl/permission`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    aclUserPermissionController = {
        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name GetPermission
         * @summary Query permission
         * @request GET:/api/user/permission
         */
        getPermission: (
            query: {
                businessId: string;
                userId: string;
                aces: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultAclUserPermission, ResultObject | Result | ResultString>({
                path: `/api/user/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name PostPermission
         * @summary create permission of acl user that deal with business
         * @request POST:/api/user/permission
         */
        postPermission: (data: AclUserPermission, params: RequestParams = {}) =>
            this.request<ResultAclUserPermission, ResultObject | Result | ResultString>({
                path: `/api/user/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name DeletePermission
         * @summary Remove single permission
         * @request DELETE:/api/user/permission
         */
        deletePermission: (data: AclUserPermission, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/user/permission`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name PostReplace
         * @request POST:/api/user/permission/replace
         */
        postReplace: (data: AclUserPermission, params: RequestParams = {}) =>
            this.request<ResultAclUserPermission, ResultObject | Result | ResultString>({
                path: `/api/user/permission/replace`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name GetPermission2
         * @summary Query detail
         * @request GET:/api/user/permission/{id}
         * @originalName getPermission
         * @duplicate
         */
        getPermission2: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclUserPermission, ResultObject | Result | ResultString>({
                path: `/api/user/permission/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name GetAll
         * @summary Query all permission of acl user
         * @request GET:/api/user/permission/all/{userId}
         */
        getAll: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListAclPermissionDTO, ResultObject | Result | ResultString>({
                path: `/api/user/permission/all/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name DeleteAces
         * @summary Remove permission of business
         * @request DELETE:/api/user/permission/business/{businessId}/user/{userId}/aces/{aces}
         */
        deleteAces: (businessId: string, userId: string, aces: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/user/permission/business/${businessId}/user/${userId}/aces/${aces}`,
                method: "DELETE",
                ...params,
            }),
    };
    aclPermissionController = {
        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostPermissions
         * @summary Create access control permission
         * @request POST:/api/permissions
         */
        postPermissions: (data: AccessControlPermission, params: RequestParams = {}) =>
            this.request<ResultAccessControlPermission, ResultObject | Result | ResultString>({
                path: `/api/permissions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name DeletePermissions
         * @summary delete access control permission and entry list by name
         * @request DELETE:/api/permissions
         */
        deletePermissions: (data: AclPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permissions`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostNames
         * @request POST:/api/permissions/names
         */
        postNames: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListAccessControlPermission, ResultObject | Result | ResultString>({
                path: `/api/permissions/names`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostEntries
         * @summary Query permission entry list by permission name list
         * @request POST:/api/permissions/entries
         */
        postEntries: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/permissions/entries`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostEntry
         * @summary batch add access control permission
         * @request POST:/api/permissions/batch/entry
         */
        postEntry: (data: AclPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, ResultObject | Result | ResultString>({
                path: `/api/permissions/batch/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PatchEntry
         * @summary batch modify list of entries of permissions
         * @request PATCH:/api/permissions/update/entry
         */
        patchEntry: (data: AclPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, ResultObject | Result | ResultString>({
                path: `/api/permissions/update/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name GetPermissions
         * @summary query access control permission by id
         * @request GET:/api/permissions/{id}
         */
        getPermissions: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, ResultObject | Result | ResultString>({
                path: `/api/permissions/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name DeletePermissions2
         * @summary delete access control permission by id
         * @request DELETE:/api/permissions/{id}
         * @originalName deletePermissions
         * @duplicate
         */
        deletePermissions2: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permissions/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name GetName
         * @summary Query permission list by name
         * @request GET:/api/permissions/name/{name}
         */
        getName: (name: string, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, ResultObject | Result | ResultString>({
                path: `/api/permissions/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name DeleteName
         * @summary delete access control permission by name
         * @request DELETE:/api/permissions/name/{name}
         */
        deleteName: (name: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permissions/name/${name}`,
                method: "DELETE",
                ...params,
            }),
    };
    aclUserController = {
        /**
         * No description
         *
         * @tags AclUserController
         * @name PostUsers
         * @summary create acl user
         * @request POST:/api/permission/users
         */
        postUsers: (data: AclUserInformation, params: RequestParams = {}) =>
            this.request<ResultAclUserInformation, ResultObject | Result | ResultString>({
                path: `/api/permission/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserController
         * @name GetUsers
         * @summary query user information
         * @request GET:/api/permission/users/{id}
         */
        getUsers: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclUserInformation, ResultObject | Result | ResultString>({
                path: `/api/permission/users/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserController
         * @name DeleteUsers
         * @summary delete user by logic
         * @request DELETE:/api/permission/users/{id}
         */
        deleteUsers: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/users/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    aclUserRelationshipController = {
        /**
         * No description
         *
         * @tags AclUserRelationshipController
         * @name PostRelationships
         * @summary create user relation ship
         * @request POST:/api/permission/user/relationships
         */
        postRelationships: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/user/relationships`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserRelationshipController
         * @name DeleteRelationships
         * @summary remove user relation ship
         * @request DELETE:/api/permission/user/relationships
         */
        deleteRelationships: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/user/relationships`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserRelationshipController
         * @name GetGroupid
         * @summary query bind users
         * @request GET:/api/permission/user/relationships/groupId/{groupId}
         */
        getGroupid: (groupId: string, params: RequestParams = {}) =>
            this.request<ResultListAclUserRelationshipWithUserGroup, ResultObject | Result | ResultString>({
                path: `/api/permission/user/relationships/groupId/${groupId}`,
                method: "GET",
                ...params,
            }),
    };
    aclUserGroupController = {
        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name PostGroup
         * @summary create acl user group
         * @request POST:/api/permission/user/group
         */
        postGroup: (data: AclUserGroup, params: RequestParams = {}) =>
            this.request<ResultAclUserGroup, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name DeleteGroup
         * @summary Remove user from user group
         * @request DELETE:/api/permission/user/group
         */
        deleteGroup: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name PostUsers
         * @summary Add the list of acl user to user group
         * @request POST:/api/permission/user/group/users
         */
        postUsers: (data: AclUserGroupDTO, params: RequestParams = {}) =>
            this.request<ResultAclUserGroup, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name PostUsers2
         * @summary Add user to user group
         * @request POST:/api/permission/user/group/add/users
         * @originalName postUsers
         * @duplicate
         */
        postUsers2: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group/add/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name GetGroup
         * @summary Query user group information
         * @request GET:/api/permission/user/group/{id}
         */
        getGroup: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclUserGroup, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name DeleteGroup2
         * @summary Remove user group
         * @request DELETE:/api/permission/user/group/{id}
         * @originalName deleteGroup
         * @duplicate
         */
        deleteGroup2: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name GetUsers
         * @summary Query user list of binding in user group
         * @request GET:/api/permission/user/group/{groupId}/users
         */
        getUsers: (groupId: string, params: RequestParams = {}) =>
            this.request<ResultAclUserGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/permission/user/group/${groupId}/users`,
                method: "GET",
                ...params,
            }),
    };
    aclEntryController = {
        /**
         * No description
         *
         * @tags AclEntryController
         * @name PostEntry
         * @summary Create Access control entry
         * @request POST:/api/permission/entry
         */
        postEntry: (data: AccessControlEntry, params: RequestParams = {}) =>
            this.request<ResultAccessControlEntry, ResultObject | Result | ResultString>({
                path: `/api/permission/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name DeleteEntry
         * @summary Batch delete entry by id list
         * @request DELETE:/api/permission/entry
         */
        deleteEntry: (data: AclEntryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/entry`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name GetEntry
         * @summary Query entry by id
         * @request GET:/api/permission/entry/{id}
         */
        getEntry: (id: string, params: RequestParams = {}) =>
            this.request<ResultAccessControlEntry, ResultObject | Result | ResultString>({
                path: `/api/permission/entry/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name DeleteEntry2
         * @summary Delete entry by id
         * @request DELETE:/api/permission/entry/{id}
         * @originalName deleteEntry
         * @duplicate
         */
        deleteEntry2: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/permission/entry/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    vocabularyNuxeo = {
        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PostEntry
         * @summary Add Vocabulary entry
         * @request POST:/api/nuxeo/vocabulary/{id}/entry
         */
        postEntry: (id: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name DeleteEntry
         * @summary Delete Vocabulary entry
         * @request DELETE:/api/nuxeo/vocabulary/{id}/entry
         */
        deleteEntry: (
            id: string,
            query: {
                entryId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/entry`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchEntry
         * @summary Update Vocabulary entry
         * @request PATCH:/api/nuxeo/vocabulary/{id}/entry
         */
        patchEntry: (id: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PostDeprecate
         * @summary Add Vocabulary entry
         * @request POST:/api/nuxeo/vocabulary/{id}/entry/
         */
        postDeprecate: (id: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/entry/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name DeleteDeprecate
         * @summary Delete Vocabulary entry
         * @request DELETE:/api/nuxeo/vocabulary/{id}/entry/
         */
        deleteDeprecate: (
            id: string,
            query: {
                entryId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/entry/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchDeprecate
         * @summary Update Vocabulary entry
         * @request PATCH:/api/nuxeo/vocabulary/{id}/entry/
         */
        patchDeprecate: (id: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/entry/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchVocabulary
         * @summary Update Vocabularies
         * @request PATCH:/api/nuxeo/vocabulary
         */
        patchVocabulary: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchDeprecate2
         * @summary Update Vocabularies
         * @request PATCH:/api/nuxeo/vocabulary/
         * @originalName patchDeprecate
         * @duplicate
         */
        patchDeprecate2: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetVocabulary
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}
         */
        getVocabulary: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}/
         */
        getDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetListvocabularyids
         * @summary Get All Vocabulary ids
         * @request GET:/api/nuxeo/vocabulary/listVocabularyIds
         */
        getListvocabularyids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/listVocabularyIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetDeprecate2
         * @summary Get All Vocabulary ids
         * @request GET:/api/nuxeo/vocabulary/listVocabularyIds/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/vocabulary/listVocabularyIds/`,
                method: "GET",
                ...params,
            }),
    };
    tagNuxeo = {
        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostGetalltags
         * @request POST:/api/nuxeo/tags/getAllTags
         */
        postGetalltags: (params: RequestParams = {}) =>
            this.request<ResultSetString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/tags/getAllTags`,
                method: "POST",
                ...params,
            }),
    };
    nuxeoStudioController = {
        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostUpdatepolicies
         * @summary Update Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updatePolicies
         */
        postUpdatepolicies: (data: VersioningPolicyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/updatePolicies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate
         * @summary Update Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updatePolicies/
         */
        postDeprecate: (data: VersioningPolicyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/updatePolicies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate2
         * @summary Update Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updateFilters/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: VersioningFilterRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/updateFilters/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostUpdatefilters
         * @summary Update Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updateFilters
         */
        postUpdatefilters: (data: VersioningFilterRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/updateFilters`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostCreatepolicies
         * @summary Create Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createPolicies
         */
        postCreatepolicies: (data: VersioningPolicyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/createPolicies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate3
         * @summary Create Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createPolicies/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: VersioningPolicyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/createPolicies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate4
         * @summary Create Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createFilters/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: VersioningFilterRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/createFilters/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostCreatefilters
         * @summary Create Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createFilters
         */
        postCreatefilters: (data: VersioningFilterRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/createFilters`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostUpdatevocabularies
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/studio/updateVocabularies
         */
        postUpdatevocabularies: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/updateVocabularies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate5
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/studio/updateVocabularies/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/updateVocabularies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate6
         * @summary Update Custom Schemas
         * @request POST:/api/nuxeo/studio/updateSchemas/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/updateSchemas/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostUpdateschemas
         * @summary Update Custom Schemas
         * @request POST:/api/nuxeo/studio/updateSchemas
         */
        postUpdateschemas: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/updateSchemas`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate7
         * @summary Update custom document types
         * @request POST:/api/nuxeo/studio/updateDocTypes/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate7: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/updateDocTypes/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostUpdatedoctypes
         * @summary Update custom document types
         * @request POST:/api/nuxeo/studio/updateDocTypes
         */
        postUpdatedoctypes: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/updateDocTypes`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostCreatevocabularies
         * @request POST:/api/nuxeo/studio/createVocabularies
         */
        postCreatevocabularies: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/createVocabularies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate8
         * @request POST:/api/nuxeo/studio/createVocabularies/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/createVocabularies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate9
         * @summary Create custom schemas
         * @request POST:/api/nuxeo/studio/createSchemas/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/createSchemas/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostCreateschemas
         * @summary Create custom schemas
         * @request POST:/api/nuxeo/studio/createSchemas
         */
        postCreateschemas: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/createSchemas`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostDeprecate10
         * @summary Create custom document types
         * @request POST:/api/nuxeo/studio/createDocTypes/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate10: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/createDocTypes/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostCreatedoctypes
         * @summary Create custom document types
         * @request POST:/api/nuxeo/studio/createDocTypes
         */
        postCreatedoctypes: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/createDocTypes`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetVocabulary
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/studio/vocabulary/{id}
         */
        getVocabulary: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/studio/vocabulary/{id}/
         */
        getDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate2
         * @summary Get Policy(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/policy/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningPolicyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/policy/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetPolicy
         * @summary Get Policy(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/policy/{id}
         */
        getPolicy: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningPolicyDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/policy/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate3
         * @summary Get All Filter Ids(Versioning Configuration)
         * @request GET:/api/nuxeo/studio/versioning/listAvailableFilterIds/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/listAvailableFilterIds/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListavailablefilterids
         * @summary Get All Filter Ids(Versioning Configuration)
         * @request GET:/api/nuxeo/studio/versioning/listAvailableFilterIds
         */
        getListavailablefilterids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/listAvailableFilterIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetFilter
         * @summary Get Filter(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/filter/{id}
         */
        getFilter: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningFilterDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/filter/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate4
         * @summary Get Filter(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/filter/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningFilterDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/versioning/filter/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate5
         * @summary Get Schema detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/schema/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate5: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/schema/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetSchema
         * @summary Get Schema detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/schema/{id}
         */
        getSchema: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/schema/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate6
         * @summary List available vocabulary types
         * @request GET:/api/nuxeo/studio/listVocabularyTypes/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate6: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listVocabularyTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListvocabularytypes
         * @summary List available vocabulary types
         * @request GET:/api/nuxeo/studio/listVocabularyTypes
         */
        getListvocabularytypes: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listVocabularyTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetIds
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/studio/schemas/ids
         */
        getIds: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/schemas/ids`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate7
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/studio/listSchemaIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate7: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListschemaids
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/studio/listSchemaIDs
         */
        getListschemaids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListfieldtypes
         * @summary List available field types
         * @request GET:/api/nuxeo/studio/listFieldTypes
         */
        getListfieldtypes: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listFieldTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate8
         * @summary List available field types
         * @request GET:/api/nuxeo/studio/listFieldTypes/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate8: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listFieldTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListdoctypes
         * @summary List available Doc Types
         * @request GET:/api/nuxeo/studio/listDocTypes
         */
        getListdoctypes: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listDocTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate9
         * @summary List available Doc Types
         * @request GET:/api/nuxeo/studio/listDocTypes/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate9: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listDocTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate10
         * @summary List custom schema IDs
         * @request GET:/api/nuxeo/studio/listCustomSchemaIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate10: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listCustomSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListcustomschemaids
         * @summary List custom schema IDs
         * @request GET:/api/nuxeo/studio/listCustomSchemaIDs
         */
        getListcustomschemaids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listCustomSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetIds2
         * @summary List custom schema IDs
         * @request GET:/api/nuxeo/studio/custom/schemas/ids
         * @originalName getIds
         * @duplicate
         */
        getIds2: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/custom/schemas/ids`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListcustomdoctypeids
         * @summary List Custom Doc Type IDs
         * @request GET:/api/nuxeo/studio/listCustomDocTypeIDs
         */
        getListcustomdoctypeids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listCustomDocTypeIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate11
         * @summary List Custom Doc Type IDs
         * @request GET:/api/nuxeo/studio/listCustomDocTypeIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate11: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listCustomDocTypeIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListavailablefacetids
         * @summary Get All Facet Ids
         * @request GET:/api/nuxeo/studio/listAvailableFacetIds
         */
        getListavailablefacetids: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listAvailableFacetIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate12
         * @summary Get All Facet Ids
         * @request GET:/api/nuxeo/studio/listAvailableFacetIds/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate12: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listAvailableFacetIds/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListallschemaids
         * @summary List all scheme IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllSchemaIDs
         */
        getListallschemaids: (params: RequestParams = {}) =>
            this.request<ResultListDocumentSchemaVO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listAllSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate13
         * @summary List all scheme IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllSchemaIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate13: (params: RequestParams = {}) =>
            this.request<ResultListDocumentSchemaVO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listAllSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate14
         * @summary List Doc Type IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllDocTypeIDs/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate14: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeVO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listAllDocTypeIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetListalldoctypeids
         * @summary List Doc Type IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllDocTypeIDs
         */
        getListalldoctypeids: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeVO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/listAllDocTypeIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetPackage
         * @request GET:/api/nuxeo/studio/download/last/nuxeo/package
         */
        getPackage: (params: RequestParams = {}) =>
            this.request<File, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/download/last/nuxeo/package`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDeprecate15
         * @summary Get Doc Type detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/docType/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate15: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/docType/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetDoctype
         * @summary Get Doc Type detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/docType/{id}
         */
        getDoctype: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/studio/docType/${id}`,
                method: "GET",
                ...params,
            }),
    };
    shareNuxeo = {
        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostPage
         * @request POST:/api/nuxeo/share/page
         */
        postPage: (data: SharePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/share/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostGet
         * @request POST:/api/nuxeo/share/get
         */
        postGet: (data: SharePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/share/get`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name DeleteShare
         * @request DELETE:/api/nuxeo/share
         */
        deleteShare: (data: string[], params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/share`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PatchShare
         * @request PATCH:/api/nuxeo/share
         */
        patchShare: (data: ShareSaveRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEasyShareDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/share`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    smartFolderController = {
        /**
         * No description
         *
         * @tags SmartFolderController
         * @name PostPage
         * @summary Pagination Search (Smart Folder)
         * @request POST:/api/nuxeo/sfolder/page
         */
        postPage: (data: SmartFolderRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetDeprecate
         * @request GET:/api/nuxeo/sfolder/
         */
        getDeprecate: (
            query?: {
                name?: string;
                userGroupIds?: string[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name PatchDeprecate
         * @summary Save Smart Folder
         * @request PATCH:/api/nuxeo/sfolder/
         */
        patchDeprecate: (data: SmartFolderRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetSfolder
         * @request GET:/api/nuxeo/sfolder
         */
        getSfolder: (
            query?: {
                name?: string;
                userGroupIds?: string[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name PatchSfolder
         * @summary Save Smart Folder
         * @request PATCH:/api/nuxeo/sfolder
         */
        patchSfolder: (data: SmartFolderRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetSfolder2
         * @request GET:/api/nuxeo/sfolder/{id}
         * @originalName getSfolder
         * @duplicate
         */
        getSfolder2: (id: string, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name DeleteSfolder
         * @request DELETE:/api/nuxeo/sfolder/{id}
         */
        deleteSfolder: (id: string, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/nuxeo/sfolder/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/sfolder/page/conditions`,
                method: "GET",
                ...params,
            }),
    };
    searchNuxeo = {
        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNestedsearchV2
         * @request POST:/api/nuxeo/search/nestedSearch_v2
         */
        postNestedsearchV2: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/search/nestedSearch_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNestedsearch
         * @summary Nested Search
         * @request POST:/api/nuxeo/search/nestedSearch
         */
        postNestedsearch: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/search/nestedSearch`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetDeprecate
         * @summary Get all text search types
         * @request GET:/api/nuxeo/search/textSearchTypes/
         */
        getDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/search/textSearchTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetTextsearchtypes
         * @summary Get all text search types
         * @request GET:/api/nuxeo/search/textSearchTypes
         */
        getTextsearchtypes: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/search/textSearchTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetGetsearchextends
         * @summary getMimiType
         * @request GET:/api/nuxeo/search/getSearchExtends
         */
        getGetsearchextends: (
            query: {
                primaryType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/search/getSearchExtends`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetDeprecate2
         * @summary getMimiType
         * @request GET:/api/nuxeo/search/getSearchExtends/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (
            query: {
                primaryType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/search/getSearchExtends/`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    versioningController = {
        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostDeprecate
         * @summary Restores a document to the input version document
         * @request POST:/api/nuxeo/restoreVersion/
         */
        postDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/restoreVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostRestoreversion
         * @summary Restores a document to the input version document
         * @request POST:/api/nuxeo/restoreVersion
         */
        postRestoreversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/restoreVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostDeprecate2
         * @summary Get All Versions by Document ID or Path
         * @request POST:/api/nuxeo/getVersions/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringInstant, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getVersions/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostGetversions
         * @summary Get All Versions by Document ID or Path
         * @request POST:/api/nuxeo/getVersions
         */
        postGetversions: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringInstant, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getVersions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostGetversionnum
         * @summary Get Version Number by Document ID or Path
         * @request POST:/api/nuxeo/getVersionNum
         */
        postGetversionnum: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getVersionNum`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostDeprecate3
         * @summary Get Version Number by Document ID or Path
         * @request POST:/api/nuxeo/getVersionNum/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getVersionNum/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostGetspecificversion
         * @summary Get Specific Version by Document ID/Path and version number
         * @request POST:/api/nuxeo/getSpecificVersion
         */
        postGetspecificversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getSpecificVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostDeprecate4
         * @summary Get Specific Version by Document ID/Path and version number
         * @request POST:/api/nuxeo/getSpecificVersion/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getSpecificVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostGetlatestversion
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion
         */
        postGetlatestversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getLatestVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostDeprecate5
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getLatestVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostDeprecate6
         * @summary Create Version by Document ID/Path and increment policy
         * @request POST:/api/nuxeo/createVersion/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/createVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostCreateversion
         * @summary Create Version by Document ID/Path and increment policy
         * @request POST:/api/nuxeo/createVersion
         */
        postCreateversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/createVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    identityNuxeo = {
        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDelete
         * @summary Batch delete users
         * @request POST:/api/nuxeo/identity/users/batch/delete
         */
        postDelete: (data: BatchDeleteUserDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/users/batch/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGroups
         * @summary Batch add groups to users
         * @request POST:/api/nuxeo/identity/users/batch/add/groups
         */
        postGroups: (data: BatchAddUsersToGroupsDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/users/batch/add/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostUsers
         * @summary List users
         * @request POST:/api/nuxeo/identity/users
         */
        postUsers: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate
         * @summary List users
         * @request POST:/api/nuxeo/identity/users/
         */
        postDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/users/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGroups2
         * @summary Batch remove groups from user
         * @request POST:/api/nuxeo/identity/user/batch/remove/groups
         * @originalName postGroups
         * @duplicate
         */
        postGroups2: (data: UserBatchAddGroupsDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user/batch/remove/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGroups3
         * @summary Batch add groups to user
         * @request POST:/api/nuxeo/identity/user/batch/add/groups
         * @originalName postGroups
         * @duplicate
         */
        postGroups3: (data: UserBatchAddGroupsDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user/batch/add/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostUser
         * @summary Create new User
         * @request POST:/api/nuxeo/identity/user
         */
        postUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteUser
         * @summary Delete User
         * @request DELETE:/api/nuxeo/identity/user
         */
        deleteUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchUser
         * @summary Update User
         * @request PATCH:/api/nuxeo/identity/user
         */
        patchUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate2
         * @summary Create new User
         * @request POST:/api/nuxeo/identity/user/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteDeprecate
         * @summary Delete User
         * @request DELETE:/api/nuxeo/identity/user/
         */
        deleteDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchDeprecate
         * @summary Update User
         * @request PATCH:/api/nuxeo/identity/user/
         */
        patchDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostMembership
         * @summary Add user to group
         * @request POST:/api/nuxeo/identity/membership
         */
        postMembership: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/membership`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteMembership
         * @summary Remove user from group
         * @request DELETE:/api/nuxeo/identity/membership
         */
        deleteMembership: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultIdentityRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/membership`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate3
         * @summary Add user to group
         * @request POST:/api/nuxeo/identity/membership/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/membership/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteDeprecate2
         * @summary Remove user from group
         * @request DELETE:/api/nuxeo/identity/membership/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate2: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultIdentityRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/membership/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate4
         * @summary Get the groups of a member
         * @request POST:/api/nuxeo/identity/memberGroup/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/memberGroup/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostMembergroup
         * @summary Get the groups of a member
         * @request POST:/api/nuxeo/identity/memberGroup
         */
        postMembergroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/memberGroup`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostMember
         * @summary Get the members of a group
         * @request POST:/api/nuxeo/identity/member
         */
        postMember: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/member`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate5
         * @summary Get the members of a group
         * @request POST:/api/nuxeo/identity/member/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/member/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGroups4
         * @summary List groups
         * @request POST:/api/nuxeo/identity/groups
         * @originalName postGroups
         * @duplicate
         */
        postGroups4: (params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/groups`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate6
         * @summary List groups
         * @request POST:/api/nuxeo/identity/groups/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/groups/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostUsers2
         * @summary Batch remove users from group
         * @request POST:/api/nuxeo/identity/group/batch/remove/users
         * @originalName postUsers
         * @duplicate
         */
        postUsers2: (data: GroupBatchAddUsersDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group/batch/remove/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostUsers3
         * @summary Batch add users to group
         * @request POST:/api/nuxeo/identity/group/batch/add/users
         * @originalName postUsers
         * @duplicate
         */
        postUsers3: (data: GroupBatchAddUsersDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group/batch/add/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGroup
         * @summary Create new group
         * @request POST:/api/nuxeo/identity/group
         */
        postGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteGroup
         * @summary Delete group
         * @request DELETE:/api/nuxeo/identity/group
         */
        deleteGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchGroup
         * @summary Update group
         * @request PATCH:/api/nuxeo/identity/group
         */
        patchGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate7
         * @summary Create new group
         * @request POST:/api/nuxeo/identity/group/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate7: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteDeprecate3
         * @summary Delete group
         * @request DELETE:/api/nuxeo/identity/group/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate3: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchDeprecate2
         * @summary Update group
         * @request PATCH:/api/nuxeo/identity/group/
         * @originalName patchDeprecate
         * @duplicate
         */
        patchDeprecate2: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/group/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate8
         * @request POST:/api/nuxeo/identity/getLicenseUserNumAndActiveCount/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/getLicenseUserNumAndActiveCount/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGetlicenseusernumandactivecount
         * @request POST:/api/nuxeo/identity/getLicenseUserNumAndActiveCount
         */
        postGetlicenseusernumandactivecount: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/getLicenseUserNumAndActiveCount`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGetkeycloakallusers
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers
         */
        postGetkeycloakallusers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/getKeyCloakAllUsers`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate9
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/getKeyCloakAllUsers/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate10
         * @request POST:/api/nuxeo/identity/getAllUsers/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate10: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/getAllUsers/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostGetallusers
         * @request POST:/api/nuxeo/identity/getAllUsers
         */
        postGetallusers: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/getAllUsers`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate11
         * @request POST:/api/nuxeo/identity/copyUsers/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate11: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/copyUsers/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostCopyusers
         * @request POST:/api/nuxeo/identity/copyUsers
         */
        postCopyusers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/copyUsers`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchPassword
         * @summary Update user password
         * @request PATCH:/api/nuxeo/identity/user/password
         */
        patchPassword: (
            query: {
                userId: string;
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/user/password`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetSynchronous
         * @summary Synchronous active user (For internal use)
         * @request GET:/api/nuxeo/identity/users/synchronous
         */
        getSynchronous: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/users/synchronous`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetDeprecate
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/synchronize/
         */
        getDeprecate: (params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/synchronize/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetSynchronize
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/synchronize
         */
        getSynchronize: (params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/synchronize`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetIscanmodified
         * @summary group is can modified ?
         * @request GET:/api/nuxeo/identity/isCanModified
         */
        getIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PutIscanmodified
         * @summary group is can modified ?
         * @request PUT:/api/nuxeo/identity/isCanModified
         */
        putIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostIscanmodified
         * @summary group is can modified ?
         * @request POST:/api/nuxeo/identity/isCanModified
         */
        postIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteIscanmodified
         * @summary group is can modified ?
         * @request DELETE:/api/nuxeo/identity/isCanModified
         */
        deleteIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name OptionsIscanmodified
         * @summary group is can modified ?
         * @request OPTIONS:/api/nuxeo/identity/isCanModified
         */
        optionsIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "OPTIONS",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name HeadIscanmodified
         * @summary group is can modified ?
         * @request HEAD:/api/nuxeo/identity/isCanModified
         */
        headIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "HEAD",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchIscanmodified
         * @summary group is can modified ?
         * @request PATCH:/api/nuxeo/identity/isCanModified
         */
        patchIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "PATCH",
                query: query,
                ...params,
            }),
    };
    messageQueue = {
        /**
         * No description
         *
         * @tags MessageQueue
         * @name PostResubmit
         * @summary ReInvoke business
         * @request POST:/api/message/queue/{messageId}/reSubmit
         */
        postResubmit: (
            messageId: string,
            query?: {
                businessId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/message/queue/${messageId}/reSubmit`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name PostPage
         * @summary The Page of BusinessResultRecord
         * @request POST:/api/message/queue/page
         */
        postPage: (
            query: {
                /** @format int32 */
                pageNum: number;
                /** @format int32 */
                pageSize: number;
                orderBy: string;
                isDesc: boolean;
            },
            data: BusinessResultRecord,
            params: RequestParams = {},
        ) =>
            this.request<ResultPageBusinessResultRecord, ResultObject | Result | ResultString>({
                path: `/api/message/queue/page`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessage
         * @summary Query record By documentId
         * @request GET:/api/message/queue/{documentId}/message
         */
        getMessage: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultListBusinessResultRecord, ResultObject | Result | ResultString>({
                path: `/api/message/queue/${documentId}/message`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetTotal
         * @summary message total of every message queue
         * @request GET:/api/message/queue/total
         */
        getTotal: (
            query?: {
                messageQueueName?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQMessageTotalDTO, ResultObject | Result | ResultString>({
                path: `/api/message/queue/total`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetStatusgroup
         * @summary Statistics by state
         * @request GET:/api/message/queue/report/statusGroup
         */
        getStatusgroup: (
            query?: {
                mqName?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQConsumeGroupStatusDTO, ResultObject | Result | ResultString>({
                path: `/api/message/queue/report/statusGroup`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetHoursgroup
         * @summary Statistics by per hours
         * @request GET:/api/message/queue/report/hoursGroup
         */
        getHoursgroup: (
            query: {
                mqName: string;
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQDayTotalDTO, ResultObject | Result | ResultString>({
                path: `/api/message/queue/report/hoursGroup`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetDaygroup
         * @summary Statistics by per day
         * @request GET:/api/message/queue/report/dayGroup
         */
        getDaygroup: (
            query?: {
                mqName?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQDayTotalDTO, ResultObject | Result | ResultString>({
                path: `/api/message/queue/report/dayGroup`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetConsumes
         * @summary The configuration of message queue
         * @request GET:/api/message/queue/consumes
         */
        getConsumes: (params: RequestParams = {}) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/message/queue/consumes`,
                method: "GET",
                format: "json",
                ...params,
            }),
    };
    docPalTypeSettingController = {
        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostSettings
         * @summary Creation DocPalType
         * @request POST:/api/docpalType/settings
         */
        postSettings: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostRestorehistorydocpaltype
         * @summary Convert Document-Type to DocPal-Type for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/restoreHistoryDocPalType
         */
        postRestorehistorydocpaltype: (params: RequestParams = {}) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/restoreHistoryDocPalType`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostRepairsingledocpaltype
         * @summary Fill in value into document properties[docPalType] for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/repairSingleDocPalType
         */
        postRepairsingledocpaltype: (
            query: {
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/repairSingleDocPalType`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostQuerywaitupdatedocs
         * @summary Query waiting update document for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/queryWaitUpdateDocs
         */
        postQuerywaitupdatedocs: (params: RequestParams = {}) =>
            this.request<object, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/queryWaitUpdateDocs`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostPage
         * @summary Pagination search
         * @request POST:/api/docpalType/settings/page
         */
        postPage: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocPalType, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetRelated
         * @summary Query all related docpal type of current docpal type
         * @request GET:/api/docpalType/settings/name/{name}/related
         */
        getRelated: (name: string, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeRelated, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/name/${name}/related`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostRelated
         * @summary Create/Bound related docpal type into current docpal type
         * @request POST:/api/docpalType/settings/name/{name}/related
         */
        postRelated: (name: string, data: DocPalTypeRelated, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeRelated, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/name/${name}/related`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PatchRelated
         * @summary Update related docpal type
         * @request PATCH:/api/docpalType/settings/name/{name}/related
         */
        patchRelated: (name: string, data: DocPalTypeRelated, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeRelated, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/name/${name}/related`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostImport
         * @summary Batch upload docpal type
         * @request POST:/api/docpalType/settings/import
         */
        postImport: (
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/import`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltype
         * @summary Upload single docpal type
         * @request POST:/api/docpalType/settings/import/single/docpalType
         */
        postDocpaltype: (data: ImportDocPalTypeDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/import/single/docpalType`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostFillindocpaltypeindocument
         * @summary Fill in value into document properties[docPalType] for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/fillInDocPalTypeInDocument
         */
        postFillindocpaltypeindocument: (
            query?: {
                rootDocId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/fillInDocPalTypeInDocument`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostCopy
         * @summary Copy DocPal Type
         * @request POST:/api/docpalType/settings/copy/{name}
         */
        postCopy: (name: string, data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/copy/${name}`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDuplicate
         * @summary Check duplicate name of docpal type
         * @request POST:/api/docpalType/settings/check/duplicate
         */
        postDuplicate: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/check/duplicate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostMetadata
         * @summary Batch add multiple metadata into docpal type
         * @request POST:/api/docpalType/settings/batch/metadata
         */
        postMetadata: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/batch/metadata`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostMetadata2
         * @summary Add a new metadata into docpal type
         * @request POST:/api/docpalType/settings/add/metadata
         * @originalName postMetadata
         * @duplicate
         */
        postMetadata2: (data: DocPalTypeMetadataRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/add/metadata`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetActive
         * @summary Query the list of activated docpal types
         * @request GET:/api/docpalType/settings/active
         */
        getActive: (params: RequestParams = {}) =>
            this.request<ResultListDocPalType, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/active`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PatchActive
         * @summary Active or UnActive DocPal Type
         * @request PATCH:/api/docpalType/settings/active
         */
        patchActive: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/active`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpalType/settings/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetName
         * @summary Obtain docpal type detail through name
         * @request GET:/api/docpalType/settings/name/{name}
         */
        getName: (name: string, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteName
         * @summary Delete docpal type
         * @request DELETE:/api/docpalType/settings/name/{name}
         */
        deleteName: (name: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetMetadata
         * @summary Obtain all docpal type metadata list
         * @request GET:/api/docpalType/settings/metadata/{documentType}
         */
        getMetadata: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/metadata/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetMetadata2
         * @summary Download .csv template file of master table for use import data
         * @request GET:/api/docpalType/settings/export/metadata/{documentType}
         * @originalName getMetadata
         * @duplicate
         */
        getMetadata2: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/export/metadata/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetCategories
         * @summary Obtain all docpal type categories
         * @request GET:/api/docpalType/settings/categories
         */
        getCategories: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/categories`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetAll
         * @summary Find all docpal type
         * @request GET:/api/docpalType/settings/all
         */
        getAll: (params: RequestParams = {}) =>
            this.request<ResultListDocPalType, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetList
         * @summary Obtain all list of actived docpal types
         * @request GET:/api/docpal/types/list
         */
        getList: (
            query?: {
                isFolder?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/types/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetActive2
         * @summary Obtain all list of actived docpal types
         * @request GET:/api/docpal/types/active
         * @originalName getActive
         * @duplicate
         */
        getActive2: (
            query?: {
                all?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/types/active`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteMetadata
         * @summary Remove metadata from DocPal Type
         * @request DELETE:/api/docpalType/settings/{name}/metadata
         */
        deleteMetadata: (name: string, data: DocPalTypeMetadata, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/${name}/metadata`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteMetadata2
         * @summary Remove metadata from DocPal Type
         * @request DELETE:/api/docpalType/settings/{name}/metadata/{metadataName}
         * @originalName deleteMetadata
         * @duplicate
         */
        deleteMetadata2: (name: string, metadataName: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/${name}/metadata/${metadataName}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteRelated
         * @summary Delete related docpal type
         * @request DELETE:/api/docpalType/settings/related/{id}
         */
        deleteRelated: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpalType/settings/related/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    workflowVersionController = {
        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostDeploy
         * @summary Promote to Production - Deploy the current version to production for used it
         * @request POST:/api/docpal/workflow/version/{versionId}/deploy
         */
        postDeploy: (
            versionId: string,
            query: {
                requestDTO: ProcessDefinitionDraftRequestDTO;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/${versionId}/deploy`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostDraft
         * @summary Save to Draft
         * @request POST:/api/docpal/workflow/version/replace/draft
         */
        postDraft: (data: ProcessVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/replace/draft`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostRepair
         * @summary Repair history process definition
         * @request POST:/api/docpal/workflow/version/repair
         */
        postRepair: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/repair`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostPage
         * @summary Pagination search of process definition version
         * @request POST:/api/docpal/workflow/version/page
         */
        postPage: (data: ProcessVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOProcessDefinitionVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostNew
         * @summary Save New Version of process definition
         * @request POST:/api/docpal/workflow/version/new
         */
        postNew: (
            query: {
                /** Process Definition Version RequestDTO */
                requestDTO: ProcessVersionRequestDTO;
            },
            data: {
                /** @format binary */
                file?: File;
                /** @format string */
                draftId?: string;
                /** @format string */
                jsonValue?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/new`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetVersion
         * @summary Get Version Data
         * @request GET:/api/docpal/workflow/version
         */
        getVersion: (
            query: {
                draftId: string;
                versionNumber: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetVersion2
         * @summary Get Version Data
         * @request GET:/api/docpal/workflow/version/{versionId}
         * @originalName getVersion
         * @duplicate
         */
        getVersion2: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionVersion, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/${versionId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name DeleteVersion
         * @request DELETE:/api/docpal/workflow/version/{versionId}
         */
        deleteVersion: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/${versionId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetJson
         * @summary Download Json through version number and draft id
         * @request GET:/api/docpal/workflow/version/json
         */
        getJson: (
            query: {
                draftId: string;
                versionNumber: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/json`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetBpmnxml
         * @summary Download BPMN20.xml through version number and draft id
         * @request GET:/api/docpal/workflow/version/bpmnXml
         */
        getBpmnxml: (
            query: {
                draftId: string;
                versionNumber: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/bpmnXml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name DeleteDraftid
         * @request DELETE:/api/docpal/workflow/version/draftId/{draftId}
         */
        deleteDraftid: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/workflow/version/draftId/${draftId}`,
                method: "DELETE",
                ...params,
            }),
    };
    watermarkTemplate = {
        /**
         * No description
         *
         * @tags Watermark Template
         * @name PostTemplates
         * @summary Create watermark template and watermark setting list
         * @request POST:/api/docpal/watermark/templates
         */
        postTemplates: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PatchTemplates
         * @summary Modify watermark template and watermark setting list
         * @request PATCH:/api/docpal/watermark/templates
         */
        patchTemplates: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PostPage
         * @summary Watermark template page query
         * @request POST:/api/docpal/watermark/templates/page
         */
        postPage: (
            query: {
                /** @format int32 */
                pageNum: number;
                /** @format int32 */
                pageSize: number;
            },
            data: WMKTemplateRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPageWatermarkSettingsTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/page`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PostAppend
         * @request POST:/api/docpal/watermark/templates/append
         */
        postAppend: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/append`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PatchDeprecate
         * @summary Modify watermark template and watermark setting list
         * @request PATCH:/api/docpal/watermark/templates/
         */
        patchDeprecate: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetTemplates
         * @summary Query watermark template by ID
         * @request GET:/api/docpal/watermark/templates/{id}
         */
        getTemplates: (id: string, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name DeleteTemplates
         * @summary Delete watermark template by id
         * @request DELETE:/api/docpal/watermark/templates/{id}
         */
        deleteTemplates: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetName
         * @summary Query watermark template by name
         * @request GET:/api/docpal/watermark/templates/name/{name}
         */
        getName: (name: string, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name DeleteName
         * @summary Delete watermark template by name
         * @request DELETE:/api/docpal/watermark/templates/name/{name}
         */
        deleteName: (name: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetAll
         * @summary Query all watermark template
         * @request GET:/api/docpal/watermark/templates/all
         */
        getAll: (params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsTemplate, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/templates/all`,
                method: "GET",
                ...params,
            }),
    };
    watermarkSettings = {
        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PostSettings
         * @summary create single watermark settings
         * @request POST:/api/docpal/watermark/settings
         */
        postSettings: (data: WatermarkSettingsDTO, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PatchSettings
         * @summary update single watermark settings
         * @request PATCH:/api/docpal/watermark/settings
         */
        patchSettings: (data: WatermarkSettingsDTO, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PatchDeprecate
         * @summary update single watermark settings
         * @request PATCH:/api/docpal/watermark/settings/
         */
        patchDeprecate: (data: WatermarkSettingsDTO, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetSettings
         * @summary query watermark settings
         * @request GET:/api/docpal/watermark/settings/{id}
         */
        getSettings: (id: string, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name DeleteSettings
         * @summary Delete watermark settings by id
         * @request DELETE:/api/docpal/watermark/settings/{id}
         */
        deleteSettings: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetTemplate
         * @summary Query list of watermark settings by template id
         * @request GET:/api/docpal/watermark/settings/template/{templateId}
         */
        getTemplate: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/template/${templateId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetRepairdata
         * @request GET:/api/docpal/watermark/settings/repairData
         */
        getRepairdata: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/repairData`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetPreview
         * @summary preview watermark settings to return byte array
         * @request GET:/api/docpal/watermark/settings/preview/{id}
         */
        getPreview: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/preview/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetContenttype
         * @summary Get list of content type of watermark setting
         * @request GET:/api/docpal/watermark/settings/contentType
         */
        getContenttype: (params: RequestParams = {}) =>
            this.request<ResultListWMContentTypeDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/watermark/settings/contentType`,
                method: "GET",
                ...params,
            }),
    };
    systemFeatureController = {
        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostCreateuser
         * @request POST:/api/docpal/systemfeature/createUser
         */
        postCreateuser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/systemfeature/createUser`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetKeycloakTokenVerification
         * @request GET:/api/docpal/systemfeature/keycloak-token-verification
         */
        getKeycloakTokenVerification: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultObject | Result | ResultString>({
                path: `/api/docpal/systemfeature/keycloak-token-verification`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetGetfeatures
         * @request GET:/api/docpal/systemfeature/getFeatures
         */
        getGetfeatures: (params: RequestParams = {}) =>
            this.request<ResultMapStringBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/systemfeature/getFeatures`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetDeprecate
         * @request GET:/api/docpal/systemfeature/getFeatures/
         */
        getDeprecate: (params: RequestParams = {}) =>
            this.request<ResultMapStringBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/systemfeature/getFeatures/`,
                method: "GET",
                ...params,
            }),
    };
    formPropertiesRelationController = {
        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostUpdatelanguage
         * @request POST:/api/docpal/relation/updateLanguage
         */
        postUpdatelanguage: (data: LanguageEntity, params: RequestParams = {}) =>
            this.request<ResultLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/updateLanguage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostSave
         * @request POST:/api/docpal/relation/save
         */
        postSave: (data: FormPropertiesRelation, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostSave2
         * @request POST:/api/docpal/relation/errorEnum/save
         * @originalName postSave
         * @duplicate
         */
        postSave2: (data: ErrorEnumEntityDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/errorEnum/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostQuerybyentity
         * @request POST:/api/docpal/relation/errorEnum/queryByEntity
         */
        postQuerybyentity: (data: ErrorEnumEntityDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/errorEnum/queryByEntity`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostDeprecate
         * @request POST:/api/docpal/relation/tasks/queryByEntity/
         */
        postDeprecate: (data: ErrorEnumEntityDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/tasks/queryByEntity/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostDeletelanguage
         * @request POST:/api/docpal/relation/deleteLanguage
         */
        postDeletelanguage: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/deleteLanguage`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostAddlanguage
         * @request POST:/api/docpal/relation/addLanguage
         */
        postAddlanguage: (data: LanguageEntity, params: RequestParams = {}) =>
            this.request<ResultLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/addLanguage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetQuerylanguagelocale
         * @request GET:/api/docpal/relation/queryLanguageLocale
         * @deprecated
         */
        getQuerylanguagelocale: (params: RequestParams = {}) =>
            this.request<ResultSetString, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguageLocale`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetInitelanguagecache
         * @request GET:/api/docpal/relation/initeLanguageCache
         */
        getInitelanguagecache: (params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/initeLanguageCache`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetGetkeycloakproperty
         * @summary get keyCloakProperty
         * @request GET:/api/docpal/relation/getKeyCloakProperty
         */
        getGetkeycloakproperty: (params: RequestParams = {}) =>
            this.request<ResultKeyCloakPropertyVO, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/getKeyCloakProperty`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetQuery
         * @request GET:/api/docpal/relation/query
         */
        getQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PutQuery
         * @request PUT:/api/docpal/relation/query
         */
        putQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostQuery
         * @request POST:/api/docpal/relation/query
         */
        postQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name DeleteQuery
         * @request DELETE:/api/docpal/relation/query
         */
        deleteQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name OptionsQuery
         * @request OPTIONS:/api/docpal/relation/query
         */
        optionsQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "OPTIONS",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name HeadQuery
         * @request HEAD:/api/docpal/relation/query
         */
        headQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "HEAD",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PatchQuery
         * @request PATCH:/api/docpal/relation/query
         */
        patchQuery: (
            query?: {
                /** @format int64 */
                id?: number;
                processKey?: string;
                userTaskId?: string;
                jsonValue?: string;
                versionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/query`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetQuerylanguage
         * @request GET:/api/docpal/relation/queryLanguage
         */
        getQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PutQuerylanguage
         * @request PUT:/api/docpal/relation/queryLanguage
         */
        putQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostQuerylanguage
         * @request POST:/api/docpal/relation/queryLanguage
         */
        postQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name DeleteQuerylanguage
         * @request DELETE:/api/docpal/relation/queryLanguage
         */
        deleteQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name OptionsQuerylanguage
         * @request OPTIONS:/api/docpal/relation/queryLanguage
         */
        optionsQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "OPTIONS",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name HeadQuerylanguage
         * @request HEAD:/api/docpal/relation/queryLanguage
         */
        headQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "HEAD",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PatchQuerylanguage
         * @request PATCH:/api/docpal/relation/queryLanguage
         */
        patchQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetIsldapmode
         * @summary is Ldap Mode
         * @request GET:/api/docpal/relation/isLdapMode
         */
        getIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PutIsldapmode
         * @summary is Ldap Mode
         * @request PUT:/api/docpal/relation/isLdapMode
         */
        putIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "PUT",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostIsldapmode
         * @summary is Ldap Mode
         * @request POST:/api/docpal/relation/isLdapMode
         */
        postIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name DeleteIsldapmode
         * @summary is Ldap Mode
         * @request DELETE:/api/docpal/relation/isLdapMode
         */
        deleteIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name OptionsIsldapmode
         * @summary is Ldap Mode
         * @request OPTIONS:/api/docpal/relation/isLdapMode
         */
        optionsIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "OPTIONS",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name HeadIsldapmode
         * @summary is Ldap Mode
         * @request HEAD:/api/docpal/relation/isLdapMode
         */
        headIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "HEAD",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PatchIsldapmode
         * @summary is Ldap Mode
         * @request PATCH:/api/docpal/relation/isLdapMode
         */
        patchIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/relation/isLdapMode`,
                method: "PATCH",
                ...params,
            }),
    };
    oAuth2SettingController = {
        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetSetting
         * @summary Query mail OAuth2.0 Setting of current login user
         * @request GET:/api/docpal/oauth2/setting
         */
        getSetting: (params: RequestParams = {}) =>
            this.request<ResultOAuth2SettingRequestDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name PostSetting
         * @summary Obtain authorization url of OAuth2.0
         * @request POST:/api/docpal/oauth2/setting
         */
        postSetting: (data: OAuth2SettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name PostRefresh
         * @summary Refresh the credential of OAuth2.0
         * @request POST:/api/docpal/oauth2/refresh
         */
        postRefresh: (data: OAuth2SettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/refresh`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetCode
         * @request GET:/api/docpal/oauth2/code
         * @deprecated
         */
        getCode: (
            query: {
                code: string;
                scope: string;
                state: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/code`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name PostCode
         * @summary Get the credential of OAuth2.0 by code and state
         * @request POST:/api/docpal/oauth2/code
         */
        postCode: (data: OAuth2SettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/code`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetAuthenticationmethod
         * @summary Get all authentication way of OAuth2.0
         * @request GET:/api/docpal/oauth2/authenticationMethod
         */
        getAuthenticationmethod: (params: RequestParams = {}) =>
            this.request<ResultOAuth2AuthenticationMethod, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/authenticationMethod`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetSenderaddress
         * @request GET:/api/docpal/oauth2/accessToken/senderAddress/{senderAddress}
         * @deprecated
         */
        getSenderaddress: (senderAddress: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/oauth2/accessToken/senderAddress/${senderAddress}`,
                method: "GET",
                ...params,
            }),
    };
    management = {
        /**
         * No description
         *
         * @tags Management
         * @name GetDeprecate
         * @summary Retrieve the available loggers of the services
         * @request GET:/api/docpal/management/loggers/
         */
        getDeprecate: (
            query?: {
                service?: string;
                logger?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name PostDeprecate
         * @summary Change the log level of services' loggers
         * @request POST:/api/docpal/management/loggers/
         */
        postDeprecate: (
            query?: {
                service?: string;
                logger?: string;
                level?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetLoggers
         * @summary Retrieve the available loggers of the services
         * @request GET:/api/docpal/management/loggers
         */
        getLoggers: (
            query?: {
                service?: string;
                logger?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name PostLoggers
         * @summary Change the log level of services' loggers
         * @request POST:/api/docpal/management/loggers
         */
        postLoggers: (
            query?: {
                service?: string;
                logger?: string;
                level?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetServices
         * @summary Retrieve available services
         * @request GET:/api/docpal/management/services
         */
        getServices: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/services`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetDeprecate2
         * @summary Retrieve available services
         * @request GET:/api/docpal/management/services/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/services/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetLevels
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/levels
         */
        getLevels: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers/levels`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetLevels2
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/{service}/levels
         * @originalName getLevels
         * @duplicate
         */
        getLevels2: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers/${service}/levels`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetDeprecate3
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/levels/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers/levels/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetDeprecate4
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/{service}/levels/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/loggers/${service}/levels/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetDeprecate5
         * @summary Retrieve the services' Java and build information
         * @request GET:/api/docpal/management/info/{service}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate5: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/info/${service}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetInfo
         * @summary Retrieve the services' Java and build information
         * @request GET:/api/docpal/management/info/{service}
         */
        getInfo: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/info/${service}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetInfo2
         * @summary Retrieve the services' Java and build information
         * @request GET:/api/docpal/management/info
         * @originalName getInfo
         * @duplicate
         */
        getInfo2: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/info`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetDeprecate6
         * @summary Retrieve the health, whether it is up or down, of the services
         * @request GET:/api/docpal/management/health/{service}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate6: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/health/${service}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetHealth
         * @summary Retrieve the health, whether it is up or down, of the services
         * @request GET:/api/docpal/management/health/{service}
         */
        getHealth: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/health/${service}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetHealth2
         * @summary Retrieve the health, whether it is up or down, of the services
         * @request GET:/api/docpal/management/health
         * @originalName getHealth
         * @duplicate
         */
        getHealth2: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/management/health`,
                method: "GET",
                ...params,
            }),
    };
    licenseController = {
        /**
         * No description
         *
         * @tags LicenseController
         * @name PostInstall
         * @request POST:/api/docpal/license/install
         */
        postInstall: (
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<BaseResultLicenseContent, ResultObject | Result | ResultString>({
                path: `/api/docpal/license/install`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags LicenseController
         * @name GetLicense
         * @request GET:/api/docpal/license
         */
        getLicense: (params: RequestParams = {}) =>
            this.request<BaseResultLicenseContent, ResultObject | Result | ResultString>({
                path: `/api/docpal/license`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LicenseController
         * @name GetWhitelist
         * @request GET:/api/docpal/license/whitelist
         */
        getWhitelist: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/license/whitelist`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LicenseController
         * @name GetGetlicense
         * @request GET:/api/docpal/license/getLicense
         * @deprecated
         */
        getGetlicense: (params: RequestParams = {}) =>
            this.request<BaseResultLicenseContent, ResultObject | Result | ResultString>({
                path: `/api/docpal/license/getLicense`,
                method: "GET",
                ...params,
            }),
    };
    internalShareController = {
        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostDeprecate
         * @request POST:/api/docpal/internalShare/page/
         */
        postDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/internalShare/page/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostPage
         * @request POST:/api/docpal/internalShare/page
         */
        postPage: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/internalShare/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostDeprecate2
         * @request POST:/api/docpal/internalShare/checkDocumentIsInShare/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/internalShare/checkDocumentIsInShare/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostCheckdocumentisinshare
         * @request POST:/api/docpal/internalShare/checkDocumentIsInShare
         */
        postCheckdocumentisinshare: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/internalShare/checkDocumentIsInShare`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteInternalshare
         * @request DELETE:/api/docpal/internalShare
         */
        deleteInternalshare: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/internalShare`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteDeprecate
         * @request DELETE:/api/docpal/internalShare/
         */
        deleteDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/internalShare/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    apiKeyController = {
        /**
         * No description
         *
         * @tags api-key-controller
         * @name PostGenerateXApiKey
         * @request POST:/api/docpal/generate_x_api_key
         */
        postGenerateXApiKey: (data: GenerateXApiKeyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/generate_x_api_key`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    docPalEmailController = {
        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostSend
         * @request POST:/api/docpal/email/template/send
         */
        postSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/email/template/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostSend2
         * @summary Send test email using email template
         * @request POST:/api/docpal/email/send
         * @originalName postSend
         * @duplicate
         */
        postSend2: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/email/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostFrom
         * @request POST:/api/docpal/email/send/from
         */
        postFrom: (
            query: {
                mailSendRequest: MailSendRequest;
                multipartFiles: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/email/send/from`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostSend3
         * @request POST:/api/docpal/email/customize/send
         * @originalName postSend
         * @duplicate
         */
        postSend3: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/email/customize/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    dictController = {
        /**
         * No description
         *
         * @tags DictController
         * @name PostEntry
         * @summary Create new Vocabulary entry
         * @request POST:/api/docpal/dict/category/{categoryCode}/entry
         */
        postEntry: (categoryCode: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/category/${categoryCode}/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PatchEntry
         * @summary Update Vocabulary entry
         * @request PATCH:/api/docpal/dict/category/{categoryCode}/entry
         */
        patchEntry: (categoryCode: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/category/${categoryCode}/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PostEntry2
         * @summary Create new Vocabulary entry
         * @request POST:/api/docpal/dict/{categoryCode}/entry
         * @originalName postEntry
         * @duplicate
         */
        postEntry2: (categoryCode: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/${categoryCode}/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PatchEntry2
         * @summary Update Vocabulary entry
         * @request PATCH:/api/docpal/dict/{categoryCode}/entry
         * @originalName patchEntry
         * @duplicate
         */
        patchEntry2: (categoryCode: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/${categoryCode}/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PostCategory
         * @request POST:/api/docpal/dict/category
         */
        postCategory: (data: DictRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDictResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/category`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PostDict
         * @request POST:/api/docpal/dict
         */
        postDict: (data: DictRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDictResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetCategories
         * @summary Get All Vocabulary ids
         * @request GET:/api/docpal/dict/categories
         */
        getCategories: (params: RequestParams = {}) =>
            this.request<ResultListDictResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/categories`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetListvocabularyids
         * @summary Get All Vocabulary ids
         * @request GET:/api/docpal/dict/listVocabularyIds
         */
        getListvocabularyids: (params: RequestParams = {}) =>
            this.request<ResultListDictResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/listVocabularyIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDatapatch
         * @summary  Test API
         * @request GET:/api/docpal/dict/dataPatch
         */
        getDatapatch: (params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/dataPatch`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDict
         * @summary Get Vocabulary by id
         * @request GET:/api/docpal/dict/{categoryCode}
         */
        getDict: (
            categoryCode: string,
            query?: {
                language?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDictResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/${categoryCode}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetCategory
         * @summary Get Vocabulary by id
         * @request GET:/api/docpal/dict/category/{categoryCode}
         */
        getCategory: (
            categoryCode: string,
            query?: {
                language?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDictResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/category/${categoryCode}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name DeleteEntry
         * @summary Remove Vocabulary entry
         * @request DELETE:/api/docpal/dict/category/{categoryCode}/entry/{entryId}
         */
        deleteEntry: (categoryCode: string, entryId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/category/${categoryCode}/entry/${entryId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name DeleteEntry2
         * @summary Remove Vocabulary entry
         * @request DELETE:/api/docpal/dict/{categoryCode}/entry/{entryId}
         * @originalName deleteEntry
         * @duplicate
         */
        deleteEntry2: (categoryCode: string, entryId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/dict/${categoryCode}/entry/${entryId}`,
                method: "DELETE",
                ...params,
            }),
    };
    dataStatisticsController = {
        /**
         * No description
         *
         * @tags data-statistics-controller
         * @name PostExecuteDailyStatistics
         * @request POST:/api/docpal/data_statistics/execute_daily_statistics
         */
        postExecuteDailyStatistics: (data: ExecuteSqlDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/data_statistics/execute_daily_statistics`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    complementaryController = {
        /**
         * No description
         *
         * @tags complementary-controller
         * @name PostRetry
         * @request POST:/api/docpal/complementary/ocr/retry
         */
        postRetry: (data: RetryOcrRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/complementary/ocr/retry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags complementary-controller
         * @name PostDeprecate
         * @request POST:/api/docpal/complementary/ocr/retry/
         */
        postDeprecate: (data: RetryOcrRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/complementary/ocr/retry/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    caseTableController = {
        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetTables
         * @summary Retrieve all case tables
         * @request GET:/api/docpal/case/tables
         */
        getTables: (params: RequestParams = {}) =>
            this.request<ResultListCaseTable, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostTables
         * @summary Create (Case Table)
         * @request POST:/api/docpal/case/tables
         */
        postTables: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCaseTable, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostField
         * @summary Add single field to Case Table
         * @request POST:/api/docpal/case/tables/{id}/field
         */
        postField: (id: string, data: MTFieldInfo, params: RequestParams = {}) =>
            this.request<ResultCaseTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/${id}/field`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name DeleteField
         * @summary Delete field when not data (Case Table)
         * @request DELETE:/api/docpal/case/tables/{id}/field
         */
        deleteField: (
            id: string,
            query: {
                columnName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/${id}/field`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostRecord
         * @summary Insert data into a Case Table
         * @request POST:/api/docpal/case/tables/record
         */
        postRecord: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/record`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostPage
         * @summary Pagination Search (Case Table Record)
         * @request POST:/api/docpal/case/tables/record/page
         */
        postPage: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PatchFields
         * @summary The Case Table has been augmented with the addition of multiple columns.
         * @request PATCH:/api/docpal/case/tables/fields
         */
        patchFields: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCaseTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/fields`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetTables2
         * @summary Retrieve detail of case table and include associated data structures
         * @request GET:/api/docpal/case/tables/{id}
         * @originalName getTables
         * @duplicate
         */
        getTables2: (id: string, params: RequestParams = {}) =>
            this.request<ResultCaseTableResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name DeleteTables
         * @request DELETE:/api/docpal/case/tables/{id}
         */
        deleteTables: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetCasetype
         * @summary Retrieve a list of case tables that belong to the specified case type
         * @request GET:/api/docpal/case/tables/caseType/{caseTypeId}
         */
        getCasetype: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCaseTable, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/caseType/${caseTypeId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetCasequery
         * @request GET:/api/docpal/case/tables/caseQuery
         */
        getCasequery: (
            query: {
                tableName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/tables/caseQuery`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    caseInstanceController = {
        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostTrigger
         * @request POST:/api/docpal/case/instance/{caseInstanceId}/events/{eventId}/trigger
         */
        postTrigger: (caseInstanceId: string, eventId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/${caseInstanceId}/events/${eventId}/trigger`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostTasks
         * @summary Retrieve all tasks of this case instance
         * @request POST:/api/docpal/case/instance/tasks
         */
        postTasks: (data: CaseInstanceTaskDTO, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/tasks`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostComplete
         * @summary Complete task
         * @request POST:/api/docpal/case/instance/tasks/complete
         */
        postComplete: (data: CaseInstanceTaskDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/tasks/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostStart
         * @summary Start a case model definition to get a case instance
         * @request POST:/api/docpal/case/instance/start
         */
        postStart: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/start`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostPlanitems
         * @summary Retrieve all or activated planItem instances of this case instance
         * @request POST:/api/docpal/case/instance/planItems
         */
        postPlanitems: (data: PlanItemInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/planItems`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostEnable
         * @summary Enable plan item instance
         * @request POST:/api/docpal/case/instance/planItems/{planItemId}/enable
         */
        postEnable: (planItemId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/planItems/${planItemId}/enable`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostComplete2
         * @summary Complete PlanItem instance
         * @request POST:/api/docpal/case/instance/planItems/complete
         * @originalName postComplete
         * @duplicate
         */
        postComplete2: (data: PlanItemInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/planItems/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetInstances
         * @summary Retrieve all case instances of this case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/instances
         */
        getInstances: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnInstance, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/types/${caseTypeId}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetSubcase
         * @summary Filter case definition to select as sub-case
         * @request GET:/api/docpal/case/support/subCase
         */
        getSubcase: (params: RequestParams = {}) =>
            this.request<ResultListCaseDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/support/subCase`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetFields
         * @summary Extract input field list of sub-case definition
         * @request GET:/api/docpal/case/support/subCase/fields
         */
        getFields: (
            query: {
                caseDefinitionId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanTableFieldDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/support/subCase/fields`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetForms
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/forms
         */
        getForms: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnPlanFormDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/${caseInstanceId}/forms`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetEvents
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/events
         */
        getEvents: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListUserEventInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/${caseInstanceId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetForm
         * @summary Retrieve form information of task
         * @request GET:/api/docpal/case/instance/tasks/{taskId}/form
         */
        getForm: (taskId: string, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceFormDataDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/tasks/${taskId}/form`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetDefinitions
         * @summary Retrieve process definition of this case instance through case definition key
         * @request GET:/api/docpal/case/instance/process/definitions
         */
        getDefinitions: (
            query: {
                businessKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/process/definitions`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetForm2
         * @summary Retrieve form information of plan item instance
         * @request GET:/api/docpal/case/instance/planItems/{planItemId}/form
         * @originalName getForm
         * @duplicate
         */
        getForm2: (
            planItemId: string,
            query?: {
                caseDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnPlanFormDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/instance/planItems/${planItemId}/form`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetDefinitions2
         * @summary Retrieve all case model definitions
         * @request GET:/api/docpal/case/definitions
         * @originalName getDefinitions
         * @duplicate
         */
        getDefinitions2: (params: RequestParams = {}) =>
            this.request<ResultListCaseDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetInstances2
         * @summary Retrieve case instances of this case model
         * @request GET:/api/docpal/case/definitions/{caseDefinitionKey}/instances
         * @originalName getInstances
         * @duplicate
         */
        getInstances2: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListCaseInstanceDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/definitions/${caseDefinitionKey}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetDefinitions3
         * @summary Retrieve process definition of this case instance through case definition key
         * @request GET:/api/docpal/case/definition/{caseDefinitionKey}/process/definitions
         * @originalName getDefinitions
         * @duplicate
         */
        getDefinitions3: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/case/definition/${caseDefinitionKey}/process/definitions`,
                method: "GET",
                ...params,
            }),
    };
    folderCabinetController = {
        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostTemplate
         * @summary create folder cabinet template
         * @request POST:/api/docpal/cabinet/template
         */
        postTemplate: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PatchTemplate
         * @summary Modify folder/file into exist folder cabinet template
         * @request PATCH:/api/docpal/cabinet/template
         */
        patchTemplate: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetPermission
         * @request GET:/api/docpal/cabinet/template/permission
         */
        getPermission: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentACLEntryDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostPermission
         * @summary Add permission for folder cabinet template
         * @request POST:/api/docpal/cabinet/template/permission
         */
        postPermission: (data: DocumentACLEntryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name DeletePermission
         * @summary Delete permission from folder cabinet template
         * @request DELETE:/api/docpal/cabinet/template/permission
         */
        deletePermission: (
            query: {
                id: string;
                userId: string;
                permission?: string;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template/permission`,
                method: "DELETE",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostPage
         * @summary Pagination search folder cabinet
         * @request POST:/api/docpal/cabinet/template/page
         */
        postPage: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOFolderCabinetResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetWorkflow
         * @summary Query workflow list of use this folder cabinet
         * @request GET:/api/docpal/cabinet/{id}/use/workflow
         */
        getWorkflow: (id: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/${id}/use/workflow`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetTemplate
         * @summary get folder cabinet template tree
         * @request GET:/api/docpal/cabinet/template/{id}
         */
        getTemplate: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetInformation
         * @request GET:/api/docpal/cabinet/template/{id}/information
         */
        getInformation: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinet, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/template/${id}/information`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetList
         * @summary query all folder cabinet list of top level
         * @request GET:/api/docpal/cabinet/list
         */
        getList: (params: RequestParams = {}) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name DeleteCabinet
         * @summary Delete folder cabinet template and all sub folder cabinet
         * @request DELETE:/api/docpal/cabinet/{id}
         */
        deleteCabinet: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/docpal/cabinet/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    docBlockPermissionController = {
        /**
         * No description
         *
         * @tags DocBlockPermissionController
         * @name PostPermission
         * @summary Create DocBlockPermission
         * @request POST:/api/block/permission
         */
        postPermission: (data: BlockInheritedPermission, params: RequestParams = {}) =>
            this.request<ResultBlockInheritedPermission, ResultObject | Result | ResultString>({
                path: `/api/block/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocBlockPermissionController
         * @name PostFilter
         * @summary filter block document permission
         * @request POST:/api/block/permission/filter
         */
        postFilter: (data: DocDTO, params: RequestParams = {}) =>
            this.request<ResultListDocDTO, ResultObject | Result | ResultString>({
                path: `/api/block/permission/filter`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocBlockPermissionController
         * @name DeletePath
         * @summary Delete block permission
         * @request DELETE:/api/block/permission/document/{docId}/path/{docPath}
         */
        deletePath: (docId: string, docPath: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/block/permission/document/${docId}/path/${docPath}`,
                method: "DELETE",
                ...params,
            }),
    };
    viewSettingController = {
        /**
         * No description
         *
         * @tags ViewSettingController
         * @name GetView
         * @request GET:/api/nuxeo/setting/view
         */
        getView: (params: RequestParams = {}) =>
            this.request<ResultViewSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setting/view`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ViewSettingController
         * @name PatchView
         * @request PATCH:/api/nuxeo/setting/view
         */
        patchView: (data: ViewSettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultViewSettingResponseDTO, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/setting/view`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    publicApplicationVersion = {
        /**
         * No description
         *
         * @tags Public Application Version
         * @name GetVersion
         * @request GET:/public/version
         */
        getVersion: (params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/public/version`,
                method: "GET",
                ...params,
            }),
    };
    systemAdminController = {
        /**
         * No description
         *
         * @tags system-admin-controller
         * @name GetSetupFileModifiedDate
         * @request GET:/api/system_admin/setup_file_modified_date
         */
        getSetupFileModifiedDate: (params: RequestParams = {}) =>
            this.request<ResultVoid, ResultObject | Result | ResultString>({
                path: `/api/system_admin/setup_file_modified_date`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-admin-controller
         * @name DeleteClean
         * @request DELETE:/api/system_admin/clean
         */
        deleteClean: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultObject | Result | ResultString>({
                path: `/api/system_admin/clean`,
                method: "DELETE",
                ...params,
            }),
    };
    wopiHostController = {
        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetGetofficetoken
         * @request GET:/api/nuxeo/getOfficeToken/{id}
         */
        getGetofficetoken: (id: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultObject | Result | ResultString>({
                path: `/api/nuxeo/getOfficeToken/${id}`,
                method: "GET",
                ...params,
            }),
    };
    globalSettingController = {
        /**
         * No description
         *
         * @tags GlobalSettingController
         * @name GetSetting
         * @request GET:/api/docpal/setting/workflow/condition/setting
         */
        getSetting: (params: RequestParams = {}) =>
            this.request<ResultListMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/setting/workflow/condition/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags GlobalSettingController
         * @name GetFeaturerolemapping
         * @request GET:/api/docpal/setting/featureRoleMapping
         */
        getFeaturerolemapping: (params: RequestParams = {}) =>
            this.request<ResultListMapStringObject, ResultObject | Result | ResultString>({
                path: `/api/docpal/setting/featureRoleMapping`,
                method: "GET",
                ...params,
            }),
    };
    alertController = {
        /**
         * No description
         *
         * @tags alert-controller
         * @name GetJudgeandsendalertemail
         * @request GET:/api/docpal/azure/ocr/judgeAndSendAlertEmail
         */
        getJudgeandsendalertemail: (
            query: {
                scanType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultObject | Result | ResultString>({
                path: `/api/docpal/azure/ocr/judgeAndSendAlertEmail`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
}
