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

export interface ResultString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: string;
}

export interface ResultObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: object;
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
    /** active status , A = active , D = unActive */
    status?: string;
}

export interface ResultListUserDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: UserDTO[];
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
}

export interface ResultDocumentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document Type */
    data?: DocumentTypeDTO;
}

export interface ResultListDocumentTypeDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTypeDTO[];
}

/** Keyword (Request) */
export interface KeywordRequestDTO {
    /** Keyword Name */
    name?: string;
    /** Keyword Type */
    type?: string;
}

/** Keyword Type Group */
export interface KeywordTypeGroupDTO {
    /** Keyword Type Group Name */
    name?: string;
    /** Keywords */
    keywords?: KeywordDTO[];
}

export interface ResultKeywordTypeGroupDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Keyword Type Group */
    data?: KeywordTypeGroupDTO;
}

export interface ResultListKeywordTypeGroupDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: KeywordTypeGroupDTO[];
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
     * Document Modification Date
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
    auditComment?: string;
    auditName?: string;
    /** permissionName */
    permissionName?: string[];
}

export interface PaginableEntityDTODocumentDTO {
    entryList?: DocumentDTO[];
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    currentPageIndex?: number;
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginableEntityDTODocumentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTODocumentDTO;
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

/** Document File */
export interface FileDTO {
    /**
     * File Size
     * @format int64
     */
    size?: number;
    /** File Content */
    content?: string[];
    /** Filename */
    name?: string;
    /** File Mime-type */
    mimeType?: string;
    /** Workflow content ID */
    contentId?: string;
    /** File Status use for OCR result */
    status?: string;
}

export interface ResultFileDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document File */
    data?: FileDTO;
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
}

/** Virtual Folder Setting (Request) */
export interface VirtualFolderSettingRequestDTO {
    /** Virtual Folder ID */
    id?: string;
    /** Virtual Folder Setting in JSON format */
    jsonValue?: string;
}

export interface PersonalLandingRequestDTO {
    styleJson?: string;
}

export interface ResultVoid {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: object;
}

export interface NotificationRecordDTO {
    ids?: number[];
    status?: string;
}

export interface ResultBoolean {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: boolean;
}

export interface NotificationSetting {
    /** @format int64 */
    id?: number;
    type?: "SUB_DOCUMENT" | "SUBSCRIPTION";
    moduleName?: string;
    description?: string;
    funcPoint?: string;
    pointEnable?: boolean;
    templateId?: string;
    scope?: string;
    realm?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface NotificationManageRequestDTO {
    ids?: number[];
    type?: string;
}

/** Relation Record */
export interface MTRecordDTO {
    /** Table Id */
    tableId?: string;
    /** Record Ids */
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
    sortOrder?: string;
    descSort?: SortObject;
}

export interface SortObject {
    sorted?: boolean;
    empty?: boolean;
    unsorted?: boolean;
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
    /** Fuzzy Search */
    q?: string;
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

export interface ParamDTO {
    name?: string;
    value?: string;
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
    whatsApp?: WhatsAppMessageRequestDTO;
}

export interface WhatsAppMessageRequestDTO {
    to?: string;
    templateName?: string;
    languageCode?: string;
    components?: {
        /** @deprecated */
        relatedArray?: object;
        /** @deprecated */
        componentType?: {
            typeName?: string;
        };
        empty?: boolean;
    };
    textParamDTOList?: ParamDTO[];
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

/** Password (Request) */
export interface PasswordRequestDTO {
    token?: string;
    oldPassword?: string;
    newPassword: string;
}

export interface GenerateTemplateRequestDTO {
    idOrPath?: string;
    templatePath?: string;
    templateId?: string;
    userId?: string;
    paramsMap?: Record<string, object>;
}

export interface ResultMapStringListString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, string[]>;
}

/** Tag (Request) */
export interface TagRequestDTO {
    /** Document ID or Path */
    documentIdOrPath?: string;
    /** Tag Labels */
    labels?: string[];
    /** Keyword */
    keyword?: string;
}

export interface ResultListTagDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: TagDTO[];
}

/** Tag */
export interface TagDTO {
    /** Username */
    username?: string;
    /** Label */
    label?: string;
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

/** The Bind Document List */
export interface EasyShareDocumentDetails {
    /** @format int64 */
    id?: number;
    path?: string;
    docId?: string;
    watermarkTemplateId?: string;
    watermarkStatus?: string;
    watermarkedLocalPath?: string;
    readOnly?: boolean;
}

/** EasyShare (Request) */
export interface ShareRequestDTO {
    /**
     * Document ID List
     * @deprecated
     */
    documentIdList?: string[];
    /** Password for shared document(s) */
    password?: string;
    /**
     * How long the token can last for? (in # of minutes)
     * @format int32
     */
    tokenLiveInMinutes?: number;
    /** Document shared to a list of email */
    emailList?: string[];
    /**
     * Document watermark template relationship
     * @deprecated
     */
    watermarkList?: Record<string, string>;
    /** The Bind Document List */
    documentList?: EasyShareDocumentDetails[];
}

/** EasyShare */
export interface EasyShareDTO {
    /** Token for access shared document */
    access_token?: string;
    /** UUID of saved Nuxeo PATH */
    shareId?: string;
    /** document in Nuxeo with PATH */
    documentURL?: string;
    /** Document ID List */
    documentIdList?: string;
    /** How long the token can last for? (in # of minutes) */
    dueTime?: string;
    /** Document shared to a list of email */
    emailList?: string;
}

export interface ResultEasyShareDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** EasyShare */
    data?: EasyShareDTO;
}

export interface NestedSearchLogRequestDTO {
    label?: string;
    queryCondition?: string;
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
    paramsInTextSearch?: string;
    /** Include full text search,all meta or ocr content */
    textSearchType?: string;
    /** tags */
    tags?: string[];
    /** collections */
    collections?: string[];
    /** authors */
    authors?: string[];
    /** creator */
    creator?: string[];
    /** modified */
    modified?: string;
    /** fileModified */
    fileModified?: string;
    /** mimeTypes */
    mimeTypes?: string[];
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

export interface ResultListSearchHistory {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: SearchHistory[];
}

export interface SearchHistory {
    /** @format int64 */
    id?: number;
    username?: string;
    keyword?: string;
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
    extract?: MatchExtractDTO;
}

export interface MatchExtractDTO {
    synonyms?: string[];
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

export interface ResultSendMessageResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: SendMessageResponseDTO;
}

export interface SendMessageResponseDTO {
    successCallWhatsAppApi?: boolean;
    messageId?: string;
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

export interface WhatsAppUsageDTO {
    processDefinitionName?: string;
    templateName?: string;
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
    params?: Record<string, object>;
}

export interface FilingCreateDocRequestDTO {
    folderCabinetId?: string;
    documentContentId?: string;
    templateVariables?: Record<string, object>;
    watermarkTemplateId?: string;
    properties?: Record<string, string>;
}

/** Generate document mode */
export type GenerateDocumentMode = object;

/** Generate Document (RequestDTO) */
export interface GenerateDocumentRequestDTO {
    /** Generate document mode */
    mode?: GenerateDocumentMode;
    /** Document Template ID */
    templateId?: string;
    /** Folder Cabinet ID */
    folderCabinetId?: string;
    /** Parent Document Path */
    parentPath?: string;
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
    /** Variables for generate document file */
    variables?: Record<string, object>;
    /** Watermark Template Id */
    watermarkTemplateId?: string;
}

/** Document (Request) */
export interface DocumentRequestDTO {
    /** Parent Document */
    parentDocPath?: string;
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
    watermarkTemplateId?: string;
    title?: string;
}

/** Document (Request) */
export interface DocStructureRequestDTO {
    /** Document ID or Path */
    documentPath?: string;
    /** Document Name */
    documentName?: string;
    /** Document Creator */
    creator?: string;
    /** DocPal Type */
    docPalType?: string;
    /** Is Folder */
    isFolder?: boolean;
    /** File Type */
    fileType?: string;
    /** Document Properties */
    properties?: Record<string, object>;
    /** Document Language */
    languages?: string[];
    /** Sub-Document List */
    subDocuments?: DocStructureRequestDTO[];
}

/** Document (Request) */
export interface DocStructureResponseDTO {
    documentParentId?: string;
    /** Document ID or Path */
    documentPath?: string;
    /** Document Name */
    documentName?: string;
    /** Document Creator */
    creator?: string;
    /** DocPal Type */
    docPalType?: string;
    /** Is Folder */
    isFolder?: boolean;
    /** File Type */
    fileType?: string;
    /** Document Properties */
    properties?: Record<string, object>;
    /** Document Language */
    languages?: string[];
    /** Sub-Document List */
    subDocuments?: DocStructureResponseDTO[];
}

/** Copy Document RequestDTO */
export interface CopyDocumentDTO {
    srcIdOrPath?: string;
    targetDirectory?: string;
}

/** Identity (Request) */
export interface IdentityRequestDTO {
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
    /** Group Id List */
    groups?: string[];
    /** User Id List */
    users?: string[];
    /** User Properties */
    properties?: Record<string, object>;
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

export interface ResultListGroupDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: GroupDTO[];
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

/** Workflow (Request) */
export interface WorkflowRequestDTO {
    /** ID */
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
    /**
     * Page Index
     * @deprecated
     * @format int32
     */
    pageIndex?: number;
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
    /** Task Due Date */
    dueDates?: string[];
    /** createdDate */
    createdDate?: string[];
    involvedUser?: string;
    assignedUser?: string;
    candidateUser?: string;
    candidateOrAssigned?: string;
    interrelatedUserId?: string;
    /** @uniqueItems true */
    orderList?: string[];
}

export interface FileRequestUploadRequestDTO {
    idOrPath?: string;
    email?: string;
    message?: string;
    fileType?: string;
    password?: string;
    /** @format int32 */
    minimum?: number;
    /** @format int32 */
    maximum?: number;
    /** @format date-time */
    expiredAt?: string;
}

export interface FileRequestUploadDTO {
    id?: string;
    shareId?: string;
    workflowId?: string;
    taskId?: string;
    email?: string;
    message?: string;
    documentId?: string;
    logicalPath?: string;
    fileType?: string;
    password?: string;
    accessToken?: string;
    status?: string;
    uploadLink?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format int32 */
    maximumFiles?: number;
    /** @format int32 */
    minimumFiles?: number;
    /** @format date-time */
    expiredAt?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultFileRequestUploadDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FileRequestUploadDTO;
}

export interface FileUploadRequestDetailDTO {
    email?: string;
    message?: string;
    password?: string;
    files?: File[];
    accessToken?: string;
    /** @format int64 */
    parentId?: number;
    isFinishUpload?: boolean;
}

export interface ResultLong {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** @format int64 */
    data?: number;
}

export interface FileUploadRequestDTO {
    idOrPath?: string;
    email?: string[];
    message?: string;
    password?: string;
    fileType?: string[];
    /** @format date-time */
    dueDate?: string;
}

export interface UploadTempFileRequestDTO {
    fileRelativePath?: string;
    fileAbsolutePath?: string;
    uploadId?: string;
    userId?: string;
    fileType?: string;
    fileName?: string;
    /** @format int64 */
    fileSize?: number;
    /** @format int64 */
    fileModifiedTimestamp?: number;
}

export interface ESDocumentThumbnailDTO {
    id?: string;
    name?: string;
    path?: string;
    isFolder?: boolean;
    modifiedDate?: string;
    mimeType?: string;
}

export interface ResultListESDocumentThumbnailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ESDocumentThumbnailDTO[];
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

export interface PaginableEntityDTOVirtualFolderDocumentDTO {
    entryList?: VirtualFolderDocumentDTO[];
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    currentPageIndex?: number;
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginableEntityDTOVirtualFolderDocumentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTOVirtualFolderDocumentDTO;
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
     * Document Modification Date
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
    auditComment?: string;
    auditName?: string;
    /** permissionName */
    permissionName?: string[];
    vfConfigType?: object;
}

/** File (Request) */
export interface FileRequestDTO {
    /** Filename */
    name?: string;
    /** File mime-type */
    mimeType?: string;
}

export interface SaveFileOverviewRequestDTO {
    userId?: string;
    /** @format int32 */
    filesCount?: number;
    uploadPath?: string;
    nuxeoPath?: string;
}

export interface AiAnalysisDocumentDTO {
    documentType?: string;
    metaDatas?: MetadataVO[];
}

export interface MetadataVO {
    name?: string;
    value?: string;
}

export interface ResultListUploadFileDetailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: UploadFileDetailDTO[];
}

export interface UploadFileDetailDTO {
    /** @format int64 */
    id?: number;
    fileRelativePath?: string;
    aiAnalysisDocument?: AiAnalysisDocumentDTO;
    metaDatas?: string;
    name?: string;
    fileType?: string;
    /** @format int64 */
    parentId?: number;
}

export interface QueryFileOverviewRequestDTO {
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
    userId?: string;
    fileUploadStatus?: string[];
    fileName?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface PageUploadFileDTO {
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
    content?: UploadFileDTO[];
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

export interface ResultPageUploadFileDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PageUploadFileDTO;
}

export interface UploadFileDTO {
    uploadStatus?: string;
    /** @format int32 */
    filesCount?: number;
    hasFilesCount?: boolean;
    uploadId?: string;
    uploadPath?: string;
    nuxeoPath?: string;
    /** @format date-time */
    createdDate?: string;
}

/** Preview Document (Request) */
export interface PreviewDocumentReq {
    /** Parent Document */
    parentDocPath?: string;
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
    watermarkTemplateId?: string;
    /** Document Template ID */
    documentTemplateId?: string;
    title?: string;
}

/** Create office file request body */
export interface OfficeFileCreateDTO {
    path?: string;
    fileName?: string;
    /** @format int32 */
    fileType?: number;
    documentType?: string;
    metaData?: string;
}

/** Office RequestDTO */
export interface OfficeRequestDTO {
    /** Document ID or Path */
    idOrPath?: string;
    /** Version Number */
    version?: string;
}

export interface ResultListFileDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FileDTO[];
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

/** Download File (Request) */
export interface DownloadFileRequestDTO {
    /** Document ID */
    documentId?: string;
    /** Intranet URI */
    intranetUri?: string;
    /** File Name */
    name?: string;
}

export interface ResultDocStructureResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Document (Request) */
    data?: DocStructureResponseDTO;
}

export interface WatermarkDocumentRequestDTO {
    /** Parent Document */
    parentDocPath?: string;
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
    /** Watermark Template Id */
    watermarkTemplateId?: string;
    /** Origin Document Id */
    originDocumentId?: string;
    title?: string;
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
    /** Document source modified date */
    fileModifiedDate?: string;
    /** Document create date */
    createdDate?: string;
    /**
     * Document content size
     * @format double
     */
    fileSize?: number;
    source?: string;
    uploadId?: string;
    mimeType?: string;
    documentType?: string;
    docPalType?: string;
    contributors?: string[];
    tags?: string[];
    version?: string;
    collections?: Record<string, string>[];
}

export interface PaginableEntityDTODocumentThumbnailDTO {
    entryList?: DocumentThumbnailDTO[];
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    currentPageIndex?: number;
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginableEntityDTODocumentThumbnailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTODocumentThumbnailDTO;
}

export interface FileCheckElementDTO {
    /** @format int64 */
    id?: number;
    docName?: string;
}

export interface FileCheckRequestDTO {
    uploadId?: string;
    fileCheckList?: FileCheckElementDTO[];
}

export interface FileCheckResultDTO {
    checkSuccessList?: FileCheckElementDTO[];
    checkFailedList?: FileCheckElementDTO[];
}

export interface ResultFileCheckResultDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FileCheckResultDTO;
}

export interface FileConfirmDTO {
    /** @format int64 */
    id?: number;
    docName?: string;
    metadatas?: string;
    documentType?: string;
}

export interface FileConfirmRequestDTO {
    userId?: string;
    uploadId?: string;
    fileConfirmDTOList?: FileConfirmDTO[];
}

/** Audit Trial Log Entry */
export interface LogEntryDTO {
    /**
     * Log Entry ID
     * @format int32
     */
    id?: number;
    /**
     * Log D
     * @format date-time
     */
    logDate?: string;
    /** Log Action */
    action?: string;
    /** Log Entry Log In */
    username?: string;
    /** Log Entry category */
    cagetory?: string;
    /** Log Entry Comment */
    comment?: string;
    /** Log Entry Item State */
    state?: string;
}

export interface ResultListLogEntryDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: LogEntryDTO[];
}

export interface AttachmentUpdateResponseDTO {
    documentId?: string;
    updateStatus?: string;
}

export interface ResultAttachmentUpdateResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AttachmentUpdateResponseDTO;
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

export interface FileTemplateRecord {
    /** @format int64 */
    id?: number;
    conversionId?: string;
    templateName?: string;
    templateTargetName?: string;
    templateLocalPath?: string;
    templatePath?: string;
    userId?: string;
    userEmail?: string;
    status?: string;
    /** @format date-time */
    fileCreatedDate?: string;
    fileType?: string;
    params?: string;
    fileName?: string;
    documentLocalPath?: string;
    idOrPath?: string;
}

export interface ResultFileTemplateRecord {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FileTemplateRecord;
}

/** Conversion (Request) */
export interface ConversionFileRequestDTO {
    /** File ID or Path */
    idOrPath?: string;
    /** targetFileType */
    targetFileType?: string;
    /** fileType */
    fileType?: string;
    /** operation */
    operation?: string;
    /** label */
    label?: string;
}

export interface FileConversionRecord {
    /** @format int64 */
    id?: number;
    conversionId?: string;
    documentId?: string;
    userId?: string;
    userEmail?: string;
    documentPath?: string;
    status?: string;
    /** @format date-time */
    fileCreatedDate?: string;
    fileType?: string;
    targetFileType?: string;
    operation?: string;
    fileName?: string;
    isExpired?: boolean;
    idOrPath?: string;
}

export interface ResultListFileConversionRecord {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FileConversionRecord[];
}

/** Comment (Request) */
export interface CommentRequestDTO {
    /** Document ID or path */
    documentIdOrPath?: string;
    /** Comment ID */
    commentId?: string;
    /** Comment Parent ID */
    parentId?: string;
    /** Comment Text */
    text?: string;
    /**
     * Page Size
     * @format int64
     */
    pageSize?: number;
    /**
     * Current Page Index
     * @format int64
     */
    currentPageIndex?: number;
}

/** Comment */
export interface CommentDTO {
    /** Comment ID */
    id?: string;
    /** Comment Parent ID */
    parentId?: string;
    /** Comment Text */
    text?: string;
    /** Comment Author */
    author?: string;
    /**
     * Comment Creation Date
     * @format date-time
     */
    creationDate?: string;
    /**
     * Comment Modification Date
     * @format date-time
     */
    modificationDate?: string;
}

export interface ResultCommentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Comment */
    data?: CommentDTO;
}

export interface ResultListCommentDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CommentDTO[];
}

/** Collection (Request) */
export interface CollectionRequestDTO {
    /** Collection ID or Path */
    idOrPath?: string;
    /** Collection Name */
    name?: string;
    /** Collection Description */
    description?: string;
    /**
     * The selected page index
     * @format int32
     */
    currentPageIndex?: number;
    /**
     * The number of entries per page
     * @format int32
     */
    pageSize?: number;
}

export interface EntityVODocumentThumbnailDTO {
    entryList?: DocumentThumbnailDTO[];
}

export interface ResultEntityVODocumentThumbnailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EntityVODocumentThumbnailDTO;
}

/** Collection of Documents (Request) */
export interface DocumentCollectionRequestDTO {
    /** Document (Request) */
    collection?: DocumentRequestDTO;
    /** Documents */
    documents?: DocumentRequestDTO[];
}

/** Annotation Object */
export interface AnnotationObject {
    /**
     * Page number the object is at
     * @format int64
     */
    page?: number;
    /**
     * Opacity of the annotation object
     * @format double
     */
    opacity?: number;
    /** Annotation objec type */
    type?: string;
    /** Annotation object color */
    color?: string;
    /** Annotation object paths */
    paths?: string;
}

/** Annotation */
export interface AnnotationRequestDTO {
    /** Annotation ID */
    id?: string;
    /** Document ID or path */
    documentIdOrPath?: string;
    /** Document property xpath */
    xpath?: string;
    /** Creator user ID */
    createdBy?: string;
    /** Modifier user ID */
    modifiedBy?: string;
    /** Annotation Object */
    object?: AnnotationObject;
    /** Annotation comment list */
    comments?: CommentDTO[];
    /**
     * Creation date
     * @format date-time
     */
    creationDate?: string;
    /**
     * Modification date
     * @format date-time
     */
    modificationDate?: string;
}

/** Annotation */
export interface AnnotationDTO {
    /** Annotation ID */
    id?: string;
    /** Document ID or path */
    documentIdOrPath?: string;
    /** Document property xpath */
    xpath?: string;
    /** Creator user ID */
    createdBy?: string;
    /** Modifier user ID */
    modifiedBy?: string;
    /** Annotation Object */
    object?: AnnotationObject;
    /** Annotation comment list */
    comments?: CommentDTO[];
    /**
     * Creation date
     * @format date-time
     */
    creationDate?: string;
    /**
     * Modification date
     * @format date-time
     */
    modificationDate?: string;
}

export interface ResultListAnnotationDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AnnotationDTO[];
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
    logicalPath?: string;
    /** @format int64 */
    fileSize?: number;
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

export interface ResultPageBusinessResultRecord {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PageBusinessResultRecord;
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

export interface ResultListTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: TaskDTO[];
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
    /** Process Definition Version ID */
    processDefinitionVersionId?: string;
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
    businessKey?: string;
    processDefinitionName?: string;
    startUserId?: string;
    createDateStr?: string;
    dueDateStr?: string;
    variables?: Record<string, object>;
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

export interface ResultTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Task */
    data?: TaskDTO;
}

export interface DocPalDocumentType {
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

export interface AdhocApprovalDTO {
    /** @format int64 */
    id?: number;
    documentId?: string;
    documentPath?: string;
    documentStartVersion?: string;
    documentApprovalVersion?: string;
    /** @format int32 */
    documentStatus?: number;
    taskId?: string;
    taskName?: string;
    businessKey?: string;
    processInstanceId?: string;
    /** @format int32 */
    processInstanceStatus?: number;
    user_creator_id?: string;
    /** @format date-time */
    startTime?: string;
    approvedBy?: string;
    user_approver_id?: string;
    /** @format date-time */
    approvedDate?: string;
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    orderBy?: string;
    isDesc?: boolean;
    isComplete?: boolean;
    participant?: string;
    /**
     * Page Index
     * @deprecated
     * @format int32
     */
    pageIndex?: number;
}

export interface PaginableEntityDTOObject {
    entryList?: object[];
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    currentPageIndex?: number;
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginableEntityDTOObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTOObject;
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

export interface ResultProcessDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Process Definition */
    data?: ProcessDTO;
}

export interface ResultInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Process Instance */
    data?: InstanceDTO;
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

export interface ConditionValidationReq {
    processDefinitionKey?: string;
    processInstanceId?: string;
    validationData?: Record<string, object>;
    conditionRules?: Record<string, string>[][];
}

/** Workflow History (Request) */
export interface WorkflowHistoryRequestDTO {
    /** Process Keys */
    processKeys?: string[];
    /** Process Definition ID */
    processDefinitionId?: string;
    /** Process Instance ID */
    processInstanceId?: string;
    /** Business Key */
    businessKey?: string;
    /** Execution ID */
    executionId?: string;
    /** User ID */
    userId?: string;
    /** Is Completed */
    completed?: boolean;
    /** Created Date */
    createdDate?: string[];
    /** End Date */
    endDate?: string[];
    /**
     * Page Index
     * @format int32
     */
    pageIndex?: number;
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
    /** @uniqueItems true */
    orderList?: string[];
}

export interface PaginableEntityDTOInstanceDTO {
    entryList?: InstanceDTO[];
    /** @format int32 */
    currentPageSize?: number;
    /** @format int32 */
    currentPageIndex?: number;
    /** @format int32 */
    totalSize?: number;
    /** @format int32 */
    pageCount?: number;
    isNextPageAvailable?: boolean;
}

export interface ResultPaginableEntityDTOInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTOInstanceDTO;
}

export interface ResultListObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: object[];
}

export interface HistoricProcessInstanceEntityImpl {
    endActivityId?: string;
    businessKey?: string;
    businessStatus?: string;
    startUserId?: string;
    startActivityId?: string;
    superProcessInstanceId?: string;
    tenantId?: string;
    name?: string;
    localizedName?: string;
    description?: string;
    localizedDescription?: string;
    processDefinitionKey?: string;
    processDefinitionName?: string;
    /** @format int32 */
    processDefinitionVersion?: number;
    deploymentId?: string;
    callbackId?: string;
    callbackType?: string;
    referenceId?: string;
    referenceType?: string;
    propagatedStageInstand?: string;
    queryVariables?: Record<string, object>[];
    id?: string;
    processInstanceId?: string;
    processDefinitionId?: string;
    processDefinitionVersionId?: string;
    /** @format date-time */
    startTime?: string;
    /** @format int32 */
    revision?: number;
    originalPersistentState?: object;
    /** @format date-time */
    endTime?: string;
    /** @format int64 */
    durationInMillis?: number;
    deleteReason?: string;
    propagatedStageInstanceId?: object;
    processVariables?: Record<string, object>;
    persistentState?: Record<string, object>;
    updated?: boolean;
    deleted?: boolean;
    idPrefix?: string;
    inserted?: boolean;
    /** @format int32 */
    revisionNext?: number;
    durationInMillisStr?: string;
    startTimeStr?: string;
    endTimeStr?: string;
    taskDefinitionKey?: string;
}

export interface PaginationDTOHistoricProcessInstanceEntityImpl {
    entryList?: HistoricProcessInstanceEntityImpl[];
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

export interface ResultPaginationDTOHistoricProcessInstanceEntityImpl {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOHistoricProcessInstanceEntityImpl;
}

export interface ResultMapStringString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, string>;
}

export interface JSONObject {
    empty?: boolean;
    [key: string]: any;
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
    name?: string;
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
    folder?: boolean;
}

export interface DirectoryEntry {
    id?: string;
    directoryName?: string;
    properties?: Record<string, object>;
    "entity-type"?: string;
}

export interface DocPalTypeMetadataDTO {
    id?: string;
    docpalType?: string;
    metaData?: string;
    metaDataType?: string;
    isRequire?: boolean;
    display?: boolean;
    /** @format int32 */
    status?: number;
    dataType?: string;
    values?: Record<string, object>[];
    options?: MSOptions;
    directoryEntries?: DirectoryEntry[];
}

export interface MSOptions {
    dropdownType?: string;
    vocabulary?: string;
    masterTable?: string;
    masterTableColumn?: string;
    documentType?: string;
    displayField?: string;
    multiple?: boolean;
    /** @format int32 */
    length?: number;
    regex?: string;
    formatDate?: string;
}

export interface ResultListDocPalTypeMetadataDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeMetadataDTO[];
}

export interface TemplateRequestDTO {
    id?: string;
    subject?: boolean;
    variables?: Record<string, object>;
}

export interface FunctionListEntity {
    restrictions?: Restrictions[];
}

export interface Restrictions {
    name?: string;
    url?: string;
    params?: Record<string, string>;
}

export interface SystemFeatureRequestDTO {
    /** @format int64 */
    id?: number;
    featureKey?: string;
    featureName?: string;
    featureDes?: string;
    functionList?: FunctionListEntity;
    mandatory?: boolean;
    sign?: string;
    status?: string;
    site?: string;
    createBy?: string;
    /** @format date-time */
    createTime?: string;
    /** @format date-time */
    modifiedTime?: string;
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

/** Retention Policy Document RequestDTO */
export interface RetentionPolicyDocumentRequestDTO {
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
    /** the name of retention policy */
    policyName?: string;
    /** the status of retention policy */
    status?: string;
    /** ApprovalId list */
    approvalIds?: string[];
    /** the list of retention policy id */
    retentionPolicyIds?: number[];
    /**
     * Retention policy event id
     * @format int64
     */
    eventId?: number;
    /** Document ID */
    documentId?: string;
    /** Document Name */
    documentName?: string;
    /** Apply By */
    applyBy?: string;
    /** The Retention Policy Document Status List */
    states?: string[];
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface ResultRetentionPolicyDocument {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: RetentionPolicyDocument;
}

export interface RetentionPolicyDocument {
    /** @format int64 */
    id?: number;
    /** @format int64 */
    policyRetentionId?: number;
    documentId?: string;
    documentName?: string;
    documentPath?: string;
    applyBy?: string;
    /** @format date-time */
    applyDate?: string;
    applyApprovedBy?: string;
    /** @format date-time */
    applyApprovedDate?: string;
    applyProcessInstanceId?: string;
    removeBy?: string;
    /** @format date-time */
    removeDate?: string;
    status?: string;
    /** @format date-time */
    expireDate?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    policyName?: string;
    approver?: string;
}

export interface PaginationDTORetentionPolicyDocument {
    entryList?: RetentionPolicyDocument[];
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

export interface ResultPaginationDTORetentionPolicyDocument {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTORetentionPolicyDocument;
}

/** HoldPolicy Document RequestDTO */
export interface PolicyDocumentRequestDTO {
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
    /** Document ID */
    documentId?: string;
    /**
     * HoldPolicy ID
     * @format int64
     */
    holdPolicyId?: number;
    /** The apply approved By */
    applyApprovedBy?: string;
    /** apply reason */
    applyReason?: string;
    /** remove reason */
    removeReason?: string;
    /** The remove approved By */
    removeApprovedBy?: string;
    /** apply By */
    applyBys?: string[];
    /** apply approved by */
    applyApprovedBys?: string[];
    /** Hold Policy ID list */
    holdPolicyIds?: number[];
    /** The Policy Document Status List */
    states?: string[];
    /**
     * ID
     * @format int64
     */
    id?: number;
    /** Document name */
    documentName?: string;
    /** Document path */
    documentPath?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface PolicyDocument {
    /** @format int64 */
    id?: number;
    /** @format int64 */
    policyHoldId?: number;
    documentId?: string;
    documentName?: string;
    documentPath?: string;
    applyBy?: string;
    /** @format date-time */
    applyDate?: string;
    applyReason?: string;
    applyApprovedBy?: string;
    /** @format date-time */
    applyApprovedDate?: string;
    applyProcessInstanceId?: string;
    removeBy?: string;
    /** @format date-time */
    removeDate?: string;
    removeReason?: string;
    removeApprovedBy?: string;
    /** @format date-time */
    removeApprovedDate?: string;
    removeProcessInstanceId?: string;
    status?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    policyHoldName?: string;
}

export interface ResultPolicyDocument {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PolicyDocument;
}

export interface PaginationDTOPolicyDocument {
    entryList?: PolicyDocument[];
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

export interface ResultPaginationDTOPolicyDocument {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOPolicyDocument;
}

export interface NotificationRecord {
    /** @format int64 */
    id?: number;
    scope?: string;
    realm?: string;
    functionPoint?: string;
    content?: string;
    description?: string;
    receiveId?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    sortBy?: string;
}

export interface NotificationSubscriberRequestDTO {
    /** @format int64 */
    id?: number;
    subscriber?: string;
    businessId?: string;
    businessPath?: string;
    /** @format date-time */
    createdDate?: string;
    idOrPath?: string;
}

export interface NotificationSubscriber {
    /** @format int64 */
    id?: number;
    subscriber?: string;
    businessId?: string;
    businessPath?: string;
    /** @format date-time */
    createdDate?: string;
}

export interface QueryNotificationRequestDTO {
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
    description?: string;
    creator?: string;
    readStatus?: string;
    type?: string;
    action?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface NotificationInfoDTO {
    /** @format int64 */
    id?: number;
    description?: string;
    creator?: string;
    receiver?: string;
    /** @format int64 */
    createdDateTimestamp?: number;
    type?: string;
    operate?: string;
    readStatus?: string;
    content?: string;
}

export interface PaginationDTONotificationInfoDTO {
    entryList?: NotificationInfoDTO[];
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

export interface ResultPaginationDTONotificationInfoDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTONotificationInfoDTO;
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
    /** Create by list */
    createdBys?: string[];
    /** New Data List */
    data?: Record<string, object>[];
    /** Where Condition */
    where?: Record<string, object>;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface ResultListMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object>[];
}

export interface DeleteMTRecordRequestDTO {
    tableId?: string;
    recordIds?: string[];
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
    sortOrder?: string;
    descSort?: SortObject;
}

export interface NestedSearchLogV2 {
    searchRequest?: SearchRequestDTO;
    /** @format int64 */
    totalSize?: number;
    /** @format int64 */
    eventTimestamp?: number;
}

export interface PaginationDTONestedSearchLogV2 {
    entryList?: NestedSearchLogV2[];
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

export interface ResultPaginationDTONestedSearchLogV2 {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTONestedSearchLogV2;
}

export interface NestedSearchLog {
    /** NestedSearch (Request) */
    searchRequestDTO?: NestedSearchRequestDTO;
    /** @format int64 */
    totalSize?: number;
    /** @format int64 */
    eventTimestamp?: number;
}

export interface PaginationDTONestedSearchLog {
    entryList?: NestedSearchLog[];
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

export interface ResultPaginationDTONestedSearchLog {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTONestedSearchLog;
}

export interface PaginationDTOESDocumentThumbnailDTO {
    entryList?: ESDocumentThumbnailDTO[];
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

export interface ResultPaginationDTOESDocumentThumbnailDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOESDocumentThumbnailDTO;
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
    /** @format int64 */
    biggerThenId?: number;
}

export interface InternalShareToMePageRequestDTO {
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
    sortByDesc?: string;
    sortByAsc?: string;
}

export interface InternalShareByGroupsRequestDTO {
    groupIds?: string[];
    permission?: string;
    isSendEmail?: boolean;
    documentIds?: string[];
    /** @format date-time */
    startDate?: string;
    /** @format date-time */
    expiredDate?: string;
}

export interface InternalShare {
    /** @format int64 */
    id?: number;
    internalShareId?: string;
    documentIds?: string;
    documentNames?: string;
    shareToUserIds?: string;
    shareByUserId?: string;
    permission?: string;
    /** @format date-time */
    startDate?: string;
    /** @format date-time */
    expiredDate?: string;
    isSendEmail?: boolean;
    /** @format date-time */
    createdDate?: string;
    createdUserId?: string;
    modifiedUserId?: string;
    /** @format date-time */
    modifiedDate?: string;
    shareGroupIds?: string;
    shareUserIds?: string;
    /** @format int32 */
    status?: number;
    isFolder?: boolean;
}

export interface ResultInternalShare {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: InternalShare;
}

export interface InternalShareRequestDTO {
    /** @format int64 */
    id?: number;
    internalShareId?: string;
    /** @uniqueItems true */
    documentIds?: string[];
    /** @uniqueItems true */
    shareToUserIds?: string[];
    shareByUserId?: string;
    permission?: string;
    /** @format date-time */
    startDate?: string;
    /** @format date-time */
    expiredDate?: string;
    /** @format date-time */
    endDate?: string;
    isSendEmail?: boolean;
    /** @format date-time */
    createdDate?: string;
    createdUserId?: string;
    modifiedUserId?: string;
    /** @format date-time */
    modifiedDate?: string;
    shareToGroupIds?: string[];
}

export interface InternalShareAudit {
    /** @format int64 */
    id?: number;
    internalShareId?: string;
    documentIds?: string;
    documentNames?: string;
    shareToUserIds?: string;
    shareByUserId?: string;
    permission?: string;
    /** @format date-time */
    startDate?: string;
    /** @format date-time */
    expiredDate?: string;
    isSendEmail?: boolean;
    /** @format date-time */
    createdDate?: string;
    createdUserId?: string;
    modifiedUserId?: string;
    /** @format date-time */
    modifiedDate?: string;
    shareGroupIds?: string;
    shareUserIds?: string;
    /** @format int32 */
    status?: number;
    isFolder?: boolean;
    documentId?: string;
    path?: string;
    type?: string;
}

export interface ResultInternalShareAudit {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: InternalShareAudit;
}

/** form design request */
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
    id?: string;
    /** Table Name */
    tableName?: string;
    /** Status is Active or Disable (A or D) */
    status?: string;
    /** New Data List */
    data?: Record<string, object>[];
    /** Where Condition */
    where?: Record<string, object>;
    /** Where Condition (Not Equal) */
    notEquals?: Record<string, object>;
    /** Where Condition (Equal) */
    equals?: Record<string, object>;
    /** Fuzzy Search */
    q?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface ResultListLinkedHashMapStringObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object>[];
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
    /** Case definition version Id */
    cmmnVersionId?: string;
    q?: string;
    /** Is need to detail */
    detail?: boolean;
    /** Where Condition */
    where?: Record<string, object>;
    businessKey?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
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
    /** Start Case Model Version */
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
    /** Where Condition (Not Equal) */
    notEquals?: Record<string, object>;
    /** Where Condition (Equal) */
    equals?: Record<string, object>;
    /** Where And Condition */
    andConditions?: WhereCondition[];
    c?: Record<string, object>;
    /** Fuzzy Search */
    q?: string;
    /** User */
    operator?: UserDTO;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

/** Start Case Model Version */
export interface CmmnVersion {
    id?: string;
    deploymentId?: string;
    caseTypeId?: string;
    versionNumber?: string;
    caseDefinitionId?: string;
    caseDefinitionKey?: string;
    productionVersion?: string;
    publishStatus?: string;
    bytes?: string[];
    styleJson?: string;
    primaryForm?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    production?: boolean;
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

/** Where And Condition */
export interface WhereCondition {
    columnName?: string;
    operator?: "EQ" | "NEQ" | "LIKE" | "IN" | "NOT_IN" | "NOT_EXIST" | "RANGE" | "GT" | "LT" | "GTE" | "LTE";
    value?: object;
    arrays?: object[];
    start?: object;
    end?: object;
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
    /** Name */
    name?: string;
    /** is enable */
    enable?: boolean;
    /** List of Case Type Id */
    caseIds?: string[];
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
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
    latestVersionId?: string;
    productionVersionId?: string;
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

export interface CaseTypeInfo {
    caseTypeId?: string;
    label?: string;
    metadata?: string;
    dataType?: string;
    options?: string;
    require?: boolean;
    status?: string;
}

/** Case Type Permission RequestDTO */
export interface CaseTypePermissionRequestDTO {
    userGroupId?: string;
    permissions?: Record<string, PlanTableFieldDTO[]>;
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
    latestVersionId?: string;
    productionVersion?: string;
    productionVersionId?: string;
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
    informations?: CaseTypeInfo[];
    permissions?: CaseTypePermissionRequestDTO[];
    startTask?: PlanItemDefinitionDTO[];
    /** Case Model Plan Form DTO */
    primaryForm?: CmmnPlanFormDTO;
}

/** Case Model Plan Form DTO */
export interface CmmnPlanFormDTO {
    id?: string;
    name?: string;
    type?: string;
    casetable?: string;
    fields?: PlanTableFieldDTO[];
    assigneeField?: PlanTableFieldDTO;
    isStartTask?: boolean;
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
    /** PlanItem Definition Rules or Behavior */
    rules?: Record<string, object>;
    /** PlanItem Definition Sub-List */
    subItems?: PlanItemDefinitionDTO[];
    /** Case Model Plan Form DTO */
    planForm?: CmmnPlanFormDTO;
    fields?: PlanTableFieldDTO[];
    assigneeField?: PlanTableFieldDTO;
    isStartTask?: boolean;
    upProcessTaskKey?: string;
    upFormProperties?: FormPropertyDTO[];
}

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

/** Case Instance TaskDTO (Request) */
export interface CaseInstanceTaskDTO {
    caseInstanceId?: string;
    planItemInstanceId?: string;
    taskId?: string;
    variables?: Record<string, object>;
    operator?: string;
    assignee?: string;
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
    /** Process Definition Version ID */
    processDefinitionVersionId?: string;
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
    businessKey?: string;
    processDefinitionName?: string;
    startUserId?: string;
    createDateStr?: string;
    dueDateStr?: string;
    variables?: Record<string, object>;
    state?: string;
    /** @format date-time */
    endTime?: string;
    /** @format int64 */
    durationInMillis?: number;
    caseDefinitionId?: string;
    caseInstanceId?: string;
    assignees?: string[];
    candidateGroups?: string[];
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
    sortOrder?: string;
    descSort?: SortObject;
}

/** Case Instance */
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
    planItemInstances?: PlanItemInstanceDTO[];
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
    businessKey?: string;
    operator?: string;
    variables?: Record<string, object>;
    /** Case Model Plan Form DTO */
    planForm?: CmmnPlanFormDTO;
    processInstanceId?: string;
    humanTaskId?: string;
}

export interface ResultCaseInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Instance */
    data?: CaseInstanceDTO;
}

/** PlanItem Instance (Request) */
export interface PlanItemInstanceRequestDTO {
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
    /** PlanItem Instance ID */
    id?: string;
    /** PlanItem Definition Type list */
    types?: string[];
    /** Case ID or alias business key */
    businessKey?: string;
    /** Case Instance ID */
    caseInstanceId?: string;
    /** Is Active */
    isActive?: boolean;
    /** Assignee User Id Or operator */
    assignee?: string;
    /** State */
    state?: string;
    /** Execution ID */
    executionId?: string;
    /** Reference ID */
    referenceId?: string;
    /** Request Variables */
    variables?: Record<string, object>;
    /** Execute Action */
    action?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface ResultListPlanItemInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PlanItemInstanceDTO[];
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
    processDefinitionKeys?: string[];
    q?: string;
    assignee?: string;
    candidateOrAssigned?: string;
    category?: string;
    workflow?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

export interface PaginationDTOCmmnTaskDTO {
    entryList?: CmmnTaskDTO[];
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

export interface ResultPaginationDTOCmmnTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginationDTOCmmnTaskDTO;
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
    id?: string;
    rootId?: string;
    metadataValue?: string;
    parentId?: string;
    label?: string;
    documentType?: string;
    documentPath?: string;
    folder?: boolean;
    allow?: boolean;
    multiple?: boolean;
    pathIds?: string;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    documentId?: string;
    /** The bind owners of this folder cabinet */
    binds?: FolderCabinetBinds[];
    /** choose metadata */
    metadata?: FCMetadata[];
    /** The label Rule list */
    labelRule?: string;
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
    /** @uniqueItems true */
    orderList?: string[];
    /** @format int32 */
    pageNum?: number;
    /** @format int32 */
    pageSize?: number;
}

/** Folder Cabinet ResponseDTO */
export interface DocFolderCabinetResponseDTO {
    /** FolderCabinet ID */
    id?: string;
    /** Document ID of Nuxeo */
    rootId?: string;
    /** The parent ID of this folder cabinet */
    parentId?: string;
    /** The templateId of this folder cabinet Template */
    templateId?: string;
    /** The name of folder cabinet */
    label?: string;
    /** The document type of nuxeo */
    documentType?: string;
    /** The document path of nuxeo */
    documentPath?: string;
    pathIds?: string;
    /** Whether it is a folder? */
    folder?: boolean;
    /** Whether it allow other document-type file? */
    allow?: boolean;
    /** Whether it allow multiple file? */
    multiple?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** @format date-time */
    refreshDate?: string;
    /** @format date-time */
    deadline?: string;
    state?: string;
    labelRule?: string;
    metadataValue?: string;
    repeatName?: boolean;
    complete?: boolean;
    binds?: FolderCabinetBinds[];
    children?: DocFolderCabinetResponseDTO[];
    documents?: DocumentDTO[];
    modifiedDateStr?: string;
    /** choose metadata */
    metadata?: FCMetadata[];
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
}

export interface ResultDocFolderCabinetResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Folder Cabinet ResponseDTO */
    data?: DocFolderCabinetResponseDTO;
}

/** Document Folder Cabinet RequestDTO */
export interface DocFolderCabinetRequestDTO {
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
    rootId?: string;
    templateId?: string;
    parentId?: string;
    label?: string;
    documentType?: string;
    documentPath?: string;
    folder?: boolean;
    allow?: boolean;
    multiple?: boolean;
    complete?: boolean;
    pathIds?: string;
    state?: string[];
    createdBy?: string[];
    metadataMap?: Record<string, string[]>;
    modifiedBy?: string;
    documentId?: string;
    documentIds?: string[];
    binds?: FolderCabinetBinds[];
    /** @uniqueItems true */
    orderList?: string[];
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
    jpasortOrderStr?: SortObject;
    nuxeoSortSql?: string;
    sort?: SortObject;
    sortOrder?: string;
    descSort?: SortObject;
}

/** Document Folder Cabinet RequestDTO */
export interface DFCRequestDTO {
    /** Parent Document */
    parentDocPath?: string;
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
    watermarkTemplateId?: string;
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
    title?: string;
}

export interface DFCNotificationConfig {
    folderCabinetId?: string;
    /** @format int32 */
    notificationReminder?: number;
    notificationTos?: string;
    /** @format int32 */
    reportDay?: number;
    reportTos?: string;
    reportCcs?: string;
    /** @format int32 */
    emailReminder?: number;
    tos?: string;
    ccs?: string;
}

export interface DocumentFolderCabinet {
    id?: string;
    templateId?: string;
    parentId?: string;
    pathIds?: string;
    label?: string;
    labelRule?: string;
    documentId?: string;
    documentType?: string;
    documentPath?: string;
    allow?: boolean;
    multiple?: boolean;
    state?: string;
    complete?: boolean;
    folder?: boolean;
    permission?: string;
    metadataValue?: string;
    repeatName?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    /** @format date-time */
    refreshDate?: string;
    /** @format date-time */
    deadline?: string;
    binds?: FolderCabinetBinds[];
    /** Document */
    documentDTO?: DocumentDTO;
    config?: DFCNotificationConfig;
    children?: DocumentFolderCabinet[];
}

export interface ResultDocumentFolderCabinet {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentFolderCabinet;
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

export interface AiSearchRequestDTO {
    idOrPath?: string;
    question?: string;
    topicId?: string;
}

export interface AiChatAnswerResponseDTO {
    searchResultType?: string;
    searchResult?: QdrantSearchResultDTO[];
    supportList?: string[];
    answer?: string;
    questionType?: string;
    /** @format int64 */
    answerId?: number;
}

export interface QdrantSearchPayloadDTO {
    id?: string;
    "ecm:title"?: string;
    "ecm:parentId"?: string;
}

export interface QdrantSearchResultDTO {
    payload?: QdrantSearchPayloadDTO;
    score?: number;
}

export interface ResultAiChatAnswerResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AiChatAnswerResponseDTO;
}

export interface AddAiCommentRequestDTO {
    /** @format int64 */
    answerId?: number;
}

/** Easy Share */
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

export interface UpdateAiDocumentRequestDTO {
    /** @format int64 */
    aiId?: number;
    documentType?: string;
    metaDatas?: MetadataVO[];
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

export interface ResultListVirtualFolderSettingResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: VirtualFolderSettingResponseDTO[];
}

export interface VirtualFolderSettingResponseDTO {
    id?: string;
    jsonValue?: string;
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

export interface ResultSmartFolderResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Smart Folder */
    data?: SmartFolderResponseDTO;
}

/** Smart Folder */
export interface SmartFolderResponseDTO {
    id?: string;
    name?: string;
    bind?: string;
    json_value?: string;
    userGroups?: string[];
}

export interface ResultListSmartFolderResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: SmartFolderResponseDTO[];
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

/** Aggregation Config */
export interface AggregationConfigResponseDTO {
    /** Aggregation id */
    id?: string;
    /** Aggregation description */
    description?: string;
    /** field */
    field?: string;
    /** Aggregation type */
    type?: string;
    /** The settings of range type */
    ranges?: Range[];
}

/** The settings of range type */
export interface Range {
    /** The key associated with the range aggregation. */
    rangeKey?: string;
    /** The description of key. */
    description?: string;
    /** The range type, include 'Range','UnboundedTo' and 'UnboundedFrom'. */
    rangeType?: string;
    /**
     * The starting value of the range.
     * @format double
     */
    from?: number;
    /**
     * The ending value of the range.
     * @format double
     */
    to?: number;
}

export interface ResultListAggregationConfigResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AggregationConfigResponseDTO[];
}

export interface NestedSearchLogRecord {
    /** @format int64 */
    id?: number;
    userId?: string;
    label?: string;
    queryCondition?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
}

export interface ResultListNestedSearchLogRecord {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: NestedSearchLogRecord[];
}

/** Aggregation (Request) */
export interface AggregationRequestDTO {
    /** Aggregation name. */
    aggName?: string;
    /** The values of terms, 'range','date_histogram', etc. */
    values?: string[];
}

/** DocPal search (Request) */
export interface DocPalSearchRequestDTO {
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
    /** Search text */
    searchText?: string;
    /** Include full text search,all meta or ocr content */
    textSearchType?: string;
    /** The name of elastic page provider. */
    elasticPageProviderName?: string;
    /** aggregation request parameters */
    aggregations?: AggregationRequestDTO[];
}

/** Aggregation */
export interface AggregationResponseDTO {
    /** Aggregation id */
    id?: string;
    /** field */
    field?: string;
    /** Aggregation type */
    type?: string;
    /** The buckets in the aggregation */
    buckets?: BucketResponseDTO[];
}

export type AggregationsContainerObject = object;

/** Bucket */
export interface BucketResponseDTO {
    /** Bucket key */
    key?: string;
    /**
     * The doc count in the bucket
     * @format int32
     */
    docCount?: number;
    /** Range from */
    from?: string;
    /** Range to */
    to?: string;
}

/** SearchHit */
export interface ESSearchResultResponseDTO {
    /**
     * The results count
     * @format int64
     */
    resultsCount?: number;
    /** The search hits */
    searchHits?: SearchHitObject[];
    /** The aggregations */
    aggregations?: AggregationResponseDTO[];
}

export interface EntryOption {
    text?: string;
    /** @format int32 */
    offset?: number;
    /** @format int32 */
    length?: number;
    options?: Option[];
}

export interface Explanation {
    match?: boolean;
    /** @format double */
    value?: number;
    description?: string;
    details?: Explanation[];
}

export interface NestedMetaData {
    field?: string;
    /** @format int32 */
    offset?: number;
    child?: NestedMetaData;
}

export interface Option {
    text?: string;
    highlighted?: string;
    /** @format float */
    score?: number;
    collateMatch?: boolean;
}

export interface ResultESSearchResultResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** SearchHit */
    data?: ESSearchResultResponseDTO;
}

/** The search hits */
export interface SearchHitObject {
    index?: string;
    id?: string;
    /** @format float */
    score?: number;
    sortValues?: object[];
    content?: object;
    highlightFields?: Record<string, string[]>;
    innerHits?: Record<string, SearchHitsObject>;
    nestedMetaData?: NestedMetaData;
    routing?: string;
    explanation?: Explanation;
    matchedQueries?: string[];
}

export interface SearchHitsObject {
    aggregations?: AggregationsContainerObject;
    /** @format float */
    maxScore?: number;
    searchHits?: SearchHitObject[];
    /** @format int64 */
    totalHits?: number;
    totalHitsRelation?: "EQUAL_TO" | "GREATER_THAN_OR_EQUAL_TO" | "OFF";
    suggest?: Suggest;
    empty?: boolean;
}

export interface Suggest {
    suggestions?: SuggestionEntryOption[];
}

export interface SuggestionEntryOption {
    name?: string;
    /** @format int32 */
    size?: number;
    entries?: EntryOption[];
}

export interface EasyShareDocumentResponseDTO {
    path?: string;
    type?: string;
    state?: string;
    lockOwner?: string;
    lockCreated?: string;
    versionLabel?: string;
    isCheckedOut?: string;
    lastModified?: string;
    contextParameters?: Record<string, object>;
    changeToken?: string;
    facets?: string[];
    parentRef?: string;
    uid?: string;
    title?: string;
    name?: string;
    retainUntil?: string;
    versionableId?: string;
    watermarkTemplateId?: string;
    watermarkStatus?: string;
    readOnly?: boolean;
    fileExtension?: string;
    fileSize?: string;
    id?: string;
    lock?: string;
    locked?: boolean;
    checkedOut?: boolean;
    record?: boolean;
    underRetentionOrLegalHold?: boolean;
    version?: boolean;
    proxy?: boolean;
    trashed?: boolean;
    "entity-type"?: string;
    repository?: string;
    properties?: Record<string, object>;
    isProxy?: boolean;
    isTrashed?: boolean;
    isRecord?: boolean;
    hasLegalHold?: boolean;
    isUnderRetentionOrLegalHold?: boolean;
    isVersion?: boolean;
}

export interface ResultEasyShareDocumentResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EasyShareDocumentResponseDTO;
}

export interface ResultListEasyShareDocumentResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: EasyShareDocumentResponseDTO[];
}

export interface MQProperties {
    name?: string;
    consumerName?: string;
    groupName?: string;
}

export interface ResultMapStringMQProperties {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, MQProperties>;
}

export interface DocumentType {
    name?: string;
    parent?: string;
    /** @uniqueItems true */
    schemas?: string[];
    /** @uniqueItems true */
    subtypes?: string[];
}

export interface ResultListDocumentType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentType[];
}

export interface AiAnalysisDocumentVO {
    documentType?: string;
    metaDatas?: MetadataVO[];
    /** @format int64 */
    aiId?: number;
}

export interface ResultAiAnalysisDocumentVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AiAnalysisDocumentVO;
}

export interface ResultMapStringListObject {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, object[]>;
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

export interface MetadataSetting {
    /** @format int64 */
    id?: number;
    documentType?: string;
    metaData?: string;
    dataType?: string;
    operation?: string;
    isRequire?: boolean;
    display?: boolean;
    /** @format int32 */
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

/** Process Instance Information */
export interface ProcessInstanceDTO {
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
}

export interface ResultProcessInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Process Instance Information */
    data?: ProcessInstanceDTO;
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
    /** @format int32 */
    version?: number;
    resourceName?: string;
    deploymentId?: string;
    diagramResourceName?: string;
    description?: string;
    userTasks?: UserTaskDTO[];
    permissions?: Record<string, string>[];
    fcDataMapping?: Record<string, string>[];
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

export interface ResultListUserTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: UserTaskDTO[];
}

export interface ResultLinkedHashSetString {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** @uniqueItems true */
    data?: string[];
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

export interface Content {
    type?: string;
    format?: string;
    text?: string;
}

export interface MessageTemplateDTO {
    name?: string;
    parameter_format?: string;
    language?: string;
    status?: string;
    category?: string;
    id?: string;
    components?: Content[];
}

export interface ResultListMessageTemplateDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MessageTemplateDTO[];
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
    folder?: boolean;
}

export interface ResultDocPalTypeResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeResponseDTO;
}

export interface DocPalTypeRelated {
    id?: string;
    docPalTypeId?: string;
    rootDocPalType?: string;
    metaData?: string;
    docPalType?: string;
}

export interface ResultListDocPalTypeRelated {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeRelated[];
}

export interface DocPalTypeDistinction {
    oldDocPalType?: string;
    newDocPalType?: string;
    intersection?: string[];
    destruction?: string[];
    addition?: string[];
}

export interface ResultDocPalTypeDistinction {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocPalTypeDistinction;
}

export interface ResultMapStringBoolean {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, boolean>;
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

export interface ResultListRetentionPolicy {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: RetentionPolicy[];
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

export interface ResultListRetentionPolicyEvent {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: RetentionPolicyEvent[];
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

export interface ResultMapLongListRetentionPolicyEvent {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, RetentionPolicyEvent[]>;
}

/** Document Folder Cabinet Condition ResponseDTO */
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

export interface ResultListHoldPolicy {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: HoldPolicy[];
}

export interface ResultHoldPolicy {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: HoldPolicy;
}

export interface PersonalLandingResponseDTO {
    /** @format int64 */
    id?: number;
    type?: string;
    styleJson?: string;
}

export interface ResultPersonalLandingResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PersonalLandingResponseDTO;
}

export interface NotificationUnreadCountDTO {
    /** @format int32 */
    unreadCount?: number;
    type?: string;
}

export interface ResultListNotificationUnreadCountDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: NotificationUnreadCountDTO[];
}

export interface CheckBoxDTO {
    isMultiple?: boolean;
    key?: string;
    label?: string;
    options?: OptionDTO[];
}

export interface ResultListCheckBoxDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CheckBoxDTO[];
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
    userId?: string;
    aces?: string;
    read?: boolean;
    edit?: boolean;
    create?: boolean;
    enable?: boolean;
}

export interface ResultListMasterTableResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: MasterTableResponseDTO[];
}

export interface ResultMasterTableResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Master Table ResponseDTO */
    data?: MasterTableResponseDTO;
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

/** Form Design Form Result List */
export interface EasyFormResult {
    /** Action Type, Example value： Email、Workflow、CaseType  */
    actionType?: string;
    /** Bound business Key, Example value：customApproval */
    actionKey?: string;
    /** DeploymentId of Bound business, Example value：customApproval:1:7212b388-36f3-4aff-9b03-bc500537dd23 */
    actionId?: string;
    /** Name of Bound business */
    actionName?: string;
    /** Mapping data structure between form columns and bound business fields */
    dataMapping?: ParamMappingDTO[];
    /** Status, Active or Deactivated */
    status?: string;
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

/** Mapping data structure between form columns and bound business fields */
export interface ParamMappingDTO {
    source?: string;
    target?: string;
}

export interface ResultListFormDesignResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FormDesignResponseDTO[];
}

export interface ResultFormDesignResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Form Designer (Response) */
    data?: FormDesignResponseDTO;
}

export interface DAMConversionSetting {
    /** @format int64 */
    id?: number;
    operation?: string;
    name?: string;
    sourceType?: string;
    targetType?: string;
    label?: string;
    description?: string;
}

export interface ResultMapStringListDAMConversionSetting {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: Record<string, DAMConversionSetting[]>;
}

export interface ResultListCaseType {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseType[];
}

export interface ResultListPlanItemDefinitionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PlanItemDefinitionDTO[];
}

export interface ResultCmmnPlanFormDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Model Plan Form DTO */
    data?: CmmnPlanFormDTO;
}

export interface ResultCaseTypeResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseTypeResponseDTO;
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

export interface ResultListCaseTable {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseTable[];
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
    accesstype?: string;
    fieldMappingId?: string;
    masterTable?: string;
    documentType?: string;
    displayField?: string;
    vocabulary?: string;
    require?: string;
    readOnly?: string;
    value?: object;
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

export interface ResultCmmnInstance {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnInstance;
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

/** Case Model Data Filter Permission DTO */
export interface CmmnDataFilterPermission {
    userGroupId?: string;
    metadata?: string;
    conditionType?: string;
    fieldValue?: string;
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

export interface ResultListCaseDefinitionDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseDefinitionDTO[];
}

export interface ResultListCaseInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CaseInstanceDTO[];
}

export interface ResultCmmnDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnDashboard;
}

export interface ResultListCmmnDashboard {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: CmmnDashboard[];
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

export interface Document {
    path?: string;
    type?: string;
    state?: string;
    lockOwner?: string;
    lockCreated?: string;
    versionLabel?: string;
    isCheckedOut?: string;
    lastModified?: string;
    contextParameters?: Record<string, object>;
    changeToken?: string;
    facets?: string[];
    parentRef?: string;
    uid?: string;
    title?: string;
    name?: string;
    retainUntil?: string;
    versionableId?: string;
    id?: string;
    lock?: string;
    locked?: boolean;
    checkedOut?: boolean;
    record?: boolean;
    underRetentionOrLegalHold?: boolean;
    version?: boolean;
    proxy?: boolean;
    trashed?: boolean;
    "entity-type"?: string;
    repository?: string;
    properties?: Record<string, object>;
    isProxy?: boolean;
    isTrashed?: boolean;
    isRecord?: boolean;
    hasLegalHold?: boolean;
    isUnderRetentionOrLegalHold?: boolean;
    isVersion?: boolean;
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
    pathIds?: string;
    /** Whether it is a folder? */
    folder?: boolean;
    /** Whether it allow other document-type file? */
    allow?: boolean;
    /** Whether it allow multiple file? */
    multiple?: boolean;
    createdBy?: string;
    modifiedBy?: string;
    /** @format date-time */
    createdDate?: string;
    /** @format date-time */
    modifiedDate?: string;
    complete?: boolean;
    binds?: FolderCabinetBinds[];
    /** choose metadata */
    metadata?: FCMetadata[];
    /** The label Rule list */
    labelRule?: string;
    metadataValue?: string;
    /** Email Reminder */
    notificationReminder?: FCReminder;
    /** Email Reminder */
    emailReport?: FCReminder;
    /** Email Reminder */
    emailReminder?: FCReminder;
    children?: FolderCabinetResponseDTO[];
    documents?: Document[];
    modifiedDateStr?: string;
    repeatName?: boolean;
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

export interface ResultListDocumentFolderCabinet {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentFolderCabinet[];
}

export interface ResultListFolderCabinetResponseDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: FolderCabinetResponseDTO[];
}

export interface AiTopicIdVO {
    topicId?: string;
}

export interface ResultAiTopicIdVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AiTopicIdVO;
}

export interface AiChatInitInfoVO {
    /** @format int32 */
    maxWordCount?: number;
    topicId?: string;
    questionList?: string[];
}

export interface ResultAiChatInitInfoVO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: AiChatInitInfoVO;
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

export interface ResultListHistoricProcessInstanceEntityImpl {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: HistoricProcessInstanceEntityImpl[];
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
            baseURL: axiosConfig.baseURL || "https://app4.wclsolution.com",
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
 * @title DocPal REST API
 * @version 0.0.1
 * @baseUrl https://app4.wclsolution.com
 *
 * DocPal REST API Documentation
 */
export class Client<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/${userId}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserSearchQuery
         * @summary Search users
         * @request GET:/api/nuxeo/user/search/{query}
         */
        getNuxeoUserSearchQuery: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/search/${query}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserSearchQuery
         * @summary Search users
         * @request POST:/api/nuxeo/user/search/{query}
         */
        postNuxeoUserSearchQuery: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/search/${query}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserSearchQueryDeprecate
         * @summary Search users
         * @request GET:/api/nuxeo/user/search/{query}/
         */
        getNuxeoUserSearchQueryDeprecate: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/search/${query}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserSearchQueryDeprecate
         * @summary Search users
         * @request POST:/api/nuxeo/user/search/{query}/
         */
        postNuxeoUserSearchQueryDeprecate: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/search/${query}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoTypesDocumenttype
         * @summary Get a document type
         * @request GET:/api/nuxeo/types/{documentType}
         */
        getNuxeoTypesDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoTypesDocumenttype
         * @summary Get a document type
         * @request POST:/api/nuxeo/types/{documentType}
         */
        postNuxeoTypesDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types/${documentType}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoTypesDocumenttypeDeprecate
         * @summary Get a document type
         * @request GET:/api/nuxeo/types/{documentType}/
         */
        getNuxeoTypesDocumenttypeDeprecate: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types/${documentType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoTypesDocumenttypeDeprecate
         * @summary Get a document type
         * @request POST:/api/nuxeo/types/{documentType}/
         */
        postNuxeoTypesDocumenttypeDeprecate: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types/${documentType}/`,
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
        getNuxeoTypes: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types`,
                method: "GET",
                query: query,
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
        postNuxeoTypes: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types`,
                method: "POST",
                query: query,
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
        getNuxeoTypesDeprecate: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types/`,
                method: "GET",
                query: query,
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
        postNuxeoTypesDeprecate: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/types/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoKeywordsDeprecate
         * @summary Get all keywords or a keyword
         * @request GET:/api/nuxeo/keywords/
         */
        getNuxeoKeywordsDeprecate: (
            query: {
                /** Keyword (Request) */
                keyword: KeywordRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keywords/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoKeywordsDeprecate
         * @summary Get all keywords or a keyword
         * @request POST:/api/nuxeo/keywords/
         */
        postNuxeoKeywordsDeprecate: (data: KeywordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keywords/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoKeywords
         * @summary Get all keywords or a keyword
         * @request GET:/api/nuxeo/keywords
         */
        getNuxeoKeywords: (
            query: {
                /** Keyword (Request) */
                keyword: KeywordRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keywords`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoKeywords
         * @summary Get all keywords or a keyword
         * @request POST:/api/nuxeo/keywords
         */
        postNuxeoKeywords: (data: KeywordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keywords`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoKeywordGroupsGroupname
         * @summary Get a keyword group
         * @request GET:/api/nuxeo/keyword/groups/{groupName}
         */
        getNuxeoKeywordGroupsGroupname: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups/${groupName}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoKeywordGroupsGroupname
         * @summary Get a keyword group
         * @request POST:/api/nuxeo/keyword/groups/{groupName}
         */
        postNuxeoKeywordGroupsGroupname: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups/${groupName}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoKeywordGroupsGroupnameDeprecate
         * @summary Get a keyword group
         * @request GET:/api/nuxeo/keyword/groups/{groupName}/
         */
        getNuxeoKeywordGroupsGroupnameDeprecate: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups/${groupName}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoKeywordGroupsGroupnameDeprecate
         * @summary Get a keyword group
         * @request POST:/api/nuxeo/keyword/groups/{groupName}/
         */
        postNuxeoKeywordGroupsGroupnameDeprecate: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups/${groupName}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoKeywordGroups
         * @summary Get all keyword groups
         * @request GET:/api/nuxeo/keyword/groups
         */
        getNuxeoKeywordGroups: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoKeywordGroups
         * @summary Get all keyword groups
         * @request POST:/api/nuxeo/keyword/groups
         */
        postNuxeoKeywordGroups: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoKeywordGroupsDeprecate
         * @summary Get all keyword groups
         * @request GET:/api/nuxeo/keyword/groups/
         */
        getNuxeoKeywordGroupsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoKeywordGroupsDeprecate
         * @summary Get all keyword groups
         * @request POST:/api/nuxeo/keyword/groups/
         */
        postNuxeoKeywordGroupsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/keyword/groups/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoIconDocumenttypeDeprecate
         * @summary Get the default icon of a document
         * @request GET:/api/nuxeo/icon/{documentType}/
         */
        getNuxeoIconDocumenttypeDeprecate: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/icon/${documentType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoIconDocumenttypeDeprecate
         * @summary Get the default icon of a document
         * @request POST:/api/nuxeo/icon/{documentType}/
         */
        postNuxeoIconDocumenttypeDeprecate: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/icon/${documentType}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoIconDocumenttype
         * @summary Get the default icon of a document
         * @request GET:/api/nuxeo/icon/{documentType}
         */
        getNuxeoIconDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/icon/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostNuxeoIconDocumenttype
         * @summary Get the default icon of a document
         * @request POST:/api/nuxeo/icon/{documentType}
         */
        postNuxeoIconDocumenttype: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/icon/${documentType}`,
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/form/metadata/list/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentTrashDeprecate
         * @summary Get trashed documents
         * @request GET:/api/nuxeo/document/trash/
         */
        getNuxeoDocumentTrashDeprecate: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
                uuid: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/trash/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentTrashDeprecate
         * @summary Get trashed documents
         * @request POST:/api/nuxeo/document/trash/
         */
        postNuxeoDocumentTrashDeprecate: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
                uuid: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/trash/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentTrashDeprecate
         * @summary Move a document to trash
         * @request DELETE:/api/nuxeo/document/trash/
         */
        deleteNuxeoDocumentTrashDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoDocumentTrash
         * @summary Get trashed documents
         * @request GET:/api/nuxeo/document/trash
         */
        getNuxeoDocumentTrash: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
                uuid: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/trash`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentTrash
         * @summary Get trashed documents
         * @request POST:/api/nuxeo/document/trash
         */
        postNuxeoDocumentTrash: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
                uuid: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/trash`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentTrash
         * @summary Move a document to trash
         * @request DELETE:/api/nuxeo/document/trash
         */
        deleteNuxeoDocumentTrash: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoDocumentFollowedDeprecate
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed/
         */
        getNuxeoDocumentFollowedDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFollowedDeprecate
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed/
         */
        postNuxeoDocumentFollowedDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentFollowedUserid
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed/{userId}
         */
        getNuxeoDocumentFollowedUserid: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFollowedUserid
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed/{userId}
         */
        postNuxeoDocumentFollowedUserid: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed/${userId}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentFollowed
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed
         */
        getNuxeoDocumentFollowed: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFollowed
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed
         */
        postNuxeoDocumentFollowed: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentFollowedUseridDeprecate
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed/{userId}/
         */
        getNuxeoDocumentFollowedUseridDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed/${userId}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFollowedUseridDeprecate
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed/{userId}/
         */
        postNuxeoDocumentFollowedUseridDeprecate: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/followed/${userId}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentFavoriteDeprecate
         * @summary Get documents from favorite
         * @request GET:/api/nuxeo/document/favorite/
         */
        getNuxeoDocumentFavoriteDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorite/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFavoriteDeprecate
         * @summary Get documents from favorite
         * @request POST:/api/nuxeo/document/favorite/
         */
        postNuxeoDocumentFavoriteDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorite/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentFavorite
         * @summary Get documents from favorite
         * @request GET:/api/nuxeo/document/favorite
         */
        getNuxeoDocumentFavorite: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorite`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFavorite
         * @summary Get documents from favorite
         * @request POST:/api/nuxeo/document/favorite
         */
        postNuxeoDocumentFavorite: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorite`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetNuxeoCollectionDeprecate
         * @summary Get user visible collections
         * @request GET:/api/nuxeo/collection/
         */
        getNuxeoCollectionDeprecate: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionDeprecate
         * @summary Get user visible collections
         * @request POST:/api/nuxeo/collection/
         */
        postNuxeoCollectionDeprecate: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PatchNuxeoCollectionDeprecate
         * @request PATCH:/api/nuxeo/collection/
         */
        patchNuxeoCollectionDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
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
        getNuxeoCollection: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection`,
                method: "GET",
                query: query,
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
        postNuxeoCollection: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PatchNuxeoCollection
         * @request PATCH:/api/nuxeo/collection
         */
        patchNuxeoCollection: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/candidatesByTaskDefinitionKey`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskCandidatesDeprecate
         * @summary Retrieve task candidates
         * @request GET:/api/docpal/workflow/task/candidates/
         */
        getWorkflowTaskCandidatesDeprecate: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/candidates/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskCandidatesDeprecate
         * @summary Retrieve task candidates
         * @request POST:/api/docpal/workflow/task/candidates/
         */
        postWorkflowTaskCandidatesDeprecate: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/candidates/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskCandidates
         * @summary Retrieve task candidates
         * @request GET:/api/docpal/workflow/task/candidates
         */
        getWorkflowTaskCandidates: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/candidates`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskCandidates
         * @summary Retrieve task candidates
         * @request POST:/api/docpal/workflow/task/candidates
         */
        postWorkflowTaskCandidates: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/candidates`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskAttachmentPreviewDeprecate
         * @summary Retrieve task attachment preview
         * @request GET:/api/docpal/workflow/task/attachment/preview/
         */
        getWorkflowTaskAttachmentPreviewDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/preview/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAttachmentPreviewDeprecate
         * @summary Retrieve task attachment preview
         * @request POST:/api/docpal/workflow/task/attachment/preview/
         */
        postWorkflowTaskAttachmentPreviewDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/preview/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskAttachmentPreview
         * @summary Retrieve task attachment preview
         * @request GET:/api/docpal/workflow/task/attachment/preview
         */
        getWorkflowTaskAttachmentPreview: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/preview`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAttachmentPreview
         * @summary Retrieve task attachment preview
         * @request POST:/api/docpal/workflow/task/attachment/preview
         */
        postWorkflowTaskAttachmentPreview: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/preview`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskAttachmentInfoDeprecate
         * @request GET:/api/docpal/workflow/task/attachment/info/
         */
        getWorkflowTaskAttachmentInfoDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/info/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAttachmentInfoDeprecate
         * @request POST:/api/docpal/workflow/task/attachment/info/
         */
        postWorkflowTaskAttachmentInfoDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/info/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskAttachmentInfo
         * @request GET:/api/docpal/workflow/task/attachment/info
         */
        getWorkflowTaskAttachmentInfo: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/info`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAttachmentInfo
         * @request POST:/api/docpal/workflow/task/attachment/info
         */
        postWorkflowTaskAttachmentInfo: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/info`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskAttachmentDeprecate
         * @summary Retrieve task attachment
         * @request GET:/api/docpal/workflow/task/attachment/
         */
        getWorkflowTaskAttachmentDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PutWorkflowTaskAttachmentDeprecate
         * @request PUT:/api/docpal/workflow/task/attachment/
         */
        putWorkflowTaskAttachmentDeprecate: (
            data: {
                attachmentId: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/`,
                method: "PUT",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAttachmentDeprecate
         * @summary Retrieve task attachment
         * @request POST:/api/docpal/workflow/task/attachment/
         */
        postWorkflowTaskAttachmentDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowTaskAttachmentDeprecate
         * @summary Delete an attachment
         * @request DELETE:/api/docpal/workflow/task/attachment/
         */
        deleteWorkflowTaskAttachmentDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTaskAttachment
         * @summary Retrieve task attachment
         * @request GET:/api/docpal/workflow/task/attachment
         */
        getWorkflowTaskAttachment: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PutWorkflowTaskAttachment
         * @request PUT:/api/docpal/workflow/task/attachment
         */
        putWorkflowTaskAttachment: (
            data: {
                attachmentId: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment`,
                method: "PUT",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAttachment
         * @summary Retrieve task attachment
         * @request POST:/api/docpal/workflow/task/attachment
         */
        postWorkflowTaskAttachment: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowTaskAttachment
         * @summary Delete an attachment
         * @request DELETE:/api/docpal/workflow/task/attachment
         */
        deleteWorkflowTaskAttachment: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/attachment`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PutNuxeoDocumentAclReplaceDeprecate
         * @summary Replace user permission on document
         * @request PUT:/api/nuxeo/document/acl/replace/
         */
        putNuxeoDocumentAclReplaceDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
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
         * @summary Replace user permission on document
         * @request PUT:/api/nuxeo/document/acl/replace
         */
        putNuxeoDocumentAclReplace: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoAdminSetting
         * @request GET:/api/nuxeo/admin/setting
         */
        getNuxeoAdminSetting: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
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
        putNuxeoAdminSetting: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoAdminIcon
         * @request GET:/api/nuxeo/admin/icon
         */
        getNuxeoAdminIcon: (
            query: {
                docTypeId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/admin/icon`,
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/user/setting`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalLandingController
         * @name PutPersonalLandingSave
         * @request PUT:/api/docpal/personal/landing/save
         */
        putPersonalLandingSave: (data: PersonalLandingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/personal/landing/save`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutNotificationIdStatusStatus
         * @summary Update status of notification record
         * @request PUT:/api/docpal/notification/{id}/status/{status}
         */
        putNotificationIdStatusStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/${id}/status/${status}`,
                method: "PUT",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutNotificationStatus
         * @summary Batch update status of notification record
         * @request PUT:/api/docpal/notification/status
         */
        putNotificationStatus: (data: NotificationRecordDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name PutNotificationSettingStatus
         * @summary Batch update status of notification setting
         * @request PUT:/api/docpal/notification/setting/status
         */
        putNotificationSettingStatus: (data: NotificationSetting[], params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/setting/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutNotificationDissmissByType
         * @request PUT:/api/docpal/notification/dissmiss_by_type
         */
        putNotificationDissmissByType: (data: NotificationManageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/dissmiss_by_type`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutNotificationDissmissByIds
         * @request PUT:/api/docpal/notification/dissmiss_by_ids
         */
        putNotificationDissmissByIds: (data: NotificationManageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/dissmiss_by_ids`,
                method: "PUT",
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PutMasterTablesIdBatchRecord
         * @request PUT:/api/docpal/master/tables/{id}/batch/record
         */
        putMasterTablesIdBatchRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/${id}/batch/record`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutMasterTablesForAdminIdBatchRecord
         * @request PUT:/api/docpal/master/tables/for_admin/{id}/batch/record
         */
        putMasterTablesForAdminIdBatchRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/for_admin/${id}/batch/record`,
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
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetWopiFilesIdContents
         * @request GET:/api/wopi/files/{id}/contents
         */
        getWopiFilesIdContents: (
            id: string,
            query: {
                access_token: string;
                fileType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/wopi/files/${id}/contents`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name PostWopiFilesIdContents
         * @request POST:/api/wopi/files/{id}/contents
         */
        postWopiFilesIdContents: (
            id: string,
            query: {
                fileType?: string;
                access_token: string;
                createVersion?: boolean;
            },
            data: {
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
            },
            params: RequestParams = {},
        ) =>
            this.request<GenerateDocumentMode, ResultString | (ResultString | Result)>({
                path: `/wopi/files/${id}/contents`,
                method: "POST",
                query: query,
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<GenerateDocumentMode, ResultString | (ResultString | Result)>({
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
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultString | (ResultString | Result)>({
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
            this.request<void, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultAccessControlPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultListAccessControlPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserInformation, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAccessControlEntry, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/permission/entry`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserResetpassword
         * @request POST:/api/nuxeo/user/resetPassword
         */
        postNuxeoUserResetpassword: (data: PasswordRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/resetPassword`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostNuxeoUserForgetpassword
         * @request POST:/api/nuxeo/user/forgetPassword
         */
        postNuxeoUserForgetpassword: (
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/forgetPassword`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name PostNuxeoTemplateSummitanddownloadfile
         * @summary Summit And Download File
         * @request POST:/api/nuxeo/template/summitAndDownloadFile
         */
        postNuxeoTemplateSummitanddownloadfile: (data: GenerateTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/template/summitAndDownloadFile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name PostNuxeoTemplateGettemplateparams
         * @summary GET Template Params
         * @request POST:/api/nuxeo/template/getTemplateParams
         */
        postNuxeoTemplateGettemplateparams: (data: GenerateTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringListString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/template/getTemplateParams`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name PostNuxeoTemplateGettemplatelist
         * @summary Obtain Document Template List
         * @request POST:/api/nuxeo/template/getTemplateList
         */
        postNuxeoTemplateGettemplatelist: (
            query?: {
                templateId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/template/getTemplateList`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostNuxeoTagsLabel
         * @summary fuzzy Query Tags by label
         * @request POST:/api/nuxeo/tags/label
         */
        postNuxeoTagsLabel: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags/label`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags/getAllTags`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostNuxeoTagsDeprecate
         * @summary Tag document with one or several 'tags'
         * @request POST:/api/nuxeo/tags/
         */
        postNuxeoTagsDeprecate: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name DeleteNuxeoTagsDeprecate
         * @summary Remove all document tags
         * @request DELETE:/api/nuxeo/tags/
         */
        deleteNuxeoTagsDeprecate: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PatchNuxeoTagsDeprecate
         * @summary Untag document from one or several 'tags'
         * @request PATCH:/api/nuxeo/tags/
         */
        patchNuxeoTagsDeprecate: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostNuxeoTags
         * @summary Tag document with one or several 'tags'
         * @request POST:/api/nuxeo/tags
         */
        postNuxeoTags: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name DeleteNuxeoTags
         * @summary Remove all document tags
         * @request DELETE:/api/nuxeo/tags
         */
        deleteNuxeoTags: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PatchNuxeoTags
         * @summary Untag document from one or several 'tags'
         * @request PATCH:/api/nuxeo/tags
         */
        patchNuxeoTags: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/tags`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostNuxeoSharePrepareDownload
         * @summary check download file is complete
         * @request POST:/api/nuxeo/share/prepare/download
         */
        postNuxeoSharePrepareDownload: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/share/prepare/download`,
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoShareNew
         * @summary generate share link
         * @request POST:/api/nuxeo/share/new
         */
        postNuxeoShareNew: (data: ShareRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEasyShareDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/share/new`,
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/share/get`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchSaveNestedSearchLog
         * @request POST:/api/nuxeo/search/save_nested_search_log
         */
        postNuxeoSearchSaveNestedSearchLog: (data: NestedSearchLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/save_nested_search_log`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchSavesearchhistory
         * @summary Save Search History
         * @request POST:/api/nuxeo/search/saveSearchHistory
         */
        postNuxeoSearchSavesearchhistory: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/saveSearchHistory`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchQuerysearchhistory
         * @summary Query Search History
         * @request POST:/api/nuxeo/search/querySearchHistory
         */
        postNuxeoSearchQuerysearchhistory: (params: RequestParams = {}) =>
            this.request<ResultListSearchHistory, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/querySearchHistory`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchNestedsearchV2
         * @summary Nested Search
         * @request POST:/api/nuxeo/search/nestedSearch_v2
         */
        postNuxeoSearchNestedsearchV2: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/nestedSearch`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchNestedsearchold
         * @summary Nested Search
         * @request POST:/api/nuxeo/search/nestedSearchOld
         * @deprecated
         */
        postNuxeoSearchNestedsearchold: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/nestedSearchOld`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchExportcsv
         * @summary export Nested Search
         * @request POST:/api/nuxeo/search/exportCsv
         */
        postNuxeoSearchExportcsv: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/exportCsv`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearchDeprecate
         * @summary Search Documents
         * @request POST:/api/nuxeo/search/
         */
        postNuxeoSearchDeprecate: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNuxeoSearch
         * @summary Search Documents
         * @request POST:/api/nuxeo/search
         */
        postNuxeoSearch: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search`,
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/restoreVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverSendWhatsappMessage
         * @request POST:/api/nuxeo/registeredServer/send_whatsapp_message
         */
        postNuxeoRegisteredserverSendWhatsappMessage: (data: WhatsAppMessageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSendMessageResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/send_whatsapp_message`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverSendMailText
         * @request POST:/api/nuxeo/registeredServer/send/mail/text
         */
        postNuxeoRegisteredserverSendMailText: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/send/mail/text`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverSendMailHtml
         * @request POST:/api/nuxeo/registeredServer/send/mail/html
         */
        postNuxeoRegisteredserverSendMailHtml: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/send/mail/html`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverSendMailAttachments
         * @request POST:/api/nuxeo/registeredServer/send/mail/attachments
         */
        postNuxeoRegisteredserverSendMailAttachments: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/send/mail/attachments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverSendMailAttachment
         * @request POST:/api/nuxeo/registeredServer/send/mail/attachment
         */
        postNuxeoRegisteredserverSendMailAttachment: (
            query: {
                mailSendRequest: MailSendRequest;
                multipartFiles: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/send/mail/attachment`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverPolicyRetentionsDocumentsApproval
         * @request POST:/api/nuxeo/registeredServer/policy/retentions/documents/approval
         */
        postNuxeoRegisteredserverPolicyRetentionsDocumentsApproval: (
            query: {
                processInstanceId: string;
                status: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/policy/retentions/documents/approval`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverPolicyDocumentsApproval
         * @request POST:/api/nuxeo/registeredServer/policy/documents/approval
         */
        postNuxeoRegisteredserverPolicyDocumentsApproval: (
            query: {
                processInstanceId: string;
                operation: string;
                status: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/policy/documents/approval`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverJudgeSaveProcessName
         * @request POST:/api/nuxeo/registeredServer/judge_save_process_name
         */
        postNuxeoRegisteredserverJudgeSaveProcessName: (data: WhatsAppUsageDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/judge_save_process_name`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverFormDesignSubmitData
         * @request POST:/api/nuxeo/registeredServer/form/design/submit/data
         */
        postNuxeoRegisteredserverFormDesignSubmitData: (data: FormDesignDataDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/form/design/submit/data`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverFilingDocument
         * @request POST:/api/nuxeo/registeredServer/filing/document
         */
        postNuxeoRegisteredserverFilingDocument: (data: FilingCreateDocRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/filing/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverFilingCreateDocument
         * @request POST:/api/nuxeo/registeredServer/filing/create/document
         */
        postNuxeoRegisteredserverFilingCreateDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/filing/create/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentTemplateValidate
         * @request POST:/api/nuxeo/registeredServer/document/template/validate
         */
        postNuxeoRegisteredserverDocumentTemplateValidate: (
            data: GenerateDocumentRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/template/validate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentTemplateGenerate
         * @request POST:/api/nuxeo/registeredServer/document/template/generate
         */
        postNuxeoRegisteredserverDocumentTemplateGenerate: (
            data: GenerateDocumentRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/template/generate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentPrepareConvert
         * @request POST:/api/nuxeo/registeredServer/document/prepare/convert
         */
        postNuxeoRegisteredserverDocumentPrepareConvert: (
            query: {
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<boolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/prepare/convert`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreatenewversion
         * @summary create New Version Without Auth
         * @request POST:/api/nuxeo/registeredServer/document/createNewVersion
         */
        postNuxeoRegisteredserverDocumentCreatenewversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/createNewVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreatenewversionDeprecate
         * @summary create New Version Without Auth
         * @request POST:/api/nuxeo/registeredServer/document/createNewVersion/
         */
        postNuxeoRegisteredserverDocumentCreatenewversionDeprecate: (
            data: VersioningRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/createNewVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreatefolderDeprecate
         * @summary Create folder from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createFolder/
         */
        postNuxeoRegisteredserverDocumentCreatefolderDeprecate: (
            data: DocumentRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/createFolder/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreatefolder
         * @summary Create folder from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createFolder
         */
        postNuxeoRegisteredserverDocumentCreatefolder: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/createFolder`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreatedocumentDeprecate
         * @summary Create document without authentication request from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createDocument/
         */
        postNuxeoRegisteredserverDocumentCreatedocumentDeprecate: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/createDocument/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreatedocument
         * @summary Create document without authentication request from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createDocument
         */
        postNuxeoRegisteredserverDocumentCreatedocument: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/createDocument`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCreateStructure
         * @summary Create structure from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/create/structure
         */
        postNuxeoRegisteredserverDocumentCreateStructure: (data: DocStructureRequestDTO, params: RequestParams = {}) =>
            this.request<DocStructureResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/create/structure`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverDocumentCopy
         * @request POST:/api/nuxeo/registeredServer/document/copy
         */
        postNuxeoRegisteredserverDocumentCopy: (data: CopyDocumentDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/document/copy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoRegisteredserverCalendar
         * @request POST:/api/nuxeo/registeredServer/calendar
         */
        postNuxeoRegisteredserverCalendar: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/registeredServer/calendar`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicFilerequestDeprecate
         * @request GET:/api/nuxeo/public/filerequest/
         */
        getNuxeoPublicFilerequestDeprecate: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/filerequest/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name PostNuxeoPublicFilerequestDeprecate
         * @request POST:/api/nuxeo/public/filerequest/
         */
        postNuxeoPublicFilerequestDeprecate: (
            data: {
                password: string;
                taskId: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/filerequest/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicFilerequest
         * @request GET:/api/nuxeo/public/filerequest
         */
        getNuxeoPublicFilerequest: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/filerequest`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name PostNuxeoPublicFilerequest
         * @request POST:/api/nuxeo/public/filerequest
         */
        postNuxeoPublicFilerequest: (
            data: {
                password: string;
                taskId: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/filerequest`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Data Import (Nuxeo)
         * @name PostNuxeoImport
         * @request POST:/api/nuxeo/import
         */
        postNuxeoImport: (
            data: {
                name: string;
                data: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/import`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Data Import (Nuxeo)
         * @name PostNuxeoImportDeprecate
         * @request POST:/api/nuxeo/import/
         */
        postNuxeoImportDeprecate: (
            data: {
                name: string;
                data: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/import/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUsers
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/users
         */
        postNuxeoIdentityUsers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/users`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostNuxeoIdentityUsersDeprecate
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/users/
         */
        postNuxeoIdentityUsersDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/users/`,
                method: "POST",
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/groups/`,
                method: "POST",
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoIdentityGetkeycloakallusers
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers
         */
        postNuxeoIdentityGetkeycloakallusers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/getKeyCloakAllUsers/`,
                method: "POST",
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringInstant, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringInstant, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoGetlatestversion
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion
         */
        postNuxeoGetlatestversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/getLatestVersion/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostNuxeoFilerequestApprove
         * @request POST:/api/nuxeo/filerequest/approve
         */
        postNuxeoFilerequestApprove: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest/approve`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostNuxeoFilerequestApproveDeprecate
         * @request POST:/api/nuxeo/filerequest/approve/
         */
        postNuxeoFilerequestApproveDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest/approve/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name GetNuxeoFilerequestDeprecate
         * @request GET:/api/nuxeo/filerequest/
         */
        getNuxeoFilerequestDeprecate: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostNuxeoFilerequestDeprecate
         * @request POST:/api/nuxeo/filerequest/
         */
        postNuxeoFilerequestDeprecate: (data: FileRequestUploadRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name DeleteNuxeoFilerequestDeprecate
         * @request DELETE:/api/nuxeo/filerequest/
         */
        deleteNuxeoFilerequestDeprecate: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name GetNuxeoFilerequest
         * @request GET:/api/nuxeo/filerequest
         */
        getNuxeoFilerequest: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostNuxeoFilerequest
         * @request POST:/api/nuxeo/filerequest
         */
        postNuxeoFilerequest: (data: FileRequestUploadRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name DeleteNuxeoFilerequest
         * @request DELETE:/api/nuxeo/filerequest
         */
        deleteNuxeoFilerequest: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/filerequest`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FileUpload (Nuxeo)
         * @name PostNuxeoFileuploadrequestIsallowaccess
         * @summary check password is ok
         * @request POST:/api/nuxeo/fileUploadRequest/isAllowAccess
         */
        postNuxeoFileuploadrequestIsallowaccess: (data: FileUploadRequestDetailDTO, params: RequestParams = {}) =>
            this.request<ResultLong, ResultString | (ResultString | Result)>({
                path: `/nuxeo/fileUploadRequest/isAllowAccess`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FileUpload (Nuxeo)
         * @name PostNuxeoFileuploadrequestAddrequest
         * @summary addRequest
         * @request POST:/api/nuxeo/fileUploadRequest/addRequest
         */
        postNuxeoFileuploadrequestAddrequest: (data: FileUploadRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/fileUploadRequest/addRequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FileUpload (Nuxeo)
         * @name PostNuxeoFileuploadrequestAddrequestdetail
         * @summary check password is ok
         * @request POST:/api/nuxeo/fileUploadRequest/addRequestDetail
         */
        postNuxeoFileuploadrequestAddrequestdetail: (
            query: {
                message: string;
                /** @format int64 */
                parentId: number;
                isFinishUpload: boolean;
            },
            data: {
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/fileUploadRequest/addRequestDetail`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadtempfolderDeprecate
         * @summary uploadTempFolder
         * @request POST:/api/nuxeo/document/uploadTempFolder/
         */
        postNuxeoDocumentUploadtempfolderDeprecate: (data: UploadTempFileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/uploadTempFolder/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadtempfolder
         * @summary uploadTempFolder
         * @request POST:/api/nuxeo/document/uploadTempFolder
         */
        postNuxeoDocumentUploadtempfolder: (data: UploadTempFileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/uploadTempFolder`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadtempfileDeprecate
         * @summary uploadTempFile
         * @request POST:/api/nuxeo/document/uploadTempFile/
         */
        postNuxeoDocumentUploadtempfileDeprecate: (
            query: {
                uploadTempFileRequestStr: string;
            },
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultLong, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/uploadTempFile/`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadtempfile
         * @summary uploadTempFile
         * @request POST:/api/nuxeo/document/uploadTempFile
         */
        postNuxeoDocumentUploadtempfile: (
            query: {
                uploadTempFileRequestStr: string;
            },
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultLong, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/uploadTempFile`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadfiles
         * @summary Upload files
         * @request POST:/api/nuxeo/document/uploadFiles
         */
        postNuxeoDocumentUploadfiles: (
            data: {
                document: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/uploadFiles`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadfilesDeprecate
         * @summary Upload files
         * @request POST:/api/nuxeo/document/uploadFiles/
         */
        postNuxeoDocumentUploadfilesDeprecate: (
            data: {
                document: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/uploadFiles/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadAttachmentDeprecate
         * @request POST:/api/nuxeo/document/upload/attachment/
         */
        postNuxeoDocumentUploadAttachmentDeprecate: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/upload/attachment/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentUploadAttachment
         * @request POST:/api/nuxeo/document/upload/attachment
         */
        postNuxeoDocumentUploadAttachment: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/upload/attachment`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentThumbnailList
         * @request POST:/api/nuxeo/document/thumbnail/list
         */
        postNuxeoDocumentThumbnailList: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListESDocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/thumbnail/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentThumbnail
         * @summary Get document thumbnail
         * @request POST:/api/nuxeo/document/thumbnail
         */
        postNuxeoDocumentThumbnail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/thumbnail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentThumbnailDeprecate
         * @summary Get document thumbnail
         * @request POST:/api/nuxeo/document/thumbnail/
         */
        postNuxeoDocumentThumbnailDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/thumbnail/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Template
         * @name PostNuxeoDocumentTemplatesGenerateDocument
         * @summary Generate document using template and specified variables
         * @request POST:/api/nuxeo/document/templates/generate/document
         */
        postNuxeoDocumentTemplatesGenerateDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/templates/generate/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSuperQuery
         * @summary Query document by admin account
         * @request POST:/api/nuxeo/document/super/query
         */
        postNuxeoDocumentSuperQuery: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/super/query`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSubscribeDeprecate
         * @summary Subscribe to be notified
         * @request POST:/api/nuxeo/document/subscribe/
         */
        postNuxeoDocumentSubscribeDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/subscribe/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSubscribe
         * @summary Subscribe to be notified
         * @request POST:/api/nuxeo/document/subscribe
         */
        postNuxeoDocumentSubscribe: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/subscribe`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSiblingsDeprecate
         * @summary Get siblings of a document
         * @request POST:/api/nuxeo/document/siblings/
         */
        postNuxeoDocumentSiblingsDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/siblings/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSiblings
         * @summary Get siblings of a document
         * @request POST:/api/nuxeo/document/siblings
         */
        postNuxeoDocumentSiblings: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/siblings`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbytypeDeprecate
         * @summary Search document by type
         * @request POST:/api/nuxeo/document/searchByType/
         */
        postNuxeoDocumentSearchbytypeDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByType/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbytype
         * @summary Search document by type
         * @request POST:/api/nuxeo/document/searchByType
         */
        postNuxeoDocumentSearchbytype: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByType`,
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
            this.request<ResultPaginableEntityDTOVirtualFolderDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultPaginableEntityDTOVirtualFolderDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Search document by document properties
         * @request POST:/api/nuxeo/document/searchByProperties/
         */
        postNuxeoDocumentSearchbypropertiesDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Search document by document properties
         * @request POST:/api/nuxeo/document/searchByProperties
         */
        postNuxeoDocumentSearchbyproperties: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentSearchbynameDeprecate
         * @summary Search document by name
         * @request POST:/api/nuxeo/document/searchByName/
         */
        postNuxeoDocumentSearchbynameDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByName/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbyname
         * @summary Search document by name
         * @request POST:/api/nuxeo/document/searchByName
         */
        postNuxeoDocumentSearchbyname: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByName`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbyfilenameDeprecate
         * @summary Search document by uploaded filename
         * @request POST:/api/nuxeo/document/searchByFilename/
         */
        postNuxeoDocumentSearchbyfilenameDeprecate: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByFilename/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbyfilename
         * @summary Search document by uploaded filename
         * @request POST:/api/nuxeo/document/searchByFilename
         */
        postNuxeoDocumentSearchbyfilename: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByFilename`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbyfilecontenttype
         * @summary Search documents by mime type
         * @request POST:/api/nuxeo/document/searchByFileContentType
         */
        postNuxeoDocumentSearchbyfilecontenttype: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByFileContentType`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbyfilecontenttypeDeprecate
         * @summary Search documents by mime type
         * @request POST:/api/nuxeo/document/searchByFileContentType/
         */
        postNuxeoDocumentSearchbyfilecontenttypeDeprecate: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByFileContentType/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbycreatorDeprecate
         * @summary Search documents by creator
         * @request POST:/api/nuxeo/document/searchByCreator/
         */
        postNuxeoDocumentSearchbycreatorDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByCreator/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchbycreator
         * @summary Search documents by creator
         * @request POST:/api/nuxeo/document/searchByCreator
         */
        postNuxeoDocumentSearchbycreator: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/searchByCreator`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearch
         * @summary Search documents
         * @request POST:/api/nuxeo/document/search
         */
        postNuxeoDocumentSearch: (
            query: {
                query: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/search`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSearchDeprecate
         * @summary Search documents
         * @request POST:/api/nuxeo/document/search/
         */
        postNuxeoDocumentSearchDeprecate: (
            query: {
                query: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/search/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSaveuploadfileoverviewDeprecate
         * @summary saveUploadFileOverview
         * @request POST:/api/nuxeo/document/saveUploadFileOverview/
         */
        postNuxeoDocumentSaveuploadfileoverviewDeprecate: (
            data: SaveFileOverviewRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/saveUploadFileOverview/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentSaveuploadfileoverview
         * @summary saveUploadFileOverview
         * @request POST:/api/nuxeo/document/saveUploadFileOverview
         */
        postNuxeoDocumentSaveuploadfileoverview: (data: SaveFileOverviewRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/saveUploadFileOverview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentRestore
         * @summary Restore a document
         * @request POST:/api/nuxeo/document/restore
         */
        postNuxeoDocumentRestore: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/restore`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentRestoreDeprecate
         * @summary Restore a document
         * @request POST:/api/nuxeo/document/restore/
         */
        postNuxeoDocumentRestoreDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/restore/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentQueryuploadfiledetaildtolistDeprecate
         * @summary queryUploadFileDetailDTOList
         * @request POST:/api/nuxeo/document/queryUploadFileDetailDTOList/
         */
        postNuxeoDocumentQueryuploadfiledetaildtolistDeprecate: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListUploadFileDetailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/queryUploadFileDetailDTOList/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentQueryuploadfiledetaildtolist
         * @summary queryUploadFileDetailDTOList
         * @request POST:/api/nuxeo/document/queryUploadFileDetailDTOList
         */
        postNuxeoDocumentQueryuploadfiledetaildtolist: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListUploadFileDetailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/queryUploadFileDetailDTOList`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentQueryuploadfiledtopageDeprecate
         * @summary queryUploadFileDTOPage
         * @request POST:/api/nuxeo/document/queryUploadFileDTOPage/
         */
        postNuxeoDocumentQueryuploadfiledtopageDeprecate: (
            data: QueryFileOverviewRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPageUploadFileDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/queryUploadFileDTOPage/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentQueryuploadfiledtopage
         * @summary queryUploadFileDTOPage
         * @request POST:/api/nuxeo/document/queryUploadFileDTOPage
         */
        postNuxeoDocumentQueryuploadfiledtopage: (data: QueryFileOverviewRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPageUploadFileDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/queryUploadFileDTOPage`,
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
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentPreview
         * @summary Get document preview
         * @request POST:/api/nuxeo/document/preview
         */
        postNuxeoDocumentPreview: (data: PreviewDocumentReq, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentParentDeprecate
         * @summary Get parent document
         * @request POST:/api/nuxeo/document/parent/
         */
        postNuxeoDocumentParentDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/parent/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentParent
         * @summary Get parent document
         * @request POST:/api/nuxeo/document/parent
         */
        postNuxeoDocumentParent: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/parent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentOfficeCreate
         * @request POST:/api/nuxeo/document/office/create
         */
        postNuxeoDocumentOfficeCreate: (data: OfficeFileCreateDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/office/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentOfficeCheck
         * @request POST:/api/nuxeo/document/office/check
         */
        postNuxeoDocumentOfficeCheck: (data: OfficeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/office/check`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentOcrList
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/ocr/list
         */
        postNuxeoDocumentOcrList: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/ocr/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentOcrListDeprecate
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/ocr/list/
         */
        postNuxeoDocumentOcrListDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/ocr/list/`,
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
         * @summary Move a document
         * @request POST:/api/nuxeo/document/move
         */
        postNuxeoDocumentMove: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Move a document
         * @request POST:/api/nuxeo/document/move/
         */
        postNuxeoDocumentMoveDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Check is duplicate name
         * @request POST:/api/nuxeo/document/isDuplicateName
         */
        postNuxeoDocumentIsduplicatename: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultString | (ResultString | Result)>({
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
         * @summary Check is duplicate name
         * @request POST:/api/nuxeo/document/isDuplicateName/
         */
        postNuxeoDocumentIsduplicatenameDeprecate: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentFavoritesAddDeprecate
         * @summary Add document to favorites
         * @request POST:/api/nuxeo/document/favorites/add/
         */
        postNuxeoDocumentFavoritesAddDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorites/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentFavoritesAdd
         * @summary Add document to favorites
         * @request POST:/api/nuxeo/document/favorites/add
         */
        postNuxeoDocumentFavoritesAdd: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorites/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentExport
         * @summary Export documents
         * @request POST:/api/nuxeo/document/export
         */
        postNuxeoDocumentExport: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/export`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentExportDeprecate
         * @summary Export documents
         * @request POST:/api/nuxeo/document/export/
         */
        postNuxeoDocumentExportDeprecate: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/export/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDownload
         * @request GET:/api/nuxeo/document/download
         */
        getNuxeoDocumentDownload: (
            query: {
                idOrPath: string;
                watermark?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/download`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentDownload
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/download
         */
        postNuxeoDocumentDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoDocumentDownloadDeprecate
         * @request GET:/api/nuxeo/document/download/
         */
        getNuxeoDocumentDownloadDeprecate: (
            query: {
                idOrPath: string;
                watermark?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/download/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentDownloadDeprecate
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/download/
         */
        postNuxeoDocumentDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentDamDownload
         * @request POST:/api/nuxeo/document/dam/download
         */
        postNuxeoDocumentDamDownload: (data: DownloadFileRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/dam/download`,
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
         * @summary Create folders
         * @request POST:/api/nuxeo/document/createFolders/
         */
        postNuxeoDocumentCreatefoldersDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Create folders
         * @request POST:/api/nuxeo/document/createFolders
         */
        postNuxeoDocumentCreatefolders: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Create a document
         * @request POST:/api/nuxeo/document/createDocument/
         */
        postNuxeoDocumentCreatedocumentDeprecate: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/createDocument/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreatedocument
         * @summary Create a document
         * @request POST:/api/nuxeo/document/createDocument
         */
        postNuxeoDocumentCreatedocument: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/createDocument`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreateStructure
         * @request POST:/api/nuxeo/document/create/structure
         */
        postNuxeoDocumentCreateStructure: (data: DocStructureRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocStructureResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/create/structure`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreateFolder
         * @request POST:/api/nuxeo/document/create/folder
         */
        postNuxeoDocumentCreateFolder: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/create/folder`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreate
         * @request POST:/api/nuxeo/document/create
         */
        postNuxeoDocumentCreate: (
            query: {
                /** Document (Request) */
                documentRequestDTO: DocumentRequestDTO;
            },
            data: {
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/create`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCreateDeprecate
         * @request POST:/api/nuxeo/document/create/
         */
        postNuxeoDocumentCreateDeprecate: (
            query: {
                /** Document (Request) */
                documentRequestDTO: DocumentRequestDTO;
            },
            data: {
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/create/`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCopyWatermark
         * @summary Create a document through attach watermark to generate new file
         * @request POST:/api/nuxeo/document/copy/watermark
         */
        postNuxeoDocumentCopyWatermark: (data: WatermarkDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/copy/watermark`,
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
         * @summary Copy a document
         * @request POST:/api/nuxeo/document/copy/
         */
        postNuxeoDocumentCopyDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Copy a document
         * @request POST:/api/nuxeo/document/copy
         */
        postNuxeoDocumentCopy: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentConverttotxtDeprecate
         * @summary Upload files
         * @request POST:/api/nuxeo/document/convertToTxt/
         */
        postNuxeoDocumentConverttotxtDeprecate: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/convertToTxt/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentConverttotxt
         * @summary Upload files
         * @request POST:/api/nuxeo/document/convertToTxt
         */
        postNuxeoDocumentConverttotxt: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/convertToTxt`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCollections
         * @summary Get collections of a document is in
         * @request POST:/api/nuxeo/document/collections
         */
        postNuxeoDocumentCollections: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/collections`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCollectionsDeprecate
         * @summary Get collections of a document is in
         * @request POST:/api/nuxeo/document/collections/
         */
        postNuxeoDocumentCollectionsDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/collections/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentChildrenThumbnailV2
         * @request POST:/api/nuxeo/document/children/thumbnail_v2
         */
        postNuxeoDocumentChildrenThumbnailV2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/children/thumbnail_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentChildrenThumbnailV2Deprecate
         * @request POST:/api/nuxeo/document/children/thumbnail_v2/
         */
        postNuxeoDocumentChildrenThumbnailV2Deprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/children/thumbnail_v2/`,
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
         * @summary Get children of thumbnail Result
         * @request POST:/api/nuxeo/document/children/thumbnail
         */
        postNuxeoDocumentChildrenThumbnail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentChildrenPage
         * @summary Pagination to query children of documents
         * @request POST:/api/nuxeo/document/children/page
         */
        postNuxeoDocumentChildrenPage: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/children/page`,
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
         * @summary Get children of a document
         * @request POST:/api/nuxeo/document/children/
         */
        postNuxeoDocumentChildrenDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Get children of a document
         * @request POST:/api/nuxeo/document/children
         */
        postNuxeoDocumentChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentCheckfileexist
         * @summary check file exist situation in nuxeo
         * @request POST:/api/nuxeo/document/checkFileExist
         */
        postNuxeoDocumentCheckfileexist: (data: FileCheckRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileCheckResultDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/checkFileExist`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentCheckfileexistDeprecate
         * @summary check file exist situation in nuxeo
         * @request POST:/api/nuxeo/document/checkFileExist/
         */
        postNuxeoDocumentCheckfileexistDeprecate: (data: FileCheckRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileCheckResultDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/checkFileExist/`,
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
         * @summary Get document breadcrumb
         * @request POST:/api/nuxeo/document/breadcrumb
         */
        postNuxeoDocumentBreadcrumb: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Get document breadcrumb
         * @request POST:/api/nuxeo/document/breadcrumb/
         */
        postNuxeoDocumentBreadcrumbDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentBatchconfirm
         * @summary batchConfirm
         * @request POST:/api/nuxeo/document/batchConfirm
         */
        postNuxeoDocumentBatchconfirm: (data: FileConfirmRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/batchConfirm`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentBatchconfirmDeprecate
         * @summary batchConfirm
         * @request POST:/api/nuxeo/document/batchConfirm/
         */
        postNuxeoDocumentBatchconfirmDeprecate: (data: FileConfirmRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/batchConfirm/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentBatchcancelDeprecate
         * @summary batchCancel
         * @request POST:/api/nuxeo/document/batchCancel/
         */
        postNuxeoDocumentBatchcancelDeprecate: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/batchCancel/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentBatchcancel
         * @summary batchCancel
         * @request POST:/api/nuxeo/document/batchCancel
         */
        postNuxeoDocumentBatchcancel: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/batchCancel`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAuditDeprecate
         * @summary Get audit trial of a document
         * @request POST:/api/nuxeo/document/audit/
         */
        postNuxeoDocumentAuditDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListLogEntryDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/audit/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAudit
         * @summary Get audit trial of a document
         * @request POST:/api/nuxeo/document/audit
         */
        postNuxeoDocumentAudit: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListLogEntryDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/audit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentUpdateDeprecate
         * @request POST:/api/nuxeo/document/attachment/update/
         */
        postNuxeoDocumentAttachmentUpdateDeprecate: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultAttachmentUpdateResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/update/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentUpdate
         * @request POST:/api/nuxeo/document/attachment/update
         */
        postNuxeoDocumentAttachmentUpdate: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultAttachmentUpdateResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/update`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentPdfDownloadDeprecate
         * @request POST:/api/nuxeo/document/attachment/pdf/download/
         */
        postNuxeoDocumentAttachmentPdfDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/pdf/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentPdfDownload
         * @request POST:/api/nuxeo/document/attachment/pdf/download
         */
        postNuxeoDocumentAttachmentPdfDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/pdf/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentOcrresultDownload
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/attachment/ocrresult/download
         */
        postNuxeoDocumentAttachmentOcrresultDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/ocrresult/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentOcrresultDownloadDeprecate
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/attachment/ocrresult/download/
         */
        postNuxeoDocumentAttachmentOcrresultDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/ocrresult/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentListDeprecate
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/attachment/list/
         */
        postNuxeoDocumentAttachmentListDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/list/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentList
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/attachment/list
         */
        postNuxeoDocumentAttachmentList: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentJpegDownloadDeprecate
         * @request POST:/api/nuxeo/document/attachment/jpeg/download/
         */
        postNuxeoDocumentAttachmentJpegDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/jpeg/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentJpegDownload
         * @request POST:/api/nuxeo/document/attachment/jpeg/download
         */
        postNuxeoDocumentAttachmentJpegDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/jpeg/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentHocrDownloadDeprecate
         * @request POST:/api/nuxeo/document/attachment/hocr/download/
         */
        postNuxeoDocumentAttachmentHocrDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/hocr/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentHocrDownload
         * @request POST:/api/nuxeo/document/attachment/hocr/download
         */
        postNuxeoDocumentAttachmentHocrDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/hocr/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentDownloadDeprecate
         * @summary Download attachment of a document
         * @request POST:/api/nuxeo/document/attachment/download/
         */
        postNuxeoDocumentAttachmentDownloadDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAttachmentDownload
         * @summary Download attachment of a document
         * @request POST:/api/nuxeo/document/attachment/download
         */
        postNuxeoDocumentAttachmentDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/attachment/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAddWatermark
         * @summary Replace document for add watermark to document and overview to new version
         * @request POST:/api/nuxeo/document/add/watermark
         */
        postNuxeoDocumentAddWatermark: (data: WatermarkDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/add/watermark`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAddFacets
         * @request POST:/api/nuxeo/document/add/facets
         */
        postNuxeoDocumentAddFacets: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/add/facets`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentAclsDeprecate
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acls/
         */
        getNuxeoDocumentAclsDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acls/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclsDeprecate
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acls/
         */
        postNuxeoDocumentAclsDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoDocumentAcls
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acls
         */
        getNuxeoDocumentAcls: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acls`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAcls
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acls
         */
        postNuxeoDocumentAcls: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoDocumentAclDeprecate
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acl/
         */
        getNuxeoDocumentAclDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclDeprecate
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acl/
         */
        postNuxeoDocumentAclDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name GetNuxeoDocumentAcl
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acl
         */
        getNuxeoDocumentAcl: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAcl
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acl
         */
        postNuxeoDocumentAcl: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name PostNuxeoDocumentAclInviteDeprecate
         * @summary Allow external user to access the document
         * @request POST:/api/nuxeo/document/acl/invite/
         */
        postNuxeoDocumentAclInviteDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/invite/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentAclInvite
         * @summary Allow external user to access the document
         * @request POST:/api/nuxeo/document/acl/invite
         */
        postNuxeoDocumentAclInvite: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/invite`,
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
         * @summary Add local permission to document
         * @request POST:/api/nuxeo/document/acl/add
         */
        postNuxeoDocumentAclAdd: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Add local permission to document
         * @request POST:/api/nuxeo/document/acl/add/
         */
        postNuxeoDocumentAclAddDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocument
         * @summary Get a document
         * @request POST:/api/nuxeo/document
         */
        postNuxeoDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocument
         * @summary Delete a document
         * @request DELETE:/api/nuxeo/document
         */
        deleteNuxeoDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocument
         * @summary Update a document
         * @request PATCH:/api/nuxeo/document
         */
        patchNuxeoDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostNuxeoDocumentDeprecate
         * @summary Get a document
         * @request POST:/api/nuxeo/document/
         */
        postNuxeoDocumentDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentDeprecate
         * @summary Delete a document
         * @request DELETE:/api/nuxeo/document/
         */
        deleteNuxeoDocumentDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentDeprecate
         * @summary Update a document
         * @request PATCH:/api/nuxeo/document/
         */
        patchNuxeoDocumentDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/`,
                method: "PATCH",
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/createVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostNuxeoConversionSubmittemplate
         * @summary submit Template Request
         * @request POST:/api/nuxeo/conversion/submitTemplate
         */
        postNuxeoConversionSubmittemplate: (
            query: {
                templatePath: string;
                documentPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileTemplateRecord, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/submitTemplate`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostNuxeoConversionSubmitexportrequest
         * @summary Submit Export Request
         * @request POST:/api/nuxeo/conversion/submitExportRequest
         */
        postNuxeoConversionSubmitexportrequest: (data: ConversionFileRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListFileConversionRecord, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/submitExportRequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostNuxeoConversionFormatSubmit
         * @summary Submit Export Request
         * @request POST:/api/nuxeo/conversion/format/submit
         */
        postNuxeoConversionFormatSubmit: (data: ConversionFileRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListFileConversionRecord, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/format/submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostNuxeoConversionGettemplatelist
         * @summary Template List
         * @request POST:/api/nuxeo/conversion/getTemplateList
         */
        postNuxeoConversionGettemplatelist: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/getTemplateList`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostNuxeoConversionDownload
         * @summary Download Files
         * @request POST:/api/nuxeo/conversion/download
         */
        postNuxeoConversionDownload: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostNuxeoConversionDownloadfile
         * @summary Download Files
         * @request POST:/api/nuxeo/conversion/downloadFile
         */
        postNuxeoConversionDownloadfile: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/downloadFile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostNuxeoCommentsAdd
         * @summary Create a new document comment
         * @request POST:/api/nuxeo/comments/add
         */
        postNuxeoCommentsAdd: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostNuxeoCommentsAddDeprecate
         * @summary Create a new document comment
         * @request POST:/api/nuxeo/comments/add/
         */
        postNuxeoCommentsAddDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostNuxeoComments
         * @summary Get document comments
         * @request POST:/api/nuxeo/comments
         */
        postNuxeoComments: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostNuxeoCommentsDeprecate
         * @summary Get document comments
         * @request POST:/api/nuxeo/comments/
         */
        postNuxeoCommentsDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionDocumentsDeprecate
         * @summary Get documents in a collection
         * @request POST:/api/nuxeo/collection/documents/
         */
        postNuxeoCollectionDocumentsDeprecate: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/documents/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionDocuments
         * @summary Get documents in a collection
         * @request POST:/api/nuxeo/collection/documents
         */
        postNuxeoCollectionDocuments: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/documents`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionCreate
         * @summary Create a collection in user workspace
         * @request POST:/api/nuxeo/collection/create
         */
        postNuxeoCollectionCreate: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionCreateDeprecate
         * @summary Create a collection in user workspace
         * @request POST:/api/nuxeo/collection/create/
         */
        postNuxeoCollectionCreateDeprecate: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/create/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionAlldocumentsDeprecate
         * @request POST:/api/nuxeo/collection/allDocuments/
         */
        postNuxeoCollectionAlldocumentsDeprecate: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEntityVODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/allDocuments/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionAlldocuments
         * @request POST:/api/nuxeo/collection/allDocuments
         */
        postNuxeoCollectionAlldocuments: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEntityVODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/allDocuments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionAddDeprecate
         * @summary Add documents to collection
         * @request POST:/api/nuxeo/collection/add/
         */
        postNuxeoCollectionAddDeprecate: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostNuxeoCollectionAdd
         * @summary Add documents to collection
         * @request POST:/api/nuxeo/collection/add
         */
        postNuxeoCollectionAdd: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name GetNuxeoAnnotation
         * @summary Retrieve annotations from a document
         * @request GET:/api/nuxeo/annotation
         */
        getNuxeoAnnotation: (
            query: {
                idOrPath: string;
                annotationId?: string;
                version?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/annotation`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name PostNuxeoAnnotation
         * @summary Save annotations as document attachment
         * @request POST:/api/nuxeo/annotation
         */
        postNuxeoAnnotation: (data: AnnotationRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/annotation`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name GetNuxeoAnnotationDeprecate
         * @summary Retrieve annotations from a document
         * @request GET:/api/nuxeo/annotation/
         */
        getNuxeoAnnotationDeprecate: (
            query: {
                idOrPath: string;
                annotationId?: string;
                version?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/annotation/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name PostNuxeoAnnotationDeprecate
         * @summary Save annotations as document attachment
         * @request POST:/api/nuxeo/annotation/
         */
        postNuxeoAnnotationDeprecate: (data: AnnotationRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/annotation/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MessageQueue
         * @name PostMessageQueueMessageidReinvoke
         * @summary ReInvoke business
         * @request POST:/api/message/queue/{messageId}/reinvoke
         */
        postMessageQueueMessageidReinvoke: (messageId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/message/queue/${messageId}/reinvoke`,
                method: "POST",
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
            },
            data: BusinessResultRecord,
            params: RequestParams = {},
        ) =>
            this.request<ResultPageBusinessResultRecord, ResultString | (ResultString | Result)>({
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
         * @tags Workflow File
         * @name PostWorkflowUploadFiles
         * @summary Upload multiple files in the nuxeo repository
         * @request POST:/api/docpal/workflow/upload/files
         */
        postWorkflowUploadFiles: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/upload/files`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow File
         * @name PostWorkflowUploadFile
         * @summary Upload single file in the nuxeo repository
         * @request POST:/api/docpal/workflow/upload/file
         */
        postWorkflowUploadFile: (
            data: {
                document: string;
                /** @format binary */
                file?: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/upload/file`,
                method: "POST",
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name GetWorkflowTasks
         * @request GET:/api/docpal/workflow/tasks
         */
        getWorkflowTasks: (
            query?: {
                processInstanceId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasks
         * @summary Retrieve tasks for a process instance
         * @request POST:/api/docpal/workflow/tasks
         */
        postWorkflowTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name DeleteWorkflowTask
         * @summary Delete a task
         * @request DELETE:/api/docpal/workflow/task
         */
        getWorkflowTasks: (
            query?: {
                processInstanceId?: string;
                taskId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasks
         * @summary Retrieve tasks for a process instance
         * @request POST:/api/docpal/workflow/tasks
         */
        postWorkflowTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowTasksUser
         * @summary Retrieve tasks for the candidate users
         * @request POST:/api/docpal/workflow/tasks/user
         */
        postWorkflowTasksUser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowTasksUnassigned
         * @summary Retrieve unassigned tasks
         * @request POST:/api/docpal/workflow/tasks/unassigned
         */
        postWorkflowTasksUnassigned: (params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/unassigned`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksUnassignedDeprecate
         * @summary Retrieve unassigned tasks
         * @request POST:/api/docpal/workflow/tasks/unassigned/
         */
        postWorkflowTasksUnassignedDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/unassigned/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksPersonal
         * @summary Retrieve tasks for a user
         * @request POST:/api/docpal/workflow/tasks/personal
         */
        postWorkflowTasksPersonal: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/personal`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksGroupDeprecate
         * @summary Retrieve tasks for the candidate group
         * @request POST:/api/docpal/workflow/tasks/group/
         */
        postWorkflowTasksGroupDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/group/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksGroup
         * @summary Retrieve tasks for the candidate group
         * @request POST:/api/docpal/workflow/tasks/group
         */
        postWorkflowTasksGroup: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/group`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksExporttasksuser
         * @request POST:/api/docpal/workflow/tasks/exportTasksUser
         */
        postWorkflowTasksExporttasksuser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/exportTasksUser`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksExporttasksuserDeprecate
         * @request POST:/api/docpal/workflow/tasks/exportTasksUser/
         */
        postWorkflowTasksExporttasksuserDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/exportTasksUser/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowTask
         * @request GET:/api/docpal/workflow/task
         */
        getWorkflowTask: (
            query?: {
                processInstanceId?: string;
                taskId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTask
         * @summary Retrieve a task
         * @request POST:/api/docpal/workflow/task
         */
        postWorkflowTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowTask
         * @summary Delete a task
         * @request DELETE:/api/docpal/workflow/task
         */
        deleteWorkflowTask: (
            query: {
                taskId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskUnclaimDeprecate
         * @summary Unclaim a task
         * @request POST:/api/docpal/workflow/task/unclaim/
         */
        postWorkflowTaskUnclaimDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @summary Unclaim a task
         * @request POST:/api/docpal/workflow/task/unclaim
         */
        postWorkflowTaskUnclaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowTaskDuedate
         * @summary Set task due date
         * @request POST:/api/docpal/workflow/task/dueDate
         */
        postWorkflowTaskDuedate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/dueDate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskDuedateDeprecate
         * @summary Set task due date
         * @request POST:/api/docpal/workflow/task/dueDate/
         */
        postWorkflowTaskDuedateDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/dueDate/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Delegate task to another user
         *
         * @tags Workflow
         * @name PostWorkflowTaskDelegate
         * @request POST:/api/docpal/workflow/task/delegate
         */
        postWorkflowTaskDelegate: (
            query: {
                taskId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/delegate`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * @description Delegate task to another user
         *
         * @tags Workflow
         * @name PostWorkflowTaskDelegateDeprecate
         * @request POST:/api/docpal/workflow/task/delegate/
         */
        postWorkflowTaskDelegateDeprecate: (
            query: {
                taskId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/delegate/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskComplete
         * @summary Complete a task
         * @request POST:/api/docpal/workflow/task/complete
         */
        postWorkflowTaskComplete: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskCompleteDeprecate
         * @summary Complete a task
         * @request POST:/api/docpal/workflow/task/complete/
         */
        postWorkflowTaskCompleteDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/complete/`,
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
         * @summary Claim a task
         * @request POST:/api/docpal/workflow/task/claim
         */
        postWorkflowTaskClaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @summary Claim a task
         * @request POST:/api/docpal/workflow/task/claim/
         */
        postWorkflowTaskClaimDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowTaskAssign
         * @summary Assign task to a user
         * @request POST:/api/docpal/workflow/task/assign
         */
        postWorkflowTaskAssign: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/assign`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTaskAssignDeprecate
         * @summary Assign task to a user
         * @request POST:/api/docpal/workflow/task/assign/
         */
        postWorkflowTaskAssignDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/task/assign/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowSubmitadhocapproval
         * @request POST:/api/docpal/workflow/submitAdhocApproval
         */
        postWorkflowSubmitadhocapproval: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/submitAdhocApproval`,
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
            this.request<ResultListDocumentTypeMetadataMapping, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentTypeProfileSetting, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowQueryadhocapprovalpage
         * @request POST:/api/docpal/workflow/queryAdhocApprovalPage
         */
        postWorkflowQueryadhocapprovalpage: (data: AdhocApprovalDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/queryAdhocApprovalPage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowPropertiesSave
         * @summary Save task form properties
         * @request POST:/api/docpal/workflow/properties/save
         */
        postWorkflowPropertiesSave: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/properties/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowPropertiesSaveDeprecate
         * @summary Save task form properties
         * @request POST:/api/docpal/workflow/properties/save/
         */
        postWorkflowPropertiesSaveDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/properties/save/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowPropertiesDeprecate
         * @summary Retrieve task form properties
         * @request POST:/api/docpal/workflow/properties/
         */
        postWorkflowPropertiesDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/properties/`,
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
         * @summary Retrieve task form properties
         * @request POST:/api/docpal/workflow/properties
         */
        postWorkflowProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowProcess
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process
         */
        postWorkflowProcess: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultProcessDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessTriggerbyprocessinstanceid
         * @request POST:/api/docpal/workflow/process/triggerByProcessInstanceId
         */
        postWorkflowProcessTriggerbyprocessinstanceid: (
            query: {
                processInstanceId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/triggerByProcessInstanceId`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessStart
         * @summary Start a process
         * @request POST:/api/docpal/workflow/process/start
         */
        postWorkflowProcessStart: (
            data: WorkflowRequestDTO,
            query?: {
                async?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/start`,
                method: "POST",
                query: query,
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
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowProcess
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process
         */
        postWorkflowProcess: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultProcessDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process`,
                method: "DELETE",
                query: query,
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
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowProcessMessage
         * @request POST:/api/docpal/workflow/process/message
         */
        postWorkflowProcessMessage: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/message`,
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
            this.request<ResultListProcessDTO, ResultString | (ResultString | Result)>({
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
         * @summary Retrieve process instance
         * @request POST:/api/docpal/workflow/process/instance/
         */
        postWorkflowProcessInstanceDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
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
         * @summary Retrieve process instance
         * @request POST:/api/docpal/workflow/process/instance
         */
        postWorkflowProcessInstance: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/instance`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowProcessInstance
         * @request DELETE:/api/docpal/workflow/process/instance
         */
        deleteWorkflowProcessInstance: (
            query: {
                processInstanceId: string;
                userId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/instance`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessDiagram
         * @summary Retrieve process definition diagram
         * @request POST:/api/docpal/workflow/process/diagram
         */
        postWorkflowProcessDiagram: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/diagram`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessDiagramDeprecate
         * @summary Retrieve process definition diagram
         * @request POST:/api/docpal/workflow/process/diagram/
         */
        postWorkflowProcessDiagramDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/diagram/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PostWorkflowProcessCombineList
         * @request POST:/api/docpal/workflow/process/combine/list
         */
        postWorkflowProcessCombineList: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListProcessDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/combine/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessBpmnDeprecate
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/process/bpmn/
         */
        postWorkflowProcessBpmnDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/bpmn/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessBpmn
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/process/bpmn
         */
        postWorkflowProcessBpmn: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/bpmn`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowProcessAddfileforbulkupload
         * @request POST:/api/docpal/workflow/process/addFileForBulkUpload
         */
        postWorkflowProcessAddfileforbulkupload: (
            query: {
                processInstanceId: string;
            },
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/addFileForBulkUpload`,
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
         * @name PostWorkflowProcessActive
         * @request POST:/api/docpal/workflow/process/active
         */
        postWorkflowProcessActive: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/active`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryVariableDeprecate
         * @summary Retrieve task variable history
         * @request POST:/api/docpal/workflow/history/variable/
         */
        postWorkflowHistoryVariableDeprecate: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/variable/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryVariable
         * @summary Retrieve task variable history
         * @request POST:/api/docpal/workflow/history/variable
         */
        postWorkflowHistoryVariable: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/variable`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryTasklog
         * @summary Retrieve task log history
         * @request POST:/api/docpal/workflow/history/taskLog
         */
        postWorkflowHistoryTasklog: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/taskLog`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryTasklogDeprecate
         * @summary Retrieve task log history
         * @request POST:/api/docpal/workflow/history/taskLog/
         */
        postWorkflowHistoryTasklogDeprecate: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/taskLog/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryTask
         * @summary Retrieve task history
         * @request POST:/api/docpal/workflow/history/task
         */
        postWorkflowHistoryTask: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/task`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryTaskDeprecate
         * @summary Retrieve task history
         * @request POST:/api/docpal/workflow/history/task/
         */
        postWorkflowHistoryTaskDeprecate: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/task/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryProcessWithoutVariables
         * @request POST:/api/docpal/workflow/history/process_without_variables
         */
        postWorkflowHistoryProcessWithoutVariables: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/process_without_variables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryProcess
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/process
         */
        postWorkflowHistoryProcess: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/process`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowTasksGetusersexportheader
         * @request POST:/api/docpal/workflow/tasks/getUsersExportHeader
         */
        postWorkflowTasksGetusersexportheader: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/tasks/getUsersExportHeader`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryGettasksuserexportheaderDeprecate
         * @request POST:/api/docpal/workflow/history/getTasksUserExportHeader/
         */
        postWorkflowHistoryGettasksuserexportheaderDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/getTasksUserExportHeader/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryExportprocesshistoryDeprecate
         * @request POST:/api/docpal/workflow/history/exportProcessHistory/
         */
        postWorkflowHistoryExportprocesshistoryDeprecate: (
            data: WorkflowHistoryRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/exportProcessHistory/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryExportprocesshistory
         * @request POST:/api/docpal/workflow/history/exportProcessHistory
         */
        postWorkflowHistoryExportprocesshistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/exportProcessHistory`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryDetailproperties
         * @request POST:/api/docpal/workflow/history/detailProperties
         */
        postWorkflowHistoryDetailproperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/detailProperties`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryDetailpropertiesDeprecate
         * @request POST:/api/docpal/workflow/history/detailProperties/
         */
        postWorkflowHistoryDetailpropertiesDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/detailProperties/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryDetail
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/detail
         */
        postWorkflowHistoryDetail: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/detail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryDetailDeprecate
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/detail/
         */
        postWorkflowHistoryDetailDeprecate: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/detail/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowHistoryActivity
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/activity
         */
        postWorkflowHistoryActivity: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/activity`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowFormSubmit
         * @summary Submit a task form
         * @request POST:/api/docpal/workflow/form/submit
         */
        postWorkflowFormSubmit: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/form/submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowFilesUploadDeprecate
         * @summary Upload files
         * @request POST:/api/docpal/workflow/files/upload/
         */
        postWorkflowFilesUploadDeprecate: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/files/upload/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowFilesUpload
         * @summary Upload files
         * @request POST:/api/docpal/workflow/files/upload
         */
        postWorkflowFilesUpload: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/files/upload`,
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
        postWorkflowDeletemetadatamapping: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/deleteMetadataMapping`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowDeletedocumenttypeprofile
         * @request POST:/api/docpal/workflow/deleteDocumentTypeProfile
         */
        postWorkflowDeletedocumenttypeprofile: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/deleteDocumentTypeProfile`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowDataSubmitDeprecate
         * @request POST:/api/docpal/workflow/data/submit/
         */
        postWorkflowDataSubmitDeprecate: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/data/submit/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowDataSubmit
         * @request POST:/api/docpal/workflow/data/submit
         */
        postWorkflowDataSubmit: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/data/submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowDataSave
         * @request POST:/api/docpal/workflow/data/save
         */
        postWorkflowDataSave: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/data/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowDataSaveDeprecate
         * @request POST:/api/docpal/workflow/data/save/
         */
        postWorkflowDataSaveDeprecate: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/data/save/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowCommentTask
         * @summary Get task comments
         * @request GET:/api/docpal/workflow/comment/task
         */
        getWorkflowCommentTask: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/task`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowCommentTask
         * @summary Add task comment
         * @request POST:/api/docpal/workflow/comment/task
         */
        postWorkflowCommentTask: (
            query: {
                taskId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/task`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowCommentTaskDeprecate
         * @summary Add task comment
         * @request POST:/api/docpal/workflow/comment/task/
         */
        postWorkflowCommentTaskDeprecate: (
            query: {
                taskId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/task/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowCommentProcess
         * @summary Get process comments
         * @request GET:/api/docpal/workflow/comment/process
         */
        getWorkflowCommentProcess: (
            query: {
                processInstanceId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/process`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowCommentProcess
         * @summary Add process comment
         * @request POST:/api/docpal/workflow/comment/process
         */
        postWorkflowCommentProcess: (
            query: {
                processInstanceId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/process`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowCommentProcessDeprecate
         * @summary Add process comment
         * @request POST:/api/docpal/workflow/comment/process/
         */
        postWorkflowCommentProcessDeprecate: (
            query: {
                processInstanceId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/process/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowChecknameortitle
         * @request POST:/api/docpal/workflow/checkNameOrTitle
         */
        postWorkflowChecknameortitle: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/checkNameOrTitle`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostWorkflowAddcommentbytaskid
         * @summary Add process instance By taskId
         * @request POST:/api/docpal/workflow/addCommentByTaskId
         */
        postWorkflowAddcommentbytaskid: (
            query: {
                taskId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/addCommentByTaskId`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name GetWhatsappWebhook
         * @request GET:/api/docpal/whatsapp/webhook
         */
        getWhatsappWebhook: (
            query: {
                queryParams: Record<string, string>;
            },
            params: RequestParams = {},
        ) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/docpal/whatsapp/webhook`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name PostWhatsappWebhook
         * @request POST:/api/docpal/whatsapp/webhook
         */
        postWhatsappWebhook: (data: JSONObject, params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/docpal/whatsapp/webhook`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name PostWhatsappSendMessage
         * @request POST:/api/docpal/whatsapp/send_message
         */
        postWhatsappSendMessage: (data: WhatsAppMessageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSendMessageResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/whatsapp/send_message`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetWatermarkTemplates
         * @summary Query watermark template and watermark setting list
         * @request GET:/api/docpal/watermark/templates
         */
        getWatermarkTemplates: (params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/templates`,
                method: "GET",
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
         * @summary Watermark template Page
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
            this.request<ResultPageWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PostWatermarkDocumentTemplate
         * @summary Generate a watermark file with a certain watermark template
         * @request POST:/api/docpal/watermark/document/template
         */
        postWatermarkDocumentTemplate: (
            query: {
                templateId: string;
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/document/template`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PostWatermarkDocumentMultipleTemplateDeprecate
         * @summary Generate a watermark file with a certain watermark template
         * @request POST:/api/docpal/watermark/document/multiple/template/
         */
        postWatermarkDocumentMultipleTemplateDeprecate: (
            query: {
                templateId: string;
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/document/multiple/template/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name PostTypesNameNameVerify
         * @request POST:/api/docpal/types/name/{name}/verify
         */
        postTypesNameNameVerify: (name: string, data: Record<string, string>, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/types/name/${name}/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name PostTypesMetadatas
         * @summary Query all metadata list of the docpal type through name
         * @request POST:/api/docpal/types/metadatas
         */
        postTypesMetadatas: (data: DocPalType, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeMetadataDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/types/metadatas`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostTemplateEmailSendDeprecate
         * @request POST:/api/docpal/template/email/send/
         */
        postTemplateEmailSendDeprecate: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/template/email/send/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostTemplateEmailSend
         * @request POST:/api/docpal/template/email/send
         */
        postTemplateEmailSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/template/email/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostTemplateEmailDeprecate
         * @request POST:/api/docpal/template/email/
         */
        postTemplateEmailDeprecate: (data: TemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/template/email/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostTemplateEmail
         * @request POST:/api/docpal/template/email
         */
        postTemplateEmail: (data: TemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/template/email`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostTemplateDocument
         * @request POST:/api/docpal/template/document
         */
        postTemplateDocument: (
            data: {
                params: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/template/document`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostTemplateDocumentDeprecate
         * @request POST:/api/docpal/template/document/
         */
        postTemplateDocumentDeprecate: (
            data: {
                params: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/template/document/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostSystemfeatureInitentityDeprecate
         * @request POST:/api/docpal/systemfeature/initEntity/
         */
        postSystemfeatureInitentityDeprecate: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/initEntity/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostSystemfeatureInitentity
         * @request POST:/api/docpal/systemfeature/initEntity
         */
        postSystemfeatureInitentity: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/initEntity`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostSystemfeatureAddfunctionbyidDeprecate
         * @request POST:/api/docpal/systemfeature/addFunctionById/
         */
        postSystemfeatureAddfunctionbyidDeprecate: (data: SystemFeatureRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/addFunctionById/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostSystemfeatureAddfunctionbyid
         * @request POST:/api/docpal/systemfeature/addFunctionById
         */
        postSystemfeatureAddfunctionbyid: (data: SystemFeatureRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/addFunctionById`,
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
            this.request<ResultLanguageEntity, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultLanguageEntity, ResultString | (ResultString | Result)>({
                path: `/docpal/relation/addLanguage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name PostPolicyRetentionsSubmitevent
         * @summary Submit events through policy document id
         * @request POST:/api/docpal/policy/retentions/submitEvent
         */
        postPolicyRetentionsSubmitevent: (data: RetentionPolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/submitEvent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name PostPolicyRetentionsDocumentPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/retentions/document/page
         */
        postPolicyRetentionsDocumentPage: (data: RetentionPolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTORetentionPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/document/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PostPolicyDocumentsRemove
         * @summary Remove hold policy who bind document
         * @request POST:/api/docpal/policy/documents/remove
         */
        postPolicyDocumentsRemove: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/remove`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PostPolicyDocumentsPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/documents/page
         */
        postPolicyDocumentsPage: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PostPolicyDocumentsAdd
         * @summary Add a hold policy to bind document
         * @request POST:/api/docpal/policy/documents/add
         */
        postPolicyDocumentsAdd: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostNotification
         * @summary Create notification record
         * @request POST:/api/docpal/notification
         */
        postNotification: (data: NotificationRecord, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name DeleteNotification
         * @summary Batch delete notification record
         * @request DELETE:/api/docpal/notification
         */
        deleteNotification: (data: NotificationRecordDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/notification`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name PostNotificationSubscriber
         * @summary Create notification subscriber
         * @request POST:/api/docpal/notification/subscriber
         */
        postNotificationSubscriber: (data: NotificationSubscriberRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/subscriber`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name PostNotificationSubscriberDocument
         * @summary Create notification subscriber
         * @request POST:/api/docpal/notification/subscriber/document
         */
        postNotificationSubscriberDocument: (data: NotificationSubscriber, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/subscriber/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name PostNotificationSetting
         * @summary Create notification setting
         * @request POST:/api/docpal/notification/setting
         */
        postNotificationSetting: (data: NotificationSetting, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name PostNotificationSettingTypeTypeModuleModulename
         * @summary Query list of some one module
         * @request POST:/api/docpal/notification/setting/type/{type}/module/{moduleName}
         */
        postNotificationSettingTypeTypeModuleModulename: (
            type: "SUB_DOCUMENT" | "SUBSCRIPTION",
            moduleName: string,
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/setting/type/${type}/module/${moduleName}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostNotificationReadAll
         * @summary Read all notification record of current login user
         * @request POST:/api/docpal/notification/read/all
         */
        postNotificationReadAll: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/read/all`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostNotificationQueryNotificationList
         * @request POST:/api/docpal/notification/query_notification_list
         */
        postNotificationQueryNotificationList: (data: QueryNotificationRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTONotificationInfoDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/query_notification_list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostNotificationPage
         * @summary Page of notification record
         * @request POST:/api/docpal/notification/page
         */
        postNotificationPage: (
            query: {
                /** @format int32 */
                pageNum: number;
                /** @format int32 */
                pageSize: number;
            },
            data: NotificationRecord,
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/page`,
                method: "POST",
                query: query,
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultListMapStringObject, ResultString | (ResultString | Result)>({
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
         * @name PostMasterTablesForAdminRecordPage
         * @request POST:/api/docpal/master/tables/for_admin/record/page
         */
        postMasterTablesForAdminRecordPage: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/for_admin/record/page`,
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
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/batch/delete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name PostLogsRecentSearchPageV2
         * @request POST:/api/docpal/logs/recent/search/page_v2
         */
        postLogsRecentSearchPageV2: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTONestedSearchLogV2, ResultString | (ResultString | Result)>({
                path: `/docpal/logs/recent/search/page_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name PostLogsRecentSearchPage
         * @summary Query Recent Search
         * @request POST:/api/docpal/logs/recent/search/page
         */
        postLogsRecentSearchPage: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTONestedSearchLog, ResultString | (ResultString | Result)>({
                path: `/docpal/logs/recent/search/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name PostLogsRecentDocumentPage
         * @summary Query Recent Document
         * @request POST:/api/docpal/logs/recent/document/page
         */
        postLogsRecentDocumentPage: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOESDocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/logs/recent/document/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
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
         * @name PostInternalshareOthersDeprecate
         * @request POST:/api/docpal/internalShare/others/
         */
        postInternalshareOthersDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/others/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareOthers
         * @request POST:/api/docpal/internalShare/others
         */
        postInternalshareOthers: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/others`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareMeDeprecate
         * @request POST:/api/docpal/internalShare/me/
         */
        postInternalshareMeDeprecate: (data: InternalShareToMePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/me/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteInternalshareMeDeprecate
         * @request DELETE:/api/docpal/internalShare/me/
         */
        deleteInternalshareMeDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/me/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareMe
         * @request POST:/api/docpal/internalShare/me
         */
        postInternalshareMe: (data: InternalShareToMePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/me`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteInternalshareMe
         * @request DELETE:/api/docpal/internalShare/me
         */
        deleteInternalshareMe: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/me`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareGroups
         * @request POST:/api/docpal/internalShare/groups
         */
        postInternalshareGroups: (data: InternalShareByGroupsRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInternalShare, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/groups`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/checkDocumentIsInShare`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name GetInternalshare
         * @request GET:/api/docpal/internalShare
         */
        getInternalshare: (
            query: {
                queryDTO: InternalShareQueryDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshare
         * @request POST:/api/docpal/internalShare
         */
        postInternalshare: (data: InternalShareRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInternalShareAudit, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare`,
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
         * @name GetInternalshareDeprecate
         * @request GET:/api/docpal/internalShare/
         */
        getInternalshareDeprecate: (
            query: {
                queryDTO: InternalShareQueryDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostInternalshareDeprecate
         * @request POST:/api/docpal/internalShare/
         */
        postInternalshareDeprecate: (data: InternalShareRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInternalShareAudit, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/`,
                method: "POST",
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
         * @name PostFormDesignSubmitData
         * @summary Submit form data
         * @request POST:/api/docpal/form/design/submit/data
         */
        postFormDesignSubmitData: (data: FormDesignDataDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/form/design/submit/data`,
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
            this.request<ResultListLinkedHashMapStringObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/form/design/record/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/email/customize/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesCasetypeidRecordsPage
         * @summary Pagination Search data of deployed case type
         * @request POST:/api/docpal/case/types/{caseTypeId}/records/page
         */
        postCaseTypesCasetypeidRecordsPage: (
            caseTypeId: string,
            data: CmmnDashboardRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/records/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesTablePage
         * @summary Paging query of a case table
         * @request POST:/api/docpal/case/types/table/page
         */
        postCaseTypesTablePage: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/table/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostCaseTypesPage
         * @summary Pagination search
         * @request POST:/api/docpal/case/types/page
         */
        postCaseTypesPage: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCaseType, ResultString | (ResultString | Result)>({
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
            this.request<ResultListCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseInstanceCaseinstanceidVariables
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/variables
         */
        getCaseInstanceCaseinstanceidVariables: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<Record<string, object>, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/${caseInstanceId}/variables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostCaseInstanceCaseinstanceidVariables
         * @request POST:/api/docpal/case/instance/{caseInstanceId}/variables
         */
        postCaseInstanceCaseinstanceidVariables: (
            caseInstanceId: string,
            data: Record<string, object>,
            params: RequestParams = {},
        ) =>
            this.request<Record<string, object>, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/${caseInstanceId}/variables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstanceTriggerEvent
         * @summary Trigger event for completed
         * @request POST:/api/docpal/case/instance/trigger/event
         */
        postCaseInstanceTriggerEvent: (data: CmmnTriggerEventReqDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/trigger/event`,
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
            this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultCaseInstanceDTO, ResultString | (ResultString | Result)>({
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
         * @name PostCaseInstanceProcessStart
         * @summary Starting a sub-process of case instance
         * @request POST:/api/docpal/case/instance/process/start
         */
        postCaseInstanceProcessStart: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/process/start`,
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
        postCaseInstancePlanitems: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/planItems`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostCaseInstancePlanitemsPlanitemidEnable
         * @summary Enable plan item instance
         * @request POST:/api/docpal/case/instance/planItems/{planItemId}/enable
         */
        postCaseInstancePlanitemsPlanitemidEnable: (planItemId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/planItems/${planItemId}/enable`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostCaseInstancePlanitemsComplete
         * @summary Submit form data for complete plan item instance
         * @request POST:/api/docpal/case/instance/planItems/complete
         */
        postCaseInstancePlanitemsComplete: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/planItems/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstancePlanitemsActive
         * @summary Active a planItem instance
         * @request POST:/api/docpal/case/instance/planItems/active
         */
        postCaseInstancePlanitemsActive: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/planItems/active`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostCaseInstanceAuditlog
         * @summary Obtain Audit Log of a case instance
         * @request POST:/api/docpal/case/instance/auditLog
         */
        postCaseInstanceAuditlog: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/auditLog`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostCaseDashboardPage
         * @summary Pagination search (Case View Dashboard)
         * @request POST:/api/docpal/case/dashboard/page
         */
        postCaseDashboardPage: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnDashboard, ResultString | (ResultString | Result)>({
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
         * @name PostCaseDashboardInstanceCaseidProcessInstancePage
         * @summary Paging search process instance of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page
         */
        postCaseDashboardInstanceCaseidProcessInstancePage: (
            caseId: string,
            data: CmmnProcessRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginationDTOCmmnTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/process/instance/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboardInstanceActionPreRequisite
         * @summary Obtain Pre-requisite of planItem instance
         * @request POST:/api/docpal/case/dashboard/instance/action/pre-requisite
         */
        postCaseDashboardInstanceActionPreRequisite: (data: PlanItemInstanceDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/action/pre-requisite`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostCaseDashboardCasetypeCasetypeidRecordsPage
         * @summary Paging Query instance data for deployed case types for the currently logged in user
         * @request POST:/api/docpal/case/dashboard/caseType/{caseTypeId}/records/page
         */
        postCaseDashboardCasetypeCasetypeidRecordsPage: (
            caseTypeId: string,
            data: CmmnDashboardRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/records/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags TaskController
         * @name PostCalendarsValidate
         * @request POST:/api/docpal/calendars/validate
         */
        postCalendarsValidate: (params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars/validate`,
                method: "POST",
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
            this.request<ResultListCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
         * @name PostCabinetIdGenerateDocument
         * @request POST:/api/docpal/cabinet/{id}/generate/document
         */
        postCabinetIdGenerateDocument: (id: string, data: Record<string, object>, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}/generate/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetVerificationComplete
         * @summary verification complete of folder cabinet
         * @request POST:/api/docpal/cabinet/verification/complete
         */
        postCabinetVerificationComplete: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/verification/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetUploadFile
         * @summary Upload file of folder cabinet
         * @request POST:/api/docpal/cabinet/upload/file
         */
        postCabinetUploadFile: (
            data: {
                id: string;
                path: string;
                documentType: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/upload/file`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetPage
         * @summary Pagination search of document folder cabinet
         * @request POST:/api/docpal/cabinet/page
         */
        postCabinetPage: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetItem
         * @summary New Item
         * @request POST:/api/docpal/cabinet/item
         */
        postCabinetItem: (data: DFCRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentFolderCabinet, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/item`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetFilingDocument
         * @request POST:/api/docpal/cabinet/filing/document
         */
        postCabinetFilingDocument: (data: FilingCreateDocRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/filing/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetFilingCreateDocument
         * @request POST:/api/docpal/cabinet/filing/create/document
         */
        postCabinetFilingCreateDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/filing/create/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetExport
         * @request POST:/api/docpal/cabinet/export
         */
        postCabinetExport: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/export`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCabinetCreate
         * @summary Create Top folder cabinet
         * @request POST:/api/docpal/cabinet/create
         */
        postCabinetCreate: (data: DFCRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAutoCridDeprecate
         * @request GET:/api/docpal/auto/crId/
         */
        getAutoCridDeprecate: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/crId/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostAutoCridDeprecate
         * @request POST:/api/docpal/auto/crId/
         */
        postAutoCridDeprecate: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/crId/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAutoCrid
         * @request GET:/api/docpal/auto/crId
         */
        getAutoCrid: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/crId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostAutoCrid
         * @request POST:/api/docpal/auto/crId
         */
        postAutoCrid: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/crId`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAutoCaseid
         * @request GET:/api/docpal/auto/caseId
         */
        getAutoCaseid: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/caseId`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostAutoCaseid
         * @request POST:/api/docpal/auto/caseId
         */
        postAutoCaseid: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/caseId`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAutoCaseidDeprecate
         * @request GET:/api/docpal/auto/caseId/
         */
        getAutoCaseidDeprecate: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/caseId/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostAutoCaseidDeprecate
         * @request POST:/api/docpal/auto/caseId/
         */
        postAutoCaseidDeprecate: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/caseId/`,
                method: "POST",
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
            this.request<ResultBlockInheritedPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultListDocDTO, ResultString | (ResultString | Result)>({
                path: `/block/permission/filter`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name PostAiAskAiAiChatAskquestion
         * @request POST:/api/ai/ask_ai/ai_chat/askQuestion
         */
        postAiAskAiAiChatAskquestion: (data: AiSearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultAiChatAnswerResponseDTO, ResultString | (ResultString | Result)>({
                path: `/ai/ask_ai/ai_chat/askQuestion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name PostAiAskAiAiChatAddaicomment
         * @request POST:/api/ai/ask_ai/ai_chat/addAiComment
         */
        postAiAskAiAiChatAddaicomment: (data: AddAiCommentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/ai/ask_ai/ai_chat/addAiComment`,
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
                path: `/permissions/update/entry`,
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultEasyShareDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/share`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentUpdateaidocumentDeprecate
         * @request PATCH:/api/nuxeo/document/updateAiDocument/
         */
        patchNuxeoDocumentUpdateaidocumentDeprecate: (data: UpdateAiDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/updateAiDocument/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentUpdateaidocument
         * @request PATCH:/api/nuxeo/document/updateAiDocument
         */
        patchNuxeoDocumentUpdateaidocument: (data: UpdateAiDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/updateAiDocument`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentReplacefileV2Deprecate
         * @request PATCH:/api/nuxeo/document/replaceFile/v2/
         */
        patchNuxeoDocumentReplacefileV2Deprecate: (
            query: {
                openAiAnalyzeMetadata: boolean;
            },
            data: {
                document: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/replaceFile/v2/`,
                method: "PATCH",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentReplacefileV2
         * @request PATCH:/api/nuxeo/document/replaceFile/v2
         */
        patchNuxeoDocumentReplacefileV2: (
            query: {
                openAiAnalyzeMetadata: boolean;
            },
            data: {
                document: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/replaceFile/v2`,
                method: "PATCH",
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentReplacefile
         * @request PATCH:/api/nuxeo/document/replaceFile
         */
        patchNuxeoDocumentReplacefile: (
            data: {
                document: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/replaceFile`,
                method: "PATCH",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentReplacefileDeprecate
         * @request PATCH:/api/nuxeo/document/replaceFile/
         */
        patchNuxeoDocumentReplacefileDeprecate: (
            data: {
                document: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/replaceFile/`,
                method: "PATCH",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchNuxeoDocumentChangeType
         * @summary Update a document
         * @request PATCH:/api/nuxeo/document/change/docpal/type
         */
        patchNuxeoDocumentChangeType: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/change/docpal/type`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PatchNuxeoCommentsUpdateDeprecate
         * @summary Update a document comment
         * @request PATCH:/api/nuxeo/comments/update/
         */
        patchNuxeoCommentsUpdateDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/update/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PatchNuxeoCommentsUpdate
         * @summary Update a document comment
         * @request PATCH:/api/nuxeo/comments/update
         */
        patchNuxeoCommentsUpdate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/update`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowCommentDeprecate
         * @summary Delete comment
         * @request DELETE:/api/docpal/workflow/comment/
         */
        deleteWorkflowCommentDeprecate: (
            query: {
                commentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PatchWorkflowCommentDeprecate
         * @summary Update comment
         * @request PATCH:/api/docpal/workflow/comment/
         */
        patchWorkflowCommentDeprecate: (
            query: {
                commentId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment/`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowComment
         * @summary Delete comment
         * @request DELETE:/api/docpal/workflow/comment
         */
        deleteWorkflowComment: (
            query: {
                commentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PatchWorkflowComment
         * @summary Update comment
         * @request PATCH:/api/docpal/workflow/comment
         */
        patchWorkflowComment: (
            query: {
                commentId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/comment`,
                method: "PATCH",
                query: query,
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/templates/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name PatchPolicyRetentionsIdStatusStatus
         * @summary Update status through id
         * @request PATCH:/api/docpal/policy/retentions/{id}/status/{status}
         */
        patchPolicyRetentionsIdStatusStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name PatchPolicyRetentionsIdApprovalApproved
         * @summary Approval retention policy document
         * @request PATCH:/api/docpal/policy/retentions/{id}/approval/{approved}
         */
        patchPolicyRetentionsIdApprovalApproved: (id: number, approved: boolean, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/${id}/approval/${approved}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PatchPolicyDocumentsIdStatusStatus
         * @summary submit approved comment
         * @request PATCH:/api/docpal/policy/documents/{id}/status/{status}
         */
        patchPolicyDocumentsIdStatusStatus: (id: number, status: boolean, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/${id}/status/${status}`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/${id}/batch/record/status`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name PatchMasterTablesForAdminIdBatchRecordStatus
         * @request PATCH:/api/docpal/master/tables/for_admin/{id}/batch/record/status
         */
        patchMasterTablesForAdminIdBatchRecordStatus: (
            id: string,
            data: MTRecordRequestDTO,
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/for_admin/${id}/batch/record/status`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PatchCabinet
         * @summary Update Document Folder Cabinet
         * @request PATCH:/api/docpal/cabinet
         */
        patchCabinet: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetWopiFilesId
         * @request GET:/api/wopi/files/{id}
         */
        getWopiFilesId: (
            id: string,
            query: {
                access_token: string;
                readonly?: boolean;
                fileType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<FileDTO, ResultString | (ResultString | Result)>({
                path: `/wopi/files/${id}`,
                method: "GET",
                query: query,
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultListAclPermissionDTO, ResultString | (ResultString | Result)>({
                path: `/user/permission/all/${userId}`,
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserInformation, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultListAclUserRelationshipWithUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultAccessControlEntry, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/permission/entry/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags vocabulary-controller
         * @name GetNuxeoVocabularyId
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}
         */
        getNuxeoVocabularyId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags vocabulary-controller
         * @name GetNuxeoVocabularyIdDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}/
         */
        getNuxeoVocabularyIdDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserVirtualfolder2Setting
         * @request GET:/api/nuxeo/user/virtualfolder2/setting
         */
        getNuxeoUserVirtualfolder2Setting: (params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/virtualfolder2/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserVirtualfolderSetting
         * @request GET:/api/nuxeo/user/virtualfolder/setting
         * @deprecated
         */
        getNuxeoUserVirtualfolderSetting: (params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/virtualfolder/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserVirtualfolderSettingId
         * @request GET:/api/nuxeo/user/virtualfolder/setting/{id}
         */
        getNuxeoUserVirtualfolderSettingId: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/virtualfolder/setting/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserListheaders
         * @summary List all headers
         * @request GET:/api/nuxeo/user/listHeaders
         */
        getNuxeoUserListheaders: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/listHeaders`,
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/getApplication`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetNuxeoUserConfirmreset
         * @request GET:/api/nuxeo/user/confirmReset
         */
        getNuxeoUserConfirmreset: (
            query: {
                token: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/user/confirmReset`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name GetNuxeoTemplateTemplateid
         * @summary Obtain Document Template
         * @request GET:/api/nuxeo/template/{templateId}
         */
        getNuxeoTemplateTemplateid: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplate, ResultString | (ResultString | Result)>({
                path: `/nuxeo/template/${templateId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name GetNuxeoTemplateAll
         * @summary Get All Document Template
         * @request GET:/api/nuxeo/template/all
         */
        getNuxeoTemplateAll: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTemplate, ResultString | (ResultString | Result)>({
                path: `/nuxeo/template/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name GetNuxeoSharePrepareDownloadDocid
         * @summary Get Status of download file is complete
         * @request GET:/api/nuxeo/share/prepare/download/{docId}
         */
        getNuxeoSharePrepareDownloadDocid: (docId: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/share/prepare/download/${docId}`,
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
            this.request<ResultSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/sfolder/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetNuxeoSfolderDeprecate
         * @request GET:/api/nuxeo/sfolder/
         */
        getNuxeoSfolderDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/sfolder/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetNuxeoSfolder
         * @request GET:/api/nuxeo/sfolder
         */
        getNuxeoSfolder: (params: RequestParams = {}) =>
            this.request<ResultListSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/sfolder`,
                method: "GET",
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
            this.request<ResultViewSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/setting/view`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchPageprovidernameAggConfigs
         * @summary Get Aggregation Configs by search page provider name
         * @request GET:/api/nuxeo/search/{pageProviderName}/agg_configs
         */
        getNuxeoSearchPageprovidernameAggConfigs: (pageProviderName: string, params: RequestParams = {}) =>
            this.request<ResultListAggregationConfigResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/${pageProviderName}/agg_configs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchPageprovidernameAggConfigsDeprecate
         * @summary Get Aggregation Configs by search page provider name
         * @request GET:/api/nuxeo/search/{pageProviderName}/agg_configs/
         */
        getNuxeoSearchPageprovidernameAggConfigsDeprecate: (pageProviderName: string, params: RequestParams = {}) =>
            this.request<ResultListAggregationConfigResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/${pageProviderName}/agg_configs/`,
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/textSearchTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchQueryNestedSearchLog
         * @request GET:/api/nuxeo/search/query_nested_search_log
         */
        getNuxeoSearchQueryNestedSearchLog: (params: RequestParams = {}) =>
            this.request<ResultListNestedSearchLogRecord, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/query_nested_search_log`,
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/getSearchExtends/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchGetexportheader
         * @summary get export header for Nested Search
         * @request GET:/api/nuxeo/search/getExportHeader
         */
        getNuxeoSearchGetexportheader: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/getExportHeader`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchAssetsSearch
         * @summary Assets Search
         * @request GET:/api/nuxeo/search/assets_search
         */
        getNuxeoSearchAssetsSearch: (
            query: {
                /** DocPal search (Request) */
                searchRequestDTO: DocPalSearchRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultESSearchResultResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/assets_search`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchAssetsSearchDeprecate
         * @summary Assets Search
         * @request GET:/api/nuxeo/search/assets_search/
         */
        getNuxeoSearchAssetsSearchDeprecate: (
            query: {
                /** DocPal search (Request) */
                searchRequestDTO: DocPalSearchRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultESSearchResultResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/assets_search/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetNuxeoSearchAlluser
         * @summary List all user in DocPal
         * @request GET:/api/nuxeo/search/allUser
         */
        getNuxeoSearchAlluser: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/allUser`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicSharePreview
         * @request GET:/api/nuxeo/public/share/preview
         */
        getNuxeoPublicSharePreview: (
            query: {
                password: string;
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/share/preview`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicShareDownload
         * @request GET:/api/nuxeo/public/share/download
         */
        getNuxeoPublicShareDownload: (
            query: {
                password: string;
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/share/download`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicShareDocumentDocumentid
         * @summary get one document detail of share document
         * @request GET:/api/nuxeo/public/share/document/{documentId}
         */
        getNuxeoPublicShareDocumentDocumentid: (
            documentId: string,
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/share/document/${documentId}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicDocumentDocumentid
         * @summary get one document detail of share document
         * @request GET:/api/nuxeo/public/document/{documentId}
         */
        getNuxeoPublicDocumentDocumentid: (
            documentId: string,
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/document/${documentId}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicDocument
         * @request GET:/api/nuxeo/public/document
         */
        getNuxeoPublicDocument: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetNuxeoPublicShareDocument
         * @request GET:/api/nuxeo/public/share/document
         */
        getNuxeoPublicShareDocument: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/public/share/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetNuxeoMqStreams
         * @request GET:/api/nuxeo/mq/streams
         */
        getNuxeoMqStreams: (params: RequestParams = {}) =>
            this.request<ResultMapStringMQProperties, ResultString | (ResultString | Result)>({
                path: `/nuxeo/mq/streams`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name GetNuxeoJobWriteaitrainingdata
         * @request GET:/api/nuxeo/job/writeAiTrainingData
         */
        getNuxeoJobWriteaitrainingdata: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/job/writeAiTrainingData`,
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/synchronize`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetNuxeoIdentitySyncldapusersandgroupsbyid
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/syncLdapUsersAndGroupsById
         */
        getNuxeoIdentitySyncldapusersandgroupsbyid: (
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/syncLdapUsersAndGroupsById`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetNuxeoIdentitySyncldapusersandgroupsbyidDeprecate
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/syncLdapUsersAndGroupsById/
         */
        getNuxeoIdentitySyncldapusersandgroupsbyidDeprecate: (
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/syncLdapUsersAndGroupsById/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetNuxeoGetofficetokenId
         * @request GET:/api/nuxeo/getOfficeToken/{id}
         */
        getNuxeoGetofficetokenId: (
            id: string,
            query?: {
                fileType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/getOfficeToken/${id}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetNuxeoExtensionSubtypesDoctypeDeprecate
         * @summary Get available subtypes
         * @request GET:/api/nuxeo/extension/subtypes/{docType}/
         */
        getNuxeoExtensionSubtypesDoctypeDeprecate: (docType: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/nuxeo/extension/subtypes/${docType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetNuxeoExtensionSubtypesDoctype
         * @summary Get available subtypes
         * @request GET:/api/nuxeo/extension/subtypes/{docType}
         */
        getNuxeoExtensionSubtypesDoctype: (docType: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/nuxeo/extension/subtypes/${docType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetNuxeoExtensionDomains
         * @summary Get domain types
         * @request GET:/api/nuxeo/extension/domains
         */
        getNuxeoExtensionDomains: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/nuxeo/extension/domains`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetNuxeoExtensionDomainsDeprecate
         * @summary Get domain types
         * @request GET:/api/nuxeo/extension/domains/
         */
        getNuxeoExtensionDomainsDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/nuxeo/extension/domains/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetNuxeoExtensionDoctypes
         * @summary Get all document types
         * @request GET:/api/nuxeo/extension/doctypes
         */
        getNuxeoExtensionDoctypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/nuxeo/extension/doctypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetNuxeoExtensionDoctypesDeprecate
         * @summary Get all document types
         * @request GET:/api/nuxeo/extension/doctypes/
         */
        getNuxeoExtensionDoctypesDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/nuxeo/extension/doctypes/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDocumentidOcrState
         * @request GET:/api/nuxeo/document/{documentId}/ocr/state
         */
        getNuxeoDocumentDocumentidOcrState: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/${documentId}/ocr/state`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Template
         * @name GetNuxeoDocumentTemplates
         * @request GET:/api/nuxeo/document/templates
         */
        getNuxeoDocumentTemplates: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTemplate, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/templates`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Template
         * @name GetNuxeoDocumentTemplatesId
         * @request GET:/api/nuxeo/document/templates/{id}
         */
        getNuxeoDocumentTemplatesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplate, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/templates/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentRetryClassificationUploadidDeprecate
         * @request GET:/api/nuxeo/document/retry_classification/{uploadId}/
         */
        getNuxeoDocumentRetryClassificationUploadidDeprecate: (uploadId: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/retry_classification/${uploadId}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentRetryClassificationUploadid
         * @request GET:/api/nuxeo/document/retry_classification/{uploadId}
         */
        getNuxeoDocumentRetryClassificationUploadid: (uploadId: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/retry_classification/${uploadId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentQueryaianalyzeIdorpathDeprecate
         * @request GET:/api/nuxeo/document/queryAiAnalyze/{idOrPath}/
         */
        getNuxeoDocumentQueryaianalyzeIdorpathDeprecate: (idOrPath: string, params: RequestParams = {}) =>
            this.request<ResultAiAnalysisDocumentVO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/queryAiAnalyze/${idOrPath}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentQueryaianalyzeIdorpath
         * @request GET:/api/nuxeo/document/queryAiAnalyze/{idOrPath}
         */
        getNuxeoDocumentQueryaianalyzeIdorpath: (idOrPath: string, params: RequestParams = {}) =>
            this.request<ResultAiAnalysisDocumentVO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/queryAiAnalyze/${idOrPath}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentOcrsPatch
         * @request GET:/api/nuxeo/document/ocrs/patch
         */
        getNuxeoDocumentOcrsPatch: (
            query: {
                documentIds: string[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/ocrs/patch`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentOcrsPatchResult
         * @request GET:/api/nuxeo/document/ocrs/patch/result
         */
        getNuxeoDocumentOcrsPatchResult: (params: RequestParams = {}) =>
            this.request<ResultLong, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/ocrs/patch/result`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentOcrPatchData
         * @request GET:/api/nuxeo/document/ocr/patch/data
         */
        getNuxeoDocumentOcrPatchData: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/ocr/patch/data`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentIsfollowedDeprecate
         * @summary Check if document is followed by current user
         * @request GET:/api/nuxeo/document/isFollowed/
         */
        getNuxeoDocumentIsfollowedDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/isFollowed/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentIsfollowed
         * @summary Check if document is followed by current user
         * @request GET:/api/nuxeo/document/isFollowed
         */
        getNuxeoDocumentIsfollowed: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/isFollowed`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentInithocrclearup
         * @request GET:/api/nuxeo/document/initHocrClearUp
         */
        getNuxeoDocumentInithocrclearup: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/initHocrClearUp`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentInitconversionclearup
         * @request GET:/api/nuxeo/document/initConversionClearUp
         */
        getNuxeoDocumentInitconversionclearup: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/initConversionClearUp`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentExecuteOcrPatch
         * @request GET:/api/nuxeo/document/execute/ocr/patch
         */
        getNuxeoDocumentExecuteOcrPatch: (params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/execute/ocr/patch`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDownloadTempFileIdDeprecate
         * @request GET:/api/nuxeo/document/download_temp_file/{id}/
         */
        getNuxeoDocumentDownloadTempFileIdDeprecate: (id: number, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/download_temp_file/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentDownloadTempFileId
         * @request GET:/api/nuxeo/document/download_temp_file/{id}
         */
        getNuxeoDocumentDownloadTempFileId: (id: number, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/download_temp_file/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentAclPermissionDeprecate
         * @summary Get user maximum permission on a document
         * @request GET:/api/nuxeo/document/acl/permission/
         */
        getNuxeoDocumentAclPermissionDeprecate: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/permission/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetNuxeoDocumentAclPermission
         * @summary Get user maximum permission on a document
         * @request GET:/api/nuxeo/document/acl/permission
         */
        getNuxeoDocumentAclPermission: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetNuxeoConversionGettemplatefilepath
         * @summary Get Template Path
         * @request GET:/api/nuxeo/conversion/getTemplateFilePath
         */
        getNuxeoConversionGettemplatefilepath: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/getTemplateFilePath`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetNuxeoConversionGetsupportedformat
         * @summary Get Supported Formats
         * @request GET:/api/nuxeo/conversion/getSupportedFormat
         */
        getNuxeoConversionGetsupportedformat: (params: RequestParams = {}) =>
            this.request<ResultMapStringListObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/getSupportedFormat`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetNuxeoConversionGetfilepath
         * @summary Get Files Path
         * @request GET:/api/nuxeo/conversion/getFilePath
         * @deprecated
         */
        getNuxeoConversionGetfilepath: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/getFilePath`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetNuxeoConversionGetconversionhistory
         * @summary Get Conversion History
         * @request GET:/api/nuxeo/conversion/getConversionHistory
         */
        getNuxeoConversionGetconversionhistory: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFileConversionRecord, ResultString | (ResultString | Result)>({
                path: `/nuxeo/conversion/getConversionHistory`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetNuxeoCollectionAllDeprecate
         * @request GET:/api/nuxeo/collection/all/
         */
        getNuxeoCollectionAllDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/all/`,
                method: "GET",
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
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/nuxeo/admin/setting/language`,
                method: "GET",
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/nuxeo/admin/setting/${systemId}`,
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
            this.request<ResultListCustomIconDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListBusinessResultRecord, ResultString | (ResultString | Result)>({
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
            this.request<ResultListMQMessageTotalDTO, ResultString | (ResultString | Result)>({
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
        getMessageQueueReportStatusgroup: (params: RequestParams = {}) =>
            this.request<ResultListMQConsumeGroupStatusDTO, ResultString | (ResultString | Result)>({
                path: `/message/queue/report/statusGroup`,
                method: "GET",
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
        getMessageQueueReportDaygroup: (params: RequestParams = {}) =>
            this.request<ResultListMQDayTotalDTO, ResultString | (ResultString | Result)>({
                path: `/message/queue/report/dayGroup`,
                method: "GET",
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
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/message/queue/consumes`,
                method: "GET",
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowVersionVersionidBpmnxml
         * @summary Download BPMN20.xml through version id of a workflow
         * @request GET:/api/docpal/workflow/version/{versionId}/bpmnXml
         */
        getWorkflowVersionVersionidBpmnxml: (versionId: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/version/${versionId}/bpmnXml`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
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
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/version/bpmnXml`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowStartProperties
         * @summary Retrieve form properties of start-task
         * @request GET:/api/docpal/workflow/start/properties
         */
        getWorkflowStartProperties: (
            query?: {
                processKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/start/properties`,
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            query: {
                request: DocumentTypeMetadataMapping;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeMetadataMapping, ResultString | (ResultString | Result)>({
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            query: {
                entity: MetadataSetting;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
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
                folderName?: string;
                folderTitle?: string;
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
            this.request<ResultListDocumentTypeProfileSetting, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringListMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/queryDocumentTypeProFileSettings`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowProcessInstanceProcessinstanceid
         * @request GET:/api/docpal/workflow/process/instance/{processInstanceId}
         */
        getWorkflowProcessInstanceProcessinstanceid: (processInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultProcessInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/instance/${processInstanceId}`,
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
            query: {
                processKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/getProcessDefinitionList`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowProcessGetprocessbyprocdefid
         * @request GET:/api/docpal/workflow/process/getProcessByProcDefId
         */
        getWorkflowProcessGetprocessbyprocdefid: (
            query: {
                processByProcDefId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListUserTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/getProcessByProcDefId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowProcessDefinitionProcessdefinitionkeyHistory
         * @summary Find historical process definitions through process definition key
         * @request GET:/api/docpal/workflow/process/definition/{processDefinitionKey}/history
         */
        getWorkflowProcessDefinitionProcessdefinitionkeyHistory: (
            processDefinitionKey: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/definition/${processDefinitionKey}/history`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowIsdocumetidcanstartadhoc
         * @request GET:/api/docpal/workflow/isDocumetIdCanStartAdhoc
         */
        getWorkflowIsdocumetidcanstartadhoc: (
            query: {
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/isDocumetIdCanStartAdhoc`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowIsdocumetidcanapproval
         * @request GET:/api/docpal/workflow/isDocumetIdCanApproval
         */
        getWorkflowIsdocumetidcanapproval: (
            query: {
                documentId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/isDocumetIdCanApproval`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowHistoryGethistoryexportheader
         * @request GET:/api/docpal/workflow/history/getHistoryExportHeader
         */
        getWorkflowHistoryGethistoryexportheader: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/getHistoryExportHeader`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowHistoryGethistoryexportheaderDeprecate
         * @request GET:/api/docpal/workflow/history/getHistoryExportHeader/
         */
        getWorkflowHistoryGethistoryexportheaderDeprecate: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/history/getHistoryExportHeader/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetcommentbyprocessinstanceid
         * @summary get CommentBy ProcessInstanceId
         * @request GET:/api/docpal/workflow/getCommentByProcessInstanceId
         */
        getWorkflowGetcommentbyprocessinstanceid: (
            query: {
                taskId: string;
                processInstanceId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/getCommentByProcessInstanceId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGetbusinesskeylist
         * @request GET:/api/docpal/workflow/getBusinessKeyList
         */
        getWorkflowGetbusinesskeylist: (
            query: {
                businessKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultLinkedHashSetString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/getBusinessKeyList`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGenerateCaseidDeprecate
         * @request GET:/api/docpal/workflow/generate/caseId/
         */
        getWorkflowGenerateCaseidDeprecate: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/generate/caseId/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowGenerateCaseid
         * @request GET:/api/docpal/workflow/generate/caseId
         */
        getWorkflowGenerateCaseid: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/generate/caseId`,
                method: "GET",
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
            this.request<ResultListBpmnDynamicFormDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowFormProperties
         * @summary Retrieve form properties of task instance
         * @request GET:/api/docpal/workflow/form/properties
         */
        getWorkflowFormProperties: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/form/properties`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetWorkflowCleanup
         * @request GET:/api/docpal/workflow/cleanUp
         */
        getWorkflowCleanup: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/cleanUp`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name GetWhatsappGetMessageTemplates
         * @request GET:/api/docpal/whatsapp/get_message_templates
         * @deprecated
         */
        getWhatsappGetMessageTemplates: (params: RequestParams = {}) =>
            this.request<ResultListMessageTemplateDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/whatsapp/get_message_templates`,
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/templates/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetWatermarkTemplatesAll
         * @summary Query watermark template and watermark setting list
         * @request GET:/api/docpal/watermark/templates/all
         */
        getWatermarkTemplatesAll: (params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/templates/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkTemplateTemplateid
         * @summary Query list of watermark settings by template id
         * @request GET:/api/docpal/watermark/template/{templateId}
         */
        getWatermarkTemplateTemplateid: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/template/${templateId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkSettingsPreviewId
         * @request GET:/api/docpal/watermark/settings/preview/{id}
         */
        getWatermarkSettingsPreviewId: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/settings/preview/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetWatermarkDocumentPreview
         * @request GET:/api/docpal/watermark/document/preview
         */
        getWatermarkDocumentPreview: (
            query: {
                watermarkTemplateId: string;
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/watermark/document/preview`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetTypesNameName
         * @summary Obtain docpal type detail through name
         * @request GET:/api/docpal/types/name/{name}
         */
        getTypesNameName: (name: string, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/types/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetTypesNameNameRelated
         * @summary Query all related docpal type of current docpal type
         * @request GET:/api/docpal/types/name/{name}/related
         */
        getTypesNameNameRelated: (name: string, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeRelated, ResultString | (ResultString | Result)>({
                path: `/docpal/types/name/${name}/related`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetTypesNameNameMetadatas
         * @summary Query all metadata list of the docpal type through name
         * @request GET:/api/docpal/types/name/{name}/metadatas
         */
        getTypesNameNameMetadatas: (name: string, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeMetadataDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/types/name/${name}/metadatas`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetTypesCompareIntersection
         * @summary Compare metadata differences between two DocPal types
         * @request GET:/api/docpal/types/compare/intersection
         */
        getTypesCompareIntersection: (oldDocPalType: string, newDocPalType: string, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeDistinction, ResultString | (ResultString | Result)>({
                path: `/docpal/types/compare/intersection`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetTypesActive
         * @summary Find all docpal type
         * @request GET:/api/docpal/types/active
         */
        getTypesActive: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/types/active`,
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
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/getFeatures/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetSystemfeatureFindallDeprecate
         * @request GET:/api/docpal/systemfeature/findAll/
         */
        getSystemfeatureFindallDeprecate: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/findAll/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetSystemfeatureFindall
         * @request GET:/api/docpal/systemfeature/findAll
         */
        getSystemfeatureFindall: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/systemfeature/findAll`,
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
            this.request<ResultListMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/setting/workflow/condition/setting`,
                method: "GET",
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
            this.request<ResultListFormPropertiesRelation, ResultString | (ResultString | Result)>({
                path: `/docpal/relation/query`,
                method: "GET",
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
            this.request<ResultListLanguageEntity, ResultString | (ResultString | Result)>({
                path: `/docpal/relation/queryLanguage`,
                method: "GET",
                query: query,
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/docpal/relation/queryLanguageLocale`,
                method: "GET",
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/relation/isLdapMode`,
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultKeyCloakPropertyVO, ResultString | (ResultString | Result)>({
                path: `/docpal/relation/getKeyCloakProperty`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentions
         * @summary Obtain all retention policy that active
         * @request GET:/api/docpal/policy/retentions
         */
        getPolicyRetentions: (params: RequestParams = {}) =>
            this.request<ResultListRetentionPolicy, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsRetentionpolicyidEvents
         * @summary Get policy events through policy id
         * @request GET:/api/docpal/policy/retentions/{retentionPolicyId}/events
         */
        getPolicyRetentionsRetentionpolicyidEvents: (retentionPolicyId: number, params: RequestParams = {}) =>
            this.request<ResultListRetentionPolicyEvent, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/${retentionPolicyId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsPolicyidScanExpired
         * @request GET:/api/docpal/policy/retentions/{policyId}/scan/expired
         */
        getPolicyRetentionsPolicyidScanExpired: (policyId: number, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/${policyId}/scan/expired`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsPolicyidScanDocument
         * @summary Scan all documents to find the list of documents that match this retention policy
         * @request GET:/api/docpal/policy/retentions/{policyId}/scan/document
         */
        getPolicyRetentionsPolicyidScanDocument: (policyId: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/${policyId}/scan/document`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsId
         * @summary Obtain a retention policy detail
         * @request GET:/api/docpal/policy/retentions/{id}
         */
        getPolicyRetentionsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsScanExpired
         * @summary Scan all expired documents to find the list of documents that match all retention policy
         * @request GET:/api/docpal/policy/retentions/scan/expired
         */
        getPolicyRetentionsScanExpired: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/scan/expired`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsScanDocument
         * @summary Scan all documents to find the list of documents that match all retention policy
         * @request GET:/api/docpal/policy/retentions/scan/document
         */
        getPolicyRetentionsScanDocument: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/scan/document`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsEvents
         * @summary Get all policy events
         * @request GET:/api/docpal/policy/retentions/events
         */
        getPolicyRetentionsEvents: (params: RequestParams = {}) =>
            this.request<ResultMapLongListRetentionPolicyEvent, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsDocumentId
         * @summary Obtain retention policy detail
         * @request GET:/api/docpal/policy/retentions/document/{id}
         */
        getPolicyRetentionsDocumentId: (id: number, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/document/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyRetentionsDocumentPageConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/policy/retentions/document/page/conditions
         */
        getPolicyRetentionsDocumentPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/retentions/document/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyHolds
         * @summary Query all hold policy
         * @request GET:/api/docpal/policy/holds
         */
        getPolicyHolds: (params: RequestParams = {}) =>
            this.request<ResultListHoldPolicy, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/holds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyController
         * @name GetPolicyHoldsId
         * @summary Obtain hold policy detail
         * @request GET:/api/docpal/policy/holds/{id}
         */
        getPolicyHoldsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/holds/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetPolicyDocumentsId
         * @summary Obtain policy document detail
         * @request GET:/api/docpal/policy/documents/{id}
         */
        getPolicyDocumentsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name DeletePolicyDocumentsId
         * @request DELETE:/api/docpal/policy/documents/{id}
         */
        deletePolicyDocumentsId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetPolicyDocumentsPageConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/policy/documents/page/conditions
         */
        getPolicyDocumentsPageConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetPolicyDocumentsDocumentDocumentid
         * @summary Obtain policy who document used
         * @request GET:/api/docpal/policy/documents/document/{documentId}
         */
        getPolicyDocumentsDocumentDocumentid: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/document/${documentId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetPolicyDocumentsDocumentDocumentidApproval
         * @summary Query my policy who document used
         * @request GET:/api/docpal/policy/documents/document/{documentId}/approval
         */
        getPolicyDocumentsDocumentDocumentidApproval: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/docpal/policy/documents/document/${documentId}/approval`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalLandingController
         * @name GetPersonalLanding
         * @request GET:/api/docpal/personal/landing
         */
        getPersonalLanding: (params: RequestParams = {}) =>
            this.request<ResultPersonalLandingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/personal/landing`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetNotificationUnreadNumber
         * @summary Query count number of unread for current login user
         * @request GET:/api/docpal/notification/unRead/number
         */
        getNotificationUnreadNumber: (params: RequestParams = {}) =>
            this.request<any, ResultString | (ResultString | Result) | void>({
                path: `/docpal/notification/unRead/number`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name GetNotificationSubscriberSubscriberFolders
         * @summary Find folder list of subscriber
         * @request GET:/api/docpal/notification/subscriber/{subscriber}/folders
         */
        getNotificationSubscriberSubscriberFolders: (subscriber: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/subscriber/${subscriber}/folders`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name GetNotificationSubscriberSubscriberSubscriberIdorpathIdorpath
         * @summary Query whether the user is subscribed to the directory
         * @request GET:/api/docpal/notification/subscriber/subscriber/{subscriber}/idOrPath/{idOrPath}
         */
        getNotificationSubscriberSubscriberSubscriberIdorpathIdorpath: (
            subscriber: string,
            idOrPath: string,
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/subscriber/subscriber/${subscriber}/idOrPath/${idOrPath}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name DeleteNotificationSubscriberSubscriberSubscriberIdorpathIdorpath
         * @summary Remove notification subscriber
         * @request DELETE:/api/docpal/notification/subscriber/subscriber/{subscriber}/idOrPath/{idOrPath}
         */
        deleteNotificationSubscriberSubscriberSubscriberIdorpathIdorpath: (
            subscriber: string,
            idOrPath: string,
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/subscriber/subscriber/${subscriber}/idOrPath/${idOrPath}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name GetNotificationSettingTypeTypeAll
         * @summary All list of notification setting
         * @request GET:/api/docpal/notification/setting/type/{type}/all
         */
        getNotificationSettingTypeTypeAll: (type: "SUB_DOCUMENT" | "SUBSCRIPTION", params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/setting/type/${type}/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name GetNotificationSettingModuleName
         * @request GET:/api/docpal/notification/setting/module_name
         * @deprecated
         */
        getNotificationSettingModuleName: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/setting/module_name`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetNotificationQueryOperatorList
         * @request GET:/api/docpal/notification/query_operator_list
         * @deprecated
         */
        getNotificationQueryOperatorList: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/query_operator_list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetNotificationQueryNotificationUnreadCountList
         * @request GET:/api/docpal/notification/query_notification_unread_count_list
         */
        getNotificationQueryNotificationUnreadCountList: (params: RequestParams = {}) =>
            this.request<ResultListNotificationUnreadCountDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/query_notification_unread_count_list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetNotificationQueryNotificationFilter
         * @request GET:/api/docpal/notification/query_notification_filter
         */
        getNotificationQueryNotificationFilter: (params: RequestParams = {}) =>
            this.request<ResultListCheckBoxDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/notification/query_notification_filter`,
                method: "GET",
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
            this.request<ResultListMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesId
         * @summary Get data structure of master table and include associated table structures
         * @request GET:/api/docpal/master/tables/{id}
         */
        getMasterTablesId: (id: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/${id}`,
                method: "GET",
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
            this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/${id}/structure`,
                method: "GET",
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/${id}/acls`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesTest
         * @request GET:/api/docpal/master/tables/test
         */
        getMasterTablesTest: (params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/test`,
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
            this.request<ResultListMTRelationResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/relation/${id}`,
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
            this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesForAdminRelationId
         * @summary query relation of master table
         * @request GET:/api/docpal/master/tables/for_admin/relation/{id}
         */
        getMasterTablesForAdminRelationId: (id: string, params: RequestParams = {}) =>
            this.request<ResultListMTRelationResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/for_admin/relation/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesForAdminRecord
         * @summary query record with related fields of master table for admin
         * @request GET:/api/docpal/master/tables/for_admin/record
         */
        getMasterTablesForAdminRecord: (
            query: {
                id: string;
                recordId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/for_admin/record`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetMasterTablesFindAllByUser
         * @summary Get all master tables by user
         * @request GET:/api/docpal/master/tables/find_all_by_user
         */
        getMasterTablesFindAllByUser: (params: RequestParams = {}) =>
            this.request<ResultListMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/master/tables/find_all_by_user`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name GetInternalshareInitscheduler
         * @request GET:/api/docpal/internalShare/initScheduler
         */
        getInternalshareInitscheduler: (
            query: {
                /** @format date-time */
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/initScheduler`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name GetInternalshareInitschedulerDeprecate
         * @request GET:/api/docpal/internalShare/initScheduler/
         */
        getInternalshareInitschedulerDeprecate: (
            query: {
                /** @format date-time */
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/docpal/internalShare/initScheduler/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetFormDesign
         * @summary Query form design
         * @request GET:/api/docpal/form/design
         */
        getFormDesign: (
            query?: {
                name?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormDesignResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/form/design`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name DeleteFormDesign
         * @request DELETE:/api/docpal/form/design
         */
        deleteFormDesign: (
            query: {
                tableName: string;
                caseId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<GenerateDocumentMode, ResultString | (ResultString | Result)>({
                path: `/docpal/form/design`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetFormDesignIdDetail
         * @summary Retrieve form design
         * @request GET:/api/docpal/form/design/{id}/detail
         */
        getFormDesignIdDetail: (id: string, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/form/design/${id}/detail`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DAMSettingController
         * @name GetDamSettings
         * @request GET:/api/docpal/dam/settings
         */
        getDamSettings: (params: RequestParams = {}) =>
            this.request<ResultMapStringListDAMConversionSetting, ResultString | (ResultString | Result)>({
                path: `/docpal/dam/settings`,
                method: "GET",
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
            this.request<ResultListCaseType, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types`,
                method: "GET",
                query: query,
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
        getCaseTypesIdStylejson: (id: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${id}/styleJson`,
                method: "GET",
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
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${id}/startTask`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesIdPrimaryform
         * @summary Get information form of case type
         * @request GET:/api/docpal/case/types/{id}/primaryForm
         */
        getCaseTypesIdPrimaryform: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${id}/primaryForm`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeid
         * @summary Retrieve case type detail
         * @request GET:/api/docpal/case/types/{caseTypeId}
         */
        getCaseTypesCasetypeid: (
            caseTypeId: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeidTables
         * @summary Retrieve the list of case tables that belong to the specified case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/tables
         */
        getCaseTypesCasetypeidTables: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCaseTable, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeidRecordsPageConditions
         * @summary Obtain all conditions that Pagination Search data of deployed case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/records/page/conditions
         */
        getCaseTypesCasetypeidRecordsPageConditions: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/records/page/conditions`,
                method: "GET",
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/permissions`,
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
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/permissions/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeidInstances
         * @summary Retrieve all case instances of this case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/instances
         */
        getCaseTypesCasetypeidInstances: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnInstance, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesCasetypeidDeployVersion
         * @summary Query cmmn version information of the last successfully deployed version
         * @request GET:/api/docpal/case/types/{caseTypeId}/deploy/version
         */
        getCaseTypesCasetypeidDeployVersion: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultCaseModelDraft, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/deploy/version`,
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/permissions/rules`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesMy
         * @summary Find out what cases the logged-in user can see.
         * @request GET:/api/docpal/case/types/my
         */
        getCaseTypesMy: (params: RequestParams = {}) =>
            this.request<ResultListCaseType, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/my`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetCaseTypesDeploymentidDeploymentid
         * @summary Retrieve case type detail
         * @request GET:/api/docpal/case/types/deploymentId/{deploymentId}
         */
        getCaseTypesDeploymentidDeploymentid: (deploymentId: string, params: RequestParams = {}) =>
            this.request<ResultCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/deploymentId/${deploymentId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceCasetypeidStarttask
         * @summary Retrieve start humanTask of production version of case definition
         * @request GET:/api/docpal/case/instance/{caseTypeId}/startTask
         */
        getCaseInstanceCasetypeidStarttask: (
            caseTypeId: string,
            query?: {
                startMatchSign?: string;
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/${caseTypeId}/startTask`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceCaseinstanceidMilestoneStatus
         * @summary Obtain Milestone Status of a case instance
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/milestone/status
         */
        getCaseInstanceCaseinstanceidMilestoneStatus: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/${caseInstanceId}/milestone/status`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseInstanceCaseinstanceidForms
         * @summary Retrieve all forms through a case instance
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/forms
         */
        getCaseInstanceCaseinstanceidForms: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/${caseInstanceId}/forms`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseInstanceCaseinstanceidEvents
         * @summary Retrieve all events from a case instance
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/events
         */
        getCaseInstanceCaseinstanceidEvents: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListUserEventInstanceDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultCaseInstanceFormDataDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/tasks/${taskId}/form`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
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
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/process/definitions`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
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
            this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/planItems/${planItemId}/form`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseInstanceList
         * @summary Retrieve all case instances of this case type
         * @request GET:/api/docpal/case/instance/list
         */
        getCaseInstanceList: (
            query?: {
                id?: string;
                caseTypeId?: string;
                /** Case definition version Id */
                cmmnVersionId?: string;
                q?: string;
                /** Is need to detail */
                detail?: string;
                businessKey?: string;
                /** Page Number */
                pageNum?: string;
                /** Page Size */
                pageSize?: string;
                /** The sortBy fields */
                orderBy?: string;
                /** The sort ASC or DESC */
                isDesc?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCmmnInstance, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseInstanceCaseidCaseid
         * @summary Retrieve form information of task
         * @request GET:/api/docpal/case/instance/caseId/{caseId}
         */
        getCaseInstanceCaseidCaseid: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnInstance, ResultString | (ResultString | Result)>({
                path: `/docpal/case/instance/caseId/${caseId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseForms
         * @summary Get the list of form properties associated with the process definition
         * @request GET:/api/docpal/case/forms
         */
        getCaseForms: (
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListBpmnDynamicFormDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/forms`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseFormsElementkey
         * @summary Get form properties of single element associated with the process definition
         * @request GET:/api/docpal/case/forms/{elementKey}
         */
        getCaseFormsElementkey: (
            elementKey: string,
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDefinitions
         * @summary Retrieve all case model definitions
         * @request GET:/api/docpal/case/definitions
         */
        getCaseDefinitions: (params: RequestParams = {}) =>
            this.request<ResultListCaseDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDefinitionsCasedefinitionkeyInstances
         * @summary Retrieve all running case instances of this case model
         * @request GET:/api/docpal/case/definitions/{caseDefinitionKey}/instances
         */
        getCaseDefinitionsCasedefinitionkeyInstances: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListCaseInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/definitions/${caseDefinitionKey}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDefinitionCasedefinitionkeyProcessDefinitions
         * @summary Retrieve process definition of this case instance through case definition key
         * @request GET:/api/docpal/case/definition/{caseDefinitionKey}/process/definitions
         */
        getCaseDefinitionCasedefinitionkeyProcessDefinitions: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardVersionCmmnversionidPermission
         * @summary Show all dashboard views that belong to the current user of this case type. (Case Dashboard)
         * @request GET:/api/docpal/case/dashboard/version/{cmmnVersionId}/permission
         */
        getCaseDashboardVersionCmmnversionidPermission: (cmmnVersionId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/version/${cmmnVersionId}/permission`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDashboardInstanceCaseinstanceidMilestoneStatus
         * @summary Obtain Milestone Status of a case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseInstanceId}/milestone/status
         */
        getCaseDashboardInstanceCaseinstanceidMilestoneStatus: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseInstanceId}/milestone/status`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidTasks
         * @summary Retrieve tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/tasks
         */
        getCaseDashboardInstanceCaseidTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidStages
         * @summary Retrieve Stage planItem Instances of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/stages
         */
        getCaseDashboardInstanceCaseidStages: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidProcessInstancePageConditions
         * @summary Obtain process instance conditions that has been used
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page/conditions
         */
        getCaseDashboardInstanceCaseidProcessInstancePageConditions: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/process/instance/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidPrimaryformData
         * @summary Retrieve information and information data of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/primaryForm/data
         */
        getCaseDashboardInstanceCaseidPrimaryformData: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceFormDataDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/primaryForm/data`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDashboardInstanceCaseidPlanitems
         * @summary Retrieve all PlanItem Instances of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/planItems
         */
        getCaseDashboardInstanceCaseidPlanitems: (
            caseId: string,
            query: {
                /** Plan Item Definition Type */
                type: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/planItems`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDashboardInstanceCaseidPersonalTasks
         * @summary Retrieve personal tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/personal/tasks
         */
        getCaseDashboardInstanceCaseidPersonalTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/personal/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetCaseDashboardInstanceCaseidEvents
         * @summary Retrieve all events of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/events
         */
        getCaseDashboardInstanceCaseidEvents: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListCmmnActivityItem, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardInstanceCaseidActions
         * @summary Retrieve my action list of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/actions
         */
        getCaseDashboardInstanceCaseidActions: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/instance/${caseId}/actions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
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
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
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
         * @summary Query the list of case dashboard
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}
         */
        getCaseDashboardCasetypeCasetypeid: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidVersionnumberVersionnumber
         * @summary Retrieve case dashboard detail of version number
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/versionNumber/{versionNumber}
         */
        getCaseDashboardCasetypeCasetypeidVersionnumberVersionnumber: (
            caseTypeId: string,
            versionNumber: string,
            params: RequestParams = {},
        ) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/versionNumber/${versionNumber}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidRecordsPageConditions
         * @summary Obtain all conditions that paging search data of deployed case type
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/records/page/conditions
         */
        getCaseDashboardCasetypeCasetypeidRecordsPageConditions: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/records/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCasetypeCasetypeidPrimaryform
         * @summary Get information form of case type
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/primaryForm
         */
        getCaseDashboardCasetypeCasetypeidPrimaryform: (
            caseTypeId: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/caseType/${caseTypeId}/primaryForm`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseDashboardCaseinstanceCaseinstanceid
         * @summary Show all dashboard views that belong to the current user of this case type. (Case Dashboard)
         * @request GET:/api/docpal/case/dashboard/caseInstance/{caseInstanceId}
         */
        getCaseDashboardCaseinstanceCaseinstanceid: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/docpal/case/dashboard/caseInstance/${caseInstanceId}`,
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
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars/${id}`,
                method: "DELETE",
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
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars/widget/setting`,
                method: "GET",
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
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars/setting`,
                method: "GET",
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
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
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
            this.request<ResultListCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/calendars/active`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplateidPageConditions
         * @summary Obtain conditions of pagination search
         * @request GET:/api/docpal/cabinet/{templateId}/page/conditions
         */
        getCabinetTemplateidPageConditions: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${templateId}/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetId
         * @summary get folder cabinet template tree
         * @request GET:/api/docpal/cabinet/{id}
         */
        getCabinetId: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name DeleteCabinetId
         * @summary Delete folder cabinet
         * @request DELETE:/api/docpal/cabinet/{id}
         */
        deleteCabinetId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetIdTree
         * @summary Get template details for tree structure
         * @request GET:/api/docpal/cabinet/{id}/tree
         */
        getCabinetIdTree: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentFolderCabinet, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}/tree`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetIdPrefix
         * @request GET:/api/docpal/cabinet/{id}/prefix
         */
        getCabinetIdPrefix: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}/prefix`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetIdList
         * @request GET:/api/docpal/cabinet/{id}/list
         */
        getCabinetIdList: (id: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentFolderCabinet, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}/list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetIdDownloadSummaryReport
         * @request GET:/api/docpal/cabinet/{id}/download/summary/report
         */
        getCabinetIdDownloadSummaryReport: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/${id}/download/summary/report`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplateId
         * @summary Get detail of folder cabinet template
         * @request GET:/api/docpal/cabinet/template/{id}
         */
        getCabinetTemplateId: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/template/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplateIdTree
         * @summary Get template details for tree structure
         * @request GET:/api/docpal/cabinet/template/{id}/tree
         */
        getCabinetTemplateIdTree: (id: string, params: RequestParams = {}) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/template/${id}/tree`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetTemplateList
         * @summary Query all Top-level folder cabinet template
         * @request GET:/api/docpal/cabinet/template/list
         */
        getCabinetTemplateList: (
            query?: {
                label?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/template/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetRefreshcompletestatusId
         * @request GET:/api/docpal/cabinet/refreshCompleteStatus/{id}
         */
        getCabinetRefreshcompletestatusId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/refreshCompleteStatus/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetRefreshCompleteStatusId
         * @request GET:/api/docpal/cabinet/refresh/complete/status/{id}
         */
        getCabinetRefreshCompleteStatusId: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/refresh/complete/status/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetNotification
         * @request GET:/api/docpal/cabinet/notification
         */
        getCabinetNotification: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/notification`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetLoginuserList
         * @summary Query template list of Top-level folder cabinet that belong to current logged-in user
         * @request GET:/api/docpal/cabinet/loginUser/list
         */
        getCabinetLoginuserList: (params: RequestParams = {}) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/loginUser/list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinetHeaderList
         * @summary Get export header list
         * @request GET:/api/docpal/cabinet/header/list
         */
        getCabinetHeaderList: (
            query: {
                templateId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/docpal/cabinet/header/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAutoCridAcceptedDeprecate
         * @request GET:/api/docpal/auto/crId/accepted/
         */
        getAutoCridAcceptedDeprecate: (
            query: {
                customerCode: string;
                contractNo: string;
                /** @format int64 */
                crId: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/crId/accepted/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAutoCridAccepted
         * @request GET:/api/docpal/auto/crId/accepted
         */
        getAutoCridAccepted: (
            query: {
                customerCode: string;
                contractNo: string;
                /** @format int64 */
                crId: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/auto/crId/accepted`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name GetAiAskAiAiChatQueryaitopicid
         * @request GET:/api/ai/ask_ai/ai_chat/queryAiTopicId
         */
        getAiAskAiAiChatQueryaitopicid: (params: RequestParams = {}) =>
            this.request<ResultAiTopicIdVO, ResultString | (ResultString | Result)>({
                path: `/ai/ask_ai/ai_chat/queryAiTopicId`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name GetAiAskAiAiChatQueryaichatinitinfo
         * @request GET:/api/ai/ask_ai/ai_chat/queryAiChatInitInfo
         */
        getAiAskAiAiChatQueryaichatinitinfo: (params: RequestParams = {}) =>
            this.request<ResultAiChatInitInfoVO, ResultString | (ResultString | Result)>({
                path: `/ai/ask_ai/ai_chat/queryAiChatInitInfo`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/user/permission/business/${businessId}/user/${userId}/aces/${aces}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name DeleteNuxeoSearchDeleteNestedSearchLogId
         * @request DELETE:/api/nuxeo/search/delete_nested_search_log/{id}
         */
        deleteNuxeoSearchDeleteNestedSearchLogId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/search/delete_nested_search_log/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentUnsubscribeDeprecate
         * @summary Unsubscribe to be notified
         * @request DELETE:/api/nuxeo/document/unsubscribe/
         */
        deleteNuxeoDocumentUnsubscribeDeprecate: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/unsubscribe/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentUnsubscribe
         * @summary Unsubscribe to be notified
         * @request DELETE:/api/nuxeo/document/unsubscribe
         */
        deleteNuxeoDocumentUnsubscribe: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/unsubscribe`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentTempfileId
         * @summary deleteTempFileById
         * @request DELETE:/api/nuxeo/document/tempFile/{id}
         */
        deleteNuxeoDocumentTempfileId: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/tempFile/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentTempfileIdDeprecate
         * @summary deleteTempFileById
         * @request DELETE:/api/nuxeo/document/tempFile/{id}/
         */
        deleteNuxeoDocumentTempfileIdDeprecate: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/tempFile/${id}/`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentPurgeDeprecate
         * @summary Purge the trashcan
         * @request DELETE:/api/nuxeo/document/purge/
         */
        deleteNuxeoDocumentPurgeDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/purge/`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentPurge
         * @summary Purge the trashcan
         * @request DELETE:/api/nuxeo/document/purge
         */
        deleteNuxeoDocumentPurge: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/purge`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentFavoritesRemoveDeprecate
         * @summary Remove document from favorites
         * @request DELETE:/api/nuxeo/document/favorites/remove/
         */
        deleteNuxeoDocumentFavoritesRemoveDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorites/remove/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentFavoritesRemove
         * @summary Remove document from favorites
         * @request DELETE:/api/nuxeo/document/favorites/remove
         */
        deleteNuxeoDocumentFavoritesRemove: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/favorites/remove`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentDeletefileDeprecate
         * @request DELETE:/api/nuxeo/document/deleteFile/
         */
        deleteNuxeoDocumentDeletefileDeprecate: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/deleteFile/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentDeletefile
         * @request DELETE:/api/nuxeo/document/deleteFile
         */
        deleteNuxeoDocumentDeletefile: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/deleteFile`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentDeletechildren
         * @summary Delete children of a document
         * @request DELETE:/api/nuxeo/document/deleteChildren
         */
        deleteNuxeoDocumentDeletechildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/deleteChildren`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentDeletechildrenDeprecate
         * @summary Delete children of a document
         * @request DELETE:/api/nuxeo/document/deleteChildren/
         */
        deleteNuxeoDocumentDeletechildrenDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/deleteChildren/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentDeleteAll
         * @request DELETE:/api/nuxeo/document/delete/all
         */
        deleteNuxeoDocumentDeleteAll: (params: RequestParams = {}) =>
            this.request<boolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/delete/all`,
                method: "DELETE",
                ...params,
            }),

        /**
         * @description Remove user permission from document
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentAclRemoveDeprecate
         * @request DELETE:/api/nuxeo/document/acl/remove/
         */
        deleteNuxeoDocumentAclRemoveDeprecate: (
            query: {
                idOrPath: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/remove/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * @description Remove user permission from document
         *
         * @tags Document (Nuxeo)
         * @name DeleteNuxeoDocumentAclRemove
         * @request DELETE:/api/nuxeo/document/acl/remove
         */
        deleteNuxeoDocumentAclRemove: (
            query: {
                idOrPath: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/nuxeo/document/acl/remove`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name DeleteNuxeoCommentsDeleteDeprecate
         * @summary Delete a document comment
         * @request DELETE:/api/nuxeo/comments/delete/
         */
        deleteNuxeoCommentsDeleteDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/delete/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name DeleteNuxeoCommentsDelete
         * @summary Delete a document comment
         * @request DELETE:/api/nuxeo/comments/delete
         */
        deleteNuxeoCommentsDelete: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/nuxeo/comments/delete`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name DeleteNuxeoCollectionRemove
         * @summary Remove documents from collection
         * @request DELETE:/api/nuxeo/collection/remove
         */
        deleteNuxeoCollectionRemove: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/remove`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name DeleteNuxeoCollectionRemoveDeprecate
         * @summary Remove documents from collection
         * @request DELETE:/api/nuxeo/collection/remove/
         */
        deleteNuxeoCollectionRemoveDeprecate: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/collection/remove/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowProcessDeleteprocessinstancebycreator
         * @request DELETE:/api/docpal/workflow/process/deleteProcessInstanceByCreator
         */
        deleteWorkflowProcessDeleteprocessinstancebycreator: (
            query: {
                processInstanceId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/deleteProcessInstanceByCreator`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteWorkflowProcessDeleteprocessinstancebyapprover
         * @request DELETE:/api/docpal/workflow/process/deleteProcessInstanceByApprover
         */
        deleteWorkflowProcessDeleteprocessinstancebyapprover: (
            query: {
                processInstanceId: string;
                userId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/deleteProcessInstanceByApprover`,
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
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name DeleteLogsRecentDocumentLogs
         * @request DELETE:/api/docpal/logs/recent/document/logs
         */
        deleteLogsRecentDocumentLogs: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/docpal/logs/recent/document/logs`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name DeleteCaseTypesCasetypeidInstanceCaseid
         * @summary Delete case instance of this case type
         * @request DELETE:/api/docpal/case/types/{caseTypeId}/instance/{caseId}
         */
        deleteCaseTypesCasetypeidInstanceCaseid: (caseTypeId: string, caseId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/docpal/case/types/${caseTypeId}/instance/${caseId}`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/isCanModified`,
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
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/docpal/workflow/process/`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/nuxeo/identity/isCanModified`,
                method: "PATCH",
                query: query,
                ...params,
            }),
    };
}
