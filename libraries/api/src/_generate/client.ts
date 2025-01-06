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
    reminders?: TaskReminder[];
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

export interface DuplicateNameRequestV2DTO {
    title?: string;
    documentId?: string;
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

export interface DuplicateNameRequestDTO {
    /** @uniqueItems true */
    titles?: string[];
    path?: string;
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

export interface Attachment {
    /** @format int64 */
    length?: number;
    stub?: boolean;
    /** @format int32 */
    revpos?: number;
    digest?: string;
    content_type?: string;
    data?: string;
}

export interface DomainConfig {
    type?: string;
    domain?: string;
    _id?: string;
    _rev?: string;
    _attachments?: Record<string, Attachment>;
    _conflicts?: string[];
    _revisions?: Revisions;
    company_name?: string;
    api_key?: string;
    realm_name?: string;
    mysql_db_name?: string;
    couch_db_name?: string;
    event_exchange_name?: string;
    queue_name?: string;
    dlx_name?: string;
    dlq_name?: string;
    created_by?: string;
}

export interface Revisions {
    /** @format int64 */
    start?: number;
    ids?: string[];
}

export interface ResultDomainConfig {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DomainConfig;
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

export interface PaginableEntityDTOTaskDTO {
    entryList?: TaskDTO[];
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

export interface ResultPaginableEntityDTOTaskDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTOTaskDTO;
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
    businessKey?: string;
    processDefinitionName?: string;
    startUserId?: string;
    createDateStr?: string;
    dueDateStr?: string;
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

export interface ResultInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Process Instance */
    data?: InstanceDTO;
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

export interface ResultProcessDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Process Definition */
    data?: ProcessDTO;
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
}

export interface PaginableEntityDTOHistoricProcessInstanceEntityImpl {
    entryList?: HistoricProcessInstanceEntityImpl[];
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

export interface ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PaginableEntityDTOHistoricProcessInstanceEntityImpl;
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
    innerMap?: Record<string, object>;
    [key: string]: any;
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
    productionVersion?: string;
    latestVersion?: string;
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
    /** Case Model Plan Form DTO */
    planForm?: CmmnPlanFormDTO;
    fields?: PlanTableFieldDTO[];
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
}

export interface ResultCaseInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    /** Case Instance */
    data?: CaseInstanceDTO;
}

export interface ResultListPlanItemInstanceDTO {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: PlanItemInstanceDTO[];
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

export interface CmmnDashboard {
    id?: string;
    caseTypeId?: string;
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

export interface ResultListDocumentTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTemplate[];
}

export interface ResultDocumentTemplate {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: DocumentTemplate;
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

export interface ProcessDefinitionJson {
    draftId?: string;
    key?: string;
    name?: string;
    /** @format int32 */
    version?: number;
    deploymentId?: string;
    jsonValue?: Record<string, object>;
    _id?: string;
    _rev?: string;
    _attachments?: Record<string, Attachment>;
    _conflicts?: string[];
    _revisions?: Revisions;
}

export interface ResultListProcessDefinitionJson {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDefinitionJson[];
}

export interface ResultProcessDefinitionJson {
    result?: boolean;
    /** @format int32 */
    code?: number;
    message?: string;
    data?: ProcessDefinitionJson;
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/${userId}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetSearch
         * @summary Search users
         * @request GET:/api/nuxeo/user/search/{query}
         */
        getSearch: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/search/${query}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostSearch
         * @summary Search users
         * @request POST:/api/nuxeo/user/search/{query}
         */
        postSearch: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/search/${query}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetDeprecate2
         * @summary Search users
         * @request GET:/api/nuxeo/user/search/{query}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/search/${query}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostDeprecate2
         * @summary Search users
         * @request POST:/api/nuxeo/user/search/{query}/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (query: string, params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/search/${query}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostResetpassword
         * @request POST:/api/nuxeo/user/resetPassword
         */
        postResetpassword: (data: PasswordRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/resetPassword`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name PostForgetpassword
         * @request POST:/api/nuxeo/user/forgetPassword
         */
        postForgetpassword: (
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/forgetPassword`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetSetting
         * @request GET:/api/nuxeo/user/virtualfolder2/setting
         */
        getSetting: (params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/virtualfolder2/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetSetting2
         * @request GET:/api/nuxeo/user/virtualfolder/setting
         * @deprecated
         * @originalName getSetting
         * @duplicate
         */
        getSetting2: (params: RequestParams = {}) =>
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/virtualfolder/setting`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetSetting3
         * @request GET:/api/nuxeo/user/virtualfolder/setting/{id}
         * @originalName getSetting
         * @duplicate
         */
        getSetting3: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/virtualfolder/setting/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetListheaders
         * @summary List all headers
         * @request GET:/api/nuxeo/user/listHeaders
         */
        getListheaders: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/listHeaders`,
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/getApplication`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags User (Nuxeo)
         * @name GetConfirmreset
         * @request GET:/api/nuxeo/user/confirmReset
         */
        getConfirmreset: (
            query: {
                token: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/user/confirmReset`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    configurationNuxeo = {
        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetTypes
         * @summary Get a document type
         * @request GET:/api/nuxeo/types/{documentType}
         */
        getTypes: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostTypes
         * @summary Get a document type
         * @request POST:/api/nuxeo/types/{documentType}
         */
        postTypes: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types/${documentType}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate
         * @summary Get a document type
         * @request GET:/api/nuxeo/types/{documentType}/
         */
        getDeprecate: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types/${documentType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate
         * @summary Get a document type
         * @request POST:/api/nuxeo/types/{documentType}/
         */
        postDeprecate: (documentType: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types/${documentType}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetTypes2
         * @summary Get all document types
         * @request GET:/api/nuxeo/types
         * @originalName getTypes
         * @duplicate
         */
        getTypes2: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostTypes2
         * @summary Get all document types
         * @request POST:/api/nuxeo/types
         * @originalName postTypes
         * @duplicate
         */
        postTypes2: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate2
         * @summary Get all document types
         * @request GET:/api/nuxeo/types/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate2
         * @summary Get all document types
         * @request POST:/api/nuxeo/types/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (
            query: {
                /** @format int32 */
                flag: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/types/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate3
         * @summary Get all keywords or a keyword
         * @request GET:/api/nuxeo/keywords/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (
            query: {
                /** Keyword (Request) */
                keyword: KeywordRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keywords/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate3
         * @summary Get all keywords or a keyword
         * @request POST:/api/nuxeo/keywords/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: KeywordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keywords/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetKeywords
         * @summary Get all keywords or a keyword
         * @request GET:/api/nuxeo/keywords
         */
        getKeywords: (
            query: {
                /** Keyword (Request) */
                keyword: KeywordRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keywords`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostKeywords
         * @summary Get all keywords or a keyword
         * @request POST:/api/nuxeo/keywords
         */
        postKeywords: (data: KeywordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keywords`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetGroups
         * @summary Get a keyword group
         * @request GET:/api/nuxeo/keyword/groups/{groupName}
         */
        getGroups: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups/${groupName}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostGroups
         * @summary Get a keyword group
         * @request POST:/api/nuxeo/keyword/groups/{groupName}
         */
        postGroups: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups/${groupName}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate4
         * @summary Get a keyword group
         * @request GET:/api/nuxeo/keyword/groups/{groupName}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups/${groupName}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate4
         * @summary Get a keyword group
         * @request POST:/api/nuxeo/keyword/groups/{groupName}/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (groupName: string, params: RequestParams = {}) =>
            this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups/${groupName}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetGroups2
         * @summary Get all keyword groups
         * @request GET:/api/nuxeo/keyword/groups
         * @originalName getGroups
         * @duplicate
         */
        getGroups2: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostGroups2
         * @summary Get all keyword groups
         * @request POST:/api/nuxeo/keyword/groups
         * @originalName postGroups
         * @duplicate
         */
        postGroups2: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate5
         * @summary Get all keyword groups
         * @request GET:/api/nuxeo/keyword/groups/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate5: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate5
         * @summary Get all keyword groups
         * @request POST:/api/nuxeo/keyword/groups/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (params: RequestParams = {}) =>
            this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/keyword/groups/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetDeprecate6
         * @summary Get the default icon of a document
         * @request GET:/api/nuxeo/icon/{documentType}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate6: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/icon/${documentType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostDeprecate6
         * @summary Get the default icon of a document
         * @request POST:/api/nuxeo/icon/{documentType}/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/icon/${documentType}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetIcon
         * @summary Get the default icon of a document
         * @request GET:/api/nuxeo/icon/{documentType}
         */
        getIcon: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/icon/${documentType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name PostIcon
         * @summary Get the default icon of a document
         * @request POST:/api/nuxeo/icon/{documentType}
         */
        postIcon: (documentType: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/icon/${documentType}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Configuration (Nuxeo)
         * @name GetStreams
         * @request GET:/api/nuxeo/mq/streams
         */
        getStreams: (params: RequestParams = {}) =>
            this.request<ResultMapStringMQProperties, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/mq/streams`,
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/form/metadata/list/`,
                method: "POST",
                query: query,
                ...params,
            }),
    };
    documentNuxeo = {
        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate
         * @summary Get trashed documents
         * @request GET:/api/nuxeo/document/trash/
         */
        getDeprecate: (
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
                path: `/api/nuxeo/document/trash/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate
         * @summary Get trashed documents
         * @request POST:/api/nuxeo/document/trash/
         */
        postDeprecate: (
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
                path: `/api/nuxeo/document/trash/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate
         * @summary Move a document to trash
         * @request DELETE:/api/nuxeo/document/trash/
         */
        deleteDeprecate: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name GetTrash
         * @summary Get trashed documents
         * @request GET:/api/nuxeo/document/trash
         */
        getTrash: (
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
                path: `/api/nuxeo/document/trash`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostTrash
         * @summary Get trashed documents
         * @request POST:/api/nuxeo/document/trash
         */
        postTrash: (
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
                path: `/api/nuxeo/document/trash`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteTrash
         * @summary Move a document to trash
         * @request DELETE:/api/nuxeo/document/trash
         */
        deleteTrash: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name GetDeprecate2
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate2
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetFollowed
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed/{userId}
         */
        getFollowed: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostFollowed
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed/{userId}
         */
        postFollowed: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed/${userId}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetFollowed2
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed
         * @originalName getFollowed
         * @duplicate
         */
        getFollowed2: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostFollowed2
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed
         * @originalName postFollowed
         * @duplicate
         */
        postFollowed2: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate3
         * @summary Get followed documents
         * @request GET:/api/nuxeo/document/followed/{userId}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed/${userId}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate3
         * @summary Get followed documents
         * @request POST:/api/nuxeo/document/followed/{userId}/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (userId: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/followed/${userId}/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate4
         * @summary Get documents from favorite
         * @request GET:/api/nuxeo/document/favorite/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorite/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate4
         * @summary Get documents from favorite
         * @request POST:/api/nuxeo/document/favorite/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorite/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetFavorite
         * @summary Get documents from favorite
         * @request GET:/api/nuxeo/document/favorite
         */
        getFavorite: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorite`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostFavorite
         * @summary Get documents from favorite
         * @request POST:/api/nuxeo/document/favorite
         */
        postFavorite: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorite`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PutDeprecate
         * @summary Replace user permission on document
         * @request PUT:/api/nuxeo/document/acl/replace/
         */
        putDeprecate: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
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
         * @summary Replace user permission on document
         * @request PUT:/api/nuxeo/document/acl/replace
         */
        putReplace: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
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
         * @name PostText
         * @request POST:/api/nuxeo/registeredServer/send/mail/text
         */
        postText: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/send/mail/text`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostHtml
         * @request POST:/api/nuxeo/registeredServer/send/mail/html
         */
        postHtml: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/send/mail/html`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAttachments
         * @request POST:/api/nuxeo/registeredServer/send/mail/attachments
         */
        postAttachments: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/send/mail/attachments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAttachment
         * @request POST:/api/nuxeo/registeredServer/send/mail/attachment
         */
        postAttachment: (
            query: {
                mailSendRequest: MailSendRequest;
                multipartFiles: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/send/mail/attachment`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostApproval
         * @request POST:/api/nuxeo/registeredServer/policy/retentions/documents/approval
         */
        postApproval: (
            query: {
                processInstanceId: string;
                status: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/policy/retentions/documents/approval`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostApproval2
         * @request POST:/api/nuxeo/registeredServer/policy/documents/approval
         * @originalName postApproval
         * @duplicate
         */
        postApproval2: (
            query: {
                processInstanceId: string;
                operation: string;
                status: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/policy/documents/approval`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostData
         * @request POST:/api/nuxeo/registeredServer/form/design/submit/data
         */
        postData: (data: FormDesignDataDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/form/design/submit/data`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDocument
         * @request POST:/api/nuxeo/registeredServer/filing/document
         */
        postDocument: (data: FilingCreateDocRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/filing/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDocument2
         * @request POST:/api/nuxeo/registeredServer/filing/create/document
         * @originalName postDocument
         * @duplicate
         */
        postDocument2: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/filing/create/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostValidate
         * @request POST:/api/nuxeo/registeredServer/document/template/validate
         */
        postValidate: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/template/validate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostGenerate
         * @request POST:/api/nuxeo/registeredServer/document/template/generate
         */
        postGenerate: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/template/generate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostConvert
         * @request POST:/api/nuxeo/registeredServer/document/prepare/convert
         */
        postConvert: (
            query: {
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<boolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/prepare/convert`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCreatenewversion
         * @summary create New Version Without Auth
         * @request POST:/api/nuxeo/registeredServer/document/createNewVersion
         */
        postCreatenewversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/createNewVersion`,
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
         * @summary create New Version Without Auth
         * @request POST:/api/nuxeo/registeredServer/document/createNewVersion/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/createNewVersion/`,
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
         * @summary Create folder from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createFolder/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/createFolder/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCreatefolder
         * @summary Create folder from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createFolder
         */
        postCreatefolder: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/createFolder`,
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
         * @summary Create document without authentication request from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createDocument/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate7: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/createDocument/`,
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
         * @summary Create document without authentication request from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/createDocument
         */
        postCreatedocument: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/createDocument`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostStructure
         * @summary Create structure from registered server side
         * @request POST:/api/nuxeo/registeredServer/document/create/structure
         */
        postStructure: (data: DocStructureRequestDTO, params: RequestParams = {}) =>
            this.request<DocStructureResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/create/structure`,
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
         * @request POST:/api/nuxeo/registeredServer/document/copy
         */
        postCopy: (data: CopyDocumentDTO, params: RequestParams = {}) =>
            this.request<DocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/document/copy`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCalendar
         * @request POST:/api/nuxeo/registeredServer/calendar
         */
        postCalendar: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/registeredServer/calendar`,
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
         * @summary uploadTempFolder
         * @request POST:/api/nuxeo/document/uploadTempFolder/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (data: UploadTempFileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/uploadTempFolder/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostUploadtempfolder
         * @summary uploadTempFolder
         * @request POST:/api/nuxeo/document/uploadTempFolder
         */
        postUploadtempfolder: (data: UploadTempFileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/uploadTempFolder`,
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
         * @summary uploadTempFile
         * @request POST:/api/nuxeo/document/uploadTempFile/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (
            query: {
                uploadTempFileRequestStr: string;
            },
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/uploadTempFile/`,
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
         * @name PostUploadtempfile
         * @summary uploadTempFile
         * @request POST:/api/nuxeo/document/uploadTempFile
         */
        postUploadtempfile: (
            query: {
                uploadTempFileRequestStr: string;
            },
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/uploadTempFile`,
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
         * @name PostUploadfiles
         * @summary Upload files
         * @request POST:/api/nuxeo/document/uploadFiles
         */
        postUploadfiles: (
            data: {
                document: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/uploadFiles`,
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
         * @summary Upload files
         * @request POST:/api/nuxeo/document/uploadFiles/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate10: (
            data: {
                document: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/uploadFiles/`,
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
         * @request POST:/api/nuxeo/document/upload/attachment/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate11: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/upload/attachment/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAttachment2
         * @request POST:/api/nuxeo/document/upload/attachment
         * @originalName postAttachment
         * @duplicate
         */
        postAttachment2: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/upload/attachment`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostList
         * @request POST:/api/nuxeo/document/thumbnail/list
         */
        postList: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListESDocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/thumbnail/list`,
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
         * @summary Get document thumbnail
         * @request POST:/api/nuxeo/document/thumbnail
         */
        postThumbnail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/thumbnail`,
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
         * @summary Get document thumbnail
         * @request POST:/api/nuxeo/document/thumbnail/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate12: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/thumbnail/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostQuery
         * @summary Query document by admin account
         * @request POST:/api/nuxeo/document/super/query
         */
        postQuery: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/super/query`,
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
         * @summary Subscribe to be notified
         * @request POST:/api/nuxeo/document/subscribe/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate13: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/subscribe/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSubscribe
         * @summary Subscribe to be notified
         * @request POST:/api/nuxeo/document/subscribe
         */
        postSubscribe: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/subscribe`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate14
         * @summary Get siblings of a document
         * @request POST:/api/nuxeo/document/siblings/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate14: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/siblings/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSiblings
         * @summary Get siblings of a document
         * @request POST:/api/nuxeo/document/siblings
         */
        postSiblings: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/siblings`,
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
         * @summary Search document by type
         * @request POST:/api/nuxeo/document/searchByType/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate15: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByType/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbytype
         * @summary Search document by type
         * @request POST:/api/nuxeo/document/searchByType
         */
        postSearchbytype: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByType`,
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
            this.request<ResultPaginableEntityDTOVirtualFolderDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate16
         * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate16: (data: DocumentRequestForVirtureFolderDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOVirtualFolderDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate17
         * @summary Search document by document properties
         * @request POST:/api/nuxeo/document/searchByProperties/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate17: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Search document by document properties
         * @request POST:/api/nuxeo/document/searchByProperties
         */
        postSearchbyproperties: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate18
         * @summary Search document by name
         * @request POST:/api/nuxeo/document/searchByName/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate18: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByName/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbyname
         * @summary Search document by name
         * @request POST:/api/nuxeo/document/searchByName
         */
        postSearchbyname: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByName`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate19
         * @summary Search document by uploaded filename
         * @request POST:/api/nuxeo/document/searchByFilename/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate19: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByFilename/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbyfilename
         * @summary Search document by uploaded filename
         * @request POST:/api/nuxeo/document/searchByFilename
         */
        postSearchbyfilename: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByFilename`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbyfilecontenttype
         * @summary Search documents by mime type
         * @request POST:/api/nuxeo/document/searchByFileContentType
         */
        postSearchbyfilecontenttype: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByFileContentType`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate20
         * @summary Search documents by mime type
         * @request POST:/api/nuxeo/document/searchByFileContentType/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate20: (data: FileRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByFileContentType/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate21
         * @summary Search documents by creator
         * @request POST:/api/nuxeo/document/searchByCreator/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate21: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByCreator/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearchbycreator
         * @summary Search documents by creator
         * @request POST:/api/nuxeo/document/searchByCreator
         */
        postSearchbycreator: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/searchByCreator`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSearch
         * @summary Search documents
         * @request POST:/api/nuxeo/document/search
         */
        postSearch: (
            query: {
                query: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/search`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate22
         * @summary Search documents
         * @request POST:/api/nuxeo/document/search/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate22: (
            query: {
                query: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/search/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate23
         * @summary saveUploadFileOverview
         * @request POST:/api/nuxeo/document/saveUploadFileOverview/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate23: (data: SaveFileOverviewRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/saveUploadFileOverview/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostSaveuploadfileoverview
         * @summary saveUploadFileOverview
         * @request POST:/api/nuxeo/document/saveUploadFileOverview
         */
        postSaveuploadfileoverview: (data: SaveFileOverviewRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/saveUploadFileOverview`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostRestore
         * @summary Restore a document
         * @request POST:/api/nuxeo/document/restore
         */
        postRestore: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/restore`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate24
         * @summary Restore a document
         * @request POST:/api/nuxeo/document/restore/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate24: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/restore/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate25
         * @summary queryUploadFileDetailDTOList
         * @request POST:/api/nuxeo/document/queryUploadFileDetailDTOList/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate25: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListUploadFileDetailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/queryUploadFileDetailDTOList/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostQueryuploadfiledetaildtolist
         * @summary queryUploadFileDetailDTOList
         * @request POST:/api/nuxeo/document/queryUploadFileDetailDTOList
         */
        postQueryuploadfiledetaildtolist: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListUploadFileDetailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/queryUploadFileDetailDTOList`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate26
         * @summary queryUploadFileDTOPage
         * @request POST:/api/nuxeo/document/queryUploadFileDTOPage/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate26: (data: QueryFileOverviewRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPageUploadFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/queryUploadFileDTOPage/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostQueryuploadfiledtopage
         * @summary queryUploadFileDTOPage
         * @request POST:/api/nuxeo/document/queryUploadFileDTOPage
         */
        postQueryuploadfiledtopage: (data: QueryFileOverviewRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPageUploadFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/queryUploadFileDTOPage`,
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
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate27
         * @summary Get document preview
         * @request POST:/api/nuxeo/document/preview/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate27: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @summary Get document preview
         * @request POST:/api/nuxeo/document/preview
         */
        postPreview: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate28
         * @summary Get parent document
         * @request POST:/api/nuxeo/document/parent/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate28: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/parent/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostParent
         * @summary Get parent document
         * @request POST:/api/nuxeo/document/parent
         */
        postParent: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/parent`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCreate
         * @request POST:/api/nuxeo/document/office/create
         */
        postCreate: (data: OfficeFileCreateDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/office/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCheck
         * @request POST:/api/nuxeo/document/office/check
         */
        postCheck: (data: OfficeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/office/check`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostList2
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/ocr/list
         * @originalName postList
         * @duplicate
         */
        postList2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/ocr/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate29
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/ocr/list/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate29: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/ocr/list/`,
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
         * @summary Move a document
         * @request POST:/api/nuxeo/document/move
         */
        postMove: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate30
         * @summary Move a document
         * @request POST:/api/nuxeo/document/move/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate30: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostIsduplicatenameV2
         * @summary Check is duplicate name
         * @request POST:/api/nuxeo/document/isDuplicateName_v2
         */
        postIsduplicatenameV2: (data: DuplicateNameRequestV2DTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/isDuplicateName_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate31
         * @summary Check is duplicate name
         * @request POST:/api/nuxeo/document/isDuplicateName_v2/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate31: (data: DuplicateNameRequestV2DTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/isDuplicateName_v2/`,
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
         * @summary Check is duplicate name
         * @request POST:/api/nuxeo/document/isDuplicateName
         * @deprecated
         */
        postIsduplicatename: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate32
         * @summary Check is duplicate name
         * @request POST:/api/nuxeo/document/isDuplicateName/
         * @deprecated
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate32: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDuplicateNameDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate33
         * @summary Add document to favorites
         * @request POST:/api/nuxeo/document/favorites/add/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate33: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorites/add/`,
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
         * @summary Add document to favorites
         * @request POST:/api/nuxeo/document/favorites/add
         */
        postAdd: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorites/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostExport
         * @summary Export documents
         * @request POST:/api/nuxeo/document/export
         */
        postExport: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/export`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate34
         * @summary Export documents
         * @request POST:/api/nuxeo/document/export/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate34: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/export/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDownload
         * @request GET:/api/nuxeo/document/download
         */
        getDownload: (
            query: {
                idOrPath: string;
                watermark?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/download`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/download
         */
        postDownload: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name GetDeprecate5
         * @request GET:/api/nuxeo/document/download/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate5: (
            query: {
                idOrPath: string;
                watermark?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/download/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate35
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate35: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostDownload2
         * @request POST:/api/nuxeo/document/dam/download
         * @originalName postDownload
         * @duplicate
         */
        postDownload2: (data: DownloadFileRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/dam/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate36
         * @summary Create folders
         * @request POST:/api/nuxeo/document/createFolders/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate36: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Create folders
         * @request POST:/api/nuxeo/document/createFolders
         */
        postCreatefolders: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate37
         * @summary Create a document
         * @request POST:/api/nuxeo/document/createDocument/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate37: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostCreatedocument2
         * @summary Create a document
         * @request POST:/api/nuxeo/document/createDocument
         * @originalName postCreatedocument
         * @duplicate
         */
        postCreatedocument2: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostStructure2
         * @request POST:/api/nuxeo/document/create/structure
         * @originalName postStructure
         * @duplicate
         */
        postStructure2: (data: DocStructureRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocStructureResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/create/structure`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostFolder
         * @request POST:/api/nuxeo/document/create/folder
         */
        postFolder: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/create/folder`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCreate2
         * @request POST:/api/nuxeo/document/create
         * @originalName postCreate
         * @duplicate
         */
        postCreate2: (
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
                path: `/api/nuxeo/document/create`,
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
         * @name PostDeprecate38
         * @request POST:/api/nuxeo/document/create/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate38: (
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
                path: `/api/nuxeo/document/create/`,
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
         * @name PostWatermark
         * @summary Create a document through attach watermark to generate new file
         * @request POST:/api/nuxeo/document/copy/watermark
         */
        postWatermark: (data: WatermarkDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/copy/watermark`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate39
         * @summary Copy a document
         * @request POST:/api/nuxeo/document/copy/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate39: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostCopy2
         * @summary Copy a document
         * @request POST:/api/nuxeo/document/copy
         * @originalName postCopy
         * @duplicate
         */
        postCopy2: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate40
         * @summary Upload files
         * @request POST:/api/nuxeo/document/convertToTxt/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate40: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/convertToTxt/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostConverttotxt
         * @summary Upload files
         * @request POST:/api/nuxeo/document/convertToTxt
         */
        postConverttotxt: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/convertToTxt`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostCollections
         * @summary Get collections of a document is in
         * @request POST:/api/nuxeo/document/collections
         */
        postCollections: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/collections`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate41
         * @summary Get collections of a document is in
         * @request POST:/api/nuxeo/document/collections/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate41: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/collections/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostThumbnailV2
         * @request POST:/api/nuxeo/document/children/thumbnail_v2
         */
        postThumbnailV2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/children/thumbnail_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate42
         * @request POST:/api/nuxeo/document/children/thumbnail_v2/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate42: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/children/thumbnail_v2/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostThumbnail2
         * @summary Get children of thumbnail Result
         * @request POST:/api/nuxeo/document/children/thumbnail
         * @originalName postThumbnail
         * @duplicate
         */
        postThumbnail2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
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
         * @name PostPage
         * @summary Pagination to query children of documents
         * @request POST:/api/nuxeo/document/children/page
         */
        postPage: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/children/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate43
         * @summary Get children of a document
         * @request POST:/api/nuxeo/document/children/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate43: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @summary Get children of a document
         * @request POST:/api/nuxeo/document/children
         */
        postChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostCheckfileexist
         * @summary check file exist situation in nuxeo
         * @request POST:/api/nuxeo/document/checkFileExist
         */
        postCheckfileexist: (data: FileCheckRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileCheckResultDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/checkFileExist`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate44
         * @summary check file exist situation in nuxeo
         * @request POST:/api/nuxeo/document/checkFileExist/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate44: (data: FileCheckRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileCheckResultDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/checkFileExist/`,
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
         * @summary Get document breadcrumb
         * @request POST:/api/nuxeo/document/breadcrumb
         */
        postBreadcrumb: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate45
         * @summary Get document breadcrumb
         * @request POST:/api/nuxeo/document/breadcrumb/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate45: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostBatchconfirm
         * @summary batchConfirm
         * @request POST:/api/nuxeo/document/batchConfirm
         */
        postBatchconfirm: (data: FileConfirmRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/batchConfirm`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate46
         * @summary batchConfirm
         * @request POST:/api/nuxeo/document/batchConfirm/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate46: (data: FileConfirmRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/batchConfirm/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate47
         * @summary batchCancel
         * @request POST:/api/nuxeo/document/batchCancel/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate47: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/batchCancel/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostBatchcancel
         * @summary batchCancel
         * @request POST:/api/nuxeo/document/batchCancel
         */
        postBatchcancel: (
            query: {
                userId: string;
                uploadId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/batchCancel`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate48
         * @summary Get audit trial of a document
         * @request POST:/api/nuxeo/document/audit/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate48: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListLogEntryDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/audit/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAudit
         * @summary Get audit trial of a document
         * @request POST:/api/nuxeo/document/audit
         */
        postAudit: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListLogEntryDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/audit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate49
         * @request POST:/api/nuxeo/document/attachment/update/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate49: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultAttachmentUpdateResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/update/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostUpdate
         * @request POST:/api/nuxeo/document/attachment/update
         */
        postUpdate: (
            data: {
                idOrPath: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultAttachmentUpdateResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/update`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate50
         * @request POST:/api/nuxeo/document/attachment/pdf/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate50: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/pdf/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload3
         * @request POST:/api/nuxeo/document/attachment/pdf/download
         * @originalName postDownload
         * @duplicate
         */
        postDownload3: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/pdf/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload4
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/attachment/ocrresult/download
         * @originalName postDownload
         * @duplicate
         */
        postDownload4: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/ocrresult/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate51
         * @summary Download a document file
         * @request POST:/api/nuxeo/document/attachment/ocrresult/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate51: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/ocrresult/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate52
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/attachment/list/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate52: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/list/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostList3
         * @summary List attachments of a document
         * @request POST:/api/nuxeo/document/attachment/list
         * @originalName postList
         * @duplicate
         */
        postList3: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate53
         * @request POST:/api/nuxeo/document/attachment/jpeg/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate53: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/jpeg/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload5
         * @request POST:/api/nuxeo/document/attachment/jpeg/download
         * @originalName postDownload
         * @duplicate
         */
        postDownload5: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/jpeg/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate54
         * @request POST:/api/nuxeo/document/attachment/hocr/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate54: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/hocr/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload6
         * @request POST:/api/nuxeo/document/attachment/hocr/download
         * @originalName postDownload
         * @duplicate
         */
        postDownload6: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/hocr/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate55
         * @summary Download attachment of a document
         * @request POST:/api/nuxeo/document/attachment/download/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate55: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/download/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDownload7
         * @summary Download attachment of a document
         * @request POST:/api/nuxeo/document/attachment/download
         * @originalName postDownload
         * @duplicate
         */
        postDownload7: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/attachment/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostWatermark2
         * @summary Replace document for add watermark to document and overview to new version
         * @request POST:/api/nuxeo/document/add/watermark
         * @originalName postWatermark
         * @duplicate
         */
        postWatermark2: (data: WatermarkDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/add/watermark`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostFacets
         * @request POST:/api/nuxeo/document/add/facets
         */
        postFacets: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/add/facets`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate6
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acls/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate6: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acls/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate56
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acls/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate56: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name GetAcls
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acls
         */
        getAcls: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acls`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAcls
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acls
         */
        postAcls: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name GetDeprecate7
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acl/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate7: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate57
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acl/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate57: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name GetAcl
         * @summary Get access control list of a document
         * @request GET:/api/nuxeo/document/acl
         */
        getAcl: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAcl
         * @summary Get access control list of a document
         * @request POST:/api/nuxeo/document/acl
         */
        postAcl: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListAccessControlListDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate58
         * @summary Allow external user to access the document
         * @request POST:/api/nuxeo/document/acl/invite/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate58: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/invite/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostInvite
         * @summary Allow external user to access the document
         * @request POST:/api/nuxeo/document/acl/invite
         */
        postInvite: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/invite`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostAdd2
         * @summary Add local permission to document
         * @request POST:/api/nuxeo/document/acl/add
         * @originalName postAdd
         * @duplicate
         */
        postAdd2: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate59
         * @summary Add local permission to document
         * @request POST:/api/nuxeo/document/acl/add/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate59: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDocument3
         * @summary Get a document
         * @request POST:/api/nuxeo/document
         * @originalName postDocument
         * @duplicate
         */
        postDocument3: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDocument
         * @summary Delete a document
         * @request DELETE:/api/nuxeo/document
         */
        deleteDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchDocument
         * @summary Update a document
         * @request PATCH:/api/nuxeo/document
         */
        patchDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name GetDeprecate8
         * @request GET:/api/nuxeo/document/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate8: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PostDeprecate60
         * @summary Get a document
         * @request POST:/api/nuxeo/document/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate60: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate2
         * @summary Delete a document
         * @request DELETE:/api/nuxeo/document/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchDeprecate
         * @summary Update a document
         * @request PATCH:/api/nuxeo/document/
         */
        patchDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PatchDeprecate2
         * @request PATCH:/api/nuxeo/document/updateAiDocument/
         * @originalName patchDeprecate
         * @duplicate
         */
        patchDeprecate2: (data: UpdateAiDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/updateAiDocument/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchUpdateaidocument
         * @request PATCH:/api/nuxeo/document/updateAiDocument
         */
        patchUpdateaidocument: (data: UpdateAiDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/updateAiDocument`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchDeprecate3
         * @request PATCH:/api/nuxeo/document/replaceFile/v2/
         * @originalName patchDeprecate
         * @duplicate
         */
        patchDeprecate3: (
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
                path: `/api/nuxeo/document/replaceFile/v2/`,
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
         * @name PatchV2
         * @request PATCH:/api/nuxeo/document/replaceFile/v2
         */
        patchV2: (
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
                path: `/api/nuxeo/document/replaceFile/v2`,
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
         * @name PatchReplacefile
         * @request PATCH:/api/nuxeo/document/replaceFile
         */
        patchReplacefile: (
            data: {
                document: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/replaceFile`,
                method: "PATCH",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchDeprecate4
         * @request PATCH:/api/nuxeo/document/replaceFile/
         * @originalName patchDeprecate
         * @duplicate
         */
        patchDeprecate4: (
            data: {
                document: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/replaceFile/`,
                method: "PATCH",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name PatchType
         * @summary Update a document
         * @request PATCH:/api/nuxeo/document/change/docpal/type
         */
        patchType: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/change/docpal/type`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetState
         * @request GET:/api/nuxeo/document/{documentId}/ocr/state
         */
        getState: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/${documentId}/ocr/state`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate9
         * @request GET:/api/nuxeo/document/retry_classification/{uploadId}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate9: (uploadId: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/retry_classification/${uploadId}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetRetryClassification
         * @request GET:/api/nuxeo/document/retry_classification/{uploadId}
         */
        getRetryClassification: (uploadId: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/retry_classification/${uploadId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate10
         * @request GET:/api/nuxeo/document/queryAiAnalyze/{idOrPath}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate10: (idOrPath: string, params: RequestParams = {}) =>
            this.request<ResultAiAnalysisDocumentVO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/queryAiAnalyze/${idOrPath}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetQueryaianalyze
         * @request GET:/api/nuxeo/document/queryAiAnalyze/{idOrPath}
         */
        getQueryaianalyze: (idOrPath: string, params: RequestParams = {}) =>
            this.request<ResultAiAnalysisDocumentVO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/queryAiAnalyze/${idOrPath}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetPatch
         * @request GET:/api/nuxeo/document/ocrs/patch
         */
        getPatch: (
            query: {
                documentIds: string[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/ocrs/patch`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetResult
         * @request GET:/api/nuxeo/document/ocrs/patch/result
         */
        getResult: (params: RequestParams = {}) =>
            this.request<ResultLong, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/ocrs/patch/result`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetData
         * @request GET:/api/nuxeo/document/ocr/patch/data
         */
        getData: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/ocr/patch/data`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate11
         * @summary Check if document is followed by current user
         * @request GET:/api/nuxeo/document/isFollowed/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate11: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/isFollowed/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetIsfollowed
         * @summary Check if document is followed by current user
         * @request GET:/api/nuxeo/document/isFollowed
         */
        getIsfollowed: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/isFollowed`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetInithocrclearup
         * @request GET:/api/nuxeo/document/initHocrClearUp
         */
        getInithocrclearup: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/initHocrClearUp`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetInitconversionclearup
         * @request GET:/api/nuxeo/document/initConversionClearUp
         */
        getInitconversionclearup: (
            query: {
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/initConversionClearUp`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetPatch2
         * @request GET:/api/nuxeo/document/execute/ocr/patch
         * @originalName getPatch
         * @duplicate
         */
        getPatch2: (params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/execute/ocr/patch`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate12
         * @request GET:/api/nuxeo/document/download_temp_file/{id}/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate12: (id: number, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/download_temp_file/${id}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDownloadTempFile
         * @request GET:/api/nuxeo/document/download_temp_file/{id}
         */
        getDownloadTempFile: (id: number, params: RequestParams = {}) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/download_temp_file/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetDeprecate13
         * @summary Get user maximum permission on a document
         * @request GET:/api/nuxeo/document/acl/permission/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate13: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/permission/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name GetPermission
         * @summary Get user maximum permission on a document
         * @request GET:/api/nuxeo/document/acl/permission
         */
        getPermission: (
            query: {
                docId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/permission`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate3
         * @summary Unsubscribe to be notified
         * @request DELETE:/api/nuxeo/document/unsubscribe/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate3: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/unsubscribe/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteUnsubscribe
         * @summary Unsubscribe to be notified
         * @request DELETE:/api/nuxeo/document/unsubscribe
         */
        deleteUnsubscribe: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/unsubscribe`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteTempfile
         * @summary deleteTempFileById
         * @request DELETE:/api/nuxeo/document/tempFile/{id}
         */
        deleteTempfile: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/tempFile/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate4
         * @summary deleteTempFileById
         * @request DELETE:/api/nuxeo/document/tempFile/{id}/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate4: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/tempFile/${id}/`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate5
         * @summary Purge the trashcan
         * @request DELETE:/api/nuxeo/document/purge/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate5: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/purge/`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeletePurge
         * @summary Purge the trashcan
         * @request DELETE:/api/nuxeo/document/purge
         */
        deletePurge: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/purge`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate6
         * @summary Remove document from favorites
         * @request DELETE:/api/nuxeo/document/favorites/remove/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate6: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorites/remove/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteRemove
         * @summary Remove document from favorites
         * @request DELETE:/api/nuxeo/document/favorites/remove
         */
        deleteRemove: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/favorites/remove`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate7
         * @request DELETE:/api/nuxeo/document/deleteFile/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate7: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/deleteFile/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeletefile
         * @request DELETE:/api/nuxeo/document/deleteFile
         */
        deleteDeletefile: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/deleteFile`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeletechildren
         * @summary Delete children of a document
         * @request DELETE:/api/nuxeo/document/deleteChildren
         */
        deleteDeletechildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/deleteChildren`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate8
         * @summary Delete children of a document
         * @request DELETE:/api/nuxeo/document/deleteChildren/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate8: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/deleteChildren/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document (Nuxeo)
         * @name DeleteAll
         * @request DELETE:/api/nuxeo/document/delete/all
         */
        deleteAll: (params: RequestParams = {}) =>
            this.request<boolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/delete/all`,
                method: "DELETE",
                ...params,
            }),

        /**
         * @description Remove user permission from document
         *
         * @tags Document (Nuxeo)
         * @name DeleteDeprecate9
         * @request DELETE:/api/nuxeo/document/acl/remove/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate9: (
            query: {
                idOrPath: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/remove/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * @description Remove user permission from document
         *
         * @tags Document (Nuxeo)
         * @name DeleteRemove2
         * @request DELETE:/api/nuxeo/document/acl/remove
         * @originalName deleteRemove
         * @duplicate
         */
        deleteRemove2: (
            query: {
                idOrPath: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/acl/remove`,
                method: "DELETE",
                query: query,
                ...params,
            }),
    };
    collectionNuxeo = {
        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetDeprecate
         * @summary Get user visible collections
         * @request GET:/api/nuxeo/collection/
         */
        getDeprecate: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostDeprecate
         * @summary Get user visible collections
         * @request POST:/api/nuxeo/collection/
         */
        postDeprecate: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PatchDeprecate
         * @request PATCH:/api/nuxeo/collection/
         */
        patchDeprecate: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetCollection
         * @summary Get user visible collections
         * @request GET:/api/nuxeo/collection
         */
        getCollection: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection`,
                method: "GET",
                query: query,
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
        postCollection: (
            query?: {
                /** @format int32 */
                currentPageIndex?: number;
                /** @format int32 */
                pageSize?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PatchCollection
         * @request PATCH:/api/nuxeo/collection
         */
        patchCollection: (data: DocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostDeprecate2
         * @summary Get documents in a collection
         * @request POST:/api/nuxeo/collection/documents/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/documents/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostDocuments
         * @summary Get documents in a collection
         * @request POST:/api/nuxeo/collection/documents
         */
        postDocuments: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTODocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/documents`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostCreate
         * @summary Create a collection in user workspace
         * @request POST:/api/nuxeo/collection/create
         */
        postCreate: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostDeprecate3
         * @summary Create a collection in user workspace
         * @request POST:/api/nuxeo/collection/create/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/create/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostDeprecate4
         * @request POST:/api/nuxeo/collection/allDocuments/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEntityVODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/allDocuments/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostAlldocuments
         * @request POST:/api/nuxeo/collection/allDocuments
         */
        postAlldocuments: (data: CollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEntityVODocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/allDocuments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostDeprecate5
         * @summary Add documents to collection
         * @request POST:/api/nuxeo/collection/add/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name PostAdd
         * @summary Add documents to collection
         * @request POST:/api/nuxeo/collection/add
         */
        postAdd: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name GetDeprecate2
         * @request GET:/api/nuxeo/collection/all/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/all/`,
                method: "GET",
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
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name DeleteRemove
         * @summary Remove documents from collection
         * @request DELETE:/api/nuxeo/collection/remove
         */
        deleteRemove: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/remove`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Collection (Nuxeo)
         * @name DeleteDeprecate
         * @summary Remove documents from collection
         * @request DELETE:/api/nuxeo/collection/remove/
         */
        deleteDeprecate: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/collection/remove/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/candidatesByTaskDefinitionKey`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate2
         * @summary Retrieve task candidates
         * @request GET:/api/docpal/workflow/task/candidates/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/candidates/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate2
         * @summary Retrieve task candidates
         * @request POST:/api/docpal/workflow/task/candidates/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/candidates/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetCandidates
         * @summary Retrieve task candidates
         * @request GET:/api/docpal/workflow/task/candidates
         */
        getCandidates: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/candidates`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostCandidates
         * @summary Retrieve task candidates
         * @request POST:/api/docpal/workflow/task/candidates
         */
        postCandidates: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultSetUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/candidates`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate3
         * @summary Retrieve task attachment preview
         * @request GET:/api/docpal/workflow/task/attachment/preview/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/preview/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate3
         * @summary Retrieve task attachment preview
         * @request POST:/api/docpal/workflow/task/attachment/preview/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/preview/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetPreview
         * @summary Retrieve task attachment preview
         * @request GET:/api/docpal/workflow/task/attachment/preview
         */
        getPreview: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/preview`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostPreview
         * @summary Retrieve task attachment preview
         * @request POST:/api/docpal/workflow/task/attachment/preview
         */
        postPreview: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/preview`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate4
         * @request GET:/api/docpal/workflow/task/attachment/info/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/info/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate4
         * @request POST:/api/docpal/workflow/task/attachment/info/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/info/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetInfo
         * @request GET:/api/docpal/workflow/task/attachment/info
         */
        getInfo: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/info`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostInfo
         * @request POST:/api/docpal/workflow/task/attachment/info
         */
        postInfo: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/info`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate5
         * @summary Retrieve task attachment
         * @request GET:/api/docpal/workflow/task/attachment/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate5: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PutDeprecate
         * @request PUT:/api/docpal/workflow/task/attachment/
         */
        putDeprecate: (
            data: {
                attachmentId: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/`,
                method: "PUT",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate5
         * @summary Retrieve task attachment
         * @request POST:/api/docpal/workflow/task/attachment/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeprecate
         * @summary Delete an attachment
         * @request DELETE:/api/docpal/workflow/task/attachment/
         */
        deleteDeprecate: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetAttachment
         * @summary Retrieve task attachment
         * @request GET:/api/docpal/workflow/task/attachment
         */
        getAttachment: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PutAttachment
         * @request PUT:/api/docpal/workflow/task/attachment
         */
        putAttachment: (
            data: {
                attachmentId: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment`,
                method: "PUT",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostAttachment
         * @summary Retrieve task attachment
         * @request POST:/api/docpal/workflow/task/attachment
         */
        postAttachment: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteAttachment
         * @summary Delete an attachment
         * @request DELETE:/api/docpal/workflow/task/attachment
         */
        deleteAttachment: (
            query: {
                attachmentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/attachment`,
                method: "DELETE",
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @summary Retrieve tasks for the candidate users
         * @request POST:/api/docpal/workflow/tasks/user
         */
        postUser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate6
         * @summary Retrieve tasks for the candidate users
         * @request POST:/api/docpal/workflow/tasks/user/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate6: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostUnassigned
         * @summary Retrieve unassigned tasks
         * @request POST:/api/docpal/workflow/tasks/unassigned
         */
        postUnassigned: (params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/unassigned`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate7
         * @summary Retrieve unassigned tasks
         * @request POST:/api/docpal/workflow/tasks/unassigned/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate7: (params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/unassigned/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostPersonal
         * @summary Retrieve tasks for a user
         * @request POST:/api/docpal/workflow/tasks/personal
         */
        postPersonal: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/personal`,
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
         * @summary Retrieve tasks for a user
         * @request POST:/api/docpal/workflow/tasks/personal/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/personal/`,
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
         * @summary Retrieve tasks for the candidate group
         * @request POST:/api/docpal/workflow/tasks/group/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/group/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostGroup
         * @summary Retrieve tasks for the candidate group
         * @request POST:/api/docpal/workflow/tasks/group
         */
        postGroup: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/group`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostExporttasksuser
         * @request POST:/api/docpal/workflow/tasks/exportTasksUser
         */
        postExporttasksuser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/exportTasksUser`,
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
         * @request POST:/api/docpal/workflow/tasks/exportTasksUser/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate10: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/exportTasksUser/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate6
         * @request GET:/api/docpal/workflow/tasks/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate6: (
            query?: {
                processInstanceId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate11
         * @summary Retrieve tasks for a process instance
         * @request POST:/api/docpal/workflow/tasks/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate11: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name GetTasks
         * @request GET:/api/docpal/workflow/tasks
         */
        getTasks: (
            query?: {
                processInstanceId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostTasks
         * @summary Retrieve tasks for a process instance
         * @request POST:/api/docpal/workflow/tasks
         */
        postTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate12
         * @summary Unclaim a task
         * @request POST:/api/docpal/workflow/task/unclaim/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate12: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @summary Unclaim a task
         * @request POST:/api/docpal/workflow/task/unclaim
         */
        postUnclaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDuedate
         * @summary Set task due date
         * @request POST:/api/docpal/workflow/task/dueDate
         */
        postDuedate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/dueDate`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate13
         * @summary Set task due date
         * @request POST:/api/docpal/workflow/task/dueDate/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate13: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/dueDate/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Delegate task to another user
         *
         * @tags Workflow
         * @name PostDelegate
         * @request POST:/api/docpal/workflow/task/delegate
         */
        postDelegate: (
            query: {
                taskId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/delegate`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * @description Delegate task to another user
         *
         * @tags Workflow
         * @name PostDeprecate14
         * @request POST:/api/docpal/workflow/task/delegate/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate14: (
            query: {
                taskId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/delegate/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostComplete
         * @summary Complete a task
         * @request POST:/api/docpal/workflow/task/complete
         */
        postComplete: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate15
         * @summary Complete a task
         * @request POST:/api/docpal/workflow/task/complete/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate15: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/complete/`,
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
         * @summary Claim a task
         * @request POST:/api/docpal/workflow/task/claim
         */
        postClaim: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate16
         * @summary Claim a task
         * @request POST:/api/docpal/workflow/task/claim/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate16: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostAssign
         * @summary Assign task to a user
         * @request POST:/api/docpal/workflow/task/assign
         */
        postAssign: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/assign`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate17
         * @summary Assign task to a user
         * @request POST:/api/docpal/workflow/task/assign/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate17: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/assign/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate7
         * @request GET:/api/docpal/workflow/task/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate7: (
            query?: {
                processInstanceId?: string;
                taskId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate18
         * @summary Retrieve a task
         * @request POST:/api/docpal/workflow/task/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate18: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeprecate2
         * @summary Delete a task
         * @request DELETE:/api/docpal/workflow/task/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate2: (
            query: {
                taskId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetTask
         * @request GET:/api/docpal/workflow/task
         */
        getTask: (
            query?: {
                processInstanceId?: string;
                taskId?: string;
                userId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostTask
         * @summary Retrieve a task
         * @request POST:/api/docpal/workflow/task
         */
        postTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteTask
         * @summary Delete a task
         * @request DELETE:/api/docpal/workflow/task
         */
        deleteTask: (
            query: {
                taskId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/task`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSubmitadhocapproval
         * @request POST:/api/docpal/workflow/submitAdhocApproval
         */
        postSubmitadhocapproval: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/submitAdhocApproval`,
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
            this.request<ResultListDocumentTypeMetadataMapping, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentTypeProfileSetting, ResultString | (ResultString | Result)>({
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
         * @name PostQueryadhocapprovalpage
         * @request POST:/api/docpal/workflow/queryAdhocApprovalPage
         */
        postQueryadhocapprovalpage: (data: AdhocApprovalDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/queryAdhocApprovalPage`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSave
         * @summary Save task form properties
         * @request POST:/api/docpal/workflow/properties/save
         */
        postSave: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/properties/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate19
         * @summary Save task form properties
         * @request POST:/api/docpal/workflow/properties/save/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate19: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/properties/save/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate20
         * @summary Retrieve task form properties
         * @request POST:/api/docpal/workflow/properties/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate20: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/properties/`,
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
         * @summary Retrieve task form properties
         * @request POST:/api/docpal/workflow/properties
         */
        postProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
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
         * @name PostTriggerbyprocessinstanceid
         * @request POST:/api/docpal/workflow/process/triggerByProcessInstanceId
         */
        postTriggerbyprocessinstanceid: (
            query: {
                processInstanceId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/triggerByProcessInstanceId`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate21
         * @summary Start a process
         * @request POST:/api/docpal/workflow/process/start/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate21: (
            data: WorkflowRequestDTO,
            query?: {
                async?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/start/`,
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
         * @name PostStart
         * @summary Start a process
         * @request POST:/api/docpal/workflow/process/start
         */
        postStart: (
            data: WorkflowRequestDTO,
            query?: {
                async?: boolean;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/start`,
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
         * @name PostModel
         * @summary Retrieve process model (BPMN) XML
         * @request POST:/api/docpal/workflow/process/model
         */
        postModel: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate22
         * @summary Retrieve process model (BPMN) XML
         * @request POST:/api/docpal/workflow/process/model/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate22: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
         * @name PostMessage
         * @request POST:/api/docpal/workflow/process/message
         */
        postMessage: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/message`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate23
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process/list/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate23: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListProcessDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/list/`,
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
            this.request<ResultListProcessDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate24
         * @summary Retrieve process instance
         * @request POST:/api/docpal/workflow/process/instance/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate24: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
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
         * @summary Retrieve process instance
         * @request POST:/api/docpal/workflow/process/instance
         */
        postInstance: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
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
         * @name DeleteInstance
         * @request DELETE:/api/docpal/workflow/process/instance
         */
        deleteInstance: (
            query: {
                processInstanceId: string;
                userId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/instance`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDiagram
         * @summary Retrieve process definition diagram
         * @request POST:/api/docpal/workflow/process/diagram
         */
        postDiagram: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/diagram`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate25
         * @summary Retrieve process definition diagram
         * @request POST:/api/docpal/workflow/process/diagram/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate25: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/diagram/`,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PostList2
         * @request POST:/api/docpal/workflow/process/combine/list
         * @originalName postList
         * @duplicate
         */
        postList2: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListProcessDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/combine/list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate26
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/process/bpmn/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate26: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/bpmn/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostBpmn
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/process/bpmn
         */
        postBpmn: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/bpmn`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostAddfileforbulkupload
         * @request POST:/api/docpal/workflow/process/addFileForBulkUpload
         */
        postAddfileforbulkupload: (
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
                path: `/api/docpal/workflow/process/addFileForBulkUpload`,
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
         * @name PostActive
         * @request POST:/api/docpal/workflow/process/active
         */
        postActive: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/active`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate27
         * @request POST:/api/docpal/workflow/process/active/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate27: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/active/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostProcess
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process
         */
        postProcess: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultProcessDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process`,
                method: "POST",
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
            this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate28
         * @summary Retrieve process definition
         * @request POST:/api/docpal/workflow/process/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate28: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultProcessDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeprecate3
         * @request DELETE:/api/docpal/workflow/process/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate3: (
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
                path: `/api/docpal/workflow/process/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate29
         * @summary Retrieve task variable history
         * @request POST:/api/docpal/workflow/history/variable/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate29: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/variable/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostVariable
         * @summary Retrieve task variable history
         * @request POST:/api/docpal/workflow/history/variable
         */
        postVariable: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/variable`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostTasklog
         * @summary Retrieve task log history
         * @request POST:/api/docpal/workflow/history/taskLog
         */
        postTasklog: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/taskLog`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate30
         * @summary Retrieve task log history
         * @request POST:/api/docpal/workflow/history/taskLog/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate30: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/taskLog/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostTask2
         * @summary Retrieve task history
         * @request POST:/api/docpal/workflow/history/task
         * @originalName postTask
         * @duplicate
         */
        postTask2: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/task`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate31
         * @summary Retrieve task history
         * @request POST:/api/docpal/workflow/history/task/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate31: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/task/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate32
         * @request POST:/api/docpal/workflow/history/process_without_variables/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate32: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<
                ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl,
                ResultString | (ResultString | Result)
            >({
                path: `/api/docpal/workflow/history/process_without_variables/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostProcessWithoutVariables
         * @request POST:/api/docpal/workflow/history/process_without_variables
         */
        postProcessWithoutVariables: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<
                ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl,
                ResultString | (ResultString | Result)
            >({
                path: `/api/docpal/workflow/history/process_without_variables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate33
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/process/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate33: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<
                ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl,
                ResultString | (ResultString | Result)
            >({
                path: `/api/docpal/workflow/history/process/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostProcess2
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/process
         * @originalName postProcess
         * @duplicate
         */
        postProcess2: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<
                ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl,
                ResultString | (ResultString | Result)
            >({
                path: `/api/docpal/workflow/history/process`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostGetusersexportheader
         * @request POST:/api/docpal/workflow/tasks/getUsersExportHeader
         */
        postGetusersexportheader: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/tasks/getUsersExportHeader`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate34
         * @request POST:/api/docpal/workflow/history/getTasksUserExportHeader/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate34: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/getTasksUserExportHeader/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate35
         * @request POST:/api/docpal/workflow/history/exportProcessHistory/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate35: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/exportProcessHistory/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostExportprocesshistory
         * @request POST:/api/docpal/workflow/history/exportProcessHistory
         */
        postExportprocesshistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/exportProcessHistory`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDetailproperties
         * @request POST:/api/docpal/workflow/history/detailProperties
         */
        postDetailproperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/detailProperties`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate36
         * @request POST:/api/docpal/workflow/history/detailProperties/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate36: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/detailProperties/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDetail
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/detail
         */
        postDetail: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/detail`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate37
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/detail/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate37: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/detail/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostActivity
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/activity
         */
        postActivity: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/activity`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate38
         * @summary Retrieve process definition model
         * @request POST:/api/docpal/workflow/history/activity/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate38: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/activity/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate39
         * @summary Submit a task form
         * @request POST:/api/docpal/workflow/form/submit/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate39: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/form/submit/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSubmit
         * @summary Submit a task form
         * @request POST:/api/docpal/workflow/form/submit
         */
        postSubmit: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/form/submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate40
         * @summary Upload files
         * @request POST:/api/docpal/workflow/files/upload/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate40: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/files/upload/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostUpload
         * @summary Upload files
         * @request POST:/api/docpal/workflow/files/upload
         */
        postUpload: (
            data: {
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFileDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/files/upload`,
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
        postDeletemetadatamapping: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/deleteMetadataMapping`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeletedocumenttypeprofile
         * @request POST:/api/docpal/workflow/deleteDocumentTypeProfile
         */
        postDeletedocumenttypeprofile: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/deleteDocumentTypeProfile`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate41
         * @request POST:/api/docpal/workflow/data/submit/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate41: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/data/submit/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSubmit2
         * @request POST:/api/docpal/workflow/data/submit
         * @originalName postSubmit
         * @duplicate
         */
        postSubmit2: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/data/submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostSave2
         * @request POST:/api/docpal/workflow/data/save
         * @originalName postSave
         * @duplicate
         */
        postSave2: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/data/save`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate42
         * @request POST:/api/docpal/workflow/data/save/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate42: (
            data: {
                workflow: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/data/save/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetTask2
         * @summary Get task comments
         * @request GET:/api/docpal/workflow/comment/task
         * @originalName getTask
         * @duplicate
         */
        getTask2: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/task`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostTask3
         * @summary Add task comment
         * @request POST:/api/docpal/workflow/comment/task
         * @originalName postTask
         * @duplicate
         */
        postTask3: (
            query: {
                taskId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/task`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate43
         * @summary Add task comment
         * @request POST:/api/docpal/workflow/comment/task/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate43: (
            query: {
                taskId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/task/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetProcess
         * @summary Get process comments
         * @request GET:/api/docpal/workflow/comment/process
         */
        getProcess: (
            query: {
                processInstanceId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/process`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostProcess3
         * @summary Add process comment
         * @request POST:/api/docpal/workflow/comment/process
         * @originalName postProcess
         * @duplicate
         */
        postProcess3: (
            query: {
                processInstanceId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/process`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostDeprecate44
         * @summary Add process comment
         * @request POST:/api/docpal/workflow/comment/process/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate44: (
            query: {
                processInstanceId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/process/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PostChecknameortitle
         * @request POST:/api/docpal/workflow/checkNameOrTitle
         */
        postChecknameortitle: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
         * @name PostAddcommentbytaskid
         * @summary Add process instance By taskId
         * @request POST:/api/docpal/workflow/addCommentByTaskId
         */
        postAddcommentbytaskid: (
            query: {
                taskId: string;
                userId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/addCommentByTaskId`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeprecate4
         * @summary Delete comment
         * @request DELETE:/api/docpal/workflow/comment/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate4: (
            query: {
                commentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PatchDeprecate
         * @summary Update comment
         * @request PATCH:/api/docpal/workflow/comment/
         */
        patchDeprecate: (
            query: {
                commentId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment/`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteComment
         * @summary Delete comment
         * @request DELETE:/api/docpal/workflow/comment
         */
        deleteComment: (
            query: {
                commentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name PatchComment
         * @summary Update comment
         * @request PATCH:/api/docpal/workflow/comment
         */
        patchComment: (
            query: {
                commentId: string;
                text: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/comment`,
                method: "PATCH",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetProperties
         * @request GET:/api/docpal/workflow/start/properties
         */
        getProperties: (
            query?: {
                processKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/start/properties`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate8
         * @request GET:/api/docpal/workflow/start/properties/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate8: (
            query?: {
                processKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/start/properties/`,
                method: "GET",
                query: query,
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            query: {
                request: DocumentTypeMetadataMapping;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentTypeMetadataMapping, ResultString | (ResultString | Result)>({
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            query: {
                entity: MetadataSetting;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringListMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/queryDocumentTypeProFileSettings`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetInstance
         * @request GET:/api/docpal/workflow/process/instance/{processInstanceId}
         */
        getInstance: (processInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultProcessInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/instance/${processInstanceId}`,
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
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/getProcessDefinitionList`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetprocessbyprocdefid
         * @request GET:/api/docpal/workflow/process/getProcessByProcDefId
         */
        getGetprocessbyprocdefid: (
            query: {
                processByProcDefId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListUserTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/getProcessByProcDefId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetHistory
         * @summary Find historical process definitions through process definition key
         * @request GET:/api/docpal/workflow/process/definition/{processDefinitionKey}/history
         */
        getHistory: (processDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/definition/${processDefinitionKey}/history`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetJson
         * @summary Find all process definition json
         * @request GET:/api/docpal/workflow/process/definition/json
         */
        getJson: (
            query: {
                request: ProcessDefinitionJson;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListProcessDefinitionJson, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/definition/json`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeploymentid
         * @summary Get a process definition json through deploymentId
         * @request GET:/api/docpal/workflow/process/definition/json/deploymentId/{deploymentId}
         */
        getDeploymentid: (deploymentId: string, params: RequestParams = {}) =>
            this.request<ResultProcessDefinitionJson, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/definition/json/deploymentId/${deploymentId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetIsdocumetidcanstartadhoc
         * @request GET:/api/docpal/workflow/isDocumetIdCanStartAdhoc
         */
        getIsdocumetidcanstartadhoc: (
            query: {
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/isDocumetIdCanStartAdhoc`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetIsdocumetidcanapproval
         * @request GET:/api/docpal/workflow/isDocumetIdCanApproval
         */
        getIsdocumetidcanapproval: (
            query: {
                documentId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/isDocumetIdCanApproval`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGethistoryexportheader
         * @request GET:/api/docpal/workflow/history/getHistoryExportHeader
         */
        getGethistoryexportheader: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/getHistoryExportHeader`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate9
         * @request GET:/api/docpal/workflow/history/getHistoryExportHeader/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate9: (params: RequestParams = {}) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/history/getHistoryExportHeader/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetcommentbyprocessinstanceid
         * @summary get CommentBy ProcessInstanceId
         * @request GET:/api/docpal/workflow/getCommentByProcessInstanceId
         */
        getGetcommentbyprocessinstanceid: (
            query: {
                taskId: string;
                processInstanceId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/getCommentByProcessInstanceId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetGetbusinesskeylist
         * @request GET:/api/docpal/workflow/getBusinessKeyList
         */
        getGetbusinesskeylist: (
            query: {
                businessKey: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultLinkedHashSetString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/getBusinessKeyList`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate10
         * @request GET:/api/docpal/workflow/generate/caseId/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate10: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/generate/caseId/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetCaseid
         * @request GET:/api/docpal/workflow/generate/caseId
         */
        getCaseid: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/generate/caseId`,
                method: "GET",
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
            this.request<ResultListBpmnDynamicFormDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetProperties2
         * @request GET:/api/docpal/workflow/form/properties
         * @originalName getProperties
         * @duplicate
         */
        getProperties2: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/form/properties`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetDeprecate11
         * @request GET:/api/docpal/workflow/form/properties/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate11: (
            query: {
                taskId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/form/properties/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name GetCleanup
         * @request GET:/api/docpal/workflow/cleanUp
         */
        getCleanup: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/cleanUp`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeleteprocessinstancebycreator
         * @request DELETE:/api/docpal/workflow/process/deleteProcessInstanceByCreator
         */
        deleteDeleteprocessinstancebycreator: (
            query: {
                processInstanceId: string;
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/deleteProcessInstanceByCreator`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow
         * @name DeleteDeleteprocessinstancebyapprover
         * @request DELETE:/api/docpal/workflow/process/deleteProcessInstanceByApprover
         */
        deleteDeleteprocessinstancebyapprover: (
            query: {
                processInstanceId: string;
                userId: string;
                deleteReason?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/process/deleteProcessInstanceByApprover`,
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
            this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
         * @name GetSetting2
         * @request GET:/api/nuxeo/admin/setting
         * @originalName getSetting
         * @duplicate
         */
        getSetting2: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
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
        putSetting2: (data: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
         * @name GetIcon
         * @request GET:/api/nuxeo/admin/icon
         */
        getIcon: (
            query: {
                docTypeId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
         * @name GetSetting3
         * @request GET:/api/nuxeo/admin/virtualfolder/setting/{id}
         * @originalName getSetting
         * @duplicate
         */
        getSetting3: (id: string, params: RequestParams = {}) =>
            this.request<ResultVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/admin/setting/language`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NuxeoAdminController
         * @name GetSetting4
         * @request GET:/api/nuxeo/admin/setting/{system_id}
         * @originalName getSetting
         * @duplicate
         */
        getSetting4: (systemId: string, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/admin/setting/${systemId}`,
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
            this.request<ResultListCustomIconDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/admin/icons`,
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/user/setting`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    personalLandingController = {
        /**
         * No description
         *
         * @tags PersonalLandingController
         * @name PutSave
         * @request PUT:/api/docpal/personal/landing/save
         */
        putSave: (data: PersonalLandingRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/personal/landing/save`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PersonalLandingController
         * @name GetLanding
         * @request GET:/api/docpal/personal/landing
         */
        getLanding: (params: RequestParams = {}) =>
            this.request<ResultPersonalLandingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/personal/landing`,
                method: "GET",
                ...params,
            }),
    };
    notificationRecordController = {
        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutStatus
         * @summary Update status of notification record
         * @request PUT:/api/docpal/notification/{id}/status/{status}
         */
        putStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/${id}/status/${status}`,
                method: "PUT",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutStatus2
         * @summary Batch update status of notification record
         * @request PUT:/api/docpal/notification/status
         * @originalName putStatus
         * @duplicate
         */
        putStatus2: (data: NotificationRecordDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutDissmissByType
         * @request PUT:/api/docpal/notification/dissmiss_by_type
         */
        putDissmissByType: (data: NotificationManageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/dissmiss_by_type`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PutDissmissByIds
         * @request PUT:/api/docpal/notification/dissmiss_by_ids
         */
        putDissmissByIds: (data: NotificationManageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/dissmiss_by_ids`,
                method: "PUT",
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
                path: `/api/docpal/notification`,
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
                path: `/api/docpal/notification`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostAll
         * @summary Read all notification record of current login user
         * @request POST:/api/docpal/notification/read/all
         */
        postAll: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/read/all`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostQueryNotificationList
         * @request POST:/api/docpal/notification/query_notification_list
         */
        postQueryNotificationList: (data: QueryNotificationRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTONotificationInfoDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/query_notification_list`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name PostPage
         * @summary Page of notification record
         * @request POST:/api/docpal/notification/page
         */
        postPage: (
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
                path: `/api/docpal/notification/page`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetNumber
         * @summary Query count number of unread for current login user
         * @request GET:/api/docpal/notification/unRead/number
         */
        getNumber: (params: RequestParams = {}) =>
            this.request<any, ResultString | (ResultString | Result) | void>({
                path: `/api/docpal/notification/unRead/number`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetQueryOperatorList
         * @request GET:/api/docpal/notification/query_operator_list
         * @deprecated
         */
        getQueryOperatorList: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/query_operator_list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetQueryNotificationUnreadCountList
         * @request GET:/api/docpal/notification/query_notification_unread_count_list
         */
        getQueryNotificationUnreadCountList: (params: RequestParams = {}) =>
            this.request<ResultListNotificationUnreadCountDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/query_notification_unread_count_list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationRecordController
         * @name GetQueryNotificationFilter
         * @request GET:/api/docpal/notification/query_notification_filter
         */
        getQueryNotificationFilter: (params: RequestParams = {}) =>
            this.request<ResultListCheckBoxDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/query_notification_filter`,
                method: "GET",
                ...params,
            }),
    };
    notificationSettingController = {
        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name PutStatus
         * @summary Batch update status of notification setting
         * @request PUT:/api/docpal/notification/setting/status
         */
        putStatus: (data: NotificationSetting[], params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/setting/status`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name PostSetting
         * @summary Create notification setting
         * @request POST:/api/docpal/notification/setting
         */
        postSetting: (data: NotificationSetting, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/setting`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name PostModule
         * @summary Query list of some one module
         * @request POST:/api/docpal/notification/setting/type/{type}/module/{moduleName}
         */
        postModule: (type: "SUB_DOCUMENT" | "SUBSCRIPTION", moduleName: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/setting/type/${type}/module/${moduleName}`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name GetAll
         * @summary All list of notification setting
         * @request GET:/api/docpal/notification/setting/type/{type}/all
         */
        getAll: (type: "SUB_DOCUMENT" | "SUBSCRIPTION", params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/setting/type/${type}/all`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSettingController
         * @name GetModuleName
         * @request GET:/api/docpal/notification/setting/module_name
         * @deprecated
         */
        getModuleName: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/setting/module_name`,
                method: "GET",
                ...params,
            }),
    };
    masterTableController = {
        /**
         * No description
         *
         * @tags MasterTableController
         * @name PutRecord
         * @summary update data (master table)
         * @request PUT:/api/docpal/master/tables/{id}/record
         */
        putRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PutRecord2
         * @request PUT:/api/docpal/master/tables/{id}/batch/record
         * @originalName putRecord
         * @duplicate
         */
        putRecord2: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PutRecord3
         * @request PUT:/api/docpal/master/tables/for_admin/{id}/batch/record
         * @originalName putRecord
         * @duplicate
         */
        putRecord3: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/for_admin/${id}/batch/record`,
                method: "PUT",
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
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultListMapStringObject, ResultString | (ResultString | Result)>({
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
         * @name PostPage2
         * @request POST:/api/docpal/master/tables/for_admin/record/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/for_admin/record/page`,
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
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
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
         * @name PatchStatus
         * @summary Enable or Disable Record
         * @request PATCH:/api/docpal/master/tables/{id}/record/status
         */
        patchStatus: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
         * @name PatchStatus3
         * @request PATCH:/api/docpal/master/tables/for_admin/{id}/batch/record/status
         * @originalName patchStatus
         * @duplicate
         */
        patchStatus3: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/for_admin/${id}/batch/record/status`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetTables
         * @summary Get all master tables
         * @request GET:/api/docpal/master/tables
         */
        getTables: (params: RequestParams = {}) =>
            this.request<ResultListMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetTables2
         * @summary Get data structure of master table and include associated table structures
         * @request GET:/api/docpal/master/tables/{id}
         * @originalName getTables
         * @duplicate
         */
        getTables2: (id: string, params: RequestParams = {}) =>
            this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/${id}`,
                method: "GET",
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
            this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/${id}/structure`,
                method: "GET",
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/${id}/acls`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetTest
         * @request GET:/api/docpal/master/tables/test
         */
        getTest: (params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/test`,
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
            this.request<ResultListMTRelationResponseDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/records`,
                method: "GET",
                query: query,
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
            this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetRelation2
         * @summary query relation of master table
         * @request GET:/api/docpal/master/tables/for_admin/relation/{id}
         * @originalName getRelation
         * @duplicate
         */
        getRelation2: (id: string, params: RequestParams = {}) =>
            this.request<ResultListMTRelationResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/for_admin/relation/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetRecord2
         * @summary query record with related fields of master table for admin
         * @request GET:/api/docpal/master/tables/for_admin/record
         * @originalName getRecord
         * @duplicate
         */
        getRecord2: (
            query: {
                id: string;
                recordId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/for_admin/record`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags MasterTableController
         * @name GetFindAllByUser
         * @summary Get all master tables by user
         * @request GET:/api/docpal/master/tables/find_all_by_user
         */
        getFindAllByUser: (params: RequestParams = {}) =>
            this.request<ResultListMasterTableResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/master/tables/find_all_by_user`,
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
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
         * @name PostList
         * @summary Query list
         * @request POST:/api/docpal/calendars/list
         */
        postList: (data: CalendarTaskReq, params: RequestParams = {}) =>
            this.request<ResultListCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/calendars/${id}`,
                method: "DELETE",
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
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/calendars/widget/setting`,
                method: "GET",
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
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/calendars/setting`,
                method: "GET",
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
            this.request<ResultListCalendarTaskRespDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/calendars/active`,
                method: "GET",
                ...params,
            }),
    };
    wopiHostController = {
        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetContents
         * @request GET:/api/wopi/files/{id}/contents
         */
        getContents: (
            id: string,
            query: {
                access_token: string;
                fileType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/wopi/files/${id}/contents`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name PostContents
         * @request POST:/api/wopi/files/{id}/contents
         */
        postContents: (
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
                path: `/api/wopi/files/${id}/contents`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetFiles
         * @request GET:/api/wopi/files/{id}
         */
        getFiles: (
            id: string,
            query: {
                access_token: string;
                readonly?: boolean;
                fileType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<FileDTO, ResultString | (ResultString | Result)>({
                path: `/api/wopi/files/${id}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags wopi-host-controller
         * @name GetGetofficetoken
         * @request GET:/api/nuxeo/getOfficeToken/{id}
         */
        getGetofficetoken: (
            id: string,
            query?: {
                fileType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/getOfficeToken/${id}`,
                method: "GET",
                query: query,
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<GenerateDocumentMode, ResultString | (ResultString | Result)>({
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
            this.request<ResultPaginationDTOAuditTemplateDTO, ResultString | (ResultString | Result)>({
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
            this.request<void, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultListAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAccessControlPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultListAccessControlPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserInformation, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserInformation, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultListAclUserRelationshipWithUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAclUserGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultAccessControlEntry, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultAccessControlEntry, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/permission/entry/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    templateNuxeo = {
        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name PostSummitanddownloadfile
         * @summary Summit And Download File
         * @request POST:/api/nuxeo/template/summitAndDownloadFile
         */
        postSummitanddownloadfile: (data: GenerateTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/template/summitAndDownloadFile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name PostGettemplateparams
         * @summary GET Template Params
         * @request POST:/api/nuxeo/template/getTemplateParams
         */
        postGettemplateparams: (data: GenerateTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringListString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/template/getTemplateParams`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template (Nuxeo)
         * @name PostGettemplatelist
         * @summary Obtain Document Template List
         * @request POST:/api/nuxeo/template/getTemplateList
         */
        postGettemplatelist: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/template/getTemplateList`,
                method: "POST",
                ...params,
            }),
    };
    tagNuxeo = {
        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostLabel
         * @summary fuzzy Query Tags by label
         * @request POST:/api/nuxeo/tags/label
         */
        postLabel: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags/label`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostGetalltags
         * @request POST:/api/nuxeo/tags/getAllTags
         */
        postGetalltags: (params: RequestParams = {}) =>
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags/getAllTags`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostDeprecate
         * @summary Tag document with one or several 'tags'
         * @request POST:/api/nuxeo/tags/
         */
        postDeprecate: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name DeleteDeprecate
         * @summary Remove all document tags
         * @request DELETE:/api/nuxeo/tags/
         */
        deleteDeprecate: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PatchDeprecate
         * @summary Untag document from one or several 'tags'
         * @request PATCH:/api/nuxeo/tags/
         */
        patchDeprecate: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PostTags
         * @summary Tag document with one or several 'tags'
         * @request POST:/api/nuxeo/tags
         */
        postTags: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name DeleteTags
         * @summary Remove all document tags
         * @request DELETE:/api/nuxeo/tags
         */
        deleteTags: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Tag (Nuxeo)
         * @name PatchTags
         * @summary Untag document from one or several 'tags'
         * @request PATCH:/api/nuxeo/tags
         */
        patchTags: (data: TagRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/tags`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    shareNuxeo = {
        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostDownload
         * @summary check download file is complete
         * @request POST:/api/nuxeo/share/prepare/download
         */
        postDownload: (data: string[], params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/share/prepare/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name PostPage
         * @request POST:/api/nuxeo/share/page
         */
        postPage: (data: SharePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
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
         * @name PostNew
         * @summary generate share link
         * @request POST:/api/nuxeo/share/new
         */
        postNew: (data: ShareRequestDTO, params: RequestParams = {}) =>
            this.request<ResultEasyShareDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/share/new`,
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultEasyShareDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/share`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Share (Nuxeo)
         * @name GetDownload
         * @summary Get Status of download file is complete
         * @request GET:/api/nuxeo/share/prepare/download/{docId}
         */
        getDownload: (docId: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/share/prepare/download/${docId}`,
                method: "GET",
                ...params,
            }),
    };
    searchNuxeo = {
        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostSaveNestedSearchLog
         * @request POST:/api/nuxeo/search/save_nested_search_log
         */
        postSaveNestedSearchLog: (data: NestedSearchLogRequestDTO, params: RequestParams = {}) =>
            this.request<ResultVoid, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/save_nested_search_log`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostSavesearchhistory
         * @summary Save Search History
         * @request POST:/api/nuxeo/search/saveSearchHistory
         */
        postSavesearchhistory: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/saveSearchHistory`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostQuerysearchhistory
         * @summary Query Search History
         * @request POST:/api/nuxeo/search/querySearchHistory
         */
        postQuerysearchhistory: (params: RequestParams = {}) =>
            this.request<ResultListSearchHistory, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/querySearchHistory`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostNestedsearchV2
         * @summary Nested Search
         * @request POST:/api/nuxeo/search/nestedSearch_v2
         */
        postNestedsearchV2: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
         * @name PostNestedsearchold
         * @summary Nested Search
         * @request POST:/api/nuxeo/search/nestedSearchOld
         * @deprecated
         */
        postNestedsearchold: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/nestedSearchOld`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostExportcsv
         * @summary export Nested Search
         * @request POST:/api/nuxeo/search/exportCsv
         */
        postExportcsv: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/exportCsv`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostDeprecate
         * @summary Search Documents
         * @request POST:/api/nuxeo/search/
         */
        postDeprecate: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name PostSearch
         * @summary Search Documents
         * @request POST:/api/nuxeo/search
         */
        postSearch: (data: SearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetAggConfigs
         * @summary Get Aggregation Configs by search page provider name
         * @request GET:/api/nuxeo/search/{pageProviderName}/agg_configs
         */
        getAggConfigs: (pageProviderName: string, params: RequestParams = {}) =>
            this.request<ResultListAggregationConfigResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/${pageProviderName}/agg_configs`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetDeprecate
         * @summary Get Aggregation Configs by search page provider name
         * @request GET:/api/nuxeo/search/{pageProviderName}/agg_configs/
         */
        getDeprecate: (pageProviderName: string, params: RequestParams = {}) =>
            this.request<ResultListAggregationConfigResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/${pageProviderName}/agg_configs/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetDeprecate2
         * @summary Get all text search types
         * @request GET:/api/nuxeo/search/textSearchTypes/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultListString, ResultString | (ResultString | Result)>({
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
            this.request<ResultListString, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/textSearchTypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetQueryNestedSearchLog
         * @request GET:/api/nuxeo/search/query_nested_search_log
         */
        getQueryNestedSearchLog: (params: RequestParams = {}) =>
            this.request<ResultListNestedSearchLogRecord, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/query_nested_search_log`,
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
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/getSearchExtends`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetDeprecate3
         * @summary getMimiType
         * @request GET:/api/nuxeo/search/getSearchExtends/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (
            query: {
                primaryType: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/getSearchExtends/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetGetexportheader
         * @summary get export header for Nested Search
         * @request GET:/api/nuxeo/search/getExportHeader
         */
        getGetexportheader: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/getExportHeader`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetAssetsSearch
         * @summary Assets Search
         * @request GET:/api/nuxeo/search/assets_search
         */
        getAssetsSearch: (
            query: {
                /** DocPal search (Request) */
                searchRequestDTO: DocPalSearchRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultESSearchResultResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/assets_search`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetDeprecate4
         * @summary Assets Search
         * @request GET:/api/nuxeo/search/assets_search/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate4: (
            query: {
                /** DocPal search (Request) */
                searchRequestDTO: DocPalSearchRequestDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultESSearchResultResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/assets_search/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name GetAlluser
         * @summary List all user in DocPal
         * @request GET:/api/nuxeo/search/allUser
         */
        getAlluser: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/allUser`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Search (Nuxeo)
         * @name DeleteDeleteNestedSearchLog
         * @request DELETE:/api/nuxeo/search/delete_nested_search_log/{id}
         */
        deleteDeleteNestedSearchLog: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/search/delete_nested_search_log/${id}`,
                method: "DELETE",
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringInstant, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringInstant, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultString, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostGetlatestversion
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion
         */
        postGetlatestversion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate4
         * @summary Get Latest Version by Document ID or Path
         * @request POST:/api/nuxeo/getLatestVersion/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
         * @name PostDeprecate5
         * @summary Create Version by Document ID/Path and increment policy
         * @request POST:/api/nuxeo/createVersion/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: VersioningRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/createVersion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    publicNuxeo = {
        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetDeprecate
         * @request GET:/api/nuxeo/public/filerequest/
         */
        getDeprecate: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/filerequest/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name PostDeprecate
         * @request POST:/api/nuxeo/public/filerequest/
         */
        postDeprecate: (
            data: {
                password: string;
                taskId: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/filerequest/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetFilerequest
         * @request GET:/api/nuxeo/public/filerequest
         */
        getFilerequest: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/filerequest`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name PostFilerequest
         * @request POST:/api/nuxeo/public/filerequest
         */
        postFilerequest: (
            data: {
                password: string;
                taskId: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/filerequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetPreview
         * @request GET:/api/nuxeo/public/share/preview
         */
        getPreview: (
            query: {
                password: string;
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/share/preview`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetDownload
         * @request GET:/api/nuxeo/public/share/download
         */
        getDownload: (
            query: {
                password: string;
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/share/download`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetDocument
         * @summary get one document detail of share document
         * @request GET:/api/nuxeo/public/share/document/{documentId}
         */
        getDocument: (
            documentId: string,
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/share/document/${documentId}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetDocument2
         * @summary get one document detail of share document
         * @request GET:/api/nuxeo/public/document/{documentId}
         * @originalName getDocument
         * @duplicate
         */
        getDocument2: (
            documentId: string,
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/document/${documentId}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetDocument3
         * @request GET:/api/nuxeo/public/document
         * @originalName getDocument
         * @duplicate
         */
        getDocument3: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/document`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Public (Nuxeo)
         * @name GetDocument4
         * @request GET:/api/nuxeo/public/share/document
         * @originalName getDocument
         * @duplicate
         */
        getDocument4: (
            query: {
                password: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListEasyShareDocumentResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/public/share/document`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    dataImportNuxeo = {
        /**
         * No description
         *
         * @tags Data Import (Nuxeo)
         * @name PostImport
         * @request POST:/api/nuxeo/import
         */
        postImport: (
            data: {
                name: string;
                data: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/import`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Data Import (Nuxeo)
         * @name PostDeprecate
         * @request POST:/api/nuxeo/import/
         */
        postDeprecate: (
            data: {
                name: string;
                data: string;
                files: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/import/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),
    };
    identityNuxeo = {
        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostUsers
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/users
         */
        postUsers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/users`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/users/
         */
        postDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/users/`,
                method: "POST",
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
         * @name PostGroups
         * @summary List groups
         * @request POST:/api/nuxeo/identity/groups
         */
        postGroups: (params: RequestParams = {}) =>
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/groups/`,
                method: "POST",
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultGroupDTO, ResultString | (ResultString | Result)>({
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
         * @name PostGetkeycloakallusers
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers
         */
        postGetkeycloakallusers: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/getKeyCloakAllUsers`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate8
         * @summary Find all active user list
         * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate8: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/getKeyCloakAllUsers/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name PostDeprecate9
         * @request POST:/api/nuxeo/identity/copyUsers/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate9: (params: RequestParams = {}) =>
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/copyUsers`,
                method: "POST",
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/synchronize`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetSyncldapusersandgroupsbyid
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/syncLdapUsersAndGroupsById
         */
        getSyncldapusersandgroupsbyid: (
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/syncLdapUsersAndGroupsById`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Identity (Nuxeo)
         * @name GetDeprecate2
         * @summary Synchronize Nuxeo users and groups to Workflow
         * @request GET:/api/nuxeo/identity/syncLdapUsersAndGroupsById/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (
            query: {
                userId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/syncLdapUsersAndGroupsById/`,
                method: "GET",
                query: query,
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/identity/isCanModified`,
                method: "PATCH",
                query: query,
                ...params,
            }),
    };
    fileRequestUploadNuxeo = {
        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostApprove
         * @request POST:/api/nuxeo/filerequest/approve
         */
        postApprove: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest/approve`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostDeprecate
         * @request POST:/api/nuxeo/filerequest/approve/
         */
        postDeprecate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest/approve/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name GetDeprecate
         * @request GET:/api/nuxeo/filerequest/
         */
        getDeprecate: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostDeprecate2
         * @request POST:/api/nuxeo/filerequest/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: FileRequestUploadRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name DeleteDeprecate
         * @request DELETE:/api/nuxeo/filerequest/
         */
        deleteDeprecate: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest/`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name GetFilerequest
         * @request GET:/api/nuxeo/filerequest
         */
        getFilerequest: (
            query: {
                /** @format int32 */
                pageIndex: number;
                /** @format int32 */
                pageSize: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name PostFilerequest
         * @request POST:/api/nuxeo/filerequest
         */
        postFilerequest: (data: FileRequestUploadRequestDTO, params: RequestParams = {}) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Request Upload (Nuxeo)
         * @name DeleteFilerequest
         * @request DELETE:/api/nuxeo/filerequest
         */
        deleteFilerequest: (
            query: {
                id: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileRequestUploadDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/filerequest`,
                method: "DELETE",
                query: query,
                ...params,
            }),
    };
    fileUploadNuxeo = {
        /**
         * No description
         *
         * @tags FileUpload (Nuxeo)
         * @name PostIsallowaccess
         * @summary check password is ok
         * @request POST:/api/nuxeo/fileUploadRequest/isAllowAccess
         */
        postIsallowaccess: (data: FileUploadRequestDetailDTO, params: RequestParams = {}) =>
            this.request<ResultLong, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/fileUploadRequest/isAllowAccess`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FileUpload (Nuxeo)
         * @name PostAddrequest
         * @summary addRequest
         * @request POST:/api/nuxeo/fileUploadRequest/addRequest
         */
        postAddrequest: (data: FileUploadRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/fileUploadRequest/addRequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FileUpload (Nuxeo)
         * @name PostAddrequestdetail
         * @summary check password is ok
         * @request POST:/api/nuxeo/fileUploadRequest/addRequestDetail
         */
        postAddrequestdetail: (
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
                path: `/api/nuxeo/fileUploadRequest/addRequestDetail`,
                method: "POST",
                query: query,
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    documentTemplate = {
        /**
         * No description
         *
         * @tags Document Template
         * @name PostDocument
         * @summary Generate document using template and specified variables
         * @request POST:/api/nuxeo/document/templates/generate/document
         */
        postDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/templates/generate/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Template
         * @name GetTemplates
         * @request GET:/api/nuxeo/document/templates
         */
        getTemplates: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTemplate, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/templates`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Template
         * @name GetTemplates2
         * @request GET:/api/nuxeo/document/templates/{id}
         * @originalName getTemplates
         * @duplicate
         */
        getTemplates2: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentTemplate, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/document/templates/${id}`,
                method: "GET",
                ...params,
            }),
    };
    conversionNuxeo = {
        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostSubmittemplate
         * @summary submit Template Request
         * @request POST:/api/nuxeo/conversion/submitTemplate
         */
        postSubmittemplate: (
            query: {
                templatePath: string;
                documentPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultFileTemplateRecord, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/submitTemplate`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostSubmitexportrequest
         * @summary Submit Export Request
         * @request POST:/api/nuxeo/conversion/submitExportRequest
         */
        postSubmitexportrequest: (data: ConversionFileRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListFileConversionRecord, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/submitExportRequest`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostSubmit
         * @summary Submit Export Request
         * @request POST:/api/nuxeo/conversion/format/submit
         */
        postSubmit: (data: ConversionFileRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListFileConversionRecord, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/format/submit`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostGettemplatelist
         * @summary Template List
         * @request POST:/api/nuxeo/conversion/getTemplateList
         */
        postGettemplatelist: (params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/getTemplateList`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostDownload
         * @summary Download Files
         * @request POST:/api/nuxeo/conversion/download
         */
        postDownload: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/download`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name PostDownloadfile
         * @summary Download Files
         * @request POST:/api/nuxeo/conversion/downloadFile
         */
        postDownloadfile: (data: string[], params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/downloadFile`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetGettemplatefilepath
         * @summary Get Template Path
         * @request GET:/api/nuxeo/conversion/getTemplateFilePath
         */
        getGettemplatefilepath: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/getTemplateFilePath`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetGetsupportedformat
         * @summary Get Supported Formats
         * @request GET:/api/nuxeo/conversion/getSupportedFormat
         */
        getGetsupportedformat: (params: RequestParams = {}) =>
            this.request<ResultMapStringListObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/getSupportedFormat`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetGetfilepath
         * @summary Get Files Path
         * @request GET:/api/nuxeo/conversion/getFilePath
         * @deprecated
         */
        getGetfilepath: (params: RequestParams = {}) =>
            this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/getFilePath`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Conversion (Nuxeo)
         * @name GetGetconversionhistory
         * @summary Get Conversion History
         * @request GET:/api/nuxeo/conversion/getConversionHistory
         */
        getGetconversionhistory: (
            query: {
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFileConversionRecord, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/conversion/getConversionHistory`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    commentNuxeo = {
        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostAdd
         * @summary Create a new document comment
         * @request POST:/api/nuxeo/comments/add
         */
        postAdd: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostDeprecate
         * @summary Create a new document comment
         * @request POST:/api/nuxeo/comments/add/
         */
        postDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/add/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostComments
         * @summary Get document comments
         * @request POST:/api/nuxeo/comments
         */
        postComments: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PostDeprecate2
         * @summary Get document comments
         * @request POST:/api/nuxeo/comments/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PatchDeprecate
         * @summary Update a document comment
         * @request PATCH:/api/nuxeo/comments/update/
         */
        patchDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/update/`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name PatchUpdate
         * @summary Update a document comment
         * @request PATCH:/api/nuxeo/comments/update
         */
        patchUpdate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/update`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name DeleteDeprecate
         * @summary Delete a document comment
         * @request DELETE:/api/nuxeo/comments/delete/
         */
        deleteDeprecate: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/delete/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Comment (Nuxeo)
         * @name DeleteDelete
         * @summary Delete a document comment
         * @request DELETE:/api/nuxeo/comments/delete
         */
        deleteDelete: (data: CommentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/comments/delete`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    annotationNuxeo = {
        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name GetAnnotation
         * @summary Retrieve annotations from a document
         * @request GET:/api/nuxeo/annotation
         */
        getAnnotation: (
            query: {
                idOrPath: string;
                annotationId?: string;
                version?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/annotation`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name PostAnnotation
         * @summary Save annotations as document attachment
         * @request POST:/api/nuxeo/annotation
         */
        postAnnotation: (data: AnnotationRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/annotation`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name GetDeprecate
         * @summary Retrieve annotations from a document
         * @request GET:/api/nuxeo/annotation/
         */
        getDeprecate: (
            query: {
                idOrPath: string;
                annotationId?: string;
                version?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/annotation/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Annotation (Nuxeo)
         * @name PostDeprecate
         * @summary Save annotations as document attachment
         * @request POST:/api/nuxeo/annotation/
         */
        postDeprecate: (data: AnnotationRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/annotation/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    messageQueue = {
        /**
         * No description
         *
         * @tags MessageQueue
         * @name PostReinvoke
         * @summary ReInvoke business
         * @request POST:/api/message/queue/{messageId}/reinvoke
         */
        postReinvoke: (messageId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/message/queue/${messageId}/reinvoke`,
                method: "POST",
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
            },
            data: BusinessResultRecord,
            params: RequestParams = {},
        ) =>
            this.request<ResultPageBusinessResultRecord, ResultString | (ResultString | Result)>({
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
            this.request<ResultListBusinessResultRecord, ResultString | (ResultString | Result)>({
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
            this.request<ResultListMQMessageTotalDTO, ResultString | (ResultString | Result)>({
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
        getStatusgroup: (params: RequestParams = {}) =>
            this.request<ResultListMQConsumeGroupStatusDTO, ResultString | (ResultString | Result)>({
                path: `/api/message/queue/report/statusGroup`,
                method: "GET",
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
        getDaygroup: (params: RequestParams = {}) =>
            this.request<ResultListMQDayTotalDTO, ResultString | (ResultString | Result)>({
                path: `/api/message/queue/report/dayGroup`,
                method: "GET",
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
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/message/queue/consumes`,
                method: "GET",
                format: "json",
                ...params,
            }),
    };
    domainConfigController = {
        /**
         * No description
         *
         * @tags domain-config-controller
         * @name GetConfig
         * @request GET:/api/domain/config
         */
        getConfig: (
            query: {
                companyName: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDomainConfig, ResultString | (ResultString | Result)>({
                path: `/api/domain/config`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags domain-config-controller
         * @name PostConfig
         * @request POST:/api/domain/config
         */
        postConfig: (data: DomainConfig, params: RequestParams = {}) =>
            this.request<ResultDomainConfig, ResultString | (ResultString | Result)>({
                path: `/api/domain/config`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags domain-config-controller
         * @name GetApikey
         * @request GET:/api/domain/config/apiKey/{apiKey}
         */
        getApikey: (apiKey: string, params: RequestParams = {}) =>
            this.request<ResultDomainConfig, ResultString | (ResultString | Result)>({
                path: `/api/domain/config/apiKey/${apiKey}`,
                method: "GET",
                ...params,
            }),
    };
    workflowFile = {
        /**
         * No description
         *
         * @tags Workflow File
         * @name PostFiles
         * @summary Upload multiple files in the nuxeo repository
         * @request POST:/api/docpal/workflow/upload/files
         */
        postFiles: (
            data: {
                document: string;
                files?: File[];
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/upload/files`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Workflow File
         * @name PostFile
         * @summary Upload single file in the nuxeo repository
         * @request POST:/api/docpal/workflow/upload/file
         */
        postFile: (
            data: {
                document: string;
                /** @format binary */
                file?: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/workflow/upload/file`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),
    };
    whatsAppController = {
        /**
         * No description
         *
         * @tags WhatsAppController
         * @name GetWebhook
         * @request GET:/api/docpal/whatsapp/webhook
         */
        getWebhook: (
            query: {
                queryParams: Record<string, string>;
            },
            params: RequestParams = {},
        ) =>
            this.request<string, ResultString | (ResultString | Result)>({
                path: `/api/docpal/whatsapp/webhook`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name PostWebhook
         * @request POST:/api/docpal/whatsapp/webhook
         */
        postWebhook: (data: JSONObject, params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/docpal/whatsapp/webhook`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name PostSendMessage
         * @request POST:/api/docpal/whatsapp/send_message
         */
        postSendMessage: (data: WhatsAppMessageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultSendMessageResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/whatsapp/send_message`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags WhatsAppController
         * @name GetGetMessageTemplates
         * @request GET:/api/docpal/whatsapp/get_message_templates
         */
        getGetMessageTemplates: (params: RequestParams = {}) =>
            this.request<ResultListMessageTemplateDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/whatsapp/get_message_templates`,
                method: "GET",
                ...params,
            }),
    };
    watermarkTemplate = {
        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetTemplates
         * @summary Query watermark template and watermark setting list
         * @request GET:/api/docpal/watermark/templates
         */
        getTemplates: (params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/templates`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name PostTemplates
         * @summary Create watermark template and watermark setting list
         * @request POST:/api/docpal/watermark/templates
         */
        postTemplates: (data: WMKTemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
         * @summary Watermark template Page
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
            this.request<ResultPageWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
         * @name GetTemplates2
         * @summary Query watermark template by ID
         * @request GET:/api/docpal/watermark/templates/{id}
         * @originalName getTemplates
         * @duplicate
         */
        getTemplates2: (id: string, params: RequestParams = {}) =>
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/templates/name/${name}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Template
         * @name GetAll
         * @summary Query watermark template and watermark setting list
         * @request GET:/api/docpal/watermark/templates/all
         */
        getAll: (params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
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
         * @name PostTemplate
         * @summary Generate a watermark file with a certain watermark template
         * @request POST:/api/docpal/watermark/document/template
         */
        postTemplate: (
            query: {
                templateId: string;
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/document/template`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name PostDeprecate
         * @summary Generate a watermark file with a certain watermark template
         * @request POST:/api/docpal/watermark/document/multiple/template/
         */
        postDeprecate: (
            query: {
                templateId: string;
                idOrPath: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/document/multiple/template/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetTemplate
         * @summary Query list of watermark settings by template id
         * @request GET:/api/docpal/watermark/template/{templateId}
         */
        getTemplate: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultListWatermarkSettingsDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/template/${templateId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetPreview
         * @request GET:/api/docpal/watermark/settings/preview/{id}
         */
        getPreview: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/settings/preview/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Watermark Settings
         * @name GetPreview2
         * @request GET:/api/docpal/watermark/document/preview
         * @originalName getPreview
         * @duplicate
         */
        getPreview2: (
            query: {
                watermarkTemplateId: string;
                documentId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/watermark/document/preview`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    docPalTypeController = {
        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name PostVerify
         * @request POST:/api/docpal/types/name/{name}/verify
         */
        postVerify: (name: string, data: Record<string, string>, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/name/${name}/verify`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name PostMetadatas
         * @summary Query all metadata list of the docpal type through name
         * @request POST:/api/docpal/types/metadatas
         */
        postMetadatas: (data: DocPalType, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeMetadataDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/metadatas`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetName
         * @summary Obtain docpal type detail through name
         * @request GET:/api/docpal/types/name/{name}
         */
        getName: (name: string, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/name/${name}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetRelated
         * @summary Query all related docpal type of current docpal type
         * @request GET:/api/docpal/types/name/{name}/related
         */
        getRelated: (name: string, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeRelated, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/name/${name}/related`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetMetadatas
         * @summary Query all metadata list of the docpal type through name
         * @request GET:/api/docpal/types/name/{name}/metadatas
         */
        getMetadatas: (name: string, params: RequestParams = {}) =>
            this.request<ResultListDocPalTypeMetadataDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/name/${name}/metadatas`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetIntersection
         * @summary Compare metadata differences between two DocPal types
         * @request GET:/api/docpal/types/compare/intersection
         */
        getIntersection: (oldDocPalType: string, newDocPalType: string, params: RequestParams = {}) =>
            this.request<ResultDocPalTypeDistinction, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/compare/intersection`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags DocPalTypeController
         * @name GetActive
         * @summary Find all docpal type
         * @request GET:/api/docpal/types/active
         */
        getActive: (params: RequestParams = {}) =>
            this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/types/active`,
                method: "GET",
                ...params,
            }),
    };
    template = {
        /**
         * No description
         *
         * @tags Template
         * @name PostDeprecate
         * @request POST:/api/docpal/template/email/send/
         */
        postDeprecate: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/template/email/send/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostSend
         * @request POST:/api/docpal/template/email/send
         */
        postSend: (data: MailSendRequest, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/template/email/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostDeprecate2
         * @request POST:/api/docpal/template/email/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: TemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/template/email/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostEmail
         * @request POST:/api/docpal/template/email
         */
        postEmail: (data: TemplateRequestDTO, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/template/email`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostDocument
         * @request POST:/api/docpal/template/document
         */
        postDocument: (
            data: {
                params: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/template/document`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Template
         * @name PostDeprecate3
         * @request POST:/api/docpal/template/document/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (
            data: {
                params: string;
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/template/document/`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),
    };
    systemFeatureController = {
        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostDeprecate
         * @request POST:/api/docpal/systemfeature/initEntity/
         */
        postDeprecate: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/initEntity/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostInitentity
         * @request POST:/api/docpal/systemfeature/initEntity
         */
        postInitentity: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/initEntity`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostDeprecate2
         * @request POST:/api/docpal/systemfeature/addFunctionById/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: SystemFeatureRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/addFunctionById/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name PostAddfunctionbyid
         * @request POST:/api/docpal/systemfeature/addFunctionById
         */
        postAddfunctionbyid: (data: SystemFeatureRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/addFunctionById`,
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
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultMapStringBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/getFeatures/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetDeprecate2
         * @request GET:/api/docpal/systemfeature/findAll/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/findAll/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags system-feature-controller
         * @name GetFindall
         * @request GET:/api/docpal/systemfeature/findAll
         */
        getFindall: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/systemfeature/findAll`,
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
            this.request<ResultLanguageEntity, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultLanguageEntity, ResultString | (ResultString | Result)>({
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
         * @name GetQuery
         * @request GET:/api/docpal/relation/query
         */
        getQuery: (
            query: {
                relation: FormPropertiesRelation;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertiesRelation, ResultString | (ResultString | Result)>({
                path: `/api/docpal/relation/query`,
                method: "GET",
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
            this.request<ResultListLanguageEntity, ResultString | (ResultString | Result)>({
                path: `/api/docpal/relation/queryLanguage`,
                method: "GET",
                query: query,
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
            this.request<ResultSetString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/relation/queryLanguageLocale`,
                method: "GET",
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/relation/isLdapMode`,
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
            this.request<Result, ResultString | (ResultString | Result)>({
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
            this.request<ResultKeyCloakPropertyVO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/relation/getKeyCloakProperty`,
                method: "GET",
                ...params,
            }),
    };
    retentionPolicyController = {
        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PostSubmitevent
         * @summary Submit events through policy document id
         * @request POST:/api/docpal/policy/retentions/submitEvent
         */
        postSubmitevent: (data: RetentionPolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/submitEvent`,
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
         * @request POST:/api/docpal/policy/retentions/document/page
         */
        postPage: (data: RetentionPolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTORetentionPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/document/page`,
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
         * @summary Update status through id
         * @request PATCH:/api/docpal/policy/retentions/{id}/status/{status}
         */
        patchStatus: (id: number, status: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name PatchApproval
         * @summary Approval retention policy document
         * @request PATCH:/api/docpal/policy/retentions/{id}/approval/{approved}
         */
        patchApproval: (id: number, approved: boolean, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/${id}/approval/${approved}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetRetentions
         * @summary Obtain all retention policy
         * @request GET:/api/docpal/policy/retentions
         */
        getRetentions: (params: RequestParams = {}) =>
            this.request<ResultListRetentionPolicy, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetEvents
         * @summary Get policy events through policy id
         * @request GET:/api/docpal/policy/retentions/{retentionPolicyId}/events
         */
        getEvents: (retentionPolicyId: number, params: RequestParams = {}) =>
            this.request<ResultListRetentionPolicyEvent, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/${retentionPolicyId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetExpired
         * @request GET:/api/docpal/policy/retentions/{policyId}/scan/expired
         */
        getExpired: (policyId: number, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/${policyId}/scan/expired`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetDocument
         * @summary Scan all documents to find the list of documents that match this retention policy
         * @request GET:/api/docpal/policy/retentions/{policyId}/scan/document
         */
        getDocument: (policyId: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/${policyId}/scan/document`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetRetentions2
         * @summary Obtain a retention policy details
         * @request GET:/api/docpal/policy/retentions/{id}
         * @originalName getRetentions
         * @duplicate
         */
        getRetentions2: (id: number, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetExpired2
         * @summary Scan all expired documents to find the list of documents that match all retention policy
         * @request GET:/api/docpal/policy/retentions/scan/expired
         * @originalName getExpired
         * @duplicate
         */
        getExpired2: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/scan/expired`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetDocument2
         * @summary Scan all documents to find the list of documents that match all retention policy
         * @request GET:/api/docpal/policy/retentions/scan/document
         * @originalName getDocument
         * @duplicate
         */
        getDocument2: (params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/scan/document`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetEvents2
         * @summary Get all policy events
         * @request GET:/api/docpal/policy/retentions/events
         * @originalName getEvents
         * @duplicate
         */
        getEvents2: (params: RequestParams = {}) =>
            this.request<ResultMapLongListRetentionPolicyEvent, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetDocument3
         * @summary Obtain retention policy detail
         * @request GET:/api/docpal/policy/retentions/document/{id}
         * @originalName getDocument
         * @duplicate
         */
        getDocument3: (id: number, params: RequestParams = {}) =>
            this.request<ResultRetentionPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/document/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags RetentionPolicyController
         * @name GetConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/policy/retentions/document/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/retentions/document/page/conditions`,
                method: "GET",
                ...params,
            }),
    };
    policyDocumentController = {
        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PostRemove
         * @summary Remove hold policy who bind document
         * @request POST:/api/docpal/policy/documents/remove
         */
        postRemove: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/remove`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PostPage
         * @summary Pagination search
         * @request POST:/api/docpal/policy/documents/page
         */
        postPage: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PostAdd
         * @summary Add a hold policy to bind document
         * @request POST:/api/docpal/policy/documents/add
         */
        postAdd: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/add`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name PatchStatus
         * @summary submit approved comment
         * @request PATCH:/api/docpal/policy/documents/{id}/status/{status}
         */
        patchStatus: (id: number, status: boolean, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/${id}/status/${status}`,
                method: "PATCH",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetDocuments
         * @summary Obtain policy document detail
         * @request GET:/api/docpal/policy/documents/{id}
         */
        getDocuments: (id: number, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name DeleteDocuments
         * @request DELETE:/api/docpal/policy/documents/{id}
         */
        deleteDocuments: (id: number, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetConditions
         * @summary Obtain all conditions that has been used
         * @request GET:/api/docpal/policy/documents/page/conditions
         */
        getConditions: (params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetDocument
         * @summary Obtain policy who document used
         * @request GET:/api/docpal/policy/documents/document/{documentId}
         */
        getDocument: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/document/${documentId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags PolicyDocumentController
         * @name GetApproval
         * @summary Query my policy who document used
         * @request GET:/api/docpal/policy/documents/document/{documentId}/approval
         */
        getApproval: (documentId: string, params: RequestParams = {}) =>
            this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/documents/document/${documentId}/approval`,
                method: "GET",
                ...params,
            }),
    };
    notificationSubscriberController = {
        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name PostSubscriber
         * @summary Create notification subscriber
         * @request POST:/api/docpal/notification/subscriber
         */
        postSubscriber: (data: NotificationSubscriberRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/subscriber`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name PostDocument
         * @summary Create notification subscriber
         * @request POST:/api/docpal/notification/subscriber/document
         */
        postDocument: (data: NotificationSubscriber, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/subscriber/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name GetFolders
         * @summary Find folder list of subscriber
         * @request GET:/api/docpal/notification/subscriber/{subscriber}/folders
         */
        getFolders: (subscriber: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/subscriber/${subscriber}/folders`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name GetIdorpath
         * @summary Query whether the user is subscribed to the directory
         * @request GET:/api/docpal/notification/subscriber/subscriber/{subscriber}/idOrPath/{idOrPath}
         */
        getIdorpath: (subscriber: string, idOrPath: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/subscriber/subscriber/${subscriber}/idOrPath/${idOrPath}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags NotificationSubscriberController
         * @name DeleteIdorpath
         * @summary Remove notification subscriber
         * @request DELETE:/api/docpal/notification/subscriber/subscriber/{subscriber}/idOrPath/{idOrPath}
         */
        deleteIdorpath: (subscriber: string, idOrPath: string, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/notification/subscriber/subscriber/${subscriber}/idOrPath/${idOrPath}`,
                method: "DELETE",
                ...params,
            }),
    };
    auditLog = {
        /**
         * No description
         *
         * @tags Audit Log
         * @name PostPageV2
         * @request POST:/api/docpal/logs/recent/search/page_v2
         */
        postPageV2: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTONestedSearchLogV2, ResultString | (ResultString | Result)>({
                path: `/api/docpal/logs/recent/search/page_v2`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name PostPage
         * @summary Query Recent Search
         * @request POST:/api/docpal/logs/recent/search/page
         */
        postPage: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTONestedSearchLog, ResultString | (ResultString | Result)>({
                path: `/api/docpal/logs/recent/search/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name PostPage2
         * @summary Query Recent Document
         * @request POST:/api/docpal/logs/recent/document/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: BasePageRequest, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOESDocumentThumbnailDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/logs/recent/document/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Audit Log
         * @name DeleteLogs
         * @request DELETE:/api/docpal/logs/recent/document/logs
         */
        deleteLogs: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/logs/recent/document/logs`,
                method: "DELETE",
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
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
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
         * @request POST:/api/docpal/internalShare/others/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/others/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostOthers
         * @request POST:/api/docpal/internalShare/others
         */
        postOthers: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/others`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostDeprecate3
         * @request POST:/api/docpal/internalShare/me/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate3: (data: InternalShareToMePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/me/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteDeprecate
         * @request DELETE:/api/docpal/internalShare/me/
         */
        deleteDeprecate: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/me/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostMe
         * @request POST:/api/docpal/internalShare/me
         */
        postMe: (data: InternalShareToMePageRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/me`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteMe
         * @request DELETE:/api/docpal/internalShare/me
         */
        deleteMe: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/me`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostGroups
         * @request POST:/api/docpal/internalShare/groups
         */
        postGroups: (data: InternalShareByGroupsRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInternalShare, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/groups`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostDeprecate4
         * @request POST:/api/docpal/internalShare/checkDocumentIsInShare/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate4: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
                path: `/api/docpal/internalShare`,
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
            this.request<ResultInternalShare, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare`,
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
         * @name GetDeprecate
         * @request GET:/api/docpal/internalShare/
         */
        getDeprecate: (
            query: {
                queryDTO: InternalShareQueryDTO;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name PostDeprecate5
         * @request POST:/api/docpal/internalShare/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate5: (data: InternalShareRequestDTO, params: RequestParams = {}) =>
            this.request<ResultInternalShare, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name DeleteDeprecate2
         * @request DELETE:/api/docpal/internalShare/
         * @originalName deleteDeprecate
         * @duplicate
         */
        deleteDeprecate2: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/`,
                method: "DELETE",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name GetInitscheduler
         * @request GET:/api/docpal/internalShare/initScheduler
         */
        getInitscheduler: (
            query: {
                /** @format date-time */
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/initScheduler`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags InternalShareController
         * @name GetDeprecate2
         * @request GET:/api/docpal/internalShare/initScheduler/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (
            query: {
                /** @format date-time */
                date: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultPaginableEntityDTOObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/internalShare/initScheduler/`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    formDesignController = {
        /**
         * No description
         *
         * @tags FormDesignController
         * @name PostData
         * @summary Submit form data
         * @request POST:/api/docpal/form/design/submit/data
         */
        postData: (data: FormDesignDataDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/form/design/submit/data`,
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
            this.request<ResultListLinkedHashMapStringObject, ResultString | (ResultString | Result)>({
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
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
         * @name GetDesign
         * @summary Query form design
         * @request GET:/api/docpal/form/design
         */
        getDesign: (
            query?: {
                name?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormDesignResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/form/design`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name DeleteDesign
         * @request DELETE:/api/docpal/form/design
         */
        deleteDesign: (
            query: {
                tableName: string;
                caseId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<GenerateDocumentMode, ResultString | (ResultString | Result)>({
                path: `/api/docpal/form/design`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FormDesignController
         * @name GetDetail
         * @summary Retrieve form design
         * @request GET:/api/docpal/form/design/{id}/detail
         */
        getDetail: (id: string, params: RequestParams = {}) =>
            this.request<ResultFormDesignResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/form/design/${id}/detail`,
                method: "GET",
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/email/customize/send`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    caseTypeController = {
        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPage
         * @summary Pagination Search data of deployed case type
         * @request POST:/api/docpal/case/types/{caseTypeId}/records/page
         */
        postPage: (caseTypeId: string, data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/records/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPage2
         * @request POST:/api/docpal/case/types/table/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (data: CaseTableRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/table/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name PostPage3
         * @summary Pagination search
         * @request POST:/api/docpal/case/types/page
         * @originalName postPage
         * @duplicate
         */
        postPage3: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCaseType, ResultString | (ResultString | Result)>({
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
            this.request<ResultListCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultListCaseType, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types`,
                method: "GET",
                query: query,
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
        getStylejson: (id: string, params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${id}/styleJson`,
                method: "GET",
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
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${id}/startTask`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetPrimaryform
         * @summary Get information form of case type
         * @request GET:/api/docpal/case/types/{id}/primaryForm
         */
        getPrimaryform: (
            id: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${id}/primaryForm`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetTypes2
         * @summary Retrieve case type detail
         * @request GET:/api/docpal/case/types/{caseTypeId}
         * @originalName getTypes
         * @duplicate
         */
        getTypes2: (
            caseTypeId: string,
            query?: {
                versionNumber?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetTables
         * @summary Retrieve the list of case tables that belong to the specified case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/tables
         */
        getTables: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCaseTable, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/tables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetConditions
         * @summary Obtain all conditions that Pagination Search data of deployed case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/records/page/conditions
         */
        getConditions: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/records/page/conditions`,
                method: "GET",
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/permissions`,
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
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/permissions/${userId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetInstances
         * @summary Retrieve all case instances of this case type
         * @request GET:/api/docpal/case/types/{caseTypeId}/instances
         */
        getInstances: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnInstance, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetVersion
         * @summary Query cmmn version information of the last successfully deployed version
         * @request GET:/api/docpal/case/types/{caseTypeId}/deploy/version
         */
        getVersion: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultCaseModelDraft, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/deploy/version`,
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
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/permissions/rules`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetMy
         * @summary Find out what cases the logged-in user can see.
         * @request GET:/api/docpal/case/types/my
         */
        getMy: (params: RequestParams = {}) =>
            this.request<ResultListCaseType, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/my`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name GetDeploymentid
         * @summary Retrieve case type detail
         * @request GET:/api/docpal/case/types/deploymentId/{deploymentId}
         */
        getDeploymentid: (deploymentId: string, params: RequestParams = {}) =>
            this.request<ResultCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/deploymentId/${deploymentId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseTypeController
         * @name DeleteInstance
         * @summary Delete case instance of this case type
         * @request DELETE:/api/docpal/case/types/{caseTypeId}/instance/{caseId}
         */
        deleteInstance: (caseTypeId: string, caseId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/types/${caseTypeId}/instance/${caseId}`,
                method: "DELETE",
                ...params,
            }),
    };
    caseModeController = {
        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetVariables
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/variables
         */
        getVariables: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<Record<string, object>, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/${caseInstanceId}/variables`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostVariables
         * @request POST:/api/docpal/case/instance/{caseInstanceId}/variables
         */
        postVariables: (caseInstanceId: string, data: Record<string, object>, params: RequestParams = {}) =>
            this.request<Record<string, object>, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/${caseInstanceId}/variables`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostEnable
         * @summary Enable plan item instance
         * @request POST:/api/docpal/case/instance/planItems/{planItemId}/enable
         */
        postEnable: (planItemId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/planItems/${planItemId}/enable`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostComplete
         * @summary Submit form data for complete plan item instance
         * @request POST:/api/docpal/case/instance/planItems/complete
         */
        postComplete: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/planItems/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name PostPage
         * @summary Pagination search (Case View Dashboard)
         * @request POST:/api/docpal/case/dashboard/page
         */
        postPage: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetForms
         * @summary Retrieve all forms through a case instance
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/forms
         */
        getForms: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/${caseInstanceId}/forms`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetEvents
         * @summary Retrieve all events from a case instance
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/events
         */
        getEvents: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListUserEventInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/${caseInstanceId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
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
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/process/definitions`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetForm
         * @summary Retrieve form information of plan item instance
         * @request GET:/api/docpal/case/instance/planItems/{planItemId}/form
         */
        getForm: (
            planItemId: string,
            query?: {
                caseDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/planItems/${planItemId}/form`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetList
         * @summary Retrieve all case instances of this case type
         * @request GET:/api/docpal/case/instance/list
         */
        getList: (
            query?: {
                id?: string;
                caseTypeId?: string;
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
                path: `/api/docpal/case/instance/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetForms2
         * @summary Get the list of form properties associated with the process definition
         * @request GET:/api/docpal/case/forms
         * @originalName getForms
         * @duplicate
         */
        getForms2: (
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListBpmnDynamicFormDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/forms`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetForms3
         * @summary Get form properties of single element associated with the process definition
         * @request GET:/api/docpal/case/forms/{elementKey}
         * @originalName getForms
         * @duplicate
         */
        getForms3: (
            elementKey: string,
            query?: {
                processDefinitionKey?: string;
                processDefinitionId?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFormPropertyDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/forms/${elementKey}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetDefinitions2
         * @summary Retrieve all case model definitions
         * @request GET:/api/docpal/case/definitions
         * @originalName getDefinitions
         * @duplicate
         */
        getDefinitions2: (params: RequestParams = {}) =>
            this.request<ResultListCaseDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetInstances
         * @summary Retrieve all running case instances of this case model
         * @request GET:/api/docpal/case/definitions/{caseDefinitionKey}/instances
         */
        getInstances: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListCaseInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/definitions/${caseDefinitionKey}/instances`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetDefinitions3
         * @summary Retrieve process definition of this case instance through case definition key
         * @request GET:/api/docpal/case/definition/{caseDefinitionKey}/process/definitions
         * @originalName getDefinitions
         * @duplicate
         */
        getDefinitions3: (caseDefinitionKey: string, params: RequestParams = {}) =>
            this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/definition/${caseDefinitionKey}/process/definitions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetStatus
         * @summary Obtain Milestone Status of a case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseInstanceId}/milestone/status
         */
        getStatus: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseInstanceId}/milestone/status`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetPlanitems
         * @summary Retrieve all PlanItem Instances of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/planItems
         */
        getPlanitems: (
            caseId: string,
            query: {
                /** Plan Item Definition Type */
                type: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/planItems`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetTasks
         * @summary Retrieve personal tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/personal/tasks
         */
        getTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/personal/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
         * @name GetEvents2
         * @summary Retrieve all events of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/events
         * @originalName getEvents
         * @duplicate
         */
        getEvents2: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/events`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseModeController
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
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/stage/planItems`,
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
         * @summary Trigger event for completed
         * @request POST:/api/docpal/case/instance/{caseInstanceId}/events/{planItemInstanceId}/trigger
         */
        postTrigger: (caseInstanceId: string, planItemInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/${caseInstanceId}/events/${planItemInstanceId}/trigger`,
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
            this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
            this.request<ResultCaseInstanceDTO, ResultString | (ResultString | Result)>({
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
        postPlanitems: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
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
         * @name PostActive
         * @summary Active a planItem instance
         * @request POST:/api/docpal/case/instance/planItems/active
         */
        postActive: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/planItems/active`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name PostAuditlog
         * @summary Obtain Audit Log of a case instance
         * @request POST:/api/docpal/case/instance/auditLog
         */
        postAuditlog: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/auditLog`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetStatus
         * @summary Obtain Milestone Status of a case instance
         * @request GET:/api/docpal/case/instance/{caseInstanceId}/milestone/status
         */
        getStatus: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/${caseInstanceId}/milestone/status`,
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
            this.request<ResultCaseInstanceFormDataDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/tasks/${taskId}/form`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CaseInstanceController
         * @name GetCaseid
         * @summary Retrieve form information of task
         * @request GET:/api/docpal/case/instance/caseId/{caseId}
         */
        getCaseid: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnInstance, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/instance/caseId/${caseId}`,
                method: "GET",
                ...params,
            }),
    };
    cmmnDashboardController = {
        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name PostTasks
         * @summary Paging search process instance of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/tasks
         */
        postTasks: (caseId: string, data: CmmnProcessRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostPage
         * @summary Paging search process instance of this case instance
         * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page
         */
        postPage: (caseId: string, data: CmmnProcessRequestDTO, params: RequestParams = {}) =>
            this.request<ResultPaginationDTOCmmnTaskDTO, ResultString | (ResultString | Result)>({
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
         * @name PostPage2
         * @summary Paging Query instance data for deployed case types for the currently logged in user
         * @request POST:/api/docpal/case/dashboard/caseType/{caseTypeId}/records/page
         * @originalName postPage
         * @duplicate
         */
        postPage2: (caseTypeId: string, data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/records/page`,
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
            this.request<ResultCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetTasks
         * @summary Retrieve tasks of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/tasks
         */
        getTasks: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/tasks`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetStages
         * @summary Retrieve Stage planItem Instances of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/stages
         */
        getStages: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/stages`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetConditions
         * @summary Obtain process instance conditions that has been used
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page/conditions
         */
        getConditions: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/process/instance/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetData
         * @summary Retrieve information and information data of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/primaryForm/data
         */
        getData: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultCaseInstanceFormDataDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/primaryForm/data`,
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
            this.request<ResultListCmmnActivityItem, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/activity`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetActions
         * @summary Retrieve my action list of this case instance
         * @request GET:/api/docpal/case/dashboard/instance/{caseId}/actions
         */
        getActions: (caseId: string, params: RequestParams = {}) =>
            this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/instance/${caseId}/actions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCasetype
         * @summary Query the list of case dashboard
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}
         */
        getCasetype: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetVersionnumber
         * @summary Retrieve case dashboard detail of version number
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/versionNumber/{versionNumber}
         */
        getVersionnumber: (caseTypeId: string, versionNumber: string, params: RequestParams = {}) =>
            this.request<ResultCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/versionNumber/${versionNumber}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetConditions2
         * @summary Obtain all conditions that paging search data of deployed case type
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/records/page/conditions
         * @originalName getConditions
         * @duplicate
         */
        getConditions2: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/records/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetPrimaryform
         * @summary Retrieve information of case type
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/primaryForm
         */
        getPrimaryform: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/primaryForm`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetPermission
         * @summary Show all dashboard views that belong to the current user of this case type. (Case Dashboard)
         * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/permission
         */
        getPermission: (caseTypeId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/permission`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags CmmnDashboardController
         * @name GetCaseinstance
         * @summary Show all dashboard views that belong to the current user of this case type. (Case Dashboard)
         * @request GET:/api/docpal/case/dashboard/caseInstance/{caseInstanceId}
         */
        getCaseinstance: (caseInstanceId: string, params: RequestParams = {}) =>
            this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
                path: `/api/docpal/case/dashboard/caseInstance/${caseInstanceId}`,
                method: "GET",
                ...params,
            }),
    };
    folderCabinetController = {
        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostDocument
         * @request POST:/api/docpal/cabinet/{id}/generate/document
         */
        postDocument: (id: string, data: Record<string, object>, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}/generate/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostComplete
         * @summary verification complete of folder cabinet
         * @request POST:/api/docpal/cabinet/verification/complete
         */
        postComplete: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/verification/complete`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostFile
         * @summary Upload file of folder cabinet
         * @request POST:/api/docpal/cabinet/upload/file
         */
        postFile: (
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
                path: `/api/docpal/cabinet/upload/file`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostPage
         * @summary Pagination search of document folder cabinet
         * @request POST:/api/docpal/cabinet/page
         */
        postPage: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/page`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostItem
         * @summary New Item
         * @request POST:/api/docpal/cabinet/item
         */
        postItem: (data: DFCRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentFolderCabinet, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/item`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostDocument2
         * @request POST:/api/docpal/cabinet/filing/document
         * @originalName postDocument
         * @duplicate
         */
        postDocument2: (data: FilingCreateDocRequestDTO[], params: RequestParams = {}) =>
            this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/filing/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostDocument3
         * @request POST:/api/docpal/cabinet/filing/create/document
         * @originalName postDocument
         * @duplicate
         */
        postDocument3: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/filing/create/document`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostExport
         * @request POST:/api/docpal/cabinet/export
         */
        postExport: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
            this.request<void, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/export`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name PostCreate
         * @summary Create Top folder cabinet
         * @request POST:/api/docpal/cabinet/create
         */
        postCreate: (data: DFCRequestDTO, params: RequestParams = {}) =>
            this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/create`,
                method: "POST",
                body: data,
                type: ContentType.Json,
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
                path: `/api/docpal/cabinet`,
                method: "PATCH",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetConditions
         * @summary Obtain conditions of pagination search
         * @request GET:/api/docpal/cabinet/{templateId}/page/conditions
         */
        getConditions: (templateId: string, params: RequestParams = {}) =>
            this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${templateId}/page/conditions`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetCabinet
         * @summary get folder cabinet template tree
         * @request GET:/api/docpal/cabinet/{id}
         */
        getCabinet: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name DeleteCabinet
         * @summary Delete folder cabinet
         * @request DELETE:/api/docpal/cabinet/{id}
         */
        deleteCabinet: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}`,
                method: "DELETE",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetTree
         * @summary Get template details for tree structure
         * @request GET:/api/docpal/cabinet/{id}/tree
         */
        getTree: (id: string, params: RequestParams = {}) =>
            this.request<ResultDocumentFolderCabinet, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}/tree`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetPrefix
         * @request GET:/api/docpal/cabinet/{id}/prefix
         */
        getPrefix: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}/prefix`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetList
         * @request GET:/api/docpal/cabinet/{id}/list
         */
        getList: (id: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentFolderCabinet, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}/list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetReport
         * @request GET:/api/docpal/cabinet/{id}/download/summary/report
         */
        getReport: (id: string, params: RequestParams = {}) =>
            this.request<string[], ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/${id}/download/summary/report`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetTemplate
         * @summary Get detail of folder cabinet template
         * @request GET:/api/docpal/cabinet/template/{id}
         */
        getTemplate: (id: string, params: RequestParams = {}) =>
            this.request<ResultFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/template/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetTree2
         * @summary Get template details for tree structure
         * @request GET:/api/docpal/cabinet/template/{id}/tree
         * @originalName getTree
         * @duplicate
         */
        getTree2: (id: string, params: RequestParams = {}) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/template/${id}/tree`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetList2
         * @summary Query all Top-level folder cabinet template
         * @request GET:/api/docpal/cabinet/template/list
         * @originalName getList
         * @duplicate
         */
        getList2: (
            query?: {
                label?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/template/list`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetRefreshcompletestatus
         * @request GET:/api/docpal/cabinet/refreshCompleteStatus/{id}
         */
        getRefreshcompletestatus: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/refreshCompleteStatus/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetStatus
         * @request GET:/api/docpal/cabinet/refresh/complete/status/{id}
         */
        getStatus: (id: string, params: RequestParams = {}) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/refresh/complete/status/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetNotification
         * @request GET:/api/docpal/cabinet/notification
         */
        getNotification: (params: RequestParams = {}) =>
            this.request<ResultObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/notification`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetList3
         * @summary Query template list of Top-level folder cabinet that belong to current logged-in user
         * @request GET:/api/docpal/cabinet/loginUser/list
         * @originalName getList
         * @duplicate
         */
        getList3: (params: RequestParams = {}) =>
            this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/loginUser/list`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags FolderCabinetController
         * @name GetList4
         * @summary Get export header list
         * @request GET:/api/docpal/cabinet/header/list
         * @originalName getList
         * @duplicate
         */
        getList4: (
            query: {
                templateId: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/cabinet/header/list`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    autoGeneratedValue = {
        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetDeprecate
         * @request GET:/api/docpal/auto/crId/
         */
        getDeprecate: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/crId/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostDeprecate
         * @request POST:/api/docpal/auto/crId/
         */
        postDeprecate: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/crId/`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetCrid
         * @request GET:/api/docpal/auto/crId
         */
        getCrid: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/crId`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostCrid
         * @request POST:/api/docpal/auto/crId
         */
        postCrid: (
            query: {
                customerCode: string;
                contractNo: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/crId`,
                method: "POST",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetCaseid
         * @request GET:/api/docpal/auto/caseId
         */
        getCaseid: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/caseId`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostCaseid
         * @request POST:/api/docpal/auto/caseId
         */
        postCaseid: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/caseId`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetDeprecate2
         * @request GET:/api/docpal/auto/caseId/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/caseId/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name PostDeprecate2
         * @request POST:/api/docpal/auto/caseId/
         * @originalName postDeprecate
         * @duplicate
         */
        postDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultString, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/caseId/`,
                method: "POST",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetDeprecate3
         * @request GET:/api/docpal/auto/crId/accepted/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (
            query: {
                customerCode: string;
                contractNo: string;
                /** @format int64 */
                crId: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/crId/accepted/`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auto Generated Value
         * @name GetAccepted
         * @request GET:/api/docpal/auto/crId/accepted
         */
        getAccepted: (
            query: {
                customerCode: string;
                contractNo: string;
                /** @format int64 */
                crId: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/docpal/auto/crId/accepted`,
                method: "GET",
                query: query,
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
            this.request<ResultBlockInheritedPermission, ResultString | (ResultString | Result)>({
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
            this.request<ResultListDocDTO, ResultString | (ResultString | Result)>({
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
            this.request<ResultBoolean, ResultString | (ResultString | Result)>({
                path: `/api/block/permission/document/${docId}/path/${docPath}`,
                method: "DELETE",
                ...params,
            }),
    };
    jobNuxeo = {
        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name PostAskquestion
         * @request POST:/api/ai/ask_ai/ai_chat/askQuestion
         */
        postAskquestion: (data: AiSearchRequestDTO, params: RequestParams = {}) =>
            this.request<ResultAiChatAnswerResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/ai/ask_ai/ai_chat/askQuestion`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name PostAddaicomment
         * @request POST:/api/ai/ask_ai/ai_chat/addAiComment
         */
        postAddaicomment: (data: AddAiCommentRequestDTO, params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/ai/ask_ai/ai_chat/addAiComment`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name GetWriteaitrainingdata
         * @request GET:/api/nuxeo/job/writeAiTrainingData
         */
        getWriteaitrainingdata: (params: RequestParams = {}) =>
            this.request<Result, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/job/writeAiTrainingData`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name GetQueryaitopicid
         * @request GET:/api/ai/ask_ai/ai_chat/queryAiTopicId
         */
        getQueryaitopicid: (params: RequestParams = {}) =>
            this.request<ResultAiTopicIdVO, ResultString | (ResultString | Result)>({
                path: `/api/ai/ask_ai/ai_chat/queryAiTopicId`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Job (Nuxeo)
         * @name GetQueryaichatinitinfo
         * @request GET:/api/ai/ask_ai/ai_chat/queryAiChatInitInfo
         */
        getQueryaichatinitinfo: (params: RequestParams = {}) =>
            this.request<ResultAiChatInitInfoVO, ResultString | (ResultString | Result)>({
                path: `/api/ai/ask_ai/ai_chat/queryAiChatInitInfo`,
                method: "GET",
                ...params,
            }),
    };
    onBaseUserController = {
        /**
         * No description
         *
         * @tags OnBaseUserController
         * @name GetGetapplication
         * @summary Get current user information
         * @request GET:/api/onbase/user/getApplication
         */
        getGetapplication: (params: RequestParams = {}) =>
            this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
                path: `/api/onbase/user/getApplication`,
                method: "GET",
                ...params,
            }),
    };
    vocabularyController = {
        /**
         * No description
         *
         * @tags vocabulary-controller
         * @name GetVocabulary
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}
         */
        getVocabulary: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/vocabulary/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags vocabulary-controller
         * @name GetDeprecate
         * @summary Get Vocabulary by id
         * @request GET:/api/nuxeo/vocabulary/{id}/
         */
        getDeprecate: (id: string, params: RequestParams = {}) =>
            this.request<ResultVocabularyDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/vocabulary/${id}/`,
                method: "GET",
                ...params,
            }),
    };
    smartFolderController = {
        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetSfolder
         * @request GET:/api/nuxeo/sfolder/{id}
         */
        getSfolder: (id: string, params: RequestParams = {}) =>
            this.request<ResultSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/sfolder/${id}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetDeprecate
         * @request GET:/api/nuxeo/sfolder/
         */
        getDeprecate: (params: RequestParams = {}) =>
            this.request<ResultListSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/sfolder/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags SmartFolderController
         * @name GetSfolder2
         * @request GET:/api/nuxeo/sfolder
         * @originalName getSfolder
         * @duplicate
         */
        getSfolder2: (params: RequestParams = {}) =>
            this.request<ResultListSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/sfolder`,
                method: "GET",
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
            this.request<ResultViewSettingResponseDTO, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/setting/view`,
                method: "GET",
                ...params,
            }),
    };
    extensionNuxeo = {
        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetDeprecate
         * @summary Get available subtypes
         * @request GET:/api/nuxeo/extension/subtypes/{docType}/
         */
        getDeprecate: (docType: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/extension/subtypes/${docType}/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetSubtypes
         * @summary Get available subtypes
         * @request GET:/api/nuxeo/extension/subtypes/{docType}
         */
        getSubtypes: (docType: string, params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/extension/subtypes/${docType}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetDomains
         * @summary Get domain types
         * @request GET:/api/nuxeo/extension/domains
         */
        getDomains: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/extension/domains`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetDeprecate2
         * @summary Get domain types
         * @request GET:/api/nuxeo/extension/domains/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate2: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/extension/domains/`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetDoctypes
         * @summary Get all document types
         * @request GET:/api/nuxeo/extension/doctypes
         */
        getDoctypes: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/extension/doctypes`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Extension (Nuxeo)
         * @name GetDeprecate3
         * @summary Get all document types
         * @request GET:/api/nuxeo/extension/doctypes/
         * @originalName getDeprecate
         * @duplicate
         */
        getDeprecate3: (params: RequestParams = {}) =>
            this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
                path: `/api/nuxeo/extension/doctypes/`,
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
            this.request<ResultListMapStringObject, ResultString | (ResultString | Result)>({
                path: `/api/docpal/setting/workflow/condition/setting`,
                method: "GET",
                ...params,
            }),
    };
    holdPolicyController = {
        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name GetHolds
         * @summary Query all hold policy
         * @request GET:/api/docpal/policy/holds
         */
        getHolds: (params: RequestParams = {}) =>
            this.request<ResultListHoldPolicy, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/holds`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags HoldPolicyController
         * @name GetHolds2
         * @summary Obtain hold policy detail
         * @request GET:/api/docpal/policy/holds/{id}
         * @originalName getHolds
         * @duplicate
         */
        getHolds2: (id: number, params: RequestParams = {}) =>
            this.request<ResultHoldPolicy, ResultString | (ResultString | Result)>({
                path: `/api/docpal/policy/holds/${id}`,
                method: "GET",
                ...params,
            }),
    };
    damSettingController = {
        /**
         * No description
         *
         * @tags DAMSettingController
         * @name GetSettings
         * @request GET:/api/docpal/dam/settings
         */
        getSettings: (params: RequestParams = {}) =>
            this.request<ResultMapStringListDAMConversionSetting, ResultString | (ResultString | Result)>({
                path: `/api/docpal/dam/settings`,
                method: "GET",
                ...params,
            }),
    };
}
