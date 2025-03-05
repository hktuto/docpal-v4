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
    phoneNum?: string;
    accountNum?: string;
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
    productionVersionId?: string;
    latestVersion?: string;
    latestVersionId?: string;
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
    cmmnVersionId?: string;
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
    reminders?: Record<string, object>[];
    /** Fuzzy Search */
    q?: string;
    /** Where AND Condition */
    where?: Record<string, object>;
    users?: string[];
    processKeys?: string[];
    caseKeys?: string[];
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

export interface EmailReminder {
    emailTemplateId?: string;
    receiverType?: string;
    from?: string;
    to?: string;
    cc?: string;
    bcc?: string;
    variables?: Record<string, object>;
}

export interface ResultCalendarTaskRespDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Calendar Task ResponseDTO */
    data?: CalendarTaskRespDTO;
}

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
    emailReminder?: EmailReminder;
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
    pageNum?: number;
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
    "Latest Version Id"?: string;
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
    /** Version ID */
    versionId?: string;
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
    /** Process Definition Version ID */
    processDefinitionVersionId?: string;
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
    /** Production Version Number */
    versionNumber?: string;
    /** Process Version ID */
    versionId?: string;
    /** Production Draft ID */
    draftId?: string;
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
    latestVersionId?: string;
    productionVersionId?: string;
}

export interface ResultListProcessDefinitionDraft {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDefinitionDraft[];
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
    /** Process categories */
    categories?: string[];
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
    name?: string;
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

export interface MessageTemplateRequestDTO {
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
    templateName?: string;
    usages?: string;
    createdBy?: string;
    modifiedBy?: string;
    sort?: SortObject;
    descSort?: SortObject;
}

export interface MessageTemplateVO {
    /** @format int64 */
    id?: number;
    templateName?: string;
    usages?: string;
    whatsAppStatus?: string;
    language?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    modifiedDate?: string;
    whatsAppRejectedReason?: string;
}

export interface PaginationDTOMessageTemplateVO {
    entryList?: MessageTemplateVO[];
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

export interface ResultPaginationDTOMessageTemplateVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOMessageTemplateVO;
}

export interface ParamDTO {
    name?: string;
    value?: string;
}

export interface TemplateMsgManageDTO {
    name?: string;
    header?: string;
    body?: string;
    footer?: string;
    textMessage?: string;
    language?: string;
    needConfirm?: boolean;
    confirmButtonName?: string;
    headerParameters?: ParamDTO[];
    bodyParameters?: ParamDTO[];
    textParameters?: ParamDTO[];
}

export interface CreateMessageResponseDTO {
    id?: string;
    category?: string;
    status?: string;
    whatsAppRejectedReason?: string;
}

export interface ResultCreateMessageResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CreateMessageResponseDTO;
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

export interface ResultCmmnVersion {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnVersion;
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

export interface CmmnTriggerEventReqDTO {
    caseInstanceId?: string;
    planItemDefinitionId?: string;
    planItemInstanceId?: string;
    state?: string;
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
    /** Process Definition Version ID */
    processDefinitionVersionId?: string;
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

export interface LanguageDTO {
    name?: string;
    code?: string;
}

export interface ResultListLanguageDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: LanguageDTO[];
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

export interface MessageTemplateDTO {
    /** @format int64 */
    id?: number;
    status?: string;
    language?: string;
    needSendTextMessage?: boolean;
    headerVariables?: string[];
    bodyVariables?: string[];
    textVariables?: string[];
}

export interface ResultListMessageTemplateDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MessageTemplateDTO[];
}

export interface ResultMessageTemplateDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MessageTemplateDTO;
}

export interface MessageTemplateListDTO {
    templateNames?: string[];
}

export interface ResultMessageTemplateListDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MessageTemplateListDTO;
}

export interface MessageCountDTO {
    name?: string;
    /** @format int64 */
    readCount?: number;
    /** @format int64 */
    sendCount?: number;
}

export interface MessageTemplateDetailDTO {
    template?: TemplateMsgManageDTO;
    whatsAppRejectedReason?: string;
    messageCounts?: MessageCountDTO[];
    templateStatuses?: TemplateStatusDTO[];
}

export interface ResultMessageTemplateDetailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MessageTemplateDetailDTO;
}

export interface TemplateStatusDTO {
    name?: string;
    status?: string;
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
            baseURL: axiosConfig.baseURL || "http://admin.app2.wclsolution.com",
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
 * @baseUrl http://admin.app2.wclsolution.com
 */
export class Admin<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserUserid
         * @summary Get User
         * @request GET:/api/nuxeo/user/{userId}
         */
        getNuxeoUserUserid: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserUserid
         * @summary Get User
         * @request POST:/api/nuxeo/user/{userId}
         */
        postNuxeoUserUserid: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/${userId}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserUseridDeprecate
         * @summary Get User
         * @request GET:/api/nuxeo/user/{userId}/
         */
        getNuxeoUserUseridDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/${userId}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserUseridDeprecate
         * @summary Get User
         * @request POST:/api/nuxeo/user/{userId}/
         */
        postNuxeoUserUseridDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/${userId}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoTypes
         * @summary Get all document types
         * @request GET:/api/nuxeo/types
         */
        getNuxeoTypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/types`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoTypes
         * @summary Get all document types
         * @request POST:/api/nuxeo/types
         */
        postNuxeoTypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/types`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoTypesDeprecate
         * @summary Get all document types
         * @request GET:/api/nuxeo/types/
         */
        getNuxeoTypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/types/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoTypesDeprecate
         * @summary Get all document types
         * @request POST:/api/nuxeo/types/
         */
        postNuxeoTypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/types/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupTypesDoctype
         * @summary Get a document type
         * @request GET:/api/nuxeo/setup/types/{docType}
         */
        getNuxeoSetupTypesDoctype: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types/${docType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupTypesDoctype
         * @summary Get a document type
         * @request POST:/api/nuxeo/setup/types/{docType}
         */
        postNuxeoSetupTypesDoctype: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types/${docType}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupTypesDoctypeDeprecate
         * @summary Get a document type
         * @request GET:/api/nuxeo/setup/types/{docType}/
         */
        getNuxeoSetupTypesDoctypeDeprecate: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types/${docType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupTypesDoctypeDeprecate
         * @summary Get a document type
         * @request POST:/api/nuxeo/setup/types/{docType}/
         */
        postNuxeoSetupTypesDoctypeDeprecate: (docType: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types/${docType}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupTypesDeprecate
         * @summary Get all document types
         * @request GET:/api/nuxeo/setup/types/
         */
        getNuxeoSetupTypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupTypesDeprecate
         * @summary Get all document types
         * @request POST:/api/nuxeo/setup/types/
         */
        postNuxeoSetupTypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupTypes
         * @summary Get all document types
         * @request GET:/api/nuxeo/setup/types
         */
        getNuxeoSetupTypes: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupTypes
         * @summary Get all document types
         * @request POST:/api/nuxeo/setup/types
         */
        postNuxeoSetupTypes: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/types`,
                method: "POST",
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name GetNuxeoFormMetadataList
         * @request GET:/api/nuxeo/form/metadata/list
         */
        getNuxeoFormMetadataList: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/form/metadata/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name PostNuxeoFormMetadataList
         * @request POST:/api/nuxeo/form/metadata/list
         */
        postNuxeoFormMetadataList: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/form/metadata/list`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name GetNuxeoFormMetadataListDeprecate
         * @request GET:/api/nuxeo/form/metadata/list/
         */
        getNuxeoFormMetadataListDeprecate: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/form/metadata/list/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Retrieve a list of existing values of a document type and key
         *
         * @tags Form (Nuxeo)
         * @name PostNuxeoFormMetadataListDeprecate
         * @request POST:/api/nuxeo/form/metadata/list/
         */
        postNuxeoFormMetadataListDeprecate: (
            query: {
                docType: string;
                filterKey?: string;
                filterValue?: string;
                key: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/form/metadata/list/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetNuxeoCollection
         * @summary Get user visible collections
         * @request GET:/api/nuxeo/collection
         */
        getNuxeoCollection: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/collection`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollection
         * @summary Get user visible collections
         * @request POST:/api/nuxeo/collection
         */
        postNuxeoCollection: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/collection`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskCandidatesbytaskdefinitionkeyDeprecate
         * @summary Retrieve task candidates by process task definition
         * @request GET:/api/docpal/workflow/task/candidatesByTaskDefinitionKey/
         */
        getWorkflowTaskCandidatesbytaskdefinitionkeyDeprecate: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/candidatesByTaskDefinitionKey/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskCandidatesbytaskdefinitionkeyDeprecate
         * @summary Retrieve task candidates by process task definition
         * @request POST:/api/docpal/workflow/task/candidatesByTaskDefinitionKey/
         */
        postWorkflowTaskCandidatesbytaskdefinitionkeyDeprecate: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/candidatesByTaskDefinitionKey/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskCandidatesbytaskdefinitionkey
         * @summary Retrieve task candidates by process task definition
         * @request GET:/api/docpal/workflow/task/candidatesByTaskDefinitionKey
         */
        getWorkflowTaskCandidatesbytaskdefinitionkey: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/candidatesByTaskDefinitionKey`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskCandidatesbytaskdefinitionkey
         * @summary Retrieve task candidates by process task definition
         * @request POST:/api/docpal/workflow/task/candidatesByTaskDefinitionKey
         */
        postWorkflowTaskCandidatesbytaskdefinitionkey: (
            query: {
                taskDefinitionKey: string;
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/candidatesByTaskDefinitionKey`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PutNuxeoUserStatus
         * @summary Update User State
         * @request PUT:/api/nuxeo/user/status
         */
        putNuxeoUserStatus: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PutNuxeoDocumentAclReplaceDeprecate
         * @request PUT:/api/nuxeo/document/acl/replace/
         */
        putNuxeoDocumentAclReplaceDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/replace/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PutNuxeoDocumentAclReplace
         * @request PUT:/api/nuxeo/document/acl/replace
         */
        putNuxeoDocumentAclReplace: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/replace`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminVirtualfolderSetting
         * @request GET:/api/nuxeo/admin/virtualfolder/setting
         */
        getNuxeoAdminVirtualfolderSetting: (params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/virtualfolder/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutNuxeoAdminVirtualfolderSetting
         * @request PUT:/api/nuxeo/admin/virtualfolder/setting
         */
        putNuxeoAdminVirtualfolderSetting: (data: VirtualFolderSettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/virtualfolder/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PostNuxeoAdminVirtualfolderSetting
         * @request POST:/api/nuxeo/admin/virtualfolder/setting
         */
        postNuxeoAdminVirtualfolderSetting: (data: VirtualFolderSettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/virtualfolder/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminSetting
         * @request GET:/api/nuxeo/admin/setting
         */
        getNuxeoAdminSetting: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutNuxeoAdminSetting
         * @request PUT:/api/nuxeo/admin/setting
         */
        putNuxeoAdminSetting: (systemId: string, data: string, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminSettingSystemId
         * @request GET:/api/nuxeo/admin/setting/{system_id}
         */
        getNuxeoAdminSettingSystemId: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/setting/${systemId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutNuxeoAdminSettingSystemId
         * @request PUT:/api/nuxeo/admin/setting/{system_id}
         */
        putNuxeoAdminSettingSystemId: (systemId: string, data: string, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/setting/${systemId}`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminIcon
         * @request GET:/api/nuxeo/admin/icon
         */
        getNuxeoAdminIcon: (
            query: {
                docTypeId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/icon`,
                method: "GET",
                query: query,
                format: "blob",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name PutNuxeoAdminIcon
         * @request PUT:/api/nuxeo/admin/icon
         */
        putNuxeoAdminIcon: (
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
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/icon`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name PutWhatsappUpdateWhatsappSetting
         * @request PUT:/api/docpal/whatsapp/update_whatsapp_setting
         */
        putWhatsappUpdateWhatsappSetting: (data: WhatsAppSettingDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/whatsapp/update_whatsapp_setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoUserController
         * @name GetUserSetting
         * @summary Load User Setting
         * @request GET:/api/docpal/user/setting
         */
        getUserSetting: (params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/user/setting`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoUserController
         * @name PutUserSetting
         * @request PUT:/api/docpal/user/setting
         */
        putUserSetting: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/user/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoUserController
         * @name PatchUserSetting
         * @request PATCH:/api/docpal/user/setting
         */
        patchUserSetting: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/user/setting`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PutTemplateEmail
         * @summary Modify (Email Template)
         * @request PUT:/api/docpal/template/email
         */
        putTemplateEmail: (data: EmailTemplate, params: RequestParams = {}) =>
            this.request<ResultEmailTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmail
         * @summary Create Email Template
         * @request POST:/api/docpal/template/email
         */
        postTemplateEmail: (data: EmailTemplate, params: RequestParams = {}) =>
            this.request<ResultEmailTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name DeleteTemplateEmail
         * @summary Delete email template by id
         * @request DELETE:/api/docpal/template/email
         */
        deleteTemplateEmail: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PutTemplateEmailTemplate
         * @summary Modify (Email Template)
         * @request PUT:/api/docpal/template/email/template
         */
        putTemplateEmailTemplate: (data: EmailTemplate, params: RequestParams = {}) =>
            this.request<ResultEmailTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/template`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailTemplate
         * @summary Create Email Template
         * @request POST:/api/docpal/template/email/template
         */
        postTemplateEmailTemplate: (data: EmailTemplate, params: RequestParams = {}) =>
            this.request<ResultEmailTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/template`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PutTemplateEmailLayout
         * @summary Update (Email Layout)
         * @request PUT:/api/docpal/template/email/layout
         */
        putTemplateEmailLayout: (data: EmailLayout, params: RequestParams = {}) =>
            this.request<ResultEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layout`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailLayout
         * @summary Create (Email Layout)
         * @request POST:/api/docpal/template/email/layout
         */
        postTemplateEmailLayout: (data: EmailLayout, params: RequestParams = {}) =>
            this.request<ResultEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layout`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PutTemplateDocument
         * @summary Update (Document Template)
         * @request PUT:/api/docpal/template/document
         */
        putTemplateDocument: (data: DocumentTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PostTemplateDocument
         * @summary Create (Document Template)
         * @request POST:/api/docpal/template/document
         */
        postTemplateDocument: (
            query: {
                /** Document Template RequestDTO */
                requestDTO: DocumentTemplateRequestDTO;
            },
            data: {
                /** @format binary */
                file?: File;
                /** @format string */
                name?: string;
                /** @format string */
                fileType?: string;
                /** @format string */
                id?: string;
                /** @format string */
                documentId?: string;
                /** @format map */
                templateVariable?: map;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PutTemplateDocumentUpload
         * @summary Upload File (Document Template)
         * @request PUT:/api/docpal/template/document/upload
         */
        putTemplateDocumentUpload: (
            query: {
                /** Document Template RequestDTO */
                requestDTO: DocumentTemplateRequestDTO;
            },
            data: {
                /** @format binary */
                file?: File;
                /** @format string */
                id?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/upload`,
                method: "PUT",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PutPolicyRetentions
         * @summary Modify retention policy
         * @request PUT:/api/docpal/policy/retentions
         */
        putPolicyRetentions: (data: RetentionPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PostPolicyRetentions
         * @summary Create a new retention policy
         * @request POST:/api/docpal/policy/retentions
         */
        postPolicyRetentions: (data: RetentionPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PutPolicyHolds
         * @summary Update hold policy
         * @request PUT:/api/docpal/policy/holds
         */
        putPolicyHolds: (data: HoldPolicy, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PostPolicyHolds
         * @summary Create a new hold policy
         * @request POST:/api/docpal/policy/holds
         */
        postPolicyHolds: (data: HoldPolicy, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name PutPersonalDashboardUpdate
         * @request PUT:/api/docpal/personal/dashboard/update
         */
        putPersonalDashboardUpdate: (data: PersonalDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/personal/dashboard/update`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTables
         * @summary Get all master tables
         * @request GET:/api/docpal/master/tables
         */
        getMasterTables: (params: RequestParams = {}) =>
            this.request<ResultListMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutMasterTables
         * @summary Update information (Master Table)
         * @request PUT:/api/docpal/master/tables
         */
        putMasterTables: (data: MasterTable, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTables
         * @summary Creation (Master Table)
         * @request POST:/api/docpal/master/tables
         */
        postMasterTables: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutMasterTablesIdRecord
         * @summary update data (master table)
         * @request PUT:/api/docpal/master/tables/{id}/record
         */
        putMasterTablesIdRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteMasterTablesIdRecord
         * @summary Delete record
         * @request DELETE:/api/docpal/master/tables/{id}/record
         */
        deleteMasterTablesIdRecord: (
            id: string,
            query: {
                recordId: string;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record`,
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
         * @name PutMasterTablesIdBatchRecord
         * @request PUT:/api/docpal/master/tables/{id}/batch/record
         */
        putMasterTablesIdBatchRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/batch/record`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PutFormDesignDraftidFormresultStatus
         * @request PUT:/api/docpal/form/design/{draftId}/formResult/status
         */
        putFormDesignDraftidFormresultStatus: (draftId: string, data: EasyFormResult, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/${draftId}/formResult/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PutDamSetting
         * @request PUT:/api/docpal/dam/setting
         */
        putDamSetting: (data: DAMConversionSettingRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dam/setting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypes
         * @summary Retrieve all case types
         * @request GET:/api/docpal/case/types
         */
        getCaseTypes: (
            query?: {
                name?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCaseType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PutCaseTypes
         * @summary Update case type
         * @request PUT:/api/docpal/case/types
         */
        putCaseTypes: (data: CaseType, params: RequestParams = {}) =>
            this.request<ResultCaseType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypes
         * @summary Create a new case type
         * @request POST:/api/docpal/case/types
         */
        postCaseTypes: (data: CaseType, params: RequestParams = {}) =>
            this.request<ResultCaseType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PutCaseTypesEnable
         * @summary Enable or Disable case type
         * @request PUT:/api/docpal/case/types/enable
         */
        putCaseTypesEnable: (data: CaseType, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/enable`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PutCaseDashboard
         * @summary Update case dashboard
         * @request PUT:/api/docpal/case/dashboard
         */
        putCaseDashboard: (data: CmmnDashboard, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboard
         * @summary Create a new case dashboard
         * @request POST:/api/docpal/case/dashboard
         */
        postCaseDashboard: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PutCaseDashboardStatus
         * @request PUT:/api/docpal/case/dashboard/status
         */
        putCaseDashboardStatus: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PutCalendars
         * @summary Update Event Task
         * @request PUT:/api/docpal/calendars
         */
        putCalendars: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultCalendarTaskRespDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars`,
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
            this.request<ResultCalendarTaskRespDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutAzureOcrUpdateocrsettingDeprecate
         * @request PUT:/api/docpal/azure/ocr/updateOcrSetting/
         */
        putAzureOcrUpdateocrsettingDeprecate: (data: AzureOcrSettingDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/updateOcrSetting/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutAzureOcrUpdateocrsetting
         * @request PUT:/api/docpal/azure/ocr/updateOcrSetting
         */
        putAzureOcrUpdateocrsetting: (data: AzureOcrSettingDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/updateOcrSetting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutAzureOcrUpdateocrprofilemapping
         * @request PUT:/api/docpal/azure/ocr/updateOcrProfileMapping
         */
        putAzureOcrUpdateocrprofilemapping: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/updateOcrProfileMapping`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutAzureOcrUpdateocrprofilemappingDeprecate
         * @request PUT:/api/docpal/azure/ocr/updateOcrProfileMapping/
         */
        putAzureOcrUpdateocrprofilemappingDeprecate: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/updateOcrProfileMapping/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutAzureOcrUpdateapisetting
         * @request PUT:/api/docpal/azure/ocr/updateApiSetting
         */
        putAzureOcrUpdateapisetting: (data: AzureOcrApiKeyDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/updateApiSetting`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PutAzureOcrUpdateapisettingDeprecate
         * @request PUT:/api/docpal/azure/ocr/updateApiSetting/
         */
        putAzureOcrUpdateapisettingDeprecate: (data: AzureOcrApiKeyDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/updateApiSetting/`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostWorkflowManagerUpdateVariables
         * @request POST:/api/workflow/manager/update_variables
         */
        postWorkflowManagerUpdateVariables: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/workflow/manager/update_variables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostWorkflowManagerStartMiddleWorkflow
         * @request POST:/api/workflow/manager/start_middle_workflow
         */
        postWorkflowManagerStartMiddleWorkflow: (data: WorkflowInstanceRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/workflow/manager/start_middle_workflow`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostWorkflowManagerStartFirstWorkflow
         * @request POST:/api/workflow/manager/start_first_workflow
         */
        postWorkflowManagerStartFirstWorkflow: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/workflow/manager/start_first_workflow`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostWorkflowManagerChangeWorkflowStateForSubmit
         * @request POST:/api/workflow/manager/change_workflow_state_for_submit
         */
        postWorkflowManagerChangeWorkflowStateForSubmit: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/workflow/manager/change_workflow_state_for_submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostWorkflowManagerChangeWorkflowState
         * @request POST:/api/workflow/manager/change_workflow_state
         */
        postWorkflowManagerChangeWorkflowState: (data: WorkflowInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/workflow/manager/change_workflow_state`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Manager
         * @name PostWorkflowManagerCalendars
         * @request POST:/api/workflow/manager/calendars
         */
        postWorkflowManagerCalendars: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/workflow/manager/calendars`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostVerificationPermission
         * @summary verification access control permission of acl user
         * @request POST:/api/verification/permission
         */
        postVerificationPermission: (data: VerificationPermissionReq, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostVerificationPermissionQuerycollapsefieldvalues
         * @request POST:/api/verification/permission/queryCollapseFieldValues
         */
        postVerificationPermissionQuerycollapsefieldvalues: (data: AuditLogRequestDTO, params: RequestParams = {}) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/queryCollapseFieldValues`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostVerificationPermissionQueryauditevent
         * @request POST:/api/verification/permission/queryAuditEvent
         */
        postVerificationPermissionQueryauditevent: (data: AuditTemplateDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOAuditTemplateDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/queryAuditEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name PostVerificationPermissionAuditevent
         * @request POST:/api/verification/permission/auditEvent
         */
        postVerificationPermissionAuditevent: (data: AuditModel, params: RequestParams = {}) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/auditEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name GetUserPermission
         * @summary Query permission
         * @request GET:/api/user/permission
         */
        getUserPermission: (
            query: {
                businessId: string;
                userId: string;
                aces: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultAclUserPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name PostUserPermission
         * @summary create permission of acl user that deal with business
         * @request POST:/api/user/permission
         */
        postUserPermission: (data: AclUserPermission, params: RequestParams = {}) =>
            this.request<ResultAclUserPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name DeleteUserPermission
         * @summary Remove single permission
         * @request DELETE:/api/user/permission
         */
        deleteUserPermission: (data: AclUserPermission, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name PostUserPermissionReplace
         * @request POST:/api/user/permission/replace
         */
        postUserPermissionReplace: (data: AclUserPermission, params: RequestParams = {}) =>
            this.request<ResultAclUserPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission/replace`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostPermissions
         * @summary Create access control permission
         * @request POST:/api/permissions
         */
        postPermissions: (data: AccessControlPermission, params: RequestParams = {}) =>
            this.request<ResultAccessControlPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions`,
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
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostPermissionsNames
         * @request POST:/api/permissions/names
         */
        postPermissionsNames: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListAccessControlPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/names`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostPermissionsEntries
         * @summary Query permission entry list by permission name list
         * @request POST:/api/permissions/entries
         */
        postPermissionsEntries: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/entries`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PostPermissionsBatchEntry
         * @summary batch add access control permission
         * @request POST:/api/permissions/batch/entry
         */
        postPermissionsBatchEntry: (data: AclPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/batch/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserController
         * @name PostPermissionUsers
         * @summary create acl user
         * @request POST:/api/permission/users
         */
        postPermissionUsers: (data: AclUserInformation, params: RequestParams = {}) =>
            this.request<ResultAclUserInformation, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserRelationshipController
         * @name PostPermissionUserRelationships
         * @summary create user relation ship
         * @request POST:/api/permission/user/relationships
         */
        postPermissionUserRelationships: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/relationships`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserRelationshipController
         * @name DeletePermissionUserRelationships
         * @summary remove user relation ship
         * @request DELETE:/api/permission/user/relationships
         */
        deletePermissionUserRelationships: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/relationships`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name PostPermissionUserGroup
         * @summary create acl user group
         * @request POST:/api/permission/user/group
         */
        postPermissionUserGroup: (data: AclUserGroup, params: RequestParams = {}) =>
            this.request<ResultAclUserGroup, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name DeletePermissionUserGroup
         * @summary Remove user from user group
         * @request DELETE:/api/permission/user/group
         */
        deletePermissionUserGroup: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name PostPermissionUserGroupUsers
         * @summary Add the list of acl user to user group
         * @request POST:/api/permission/user/group/users
         */
        postPermissionUserGroupUsers: (data: AclUserGroupDTO, params: RequestParams = {}) =>
            this.request<ResultAclUserGroup, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name PostPermissionUserGroupAddUsers
         * @summary Add user to user group
         * @request POST:/api/permission/user/group/add/users
         */
        postPermissionUserGroupAddUsers: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group/add/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name PostPermissionEntry
         * @summary Create Access control entry
         * @request POST:/api/permission/entry
         */
        postPermissionEntry: (data: AccessControlEntry, params: RequestParams = {}) =>
            this.request<ResultAccessControlEntry, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name DeletePermissionEntry
         * @summary Batch delete entry by id list
         * @request DELETE:/api/permission/entry
         */
        deletePermissionEntry: (data: AclEntryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/entry`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PostNuxeoVocabularyIdEntry
         * @summary Add Vocabulary entry
         * @request POST:/api/nuxeo/vocabulary/{id}/entry
         */
        postNuxeoVocabularyIdEntry: (id: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name DeleteNuxeoVocabularyIdEntry
         * @summary Delete Vocabulary entry
         * @request DELETE:/api/nuxeo/vocabulary/{id}/entry
         */
        deleteNuxeoVocabularyIdEntry: (
            id: string,
            query: {
                entryId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/entry`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchNuxeoVocabularyIdEntry
         * @summary Update Vocabulary entry
         * @request PATCH:/api/nuxeo/vocabulary/{id}/entry
         */
        patchNuxeoVocabularyIdEntry: (id: string, data: VocabularyEntryRequestDTO, params: RequestParams = {}) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PostNuxeoVocabularyIdEntryDeprecate
         * @summary Add Vocabulary entry
         * @request POST:/api/nuxeo/vocabulary/{id}/entry/
         */
        postNuxeoVocabularyIdEntryDeprecate: (
            id: string,
            data: VocabularyEntryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/entry/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name DeleteNuxeoVocabularyIdEntryDeprecate
         * @summary Delete Vocabulary entry
         * @request DELETE:/api/nuxeo/vocabulary/{id}/entry/
         */
        deleteNuxeoVocabularyIdEntryDeprecate: (
            id: string,
            query: {
                entryId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/entry/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchNuxeoVocabularyIdEntryDeprecate
         * @summary Update Vocabulary entry
         * @request PATCH:/api/nuxeo/vocabulary/{id}/entry/
         */
        patchNuxeoVocabularyIdEntryDeprecate: (
            id: string,
            data: VocabularyEntryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/entry/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserBatchActive
         * @summary Batch update user active status
         * @request POST:/api/nuxeo/user/batch/active
         */
        postNuxeoUserBatchActive: (data: UserBatchActiveDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/batch/active`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserAsyncUsers
         * @request POST:/api/nuxeo/user/async/users
         */
        postNuxeoUserAsyncUsers: (params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/async/users`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostNuxeoTagsGetalltags
         * @request POST:/api/nuxeo/tags/getAllTags
         */
        postNuxeoTagsGetalltags: (params: RequestParams = {}) =>
            this.request<ResultSetString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/tags/getAllTags`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningUpdatepolicies
         * @summary Update Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updatePolicies
         */
        postNuxeoStudioVersioningUpdatepolicies: (data: VersioningPolicyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/updatePolicies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningUpdatepoliciesDeprecate
         * @summary Update Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updatePolicies/
         */
        postNuxeoStudioVersioningUpdatepoliciesDeprecate: (
            data: VersioningPolicyRequestDTO[],
            params: RequestParams = {},
        ) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/updatePolicies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningUpdatefiltersDeprecate
         * @summary Update Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updateFilters/
         */
        postNuxeoStudioVersioningUpdatefiltersDeprecate: (
            data: VersioningFilterRequestDTO[],
            params: RequestParams = {},
        ) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/updateFilters/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningUpdatefilters
         * @summary Update Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/updateFilters
         */
        postNuxeoStudioVersioningUpdatefilters: (data: VersioningFilterRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/updateFilters`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningCreatepolicies
         * @summary Create Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createPolicies
         */
        postNuxeoStudioVersioningCreatepolicies: (data: VersioningPolicyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/createPolicies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningCreatepoliciesDeprecate
         * @summary Create Custom Policies (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createPolicies/
         */
        postNuxeoStudioVersioningCreatepoliciesDeprecate: (
            data: VersioningPolicyRequestDTO[],
            params: RequestParams = {},
        ) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/createPolicies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningCreatefiltersDeprecate
         * @summary Create Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createFilters/
         */
        postNuxeoStudioVersioningCreatefiltersDeprecate: (
            data: VersioningFilterRequestDTO[],
            params: RequestParams = {},
        ) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/createFilters/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioVersioningCreatefilters
         * @summary Create Custom Filters (Versioning Configuration)
         * @request POST:/api/nuxeo/studio/versioning/createFilters
         */
        postNuxeoStudioVersioningCreatefilters: (data: VersioningFilterRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/createFilters`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioUpdatevocabularies
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/studio/updateVocabularies
         */
        postNuxeoStudioUpdatevocabularies: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/updateVocabularies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioUpdatevocabulariesDeprecate
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/studio/updateVocabularies/
         */
        postNuxeoStudioUpdatevocabulariesDeprecate: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/updateVocabularies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioUpdateschemasDeprecate
         * @summary Update Custom Schemas
         * @request POST:/api/nuxeo/studio/updateSchemas/
         */
        postNuxeoStudioUpdateschemasDeprecate: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/updateSchemas/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioUpdateschemas
         * @summary Update Custom Schemas
         * @request POST:/api/nuxeo/studio/updateSchemas
         */
        postNuxeoStudioUpdateschemas: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/updateSchemas`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioUpdatedoctypesDeprecate
         * @summary Update custom document types
         * @request POST:/api/nuxeo/studio/updateDocTypes/
         */
        postNuxeoStudioUpdatedoctypesDeprecate: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/updateDocTypes/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioUpdatedoctypes
         * @summary Update custom document types
         * @request POST:/api/nuxeo/studio/updateDocTypes
         */
        postNuxeoStudioUpdatedoctypes: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/updateDocTypes`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioCreatevocabularies
         * @request POST:/api/nuxeo/studio/createVocabularies
         */
        postNuxeoStudioCreatevocabularies: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/createVocabularies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioCreatevocabulariesDeprecate
         * @request POST:/api/nuxeo/studio/createVocabularies/
         */
        postNuxeoStudioCreatevocabulariesDeprecate: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/createVocabularies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioCreateschemasDeprecate
         * @summary Create custom schemas
         * @request POST:/api/nuxeo/studio/createSchemas/
         */
        postNuxeoStudioCreateschemasDeprecate: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/createSchemas/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioCreateschemas
         * @summary Create custom schemas
         * @request POST:/api/nuxeo/studio/createSchemas
         */
        postNuxeoStudioCreateschemas: (data: SchemaRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/createSchemas`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioCreatedoctypesDeprecate
         * @summary Create custom document types
         * @request POST:/api/nuxeo/studio/createDocTypes/
         */
        postNuxeoStudioCreatedoctypesDeprecate: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/createDocTypes/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name PostNuxeoStudioCreatedoctypes
         * @summary Create custom document types
         * @request POST:/api/nuxeo/studio/createDocTypes
         */
        postNuxeoStudioCreatedoctypes: (data: DocumentTypeRequestDTO[], params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/createDocTypes`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostNuxeoSharePage
         * @request POST:/api/nuxeo/share/page
         */
        postNuxeoSharePage: (data: SharePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/share/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostNuxeoShareGet
         * @request POST:/api/nuxeo/share/get
         */
        postNuxeoShareGet: (data: SharePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/share/get`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name PostNuxeoSfolderPage
         * @summary Pagination Search (Smart Folder)
         * @request POST:/api/nuxeo/sfolder/page
         */
        postNuxeoSfolderPage: (data: SmartFolderRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupUpdatevocabulariesDeprecate
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/setup/updateVocabularies/
         */
        postNuxeoSetupUpdatevocabulariesDeprecate: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/updateVocabularies/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupUpdatevocabularies
         * @summary Update Vocabularies
         * @request POST:/api/nuxeo/setup/updateVocabularies
         */
        postNuxeoSetupUpdatevocabularies: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/updateVocabularies`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoSetupCreatedocpaltype
         * @summary Create Global File DocPal Type
         * @request POST:/api/nuxeo/setup/createDocPalType
         */
        postNuxeoSetupCreatedocpaltype: (params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/createDocPalType`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchNestedsearchV2
         * @request POST:/api/nuxeo/search/nestedSearch_v2
         */
        postNuxeoSearchNestedsearchV2: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/search/nestedSearch_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchNestedsearch
         * @summary Nested Search
         * @request POST:/api/nuxeo/search/nestedSearch
         */
        postNuxeoSearchNestedsearch: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/search/nestedSearch`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoRestoreversionDeprecate
         * @summary Restores a document to the input version document
         * @request POST:/api/nuxeo/restoreVersion/
         */
        postNuxeoRestoreversionDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/restoreVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoRestoreversion
         * @summary Restores a document to the input version document
         * @request POST:/api/nuxeo/restoreVersion
         */
        postNuxeoRestoreversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/restoreVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUsersBatchDelete
         * @summary Batch delete users
         * @request POST:/api/nuxeo/identity/users/batch/delete
         */
        postNuxeoIdentityUsersBatchDelete: (data: BatchDeleteUserDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/users/batch/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUsersBatchAddGroups
         * @summary Batch add groups to users
         * @request POST:/api/nuxeo/identity/users/batch/add/groups
         */
        postNuxeoIdentityUsersBatchAddGroups: (data: BatchAddUsersToGroupsDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/users/batch/add/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUsers
         * @summary List users
         * @request POST:/api/nuxeo/identity/users
         */
        postNuxeoIdentityUsers: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUsersDeprecate
         * @summary List users
         * @request POST:/api/nuxeo/identity/users/
         */
        postNuxeoIdentityUsersDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/users/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUserBatchRemoveGroups
         * @summary Batch remove groups from user
         * @request POST:/api/nuxeo/identity/user/batch/remove/groups
         */
        postNuxeoIdentityUserBatchRemoveGroups: (data: UserBatchAddGroupsDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user/batch/remove/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUserBatchAddGroups
         * @summary Batch add groups to user
         * @request POST:/api/nuxeo/identity/user/batch/add/groups
         */
        postNuxeoIdentityUserBatchAddGroups: (data: UserBatchAddGroupsDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user/batch/add/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUser
         * @summary Create new User
         * @request POST:/api/nuxeo/identity/user
         */
        postNuxeoIdentityUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityUser
         * @summary Delete User
         * @request DELETE:/api/nuxeo/identity/user
         */
        deleteNuxeoIdentityUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchNuxeoIdentityUser
         * @summary Update User
         * @request PATCH:/api/nuxeo/identity/user
         */
        patchNuxeoIdentityUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUserDeprecate
         * @summary Create new User
         * @request POST:/api/nuxeo/identity/user/
         */
        postNuxeoIdentityUserDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityUserDeprecate
         * @summary Delete User
         * @request DELETE:/api/nuxeo/identity/user/
         */
        deleteNuxeoIdentityUserDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchNuxeoIdentityUserDeprecate
         * @summary Update User
         * @request PATCH:/api/nuxeo/identity/user/
         */
        patchNuxeoIdentityUserDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityMembership
         * @summary Add user to group
         * @request POST:/api/nuxeo/identity/membership
         */
        postNuxeoIdentityMembership: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/membership`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityMembership
         * @summary Remove user from group
         * @request DELETE:/api/nuxeo/identity/membership
         */
        deleteNuxeoIdentityMembership: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultIdentityRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/membership`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityMembershipDeprecate
         * @summary Add user to group
         * @request POST:/api/nuxeo/identity/membership/
         */
        postNuxeoIdentityMembershipDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/membership/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityMembershipDeprecate
         * @summary Remove user from group
         * @request DELETE:/api/nuxeo/identity/membership/
         */
        deleteNuxeoIdentityMembershipDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultIdentityRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/membership/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityMembergroupDeprecate
         * @summary Get the groups of a member
         * @request POST:/api/nuxeo/identity/memberGroup/
         */
        postNuxeoIdentityMembergroupDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/memberGroup/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityMembergroup
         * @summary Get the groups of a member
         * @request POST:/api/nuxeo/identity/memberGroup
         */
        postNuxeoIdentityMembergroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/memberGroup`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityMember
         * @summary Get the members of a group
         * @request POST:/api/nuxeo/identity/member
         */
        postNuxeoIdentityMember: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/member`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityMemberDeprecate
         * @summary Get the members of a group
         * @request POST:/api/nuxeo/identity/member/
         */
        postNuxeoIdentityMemberDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/member/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGroups
         * @summary List groups
         * @request POST:/api/nuxeo/identity/groups
         */
        postNuxeoIdentityGroups: (params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/groups`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGroupsDeprecate
         * @summary List groups
         * @request POST:/api/nuxeo/identity/groups/
         */
        postNuxeoIdentityGroupsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/groups/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGroupBatchRemoveUsers
         * @summary Batch remove users from group
         * @request POST:/api/nuxeo/identity/group/batch/remove/users
         */
        postNuxeoIdentityGroupBatchRemoveUsers: (data: GroupBatchAddUsersDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group/batch/remove/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGroupBatchAddUsers
         * @summary Batch add users to group
         * @request POST:/api/nuxeo/identity/group/batch/add/users
         */
        postNuxeoIdentityGroupBatchAddUsers: (data: GroupBatchAddUsersDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group/batch/add/users`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGroup
         * @summary Create new group
         * @request POST:/api/nuxeo/identity/group
         */
        postNuxeoIdentityGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityGroup
         * @summary Delete group
         * @request DELETE:/api/nuxeo/identity/group
         */
        deleteNuxeoIdentityGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchNuxeoIdentityGroup
         * @summary Update group
         * @request PATCH:/api/nuxeo/identity/group
         */
        patchNuxeoIdentityGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGroupDeprecate
         * @summary Create new group
         * @request POST:/api/nuxeo/identity/group/
         */
        postNuxeoIdentityGroupDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityGroupDeprecate
         * @summary Delete group
         * @request DELETE:/api/nuxeo/identity/group/
         */
        deleteNuxeoIdentityGroupDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchNuxeoIdentityGroupDeprecate
         * @summary Update group
         * @request PATCH:/api/nuxeo/identity/group/
         */
        patchNuxeoIdentityGroupDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/group/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGetlicenseusernumandactivecountDeprecate
         * @request POST:/api/nuxeo/identity/getLicenseUserNumAndActiveCount/
         */
        postNuxeoIdentityGetlicenseusernumandactivecountDeprecate: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/getLicenseUserNumAndActiveCount/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGetlicenseusernumandactivecount
         * @request POST:/api/nuxeo/identity/getLicenseUserNumAndActiveCount
         */
        postNuxeoIdentityGetlicenseusernumandactivecount: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/getLicenseUserNumAndActiveCount`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGetkeycloakallusers
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers
         */
        postNuxeoIdentityGetkeycloakallusers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/getKeyCloakAllUsers`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGetkeycloakallusersDeprecate
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers/
         */
        postNuxeoIdentityGetkeycloakallusersDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/getKeyCloakAllUsers/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGetallusersDeprecate
         * @request POST:/api/nuxeo/identity/getAllUsers/
         */
        postNuxeoIdentityGetallusersDeprecate: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/getAllUsers/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityGetallusers
         * @request POST:/api/nuxeo/identity/getAllUsers
         */
        postNuxeoIdentityGetallusers: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/getAllUsers`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityCopyusersDeprecate
         * @request POST:/api/nuxeo/identity/copyUsers/
         */
        postNuxeoIdentityCopyusersDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/copyUsers/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityCopyusers
         * @request POST:/api/nuxeo/identity/copyUsers
         */
        postNuxeoIdentityCopyusers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/copyUsers`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetversionsDeprecate
         * @summary Get All Versions by Document ID or Path
         * @request POST:/api/nuxeo/getVersions/
         */
        postNuxeoGetversionsDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringInstant, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getVersions/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetversions
         * @summary Get All Versions by Document ID or Path
         * @request POST:/api/nuxeo/getVersions
         */
        postNuxeoGetversions: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringInstant, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getVersions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetversionnum
         * @summary Get Version Number by Document ID or Path
         * @request POST:/api/nuxeo/getVersionNum
         */
        postNuxeoGetversionnum: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getVersionNum`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetversionnumDeprecate
         * @summary Get Version Number by Document ID or Path
         * @request POST:/api/nuxeo/getVersionNum/
         */
        postNuxeoGetversionnumDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getVersionNum/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetspecificversion
         * @summary Get Specific Version by Document ID/Path and version number
         * @request POST:/api/nuxeo/getSpecificVersion
         */
        postNuxeoGetspecificversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getSpecificVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetspecificversionDeprecate
         * @summary Get Specific Version by Document ID/Path and version number
         * @request POST:/api/nuxeo/getSpecificVersion/
         */
        postNuxeoGetspecificversionDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getSpecificVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetlatestversion
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion
         */
        postNuxeoGetlatestversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getLatestVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoGetlatestversionDeprecate
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion/
         */
        postNuxeoGetlatestversionDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getLatestVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoFolderstructureExport
         * @request POST:/api/nuxeo/folderStructure/export
         */
        postNuxeoFolderstructureExport: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/folderStructure/export`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoFolderstructureExportDeprecate
         * @request POST:/api/nuxeo/folderStructure/export/
         */
        postNuxeoFolderstructureExportDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/folderStructure/export/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentTrainingdata
         * @request POST:/api/nuxeo/document/trainingData
         */
        postNuxeoDocumentTrainingdata: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/trainingData`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbypropertiesforvirtualfolder
         * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder
         */
        postNuxeoDocumentSearchbypropertiesforvirtualfolder: (
            data: DocumentRequestForVirtureFolderDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginationDTOVirtualFolderDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/searchByPropertiesForVirtualFolder`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbypropertiesforvirtualfolderDeprecate
         * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder/
         */
        postNuxeoDocumentSearchbypropertiesforvirtualfolderDeprecate: (
            data: DocumentRequestForVirtureFolderDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginationDTOVirtualFolderDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/searchByPropertiesForVirtualFolder/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbypropertiesDeprecate
         * @request POST:/api/nuxeo/document/searchByProperties/
         */
        postNuxeoDocumentSearchbypropertiesDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/searchByProperties/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbyproperties
         * @request POST:/api/nuxeo/document/searchByProperties
         */
        postNuxeoDocumentSearchbyproperties: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/searchByProperties`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentQueryauditevent
         * @request POST:/api/nuxeo/document/queryAuditEvent
         */
        postNuxeoDocumentQueryauditevent: (data: AuditTemplateDTO, params: RequestParams = {}) =>
            this.request<
                ResultPaginationDTOAuditTemplateResponseExtendDTO,
                Result | (ResultObject | Result | ResultString)
            >({
                path: `/nuxeo/document/queryAuditEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentPreviewDeprecate
         * @request POST:/api/nuxeo/document/preview/
         */
        postNuxeoDocumentPreviewDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/preview/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentPreview
         * @request POST:/api/nuxeo/document/preview
         */
        postNuxeoDocumentPreview: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/preview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentMove
         * @request POST:/api/nuxeo/document/move
         */
        postNuxeoDocumentMove: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/move`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentMoveDeprecate
         * @request POST:/api/nuxeo/document/move/
         */
        postNuxeoDocumentMoveDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/move/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentIsduplicatename
         * @summary isDuplicateName
         * @request POST:/api/nuxeo/document/isDuplicateName
         */
        postNuxeoDocumentIsduplicatename: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/isDuplicateName`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentIsduplicatenameDeprecate
         * @summary isDuplicateName
         * @request POST:/api/nuxeo/document/isDuplicateName/
         */
        postNuxeoDocumentIsduplicatenameDeprecate: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/isDuplicateName/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentDownload
         * @request POST:/api/nuxeo/document/download
         */
        postNuxeoDocumentDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentDownloadDeprecate
         * @request POST:/api/nuxeo/document/download/
         */
        postNuxeoDocumentDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentDetail
         * @request POST:/api/nuxeo/document/detail
         */
        postNuxeoDocumentDetail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/detail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreatefoldersDeprecate
         * @request POST:/api/nuxeo/document/createFolders/
         */
        postNuxeoDocumentCreatefoldersDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/createFolders/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreatefolders
         * @request POST:/api/nuxeo/document/createFolders
         */
        postNuxeoDocumentCreatefolders: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/createFolders`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreatedocumentDeprecate
         * @request POST:/api/nuxeo/document/createDocument/
         */
        postNuxeoDocumentCreatedocumentDeprecate: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/createDocument/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreatedocument
         * @request POST:/api/nuxeo/document/createDocument
         */
        postNuxeoDocumentCreatedocument: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/createDocument`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCopyDeprecate
         * @request POST:/api/nuxeo/document/copy/
         */
        postNuxeoDocumentCopyDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/copy/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCopy
         * @request POST:/api/nuxeo/document/copy
         */
        postNuxeoDocumentCopy: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/copy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentChildrenThumbnail
         * @request POST:/api/nuxeo/document/children/thumbnail
         */
        postNuxeoDocumentChildrenThumbnail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocumentThumbnailDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/children/thumbnail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentChildrenDeprecate
         * @request POST:/api/nuxeo/document/children/
         */
        postNuxeoDocumentChildrenDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/children/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentChildren
         * @request POST:/api/nuxeo/document/children
         */
        postNuxeoDocumentChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/children`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentBreadcrumb
         * @request POST:/api/nuxeo/document/breadcrumb
         */
        postNuxeoDocumentBreadcrumb: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/breadcrumb`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentBreadcrumbDeprecate
         * @request POST:/api/nuxeo/document/breadcrumb/
         */
        postNuxeoDocumentBreadcrumbDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/breadcrumb/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclsDeprecate
         * @request POST:/api/nuxeo/document/acls/
         * @deprecated
         */
        postNuxeoDocumentAclsDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acls/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAcls
         * @request POST:/api/nuxeo/document/acls
         * @deprecated
         */
        postNuxeoDocumentAcls: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acls`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclDeprecate
         * @request POST:/api/nuxeo/document/acl/
         * @deprecated
         */
        postNuxeoDocumentAclDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAcl
         * @request POST:/api/nuxeo/document/acl
         * @deprecated
         */
        postNuxeoDocumentAcl: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclUnblock
         * @request POST:/api/nuxeo/document/acl/unblock
         */
        postNuxeoDocumentAclUnblock: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/unblock`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclUnblockDeprecate
         * @request POST:/api/nuxeo/document/acl/unblock/
         */
        postNuxeoDocumentAclUnblockDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/unblock/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclBlock
         * @request POST:/api/nuxeo/document/acl/block
         */
        postNuxeoDocumentAclBlock: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/block`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclBlockDeprecate
         * @request POST:/api/nuxeo/document/acl/block/
         */
        postNuxeoDocumentAclBlockDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/block/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclAdd
         * @request POST:/api/nuxeo/document/acl/add
         */
        postNuxeoDocumentAclAdd: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclAddDeprecate
         * @request POST:/api/nuxeo/document/acl/add/
         */
        postNuxeoDocumentAclAddDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoCreateversionDeprecate
         * @summary Create Version by Document ID/Path and increment policy
         * @request POST:/api/nuxeo/createVersion/
         */
        postNuxeoCreateversionDeprecate: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/createVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Versioning Controller
         * @name PostNuxeoCreateversion
         * @summary Create Version by Document ID/Path and increment policy
         * @request POST:/api/nuxeo/createVersion
         */
        postNuxeoCreateversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/createVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name PostMessageQueueMessageidResubmit
         * @summary ReInvoke business
         * @request POST:/api/message/queue/{messageId}/reSubmit
         */
        postMessageQueueMessageidResubmit: (
            messageId: string,
            query?: {
                businessId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/${messageId}/reSubmit`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name PostMessageQueuePage
         * @summary The Page of BusinessResultRecord
         * @request POST:/api/message/queue/page
         */
        postMessageQueuePage: (
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
            this.request<ResultPageBusinessResultRecord, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/page`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettings
         * @summary Creation DocPalType
         * @request POST:/api/docpalType/settings
         */
        postDocpaltypeSettings: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsRestorehistorydocpaltype
         * @summary Convert Document-Type to DocPal-Type for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/restoreHistoryDocPalType
         */
        postDocpaltypeSettingsRestorehistorydocpaltype: (params: RequestParams = {}) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/restoreHistoryDocPalType`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsRepairsingledocpaltype
         * @summary Fill in value into document properties[docPalType] for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/repairSingleDocPalType
         */
        postDocpaltypeSettingsRepairsingledocpaltype: (
            query: {
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/repairSingleDocPalType`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsQuerywaitupdatedocs
         * @summary Query waiting update document for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/queryWaitUpdateDocs
         */
        postDocpaltypeSettingsQuerywaitupdatedocs: (params: RequestParams = {}) =>
            this.request<object, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/queryWaitUpdateDocs`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsPage
         * @summary Pagination search
         * @request POST:/api/docpalType/settings/page
         */
        postDocpaltypeSettingsPage: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocPalType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsNameNameRelated
         * @summary Query all related docpal type of current docpal type
         * @request GET:/api/docpalType/settings/name/{name}/related
         */
        getDocpaltypeSettingsNameNameRelated: (name: string, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeRelated, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/name/${name}/related`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsNameNameRelated
         * @summary Create/Bound related docpal type into current docpal type
         * @request POST:/api/docpalType/settings/name/{name}/related
         */
        postDocpaltypeSettingsNameNameRelated: (name: string, data: DocPalTypeRelated, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeRelated, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/name/${name}/related`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PatchDocpaltypeSettingsNameNameRelated
         * @summary Update related docpal type
         * @request PATCH:/api/docpalType/settings/name/{name}/related
         */
        patchDocpaltypeSettingsNameNameRelated: (name: string, data: DocPalTypeRelated, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeRelated, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/name/${name}/related`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsImport
         * @summary Batch upload docpal type
         * @request POST:/api/docpalType/settings/import
         */
        postDocpaltypeSettingsImport: (
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/import`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsImportSingleDocpaltype
         * @summary Upload single docpal type
         * @request POST:/api/docpalType/settings/import/single/docpalType
         */
        postDocpaltypeSettingsImportSingleDocpaltype: (data: ImportDocPalTypeDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/import/single/docpalType`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsFillindocpaltypeindocument
         * @summary Fill in value into document properties[docPalType] for repair data, Test API Don't use it
         * @request POST:/api/docpalType/settings/fillInDocPalTypeInDocument
         */
        postDocpaltypeSettingsFillindocpaltypeindocument: (
            query?: {
                rootDocId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/fillInDocPalTypeInDocument`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsCopyName
         * @summary Copy DocPal Type
         * @request POST:/api/docpalType/settings/copy/{name}
         */
        postDocpaltypeSettingsCopyName: (name: string, data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/copy/${name}`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsCheckDuplicate
         * @summary Check duplicate name of docpal type
         * @request POST:/api/docpalType/settings/check/duplicate
         */
        postDocpaltypeSettingsCheckDuplicate: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/check/duplicate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsBatchMetadata
         * @summary Batch add multiple metadata into docpal type
         * @request POST:/api/docpalType/settings/batch/metadata
         */
        postDocpaltypeSettingsBatchMetadata: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/batch/metadata`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PostDocpaltypeSettingsAddMetadata
         * @summary Add a new metadata into docpal type
         * @request POST:/api/docpalType/settings/add/metadata
         */
        postDocpaltypeSettingsAddMetadata: (data: DocPalTypeMetadataRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/add/metadata`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostWorkflowVersionVersionidDeploy
         * @summary Promote to Production - Deploy the current version to production for used it
         * @request POST:/api/docpal/workflow/version/{versionId}/deploy
         */
        postWorkflowVersionVersionidDeploy: (
            versionId: string,
            query: {
                requestDTO: ProcessDefinitionDraftRequestDTO;
            },
            data: {
                /** @format binary */
                file?: File;
                /** @format string */
                jsonValue?: stringJson;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/${versionId}/deploy`,
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
         * @name PostWorkflowVersionReplaceDraft
         * @summary Save to Draft
         * @request POST:/api/docpal/workflow/version/replace/draft
         */
        postWorkflowVersionReplaceDraft: (data: ProcessVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/replace/draft`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostWorkflowVersionRepair
         * @summary Repair history process definition
         * @request POST:/api/docpal/workflow/version/repair
         */
        postWorkflowVersionRepair: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/repair`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostWorkflowVersionPage
         * @summary Pagination search of process definition version
         * @request POST:/api/docpal/workflow/version/page
         */
        postWorkflowVersionPage: (data: ProcessVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOProcessDefinitionVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name PostWorkflowVersionNew
         * @summary Save New Version of process definition
         * @request POST:/api/docpal/workflow/version/new
         */
        postWorkflowVersionNew: (
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
            this.request<ResultProcessDefinitionVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/new`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowUpdatemetadatamapping
         * @request POST:/api/docpal/workflow/updateMetadataMapping
         */
        postWorkflowUpdatemetadatamapping: (data: DocumentTypeMetadataMapping, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/updateMetadataMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksUser
         * @request POST:/api/docpal/workflow/tasks/user
         */
        postWorkflowTasksUser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/tasks/user`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksUserDeprecate
         * @request POST:/api/docpal/workflow/tasks/user/
         */
        postWorkflowTasksUserDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/tasks/user/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksDeprecate
         * @request POST:/api/docpal/workflow/tasks/
         */
        postWorkflowTasksDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/tasks/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasks
         * @request POST:/api/docpal/workflow/tasks
         */
        postWorkflowTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/tasks`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskUnclaimDeprecate
         * @request POST:/api/docpal/workflow/task/unclaim/
         */
        postWorkflowTaskUnclaimDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/unclaim/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskUnclaim
         * @request POST:/api/docpal/workflow/task/unclaim
         */
        postWorkflowTaskUnclaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/unclaim`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskMove
         * @request POST:/api/docpal/workflow/task/move
         */
        postWorkflowTaskMove: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/move`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskMoveDeprecate
         * @request POST:/api/docpal/workflow/task/move/
         */
        postWorkflowTaskMoveDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/move/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskClaim
         * @request POST:/api/docpal/workflow/task/claim
         */
        postWorkflowTaskClaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/claim`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskClaimDeprecate
         * @request POST:/api/docpal/workflow/task/claim/
         */
        postWorkflowTaskClaimDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/task/claim/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowSavemetadatamapping
         * @request POST:/api/docpal/workflow/saveMetadataMapping
         */
        postWorkflowSavemetadatamapping: (data: DocPalDocumentTypeMapping, params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeMetadataMapping, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/saveMetadataMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowSavedocumenttypeprofile
         * @request POST:/api/docpal/workflow/saveDocumentTypeProfile
         */
        postWorkflowSavedocumenttypeprofile: (data: DocumentTypeProfileSettingRequest, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeProfileSetting, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/saveDocumentTypeProfile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowRetryFailWorkflow
         * @request POST:/api/docpal/workflow/retry_fail_workflow
         */
        postWorkflowRetryFailWorkflow: (data: WorkflowRetryManagerDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/retry_fail_workflow`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowRetryFailWorkflowDeprecate
         * @request POST:/api/docpal/workflow/retry_fail_workflow/
         */
        postWorkflowRetryFailWorkflowDeprecate: (data: WorkflowRetryManagerDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/retry_fail_workflow/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowQueryWorkflowRetryPage
         * @request POST:/api/docpal/workflow/query_workflow_retry_page
         */
        postWorkflowQueryWorkflowRetryPage: (data: QueryWorkflowJobRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOWorkflowRetryManagerDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/query_workflow_retry_page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowQueryWorkflowRetryPageDeprecate
         * @request POST:/api/docpal/workflow/query_workflow_retry_page/
         */
        postWorkflowQueryWorkflowRetryPageDeprecate: (data: QueryWorkflowJobRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOWorkflowRetryManagerDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/query_workflow_retry_page/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProperties
         * @request POST:/api/docpal/workflow/properties
         */
        postWorkflowProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFormPropertyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/properties`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessModel
         * @summary Retrieve process model (BPMN) XML
         * @request POST:/api/docpal/workflow/process/model
         */
        postWorkflowProcessModel: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/model`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessModelDeprecate
         * @summary Retrieve process model (BPMN) XML
         * @request POST:/api/docpal/workflow/process/model/
         */
        postWorkflowProcessModelDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/model/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessList
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process/list
         */
        postWorkflowProcessList: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListProcessDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessInstanceDeprecate
         * @request POST:/api/docpal/workflow/process/instance/
         */
        postWorkflowProcessInstanceDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/instance/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessInstance
         * @request POST:/api/docpal/workflow/process/instance
         */
        postWorkflowProcessInstance: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/instance`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostWorkflowProcessDefinitionValidation
         * @summary Validate BPMN 2.0 XML file whether process definition grammatical
         * @request POST:/api/docpal/workflow/process/definition/validation
         */
        postWorkflowProcessDefinitionValidation: (
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/validation`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostWorkflowProcessDefinitionUpload
         * @summary Create new workflow (process definition)
         * @request POST:/api/docpal/workflow/process/definition/upload
         */
        postWorkflowProcessDefinitionUpload: (
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
                /**
                 * @format string
                 * @default "V1"
                 */
                versionId?: string;
                /** @format string */
                jsonValue?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/upload`,
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
         * @name PostWorkflowProcessDefinitionSave
         * @summary Save workflow of someone version
         * @request POST:/api/docpal/workflow/process/definition/save
         */
        postWorkflowProcessDefinitionSave: (
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
                /** @format string */
                versionId?: string;
                /** @format string */
                jsonValue?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/save`,
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
         * @name PostWorkflowProcessDefinitionInitialize
         * @request POST:/api/docpal/workflow/process/definition/initialize
         */
        postWorkflowProcessDefinitionInitialize: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDraft, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/initialize`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionDraftDraftidJson
         * @summary Get json of process definition
         * @request GET:/api/docpal/workflow/process/definition/draft/{draftId}/json
         */
        getWorkflowProcessDefinitionDraftDraftidJson: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}/json`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostWorkflowProcessDefinitionDraftDraftidJson
         * @summary Update json of process definition, please use string json
         * @request POST:/api/docpal/workflow/process/definition/draft/{draftId}/json
         */
        postWorkflowProcessDefinitionDraftDraftidJson: (
            draftId: string,
            data: ProcessDefinitionDraft,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}/json`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostWorkflowProcessDefinitionDraftPage
         * @summary Pagination search of process definition model
         * @request POST:/api/docpal/workflow/process/definition/draft/page
         */
        postWorkflowProcessDefinitionDraftPage: (data: ProcessDefinitionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOProcessDefinitionDraft, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostWorkflowProcessDefinitionCopyFromFlowable
         * @summary Data Patch API
         * @request POST:/api/docpal/workflow/process/definition/copy/from/flowable
         */
        postWorkflowProcessDefinitionCopyFromFlowable: (data: string[], params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/copy/from/flowable`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PostWorkflowProcessDefinitionActiveDraftid
         * @request POST:/api/docpal/workflow/process/definition/active/{draftId}
         */
        postWorkflowProcessDefinitionActiveDraftid: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/active/${draftId}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessConditionValidate
         * @request POST:/api/docpal/workflow/process/condition/validate
         */
        postWorkflowProcessConditionValidate: (data: ConditionValidationReq, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/condition/validate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowDeletemetadatamapping
         * @request POST:/api/docpal/workflow/deleteMetadataMapping
         */
        postWorkflowDeletemetadatamapping: (data: DocumentTypeMetadataMapping, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/deleteMetadataMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowChecknameortitle
         * @request POST:/api/docpal/workflow/checkNameOrTitle
         */
        postWorkflowChecknameortitle: (data: Record<string, string>, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/checkNameOrTitle`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name PostWhatsappOverview
         * @request POST:/api/docpal/whatsapp/overview
         */
        postWhatsappOverview: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultWhatsAppOverviewResponse, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/whatsapp/overview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name PostWhatsappFindWhatsappLog
         * @request POST:/api/docpal/whatsapp/find_whatsapp_log
         */
        postWhatsappFindWhatsappLog: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOWhatsAppLogDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/whatsapp/find_whatsapp_log`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PostWatermarkTemplates
         * @summary Create watermark template and watermark setting list
         * @request POST:/api/docpal/watermark/templates
         */
        postWatermarkTemplates: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PatchWatermarkTemplates
         * @summary Modify watermark template and watermark setting list
         * @request PATCH:/api/docpal/watermark/templates
         */
        patchWatermarkTemplates: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PostWatermarkTemplatesPage
         * @summary Watermark template page query
         * @request POST:/api/docpal/watermark/templates/page
         */
        postWatermarkTemplatesPage: (
            query: {
                /** @format int32 */
                pageNum: number;
                /** @format int32 */
                pageSize: number;
            },
            data: WMKTemplateRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPageWatermarkSettingsTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/page`,
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
         * @name PostWatermarkTemplatesAppend
         * @request POST:/api/docpal/watermark/templates/append
         */
        postWatermarkTemplatesAppend: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/append`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PostWatermarkSettings
         * @summary create single watermark settings
         * @request POST:/api/docpal/watermark/settings
         */
        postWatermarkSettings: (data: WatermarkSettingsDTO, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PatchWatermarkSettings
         * @summary update single watermark settings
         * @request PATCH:/api/docpal/watermark/settings
         */
        patchWatermarkSettings: (data: WatermarkSettingsDTO, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags nuxeo-file-request-upload-controller
         * @name PostUploadRequestInit
         * @request POST:/api/docpal/upload/request/init
         */
        postUploadRequestInit: (params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/upload/request/init`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailPage
         * @summary Pagination search (Email Template)
         * @request POST:/api/docpal/template/email/page
         */
        postTemplateEmailPage: (data: EmailTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOEmailTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailTemplatePage
         * @summary Pagination search (Email Template)
         * @request POST:/api/docpal/template/email/template/page
         */
        postTemplateEmailTemplatePage: (data: EmailTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOEmailTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/template/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailSend
         * @summary Send test email using email template
         * @request POST:/api/docpal/template/email/send
         */
        postTemplateEmailSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailSendCustomize
         * @summary Send Customize Email
         * @request POST:/api/docpal/template/email/send/customize
         */
        postTemplateEmailSendCustomize: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/send/customize`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name PostTemplateEmailLayoutPage
         * @summary Pagination search (Email Layout)
         * @request POST:/api/docpal/template/email/layout/page
         */
        postTemplateEmailLayoutPage: (data: EmailLayoutRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layout/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PostTemplateDocumentPage
         * @summary Pagination search (Document Template)
         * @request POST:/api/docpal/template/document/page
         */
        postTemplateDocumentPage: (data: DocumentTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTODocumentTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name PostTemplateDocumentGenerateFile
         * @summary Download Test File (Use Document Template)
         * @request POST:/api/docpal/template/document/generate/file
         */
        postTemplateDocumentGenerateFile: (data: DocumentTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/generate/file`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostSystemfeatureCreateuser
         * @request POST:/api/docpal/systemfeature/createUser
         */
        postSystemfeatureCreateuser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/systemfeature/createUser`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationUpdatelanguage
         * @request POST:/api/docpal/relation/updateLanguage
         */
        postRelationUpdatelanguage: (data: LanguageEntity, params: RequestParams = {}) =>
            this.request<ResultLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/updateLanguage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationSave
         * @request POST:/api/docpal/relation/save
         */
        postRelationSave: (data: FormPropertiesRelation, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationErrorenumSave
         * @request POST:/api/docpal/relation/errorEnum/save
         */
        postRelationErrorenumSave: (data: ErrorEnumEntityDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/errorEnum/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationErrorenumQuerybyentity
         * @request POST:/api/docpal/relation/errorEnum/queryByEntity
         */
        postRelationErrorenumQuerybyentity: (data: ErrorEnumEntityDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/errorEnum/queryByEntity`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationTasksQuerybyentityDeprecate
         * @request POST:/api/docpal/relation/tasks/queryByEntity/
         */
        postRelationTasksQuerybyentityDeprecate: (data: ErrorEnumEntityDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/tasks/queryByEntity/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationDeletelanguage
         * @request POST:/api/docpal/relation/deleteLanguage
         */
        postRelationDeletelanguage: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/deleteLanguage`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationAddlanguage
         * @request POST:/api/docpal/relation/addLanguage
         */
        postRelationAddlanguage: (data: LanguageEntity, params: RequestParams = {}) =>
            this.request<ResultLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/addLanguage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PostPolicyRetentionsPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/retentions/page
         */
        postPolicyRetentionsPage: (data: RetentionPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTORetentionPolicy, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PostPolicyRetentionsInit
         * @request POST:/api/docpal/policy/retentions/init
         */
        postPolicyRetentionsInit: (params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/init`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PostPolicyHoldsPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/holds/page
         */
        postPolicyHoldsPage: (data: HoldPolicyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOHoldPolicy, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PostPolicyHoldsInit
         * @request POST:/api/docpal/policy/holds/init
         */
        postPolicyHoldsInit: (params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds/init`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name PostPersonalDashboard
         * @request POST:/api/docpal/personal/dashboard
         */
        postPersonalDashboard: (data: PersonalDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOPersonalDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/personal/dashboard`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name PostPersonalDashboardSave
         * @request POST:/api/docpal/personal/dashboard/save
         */
        postPersonalDashboardSave: (data: PersonalDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/personal/dashboard/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetOauth2Setting
         * @summary Query mail OAuth2.0 Setting of current login user
         * @request GET:/api/docpal/oauth2/setting
         */
        getOauth2Setting: (params: RequestParams = {}) =>
            this.request<ResultOAuth2SettingRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name PostOauth2Setting
         * @summary Obtain authorization url of OAuth2.0
         * @request POST:/api/docpal/oauth2/setting
         */
        postOauth2Setting: (data: OAuth2SettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name PostOauth2Refresh
         * @summary Refresh the credential of OAuth2.0
         * @request POST:/api/docpal/oauth2/refresh
         */
        postOauth2Refresh: (data: OAuth2SettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/refresh`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetOauth2Code
         * @request GET:/api/docpal/oauth2/code
         * @deprecated
         */
        getOauth2Code: (
            query: {
                code: string;
                scope: string;
                state: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/code`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name PostOauth2Code
         * @summary Get the credential of OAuth2.0 by code and state
         * @request POST:/api/docpal/oauth2/code
         */
        postOauth2Code: (data: OAuth2SettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/code`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name PostMessageTemplateList
         * @request POST:/api/docpal/message/template/list
         */
        postMessageTemplateList: (data: MessageTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOMessageTemplateVO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name PostMessageTemplateEdit
         * @request POST:/api/docpal/message/template/edit
         */
        postMessageTemplateEdit: (data: TemplateMsgManageDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/edit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name PostMessageTemplateCreate
         * @request POST:/api/docpal/message/template/create
         */
        postMessageTemplateCreate: (data: TemplateMsgManageDTO, params: RequestParams = {}) =>
            this.request<ResultCreateMessageResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesIdRecordExport
         * @summary Export data of a master table
         * @request POST:/api/docpal/master/tables/{id}/record/export
         */
        postMasterTablesIdRecordExport: (
            id: string,
            query?: {
                operation?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record/export`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesIdField
         * @summary Add single field to master table
         * @request POST:/api/docpal/master/tables/{id}/field
         */
        postMasterTablesIdField: (id: string, data: MTFieldInfo, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/field`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesRecords
         * @summary query records with related fields of master table
         * @request GET:/api/docpal/master/tables/records
         */
        getMasterTablesRecords: (
            query: {
                relationTable: string;
                relationField: string;
                displayField: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/records`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesRecords
         * @summary Query all records of master table
         * @request POST:/api/docpal/master/tables/records
         */
        postMasterTablesRecords: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/records`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesRecord
         * @summary query record with related fields of master table
         * @request GET:/api/docpal/master/tables/record
         */
        getMasterTablesRecord: (
            query: {
                id: string;
                recordId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/record`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesRecord
         * @summary Insert data into a master table
         * @request POST:/api/docpal/master/tables/record
         */
        postMasterTablesRecord: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/record`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesRecordPage
         * @summary Pagination Search (Master Table Record)
         * @request POST:/api/docpal/master/tables/record/page
         */
        postMasterTablesRecordPage: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesRecordPageNonpermission
         * @request POST:/api/docpal/master/tables/record/page/nonPermission
         */
        postMasterTablesRecordPageNonpermission: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/record/page/nonPermission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesRecordImport
         * @summary Upload json for import data into a master table
         * @request POST:/api/docpal/master/tables/record/import
         */
        postMasterTablesRecordImport: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/record/import`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesRecordImportFile
         * @summary Upload .csv file for import data into a master table
         * @request POST:/api/docpal/master/tables/record/import/file
         */
        postMasterTablesRecordImportFile: (
            query: {
                /** @format binary */
                file: File;
                id: string;
            },
            data: {
                /** @format binary */
                file?: File;
                /** @format string */
                id?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/record/import/file`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesPage
         * @summary Pagination search (Master Table)
         * @request POST:/api/docpal/master/tables/page
         */
        postMasterTablesPage: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesLogs
         * @summary Pagination Search (Audit Logs of master table)
         * @request POST:/api/docpal/master/tables/logs
         */
        postMasterTablesLogs: (data: MTAuditLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOAuditTemplateDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/logs`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesLogsPageConditions
         * @request POST:/api/docpal/master/tables/logs/page/conditions
         */
        postMasterTablesLogsPageConditions: (data: MTAuditLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/logs/page/conditions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesInit
         * @request POST:/api/docpal/master/tables/init
         */
        postMasterTablesInit: (params: RequestParams = {}) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/init`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesFields
         * @summary Add multiple fields to master table
         * @request POST:/api/docpal/master/tables/fields
         */
        postMasterTablesFields: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/fields`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesColumnAdd
         * @summary For master table adding column
         * @request POST:/api/docpal/master/tables/column/add
         */
        postMasterTablesColumnAdd: (data: MTAddColumnRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/column/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesBatchDelete
         * @summary delete master table record
         * @request POST:/api/docpal/master/tables/batch/delete
         */
        postMasterTablesBatchDelete: (data: DeleteMTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/batch/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesAclsRemove
         * @summary Remove permission of current master table
         * @request POST:/api/docpal/master/tables/acls/remove
         */
        postMasterTablesAclsRemove: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/acls/remove`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesAclsUpdate
         * @summary Remove permission of current master table
         * @request POST:/api/docpal/master/tables/acls/update
         */
        postMasterTablesAclsUpdate: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/acls/update`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesAclsDelete
         * @summary Delete permission of current master table
         * @request POST:/api/docpal/master/tables/acls/delete
         */
        postMasterTablesAclsDelete: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/acls/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PostMasterTablesAclsAdd
         * @summary Add permission of current master table
         * @request POST:/api/docpal/master/tables/acls/add
         */
        postMasterTablesAclsAdd: (data: MTPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/acls/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementLoggersDeprecate
         * @summary Retrieve the available loggers of the services
         * @request GET:/api/docpal/management/loggers/
         */
        getManagementLoggersDeprecate: (
            query?: {
                service?: string;
                logger?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name PostManagementLoggersDeprecate
         * @summary Change the log level of services' loggers
         * @request POST:/api/docpal/management/loggers/
         */
        postManagementLoggersDeprecate: (
            query?: {
                service?: string;
                logger?: string;
                level?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementLoggers
         * @summary Retrieve the available loggers of the services
         * @request GET:/api/docpal/management/loggers
         */
        getManagementLoggers: (
            query?: {
                service?: string;
                logger?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name PostManagementLoggers
         * @summary Change the log level of services' loggers
         * @request POST:/api/docpal/management/loggers
         */
        postManagementLoggers: (
            query?: {
                service?: string;
                logger?: string;
                level?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags LicenseController
         * @name PostLicenseInstall
         * @request POST:/api/docpal/license/install
         */
        postLicenseInstall: (
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<BaseResultLicenseContent, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/license/install`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalsharePageDeprecate
         * @request POST:/api/docpal/internalShare/page/
         */
        postInternalsharePageDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/internalShare/page/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalsharePage
         * @request POST:/api/docpal/internalShare/page
         */
        postInternalsharePage: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/internalShare/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareCheckdocumentisinshareDeprecate
         * @request POST:/api/docpal/internalShare/checkDocumentIsInShare/
         */
        postInternalshareCheckdocumentisinshareDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/internalShare/checkDocumentIsInShare/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareCheckdocumentisinshare
         * @request POST:/api/docpal/internalShare/checkDocumentIsInShare
         */
        postInternalshareCheckdocumentisinshare: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/internalShare/checkDocumentIsInShare`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags api-key-controller
         * @name PostGenerateXApiKey
         * @request POST:/api/docpal/generate_x_api_key
         */
        postGenerateXApiKey: (data: GenerateXApiKeyRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/generate_x_api_key`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesign
         * @summary Create a form design
         * @request POST:/api/docpal/form/design
         */
        postFormDesign: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignSubmitData
         * @summary Submit form data
         * @request POST:/api/docpal/form/design/submit/data
         */
        postFormDesignSubmitData: (
            query: {
                /** Form Designer (Request) */
                formDataDTO: FormDesignDataDTO;
            },
            data: {
                /** @format string */
                id?: string;
                /** @format map */
                data?: map;
                /** @format string */
                bizNo?: string;
                /** @format string */
                bizType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/submit/data`,
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
         * @name PostFormDesignSavePreview
         * @summary Save preview style
         * @request POST:/api/docpal/form/design/save/preview
         */
        postFormDesignSavePreview: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/save/preview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignSavePermission
         * @summary Save Permission
         * @request POST:/api/docpal/form/design/save/permission
         */
        postFormDesignSavePermission: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/save/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignSaveInformation
         * @summary Save information
         * @request POST:/api/docpal/form/design/save/information
         */
        postFormDesignSaveInformation: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/save/information`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignSaveFormresult
         * @summary Save Form Result
         * @request POST:/api/docpal/form/design/save/formResult
         */
        postFormDesignSaveFormresult: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/save/formResult`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignSaveFormresultAppend
         * @request POST:/api/docpal/form/design/save/formResult/append
         */
        postFormDesignSaveFormresultAppend: (data: EasyFormResultRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEasyFormResult, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/save/formResult/append`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignRecords
         * @request POST:/api/docpal/form/design/records
         */
        postFormDesignRecords: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListLinkedHashMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/records`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignRecordPage
         * @summary Paging search form data
         * @request POST:/api/docpal/form/design/record/page
         */
        postFormDesignRecordPage: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignPublish
         * @summary Publish Form Design
         * @request POST:/api/docpal/form/design/publish
         */
        postFormDesignPublish: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/publish`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignPage
         * @summary Paging Query (form design)
         * @request POST:/api/docpal/form/design/page
         */
        postFormDesignPage: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostFormDesignDatapatch
         * @request POST:/api/docpal/form/design/dataPatch
         */
        postFormDesignDatapatch: (params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/dataPatch`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostEmailTemplateSend
         * @request POST:/api/docpal/email/template/send
         */
        postEmailTemplateSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/email/template/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostEmailSend
         * @summary Send test email using email template
         * @request POST:/api/docpal/email/send
         */
        postEmailSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/email/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostEmailSendFrom
         * @request POST:/api/docpal/email/send/from
         */
        postEmailSendFrom: (
            query: {
                mailSendRequest: MailSendRequest;
                multipartFiles: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/email/send/from`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalEmailController
         * @name PostEmailCustomizeSend
         * @request POST:/api/docpal/email/customize/send
         */
        postEmailCustomizeSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/email/customize/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PostDictCategoryCategorycodeEntry
         * @summary Create new Vocabulary entry
         * @request POST:/api/docpal/dict/category/{categoryCode}/entry
         */
        postDictCategoryCategorycodeEntry: (
            categoryCode: string,
            data: VocabularyEntryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/category/${categoryCode}/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PatchDictCategoryCategorycodeEntry
         * @summary Update Vocabulary entry
         * @request PATCH:/api/docpal/dict/category/{categoryCode}/entry
         */
        patchDictCategoryCategorycodeEntry: (
            categoryCode: string,
            data: VocabularyEntryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/category/${categoryCode}/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PostDictCategorycodeEntry
         * @summary Create new Vocabulary entry
         * @request POST:/api/docpal/dict/{categoryCode}/entry
         */
        postDictCategorycodeEntry: (
            categoryCode: string,
            data: VocabularyEntryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/${categoryCode}/entry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PatchDictCategorycodeEntry
         * @summary Update Vocabulary entry
         * @request PATCH:/api/docpal/dict/{categoryCode}/entry
         */
        patchDictCategorycodeEntry: (
            categoryCode: string,
            data: VocabularyEntryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/${categoryCode}/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name PostDictCategory
         * @request POST:/api/docpal/dict/category
         */
        postDictCategory: (data: DictRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDictResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/category`,
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
            this.request<ResultDictResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags data-statistics-controller
         * @name PostDataStatisticsExecuteDailyStatistics
         * @request POST:/api/docpal/data_statistics/execute_daily_statistics
         */
        postDataStatisticsExecuteDailyStatistics: (data: ExecuteSqlDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/data_statistics/execute_daily_statistics`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PostDamGetallsetting
         * @request POST:/api/docpal/dam/getAllSetting
         */
        postDamGetallsetting: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dam/getAllSetting`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PostDamEditsetting
         * @request POST:/api/docpal/dam/editSetting
         */
        postDamEditsetting: (data: DAMConversionSettingRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dam/editSetting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name PostDamDeletesettings
         * @request POST:/api/docpal/dam/deleteSettings
         */
        postDamDeletesettings: (data: number[], params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dam/deleteSettings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags complementary-controller
         * @name PostComplementaryOcrRetry
         * @request POST:/api/docpal/complementary/ocr/retry
         */
        postComplementaryOcrRetry: (data: RetryOcrRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/complementary/ocr/retry`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags complementary-controller
         * @name PostComplementaryOcrRetryDeprecate
         * @request POST:/api/docpal/complementary/ocr/retry/
         */
        postComplementaryOcrRetryDeprecate: (data: RetryOcrRequestDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/complementary/ocr/retry/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesIdPublish
         * @summary Publish CMMN file to workflow application
         * @request POST:/api/docpal/case/types/{id}/publish
         */
        postCaseTypesIdPublish: (
            id: string,
            data: {
                /** @format binary */
                file?: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseTypeResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/publish`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesIdDraftSave
         * @summary Save draft cmmn xml
         * @request POST:/api/docpal/case/types/{id}/draft/save
         */
        postCaseTypesIdDraftSave: (
            id: string,
            query: {
                /** @format binary */
                file: File;
            },
            data: {
                /**
                 * this is a .xml file
                 * @format binary
                 */
                file?: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseModelDraft, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/draft/save`,
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
         * @name PostCaseTypesIdDraftDownload
         * @summary Download draft cmmn xml (case model definition)
         * @request POST:/api/docpal/case/types/{id}/draft/download
         */
        postCaseTypesIdDraftDownload: (id: string, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/draft/download`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesIdCopy
         * @summary New Case for new case type
         * @request POST:/api/docpal/case/types/{id}/copy
         */
        postCaseTypesIdCopy: (id: string, data: CaseType, params: RequestParams = {}) =>
            this.request<ResultCaseTypeResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/copy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeidPermissions
         * @request GET:/api/docpal/case/types/{caseTypeId}/permissions
         */
        getCaseTypesCasetypeidPermissions: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${caseTypeId}/permissions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesCasetypeidPermissions
         * @summary Save case type permissions
         * @request POST:/api/docpal/case/types/{caseTypeId}/permissions
         */
        postCaseTypesCasetypeidPermissions: (
            caseTypeId: string,
            data: CmmnPlanPermissionDTO[],
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${caseTypeId}/permissions`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesVersionVersionidNew
         * @summary Create a new version of case type
         * @request POST:/api/docpal/case/types/version/{versionId}/new
         */
        postCaseTypesVersionVersionidNew: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/version/${versionId}/new`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesVersionVersionidActive
         * @summary Deploy a version case type
         * @request POST:/api/docpal/case/types/version/{versionId}/active
         */
        postCaseTypesVersionVersionidActive: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/version/${versionId}/active`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesVersionPage
         * @summary Paging query case-model version
         * @request POST:/api/docpal/case/types/version/page
         */
        postCaseTypesVersionPage: (data: CmmnVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/version/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesStylejsonSave
         * @summary Save style json of cmmn xml
         * @request POST:/api/docpal/case/types/styleJson/save
         */
        postCaseTypesStylejsonSave: (data: CmmnVersionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/styleJson/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesRepair
         * @request POST:/api/docpal/case/types/repair
         */
        postCaseTypesRepair: (
            query?: {
                id?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/repair`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesPage
         * @summary Pagination search (Case Type)
         * @request POST:/api/docpal/case/types/page
         */
        postCaseTypesPage: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCaseType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesList
         * @summary Retrieve case list through the list of case id
         * @request POST:/api/docpal/case/types/list
         */
        postCaseTypesList: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListCaseTypeResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseTriggerEvent
         * @summary Trigger event for completed
         * @request POST:/api/docpal/case/trigger/event
         */
        postCaseTriggerEvent: (data: CmmnTriggerEventReqDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/trigger/event`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetCaseTables
         * @summary Retrieve all case tables
         * @request GET:/api/docpal/case/tables
         */
        getCaseTables: (params: RequestParams = {}) =>
            this.request<ResultListCaseTable, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostCaseTables
         * @summary Create (Case Table)
         * @request POST:/api/docpal/case/tables
         */
        postCaseTables: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCaseTable, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostCaseTablesIdField
         * @summary Add single field to Case Table
         * @request POST:/api/docpal/case/tables/{id}/field
         */
        postCaseTablesIdField: (id: string, data: MTFieldInfo, params: RequestParams = {}) =>
            this.request<ResultCaseTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/${id}/field`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name DeleteCaseTablesIdField
         * @summary Delete field when not data (Case Table)
         * @request DELETE:/api/docpal/case/tables/{id}/field
         */
        deleteCaseTablesIdField: (
            id: string,
            query: {
                columnName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/${id}/field`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostCaseTablesRecord
         * @summary Insert data into a Case Table
         * @request POST:/api/docpal/case/tables/record
         */
        postCaseTablesRecord: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/record`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PostCaseTablesRecordPage
         * @summary Pagination Search (Case Table Record)
         * @request POST:/api/docpal/case/tables/record/page
         */
        postCaseTablesRecordPage: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstanceTasks
         * @summary Retrieve all tasks of this case instance
         * @request POST:/api/docpal/case/instance/tasks
         */
        postCaseInstanceTasks: (data: CaseInstanceTaskDTO, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/tasks`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstanceTasksComplete
         * @summary Complete task
         * @request POST:/api/docpal/case/instance/tasks/complete
         */
        postCaseInstanceTasksComplete: (data: CaseInstanceTaskDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/tasks/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstanceStart
         * @summary Start a case model definition to get a case instance
         * @request POST:/api/docpal/case/instance/start
         */
        postCaseInstanceStart: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/start`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstancePlanitems
         * @summary Retrieve all or activated planItem instances of this case instance
         * @request POST:/api/docpal/case/instance/planItems
         */
        postCaseInstancePlanitems: (data: PlanItemInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/planItems`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstancePlanitemsPlanitemidEnable
         * @summary Enable plan item instance
         * @request POST:/api/docpal/case/instance/planItems/{planItemId}/enable
         */
        postCaseInstancePlanitemsPlanitemidEnable: (planItemId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/planItems/${planItemId}/enable`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstancePlanitemsComplete
         * @summary Complete PlanItem instance
         * @request POST:/api/docpal/case/instance/planItems/complete
         */
        postCaseInstancePlanitemsComplete: (data: PlanItemInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/planItems/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboardSaveStyle
         * @summary Save dashboard Json
         * @request POST:/api/docpal/case/dashboard/save/style
         */
        postCaseDashboardSaveStyle: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/save/style`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboardPage
         * @summary Pagination search (Case Dashboard)
         * @request POST:/api/docpal/case/dashboard/page
         */
        postCaseDashboardPage: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboardInstanceCaseidProcessInstanceTasks
         * @summary Query sub-process tasks of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/tasks
         */
        postCaseDashboardInstanceCaseidProcessInstanceTasks: (
            caseId: string,
            data: CmmnProcessRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginationDTOTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/process/instance/tasks`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboardInstanceCaseidProcessInstancePage
         * @summary Pagination Search process instance of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page
         */
        postCaseDashboardInstanceCaseidProcessInstancePage: (
            caseId: string,
            data: CmmnDashboardRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginationDTOCmmnProcessInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/process/instance/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetCalendarsWidgetSetting
         * @summary Obtain calendar widget settings
         * @request GET:/api/docpal/calendars/widget/setting
         */
        getCalendarsWidgetSetting: (params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/widget/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostCalendarsWidgetSetting
         * @summary Save calendar settings
         * @request POST:/api/docpal/calendars/widget/setting
         */
        postCalendarsWidgetSetting: (data: Record<string, object>, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/widget/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetCalendarsSetting
         * @summary Obtain calendar settings
         * @request GET:/api/docpal/calendars/setting
         */
        getCalendarsSetting: (params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostCalendarsSetting
         * @summary Save calendar settings
         * @request POST:/api/docpal/calendars/setting
         */
        postCalendarsSetting: (data: Record<string, object>, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostCalendarsList
         * @summary Query list
         * @request POST:/api/docpal/calendars/list
         */
        postCalendarsList: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultListCalendarTaskRespDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetTemplate
         * @summary create folder cabinet template
         * @request POST:/api/docpal/cabinet/template
         */
        postCabinetTemplate: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PatchCabinetTemplate
         * @summary Modify folder/file into exist folder cabinet template
         * @request PATCH:/api/docpal/cabinet/template
         */
        patchCabinetTemplate: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplatePermission
         * @request GET:/api/docpal/cabinet/template/permission
         */
        getCabinetTemplatePermission: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentACLEntryDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetTemplatePermission
         * @summary Add permission for folder cabinet template
         * @request POST:/api/docpal/cabinet/template/permission
         */
        postCabinetTemplatePermission: (data: DocumentACLEntryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name DeleteCabinetTemplatePermission
         * @summary Delete permission from folder cabinet template
         * @request DELETE:/api/docpal/cabinet/template/permission
         */
        deleteCabinetTemplatePermission: (
            query: {
                id: string;
                userId: string;
                permission?: string;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template/permission`,
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
         * @name PostCabinetTemplatePage
         * @summary Pagination search folder cabinet
         * @request POST:/api/docpal/cabinet/template/page
         */
        postCabinetTemplatePage: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOFolderCabinetResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostAzureOcrQueryocrtransactionlogsDeprecate
         * @request POST:/api/docpal/azure/ocr/queryOcrTransactionLogs/
         */
        postAzureOcrQueryocrtransactionlogsDeprecate: (data: OcrTransactionLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOOcrTransactionLogDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/queryOcrTransactionLogs/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostAzureOcrQueryocrtransactionlogs
         * @request POST:/api/docpal/azure/ocr/queryOcrTransactionLogs
         */
        postAzureOcrQueryocrtransactionlogs: (data: OcrTransactionLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOOcrTransactionLogDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/queryOcrTransactionLogs`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostAzureOcrCreateocrprofilemapping
         * @request POST:/api/docpal/azure/ocr/createOcrProfileMapping
         */
        postAzureOcrCreateocrprofilemapping: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/createOcrProfileMapping`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name PostAzureOcrCreateocrprofilemappingDeprecate
         * @request POST:/api/docpal/azure/ocr/createOcrProfileMapping/
         */
        postAzureOcrCreateocrprofilemappingDeprecate: (data: ProfileMappingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/createOcrProfileMapping/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocBlockPermissionController
         * @name PostBlockPermission
         * @summary Create DocBlockPermission
         * @request POST:/api/block/permission
         */
        postBlockPermission: (data: BlockInheritedPermission, params: RequestParams = {}) =>
            this.request<ResultBlockInheritedPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/block/permission`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocBlockPermissionController
         * @name PostBlockPermissionFilter
         * @summary filter block document permission
         * @request POST:/api/block/permission/filter
         */
        postBlockPermissionFilter: (data: DocDTO, params: RequestParams = {}) =>
            this.request<ResultListDocDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/block/permission/filter`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name PatchPermissionsUpdateEntry
         * @summary batch modify list of entries of permissions
         * @request PATCH:/api/permissions/update/entry
         */
        patchPermissionsUpdateEntry: (data: AclPermissionDTO, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/update/entry`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchNuxeoVocabulary
         * @summary Update Vocabularies
         * @request PATCH:/api/nuxeo/vocabulary
         */
        patchNuxeoVocabulary: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name PatchNuxeoVocabularyDeprecate
         * @summary Update Vocabularies
         * @request PATCH:/api/nuxeo/vocabulary/
         */
        patchNuxeoVocabularyDeprecate: (data: VocabularyRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name DeleteNuxeoShare
         * @request DELETE:/api/nuxeo/share
         */
        deleteNuxeoShare: (data: string[], params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/share`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PatchNuxeoShare
         * @request PATCH:/api/nuxeo/share
         */
        patchNuxeoShare: (data: ShareSaveRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEasyShareDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/share`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetNuxeoSfolderDeprecate
         * @request GET:/api/nuxeo/sfolder/
         */
        getNuxeoSfolderDeprecate: (
            query?: {
                name?: string;
                userGroupIds?: string[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name PatchNuxeoSfolderDeprecate
         * @summary Save Smart Folder
         * @request PATCH:/api/nuxeo/sfolder/
         */
        patchNuxeoSfolderDeprecate: (data: SmartFolderRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetNuxeoSfolder
         * @request GET:/api/nuxeo/sfolder
         */
        getNuxeoSfolder: (
            query?: {
                name?: string;
                userGroupIds?: string[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name PatchNuxeoSfolder
         * @summary Save Smart Folder
         * @request PATCH:/api/nuxeo/sfolder
         */
        patchNuxeoSfolder: (data: SmartFolderRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags ViewSettingController
         * @name GetNuxeoSettingView
         * @request GET:/api/nuxeo/setting/view
         */
        getNuxeoSettingView: (params: RequestParams = {}) =>
            this.request<ResultViewSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setting/view`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags ViewSettingController
         * @name PatchNuxeoSettingView
         * @request PATCH:/api/nuxeo/setting/view
         */
        patchNuxeoSettingView: (data: ViewSettingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultViewSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setting/view`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchNuxeoIdentityUserPassword
         * @summary Update user password
         * @request PATCH:/api/nuxeo/identity/user/password
         */
        patchNuxeoIdentityUserPassword: (
            query: {
                userId: string;
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/user/password`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocument
         * @request GET:/api/nuxeo/document
         */
        getNuxeoDocument: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocument
         * @request PATCH:/api/nuxeo/document
         */
        patchNuxeoDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDeprecate
         * @request GET:/api/nuxeo/document/
         */
        getNuxeoDocumentDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentDeprecate
         * @request PATCH:/api/nuxeo/document/
         */
        patchNuxeoDocumentDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsActive
         * @summary Query the list of activated docpal types
         * @request GET:/api/docpalType/settings/active
         */
        getDocpaltypeSettingsActive: (params: RequestParams = {}) =>
            this.request<ResultListDocPalType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/active`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name PatchDocpaltypeSettingsActive
         * @summary Active or UnActive DocPal Type
         * @request PATCH:/api/docpalType/settings/active
         */
        patchDocpaltypeSettingsActive: (data: DocPalTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/active`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteWorkflowProcessDefinitionDraftDraftidCabinetSetting
         * @summary Delete folder cabinet setting into the process definition
         * @request DELETE:/api/docpal/workflow/process/definition/draft/{draftId}/cabinet/setting
         */
        deleteWorkflowProcessDefinitionDraftDraftidCabinetSetting: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}/cabinet/setting`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name PatchWorkflowProcessDefinitionDraftDraftidCabinetSetting
         * @summary Update folder cabinet setting into the process definition
         * @request PATCH:/api/docpal/workflow/process/definition/draft/{draftId}/cabinet/setting
         */
        patchWorkflowProcessDefinitionDraftDraftidCabinetSetting: (
            draftId: string,
            data: ProcessDefinitionDraftRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}/cabinet/setting`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PatchWatermarkTemplatesDeprecate
         * @summary Modify watermark template and watermark setting list
         * @request PATCH:/api/docpal/watermark/templates/
         */
        patchWatermarkTemplatesDeprecate: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PatchWatermarkSettingsDeprecate
         * @summary update single watermark settings
         * @request PATCH:/api/docpal/watermark/settings/
         */
        patchWatermarkSettingsDeprecate: (data: WatermarkSettingsDTO, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PatchPolicyRetentionsIdStatusStatus
         * @summary Modify status by id
         * @request PATCH:/api/docpal/policy/retentions/{id}/status/{status}
         */
        patchPolicyRetentionsIdStatusStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name PatchPolicyHoldsIdStatusStatus
         * @summary Modify status by id
         * @request PATCH:/api/docpal/policy/holds/{id}/status/{status}
         */
        patchPolicyHoldsIdStatusStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PatchMasterTablesIdRecordStatus
         * @summary Enable or Disable Record
         * @request PATCH:/api/docpal/master/tables/{id}/record/status
         */
        patchMasterTablesIdRecordStatus: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record/status`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PatchMasterTablesIdBatchRecordStatus
         * @request PATCH:/api/docpal/master/tables/{id}/batch/record/status
         */
        patchMasterTablesIdBatchRecordStatus: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/batch/record/status`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PatchFormDesignName
         * @summary Update name of form design
         * @request PATCH:/api/docpal/form/design/name
         */
        patchFormDesignName: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/name`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PatchFormDesignEnableId
         * @summary Enable a form design
         * @request PATCH:/api/docpal/form/design/enable/{id}
         */
        patchFormDesignEnableId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/enable/${id}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name PatchFormDesignDisableId
         * @summary Disable a form design
         * @request PATCH:/api/docpal/form/design/disable/{id}
         */
        patchFormDesignDisableId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/disable/${id}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PatchCaseTypesVersionVersionidSave
         * @summary Query cmmn version information of the last successfully deployed version
         * @request PATCH:/api/docpal/case/types/version/{versionId}/save
         */
        patchCaseTypesVersionVersionidSave: (
            versionId: string,
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/version/${versionId}/save`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PatchCaseTypesVersionVersionidSaveall
         * @summary Query cmmn version information of the last successfully deployed version
         * @request PATCH:/api/docpal/case/types/version/{versionId}/saveAll
         */
        patchCaseTypesVersionVersionidSaveall: (
            versionId: string,
            query: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/version/${versionId}/saveAll`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name PatchCaseTablesFields
         * @summary The Case Table has been augmented with the addition of multiple columns.
         * @request PATCH:/api/docpal/case/tables/fields
         */
        patchCaseTablesFields: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCaseTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/fields`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PatchCalendarsIdStatusStatus
         * @summary Modify status by id
         * @request PATCH:/api/docpal/calendars/{id}/status/{status}
         */
        patchCalendarsIdStatusStatus: (id: string, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetVerificationPermissionEventTypes
         * @request GET:/api/verification/permission/event/types
         */
        getVerificationPermissionEventTypes: (params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/event/types`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetVerificationPermissionBusinessBusinessid
         * @request GET:/api/verification/permission/business/{businessId}
         */
        getVerificationPermissionBusinessBusinessid: (businessId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/business/${businessId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetVerificationPermissionAclPermissionDeprecate
         * @request GET:/api/verification/permission/acl/permission/
         */
        getVerificationPermissionAclPermissionDeprecate: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/acl/permission/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags VerificationPermissionController
         * @name GetVerificationPermissionAclPermission
         * @request GET:/api/verification/permission/acl/permission
         */
        getVerificationPermissionAclPermission: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/verification/permission/acl/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name GetUserPermissionId
         * @summary Query detail
         * @request GET:/api/user/permission/{id}
         */
        getUserPermissionId: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclUserPermission, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name GetUserPermissionAllUserid
         * @summary Query all permission of acl user
         * @request GET:/api/user/permission/all/{userId}
         */
        getUserPermissionAllUserid: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListAclPermissionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission/all/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-admin-controller
         * @name GetSystemAdminSetupFileModifiedDate
         * @request GET:/api/system_admin/setup_file_modified_date
         */
        getSystemAdminSetupFileModifiedDate: (params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/system_admin/setup_file_modified_date`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name GetPermissionsId
         * @summary query access control permission by id
         * @request GET:/api/permissions/{id}
         */
        getPermissionsId: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name DeletePermissionsId
         * @summary delete access control permission by id
         * @request DELETE:/api/permissions/{id}
         */
        deletePermissionsId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name GetPermissionsNameName
         * @summary Query permission list by name
         * @request GET:/api/permissions/name/{name}
         */
        getPermissionsNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultAclPermissionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclPermissionController
         * @name DeletePermissionsNameName
         * @summary delete access control permission by name
         * @request DELETE:/api/permissions/name/{name}
         */
        deletePermissionsNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permissions/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserController
         * @name GetPermissionUsersId
         * @summary query user information
         * @request GET:/api/permission/users/{id}
         */
        getPermissionUsersId: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclUserInformation, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/users/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserController
         * @name DeletePermissionUsersId
         * @summary delete user by logic
         * @request DELETE:/api/permission/users/{id}
         */
        deletePermissionUsersId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/users/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserRelationshipController
         * @name GetPermissionUserRelationshipsGroupidGroupid
         * @summary query bind users
         * @request GET:/api/permission/user/relationships/groupId/{groupId}
         */
        getPermissionUserRelationshipsGroupidGroupid: (groupId: string, params: RequestParams = {}) =>
            this.request<ResultListAclUserRelationshipWithUserGroup, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/relationships/groupId/${groupId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name GetPermissionUserGroupId
         * @summary Query user group information
         * @request GET:/api/permission/user/group/{id}
         */
        getPermissionUserGroupId: (id: string, params: RequestParams = {}) =>
            this.request<ResultAclUserGroup, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name DeletePermissionUserGroupId
         * @summary Remove user group
         * @request DELETE:/api/permission/user/group/{id}
         */
        deletePermissionUserGroupId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserGroupController
         * @name GetPermissionUserGroupGroupidUsers
         * @summary Query user list of binding in user group
         * @request GET:/api/permission/user/group/{groupId}/users
         */
        getPermissionUserGroupGroupidUsers: (groupId: string, params: RequestParams = {}) =>
            this.request<ResultAclUserGroupDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/user/group/${groupId}/users`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name GetPermissionEntryId
         * @summary Query entry by id
         * @request GET:/api/permission/entry/{id}
         */
        getPermissionEntryId: (id: string, params: RequestParams = {}) =>
            this.request<ResultAccessControlEntry, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/entry/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclEntryController
         * @name DeletePermissionEntryId
         * @summary Delete entry by id
         * @request DELETE:/api/permission/entry/{id}
         */
        deletePermissionEntryId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/permission/entry/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetNuxeoVocabularyId
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}
         */
        getNuxeoVocabularyId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetNuxeoVocabularyIdDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}/
         */
        getNuxeoVocabularyIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetNuxeoVocabularyListvocabularyids
         * @summary Get All Vocabulary ids
         * @request GET:/api/nuxeo/vocabulary/listVocabularyIds
         */
        getNuxeoVocabularyListvocabularyids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/listVocabularyIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Vocabulary (Nuxeo)
         * @name GetNuxeoVocabularyListvocabularyidsDeprecate
         * @summary Get All Vocabulary ids
         * @request GET:/api/nuxeo/vocabulary/listVocabularyIds/
         */
        getNuxeoVocabularyListvocabularyidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/vocabulary/listVocabularyIds/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserKeycloakKeycloakuserid
         * @summary Get keycloak user through keycloak user id
         * @request GET:/api/nuxeo/user/keycloak/{keycloakUserId}
         */
        getNuxeoUserKeycloakKeycloakuserid: (keycloakUserId: string, params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/keycloak/${keycloakUserId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserGetapplication
         * @summary Get current user
         * @request GET:/api/nuxeo/user/getApplication
         */
        getNuxeoUserGetapplication: (params: RequestParams = {}) =>
            this.request<ResultUserDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/user/getApplication`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoTypeDocumenttype
         * @summary Obtain metadata list of this documentType
         * @request GET:/api/nuxeo/type/{documentType}
         */
        getNuxeoTypeDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/type/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoTypeDocumenttypeMetadata
         * @summary Obtain metadata list of this documentType
         * @request GET:/api/nuxeo/type/{documentType}/metadata
         */
        getNuxeoTypeDocumenttypeMetadata: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/type/${documentType}/metadata`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVocabularyId
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/studio/vocabulary/{id}
         */
        getNuxeoStudioVocabularyId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVocabularyIdDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/studio/vocabulary/{id}/
         */
        getNuxeoStudioVocabularyIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVersioningPolicyIdDeprecate
         * @summary Get Policy(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/policy/{id}/
         */
        getNuxeoStudioVersioningPolicyIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningPolicyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/policy/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVersioningPolicyId
         * @summary Get Policy(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/policy/{id}
         */
        getNuxeoStudioVersioningPolicyId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningPolicyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/policy/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVersioningListavailablefilteridsDeprecate
         * @summary Get All Filter Ids(Versioning Configuration)
         * @request GET:/api/nuxeo/studio/versioning/listAvailableFilterIds/
         */
        getNuxeoStudioVersioningListavailablefilteridsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/listAvailableFilterIds/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVersioningListavailablefilterids
         * @summary Get All Filter Ids(Versioning Configuration)
         * @request GET:/api/nuxeo/studio/versioning/listAvailableFilterIds
         */
        getNuxeoStudioVersioningListavailablefilterids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/listAvailableFilterIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVersioningFilterId
         * @summary Get Filter(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/filter/{id}
         */
        getNuxeoStudioVersioningFilterId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningFilterDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/filter/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioVersioningFilterIdDeprecate
         * @summary Get Filter(Versioning Configuration) Detail by id
         * @request GET:/api/nuxeo/studio/versioning/filter/{id}/
         */
        getNuxeoStudioVersioningFilterIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVersioningFilterDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/versioning/filter/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioSchemaIdDeprecate
         * @summary Get Schema detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/schema/{id}/
         */
        getNuxeoStudioSchemaIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/schema/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioSchemaId
         * @summary Get Schema detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/schema/{id}
         */
        getNuxeoStudioSchemaId: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/schema/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListvocabularytypesDeprecate
         * @summary List available vocabulary types
         * @request GET:/api/nuxeo/studio/listVocabularyTypes/
         */
        getNuxeoStudioListvocabularytypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listVocabularyTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListvocabularytypes
         * @summary List available vocabulary types
         * @request GET:/api/nuxeo/studio/listVocabularyTypes
         */
        getNuxeoStudioListvocabularytypes: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listVocabularyTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioSchemasIds
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/studio/schemas/ids
         */
        getNuxeoStudioSchemasIds: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/schemas/ids`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListschemaidsDeprecate
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/studio/listSchemaIDs/
         */
        getNuxeoStudioListschemaidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListschemaids
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/studio/listSchemaIDs
         */
        getNuxeoStudioListschemaids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListfieldtypes
         * @summary List available field types
         * @request GET:/api/nuxeo/studio/listFieldTypes
         */
        getNuxeoStudioListfieldtypes: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listFieldTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListfieldtypesDeprecate
         * @summary List available field types
         * @request GET:/api/nuxeo/studio/listFieldTypes/
         */
        getNuxeoStudioListfieldtypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listFieldTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListdoctypes
         * @summary List available Doc Types
         * @request GET:/api/nuxeo/studio/listDocTypes
         */
        getNuxeoStudioListdoctypes: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listDocTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListdoctypesDeprecate
         * @summary List available Doc Types
         * @request GET:/api/nuxeo/studio/listDocTypes/
         */
        getNuxeoStudioListdoctypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listDocTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListcustomschemaidsDeprecate
         * @summary List custom schema IDs
         * @request GET:/api/nuxeo/studio/listCustomSchemaIDs/
         */
        getNuxeoStudioListcustomschemaidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listCustomSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListcustomschemaids
         * @summary List custom schema IDs
         * @request GET:/api/nuxeo/studio/listCustomSchemaIDs
         */
        getNuxeoStudioListcustomschemaids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listCustomSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioCustomSchemasIds
         * @summary List custom schema IDs
         * @request GET:/api/nuxeo/studio/custom/schemas/ids
         */
        getNuxeoStudioCustomSchemasIds: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/custom/schemas/ids`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListcustomdoctypeids
         * @summary List Custom Doc Type IDs
         * @request GET:/api/nuxeo/studio/listCustomDocTypeIDs
         */
        getNuxeoStudioListcustomdoctypeids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listCustomDocTypeIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListcustomdoctypeidsDeprecate
         * @summary List Custom Doc Type IDs
         * @request GET:/api/nuxeo/studio/listCustomDocTypeIDs/
         */
        getNuxeoStudioListcustomdoctypeidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listCustomDocTypeIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListavailablefacetids
         * @summary Get All Facet Ids
         * @request GET:/api/nuxeo/studio/listAvailableFacetIds
         */
        getNuxeoStudioListavailablefacetids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listAvailableFacetIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListavailablefacetidsDeprecate
         * @summary Get All Facet Ids
         * @request GET:/api/nuxeo/studio/listAvailableFacetIds/
         */
        getNuxeoStudioListavailablefacetidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listAvailableFacetIds/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListallschemaids
         * @summary List all scheme IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllSchemaIDs
         */
        getNuxeoStudioListallschemaids: (params: RequestParams = {}) =>
            this.request<ResultListDocumentSchemaVO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listAllSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListallschemaidsDeprecate
         * @summary List all scheme IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllSchemaIDs/
         */
        getNuxeoStudioListallschemaidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentSchemaVO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listAllSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListalldoctypeidsDeprecate
         * @summary List Doc Type IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllDocTypeIDs/
         */
        getNuxeoStudioListalldoctypeidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeVO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listAllDocTypeIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioListalldoctypeids
         * @summary List Doc Type IDs, including custom and nuxeo.
         * @request GET:/api/nuxeo/studio/listAllDocTypeIDs
         */
        getNuxeoStudioListalldoctypeids: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeVO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/listAllDocTypeIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioDownloadLastNuxeoPackage
         * @request GET:/api/nuxeo/studio/download/last/nuxeo/package
         */
        getNuxeoStudioDownloadLastNuxeoPackage: (params: RequestParams = {}) =>
            this.request<File, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/download/last/nuxeo/package`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioDoctypeIdDeprecate
         * @summary Get Doc Type detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/docType/{id}/
         */
        getNuxeoStudioDoctypeIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/docType/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Nuxeo Studio Controller
         * @name GetNuxeoStudioDoctypeId
         * @summary Get Doc Type detail from nuxeo studio by id
         * @request GET:/api/nuxeo/studio/docType/{id}
         */
        getNuxeoStudioDoctypeId: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/studio/docType/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetNuxeoSfolderId
         * @request GET:/api/nuxeo/sfolder/{id}
         */
        getNuxeoSfolderId: (id: string, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name DeleteNuxeoSfolderId
         * @request DELETE:/api/nuxeo/sfolder/{id}
         */
        deleteNuxeoSfolderId: (id: string, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetNuxeoSfolderPageConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/nuxeo/sfolder/page/conditions
         */
        getNuxeoSfolderPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/sfolder/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupVocabularyIdDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/setup/vocabulary/{id}/
         */
        getNuxeoSetupVocabularyIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupVocabularyId
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/setup/vocabulary/{id}
         */
        getNuxeoSetupVocabularyId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupSchemaId
         * @summary Get Schema detail by id
         * @request GET:/api/nuxeo/setup/schema/{id}
         */
        getNuxeoSetupSchemaId: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/schema/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupSchemaIdDeprecate
         * @summary Get Schema detail by id
         * @request GET:/api/nuxeo/setup/schema/{id}/
         */
        getNuxeoSetupSchemaIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultSchemaDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/schema/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupListschemaidsDeprecate
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/setup/listSchemaIDs/
         */
        getNuxeoSetupListschemaidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/listSchemaIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupListschemaids
         * @summary List available schema IDs
         * @request GET:/api/nuxeo/setup/listSchemaIDs
         */
        getNuxeoSetupListschemaids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/listSchemaIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupListdoctypeids
         * @summary List available Doc Type IDs
         * @request GET:/api/nuxeo/setup/listDocTypeIDs
         */
        getNuxeoSetupListdoctypeids: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/listDocTypeIDs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupListdoctypeidsDeprecate
         * @summary List available Doc Type IDs
         * @request GET:/api/nuxeo/setup/listDocTypeIDs/
         */
        getNuxeoSetupListdoctypeidsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/listDocTypeIDs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupDoctypeIdDeprecate
         * @summary Get Doc Type detail by id
         * @request GET:/api/nuxeo/setup/docType/{id}/
         */
        getNuxeoSetupDoctypeIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/docType/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSetupDoctypeId
         * @summary Get Doc Type detail by id
         * @request GET:/api/nuxeo/setup/docType/{id}
         */
        getNuxeoSetupDoctypeId: (id: string, params: RequestParams = {}) =>
            this.request<ResultSetupDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/setup/docType/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchTextsearchtypesDeprecate
         * @summary Get all text search types
         * @request GET:/api/nuxeo/search/textSearchTypes/
         */
        getNuxeoSearchTextsearchtypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/search/textSearchTypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchTextsearchtypes
         * @summary Get all text search types
         * @request GET:/api/nuxeo/search/textSearchTypes
         */
        getNuxeoSearchTextsearchtypes: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/search/textSearchTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchGetsearchextends
         * @summary getMimiType
         * @request GET:/api/nuxeo/search/getSearchExtends
         */
        getNuxeoSearchGetsearchextends: (
            query: {
                primaryType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/search/getSearchExtends`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchGetsearchextendsDeprecate
         * @summary getMimiType
         * @request GET:/api/nuxeo/search/getSearchExtends/
         */
        getNuxeoSearchGetsearchextendsDeprecate: (
            query: {
                primaryType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/search/getSearchExtends/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoSchemaSchemaidMetadata
         * @summary Obtain metadata list of this schema
         * @request GET:/api/nuxeo/schema/{schemaId}/metadata
         */
        getNuxeoSchemaSchemaidMetadata: (schemaId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/schema/${schemaId}/metadata`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetNuxeoIdentityUsersSynchronous
         * @summary Synchronous active user (For internal use)
         * @request GET:/api/nuxeo/identity/users/synchronous
         */
        getNuxeoIdentityUsersSynchronous: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/users/synchronous`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetNuxeoIdentitySynchronizeDeprecate
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/synchronize/
         */
        getNuxeoIdentitySynchronizeDeprecate: (params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/synchronize/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetNuxeoIdentitySynchronize
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/synchronize
         */
        getNuxeoIdentitySynchronize: (params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/synchronize`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetNuxeoGetofficetokenId
         * @request GET:/api/nuxeo/getOfficeToken/{id}
         */
        getNuxeoGetofficetokenId: (id: string, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/getOfficeToken/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDocumentidAclsDeprecate
         * @request GET:/api/nuxeo/document/{documentId}/acls/
         */
        getNuxeoDocumentDocumentidAclsDeprecate: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultDocAccessControlListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/${documentId}/acls/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDocumentidAcls
         * @request GET:/api/nuxeo/document/{documentId}/acls
         */
        getNuxeoDocumentDocumentidAcls: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultDocAccessControlListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/${documentId}/acls`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentQueryaudittemplate
         * @request GET:/api/nuxeo/document/queryAuditTemplate
         */
        getNuxeoDocumentQueryaudittemplate: (params: RequestParams = {}) =>
            this.request<ResultListAuditTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/queryAuditTemplate`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentInitializa
         * @request GET:/api/nuxeo/document/initializa
         */
        getNuxeoDocumentInitializa: (
            query: {
                beanName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/initializa`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentInitvocabulary
         * @request GET:/api/nuxeo/document/initVocabulary
         */
        getNuxeoDocumentInitvocabulary: (params: RequestParams = {}) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/initVocabulary`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentInitsharedocument
         * @request GET:/api/nuxeo/document/initShareDocument
         */
        getNuxeoDocumentInitsharedocument: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/initShareDocument`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentInitdamclearup
         * @request GET:/api/nuxeo/document/initDAMClearUp
         */
        getNuxeoDocumentInitdamclearup: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/initDAMClearUp`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentGetdocumenttypesbyflag
         * @request GET:/api/nuxeo/document/getDocumentTypesByFlag
         */
        getNuxeoDocumentGetdocumenttypesbyflag: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/getDocumentTypesByFlag`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDestruction
         * @request GET:/api/nuxeo/document/destruction
         */
        getNuxeoDocumentDestruction: (
            query: {
                beanName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/destruction`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetNuxeoCollectionAll
         * @request GET:/api/nuxeo/collection/all
         */
        getNuxeoCollectionAll: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/collection/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminVirtualfolderSettingId
         * @request GET:/api/nuxeo/admin/virtualfolder/setting/{id}
         */
        getNuxeoAdminVirtualfolderSettingId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/virtualfolder/setting/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name DeleteNuxeoAdminVirtualfolderSettingId
         * @request DELETE:/api/nuxeo/admin/virtualfolder/setting/{id}
         */
        deleteNuxeoAdminVirtualfolderSettingId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/virtualfolder/setting/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminSettingLanguage
         * @request GET:/api/nuxeo/admin/setting/language
         */
        getNuxeoAdminSettingLanguage: (params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/setting/language`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetNuxeoAdminIcons
         * @request GET:/api/nuxeo/admin/icons
         */
        getNuxeoAdminIcons: (params: RequestParams = {}) =>
            this.request<ResultListCustomIconDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/admin/icons`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessageQueueDocumentidMessage
         * @summary Query record By documentId
         * @request GET:/api/message/queue/{documentId}/message
         */
        getMessageQueueDocumentidMessage: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultListBusinessResultRecord, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/${documentId}/message`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessageQueueTotal
         * @summary message total of every message queue
         * @request GET:/api/message/queue/total
         */
        getMessageQueueTotal: (
            query?: {
                messageQueueName?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQMessageTotalDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/total`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessageQueueReportStatusgroup
         * @summary Statistics by state
         * @request GET:/api/message/queue/report/statusGroup
         */
        getMessageQueueReportStatusgroup: (
            query?: {
                mqName?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQConsumeGroupStatusDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/report/statusGroup`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessageQueueReportHoursgroup
         * @summary Statistics by per hours
         * @request GET:/api/message/queue/report/hoursGroup
         */
        getMessageQueueReportHoursgroup: (
            query: {
                mqName: string;
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQDayTotalDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/report/hoursGroup`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessageQueueReportDaygroup
         * @summary Statistics by per day
         * @request GET:/api/message/queue/report/dayGroup
         */
        getMessageQueueReportDaygroup: (
            query?: {
                mqName?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListMQDayTotalDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/report/dayGroup`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name GetMessageQueueConsumes
         * @summary The configuration of message queue
         * @request GET:/api/message/queue/consumes
         */
        getMessageQueueConsumes: (params: RequestParams = {}) =>
            this.request<void, Result | (ResultObject | Result | ResultString)>({
                path: `/message/queue/consumes`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsPageConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpalType/settings/page/conditions
         */
        getDocpaltypeSettingsPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsNameName
         * @summary Obtain docpal type detail through name
         * @request GET:/api/docpalType/settings/name/{name}
         */
        getDocpaltypeSettingsNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteDocpaltypeSettingsNameName
         * @summary Delete docpal type
         * @request DELETE:/api/docpalType/settings/name/{name}
         */
        deleteDocpaltypeSettingsNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsMetadataDocumenttype
         * @summary Obtain all docpal type metadata list
         * @request GET:/api/docpalType/settings/metadata/{documentType}
         */
        getDocpaltypeSettingsMetadataDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/metadata/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsExportMetadataDocumenttype
         * @summary Download .csv template file of master table for use import data
         * @request GET:/api/docpalType/settings/export/metadata/{documentType}
         */
        getDocpaltypeSettingsExportMetadataDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/export/metadata/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsCategories
         * @summary Obtain all docpal type categories
         * @request GET:/api/docpalType/settings/categories
         */
        getDocpaltypeSettingsCategories: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/categories`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetDocpaltypeSettingsAll
         * @summary Find all docpal type
         * @request GET:/api/docpalType/settings/all
         */
        getDocpaltypeSettingsAll: (params: RequestParams = {}) =>
            this.request<ResultListDocPalType, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetWorkflowVersion
         * @summary Get Version Data
         * @request GET:/api/docpal/workflow/version
         */
        getWorkflowVersion: (
            query: {
                draftId: string;
                versionNumber: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultProcessDefinitionVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetWorkflowVersionVersionid
         * @summary Get Version Data
         * @request GET:/api/docpal/workflow/version/{versionId}
         */
        getWorkflowVersionVersionid: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/${versionId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name DeleteWorkflowVersionVersionid
         * @request DELETE:/api/docpal/workflow/version/{versionId}
         */
        deleteWorkflowVersionVersionid: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/${versionId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetWorkflowVersionVersionidBpmnxml
         * @summary Download BPMN20.xml through version id of a workflow
         * @request GET:/api/docpal/workflow/version/{versionId}/bpmnXml
         */
        getWorkflowVersionVersionidBpmnxml: (versionId: string, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/${versionId}/bpmnXml`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetWorkflowVersionJson
         * @summary Download Json through version number and draft id
         * @request GET:/api/docpal/workflow/version/json
         */
        getWorkflowVersionJson: (
            query: {
                draftId: string;
                versionNumber: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/json`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name GetWorkflowVersionBpmnxml
         * @summary Download BPMN20.xml through version number and draft id
         * @request GET:/api/docpal/workflow/version/bpmnXml
         */
        getWorkflowVersionBpmnxml: (
            query: {
                draftId: string;
                versionNumber: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/bpmnXml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowQuerydocumenttypeprofileid
         * @request GET:/api/docpal/workflow/querydocumentTypeProFileId
         */
        getWorkflowQuerydocumenttypeprofileid: (
            query: {
                documentType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLong, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/querydocumentTypeProFileId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowQuerymetadatamapping
         * @request GET:/api/docpal/workflow/queryMetadataMapping
         */
        getWorkflowQuerymetadatamapping: (
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
            this.request<ResultListDocumentTypeMetadataMapping, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/queryMetadataMapping`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowQuerymetadatamappingnames
         * @request GET:/api/docpal/workflow/queryMetadataMappingNames
         */
        getWorkflowQuerymetadatamappingnames: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/queryMetadataMappingNames`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowQuerymetavalidationrule
         * @request GET:/api/docpal/workflow/queryMetaValidationRule
         */
        getWorkflowQuerymetavalidationrule: (
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
            this.request<ResultListMetadataSettingResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/queryMetaValidationRule`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowQuerydocumenttypeprofile
         * @request GET:/api/docpal/workflow/queryDocumentTypeProfile
         */
        getWorkflowQuerydocumenttypeprofile: (
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
            this.request<ResultListDocumentTypeProfileSetting, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/queryDocumentTypeProfile`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowQuerydocumenttypeprofilesettings
         * @request GET:/api/docpal/workflow/queryDocumentTypeProFileSettings
         */
        getWorkflowQuerydocumenttypeprofilesettings: (params: RequestParams = {}) =>
            this.request<ResultMapStringListMapStringString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/queryDocumentTypeProFileSettings`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowProcessGetprocessdefinitionlist
         * @request GET:/api/docpal/workflow/process/getProcessDefinitionList
         */
        getWorkflowProcessGetprocessdefinitionlist: (
            query?: {
                processKey?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/getProcessDefinitionList`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionProcessdefinitionkey
         * @summary Get deployed process definition through process definition key
         * @request GET:/api/docpal/workflow/process/definition/{processDefinitionKey}
         */
        getWorkflowProcessDefinitionProcessdefinitionkey: (processDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/${processDefinitionKey}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionProcessdefinitionkeyHistory
         * @summary Find historical process definitions through process definition key
         * @request GET:/api/docpal/workflow/process/definition/{processDefinitionKey}/history
         */
        getWorkflowProcessDefinitionProcessdefinitionkeyHistory: (
            processDefinitionKey: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/${processDefinitionKey}/history`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionNamespace
         * @summary Get name-space of deployed process definition
         * @request GET:/api/docpal/workflow/process/definition/nameSpace
         */
        getWorkflowProcessDefinitionNamespace: (params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/nameSpace`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionForms
         * @summary Get the list of form properties associated with the process definition
         * @request GET:/api/docpal/workflow/process/definition/forms
         */
        getWorkflowProcessDefinitionForms: (
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListBpmnDynamicFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/forms`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionFormsElementkey
         * @summary Get form properties of single element associated with the process definition
         * @request GET:/api/docpal/workflow/process/definition/forms/{elementKey}
         */
        getWorkflowProcessDefinitionFormsElementkey: (
            elementKey: string,
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionFormsStart
         * @summary Get start-form properties associated with the process definition
         * @request GET:/api/docpal/workflow/process/definition/forms/start
         */
        getWorkflowProcessDefinitionFormsStart: (
            query: {
                /** Workflow Process Definition RequestDTO */
                requestDTO: ProcessDefinitionRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBpmnDynamicFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/forms/start`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionDraftDraftid
         * @summary Get draft through process definition key
         * @request GET:/api/docpal/workflow/process/definition/draft/{draftId}
         */
        getWorkflowProcessDefinitionDraftDraftid: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteWorkflowProcessDefinitionDraftDraftid
         * @summary Delete process definition through process definition draft id
         * @request DELETE:/api/docpal/workflow/process/definition/draft/{draftId}
         */
        deleteWorkflowProcessDefinitionDraftDraftid: (
            draftId: string,
            query?: {
                enforce?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionDraftDraftidDownloadXml
         * @summary Get draft BPMN2.0 XML file through draft id
         * @request GET:/api/docpal/workflow/process/definition/draft/{draftId}/download/xml
         */
        getWorkflowProcessDefinitionDraftDraftidDownloadXml: (draftId: string, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/draft/${draftId}/download/xml`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name GetWorkflowProcessDefinitionDownloadXml
         * @summary Download BPMN2.0 XML file through process definition ID
         * @request GET:/api/docpal/workflow/process/definition/download/xml
         */
        getWorkflowProcessDefinitionDownloadXml: (
            query: {
                processDefinitionId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/download/xml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetvocabularynames
         * @request GET:/api/docpal/workflow/getVocabularyNames
         */
        getWorkflowGetvocabularynames: (params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/getVocabularyNames`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetvocabularymap
         * @request GET:/api/docpal/workflow/getVocabularyMap
         */
        getWorkflowGetvocabularymap: (params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/getVocabularyMap`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetdocumenttypes
         * @request GET:/api/docpal/workflow/getDocumentTypes
         */
        getWorkflowGetdocumenttypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/getDocumentTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetdatatypebyname
         * @request GET:/api/docpal/workflow/getDataTypeByName
         */
        getWorkflowGetdatatypebyname: (
            query: {
                name: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultKeywordDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/getDataTypeByName`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetdatabyvocabularyname
         * @request GET:/api/docpal/workflow/getDataByVocabularyName
         */
        getWorkflowGetdatabyvocabularyname: (
            query: {
                vocabularyName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDirectoryEntry, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/getDataByVocabularyName`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowForms
         * @summary Get the list of form properties associated with the process definition
         * @request GET:/api/docpal/workflow/forms
         */
        getWorkflowForms: (
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListBpmnDynamicFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/forms`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowFormsElementkey
         * @summary Get form properties of single element associated with the process definition
         * @request GET:/api/docpal/workflow/forms/{elementKey}
         */
        getWorkflowFormsElementkey: (
            elementKey: string,
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowCheckmetadatavalues
         * @request GET:/api/docpal/workflow/checkMetaDataValues
         */
        getWorkflowCheckmetadatavalues: (
            query: {
                documentType: string;
                metaData: string;
                value: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/checkMetaDataValues`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name GetWhatsappTestConnection
         * @request GET:/api/docpal/whatsapp/test_connection
         */
        getWhatsappTestConnection: (params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/whatsapp/test_connection`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags whats-app-controller
         * @name GetWhatsappLanguageList
         * @request GET:/api/docpal/whatsapp/language_list
         */
        getWhatsappLanguageList: (params: RequestParams = {}) =>
            this.request<ResultListLanguageDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/whatsapp/language_list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetWatermarkTemplatesId
         * @summary Query watermark template by ID
         * @request GET:/api/docpal/watermark/templates/{id}
         */
        getWatermarkTemplatesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name DeleteWatermarkTemplatesId
         * @summary Delete watermark template by id
         * @request DELETE:/api/docpal/watermark/templates/{id}
         */
        deleteWatermarkTemplatesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetWatermarkTemplatesNameName
         * @summary Query watermark template by name
         * @request GET:/api/docpal/watermark/templates/name/{name}
         */
        getWatermarkTemplatesNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name DeleteWatermarkTemplatesNameName
         * @summary Delete watermark template by name
         * @request DELETE:/api/docpal/watermark/templates/name/{name}
         */
        deleteWatermarkTemplatesNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetWatermarkTemplatesAll
         * @summary Query all watermark template
         * @request GET:/api/docpal/watermark/templates/all
         */
        getWatermarkTemplatesAll: (params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/templates/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkSettingsId
         * @summary query watermark settings
         * @request GET:/api/docpal/watermark/settings/{id}
         */
        getWatermarkSettingsId: (id: string, params: RequestParams = {}) =>
            this.request<ResultWatermarkSettingsDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name DeleteWatermarkSettingsId
         * @summary Delete watermark settings by id
         * @request DELETE:/api/docpal/watermark/settings/{id}
         */
        deleteWatermarkSettingsId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkSettingsTemplateTemplateid
         * @summary Query list of watermark settings by template id
         * @request GET:/api/docpal/watermark/settings/template/{templateId}
         */
        getWatermarkSettingsTemplateTemplateid: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/template/${templateId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkSettingsRepairdata
         * @request GET:/api/docpal/watermark/settings/repairData
         */
        getWatermarkSettingsRepairdata: (params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/repairData`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkSettingsPreviewId
         * @summary preview watermark settings to return byte array
         * @request GET:/api/docpal/watermark/settings/preview/{id}
         */
        getWatermarkSettingsPreviewId: (id: string, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/preview/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkSettingsContenttype
         * @summary Get list of content type of watermark setting
         * @request GET:/api/docpal/watermark/settings/contentType
         */
        getWatermarkSettingsContenttype: (params: RequestParams = {}) =>
            this.request<ResultListWMContentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/watermark/settings/contentType`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetTypesList
         * @summary Obtain all list of actived docpal types
         * @request GET:/api/docpal/types/list
         */
        getTypesList: (
            query?: {
                isFolder?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/types/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name GetTypesActive
         * @summary Obtain all list of actived docpal types
         * @request GET:/api/docpal/types/active
         */
        getTypesActive: (
            query?: {
                all?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/types/active`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailId
         * @summary Obtain email template detail
         * @request GET:/api/docpal/template/email/{id}
         */
        getTemplateEmailId: (id: string, params: RequestParams = {}) =>
            this.request<ResultEmailTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailTemplateId
         * @summary Obtain email template detail
         * @request GET:/api/docpal/template/email/template/{id}
         */
        getTemplateEmailTemplateId: (id: string, params: RequestParams = {}) =>
            this.request<ResultEmailTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/template/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name DeleteTemplateEmailTemplateId
         * @summary Delete email template by id
         * @request DELETE:/api/docpal/template/email/template/{id}
         */
        deleteTemplateEmailTemplateId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/template/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailTemplateLayouts
         * @summary Obtain all layouts used by email template
         * @request GET:/api/docpal/template/email/template/layouts
         */
        getTemplateEmailTemplateLayouts: (params: RequestParams = {}) =>
            this.request<ResultListEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/template/layouts`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailLayouts
         * @summary Obtain all layouts used by email template
         * @request GET:/api/docpal/template/email/layouts
         */
        getTemplateEmailLayouts: (params: RequestParams = {}) =>
            this.request<ResultListEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layouts`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailLayoutId
         * @summary Obtain email layout by id
         * @request GET:/api/docpal/template/email/layout/{id}
         */
        getTemplateEmailLayoutId: (id: number, params: RequestParams = {}) =>
            this.request<ResultEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layout/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name DeleteTemplateEmailLayoutId
         * @summary Delete email layout by id
         * @request DELETE:/api/docpal/template/email/layout/{id}
         */
        deleteTemplateEmailLayoutId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layout/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailLayoutAll
         * @summary Obtain all email layout
         * @request GET:/api/docpal/template/email/layout/all
         */
        getTemplateEmailLayoutAll: (params: RequestParams = {}) =>
            this.request<ResultListEmailLayout, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/layout/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags EmailController
         * @name GetTemplateEmailAll
         * @request GET:/api/docpal/template/email/all
         */
        getTemplateEmailAll: (params: RequestParams = {}) =>
            this.request<ResultListEmailTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/email/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetTemplateDocumentId
         * @summary Get Document Template
         * @request GET:/api/docpal/template/document/{id}
         */
        getTemplateDocumentId: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name DeleteTemplateDocumentId
         * @summary Delete Document Template by id
         * @request DELETE:/api/docpal/template/document/{id}
         */
        deleteTemplateDocumentId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetTemplateDocumentSupportFiletype
         * @request GET:/api/docpal/template/document/support/fileType
         */
        getTemplateDocumentSupportFiletype: (params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/support/fileType`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetTemplateDocumentRefreshId
         * @summary Refresh document template variables
         * @request GET:/api/docpal/template/document/refresh/{id}
         */
        getTemplateDocumentRefreshId: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplateResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/refresh/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetTemplateDocumentPageConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/template/document/page/conditions
         */
        getTemplateDocumentPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocumentTemplateController
         * @name GetTemplateDocumentAll
         * @summary Get All Document Template
         * @request GET:/api/docpal/template/document/all
         */
        getTemplateDocumentAll: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTemplate, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/template/document/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetSystemfeatureKeycloakTokenVerification
         * @request GET:/api/docpal/systemfeature/keycloak-token-verification
         */
        getSystemfeatureKeycloakTokenVerification: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/systemfeature/keycloak-token-verification`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetSystemfeatureGetfeatures
         * @request GET:/api/docpal/systemfeature/getFeatures
         */
        getSystemfeatureGetfeatures: (params: RequestParams = {}) =>
            this.request<ResultMapStringBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/systemfeature/getFeatures`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetSystemfeatureGetfeaturesDeprecate
         * @request GET:/api/docpal/systemfeature/getFeatures/
         */
        getSystemfeatureGetfeaturesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultMapStringBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/systemfeature/getFeatures/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags GlobalSettingController
         * @name GetSettingWorkflowConditionSetting
         * @request GET:/api/docpal/setting/workflow/condition/setting
         */
        getSettingWorkflowConditionSetting: (params: RequestParams = {}) =>
            this.request<ResultListMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/setting/workflow/condition/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags GlobalSettingController
         * @name GetSettingFeaturerolemapping
         * @request GET:/api/docpal/setting/featureRoleMapping
         */
        getSettingFeaturerolemapping: (params: RequestParams = {}) =>
            this.request<ResultListMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/setting/featureRoleMapping`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetRelationQuerylanguagelocale
         * @request GET:/api/docpal/relation/queryLanguageLocale
         * @deprecated
         */
        getRelationQuerylanguagelocale: (params: RequestParams = {}) =>
            this.request<ResultSetString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguageLocale`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetRelationInitelanguagecache
         * @request GET:/api/docpal/relation/initeLanguageCache
         */
        getRelationInitelanguagecache: (params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/initeLanguageCache`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetRelationGetkeycloakproperty
         * @summary get keyCloakProperty
         * @request GET:/api/docpal/relation/getKeyCloakProperty
         */
        getRelationGetkeycloakproperty: (params: RequestParams = {}) =>
            this.request<ResultKeyCloakPropertyVO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/getKeyCloakProperty`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetPolicyRetentionsId
         * @summary Obtain RetentionPolicy detail
         * @request GET:/api/docpal/policy/retentions/{id}
         */
        getPolicyRetentionsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name DeletePolicyRetentionsId
         * @summary Delete the retention policy it must not have been used yet
         * @request DELETE:/api/docpal/policy/retentions/{id}
         */
        deletePolicyRetentionsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetPolicyRetentionsPageConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/policy/retentions/page/conditions
         */
        getPolicyRetentionsPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetPolicyRetentionsDocumenttypeUsed
         * @summary Query used document-type of retention policies
         * @request GET:/api/docpal/policy/retentions/documentType/used
         */
        getPolicyRetentionsDocumenttypeUsed: (
            query: {
                documentType: string;
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListRetentionPolicyTrigger, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/retentions/documentType/used`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name GetPolicyHoldsId
         * @summary Obtain hold policy detail
         * @request GET:/api/docpal/policy/holds/{id}
         */
        getPolicyHoldsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name DeletePolicyHoldsId
         * @summary Delete the hold policy it must not have been used yet
         * @request DELETE:/api/docpal/policy/holds/{id}
         */
        deletePolicyHoldsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/policy/holds/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name GetPersonalDashboardId
         * @summary Obtain a dashboard detail
         * @request GET:/api/docpal/personal/dashboard/{id}
         */
        getPersonalDashboardId: (id: number, params: RequestParams = {}) =>
            this.request<ResultPersonalDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/personal/dashboard/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalDashboardController
         * @name DeletePersonalDashboardId
         * @request DELETE:/api/docpal/personal/dashboard/{id}
         */
        deletePersonalDashboardId: (id: number, params: RequestParams = {}) =>
            this.request<ResultVoid, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/personal/dashboard/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetOauth2Authenticationmethod
         * @summary Get all authentication way of OAuth2.0
         * @request GET:/api/docpal/oauth2/authenticationMethod
         */
        getOauth2Authenticationmethod: (params: RequestParams = {}) =>
            this.request<ResultOAuth2AuthenticationMethod, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/authenticationMethod`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags OAuth2SettingController
         * @name GetOauth2AccesstokenSenderaddressSenderaddress
         * @request GET:/api/docpal/oauth2/accessToken/senderAddress/{senderAddress}
         * @deprecated
         */
        getOauth2AccesstokenSenderaddressSenderaddress: (senderAddress: string, params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/oauth2/accessToken/senderAddress/${senderAddress}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name GetMessageTemplateQueryMessageTemplates
         * @request GET:/api/docpal/message/template/query_message_templates
         */
        getMessageTemplateQueryMessageTemplates: (params: RequestParams = {}) =>
            this.request<ResultListMessageTemplateDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/query_message_templates`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name GetMessageTemplateQueryMessageTemplateTemplatename
         * @request GET:/api/docpal/message/template/query_message_template/{templateName}
         */
        getMessageTemplateQueryMessageTemplateTemplatename: (templateName: string, params: RequestParams = {}) =>
            this.request<ResultMessageTemplateDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/query_message_template/${templateName}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name GetMessageTemplateFindTemplateNameList
         * @request GET:/api/docpal/message/template/find_template_name_list
         */
        getMessageTemplateFindTemplateNameList: (params: RequestParams = {}) =>
            this.request<ResultMessageTemplateListDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/find_template_name_list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name GetMessageTemplateFindTemplateInfoTemplatename
         * @request GET:/api/docpal/message/template/find_template_info/{templateName}
         */
        getMessageTemplateFindTemplateInfoTemplatename: (templateName: string, params: RequestParams = {}) =>
            this.request<ResultMessageTemplateDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/find_template_info/${templateName}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name GetMessageTemplateDetailsId
         * @request GET:/api/docpal/message/template/details/{id}
         */
        getMessageTemplateDetailsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultMessageTemplateDetailDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/details/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesId
         * @summary Get all fields of master table and include associated data structures
         * @request GET:/api/docpal/master/tables/{id}
         */
        getMasterTablesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteMasterTablesId
         * @request DELETE:/api/docpal/master/tables/{id}
         */
        deleteMasterTablesId: (
            id: string,
            query?: {
                enforceable?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesIdStructure
         * @summary Get data structure of master table，but not relation fields
         * @request GET:/api/docpal/master/tables/{id}/structure
         */
        getMasterTablesIdStructure: (id: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/structure`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesIdRecordRecordid
         * @summary Query row data record in single master table
         * @request GET:/api/docpal/master/tables/{id}/record/{recordId}
         */
        getMasterTablesIdRecordRecordid: (id: string, recordId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record/${recordId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesIdRecordTemplate
         * @summary Download excel template file of master table for use import data
         * @request GET:/api/docpal/master/tables/{id}/record/template
         */
        getMasterTablesIdRecordTemplate: (
            id: string,
            query?: {
                operation?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record/template`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesIdAcls
         * @summary Obtain all permission of current master table
         * @request GET:/api/docpal/master/tables/{id}/acls
         */
        getMasterTablesIdAcls: (id: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/acls`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesRepairStructure
         * @summary For repair structure of master table ( Add column [status] if does not exist )
         * @request GET:/api/docpal/master/tables/repair/structure
         */
        getMasterTablesRepairStructure: (params: RequestParams = {}) =>
            this.request<Record<string, object>, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/repair/structure`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesRelationId
         * @summary query relation of master table
         * @request GET:/api/docpal/master/tables/relation/{id}
         */
        getMasterTablesRelationId: (id: string, params: RequestParams = {}) =>
            this.request<ResultListMTRelationResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/relation/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesPageConditions
         * @request GET:/api/docpal/master/tables/page/conditions
         */
        getMasterTablesPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesNameName
         * @summary Obtain structure of master table through table label
         * @request GET:/api/docpal/master/tables/name/{name}
         */
        getMasterTablesNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesDownloadFailure
         * @summary Download data that failed to upload .csv file
         * @request GET:/api/docpal/master/tables/download/failure
         */
        getMasterTablesDownloadFailure: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/download/failure`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesDatatypeMapping
         * @summary Obtain dataType mapping of master table
         * @request GET:/api/docpal/master/tables/dataType/mapping
         */
        getMasterTablesDatatypeMapping: (params: RequestParams = {}) =>
            this.request<ResultListMTFieldTypeMapping, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/dataType/mapping`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementServices
         * @summary Retrieve available services
         * @request GET:/api/docpal/management/services
         */
        getManagementServices: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/services`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementServicesDeprecate
         * @summary Retrieve available services
         * @request GET:/api/docpal/management/services/
         */
        getManagementServicesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/services/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementLoggersLevels
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/levels
         */
        getManagementLoggersLevels: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers/levels`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementLoggersServiceLevels
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/{service}/levels
         */
        getManagementLoggersServiceLevels: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers/${service}/levels`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementLoggersLevelsDeprecate
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/levels/
         */
        getManagementLoggersLevelsDeprecate: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers/levels/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementLoggersServiceLevelsDeprecate
         * @summary Retrieve the available logger levels of the services
         * @request GET:/api/docpal/management/loggers/{service}/levels/
         */
        getManagementLoggersServiceLevelsDeprecate: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/loggers/${service}/levels/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementInfoServiceDeprecate
         * @summary Retrieve the services' Java and build information
         * @request GET:/api/docpal/management/info/{service}/
         */
        getManagementInfoServiceDeprecate: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/info/${service}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementInfoService
         * @summary Retrieve the services' Java and build information
         * @request GET:/api/docpal/management/info/{service}
         */
        getManagementInfoService: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/info/${service}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementInfo
         * @summary Retrieve the services' Java and build information
         * @request GET:/api/docpal/management/info
         */
        getManagementInfo: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/info`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementHealthServiceDeprecate
         * @summary Retrieve the health, whether it is up or down, of the services
         * @request GET:/api/docpal/management/health/{service}/
         */
        getManagementHealthServiceDeprecate: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/health/${service}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementHealthService
         * @summary Retrieve the health, whether it is up or down, of the services
         * @request GET:/api/docpal/management/health/{service}
         */
        getManagementHealthService: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/health/${service}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Management
         * @name GetManagementHealth
         * @summary Retrieve the health, whether it is up or down, of the services
         * @request GET:/api/docpal/management/health
         */
        getManagementHealth: (service: string, params: RequestParams = {}) =>
            this.request<ResultMapStringMapStringObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/management/health`,
                method: "GET",
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
            this.request<BaseResultLicenseContent, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/license`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LicenseController
         * @name GetLicenseWhitelist
         * @request GET:/api/docpal/license/whitelist
         */
        getLicenseWhitelist: (params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/license/whitelist`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags LicenseController
         * @name GetLicenseGetlicense
         * @request GET:/api/docpal/license/getLicense
         * @deprecated
         */
        getLicenseGetlicense: (params: RequestParams = {}) =>
            this.request<BaseResultLicenseContent, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/license/getLicense`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetFormDesignIdDetail
         * @summary Retrieve form design detail of published
         * @request GET:/api/docpal/form/design/{id}/detail
         */
        getFormDesignIdDetail: (id: string, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/${id}/detail`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetFormDesignProcessDefinitions
         * @request GET:/api/docpal/form/design/process/definitions
         */
        getFormDesignProcessDefinitions: (params: RequestParams = {}) =>
            this.request<ResultListPDResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/process/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetFormDesignDraftId
         * @summary Retrieve form design draft
         * @request GET:/api/docpal/form/design/draft/{id}
         */
        getFormDesignDraftId: (id: string, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/draft/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetFormDesignDatatypeMapping
         * @summary Obtain dataType mapping of form design
         * @request GET:/api/docpal/form/design/dataType/mapping
         */
        getFormDesignDatatypeMapping: (params: RequestParams = {}) =>
            this.request<ResultListMTFieldTypeMapping, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/dataType/mapping`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDictCategories
         * @summary Get All Vocabulary ids
         * @request GET:/api/docpal/dict/categories
         */
        getDictCategories: (params: RequestParams = {}) =>
            this.request<ResultListDictResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/categories`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDictListvocabularyids
         * @summary Get All Vocabulary ids
         * @request GET:/api/docpal/dict/listVocabularyIds
         */
        getDictListvocabularyids: (params: RequestParams = {}) =>
            this.request<ResultListDictResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/listVocabularyIds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDictDatapatch
         * @summary  Test API
         * @request GET:/api/docpal/dict/dataPatch
         */
        getDictDatapatch: (params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/dataPatch`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDictCategorycode
         * @summary Get Vocabulary by id
         * @request GET:/api/docpal/dict/{categoryCode}
         */
        getDictCategorycode: (
            categoryCode: string,
            query?: {
                language?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDictResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/${categoryCode}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name GetDictCategoryCategorycode
         * @summary Get Vocabulary by id
         * @request GET:/api/docpal/dict/category/{categoryCode}
         */
        getDictCategoryCategorycode: (
            categoryCode: string,
            query?: {
                language?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDictResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/category/${categoryCode}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name GetDamGetsupportedformat
         * @request GET:/api/docpal/dam/getSupportedFormat
         */
        getDamGetsupportedformat: (params: RequestParams = {}) =>
            this.request<
                ResultHashMapStringListConversionSupportDestType,
                Result | (ResultObject | Result | ResultString)
            >({
                path: `/docpal/dam/getSupportedFormat`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesId
         * @summary Retrieve case type detail
         * @request GET:/api/docpal/case/types/{id}
         */
        getCaseTypesId: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseTypeResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name DeleteCaseTypesId
         * @summary Delete the case type it must not have been used yet
         * @request DELETE:/api/docpal/case/types/{id}
         */
        deleteCaseTypesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdVersions
         * @summary Create a new version case type
         * @request GET:/api/docpal/case/types/{id}/versions
         */
        getCaseTypesIdVersions: (id: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/versions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdStylejson
         * @summary Query style json of cmmn xml
         * @request GET:/api/docpal/case/types/{id}/styleJson
         */
        getCaseTypesIdStylejson: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/styleJson`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdStarttask
         * @summary Retrieve start humanTask of a case model definition
         * @request GET:/api/docpal/case/types/{id}/startTask
         */
        getCaseTypesIdStarttask: (
            id: string,
            query?: {
                startMatchSign?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/startTask`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdDownloadXml
         * @summary Download cmmn.xml of version (case model definition)
         * @request GET:/api/docpal/case/types/{id}/download/xml
         */
        getCaseTypesIdDownloadXml: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/download/xml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdDownloadDeployVersion
         * @summary Download latest version cmmn xml (case model definition)
         * @request GET:/api/docpal/case/types/{id}/download/deploy/version
         */
        getCaseTypesIdDownloadDeployVersion: (id: string, params: RequestParams = {}) =>
            this.request<string[], Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/download/deploy/version`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdDeployVersion
         * @summary Query cmmn version information of the last successfully deployed version
         * @request GET:/api/docpal/case/types/{id}/deploy/version
         */
        getCaseTypesIdDeployVersion: (id: string, params: RequestParams = {}) =>
            this.request<ResultCaseModelDraft, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${id}/deploy/version`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeidPermissionsUserid
         * @request GET:/api/docpal/case/types/{caseTypeId}/permissions/{userId}
         */
        getCaseTypesCasetypeidPermissionsUserid: (caseTypeId: string, userId: string, params: RequestParams = {}) =>
            this.request<ResultMapStringString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${caseTypeId}/permissions/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseTypesCasetypeidInstances
         * @summary Retrieve all case instances of this case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/instances
         */
        getCaseTypesCasetypeidInstances: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnInstance, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${caseTypeId}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasedefinitionkeyDeployment
         * @request GET:/api/docpal/case/types/{caseDefinitionKey}/deployment
         */
        getCaseTypesCasedefinitionkeyDeployment: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultCmmnDeploymentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/${caseDefinitionKey}/deployment`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesVersionVersionid
         * @summary Retrieve detail of case model version
         * @request GET:/api/docpal/case/types/version/{versionId}
         */
        getCaseTypesVersionVersionid: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnVersion, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/version/${versionId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesPermissionsRules
         * @summary Retrieve case type permission rules
         * @request GET:/api/docpal/case/types/permissions/rules
         */
        getCaseTypesPermissionsRules: (params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/permissions/rules`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesDatatypeMapping
         * @summary Obtain support column mapping
         * @request GET:/api/docpal/case/types/dataType/mapping
         */
        getCaseTypesDatatypeMapping: (params: RequestParams = {}) =>
            this.request<ResultListMTFieldTypeMapping, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/types/dataType/mapping`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetCaseTablesId
         * @summary Retrieve detail of case table and include associated data structures
         * @request GET:/api/docpal/case/tables/{id}
         */
        getCaseTablesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultCaseTableResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name DeleteCaseTablesId
         * @request DELETE:/api/docpal/case/tables/{id}
         */
        deleteCaseTablesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetCaseTablesCasetypeCasetypeid
         * @summary Retrieve a list of case tables that belong to the specified case type
         * @request GET:/api/docpal/case/tables/caseType/{caseTypeId}
         */
        getCaseTablesCasetypeCasetypeid: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCaseTable, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/caseType/${caseTypeId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTableController
         * @name GetCaseTablesCasequery
         * @request GET:/api/docpal/case/tables/caseQuery
         */
        getCaseTablesCasequery: (
            query: {
                tableName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/tables/caseQuery`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseSupportSubcase
         * @summary Filter case definition to select as sub-case
         * @request GET:/api/docpal/case/support/subCase
         */
        getCaseSupportSubcase: (params: RequestParams = {}) =>
            this.request<ResultListCaseDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/support/subCase`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseSupportSubcaseFields
         * @summary Extract input field list of sub-case definition
         * @request GET:/api/docpal/case/support/subCase/fields
         */
        getCaseSupportSubcaseFields: (
            query: {
                caseDefinitionId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanTableFieldDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/support/subCase/fields`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceCaseinstanceidForms
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/forms
         */
        getCaseInstanceCaseinstanceidForms: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnPlanFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/${caseInstanceId}/forms`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceCaseinstanceidEvents
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/events
         */
        getCaseInstanceCaseinstanceidEvents: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListUserEventInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/${caseInstanceId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceTasksTaskidForm
         * @summary Retrieve form information of task
         * @request GET:/api/docpal/case/instance/tasks/{taskId}/form
         */
        getCaseInstanceTasksTaskidForm: (taskId: string, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceFormDataDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/tasks/${taskId}/form`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceProcessDefinitions
         * @summary Retrieve process definition of this case instance through case definition key
         * @request GET:/api/docpal/case/instance/process/definitions
         */
        getCaseInstanceProcessDefinitions: (
            query: {
                businessKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/process/definitions`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstancePlanitemsPlanitemidForm
         * @summary Retrieve form information of plan item instance
         * @request GET:/api/docpal/case/instance/planItems/{planItemId}/form
         */
        getCaseInstancePlanitemsPlanitemidForm: (
            planItemId: string,
            query?: {
                caseDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnPlanFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/instance/planItems/${planItemId}/form`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseDefinitions
         * @summary Retrieve all case model definitions
         * @request GET:/api/docpal/case/definitions
         */
        getCaseDefinitions: (params: RequestParams = {}) =>
            this.request<ResultListCaseDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseDefinitionsCasedefinitionkeyInstances
         * @summary Retrieve case instances of this case model
         * @request GET:/api/docpal/case/definitions/{caseDefinitionKey}/instances
         */
        getCaseDefinitionsCasedefinitionkeyInstances: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListCaseInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/definitions/${caseDefinitionKey}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseDefinitionCasedefinitionkeyProcessDefinitions
         * @summary Retrieve process definition of this case instance through case definition key
         * @request GET:/api/docpal/case/definition/{caseDefinitionKey}/process/definitions
         */
        getCaseDefinitionCasedefinitionkeyProcessDefinitions: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/definition/${caseDefinitionKey}/process/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardId
         * @summary Retrieve case dashboard detail
         * @request GET:/api/docpal/case/dashboard/{id}
         */
        getCaseDashboardId: (id: string, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name DeleteCaseDashboardId
         * @summary Delete the case dashboard it must not have been used yet
         * @request DELETE:/api/docpal/case/dashboard/{id}
         */
        deleteCaseDashboardId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardVersionVersionidStages
         * @summary Get stages of the current version that it is case definition
         * @request GET:/api/docpal/case/dashboard/version/{versionId}/stages
         */
        getCaseDashboardVersionVersionidStages: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/version/${versionId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardVersionVersionidPrimaryform
         * @summary Get primary form of the current version that it is case definition
         * @request GET:/api/docpal/case/dashboard/version/{versionId}/primaryForm
         */
        getCaseDashboardVersionVersionidPrimaryform: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnPlanFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/version/${versionId}/primaryForm`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardVersionVersionidActivity
         * @summary Get all activity of the current version that it is case definition
         * @request GET:/api/docpal/case/dashboard/version/{versionId}/activity
         */
        getCaseDashboardVersionVersionidActivity: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/version/${versionId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardVersionVersionidActions
         * @request GET:/api/docpal/case/dashboard/version/{versionId}/actions
         */
        getCaseDashboardVersionVersionidActions: (versionId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/version/${versionId}/actions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseinstanceidMilestoneStatus
         * @summary Obtain Milestone Status of a case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseInstanceId}/milestone/status
         */
        getCaseDashboardInstanceCaseinstanceidMilestoneStatus: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseInstanceId}/milestone/status`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidTasks
         * @summary Retrieve all tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/tasks
         */
        getCaseDashboardInstanceCaseidTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidStages
         * @summary Retrieve stages of current case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/stages
         */
        getCaseDashboardInstanceCaseidStages: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidPrimaryformData
         * @summary Retrieve primary form data (Case Dashboard) structure
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/primaryForm/data
         */
        getCaseDashboardInstanceCaseidPrimaryformData: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceFormDataDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/primaryForm/data`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidPlanitems
         * @summary Retrieve planItems
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/planItems
         */
        getCaseDashboardInstanceCaseidPlanitems: (
            caseId: string,
            query: {
                type: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/planItems`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidPersonalTasks
         * @summary Retrieve personal tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/personal/tasks
         */
        getCaseDashboardInstanceCaseidPersonalTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/personal/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidEvents
         * @summary Retrieve all events of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/events
         */
        getCaseDashboardInstanceCaseidEvents: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidActivity
         * @summary Retrieve activities of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/activity
         */
        getCaseDashboardInstanceCaseidActivity: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnActivityItem, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidActions
         * @summary Retrieve activities of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/actions
         */
        getCaseDashboardInstanceCaseidActions: (
            caseId: string,
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/${caseId}/actions`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceStagePlanitems
         * @summary Retrieve all planItem instance of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/stage/planItems
         */
        getCaseDashboardInstanceStagePlanitems: (
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
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/instance/stage/planItems`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeid
         * @summary Retrieve all Case View Dashboard
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}
         */
        getCaseDashboardCasetypeCasetypeid: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidVersionnumberVersionnumber
         * @summary Retrieve case dashboard detail
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/versionNumber/{versionNumber}
         */
        getCaseDashboardCasetypeCasetypeidVersionnumberVersionnumber: (
            caseTypeId: string,
            versionNumber: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnDashboard, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/versionNumber/${versionNumber}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidStages
         * @summary Retrieve stages of current case instance
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/stages
         */
        getCaseDashboardCasetypeCasetypeidStages: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidPrimaryform
         * @summary Retrieve primary form (Case Dashboard)
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/primaryForm
         */
        getCaseDashboardCasetypeCasetypeidPrimaryform: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnPlanFormDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/primaryForm`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidActivity
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/activity
         */
        getCaseDashboardCasetypeCasetypeidActivity: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidActions
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/actions
         */
        getCaseDashboardCasetypeCasetypeidActions: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/actions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetCalendarsId
         * @request GET:/api/docpal/calendars/{id}
         */
        getCalendarsId: (id: string, params: RequestParams = {}) =>
            this.request<ResultCalendarTaskRespDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name DeleteCalendarsId
         * @summary Delete the Task  it must not have been used yet
         * @request DELETE:/api/docpal/calendars/{id}
         */
        deleteCalendarsId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetCalendarsSettingTables
         * @summary Obtain calendar tables
         * @request GET:/api/docpal/calendars/setting/tables
         */
        getCalendarsSettingTables: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/setting/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name GetCalendarsActive
         * @request GET:/api/docpal/calendars/active
         */
        getCalendarsActive: (params: RequestParams = {}) =>
            this.request<ResultListCalendarTaskRespDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/calendars/active`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetIdUseWorkflow
         * @summary Query workflow list of use this folder cabinet
         * @request GET:/api/docpal/cabinet/{id}/use/workflow
         */
        getCabinetIdUseWorkflow: (id: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/${id}/use/workflow`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplateId
         * @summary get folder cabinet template tree
         * @request GET:/api/docpal/cabinet/template/{id}
         */
        getCabinetTemplateId: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplateIdInformation
         * @request GET:/api/docpal/cabinet/template/{id}/information
         */
        getCabinetTemplateIdInformation: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinet, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/template/${id}/information`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetList
         * @summary query all folder cabinet list of top level
         * @request GET:/api/docpal/cabinet/list
         */
        getCabinetList: (params: RequestParams = {}) =>
            this.request<ResultListFolderCabinetResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetAzureOcrQueryazuresettingDeprecate
         * @request GET:/api/docpal/azure/ocr/queryAzureSetting/
         */
        getAzureOcrQueryazuresettingDeprecate: (params: RequestParams = {}) =>
            this.request<ResultAzureSettingDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/queryAzureSetting/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetAzureOcrQueryazuresetting
         * @request GET:/api/docpal/azure/ocr/queryAzureSetting
         */
        getAzureOcrQueryazuresetting: (params: RequestParams = {}) =>
            this.request<ResultAzureSettingDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/queryAzureSetting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetAzureOcrQueryazureocrmodelsDeprecate
         * @request GET:/api/docpal/azure/ocr/queryAzureOcrModels/
         */
        getAzureOcrQueryazureocrmodelsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/queryAzureOcrModels/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetAzureOcrQueryazureocrmodels
         * @request GET:/api/docpal/azure/ocr/queryAzureOcrModels
         */
        getAzureOcrQueryazureocrmodels: (params: RequestParams = {}) =>
            this.request<ResultListString, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/queryAzureOcrModels`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags alert-controller
         * @name GetAzureOcrJudgeandsendalertemail
         * @request GET:/api/docpal/azure/ocr/judgeAndSendAlertEmail
         */
        getAzureOcrJudgeandsendalertemail: (
            query: {
                scanType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/judgeAndSendAlertEmail`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetAzureOcrConditionsDeprecate
         * @request GET:/api/docpal/azure/ocr/conditions/
         */
        getAzureOcrConditionsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/conditions/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags azure-ocr-controller
         * @name GetAzureOcrConditions
         * @request GET:/api/docpal/azure/ocr/conditions
         */
        getAzureOcrConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/azure/ocr/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags AclUserPermissionController
         * @name DeleteUserPermissionBusinessBusinessidUserUseridAcesAces
         * @summary Remove permission of business
         * @request DELETE:/api/user/permission/business/{businessId}/user/{userId}/aces/{aces}
         */
        deleteUserPermissionBusinessBusinessidUserUseridAcesAces: (
            businessId: string,
            userId: string,
            aces: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/user/permission/business/${businessId}/user/${userId}/aces/${aces}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-admin-controller
         * @name DeleteSystemAdminClean
         * @request DELETE:/api/system_admin/clean
         */
        deleteSystemAdminClean: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/system_admin/clean`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentTrashDeprecate
         * @request DELETE:/api/nuxeo/document/trash/
         */
        deleteNuxeoDocumentTrashDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/trash/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentTrash
         * @request DELETE:/api/nuxeo/document/trash
         */
        deleteNuxeoDocumentTrash: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/trash`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentAclRemoveDeprecate
         * @request DELETE:/api/nuxeo/document/acl/remove/
         */
        deleteNuxeoDocumentAclRemoveDeprecate: (
            query: {
                idOrPath: string;
                userId: string;
                permission?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/remove/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentAclRemove
         * @request DELETE:/api/nuxeo/document/acl/remove
         */
        deleteNuxeoDocumentAclRemove: (
            query: {
                idOrPath: string;
                userId: string;
                permission?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/document/acl/remove`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteDocpaltypeSettingsNameMetadata
         * @summary Remove metadata from DocPal Type
         * @request DELETE:/api/docpalType/settings/{name}/metadata
         */
        deleteDocpaltypeSettingsNameMetadata: (name: string, data: DocPalTypeMetadata, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/${name}/metadata`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteDocpaltypeSettingsNameMetadataMetadataname
         * @summary Remove metadata from DocPal Type
         * @request DELETE:/api/docpalType/settings/{name}/metadata/{metadataName}
         */
        deleteDocpaltypeSettingsNameMetadataMetadataname: (
            name: string,
            metadataName: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/${name}/metadata/${metadataName}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeSettingController
         * @name DeleteDocpaltypeSettingsRelatedId
         * @summary Delete related docpal type
         * @request DELETE:/api/docpalType/settings/related/{id}
         */
        deleteDocpaltypeSettingsRelatedId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpalType/settings/related/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Version Controller
         * @name DeleteWorkflowVersionDraftidDraftid
         * @request DELETE:/api/docpal/workflow/version/draftId/{draftId}
         */
        deleteWorkflowVersionDraftidDraftid: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/version/draftId/${draftId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowProcessUser
         * @summary Delete process instance by user id
         * @request DELETE:/api/docpal/workflow/process/user
         */
        deleteWorkflowProcessUser: (
            query: {
                /** Delete Workflow (Request) */
                deleteWorkflowReq: DeleteWorkflowReq;
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/user`,
                method: "DELETE",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteWorkflowProcessDefinitionSuspendDraftid
         * @summary Suspend a process definition
         * @request DELETE:/api/docpal/workflow/process/definition/suspend/{draftId}
         */
        deleteWorkflowProcessDefinitionSuspendDraftid: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/suspend/${draftId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow Process Definition Controller
         * @name DeleteWorkflowProcessDefinitionRemoveDraftid
         * @summary Remove process definition from workflow list
         * @request DELETE:/api/docpal/workflow/process/definition/remove/{draftId}
         */
        deleteWorkflowProcessDefinitionRemoveDraftid: (draftId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/definition/remove/${draftId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowProcess
         * @request DELETE:/api/docpal/workflow/process
         */
        deleteWorkflowProcess: (
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
            this.request<ResultListInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowProcessDeprecate
         * @request DELETE:/api/docpal/workflow/process/
         */
        deleteWorkflowProcessDeprecate: (
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
            this.request<ResultListInstanceDTO, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/process/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowDeletedocumenttypeprofile
         * @request DELETE:/api/docpal/workflow/deleteDocumentTypeProfile
         */
        deleteWorkflowDeletedocumenttypeprofile: (
            query: {
                /** @format int64 */
                profileID: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/workflow/deleteDocumentTypeProfile`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags template-message-controller
         * @name DeleteMessageTemplateId
         * @request DELETE:/api/docpal/message/template/{id}
         */
        deleteMessageTemplateId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/message/template/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name DeleteMasterTablesIdRecordBatch
         * @summary Batch delete record by id array
         * @request DELETE:/api/docpal/master/tables/{id}/record/batch
         */
        deleteMasterTablesIdRecordBatch: (
            id: string,
            query: {
                recordIds: string[];
            },
            data: any,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/record/batch`,
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
         * @name DeleteMasterTablesIdFields
         * @summary Delete field when not data (Master Table)
         * @request DELETE:/api/docpal/master/tables/{id}/fields
         */
        deleteMasterTablesIdFields: (
            id: string,
            query: {
                columnName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/master/tables/${id}/fields`,
                method: "DELETE",
                query: query,
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
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/internalShare`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteInternalshareDeprecate
         * @request DELETE:/api/docpal/internalShare/
         */
        deleteInternalshareDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/internalShare/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name DeleteFormDesignId
         * @request DELETE:/api/docpal/form/design/{id}
         */
        deleteFormDesignId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name DeleteFormDesignDraftidFormresultFormresultid
         * @request DELETE:/api/docpal/form/design/{draftId}/formResult/{formResultId}
         */
        deleteFormDesignDraftidFormresultFormresultid: (
            draftId: string,
            formResultId: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/form/design/${draftId}/formResult/${formResultId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name DeleteDictCategoryCategorycodeEntryEntryid
         * @summary Remove Vocabulary entry
         * @request DELETE:/api/docpal/dict/category/{categoryCode}/entry/{entryId}
         */
        deleteDictCategoryCategorycodeEntryEntryid: (
            categoryCode: string,
            entryId: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/category/${categoryCode}/entry/${entryId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DictController
         * @name DeleteDictCategorycodeEntryEntryid
         * @summary Remove Vocabulary entry
         * @request DELETE:/api/docpal/dict/{categoryCode}/entry/{entryId}
         */
        deleteDictCategorycodeEntryEntryid: (categoryCode: string, entryId: string, params: RequestParams = {}) =>
            this.request<ResultObject, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/dict/${categoryCode}/entry/${entryId}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name DeleteCabinetId
         * @summary Delete folder cabinet template and all sub folder cabinet
         * @request DELETE:/api/docpal/cabinet/{id}
         */
        deleteCabinetId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/cabinet/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocBlockPermissionController
         * @name DeleteBlockPermissionDocumentDocidPathDocpath
         * @summary Delete block permission
         * @request DELETE:/api/block/permission/document/{docId}/path/{docPath}
         */
        deleteBlockPermissionDocumentDocidPathDocpath: (docId: string, docPath: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/block/permission/document/${docId}/path/${docPath}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request GET:/api/nuxeo/identity/isCanModified
         */
        getNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PutNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request PUT:/api/nuxeo/identity/isCanModified
         */
        putNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request POST:/api/nuxeo/identity/isCanModified
         */
        postNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name DeleteNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request DELETE:/api/nuxeo/identity/isCanModified
         */
        deleteNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name OptionsNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request OPTIONS:/api/nuxeo/identity/isCanModified
         */
        optionsNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "OPTIONS",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name HeadNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request HEAD:/api/nuxeo/identity/isCanModified
         */
        headNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "HEAD",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PatchNuxeoIdentityIscanmodified
         * @summary group is can modified ?
         * @request PATCH:/api/nuxeo/identity/isCanModified
         */
        patchNuxeoIdentityIscanmodified: (
            query: {
                groupId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetRelationQuery
         * @request GET:/api/docpal/relation/query
         */
        getRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PutRelationQuery
         * @request PUT:/api/docpal/relation/query
         */
        putRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationQuery
         * @request POST:/api/docpal/relation/query
         */
        postRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name DeleteRelationQuery
         * @request DELETE:/api/docpal/relation/query
         */
        deleteRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name OptionsRelationQuery
         * @request OPTIONS:/api/docpal/relation/query
         */
        optionsRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "OPTIONS",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name HeadRelationQuery
         * @request HEAD:/api/docpal/relation/query
         */
        headRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "HEAD",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PatchRelationQuery
         * @request PATCH:/api/docpal/relation/query
         */
        patchRelationQuery: (
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
            this.request<ResultListFormPropertiesRelation, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/query`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetRelationQuerylanguage
         * @request GET:/api/docpal/relation/queryLanguage
         */
        getRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PutRelationQuerylanguage
         * @request PUT:/api/docpal/relation/queryLanguage
         */
        putRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "PUT",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationQuerylanguage
         * @request POST:/api/docpal/relation/queryLanguage
         */
        postRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name DeleteRelationQuerylanguage
         * @request DELETE:/api/docpal/relation/queryLanguage
         */
        deleteRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name OptionsRelationQuerylanguage
         * @request OPTIONS:/api/docpal/relation/queryLanguage
         */
        optionsRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "OPTIONS",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name HeadRelationQuerylanguage
         * @request HEAD:/api/docpal/relation/queryLanguage
         */
        headRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "HEAD",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PatchRelationQuerylanguage
         * @request PATCH:/api/docpal/relation/queryLanguage
         */
        patchRelationQuerylanguage: (
            query?: {
                /** @format int64 */
                id?: number;
                locale?: string;
                languageKey?: string;
                languageContent?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListLanguageEntity, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/queryLanguage`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name GetRelationIsldapmode
         * @summary is Ldap Mode
         * @request GET:/api/docpal/relation/isLdapMode
         */
        getRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PutRelationIsldapmode
         * @summary is Ldap Mode
         * @request PUT:/api/docpal/relation/isLdapMode
         */
        putRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "PUT",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PostRelationIsldapmode
         * @summary is Ldap Mode
         * @request POST:/api/docpal/relation/isLdapMode
         */
        postRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name DeleteRelationIsldapmode
         * @summary is Ldap Mode
         * @request DELETE:/api/docpal/relation/isLdapMode
         */
        deleteRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name OptionsRelationIsldapmode
         * @summary is Ldap Mode
         * @request OPTIONS:/api/docpal/relation/isLdapMode
         */
        optionsRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "OPTIONS",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name HeadRelationIsldapmode
         * @summary is Ldap Mode
         * @request HEAD:/api/docpal/relation/isLdapMode
         */
        headRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "HEAD",
                ...params,
            }),

        /**
         * No description
         *
         * @tags form-properties-relation-controller
         * @name PatchRelationIsldapmode
         * @summary is Ldap Mode
         * @request PATCH:/api/docpal/relation/isLdapMode
         */
        patchRelationIsldapmode: (params: RequestParams = {}) =>
            this.request<ResultBoolean, Result | (ResultObject | Result | ResultString)>({
                path: `/docpal/relation/isLdapMode`,
                method: "PATCH",
                ...params,
            }),
    };
    public = {
        /**
         * No description
         *
         * @tags Public Application Version
         * @name GetPublicVersion
         * @request GET:/public/version
         */
        getPublicVersion: (params: RequestParams = {}) =>
            this.request<ResultString, Result | (ResultObject | Result | ResultString)>({
                path: `/public/version`,
                method: "GET",
                ...params,
            }),
    };
}
