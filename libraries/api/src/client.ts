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

export interface ResultVoid {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: object;
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
  sort?: SortObject;
  sortOrder?: string;
  descSort?: SortObject;
}

export interface SortObject {
  sorted?: boolean;
  empty?: boolean;
  unsorted?: boolean;
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

/** Search (Request) */
export interface SearchRequestDTO {
  /** Quick Filters */
  quickFilters?: string[];
  /** Document Modification Date */
  modificationDate?: string[];
  /** Dcoument Creators */
  authors?: string[];
  /** Document Collections */
  collections?: string[];
  /** Document Tags */
  tags?: string[];
  /** Document Nature */
  nature?: string[];
  /** Document Subjects */
  subjects?: string[];
  /** Document Coverage */
  coverage?: string[];
  /** Document Size */
  size?: string[];
  /** Full Text */
  text?: string;
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

export interface ResultMapStringObject {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: Record<string, object>;
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

export interface NestedSearchLog {
  /** NestedSearch (Request) */
  searchRequestDTO?: NestedSearchRequestDTO;
  /** @format int64 */
  totalSize?: number;
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
  /** @format int64 */
  biggerThenId?: number;
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
}

export interface ResultInternalShare {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: InternalShare;
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
  /** Where Condition */
  where?: Record<string, object>;
  businessKey?: string;
  sort?: SortObject;
  sortOrder?: string;
  descSort?: SortObject;
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
  createdBy?: string;
  modifiedBy?: string;
  /** @format date-time */
  createdDate?: string;
  /** @format date-time */
  modifiedDate?: string;
  caseDefinitionKey?: string;
  caseDefinitionId?: string;
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

export interface ResultWMKTemplateRequestDTO {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: WMKTemplateRequestDTO;
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
  url: string;
  /** 域 */
  realm: string;
  /** clientId */
  clientId: string;
  /** sslRequired */
  sslRequired: string;
  /** publicClient */
  publicClient: boolean;
  /**
   * confidentialPort
   * @format int32
   */
  confidentialPort: number;
  /** enable SSO */
  enableSSO: boolean;
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
  formResult?: ParamMappingDTO[];
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

/** Form Design Form Result List */
export interface ParamMappingDTO {
  source?: string;
  target?: string;
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

export interface ResultListPlanItemDefinitionDTO {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PlanItemDefinitionDTO[];
}

export interface CaseTypeInfo {
  id?: string;
  caseTypeId?: string;
  label?: string;
  metadata?: string;
  dataType?: string;
  options?: string;
  require?: boolean;
  status?: string;
  createdBy?: string;
  modifiedBy?: string;
  /** @format date-time */
  createdDate?: string;
  /** @format date-time */
  modifiedDate?: string;
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
  enable?: boolean;
  publishStatus?: string;
  createdBy?: string;
  modifiedBy?: string;
  /** @format date-time */
  createdDate?: string;
  /** @format date-time */
  modifiedDate?: string;
  informations?: CaseTypeInfo[];
  permissions?: CaseTypePermissionRequestDTO[];
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

export interface ResultCmmnPlanFormDTO {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  /** Case Model Plan Form DTO */
  data?: CmmnPlanFormDTO;
}

export interface CmmnInstance {
  id?: string;
  procInstId?: string;
  caseId?: string;
  caseTypeId?: string;
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

export interface ResultCaseTypeInfo {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: CaseTypeInfo;
}

export interface ResultListCaseTypeInfo {
  result?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: CaseTypeInfo[];
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

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "https://app4.wclsolution.com" });
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
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
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

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DocPal REST API
 * @version 0.0.1
 * @baseUrl https://app4.wclsolution.com
 *
 * DocPal REST API Documentation
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
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
     * @name GetUser1
     * @summary Get User
     * @request POST:/api/nuxeo/user/{userId}
     */
    getUser1: (userId: string, params: RequestParams = {}) =>
      this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/${userId}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetUser2
     * @summary Get User
     * @request GET:/api/nuxeo/user/{userId}/
     */
    getUser2: (userId: string, params: RequestParams = {}) =>
      this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/${userId}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetUser3
     * @summary Get User
     * @request POST:/api/nuxeo/user/{userId}/
     */
    getUser3: (userId: string, params: RequestParams = {}) =>
      this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/${userId}/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name SearchUsers
     * @summary Search users
     * @request GET:/api/nuxeo/user/search/{query}
     */
    searchUsers: (query: string, params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/search/${query}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name SearchUsers1
     * @summary Search users
     * @request POST:/api/nuxeo/user/search/{query}
     */
    searchUsers1: (query: string, params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/search/${query}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name SearchUsers2
     * @summary Search users
     * @request GET:/api/nuxeo/user/search/{query}/
     */
    searchUsers2: (query: string, params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/search/${query}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name SearchUsers3
     * @summary Search users
     * @request POST:/api/nuxeo/user/search/{query}/
     */
    searchUsers3: (query: string, params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/search/${query}/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetDocumentType
     * @summary Get a document type
     * @request GET:/api/nuxeo/types/{documentType}
     */
    getDocumentType: (documentType: string, params: RequestParams = {}) =>
      this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/types/${documentType}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetDocumentType1
     * @summary Get a document type
     * @request POST:/api/nuxeo/types/{documentType}
     */
    getDocumentType1: (documentType: string, params: RequestParams = {}) =>
      this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/types/${documentType}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetDocumentType2
     * @summary Get a document type
     * @request GET:/api/nuxeo/types/{documentType}/
     */
    getDocumentType2: (documentType: string, params: RequestParams = {}) =>
      this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/types/${documentType}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetDocumentType3
     * @summary Get a document type
     * @request POST:/api/nuxeo/types/{documentType}/
     */
    getDocumentType3: (documentType: string, params: RequestParams = {}) =>
      this.request<ResultDocumentTypeDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/types/${documentType}/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetDocumentTypes
     * @summary Get all document types
     * @request GET:/api/nuxeo/types
     */
    getDocumentTypes: (
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
     * @name GetDocumentTypes1
     * @summary Get all document types
     * @request POST:/api/nuxeo/types
     */
    getDocumentTypes1: (
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
     * @name GetDocumentTypes2
     * @summary Get all document types
     * @request GET:/api/nuxeo/types/
     */
    getDocumentTypes2: (
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
     * @name GetDocumentTypes3
     * @summary Get all document types
     * @request POST:/api/nuxeo/types/
     */
    getDocumentTypes3: (
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
     * @name GetKeywords
     * @summary Get all keywords or a keyword
     * @request GET:/api/nuxeo/keywords/
     */
    getKeywords: (
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
     * @name GetKeywords1
     * @summary Get all keywords or a keyword
     * @request POST:/api/nuxeo/keywords/
     */
    getKeywords1: (data: KeywordRequestDTO, params: RequestParams = {}) =>
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
     * @name GetKeywords2
     * @summary Get all keywords or a keyword
     * @request GET:/api/nuxeo/keywords
     */
    getKeywords2: (
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
     * @name GetKeywords3
     * @summary Get all keywords or a keyword
     * @request POST:/api/nuxeo/keywords
     */
    getKeywords3: (data: KeywordRequestDTO, params: RequestParams = {}) =>
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
     * @name GetKeywordTypeGroup
     * @summary Get a keyword group
     * @request GET:/api/nuxeo/keyword/groups/{groupName}
     */
    getKeywordTypeGroup: (groupName: string, params: RequestParams = {}) =>
      this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups/${groupName}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroup1
     * @summary Get a keyword group
     * @request POST:/api/nuxeo/keyword/groups/{groupName}
     */
    getKeywordTypeGroup1: (groupName: string, params: RequestParams = {}) =>
      this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups/${groupName}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroup2
     * @summary Get a keyword group
     * @request GET:/api/nuxeo/keyword/groups/{groupName}/
     */
    getKeywordTypeGroup2: (groupName: string, params: RequestParams = {}) =>
      this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups/${groupName}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroup3
     * @summary Get a keyword group
     * @request POST:/api/nuxeo/keyword/groups/{groupName}/
     */
    getKeywordTypeGroup3: (groupName: string, params: RequestParams = {}) =>
      this.request<ResultKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups/${groupName}/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroups
     * @summary Get all keyword groups
     * @request GET:/api/nuxeo/keyword/groups
     */
    getKeywordTypeGroups: (params: RequestParams = {}) =>
      this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroups1
     * @summary Get all keyword groups
     * @request POST:/api/nuxeo/keyword/groups
     */
    getKeywordTypeGroups1: (params: RequestParams = {}) =>
      this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroups2
     * @summary Get all keyword groups
     * @request GET:/api/nuxeo/keyword/groups/
     */
    getKeywordTypeGroups2: (params: RequestParams = {}) =>
      this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetKeywordTypeGroups3
     * @summary Get all keyword groups
     * @request POST:/api/nuxeo/keyword/groups/
     */
    getKeywordTypeGroups3: (params: RequestParams = {}) =>
      this.request<ResultListKeywordTypeGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/keyword/groups/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetIcon
     * @summary Get the default icon of a document
     * @request GET:/api/nuxeo/icon/{documentType}/
     */
    getIcon: (documentType: string, params: RequestParams = {}) =>
      this.request<string[], ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/icon/${documentType}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetIcon1
     * @summary Get the default icon of a document
     * @request POST:/api/nuxeo/icon/{documentType}/
     */
    getIcon1: (documentType: string, params: RequestParams = {}) =>
      this.request<string[], ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/icon/${documentType}/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetIcon2
     * @summary Get the default icon of a document
     * @request GET:/api/nuxeo/icon/{documentType}
     */
    getIcon2: (documentType: string, params: RequestParams = {}) =>
      this.request<string[], ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/icon/${documentType}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetIcon3
     * @summary Get the default icon of a document
     * @request POST:/api/nuxeo/icon/{documentType}
     */
    getIcon3: (documentType: string, params: RequestParams = {}) =>
      this.request<string[], ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/icon/${documentType}`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Retrieve a list of existing values of a document type and key
     *
     * @tags Form (Nuxeo)
     * @name GetMetadataList
     * @request GET:/api/nuxeo/form/metadata/list
     */
    getMetadataList: (
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
     * @name GetMetadataList1
     * @request POST:/api/nuxeo/form/metadata/list
     */
    getMetadataList1: (
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
     * @name GetMetadataList2
     * @request GET:/api/nuxeo/form/metadata/list/
     */
    getMetadataList2: (
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
     * @name GetMetadataList3
     * @request POST:/api/nuxeo/form/metadata/list/
     */
    getMetadataList3: (
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

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetTrashedDocuments
     * @summary Get trashed documents
     * @request GET:/api/nuxeo/document/trash/
     */
    getTrashedDocuments: (
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
     * @name GetTrashedDocuments1
     * @summary Get trashed documents
     * @request POST:/api/nuxeo/document/trash/
     */
    getTrashedDocuments1: (
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
     * @name TrashDocuments
     * @summary Move a document to trash
     * @request DELETE:/api/nuxeo/document/trash/
     */
    trashDocuments: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name GetTrashedDocuments2
     * @summary Get trashed documents
     * @request GET:/api/nuxeo/document/trash
     */
    getTrashedDocuments2: (
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
     * @name GetTrashedDocuments3
     * @summary Get trashed documents
     * @request POST:/api/nuxeo/document/trash
     */
    getTrashedDocuments3: (
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
     * @name TrashDocuments1
     * @summary Move a document to trash
     * @request DELETE:/api/nuxeo/document/trash
     */
    trashDocuments1: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name GetFollowed
     * @summary Get followed documents
     * @request GET:/api/nuxeo/document/followed/
     */
    getFollowed: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed1
     * @summary Get followed documents
     * @request POST:/api/nuxeo/document/followed/
     */
    getFollowed1: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed2
     * @summary Get followed documents
     * @request GET:/api/nuxeo/document/followed/{userId}
     */
    getFollowed2: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed3
     * @summary Get followed documents
     * @request POST:/api/nuxeo/document/followed/{userId}
     */
    getFollowed3: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed/${userId}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed4
     * @summary Get followed documents
     * @request GET:/api/nuxeo/document/followed
     */
    getFollowed4: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed5
     * @summary Get followed documents
     * @request POST:/api/nuxeo/document/followed
     */
    getFollowed5: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed6
     * @summary Get followed documents
     * @request GET:/api/nuxeo/document/followed/{userId}/
     */
    getFollowed6: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed/${userId}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetFollowed7
     * @summary Get followed documents
     * @request POST:/api/nuxeo/document/followed/{userId}/
     */
    getFollowed7: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/followed/${userId}/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetDocumentFromFavorite
     * @summary Get documents from favorite
     * @request GET:/api/nuxeo/document/favorite/
     */
    getDocumentFromFavorite: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/favorite/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetDocumentFromFavorite1
     * @summary Get documents from favorite
     * @request POST:/api/nuxeo/document/favorite/
     */
    getDocumentFromFavorite1: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/favorite/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetDocumentFromFavorite2
     * @summary Get documents from favorite
     * @request GET:/api/nuxeo/document/favorite
     */
    getDocumentFromFavorite2: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/favorite`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetDocumentFromFavorite3
     * @summary Get documents from favorite
     * @request POST:/api/nuxeo/document/favorite
     */
    getDocumentFromFavorite3: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/favorite`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection (Nuxeo)
     * @name Get
     * @summary Get user visible collections
     * @request GET:/api/nuxeo/collection/
     */
    get: (
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
     * @name Get1
     * @summary Get user visible collections
     * @request POST:/api/nuxeo/collection/
     */
    get1: (
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
     * @name Update3
     * @request PATCH:/api/nuxeo/collection/
     */
    update3: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name Get2
     * @summary Get user visible collections
     * @request GET:/api/nuxeo/collection
     */
    get2: (
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
     * @name Get3
     * @summary Get user visible collections
     * @request POST:/api/nuxeo/collection
     */
    get3: (
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
     * @name Update4
     * @request PATCH:/api/nuxeo/collection
     */
    update4: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Workflow
     * @name GetTaskCandidatesByTaskDefinitionKey
     * @summary Retrieve task candidates by process task definition
     * @request GET:/api/docpal/workflow/task/candidatesByTaskDefinitionKey/
     */
    getTaskCandidatesByTaskDefinitionKey: (
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
     * @name GetTaskCandidatesByTaskDefinitionKey1
     * @summary Retrieve task candidates by process task definition
     * @request POST:/api/docpal/workflow/task/candidatesByTaskDefinitionKey/
     */
    getTaskCandidatesByTaskDefinitionKey1: (
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
     * @name GetTaskCandidatesByTaskDefinitionKey2
     * @summary Retrieve task candidates by process task definition
     * @request GET:/api/docpal/workflow/task/candidatesByTaskDefinitionKey
     */
    getTaskCandidatesByTaskDefinitionKey2: (
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
     * @name GetTaskCandidatesByTaskDefinitionKey3
     * @summary Retrieve task candidates by process task definition
     * @request POST:/api/docpal/workflow/task/candidatesByTaskDefinitionKey
     */
    getTaskCandidatesByTaskDefinitionKey3: (
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
     * @name GetTaskCandidates
     * @summary Retrieve task candidates
     * @request GET:/api/docpal/workflow/task/candidates/
     */
    getTaskCandidates: (
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
     * @name GetTaskCandidates1
     * @summary Retrieve task candidates
     * @request POST:/api/docpal/workflow/task/candidates/
     */
    getTaskCandidates1: (
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
     * @name GetTaskCandidates2
     * @summary Retrieve task candidates
     * @request GET:/api/docpal/workflow/task/candidates
     */
    getTaskCandidates2: (
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
     * @name GetTaskCandidates3
     * @summary Retrieve task candidates
     * @request POST:/api/docpal/workflow/task/candidates
     */
    getTaskCandidates3: (
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
     * @name DownloadAttachmentPreview
     * @summary Retrieve task attachment preview
     * @request GET:/api/docpal/workflow/task/attachment/preview/
     */
    downloadAttachmentPreview: (
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
     * @name DownloadAttachmentPreview1
     * @summary Retrieve task attachment preview
     * @request POST:/api/docpal/workflow/task/attachment/preview/
     */
    downloadAttachmentPreview1: (
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
     * @name DownloadAttachmentPreview2
     * @summary Retrieve task attachment preview
     * @request GET:/api/docpal/workflow/task/attachment/preview
     */
    downloadAttachmentPreview2: (
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
     * @name DownloadAttachmentPreview3
     * @summary Retrieve task attachment preview
     * @request POST:/api/docpal/workflow/task/attachment/preview
     */
    downloadAttachmentPreview3: (
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
     * @name GetAttachmentInfo
     * @request GET:/api/docpal/workflow/task/attachment/info/
     */
    getAttachmentInfo: (
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
     * @name GetAttachmentInfo1
     * @request POST:/api/docpal/workflow/task/attachment/info/
     */
    getAttachmentInfo1: (
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
     * @name GetAttachmentInfo2
     * @request GET:/api/docpal/workflow/task/attachment/info
     */
    getAttachmentInfo2: (
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
     * @name GetAttachmentInfo3
     * @request POST:/api/docpal/workflow/task/attachment/info
     */
    getAttachmentInfo3: (
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
     * @name DownloadAttachment
     * @summary Retrieve task attachment
     * @request GET:/api/docpal/workflow/task/attachment/
     */
    downloadAttachment: (
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
     * @name ReplaceAttachment
     * @request PUT:/api/docpal/workflow/task/attachment/
     */
    replaceAttachment: (
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
     * @name DownloadAttachment1
     * @summary Retrieve task attachment
     * @request POST:/api/docpal/workflow/task/attachment/
     */
    downloadAttachment1: (
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
     * @name DeleteAttachment
     * @summary Delete an attachment
     * @request DELETE:/api/docpal/workflow/task/attachment/
     */
    deleteAttachment: (
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
     * @name DownloadAttachment2
     * @summary Retrieve task attachment
     * @request GET:/api/docpal/workflow/task/attachment
     */
    downloadAttachment2: (
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
     * @name ReplaceAttachment1
     * @request PUT:/api/docpal/workflow/task/attachment
     */
    replaceAttachment1: (
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
     * @name DownloadAttachment3
     * @summary Retrieve task attachment
     * @request POST:/api/docpal/workflow/task/attachment
     */
    downloadAttachment3: (
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
     * @name DeleteAttachment1
     * @summary Delete an attachment
     * @request DELETE:/api/docpal/workflow/task/attachment
     */
    deleteAttachment1: (
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
     * @tags Document (Nuxeo)
     * @name ReplacePermission
     * @summary Replace user permission on document
     * @request PUT:/api/nuxeo/document/acl/replace/
     */
    replacePermission: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
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
     * @name ReplacePermission1
     * @summary Replace user permission on document
     * @request PUT:/api/nuxeo/document/acl/replace
     */
    replacePermission1: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
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
     * @tags NuxeoAdminController
     * @name GetAllVirtualFolderSystemSetting
     * @request GET:/api/nuxeo/admin/virtualfolder/setting
     */
    getAllVirtualFolderSystemSetting: (params: RequestParams = {}) =>
      this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/virtualfolder/setting`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name PutVirtualFolderSystemSetting
     * @request PUT:/api/nuxeo/admin/virtualfolder/setting
     */
    putVirtualFolderSystemSetting: (data: VirtualFolderSettingRequestDTO, params: RequestParams = {}) =>
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
     * @name GetSetting
     * @request GET:/api/nuxeo/admin/setting
     */
    getSetting: (systemId: string, params: RequestParams = {}) =>
      this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/setting`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name PutSetting
     * @request PUT:/api/nuxeo/admin/setting
     */
    putSetting: (data: string, params: RequestParams = {}) =>
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
     * @name GetIconById
     * @request GET:/api/nuxeo/admin/icon
     */
    getIconById: (
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
     * @name SaveIconById
     * @request PUT:/api/nuxeo/admin/icon
     */
    saveIconById: (
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
     * @tags NuxeoUserController
     * @name GetSetting2
     * @summary Load User Setting
     * @request GET:/api/docpal/user/setting
     */
    getSetting2: (params: RequestParams = {}) =>
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
     * @name PutSetting1
     * @request PUT:/api/docpal/user/setting
     */
    putSetting1: (data: string, params: RequestParams = {}) =>
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

    /**
     * No description
     *
     * @tags NotificationRecordController
     * @name Update
     * @summary Update status of notification record
     * @request PUT:/api/docpal/notification/{id}/status/{status}
     */
    update: (id: number, status: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/${id}/status/${status}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationRecordController
     * @name Update1
     * @summary Batch update status of notification record
     * @request PUT:/api/docpal/notification/status
     */
    update1: (data: NotificationRecordDTO, params: RequestParams = {}) =>
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
     * @tags NotificationSettingController
     * @name Update2
     * @summary Batch update status of notification setting
     * @request PUT:/api/docpal/notification/setting/status
     */
    update2: (data: NotificationSetting[], params: RequestParams = {}) =>
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
     * @tags NotificationRecordController
     * @name DismissNotificationByType
     * @request PUT:/api/docpal/notification/dissmiss_by_type
     */
    dismissNotificationByType: (data: NotificationManageRequestDTO, params: RequestParams = {}) =>
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
     * @name QueryNotificationInfoDtoList
     * @request PUT:/api/docpal/notification/dissmiss_by_ids
     */
    queryNotificationInfoDtoList: (data: NotificationManageRequestDTO, params: RequestParams = {}) =>
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
     * @tags MasterTableController
     * @name UpdateRecord
     * @summary update data (master table)
     * @request PUT:/api/docpal/master/tables/{id}/record
     */
    updateRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
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
     * @tags wopi-host-controller
     * @name GetFileContent
     * @request GET:/api/wopi/files/{id}/contents
     */
    getFileContent: (
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
     * @name ModifyFileContent
     * @request POST:/api/wopi/files/{id}/contents
     */
    modifyFileContent: (
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
     * @tags VerificationPermissionController
     * @name Verification
     * @summary verification access control permission of acl user
     * @request POST:/api/verification/permission
     */
    verification: (data: VerificationPermissionReq, params: RequestParams = {}) =>
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
     * @name QueryFieldValues
     * @request POST:/api/verification/permission/queryCollapseFieldValues
     */
    queryFieldValues: (data: AuditLogRequestDTO, params: RequestParams = {}) =>
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
     * @name QueryAuditEvent
     * @request POST:/api/verification/permission/queryAuditEvent
     */
    queryAuditEvent: (data: AuditTemplateDTO, params: RequestParams = {}) =>
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
     * @name InsertAuditEvent
     * @request POST:/api/verification/permission/auditEvent
     */
    insertAuditEvent: (data: AuditModel, params: RequestParams = {}) =>
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
     * @tags AclUserPermissionController
     * @name Find
     * @summary Query permission
     * @request GET:/api/user/permission
     */
    find: (
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
     * @name Create
     * @summary create permission of acl user that deal with business
     * @request POST:/api/user/permission
     */
    create: (data: AclUserPermission, params: RequestParams = {}) =>
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
     * @name Delete
     * @summary Remove single permission
     * @request DELETE:/api/user/permission
     */
    delete: (data: AclUserPermission, params: RequestParams = {}) =>
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
     * @name Replace
     * @request POST:/api/user/permission/replace
     */
    replace: (data: AclUserPermission, params: RequestParams = {}) =>
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
     * @tags AclPermissionController
     * @name Create1
     * @summary Create access control permission
     * @request POST:/api/permissions
     */
    create1: (data: AccessControlPermission, params: RequestParams = {}) =>
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
     * @name Delete2
     * @summary delete access control permission and entry list by name
     * @request DELETE:/api/permissions
     */
    delete2: (data: AclPermissionDTO, params: RequestParams = {}) =>
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
     * @name FindByNames
     * @request POST:/api/permissions/names
     */
    findByNames: (data: string[], params: RequestParams = {}) =>
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
     * @name FindPermissionEntries
     * @summary Query permission entry list by permission name list
     * @request POST:/api/permissions/entries
     */
    findPermissionEntries: (data: string[], params: RequestParams = {}) =>
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
     * @name BatchCreate
     * @summary batch add access control permission
     * @request POST:/api/permissions/batch/entry
     */
    batchCreate: (data: AclPermissionDTO, params: RequestParams = {}) =>
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
     * @tags AclUserController
     * @name Create2
     * @summary create acl user
     * @request POST:/api/permission/users
     */
    create2: (data: AclUserInformation, params: RequestParams = {}) =>
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
     * @tags AclUserRelationshipController
     * @name Create3
     * @summary create user relation ship
     * @request POST:/api/permission/user/relationships
     */
    create3: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
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
     * @name Delete5
     * @summary remove user relation ship
     * @request DELETE:/api/permission/user/relationships
     */
    delete5: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
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
     * @tags AclUserGroupController
     * @name Create4
     * @summary create acl user group
     * @request POST:/api/permission/user/group
     */
    create4: (data: AclUserGroup, params: RequestParams = {}) =>
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
     * @name Delete6
     * @summary Remove user from user group
     * @request DELETE:/api/permission/user/group
     */
    delete6: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
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
     * @name Create5
     * @summary Add the list of acl user to user group
     * @request POST:/api/permission/user/group/users
     */
    create5: (data: AclUserGroupDTO, params: RequestParams = {}) =>
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
     * @name Create6
     * @summary Add user to user group
     * @request POST:/api/permission/user/group/add/users
     */
    create6: (data: AclUserRelationshipWithUserGroup[], params: RequestParams = {}) =>
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
     * @tags AclEntryController
     * @name Create7
     * @summary Create Access control entry
     * @request POST:/api/permission/entry
     */
    create7: (data: AccessControlEntry, params: RequestParams = {}) =>
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
     * @name Delete8
     * @summary Batch delete entry by id list
     * @request DELETE:/api/permission/entry
     */
    delete8: (data: AclEntryDTO, params: RequestParams = {}) =>
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
     * @tags User (Nuxeo)
     * @name ResetPassword
     * @request POST:/api/nuxeo/user/resetPassword
     */
    resetPassword: (data: PasswordRequestDTO, params: RequestParams = {}) =>
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
     * @name ForgetPassword
     * @request POST:/api/nuxeo/user/forgetPassword
     */
    forgetPassword: (
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
     * @tags Template (Nuxeo)
     * @name GenerateFile
     * @summary Summit And Download File
     * @request POST:/api/nuxeo/template/summitAndDownloadFile
     */
    generateFile: (data: GenerateTemplateRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTemplateVariables
     * @summary GET Template Params
     * @request POST:/api/nuxeo/template/getTemplateParams
     */
    getTemplateVariables: (data: GenerateTemplateRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAllDocumentTemplate
     * @summary Obtain Document Template List
     * @request POST:/api/nuxeo/template/getTemplateList
     */
    getAllDocumentTemplate: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/template/getTemplateList`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag (Nuxeo)
     * @name GetByLabel
     * @summary fuzzy Query Tags by label
     * @request POST:/api/nuxeo/tags/label
     */
    getByLabel: (data: TagRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAllTags
     * @request POST:/api/nuxeo/tags/getAllTags
     */
    getAllTags: (params: RequestParams = {}) =>
      this.request<ResultSetString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/tags/getAllTags`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag (Nuxeo)
     * @name TagDocument
     * @summary Tag document with one or several 'tags'
     * @request POST:/api/nuxeo/tags/
     */
    tagDocument: (data: TagRequestDTO, params: RequestParams = {}) =>
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
     * @name RemoveAllTags
     * @summary Remove all document tags
     * @request DELETE:/api/nuxeo/tags/
     */
    removeAllTags: (data: TagRequestDTO, params: RequestParams = {}) =>
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
     * @name UntagDocument
     * @summary Untag document from one or several 'tags'
     * @request PATCH:/api/nuxeo/tags/
     */
    untagDocument: (data: TagRequestDTO, params: RequestParams = {}) =>
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
     * @name TagDocument1
     * @summary Tag document with one or several 'tags'
     * @request POST:/api/nuxeo/tags
     */
    tagDocument1: (data: TagRequestDTO, params: RequestParams = {}) =>
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
     * @name RemoveAllTags1
     * @summary Remove all document tags
     * @request DELETE:/api/nuxeo/tags
     */
    removeAllTags1: (data: TagRequestDTO, params: RequestParams = {}) =>
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
     * @name UntagDocument1
     * @summary Untag document from one or several 'tags'
     * @request PATCH:/api/nuxeo/tags
     */
    untagDocument1: (data: TagRequestDTO, params: RequestParams = {}) =>
      this.request<ResultListTagDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/tags`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Share (Nuxeo)
     * @name PrepareDownload
     * @summary check download file is complete
     * @request POST:/api/nuxeo/share/prepare/download
     */
    prepareDownload: (data: string[], params: RequestParams = {}) =>
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
     * @name Page
     * @request POST:/api/nuxeo/share/page
     */
    page: (data: SharePageRequestDTO, params: RequestParams = {}) =>
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
     * @name NewShare
     * @summary generate share link
     * @request POST:/api/nuxeo/share/new
     */
    newShare: (data: ShareRequestDTO, params: RequestParams = {}) =>
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
     * @name Get4
     * @request POST:/api/nuxeo/share/get
     */
    get4: (data: SharePageRequestDTO, params: RequestParams = {}) =>
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
     * @tags Search (Nuxeo)
     * @name SaveSearchHistory
     * @summary Save Search History
     * @request POST:/api/nuxeo/search/saveSearchHistory
     */
    saveSearchHistory: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
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
     * @name QuerySearchHistory
     * @summary Query Search History
     * @request POST:/api/nuxeo/search/querySearchHistory
     */
    querySearchHistory: (params: RequestParams = {}) =>
      this.request<ResultListSearchHistory, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/querySearchHistory`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name NestedSearch
     * @summary Nested Search
     * @request POST:/api/nuxeo/search/nestedSearch
     */
    nestedSearch: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
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
     * @name NestedSearchOld
     * @summary Nested Search
     * @request POST:/api/nuxeo/search/nestedSearchOld
     */
    nestedSearchOld: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
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
     * @name ExportCsv
     * @summary export Nested Search
     * @request POST:/api/nuxeo/search/exportCsv
     */
    exportCsv: (data: NestedSearchRequestDTO, params: RequestParams = {}) =>
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
     * @name Search
     * @summary Search Documents
     * @request POST:/api/nuxeo/search/
     */
    search: (data: SearchRequestDTO, params: RequestParams = {}) =>
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
     * @name Search1
     * @summary Search Documents
     * @request POST:/api/nuxeo/search
     */
    search1: (data: SearchRequestDTO, params: RequestParams = {}) =>
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
     * @tags Versioning Controller
     * @name RestoreVersion
     * @summary Restores a document to the input version document
     * @request POST:/api/nuxeo/restoreVersion/
     */
    restoreVersion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name RestoreVersion1
     * @summary Restores a document to the input version document
     * @request POST:/api/nuxeo/restoreVersion
     */
    restoreVersion1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @tags Document (Nuxeo)
     * @name SendMailText
     * @request POST:/api/nuxeo/registeredServer/send/mail/text
     */
    sendMailText: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name SendMail
     * @request POST:/api/nuxeo/registeredServer/send/mail/html
     */
    sendMail: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name SendWithAttachment
     * @request POST:/api/nuxeo/registeredServer/send/mail/attachments
     */
    sendWithAttachment: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name SendWithAttachment1
     * @request POST:/api/nuxeo/registeredServer/send/mail/attachment
     */
    sendWithAttachment1: (
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
     * @name ApprovalRetentionPolicyDocument
     * @request POST:/api/nuxeo/registeredServer/policy/retentions/documents/approval
     */
    approvalRetentionPolicyDocument: (
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
     * @name PolicyDocumentApproval
     * @request POST:/api/nuxeo/registeredServer/policy/documents/approval
     */
    policyDocumentApproval: (
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
     * @name SubmitData
     * @request POST:/api/nuxeo/registeredServer/form/design/submit/data
     */
    submitData: (data: FormDesignDataDTO, params: RequestParams = {}) =>
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
     * @name FilingCreateDocument
     * @request POST:/api/nuxeo/registeredServer/filing/create/document
     */
    filingCreateDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name ValidateGenerateDocument
     * @request POST:/api/nuxeo/registeredServer/document/template/validate
     */
    validateGenerateDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GenerateDocument
     * @request POST:/api/nuxeo/registeredServer/document/template/generate
     */
    generateDocument: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name PrepareConvert
     * @request POST:/api/nuxeo/registeredServer/document/prepare/convert
     */
    prepareConvert: (
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
     * @name CreateNewVersionWithoutAuth
     * @summary create New Version Without Auth
     * @request POST:/api/nuxeo/registeredServer/document/createNewVersion
     */
    createNewVersionWithoutAuth: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateNewVersionWithoutAuth1
     * @summary create New Version Without Auth
     * @request POST:/api/nuxeo/registeredServer/document/createNewVersion/
     */
    createNewVersionWithoutAuth1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateFolderWithAdminClient
     * @summary Create folder from registered server side
     * @request POST:/api/nuxeo/registeredServer/document/createFolder/
     */
    createFolderWithAdminClient: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateFolderWithAdminClient1
     * @summary Create folder from registered server side
     * @request POST:/api/nuxeo/registeredServer/document/createFolder
     */
    createFolderWithAdminClient1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateDocumentRequestFromRegisteredServer
     * @summary Create document without authentication request from registered server side
     * @request POST:/api/nuxeo/registeredServer/document/createDocument/
     */
    createDocumentRequestFromRegisteredServer: (
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
     * @name CreateDocumentRequestFromRegisteredServer1
     * @summary Create document without authentication request from registered server side
     * @request POST:/api/nuxeo/registeredServer/document/createDocument
     */
    createDocumentRequestFromRegisteredServer1: (
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
     * @name CreateDocumentStructure
     * @summary Create structure from registered server side
     * @request POST:/api/nuxeo/registeredServer/document/create/structure
     */
    createDocumentStructure: (data: DocStructureRequestDTO, params: RequestParams = {}) =>
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
     * @name CopyDocument
     * @request POST:/api/nuxeo/registeredServer/document/copy
     */
    copyDocument: (data: CopyDocumentDTO, params: RequestParams = {}) =>
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
     * @tags Public (Nuxeo)
     * @name GetFileRequestUploadTask
     * @request GET:/api/nuxeo/public/filerequest/
     */
    getFileRequestUploadTask: (
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
     * @name UploadFileRequestUploadFiles
     * @request POST:/api/nuxeo/public/filerequest/
     */
    uploadFileRequestUploadFiles: (
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
     * @name GetFileRequestUploadTask1
     * @request GET:/api/nuxeo/public/filerequest
     */
    getFileRequestUploadTask1: (
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
     * @name UploadFileRequestUploadFiles1
     * @request POST:/api/nuxeo/public/filerequest
     */
    uploadFileRequestUploadFiles1: (
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
     * @tags Data Import (Nuxeo)
     * @name ImportData
     * @request POST:/api/nuxeo/import
     */
    importData: (
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
     * @name ImportData1
     * @request POST:/api/nuxeo/import/
     */
    importData1: (
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

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name GetActiveUsers
     * @summary Find all active user list
     * @request POST:/api/nuxeo/identity/users
     */
    getActiveUsers: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/users`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name GetActiveUsers1
     * @summary Find all active user list
     * @request POST:/api/nuxeo/identity/users/
     */
    getActiveUsers1: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/users/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name CreateUser
     * @summary Create new User
     * @request POST:/api/nuxeo/identity/user
     */
    createUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateUser
     * @summary Update User
     * @request PATCH:/api/nuxeo/identity/user
     */
    updateUser: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateUser1
     * @summary Create new User
     * @request POST:/api/nuxeo/identity/user/
     */
    createUser1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteUser1
     * @summary Delete User
     * @request DELETE:/api/nuxeo/identity/user/
     */
    deleteUser1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateUser1
     * @summary Update User
     * @request PATCH:/api/nuxeo/identity/user/
     */
    updateUser1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name AddUserToGroup
     * @summary Add user to group
     * @request POST:/api/nuxeo/identity/membership
     */
    addUserToGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name RemoveUserFromGroup
     * @summary Remove user from group
     * @request DELETE:/api/nuxeo/identity/membership
     */
    removeUserFromGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name AddUserToGroup1
     * @summary Add user to group
     * @request POST:/api/nuxeo/identity/membership/
     */
    addUserToGroup1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name RemoveUserFromGroup1
     * @summary Remove user from group
     * @request DELETE:/api/nuxeo/identity/membership/
     */
    removeUserFromGroup1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name GetMemberGroup
     * @summary Get the groups of a member
     * @request POST:/api/nuxeo/identity/memberGroup/
     */
    getMemberGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name GetMemberGroup1
     * @summary Get the groups of a member
     * @request POST:/api/nuxeo/identity/memberGroup
     */
    getMemberGroup1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name GetMember
     * @summary Get the members of a group
     * @request POST:/api/nuxeo/identity/member
     */
    getMember: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name GetMember1
     * @summary Get the members of a group
     * @request POST:/api/nuxeo/identity/member/
     */
    getMember1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name GetGroups
     * @summary List groups
     * @request POST:/api/nuxeo/identity/groups
     */
    getGroups: (params: RequestParams = {}) =>
      this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/groups`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name GetGroups1
     * @summary List groups
     * @request POST:/api/nuxeo/identity/groups/
     */
    getGroups1: (params: RequestParams = {}) =>
      this.request<ResultListGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/groups/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name CreateGroup
     * @summary Create new group
     * @request POST:/api/nuxeo/identity/group
     */
    createGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateGroup
     * @summary Update group
     * @request PATCH:/api/nuxeo/identity/group
     */
    updateGroup: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateGroup1
     * @summary Create new group
     * @request POST:/api/nuxeo/identity/group/
     */
    createGroup1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteGroup1
     * @summary Delete group
     * @request DELETE:/api/nuxeo/identity/group/
     */
    deleteGroup1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateGroup1
     * @summary Update group
     * @request PATCH:/api/nuxeo/identity/group/
     */
    updateGroup1: (data: IdentityRequestDTO, params: RequestParams = {}) =>
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
     * @name GetKeyCloakAllUsers
     * @summary Find all active user list
     * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers
     */
    getKeyCloakAllUsers: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/getKeyCloakAllUsers`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name GetKeyCloakAllUsers1
     * @summary Find all active user list
     * @request POST:/api/nuxeo/identity/getKeyCloakAllUsers/
     */
    getKeyCloakAllUsers1: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/getKeyCloakAllUsers/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name GetCopyUsers
     * @request POST:/api/nuxeo/identity/copyUsers/
     */
    getCopyUsers: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/copyUsers/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name GetCopyUsers1
     * @request POST:/api/nuxeo/identity/copyUsers
     */
    getCopyUsers1: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/copyUsers`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Versioning Controller
     * @name GetVersions
     * @summary Get All Versions by Document ID or Path
     * @request POST:/api/nuxeo/getVersions/
     */
    getVersions: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name GetVersions1
     * @summary Get All Versions by Document ID or Path
     * @request POST:/api/nuxeo/getVersions
     */
    getVersions1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name GetVersionNum
     * @summary Get Version Number by Document ID or Path
     * @request POST:/api/nuxeo/getVersionNum
     */
    getVersionNum: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name GetVersionNum1
     * @summary Get Version Number by Document ID or Path
     * @request POST:/api/nuxeo/getVersionNum/
     */
    getVersionNum1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name GetSpecificVersion
     * @summary Get Specific Version by Document ID/Path and version number
     * @request POST:/api/nuxeo/getSpecificVersion
     */
    getSpecificVersion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name GetSpecificVersion1
     * @summary Get Specific Version by Document ID/Path and version number
     * @request POST:/api/nuxeo/getSpecificVersion/
     */
    getSpecificVersion1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
      this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
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
     * @name GetLatestVersion
     * @summary Get Latest Version by Document ID or Path
     * @request POST:/api/nuxeo/getLatestVersion
     */
    getLatestVersion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name GetLatestVersion1
     * @summary Get Latest Version by Document ID or Path
     * @request POST:/api/nuxeo/getLatestVersion/
     */
    getLatestVersion1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @tags File Request Upload (Nuxeo)
     * @name ApproveRequest
     * @request POST:/api/nuxeo/filerequest/approve
     */
    approveRequest: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name ApproveRequest1
     * @request POST:/api/nuxeo/filerequest/approve/
     */
    approveRequest1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAll
     * @request GET:/api/nuxeo/filerequest/
     */
    getAll: (
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
     * @name NewRequest
     * @request POST:/api/nuxeo/filerequest/
     */
    newRequest: (data: FileRequestUploadRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteRequest
     * @request DELETE:/api/nuxeo/filerequest/
     */
    deleteRequest: (
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
     * @name GetAll1
     * @request GET:/api/nuxeo/filerequest
     */
    getAll1: (
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
     * @name NewRequest1
     * @request POST:/api/nuxeo/filerequest
     */
    newRequest1: (data: FileRequestUploadRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteRequest1
     * @request DELETE:/api/nuxeo/filerequest
     */
    deleteRequest1: (
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

    /**
     * No description
     *
     * @tags FileUpload (Nuxeo)
     * @name IsAllowAccess
     * @summary check password is ok
     * @request POST:/api/nuxeo/fileUploadRequest/isAllowAccess
     */
    isAllowAccess: (data: FileUploadRequestDetailDTO, params: RequestParams = {}) =>
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
     * @name AddRequest
     * @summary addRequest
     * @request POST:/api/nuxeo/fileUploadRequest/addRequest
     */
    addRequest: (data: FileUploadRequestDTO, params: RequestParams = {}) =>
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
     * @name AddRequestDetail
     * @summary check password is ok
     * @request POST:/api/nuxeo/fileUploadRequest/addRequestDetail
     */
    addRequestDetail: (
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

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name UploadTempFolder
     * @summary uploadTempFolder
     * @request POST:/api/nuxeo/document/uploadTempFolder/
     */
    uploadTempFolder: (data: UploadTempFileRequestDTO, params: RequestParams = {}) =>
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
     * @name UploadTempFolder1
     * @summary uploadTempFolder
     * @request POST:/api/nuxeo/document/uploadTempFolder
     */
    uploadTempFolder1: (data: UploadTempFileRequestDTO, params: RequestParams = {}) =>
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
     * @name UploadTempFile
     * @summary uploadTempFile
     * @request POST:/api/nuxeo/document/uploadTempFile/
     */
    uploadTempFile: (
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
     * @name UploadTempFile1
     * @summary uploadTempFile
     * @request POST:/api/nuxeo/document/uploadTempFile
     */
    uploadTempFile1: (
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
     * @name UploadFiles
     * @summary Upload files
     * @request POST:/api/nuxeo/document/uploadFiles
     */
    uploadFiles: (
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
     * @name UploadFiles1
     * @summary Upload files
     * @request POST:/api/nuxeo/document/uploadFiles/
     */
    uploadFiles1: (
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
     * @name UploadAttachment
     * @request POST:/api/nuxeo/document/upload/attachment/
     */
    uploadAttachment: (
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
     * @name UploadAttachment1
     * @request POST:/api/nuxeo/document/upload/attachment
     */
    uploadAttachment1: (
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
     * @name QueryThumbnailFields
     * @request POST:/api/nuxeo/document/thumbnail/list
     */
    queryThumbnailFields: (data: string[], params: RequestParams = {}) =>
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
     * @name GetThumbnail
     * @summary Get document thumbnail
     * @request POST:/api/nuxeo/document/thumbnail
     */
    getThumbnail: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetThumbnail1
     * @summary Get document thumbnail
     * @request POST:/api/nuxeo/document/thumbnail/
     */
    getThumbnail1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Document Template
     * @name GenerateDocument1
     * @summary Generate document using template and specified variables
     * @request POST:/api/nuxeo/document/templates/generate/document
     */
    generateDocument1: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Document (Nuxeo)
     * @name QueryByAdminAccount
     * @summary Query document by admin account
     * @request POST:/api/nuxeo/document/super/query
     */
    queryByAdminAccount: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SubscribeDocument
     * @summary Subscribe to be notified
     * @request POST:/api/nuxeo/document/subscribe/
     */
    subscribeDocument: (
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
     * @name SubscribeDocument1
     * @summary Subscribe to be notified
     * @request POST:/api/nuxeo/document/subscribe
     */
    subscribeDocument1: (
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
     * @name GetSiblings
     * @summary Get siblings of a document
     * @request POST:/api/nuxeo/document/siblings/
     */
    getSiblings: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetSiblings1
     * @summary Get siblings of a document
     * @request POST:/api/nuxeo/document/siblings
     */
    getSiblings1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByType
     * @summary Search document by type
     * @request POST:/api/nuxeo/document/searchByType/
     */
    searchDocumentsByType: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByType1
     * @summary Search document by type
     * @request POST:/api/nuxeo/document/searchByType
     */
    searchDocumentsByType1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchByPropertiesForVirtualFolder
     * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder
     */
    searchByPropertiesForVirtualFolder: (data: DocumentRequestForVirtureFolderDTO, params: RequestParams = {}) =>
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
     * @name SearchByPropertiesForVirtualFolder1
     * @request POST:/api/nuxeo/document/searchByPropertiesForVirtualFolder/
     */
    searchByPropertiesForVirtualFolder1: (data: DocumentRequestForVirtureFolderDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByProperties
     * @summary Search document by document properties
     * @request POST:/api/nuxeo/document/searchByProperties/
     */
    searchDocumentsByProperties: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByProperties1
     * @summary Search document by document properties
     * @request POST:/api/nuxeo/document/searchByProperties
     */
    searchDocumentsByProperties1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByName
     * @summary Search document by name
     * @request POST:/api/nuxeo/document/searchByName/
     */
    searchDocumentsByName: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByName1
     * @summary Search document by name
     * @request POST:/api/nuxeo/document/searchByName
     */
    searchDocumentsByName1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByFileName
     * @summary Search document by uploaded filename
     * @request POST:/api/nuxeo/document/searchByFilename/
     */
    searchDocumentsByFileName: (data: FileRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByFileName1
     * @summary Search document by uploaded filename
     * @request POST:/api/nuxeo/document/searchByFilename
     */
    searchDocumentsByFileName1: (data: FileRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByFileContentType
     * @summary Search documents by mime type
     * @request POST:/api/nuxeo/document/searchByFileContentType
     */
    searchDocumentsByFileContentType: (data: FileRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocumentsByFileContentType1
     * @summary Search documents by mime type
     * @request POST:/api/nuxeo/document/searchByFileContentType/
     */
    searchDocumentsByFileContentType1: (data: FileRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchByCreator
     * @summary Search documents by creator
     * @request POST:/api/nuxeo/document/searchByCreator/
     */
    searchByCreator: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchByCreator1
     * @summary Search documents by creator
     * @request POST:/api/nuxeo/document/searchByCreator
     */
    searchByCreator1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name SearchDocuments
     * @summary Search documents
     * @request POST:/api/nuxeo/document/search
     */
    searchDocuments: (
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
     * @name SearchDocuments1
     * @summary Search documents
     * @request POST:/api/nuxeo/document/search/
     */
    searchDocuments1: (
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
     * @name SaveUploadFileOverview
     * @summary saveUploadFileOverview
     * @request POST:/api/nuxeo/document/saveUploadFileOverview/
     */
    saveUploadFileOverview: (data: SaveFileOverviewRequestDTO, params: RequestParams = {}) =>
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
     * @name SaveUploadFileOverview1
     * @summary saveUploadFileOverview
     * @request POST:/api/nuxeo/document/saveUploadFileOverview
     */
    saveUploadFileOverview1: (data: SaveFileOverviewRequestDTO, params: RequestParams = {}) =>
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
     * @name RestoreDocument
     * @summary Restore a document
     * @request POST:/api/nuxeo/document/restore
     */
    restoreDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name RestoreDocument1
     * @summary Restore a document
     * @request POST:/api/nuxeo/document/restore/
     */
    restoreDocument1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name QueryUploadFileDetailDtoList
     * @summary queryUploadFileDetailDTOList
     * @request POST:/api/nuxeo/document/queryUploadFileDetailDTOList/
     */
    queryUploadFileDetailDtoList: (
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
     * @name QueryUploadFileDetailDtoList1
     * @summary queryUploadFileDetailDTOList
     * @request POST:/api/nuxeo/document/queryUploadFileDetailDTOList
     */
    queryUploadFileDetailDtoList1: (
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
     * @name QueryUploadFileDtoPage
     * @summary queryUploadFileDTOPage
     * @request POST:/api/nuxeo/document/queryUploadFileDTOPage/
     */
    queryUploadFileDtoPage: (data: QueryFileOverviewRequestDTO, params: RequestParams = {}) =>
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
     * @name QueryUploadFileDtoPage1
     * @summary queryUploadFileDTOPage
     * @request POST:/api/nuxeo/document/queryUploadFileDTOPage
     */
    queryUploadFileDtoPage1: (data: QueryFileOverviewRequestDTO, params: RequestParams = {}) =>
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
     * @name QueryAuditEvent1
     * @request POST:/api/nuxeo/document/queryAuditEvent
     */
    queryAuditEvent1: (data: AuditTemplateDTO, params: RequestParams = {}) =>
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
     * @name GetPreview
     * @summary Get document preview
     * @request POST:/api/nuxeo/document/preview/
     */
    getPreview: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetPreview1
     * @summary Get document preview
     * @request POST:/api/nuxeo/document/preview
     */
    getPreview1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetParent
     * @summary Get parent document
     * @request POST:/api/nuxeo/document/parent/
     */
    getParent: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetParent1
     * @summary Get parent document
     * @request POST:/api/nuxeo/document/parent
     */
    getParent1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name Check
     * @request POST:/api/nuxeo/document/office/check
     */
    check: (data: OfficeRequestDTO, params: RequestParams = {}) =>
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
     * @name ListOcrResults
     * @summary List attachments of a document
     * @request POST:/api/nuxeo/document/ocr/list
     */
    listOcrResults: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name ListOcrResults1
     * @summary List attachments of a document
     * @request POST:/api/nuxeo/document/ocr/list/
     */
    listOcrResults1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name MoveDocument
     * @summary Move a document
     * @request POST:/api/nuxeo/document/move
     */
    moveDocument: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name MoveDocument1
     * @summary Move a document
     * @request POST:/api/nuxeo/document/move/
     */
    moveDocument1: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name IsDuplicateName
     * @summary Check is duplicate name
     * @request POST:/api/nuxeo/document/isDuplicateName
     */
    isDuplicateName: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
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
     * @name IsDuplicateName1
     * @summary Check is duplicate name
     * @request POST:/api/nuxeo/document/isDuplicateName/
     */
    isDuplicateName1: (data: DuplicateNameRequestDTO, params: RequestParams = {}) =>
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
     * @name AddToFavorites
     * @summary Add document to favorites
     * @request POST:/api/nuxeo/document/favorites/add/
     */
    addToFavorites: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name AddToFavorites1
     * @summary Add document to favorites
     * @request POST:/api/nuxeo/document/favorites/add
     */
    addToFavorites1: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name ExportDocuments
     * @summary Export documents
     * @request POST:/api/nuxeo/document/export
     */
    exportDocuments: (data: string[], params: RequestParams = {}) =>
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
     * @name ExportDocuments1
     * @summary Export documents
     * @request POST:/api/nuxeo/document/export/
     */
    exportDocuments1: (data: string[], params: RequestParams = {}) =>
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
     * @name DownloadDocument2
     * @request GET:/api/nuxeo/document/download
     */
    downloadDocument2: (
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
     * @name DownloadDocument
     * @summary Download a document file
     * @request POST:/api/nuxeo/document/download
     */
    downloadDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadDocument3
     * @request GET:/api/nuxeo/document/download/
     */
    downloadDocument3: (
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
     * @name DownloadDocument1
     * @summary Download a document file
     * @request POST:/api/nuxeo/document/download/
     */
    downloadDocument1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadPictureViewsFile
     * @request POST:/api/nuxeo/document/dam/download
     */
    downloadPictureViewsFile: (data: DownloadFileRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateFolders
     * @summary Create folders
     * @request POST:/api/nuxeo/document/createFolders/
     */
    createFolders: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateFolders1
     * @summary Create folders
     * @request POST:/api/nuxeo/document/createFolders
     */
    createFolders1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateDocument
     * @summary Create a document
     * @request POST:/api/nuxeo/document/createDocument/
     */
    createDocument: (
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
     * @name CreateDocument1
     * @summary Create a document
     * @request POST:/api/nuxeo/document/createDocument
     */
    createDocument1: (
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
     * @name CreateDocumentStructure1
     * @request POST:/api/nuxeo/document/create/structure
     */
    createDocumentStructure1: (data: DocStructureRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateFolder
     * @request POST:/api/nuxeo/document/create/folder
     */
    createFolder: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateWithFile
     * @request POST:/api/nuxeo/document/create
     */
    createWithFile: (
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
     * @name CreateWithFile1
     * @request POST:/api/nuxeo/document/create/
     */
    createWithFile1: (
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
     * @name CopyDocument1
     * @summary Copy a document
     * @request POST:/api/nuxeo/document/copy/
     */
    copyDocument1: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name CopyDocument2
     * @summary Copy a document
     * @request POST:/api/nuxeo/document/copy
     */
    copyDocument2: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name ConvertToTxt
     * @summary Upload files
     * @request POST:/api/nuxeo/document/convertToTxt/
     */
    convertToTxt: (
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
     * @name ConvertToTxt1
     * @summary Upload files
     * @request POST:/api/nuxeo/document/convertToTxt
     */
    convertToTxt1: (
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
     * @name GetCollections
     * @summary Get collections of a document is in
     * @request POST:/api/nuxeo/document/collections
     */
    getCollections: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetCollections1
     * @summary Get collections of a document is in
     * @request POST:/api/nuxeo/document/collections/
     */
    getCollections1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetThumbnailChildrenV2
     * @request POST:/api/nuxeo/document/children/thumbnail_v2
     */
    getThumbnailChildrenV2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetThumbnailChildrenV21
     * @request POST:/api/nuxeo/document/children/thumbnail_v2/
     */
    getThumbnailChildrenV21: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetThumbnailChildren
     * @summary Get children of thumbnail Result
     * @request POST:/api/nuxeo/document/children/thumbnail
     */
    getThumbnailChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetChildrenByPage
     * @summary Pagination to query children of documents
     * @request POST:/api/nuxeo/document/children/page
     */
    getChildrenByPage: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetChildren
     * @summary Get children of a document
     * @request POST:/api/nuxeo/document/children/
     */
    getChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetChildren1
     * @summary Get children of a document
     * @request POST:/api/nuxeo/document/children
     */
    getChildren1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name CheckFileExist
     * @summary check file exist situation in nuxeo
     * @request POST:/api/nuxeo/document/checkFileExist
     */
    checkFileExist: (data: FileCheckRequestDTO, params: RequestParams = {}) =>
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
     * @name CheckFileExist1
     * @summary check file exist situation in nuxeo
     * @request POST:/api/nuxeo/document/checkFileExist/
     */
    checkFileExist1: (data: FileCheckRequestDTO, params: RequestParams = {}) =>
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
     * @name GetBreadcrumb
     * @summary Get document breadcrumb
     * @request POST:/api/nuxeo/document/breadcrumb
     */
    getBreadcrumb: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetBreadcrumb1
     * @summary Get document breadcrumb
     * @request POST:/api/nuxeo/document/breadcrumb/
     */
    getBreadcrumb1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name BatchConfirm
     * @summary batchConfirm
     * @request POST:/api/nuxeo/document/batchConfirm
     */
    batchConfirm: (data: FileConfirmRequestDTO, params: RequestParams = {}) =>
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
     * @name BatchConfirm1
     * @summary batchConfirm
     * @request POST:/api/nuxeo/document/batchConfirm/
     */
    batchConfirm1: (data: FileConfirmRequestDTO, params: RequestParams = {}) =>
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
     * @name BatchCancel
     * @summary batchCancel
     * @request POST:/api/nuxeo/document/batchCancel/
     */
    batchCancel: (
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
     * @name BatchCancel1
     * @summary batchCancel
     * @request POST:/api/nuxeo/document/batchCancel
     */
    batchCancel1: (
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
     * @name GetAuditLogs
     * @summary Get audit trial of a document
     * @request POST:/api/nuxeo/document/audit/
     */
    getAuditLogs: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAuditLogs1
     * @summary Get audit trial of a document
     * @request POST:/api/nuxeo/document/audit
     */
    getAuditLogs1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateHocrAttachment
     * @request POST:/api/nuxeo/document/attachment/update/
     */
    updateHocrAttachment: (
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
     * @name UpdateHocrAttachment1
     * @request POST:/api/nuxeo/document/attachment/update
     */
    updateHocrAttachment1: (
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
     * @name DownloadPdfAttachment
     * @request POST:/api/nuxeo/document/attachment/pdf/download/
     */
    downloadPdfAttachment: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadPdfAttachment1
     * @request POST:/api/nuxeo/document/attachment/pdf/download
     */
    downloadPdfAttachment1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadOcrResultAttachment
     * @summary Download a document file
     * @request POST:/api/nuxeo/document/attachment/ocrresult/download
     */
    downloadOcrResultAttachment: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadOcrResultAttachment1
     * @summary Download a document file
     * @request POST:/api/nuxeo/document/attachment/ocrresult/download/
     */
    downloadOcrResultAttachment1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name ListAttachments
     * @summary List attachments of a document
     * @request POST:/api/nuxeo/document/attachment/list/
     */
    listAttachments: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name ListAttachments1
     * @summary List attachments of a document
     * @request POST:/api/nuxeo/document/attachment/list
     */
    listAttachments1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadJpegAttachment
     * @request POST:/api/nuxeo/document/attachment/jpeg/download/
     */
    downloadJpegAttachment: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadJpegAttachment1
     * @request POST:/api/nuxeo/document/attachment/jpeg/download
     */
    downloadJpegAttachment1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadOcrAttachment
     * @request POST:/api/nuxeo/document/attachment/hocr/download/
     */
    downloadOcrAttachment: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadOcrAttachment1
     * @request POST:/api/nuxeo/document/attachment/hocr/download
     */
    downloadOcrAttachment1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadAttachment4
     * @summary Download attachment of a document
     * @request POST:/api/nuxeo/document/attachment/download/
     */
    downloadAttachment4: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadAttachment5
     * @summary Download attachment of a document
     * @request POST:/api/nuxeo/document/attachment/download
     */
    downloadAttachment5: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name AddFacets
     * @request POST:/api/nuxeo/document/add/facets
     */
    addFacets: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAccessControlList4
     * @summary Get access control list of a document
     * @request GET:/api/nuxeo/document/acls/
     */
    getAccessControlList4: (
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
     * @name GetAccessControlList
     * @summary Get access control list of a document
     * @request POST:/api/nuxeo/document/acls/
     */
    getAccessControlList: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAccessControlList5
     * @summary Get access control list of a document
     * @request GET:/api/nuxeo/document/acls
     */
    getAccessControlList5: (
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
     * @name GetAccessControlList1
     * @summary Get access control list of a document
     * @request POST:/api/nuxeo/document/acls
     */
    getAccessControlList1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAccessControlList6
     * @summary Get access control list of a document
     * @request GET:/api/nuxeo/document/acl/
     */
    getAccessControlList6: (
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
     * @name GetAccessControlList2
     * @summary Get access control list of a document
     * @request POST:/api/nuxeo/document/acl/
     */
    getAccessControlList2: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAccessControlList7
     * @summary Get access control list of a document
     * @request GET:/api/nuxeo/document/acl
     */
    getAccessControlList7: (
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
     * @name GetAccessControlList3
     * @summary Get access control list of a document
     * @request POST:/api/nuxeo/document/acl
     */
    getAccessControlList3: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name AddInvitation
     * @summary Allow external user to access the document
     * @request POST:/api/nuxeo/document/acl/invite/
     */
    addInvitation: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
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
     * @name AddInvitation1
     * @summary Allow external user to access the document
     * @request POST:/api/nuxeo/document/acl/invite
     */
    addInvitation1: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
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
     * @name AddPermission
     * @summary Add local permission to document
     * @request POST:/api/nuxeo/document/acl/add
     */
    addPermission: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
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
     * @name AddPermission1
     * @summary Add local permission to document
     * @request POST:/api/nuxeo/document/acl/add/
     */
    addPermission1: (data: AccessControlRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDocument2
     * @request GET:/api/nuxeo/document
     */
    getDocument2: (
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
     * @name GetDocument
     * @summary Get a document
     * @request POST:/api/nuxeo/document
     */
    getDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateDocument
     * @summary Update a document
     * @request PATCH:/api/nuxeo/document
     */
    updateDocument: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDocument3
     * @request GET:/api/nuxeo/document/
     */
    getDocument3: (
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
     * @name GetDocument1
     * @summary Get a document
     * @request POST:/api/nuxeo/document/
     */
    getDocument1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteDocument1
     * @summary Delete a document
     * @request DELETE:/api/nuxeo/document/
     */
    deleteDocument1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateDocument1
     * @summary Update a document
     * @request PATCH:/api/nuxeo/document/
     */
    updateDocument1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Versioning Controller
     * @name CreateVersion
     * @summary Create Version by Document ID/Path and increment policy
     * @request POST:/api/nuxeo/createVersion/
     */
    createVersion: (data: VersioningRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateVersion1
     * @summary Create Version by Document ID/Path and increment policy
     * @request POST:/api/nuxeo/createVersion
     */
    createVersion1: (data: VersioningRequestDTO, params: RequestParams = {}) =>
      this.request<ResultDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/createVersion`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversion (Nuxeo)
     * @name SubmitTemplate
     * @summary submit Template Request
     * @request POST:/api/nuxeo/conversion/submitTemplate
     */
    submitTemplate: (
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
     * @name SubmitExportRequest
     * @summary Submit Export Request
     * @request POST:/api/nuxeo/conversion/submitExportRequest
     */
    submitExportRequest: (data: ConversionFileRequestDTO[], params: RequestParams = {}) =>
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
     * @name SubmitExportRequest1
     * @summary Submit Export Request
     * @request POST:/api/nuxeo/conversion/format/submit
     */
    submitExportRequest1: (data: ConversionFileRequestDTO[], params: RequestParams = {}) =>
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
     * @name GetTemplateList
     * @summary Template List
     * @request POST:/api/nuxeo/conversion/getTemplateList
     */
    getTemplateList: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/conversion/getTemplateList`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversion (Nuxeo)
     * @name Download
     * @summary Download Files
     * @request POST:/api/nuxeo/conversion/download
     */
    download: (data: string[], params: RequestParams = {}) =>
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
     * @name DownloadFile
     * @summary Download Files
     * @request POST:/api/nuxeo/conversion/downloadFile
     */
    downloadFile: (data: string[], params: RequestParams = {}) =>
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
     * @tags Comment (Nuxeo)
     * @name AddComment
     * @summary Create a new document comment
     * @request POST:/api/nuxeo/comments/add
     */
    addComment: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @name AddComment1
     * @summary Create a new document comment
     * @request POST:/api/nuxeo/comments/add/
     */
    addComment1: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetComments
     * @summary Get document comments
     * @request POST:/api/nuxeo/comments
     */
    getComments: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @name GetComments1
     * @summary Get document comments
     * @request POST:/api/nuxeo/comments/
     */
    getComments1: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Collection (Nuxeo)
     * @name GetDocuments
     * @summary Get documents in a collection
     * @request POST:/api/nuxeo/collection/documents/
     */
    getDocuments: (data: CollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDocuments1
     * @summary Get documents in a collection
     * @request POST:/api/nuxeo/collection/documents
     */
    getDocuments1: (data: CollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name Create8
     * @summary Create a collection in user workspace
     * @request POST:/api/nuxeo/collection/create
     */
    create8: (data: CollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name Create9
     * @summary Create a collection in user workspace
     * @request POST:/api/nuxeo/collection/create/
     */
    create9: (data: CollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAllDocumentThumbnailDtOs
     * @request POST:/api/nuxeo/collection/allDocuments/
     */
    getAllDocumentThumbnailDtOs: (data: CollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name GetAllDocumentThumbnailDtOs1
     * @request POST:/api/nuxeo/collection/allDocuments
     */
    getAllDocumentThumbnailDtOs1: (data: CollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name Add
     * @summary Add documents to collection
     * @request POST:/api/nuxeo/collection/add/
     */
    add: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name Add1
     * @summary Add documents to collection
     * @request POST:/api/nuxeo/collection/add
     */
    add1: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
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
     * @tags Annotation (Nuxeo)
     * @name Get11
     * @summary Retrieve annotations from a document
     * @request GET:/api/nuxeo/annotation
     */
    get11: (
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
     * @name Save
     * @summary Save annotations as document attachment
     * @request POST:/api/nuxeo/annotation
     */
    save: (data: AnnotationRequestDTO[], params: RequestParams = {}) =>
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
     * @name Get12
     * @summary Retrieve annotations from a document
     * @request GET:/api/nuxeo/annotation/
     */
    get12: (
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
     * @name Save1
     * @summary Save annotations as document attachment
     * @request POST:/api/nuxeo/annotation/
     */
    save1: (data: AnnotationRequestDTO[], params: RequestParams = {}) =>
      this.request<ResultListAnnotationDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/annotation/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageQueue
     * @name ReInvoke
     * @summary ReInvoke business
     * @request POST:/api/message/queue/{messageId}/reinvoke
     */
    reInvoke: (messageId: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/message/queue/${messageId}/reinvoke`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageQueue
     * @name Page1
     * @summary The Page of BusinessResultRecord
     * @request POST:/api/message/queue/page
     */
    page1: (
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
     * @tags Workflow File
     * @name UploadFiles2
     * @summary Upload multiple files in the nuxeo repository
     * @request POST:/api/docpal/workflow/upload/files
     */
    uploadFiles2: (
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
     * @name UploadFile
     * @summary Upload single file in the nuxeo repository
     * @request POST:/api/docpal/workflow/upload/file
     */
    uploadFile: (
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

    /**
     * No description
     *
     * @tags Workflow
     * @name UpdateMetadataMapping
     * @request POST:/api/docpal/workflow/updateMetadataMapping
     */
    updateMetadataMapping: (data: DocumentTypeMetadataMapping, params: RequestParams = {}) =>
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
     * @name GetUserTasks
     * @summary Retrieve tasks for the candidate users
     * @request POST:/api/docpal/workflow/tasks/user
     */
    getUserTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetUserTasks1
     * @summary Retrieve tasks for the candidate users
     * @request POST:/api/docpal/workflow/tasks/user/
     */
    getUserTasks1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetUnsignedTasks
     * @summary Retrieve unassigned tasks
     * @request POST:/api/docpal/workflow/tasks/unassigned
     */
    getUnsignedTasks: (params: RequestParams = {}) =>
      this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/tasks/unassigned`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetUnsignedTasks1
     * @summary Retrieve unassigned tasks
     * @request POST:/api/docpal/workflow/tasks/unassigned/
     */
    getUnsignedTasks1: (params: RequestParams = {}) =>
      this.request<ResultListTaskDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/tasks/unassigned/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetPersonalTasks
     * @summary Retrieve tasks for a user
     * @request POST:/api/docpal/workflow/tasks/personal
     */
    getPersonalTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetPersonalTasks1
     * @summary Retrieve tasks for a user
     * @request POST:/api/docpal/workflow/tasks/personal/
     */
    getPersonalTasks1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetGroupTasks
     * @summary Retrieve tasks for the candidate group
     * @request POST:/api/docpal/workflow/tasks/group/
     */
    getGroupTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetGroupTasks1
     * @summary Retrieve tasks for the candidate group
     * @request POST:/api/docpal/workflow/tasks/group
     */
    getGroupTasks1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name ExportTasksUser
     * @request POST:/api/docpal/workflow/tasks/exportTasksUser
     */
    exportTasksUser: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name ExportTasksUser1
     * @request POST:/api/docpal/workflow/tasks/exportTasksUser/
     */
    exportTasksUser1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTasks2
     * @request GET:/api/docpal/workflow/tasks/
     */
    getTasks2: (
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
     * @name GetTasks
     * @summary Retrieve tasks for a process instance
     * @request POST:/api/docpal/workflow/tasks/
     */
    getTasks: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTasks3
     * @request GET:/api/docpal/workflow/tasks
     */
    getTasks3: (
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
     * @name GetTasks1
     * @summary Retrieve tasks for a process instance
     * @request POST:/api/docpal/workflow/tasks
     */
    getTasks1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name UnclaimTask
     * @summary Unclaim a task
     * @request POST:/api/docpal/workflow/task/unclaim/
     */
    unclaimTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name UnclaimTask1
     * @summary Unclaim a task
     * @request POST:/api/docpal/workflow/task/unclaim
     */
    unclaimTask1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name SetDueDate
     * @summary Set task due date
     * @request POST:/api/docpal/workflow/task/dueDate
     */
    setDueDate: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name SetDueDate1
     * @summary Set task due date
     * @request POST:/api/docpal/workflow/task/dueDate/
     */
    setDueDate1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name DelegateTask
     * @request POST:/api/docpal/workflow/task/delegate
     */
    delegateTask: (
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
     * @name DelegateTask1
     * @request POST:/api/docpal/workflow/task/delegate/
     */
    delegateTask1: (
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
     * @name CompleteTask
     * @summary Complete a task
     * @request POST:/api/docpal/workflow/task/complete
     */
    completeTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name CompleteTask1
     * @summary Complete a task
     * @request POST:/api/docpal/workflow/task/complete/
     */
    completeTask1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name ClaimTask
     * @summary Claim a task
     * @request POST:/api/docpal/workflow/task/claim
     */
    claimTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name ClaimTask1
     * @summary Claim a task
     * @request POST:/api/docpal/workflow/task/claim/
     */
    claimTask1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name AssignTask
     * @summary Assign task to a user
     * @request POST:/api/docpal/workflow/task/assign
     */
    assignTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name AssignTask1
     * @summary Assign task to a user
     * @request POST:/api/docpal/workflow/task/assign/
     */
    assignTask1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTask2
     * @request GET:/api/docpal/workflow/task/
     */
    getTask2: (
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
     * @name GetTask
     * @summary Retrieve a task
     * @request POST:/api/docpal/workflow/task/
     */
    getTask: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteTask
     * @summary Delete a task
     * @request DELETE:/api/docpal/workflow/task/
     */
    deleteTask: (
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
     * @name GetTask3
     * @request GET:/api/docpal/workflow/task
     */
    getTask3: (
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
     * @name GetTask1
     * @summary Retrieve a task
     * @request POST:/api/docpal/workflow/task
     */
    getTask1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteTask1
     * @summary Delete a task
     * @request DELETE:/api/docpal/workflow/task
     */
    deleteTask1: (
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
     * @name SubmitAdhocApproval
     * @request POST:/api/docpal/workflow/submitAdhocApproval
     */
    submitAdhocApproval: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name SaveMetadataMapping
     * @request POST:/api/docpal/workflow/saveMetadataMapping
     */
    saveMetadataMapping: (data: DocPalDocumentTypeMapping, params: RequestParams = {}) =>
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
     * @name SaveDocumentTypeProfile
     * @request POST:/api/docpal/workflow/saveDocumentTypeProfile
     */
    saveDocumentTypeProfile: (data: DocumentTypeProfileSettingRequest, params: RequestParams = {}) =>
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
     * @name QueryAdhocApprovalPage
     * @request POST:/api/docpal/workflow/queryAdhocApprovalPage
     */
    queryAdhocApprovalPage: (data: AdhocApprovalDTO, params: RequestParams = {}) =>
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
     * @name SaveFormProperties
     * @summary Save task form properties
     * @request POST:/api/docpal/workflow/properties/save
     */
    saveFormProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name SaveFormProperties1
     * @summary Save task form properties
     * @request POST:/api/docpal/workflow/properties/save/
     */
    saveFormProperties1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetFormProperties
     * @summary Retrieve task form properties
     * @request POST:/api/docpal/workflow/properties/
     */
    getFormProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetFormProperties1
     * @summary Retrieve task form properties
     * @request POST:/api/docpal/workflow/properties
     */
    getFormProperties1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name TriggerByProcessInstanceId
     * @request POST:/api/docpal/workflow/process/triggerByProcessInstanceId
     */
    triggerByProcessInstanceId: (
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
     * @name StartProcess
     * @summary Start a process
     * @request POST:/api/docpal/workflow/process/start/
     */
    startProcess: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
      this.request<ResultInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/process/start/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name StartProcess1
     * @summary Start a process
     * @request POST:/api/docpal/workflow/process/start
     */
    startProcess1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
      this.request<ResultInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/process/start`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name DownloadBpmnModel
     * @summary Retrieve process model (BPMN) XML
     * @request POST:/api/docpal/workflow/process/model
     */
    downloadBpmnModel: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name DownloadBpmnModel1
     * @summary Retrieve process model (BPMN) XML
     * @request POST:/api/docpal/workflow/process/model/
     */
    downloadBpmnModel1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name StartByMessage
     * @request POST:/api/docpal/workflow/process/message
     */
    startByMessage: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessDefinitions
     * @summary Retrieve process definition
     * @request POST:/api/docpal/workflow/process/list/
     */
    getProcessDefinitions: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessDefinitions1
     * @summary Retrieve process definition
     * @request POST:/api/docpal/workflow/process/list
     */
    getProcessDefinitions1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessInstances
     * @summary Retrieve process instance
     * @request POST:/api/docpal/workflow/process/instance/
     */
    getProcessInstances: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessInstances1
     * @summary Retrieve process instance
     * @request POST:/api/docpal/workflow/process/instance
     */
    getProcessInstances1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteProcessInstanceByUserId
     * @request DELETE:/api/docpal/workflow/process/instance
     */
    deleteProcessInstanceByUserId: (
      query: {
        processInstanceId: string;
        userId: string;
        deleteReason?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/process/instance`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetProcessDefinitionDiagram
     * @summary Retrieve process definition diagram
     * @request POST:/api/docpal/workflow/process/diagram
     */
    getProcessDefinitionDiagram: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessDefinitionDiagram1
     * @summary Retrieve process definition diagram
     * @request POST:/api/docpal/workflow/process/diagram/
     */
    getProcessDefinitionDiagram1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetCombineProcessDefinitions
     * @request POST:/api/docpal/workflow/process/combine/list
     */
    getCombineProcessDefinitions: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetBpmnModel
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/process/bpmn/
     */
    getBpmnModel: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetBpmnModel1
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/process/bpmn
     */
    getBpmnModel1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name AddFileForBulkUpload
     * @request POST:/api/docpal/workflow/process/addFileForBulkUpload
     */
    addFileForBulkUpload: (
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
     * @name GetActiveProcess
     * @request POST:/api/docpal/workflow/process/active
     */
    getActiveProcess: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetActiveProcess1
     * @request POST:/api/docpal/workflow/process/active/
     */
    getActiveProcess1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessDefinition
     * @summary Retrieve process definition
     * @request POST:/api/docpal/workflow/process
     */
    getProcessDefinition: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessDefinition1
     * @summary Retrieve process definition
     * @request POST:/api/docpal/workflow/process/
     */
    getProcessDefinition1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteProcess1
     * @request DELETE:/api/docpal/workflow/process/
     */
    deleteProcess1: (
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
     * @name GetVariableHistory
     * @summary Retrieve task variable history
     * @request POST:/api/docpal/workflow/history/variable/
     */
    getVariableHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetVariableHistory1
     * @summary Retrieve task variable history
     * @request POST:/api/docpal/workflow/history/variable
     */
    getVariableHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTaskLogHistory
     * @summary Retrieve task log history
     * @request POST:/api/docpal/workflow/history/taskLog
     */
    getTaskLogHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTaskLogHistory1
     * @summary Retrieve task log history
     * @request POST:/api/docpal/workflow/history/taskLog/
     */
    getTaskLogHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTaskHistory
     * @summary Retrieve task history
     * @request POST:/api/docpal/workflow/history/task
     */
    getTaskHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetTaskHistory1
     * @summary Retrieve task history
     * @request POST:/api/docpal/workflow/history/task/
     */
    getTaskHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetProcessWithoutVariables
     * @request POST:/api/docpal/workflow/history/process_without_variables/
     */
    getProcessWithoutVariables: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
      this.request<ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
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
     * @name GetProcessWithoutVariables1
     * @request POST:/api/docpal/workflow/history/process_without_variables
     */
    getProcessWithoutVariables1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
      this.request<ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
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
     * @name GetProcessHistory
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/history/process/
     */
    getProcessHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
      this.request<ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
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
     * @name GetProcessHistory1
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/history/process
     */
    getProcessHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
      this.request<ResultPaginableEntityDTOHistoricProcessInstanceEntityImpl, ResultString | (ResultString | Result)>({
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
     * @name GetUsersExportHeader
     * @request POST:/api/docpal/workflow/tasks/getUsersExportHeader
     */
    getUsersExportHeader: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetUsersExportHeader1
     * @request POST:/api/docpal/workflow/history/getTasksUserExportHeader/
     */
    getUsersExportHeader1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name ExportProcessHistory
     * @request POST:/api/docpal/workflow/history/exportProcessHistory/
     */
    exportProcessHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name ExportProcessHistory1
     * @request POST:/api/docpal/workflow/history/exportProcessHistory
     */
    exportProcessHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDetailHistoryProperties
     * @request POST:/api/docpal/workflow/history/detailProperties
     */
    getDetailHistoryProperties: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDetailHistoryProperties1
     * @request POST:/api/docpal/workflow/history/detailProperties/
     */
    getDetailHistoryProperties1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDetailHistory
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/history/detail
     */
    getDetailHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetDetailHistory1
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/history/detail/
     */
    getDetailHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetActivityHistory
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/history/activity
     */
    getActivityHistory: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name GetActivityHistory1
     * @summary Retrieve process definition model
     * @request POST:/api/docpal/workflow/history/activity/
     */
    getActivityHistory1: (data: WorkflowHistoryRequestDTO, params: RequestParams = {}) =>
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
     * @name SubmitForm
     * @summary Submit a task form
     * @request POST:/api/docpal/workflow/form/submit/
     */
    submitForm: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
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
     * @name SubmitForm1
     * @summary Submit a task form
     * @request POST:/api/docpal/workflow/form/submit
     */
    submitForm1: (data: WorkflowRequestDTO, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
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
     * @name UploadFiles3
     * @summary Upload files
     * @request POST:/api/docpal/workflow/files/upload/
     */
    uploadFiles3: (
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
     * @name UploadFiles4
     * @summary Upload files
     * @request POST:/api/docpal/workflow/files/upload
     */
    uploadFiles4: (
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
     * @name DeleteMetadataMapping
     * @request POST:/api/docpal/workflow/deleteMetadataMapping
     */
    deleteMetadataMapping: (
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
     * @name DeleteDocumentTypeProfile
     * @request POST:/api/docpal/workflow/deleteDocumentTypeProfile
     */
    deleteDocumentTypeProfile: (
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
     * @name SubmitFormData
     * @request POST:/api/docpal/workflow/data/submit/
     */
    submitFormData: (
      data: {
        workflow: string;
        files: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Result, ResultString | (ResultString | Result)>({
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
     * @name SubmitFormData1
     * @request POST:/api/docpal/workflow/data/submit
     */
    submitFormData1: (
      data: {
        workflow: string;
        files: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Result, ResultString | (ResultString | Result)>({
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
     * @name SaveFormData
     * @request POST:/api/docpal/workflow/data/save
     */
    saveFormData: (
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
     * @name SaveFormData1
     * @request POST:/api/docpal/workflow/data/save/
     */
    saveFormData1: (
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
     * @name GetTaskComments
     * @summary Get task comments
     * @request GET:/api/docpal/workflow/comment/task
     */
    getTaskComments: (
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
     * @name AddTaskComment
     * @summary Add task comment
     * @request POST:/api/docpal/workflow/comment/task
     */
    addTaskComment: (
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
     * @name AddTaskComment1
     * @summary Add task comment
     * @request POST:/api/docpal/workflow/comment/task/
     */
    addTaskComment1: (
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
     * @name GetProcessComments
     * @summary Get process comments
     * @request GET:/api/docpal/workflow/comment/process
     */
    getProcessComments: (
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
     * @name AddProcessComment
     * @summary Add process comment
     * @request POST:/api/docpal/workflow/comment/process
     */
    addProcessComment: (
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
     * @name AddProcessComment1
     * @summary Add process comment
     * @request POST:/api/docpal/workflow/comment/process/
     */
    addProcessComment1: (
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
     * @name CheckNameOrTitle
     * @request POST:/api/docpal/workflow/checkNameOrTitle
     */
    checkNameOrTitle: (data: string, params: RequestParams = {}) =>
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
     * @name AddCommentByTaskId
     * @summary Add process instance By taskId
     * @request POST:/api/docpal/workflow/addCommentByTaskId
     */
    addCommentByTaskId: (
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
     * @tags Watermark Template
     * @name Page2
     * @summary Watermark template Page
     * @request POST:/api/docpal/watermark/templates/page/
     */
    page2: (
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
        path: `/api/docpal/watermark/templates/page/`,
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
     * @name Page3
     * @summary Watermark template Page
     * @request POST:/api/docpal/watermark/templates/page
     */
    page3: (
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
     * @tags Watermark Settings
     * @name AddDocumentTemplateWatermark
     * @summary Generate a watermark file with a certain watermark template
     * @request POST:/api/docpal/watermark/document/template
     */
    addDocumentTemplateWatermark: (
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
     * @name AddDocumentTemplateWatermark1
     * @summary Generate a watermark file with a certain watermark template
     * @request POST:/api/docpal/watermark/document/multiple/template/
     */
    addDocumentTemplateWatermark1: (
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
     * @tags DocPalTypeController
     * @name VerifyMetadata
     * @request POST:/api/docpal/types/name/{name}/verify
     */
    verifyMetadata: (name: string, data: Record<string, string>, params: RequestParams = {}) =>
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
     * @name FindMetadata
     * @summary Query all metadata list of the docpal type through name
     * @request POST:/api/docpal/types/metadatas
     */
    findMetadata: (data: DocPalType, params: RequestParams = {}) =>
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
     * @tags Template
     * @name SendTestEmail
     * @request POST:/api/docpal/template/email/send/
     */
    sendTestEmail: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name SendTestEmail1
     * @request POST:/api/docpal/template/email/send
     */
    sendTestEmail1: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name ProcessEmail
     * @request POST:/api/docpal/template/email/
     */
    processEmail: (data: TemplateRequestDTO, params: RequestParams = {}) =>
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
     * @name ProcessEmail1
     * @request POST:/api/docpal/template/email
     */
    processEmail1: (data: TemplateRequestDTO, params: RequestParams = {}) =>
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
     * @name ProcessDocument
     * @request POST:/api/docpal/template/document
     */
    processDocument: (
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
     * @name ProcessDocument1
     * @request POST:/api/docpal/template/document/
     */
    processDocument1: (
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

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name InitEntity
     * @request POST:/api/docpal/systemfeature/initEntity/
     */
    initEntity: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/initEntity/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name InitEntity1
     * @request POST:/api/docpal/systemfeature/initEntity
     */
    initEntity1: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/initEntity`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name AddFunctionById
     * @request POST:/api/docpal/systemfeature/addFunctionById/
     */
    addFunctionById: (data: SystemFeatureRequestDTO, params: RequestParams = {}) =>
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
     * @name AddFunctionById1
     * @request POST:/api/docpal/systemfeature/addFunctionById
     */
    addFunctionById1: (data: SystemFeatureRequestDTO, params: RequestParams = {}) =>
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
     * @tags form-properties-relation-controller
     * @name UpdateLanguage
     * @request POST:/api/docpal/relation/updateLanguage
     */
    updateLanguage: (data: LanguageEntity, params: RequestParams = {}) =>
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
     * @name Save2
     * @request POST:/api/docpal/relation/save
     */
    save2: (data: FormPropertiesRelation, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
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
     * @name DeleteLanguage
     * @request POST:/api/docpal/relation/deleteLanguage
     */
    deleteLanguage: (
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
     * @name AddLanguage
     * @request POST:/api/docpal/relation/addLanguage
     */
    addLanguage: (data: LanguageEntity, params: RequestParams = {}) =>
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
     * @tags RetentionPolicyController
     * @name SubmitEvent
     * @summary Submit events through policy document id
     * @request POST:/api/docpal/policy/retentions/submitEvent
     */
    submitEvent: (data: RetentionPolicyDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name Page4
     * @summary Pagination search
     * @request POST:/api/docpal/policy/retentions/document/page
     */
    page4: (data: RetentionPolicyDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags PolicyDocumentController
     * @name Remove
     * @summary Remove hold policy who bind document
     * @request POST:/api/docpal/policy/documents/remove
     */
    remove: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name Page5
     * @summary Pagination search
     * @request POST:/api/docpal/policy/documents/page
     */
    page5: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name Add2
     * @summary Add a hold policy to bind document
     * @request POST:/api/docpal/policy/documents/add
     */
    add2: (data: PolicyDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags NotificationRecordController
     * @name Create10
     * @summary Create notification record
     * @request POST:/api/docpal/notification
     */
    create10: (data: NotificationRecord, params: RequestParams = {}) =>
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
     * @name Delete11
     * @summary Batch delete notification record
     * @request DELETE:/api/docpal/notification
     */
    delete11: (data: NotificationRecordDTO, params: RequestParams = {}) =>
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
     * @tags NotificationSubscriberController
     * @name Create11
     * @summary Create notification subscriber
     * @request POST:/api/docpal/notification/subscriber
     */
    create11: (data: NotificationSubscriberRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateWithCurrentUser
     * @summary Create notification subscriber
     * @request POST:/api/docpal/notification/subscriber/document
     */
    createWithCurrentUser: (data: NotificationSubscriber, params: RequestParams = {}) =>
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
     * @tags NotificationSettingController
     * @name Create12
     * @summary Create notification setting
     * @request POST:/api/docpal/notification/setting
     */
    create12: (data: NotificationSetting, params: RequestParams = {}) =>
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
     * @name FindByModuleName
     * @summary Query list of some one module
     * @request POST:/api/docpal/notification/setting/type/{type}/module/{moduleName}
     */
    findByModuleName: (type: "SUB_DOCUMENT" | "SUBSCRIPTION", moduleName: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/setting/type/${type}/module/${moduleName}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationRecordController
     * @name ReadAll
     * @summary Read all notification record of current login user
     * @request POST:/api/docpal/notification/read/all
     */
    readAll: (params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/read/all`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationRecordController
     * @name QueryNotificationInfoDtoList1
     * @request POST:/api/docpal/notification/query_notification_list
     */
    queryNotificationInfoDtoList1: (data: QueryNotificationRequestDTO, params: RequestParams = {}) =>
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
     * @name Page6
     * @summary Page of notification record
     * @request POST:/api/docpal/notification/page
     */
    page6: (
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
     * @tags MasterTableController
     * @name InsertRecord
     * @summary Insert data into a master table
     * @request POST:/api/docpal/master/tables/record
     */
    insertRecord: (data: MasterTableRequestDTO, params: RequestParams = {}) =>
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
     * @name FindRecordPage
     * @summary Pagination Search (Master Table Record)
     * @request POST:/api/docpal/master/tables/record/page
     */
    findRecordPage: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
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
     * @name FindRecordPageV2
     * @request POST:/api/docpal/master/tables/record/page/nonPermission
     */
    findRecordPageV2: (data: MTRecordRequestDTO, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/master/tables/record/page/nonPermission`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Audit Log
     * @name NestedSearchLog
     * @summary Query Recent Search
     * @request POST:/api/docpal/logs/recent/search/page
     */
    nestedSearchLog: (data: BasePageRequest, params: RequestParams = {}) =>
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
     * @name PreviewDocumentLogs
     * @summary Query Recent Document
     * @request POST:/api/docpal/logs/recent/document/page
     */
    previewDocumentLogs: (data: BasePageRequest, params: RequestParams = {}) =>
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
     * @tags InternalShareController
     * @name Page7
     * @request POST:/api/docpal/internalShare/page/
     */
    page7: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name Page8
     * @request POST:/api/docpal/internalShare/page
     */
    page8: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name ShareWithothers
     * @request POST:/api/docpal/internalShare/others/
     */
    shareWithothers: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name ShareWithothers1
     * @request POST:/api/docpal/internalShare/others
     */
    shareWithothers1: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name ShareTome
     * @request POST:/api/docpal/internalShare/me/
     */
    shareTome: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name RejectDetailShare
     * @request DELETE:/api/docpal/internalShare/me/
     */
    rejectDetailShare: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name ShareTome1
     * @request POST:/api/docpal/internalShare/me
     */
    shareTome1: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name RejectDetailShare1
     * @request DELETE:/api/docpal/internalShare/me
     */
    rejectDetailShare1: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name CheckDocumentIsInShare
     * @request POST:/api/docpal/internalShare/checkDocumentIsInShare/
     */
    checkDocumentIsInShare: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name CheckDocumentIsInShare1
     * @request POST:/api/docpal/internalShare/checkDocumentIsInShare
     */
    checkDocumentIsInShare1: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name QueryByParams
     * @request GET:/api/docpal/internalShare
     */
    queryByParams: (
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
     * @name AddInternalShare
     * @request POST:/api/docpal/internalShare
     */
    addInternalShare: (data: InternalShareRequestDTO, params: RequestParams = {}) =>
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
     * @name RejectInternalShare
     * @request DELETE:/api/docpal/internalShare
     */
    rejectInternalShare: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @name QueryByParams1
     * @request GET:/api/docpal/internalShare/
     */
    queryByParams1: (
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
     * @name AddInternalShare1
     * @request POST:/api/docpal/internalShare/
     */
    addInternalShare1: (data: InternalShareRequestDTO, params: RequestParams = {}) =>
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
     * @name RejectInternalShare1
     * @request DELETE:/api/docpal/internalShare/
     */
    rejectInternalShare1: (data: InternalShareQueryDTO, params: RequestParams = {}) =>
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
     * @tags FormDesignController
     * @name SubmitFormData21
     * @summary Submit form data
     * @request POST:/api/docpal/form/design/submit/data
     */
    submitFormData21: (data: FormDesignDataDTO, params: RequestParams = {}) =>
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
     * @name FindRecordPage1
     * @summary Paging search form data
     * @request POST:/api/docpal/form/design/record/page
     */
    findRecordPage1: (data: FormDesignRequestDTO, params: RequestParams = {}) =>
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
     * @name CaseQuery
     * @request POST:/api/docpal/form/design/caseQuery
     */
    caseQuery: (
      query: {
        tableName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GenerateDocumentMode, ResultString | (ResultString | Result)>({
        path: `/api/docpal/form/design/caseQuery`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocPalEmailController
     * @name SendByEmailTemplate
     * @request POST:/api/docpal/email/template/send
     */
    sendByEmailTemplate: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name SendByJson
     * @summary Send test email using email template
     * @request POST:/api/docpal/email/send
     */
    sendByJson: (data: MailSendRequest, params: RequestParams = {}) =>
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
     * @name Send
     * @request POST:/api/docpal/email/send/from
     */
    send: (
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
     * @name SendByCustomizeText
     * @request POST:/api/docpal/email/customize/send
     */
    sendByCustomizeText: (data: MailSendRequest, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/email/customize/send`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name DataPage
     * @summary Pagination Search data of deployed case type
     * @request POST:/api/docpal/case/types/{caseTypeId}/records/page
     */
    dataPage: (caseTypeId: string, data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
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
     * @name Page9
     * @summary Pagination search
     * @request POST:/api/docpal/case/types/page
     */
    page9: (data: CaseTypeRequestDTO, params: RequestParams = {}) =>
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
     * @name SetVariables
     * @request POST:/api/docpal/case/instance/{caseInstanceId}/variables
     */
    setVariables: (caseInstanceId: string, data: Record<string, object>, params: RequestParams = {}) =>
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
     * @tags CaseInstanceController
     * @name TriggerEvent
     * @summary Trigger event for completed
     * @request POST:/api/docpal/case/instance/{caseInstanceId}/events/{planItemInstanceId}/trigger
     */
    triggerEvent: (caseInstanceId: string, planItemInstanceId: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/${caseInstanceId}/events/${planItemInstanceId}/trigger`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseInstanceController
     * @name FindTasks
     * @summary Retrieve all tasks of this case instance
     * @request POST:/api/docpal/case/instance/tasks
     */
    findTasks: (data: CaseInstanceTaskDTO, params: RequestParams = {}) =>
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
     * @name CompleteTask2
     * @summary Complete task
     * @request POST:/api/docpal/case/instance/tasks/complete
     */
    completeTask2: (data: CaseInstanceTaskDTO, params: RequestParams = {}) =>
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
     * @name Start
     * @summary Start a case model definition to get a case instance
     * @request POST:/api/docpal/case/instance/start
     */
    start: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
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
     * @name FindPlanItemInstances
     * @summary Retrieve all or activated planItem instances of this case instance
     * @request POST:/api/docpal/case/instance/planItems
     */
    findPlanItemInstances: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
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
     * @tags CaseModeController
     * @name ActivePlanItemInstance
     * @summary Enable plan item instance
     * @request POST:/api/docpal/case/instance/planItems/{planItemId}/enable
     */
    activePlanItemInstance: (planItemId: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/planItems/${planItemId}/enable`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name CompletePlanItem
     * @summary Submit form data for complete plan item instance
     * @request POST:/api/docpal/case/instance/planItems/complete
     */
    completePlanItem: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
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
     * @tags CaseInstanceController
     * @name ActivePlanItemInstance1
     * @summary Active a planItem instance
     * @request POST:/api/docpal/case/instance/planItems/active
     */
    activePlanItemInstance1: (data: PlanItemInstanceRequestDTO, params: RequestParams = {}) =>
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
     * @name FindAuditLog
     * @summary Obtain Audit Log of a case instance
     * @request POST:/api/docpal/case/instance/auditLog
     */
    findAuditLog: (data: CaseInstanceRequestDTO, params: RequestParams = {}) =>
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
     * @tags CaseModeController
     * @name Page10
     * @summary Pagination search (Case View Dashboard)
     * @request POST:/api/docpal/case/dashboard/page
     */
    page10: (data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
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
     * @tags CmmnDashboardController
     * @name QueryProcessInstancePage
     * @summary Paging search process instance of this case instance
     * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/tasks
     */
    queryProcessInstancePage: (caseId: string, data: CmmnProcessRequestDTO, params: RequestParams = {}) =>
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
     * @name QueryProcessInstancePage1
     * @summary Paging search process instance of this case instance
     * @request POST:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page
     */
    queryProcessInstancePage1: (caseId: string, data: CmmnProcessRequestDTO, params: RequestParams = {}) =>
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
     * @name DataPage1
     * @summary Paging Query instance data for deployed case types for the currently logged in user
     * @request POST:/api/docpal/case/dashboard/caseType/{caseTypeId}/records/page
     */
    dataPage1: (caseTypeId: string, data: CmmnDashboardRequestDTO, params: RequestParams = {}) =>
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
     * @tags FolderCabinetController
     * @name GenerateDocument2
     * @request POST:/api/docpal/cabinet/{id}/generate/document
     */
    generateDocument2: (id: string, data: Record<string, object>, params: RequestParams = {}) =>
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
     * @name VerificationComplete
     * @summary verification complete of folder cabinet
     * @request POST:/api/docpal/cabinet/verification/complete
     */
    verificationComplete: (data: FolderCabinetRequestDTO, params: RequestParams = {}) =>
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
     * @name UploadFile1
     * @summary Upload file of folder cabinet
     * @request POST:/api/docpal/cabinet/upload/file
     */
    uploadFile1: (
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
     * @name Page11
     * @summary Pagination search of document folder cabinet
     * @request POST:/api/docpal/cabinet/page
     */
    page11: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
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
     * @name NewItem
     * @summary New Item
     * @request POST:/api/docpal/cabinet/item
     */
    newItem: (data: DFCRequestDTO, params: RequestParams = {}) =>
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
     * @name FilingCreateDocument1
     * @request POST:/api/docpal/cabinet/filing/create/document
     */
    filingCreateDocument1: (data: GenerateDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name Export
     * @request POST:/api/docpal/cabinet/export
     */
    export: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
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
     * @name CreateTopDocFolderCabinet
     * @summary Create Top folder cabinet
     * @request POST:/api/docpal/cabinet/create
     */
    createTopDocFolderCabinet: (data: DFCRequestDTO, params: RequestParams = {}) =>
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
     * @tags Auto Generated Value
     * @name GenerateCrId
     * @request GET:/api/docpal/auto/crId/
     */
    generateCrId: (
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
     * @name SaveCrId
     * @request POST:/api/docpal/auto/crId/
     */
    saveCrId: (
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
     * @name GenerateCrId1
     * @request GET:/api/docpal/auto/crId
     */
    generateCrId1: (
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
     * @name SaveCrId1
     * @request POST:/api/docpal/auto/crId
     */
    saveCrId1: (
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
     * @name GenerateCaseId2
     * @request GET:/api/docpal/auto/caseId
     */
    generateCaseId2: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/auto/caseId`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auto Generated Value
     * @name SaveCaseId
     * @request POST:/api/docpal/auto/caseId
     */
    saveCaseId: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/auto/caseId`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auto Generated Value
     * @name GenerateCaseId3
     * @request GET:/api/docpal/auto/caseId/
     */
    generateCaseId3: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/auto/caseId/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auto Generated Value
     * @name SaveCaseId1
     * @request POST:/api/docpal/auto/caseId/
     */
    saveCaseId1: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/auto/caseId/`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocBlockPermissionController
     * @name Create13
     * @summary Create DocBlockPermission
     * @request POST:/api/block/permission
     */
    create13: (data: BlockInheritedPermission, params: RequestParams = {}) =>
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
     * @name Filter
     * @summary filter block document permission
     * @request POST:/api/block/permission/filter
     */
    filter: (data: DocDTO, params: RequestParams = {}) =>
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
     * @tags Job (Nuxeo)
     * @name AskQuestion
     * @request POST:/api/ai/ask_ai/ai_chat/askQuestion
     */
    askQuestion: (data: AiSearchRequestDTO, params: RequestParams = {}) =>
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
     * @name AddAiComment
     * @request POST:/api/ai/ask_ai/ai_chat/addAiComment
     */
    addAiComment: (data: AddAiCommentRequestDTO, params: RequestParams = {}) =>
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
     * @tags AclPermissionController
     * @name BatchUpdate
     * @summary batch modify list of entries of permissions
     * @request PATCH:/api/permissions/update/entry
     */
    batchUpdate: (data: AclPermissionDTO, params: RequestParams = {}) =>
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
     * @tags Share (Nuxeo)
     * @name Delete10
     * @request DELETE:/api/nuxeo/share
     */
    delete10: (data: string[], params: RequestParams = {}) =>
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
     * @name Save3
     * @request PATCH:/api/nuxeo/share
     */
    save3: (data: ShareSaveRequestDTO, params: RequestParams = {}) =>
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
     * @tags Document (Nuxeo)
     * @name UpdateAiDocument
     * @request PATCH:/api/nuxeo/document/updateAiDocument/
     */
    updateAiDocument: (data: UpdateAiDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateAiDocument1
     * @request PATCH:/api/nuxeo/document/updateAiDocument
     */
    updateAiDocument1: (data: UpdateAiDocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name ReplaceFile
     * @request PATCH:/api/nuxeo/document/replaceFile/v2/
     */
    replaceFile: (
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
     * @name ReplaceFile1
     * @request PATCH:/api/nuxeo/document/replaceFile/v2
     */
    replaceFile1: (
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
     * @name ReplaceFile2
     * @request PATCH:/api/nuxeo/document/replaceFile
     */
    replaceFile2: (
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
     * @name ReplaceFile3
     * @request PATCH:/api/nuxeo/document/replaceFile/
     */
    replaceFile3: (
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
     * @name ChangeDocPalType
     * @summary Update a document
     * @request PATCH:/api/nuxeo/document/change/docpal/type
     */
    changeDocPalType: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Comment (Nuxeo)
     * @name UpdateComment
     * @summary Update a document comment
     * @request PATCH:/api/nuxeo/comments/update/
     */
    updateComment: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @name UpdateComment1
     * @summary Update a document comment
     * @request PATCH:/api/nuxeo/comments/update
     */
    updateComment1: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @tags Workflow
     * @name DeleteComment2
     * @summary Delete comment
     * @request DELETE:/api/docpal/workflow/comment/
     */
    deleteComment2: (
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
     * @name UpdateComment2
     * @summary Update comment
     * @request PATCH:/api/docpal/workflow/comment/
     */
    updateComment2: (
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
     * @name DeleteComment3
     * @summary Delete comment
     * @request DELETE:/api/docpal/workflow/comment
     */
    deleteComment3: (
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
     * @name UpdateComment3
     * @summary Update comment
     * @request PATCH:/api/docpal/workflow/comment
     */
    updateComment3: (
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
     * @tags RetentionPolicyController
     * @name UpdateStatus
     * @summary Update status through id
     * @request PATCH:/api/docpal/policy/retentions/{id}/status/{status}
     */
    updateStatus: (id: number, status: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/${id}/status/${status}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name SubmitApproval
     * @summary Approval retention policy document
     * @request PATCH:/api/docpal/policy/retentions/{id}/approval/{approved}
     */
    submitApproval: (id: number, approved: boolean, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/${id}/approval/${approved}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PolicyDocumentController
     * @name Approval
     * @summary submit approved comment
     * @request PATCH:/api/docpal/policy/documents/{id}/status/{status}
     */
    approval: (id: number, status: boolean, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/documents/${id}/status/${status}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MasterTableController
     * @name ActiveRecord
     * @summary Enable or Disable Record
     * @request PATCH:/api/docpal/master/tables/{id}/record/status
     */
    activeRecord: (id: string, data: MTRecordRequestDTO, params: RequestParams = {}) =>
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
     * @tags FolderCabinetController
     * @name Update5
     * @summary Update Document Folder Cabinet
     * @request PATCH:/api/docpal/cabinet
     */
    update5: (data: DocFolderCabinetRequestDTO, params: RequestParams = {}) =>
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
     * @tags wopi-host-controller
     * @name CheckFileInfo
     * @request GET:/api/wopi/files/{id}
     */
    checkFileInfo: (
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
     * @tags VerificationPermissionController
     * @name GetEventTypes
     * @request GET:/api/verification/permission/event/types
     */
    getEventTypes: (params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/verification/permission/event/types`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VerificationPermissionController
     * @name FindBusinessPermissions
     * @request GET:/api/verification/permission/business/{businessId}
     */
    findBusinessPermissions: (businessId: string, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/verification/permission/business/${businessId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VerificationPermissionController
     * @name GetUserMaxPermissionOnDocument
     * @request GET:/api/verification/permission/acl/permission/
     */
    getUserMaxPermissionOnDocument: (
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
     * @name GetUserMaxPermissionOnDocument1
     * @request GET:/api/verification/permission/acl/permission
     */
    getUserMaxPermissionOnDocument1: (
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

    /**
     * No description
     *
     * @tags AclUserPermissionController
     * @name GetById
     * @summary Query detail
     * @request GET:/api/user/permission/{id}
     */
    getById: (id: string, params: RequestParams = {}) =>
      this.request<ResultAclUserPermission, ResultString | (ResultString | Result)>({
        path: `/api/user/permission/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserPermissionController
     * @name QueryUserPermission
     * @summary Query all permission of acl user
     * @request GET:/api/user/permission/all/{userId}
     */
    queryUserPermission: (userId: string, params: RequestParams = {}) =>
      this.request<ResultListAclPermissionDTO, ResultString | (ResultString | Result)>({
        path: `/api/user/permission/all/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclPermissionController
     * @name Get5
     * @summary query access control permission by id
     * @request GET:/api/permissions/{id}
     */
    get5: (id: string, params: RequestParams = {}) =>
      this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
        path: `/api/permissions/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclPermissionController
     * @name Delete3
     * @summary delete access control permission by id
     * @request DELETE:/api/permissions/{id}
     */
    delete3: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/permissions/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclPermissionController
     * @name FindByName
     * @summary Query permission list by name
     * @request GET:/api/permissions/name/{name}
     */
    findByName: (name: string, params: RequestParams = {}) =>
      this.request<ResultAclPermissionDTO, ResultString | (ResultString | Result)>({
        path: `/api/permissions/name/${name}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclPermissionController
     * @name DeleteByName
     * @summary delete access control permission by name
     * @request DELETE:/api/permissions/name/{name}
     */
    deleteByName: (name: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/permissions/name/${name}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserController
     * @name Get6
     * @summary query user information
     * @request GET:/api/permission/users/{id}
     */
    get6: (id: string, params: RequestParams = {}) =>
      this.request<ResultAclUserInformation, ResultString | (ResultString | Result)>({
        path: `/api/permission/users/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserController
     * @name Delete4
     * @summary delete user by logic
     * @request DELETE:/api/permission/users/{id}
     */
    delete4: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/permission/users/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserRelationshipController
     * @name FindByGroupId
     * @summary query bind users
     * @request GET:/api/permission/user/relationships/groupId/{groupId}
     */
    findByGroupId: (groupId: string, params: RequestParams = {}) =>
      this.request<ResultListAclUserRelationshipWithUserGroup, ResultString | (ResultString | Result)>({
        path: `/api/permission/user/relationships/groupId/${groupId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserGroupController
     * @name Get7
     * @summary Query user group information
     * @request GET:/api/permission/user/group/{id}
     */
    get7: (id: string, params: RequestParams = {}) =>
      this.request<ResultAclUserGroup, ResultString | (ResultString | Result)>({
        path: `/api/permission/user/group/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserGroupController
     * @name Delete7
     * @summary Remove user group
     * @request DELETE:/api/permission/user/group/{id}
     */
    delete7: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/permission/user/group/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserGroupController
     * @name FindGroupUsers
     * @summary Query user list of binding in user group
     * @request GET:/api/permission/user/group/{groupId}/users
     */
    findGroupUsers: (groupId: string, params: RequestParams = {}) =>
      this.request<ResultAclUserGroupDTO, ResultString | (ResultString | Result)>({
        path: `/api/permission/user/group/${groupId}/users`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclEntryController
     * @name Get8
     * @summary Query entry by id
     * @request GET:/api/permission/entry/{id}
     */
    get8: (id: string, params: RequestParams = {}) =>
      this.request<ResultAccessControlEntry, ResultString | (ResultString | Result)>({
        path: `/api/permission/entry/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclEntryController
     * @name Delete9
     * @summary Delete entry by id
     * @request DELETE:/api/permission/entry/{id}
     */
    delete9: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/permission/entry/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OnBaseUserController
     * @name GetApplication
     * @summary Get current user information
     * @request GET:/api/onbase/user/getApplication
     */
    getApplication: (params: RequestParams = {}) =>
      this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/onbase/user/getApplication`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabulary-controller
     * @name GetVocabularyById
     * @summary Get Vocabulary by id
     * @request GET:/api/nuxeo/vocabulary/{id}
     */
    getVocabularyById: (id: string, params: RequestParams = {}) =>
      this.request<ResultVocabularyDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/vocabulary/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabulary-controller
     * @name GetVocabularyById1
     * @summary Get Vocabulary by id
     * @request GET:/api/nuxeo/vocabulary/{id}/
     */
    getVocabularyById1: (id: string, params: RequestParams = {}) =>
      this.request<ResultVocabularyDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/vocabulary/${id}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetAllVirtualFolder
     * @request GET:/api/nuxeo/user/virtualfolder2/setting
     */
    getAllVirtualFolder: (params: RequestParams = {}) =>
      this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/virtualfolder2/setting`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetAllVirtualFolderSystemSettingDeprecated
     * @request GET:/api/nuxeo/user/virtualfolder/setting
     * @deprecated
     */
    getAllVirtualFolderSystemSettingDeprecated: (params: RequestParams = {}) =>
      this.request<ResultListVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/virtualfolder/setting`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetVirtualFolderSystemSetting
     * @request GET:/api/nuxeo/user/virtualfolder/setting/{id}
     */
    getVirtualFolderSystemSetting: (id: string, params: RequestParams = {}) =>
      this.request<ResultVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/virtualfolder/setting/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetHeaderInfo
     * @summary List all headers
     * @request GET:/api/nuxeo/user/listHeaders
     */
    getHeaderInfo: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/listHeaders`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name GetApplication1
     * @summary Get current user
     * @request GET:/api/nuxeo/user/getApplication
     */
    getApplication1: (params: RequestParams = {}) =>
      this.request<ResultUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/user/getApplication`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User (Nuxeo)
     * @name ConfirmResetPassword
     * @request GET:/api/nuxeo/user/confirmReset
     */
    confirmResetPassword: (
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

    /**
     * No description
     *
     * @tags Share (Nuxeo)
     * @name GetPrepareDownload
     * @summary Get Status of download file is complete
     * @request GET:/api/nuxeo/share/prepare/download/{docId}
     */
    getPrepareDownload: (docId: string, params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/share/prepare/download/${docId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SmartFolderController
     * @name Get9
     * @request GET:/api/nuxeo/sfolder/{id}
     */
    get9: (id: string, params: RequestParams = {}) =>
      this.request<ResultSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/sfolder/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SmartFolderController
     * @name GetList
     * @request GET:/api/nuxeo/sfolder/
     */
    getList: (params: RequestParams = {}) =>
      this.request<ResultListSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/sfolder/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SmartFolderController
     * @name GetList1
     * @request GET:/api/nuxeo/sfolder
     */
    getList1: (params: RequestParams = {}) =>
      this.request<ResultListSmartFolderResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/sfolder`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ViewSettingController
     * @name Get10
     * @request GET:/api/nuxeo/setting/view
     */
    get10: (params: RequestParams = {}) =>
      this.request<ResultViewSettingResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/setting/view`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name AssetsSearch
     * @summary Get Aggregation Configs by search page provider name
     * @request GET:/api/nuxeo/search/{pageProviderName}/agg_configs
     */
    assetsSearch: (pageProviderName: string, params: RequestParams = {}) =>
      this.request<ResultListAggregationConfigResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/${pageProviderName}/agg_configs`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name AssetsSearch1
     * @summary Get Aggregation Configs by search page provider name
     * @request GET:/api/nuxeo/search/{pageProviderName}/agg_configs/
     */
    assetsSearch1: (pageProviderName: string, params: RequestParams = {}) =>
      this.request<ResultListAggregationConfigResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/${pageProviderName}/agg_configs/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name GetTextSearchTypes
     * @summary Get all text search types
     * @request GET:/api/nuxeo/search/textSearchTypes/
     */
    getTextSearchTypes: (params: RequestParams = {}) =>
      this.request<ResultListString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/textSearchTypes/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name GetTextSearchTypes1
     * @summary Get all text search types
     * @request GET:/api/nuxeo/search/textSearchTypes
     */
    getTextSearchTypes1: (params: RequestParams = {}) =>
      this.request<ResultListString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/textSearchTypes`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name GetSearchExtends
     * @summary getMimiType
     * @request GET:/api/nuxeo/search/getSearchExtends
     */
    getSearchExtends: (
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
     * @name GetSearchExtends1
     * @summary getMimiType
     * @request GET:/api/nuxeo/search/getSearchExtends/
     */
    getSearchExtends1: (
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
     * @name GetExportHeader
     * @summary get export header for Nested Search
     * @request GET:/api/nuxeo/search/getExportHeader
     */
    getExportHeader: (params: RequestParams = {}) =>
      this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/getExportHeader`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search (Nuxeo)
     * @name AssetsSearch2
     * @summary Assets Search
     * @request GET:/api/nuxeo/search/assets_search
     */
    assetsSearch2: (
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
     * @name AssetsSearch3
     * @summary Assets Search
     * @request GET:/api/nuxeo/search/assets_search/
     */
    assetsSearch3: (
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
     * @name GetAllUserNew
     * @summary List all user in DocPal
     * @request GET:/api/nuxeo/search/allUser
     */
    getAllUserNew: (params: RequestParams = {}) =>
      this.request<ResultListUserDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/search/allUser`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public (Nuxeo)
     * @name GetPreview2
     * @request GET:/api/nuxeo/public/share/preview
     */
    getPreview2: (
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
     * @name GetSharePreview
     * @request GET:/api/nuxeo/public/share/download
     */
    getSharePreview: (
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
     * @name GetDocumentDetailByShareToken
     * @summary get one document detail of share document
     * @request GET:/api/nuxeo/public/share/document/{documentId}
     */
    getDocumentDetailByShareToken: (
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
     * @name GetDocumentDetailByShareToken1
     * @summary get one document detail of share document
     * @request GET:/api/nuxeo/public/document/{documentId}
     */
    getDocumentDetailByShareToken1: (
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
     * @name GetDocList
     * @request GET:/api/nuxeo/public/document
     */
    getDocList: (
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
     * @name GetDocList1
     * @request GET:/api/nuxeo/public/share/document
     */
    getDocList1: (
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

    /**
     * No description
     *
     * @tags Configuration (Nuxeo)
     * @name GetMq
     * @request GET:/api/nuxeo/mq/streams
     */
    getMq: (params: RequestParams = {}) =>
      this.request<ResultMapStringMQProperties, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/mq/streams`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Job (Nuxeo)
     * @name WriteAiTrainingData
     * @request GET:/api/nuxeo/job/writeAiTrainingData
     */
    writeAiTrainingData: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/job/writeAiTrainingData`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name SyncUsersAndGroups
     * @summary Synchronize Nuxeo users and groups to Workflow
     * @request GET:/api/nuxeo/identity/synchronize/
     */
    syncUsersAndGroups: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/synchronize/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name SyncUsersAndGroups1
     * @summary Synchronize Nuxeo users and groups to Workflow
     * @request GET:/api/nuxeo/identity/synchronize
     */
    syncUsersAndGroups1: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/identity/synchronize`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name SyncLdapUsersAndGroupsById
     * @summary Synchronize Nuxeo users and groups to Workflow
     * @request GET:/api/nuxeo/identity/syncLdapUsersAndGroupsById
     */
    syncLdapUsersAndGroupsById: (
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
     * @name SyncLdapUsersAndGroupsById1
     * @summary Synchronize Nuxeo users and groups to Workflow
     * @request GET:/api/nuxeo/identity/syncLdapUsersAndGroupsById/
     */
    syncLdapUsersAndGroupsById1: (
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
     * @tags wopi-host-controller
     * @name GetAccessToken
     * @request GET:/api/nuxeo/getOfficeToken/{id}
     */
    getAccessToken: (
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

    /**
     * No description
     *
     * @tags Extension (Nuxeo)
     * @name GetSubtypes
     * @summary Get available subtypes
     * @request GET:/api/nuxeo/extension/subtypes/{docType}/
     */
    getSubtypes: (docType: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/extension/subtypes/${docType}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Extension (Nuxeo)
     * @name GetSubtypes1
     * @summary Get available subtypes
     * @request GET:/api/nuxeo/extension/subtypes/{docType}
     */
    getSubtypes1: (docType: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/extension/subtypes/${docType}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Extension (Nuxeo)
     * @name GetDomainTypes
     * @summary Get domain types
     * @request GET:/api/nuxeo/extension/domains
     */
    getDomainTypes: (params: RequestParams = {}) =>
      this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/extension/domains`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Extension (Nuxeo)
     * @name GetDomainTypes1
     * @summary Get domain types
     * @request GET:/api/nuxeo/extension/domains/
     */
    getDomainTypes1: (params: RequestParams = {}) =>
      this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/extension/domains/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Extension (Nuxeo)
     * @name GetDocumentTypes4
     * @summary Get all document types
     * @request GET:/api/nuxeo/extension/doctypes
     */
    getDocumentTypes4: (params: RequestParams = {}) =>
      this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/extension/doctypes`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Extension (Nuxeo)
     * @name GetDocumentTypes5
     * @summary Get all document types
     * @request GET:/api/nuxeo/extension/doctypes/
     */
    getDocumentTypes5: (params: RequestParams = {}) =>
      this.request<ResultListDocumentType, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/extension/doctypes/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetStatus
     * @request GET:/api/nuxeo/document/{documentId}/ocr/state
     */
    getStatus: (documentId: string, params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/${documentId}/ocr/state`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document Template
     * @name FindAll
     * @request GET:/api/nuxeo/document/templates
     */
    findAll: (params: RequestParams = {}) =>
      this.request<ResultListDocumentTemplate, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/templates`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document Template
     * @name GetById1
     * @request GET:/api/nuxeo/document/templates/{id}
     */
    getById1: (id: string, params: RequestParams = {}) =>
      this.request<ResultDocumentTemplate, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/templates/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name RetryClassification
     * @request GET:/api/nuxeo/document/retry_classification/{uploadId}/
     */
    retryClassification: (uploadId: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/retry_classification/${uploadId}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name RetryClassification1
     * @request GET:/api/nuxeo/document/retry_classification/{uploadId}
     */
    retryClassification1: (uploadId: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/retry_classification/${uploadId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name QueryAiAnalyze
     * @request GET:/api/nuxeo/document/queryAiAnalyze/{idOrPath}/
     */
    queryAiAnalyze: (idOrPath: string, params: RequestParams = {}) =>
      this.request<ResultAiAnalysisDocumentVO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/queryAiAnalyze/${idOrPath}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name QueryAiAnalyze1
     * @request GET:/api/nuxeo/document/queryAiAnalyze/{idOrPath}
     */
    queryAiAnalyze1: (idOrPath: string, params: RequestParams = {}) =>
      this.request<ResultAiAnalysisDocumentVO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/queryAiAnalyze/${idOrPath}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name RepairData
     * @request GET:/api/nuxeo/document/ocrs/patch
     */
    repairData: (
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
     * @name GetRepairDataResult
     * @request GET:/api/nuxeo/document/ocrs/patch/result
     */
    getRepairDataResult: (params: RequestParams = {}) =>
      this.request<ResultLong, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/ocrs/patch/result`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name QueryRepairData
     * @request GET:/api/nuxeo/document/ocr/patch/data
     */
    queryRepairData: (params: RequestParams = {}) =>
      this.request<ResultListString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/ocr/patch/data`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name IsFollowed
     * @summary Check if document is followed by current user
     * @request GET:/api/nuxeo/document/isFollowed/
     */
    isFollowed: (
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
     * @name IsFollowed1
     * @summary Check if document is followed by current user
     * @request GET:/api/nuxeo/document/isFollowed
     */
    isFollowed1: (
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
     * @name InitDamClearUp
     * @request GET:/api/nuxeo/document/initHocrClearUp
     */
    initDamClearUp: (
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
     * @name InitConversionClearUp
     * @request GET:/api/nuxeo/document/initConversionClearUp
     */
    initConversionClearUp: (
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
     * @name RepairData1
     * @request GET:/api/nuxeo/document/execute/ocr/patch
     */
    repairData1: (params: RequestParams = {}) =>
      this.request<ResultMapStringObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/execute/ocr/patch`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name DownloadTempFile
     * @request GET:/api/nuxeo/document/download_temp_file/{id}/
     */
    downloadTempFile: (id: number, params: RequestParams = {}) =>
      this.request<string, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/download_temp_file/${id}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name DownloadTempFile1
     * @request GET:/api/nuxeo/document/download_temp_file/{id}
     */
    downloadTempFile1: (id: number, params: RequestParams = {}) =>
      this.request<string, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/download_temp_file/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name GetUserMaxPermissionOnDocument2
     * @summary Get user maximum permission on a document
     * @request GET:/api/nuxeo/document/acl/permission/
     */
    getUserMaxPermissionOnDocument2: (
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
     * @name GetUserMaxPermissionOnDocument3
     * @summary Get user maximum permission on a document
     * @request GET:/api/nuxeo/document/acl/permission
     */
    getUserMaxPermissionOnDocument3: (
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
     * @tags Conversion (Nuxeo)
     * @name GetTemplateFilePath
     * @summary Get Template Path
     * @request GET:/api/nuxeo/conversion/getTemplateFilePath
     */
    getTemplateFilePath: (params: RequestParams = {}) =>
      this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/conversion/getTemplateFilePath`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversion (Nuxeo)
     * @name GetSupportedFormats
     * @summary Get Supported Formats
     * @request GET:/api/nuxeo/conversion/getSupportedFormat
     */
    getSupportedFormats: (params: RequestParams = {}) =>
      this.request<ResultMapStringListObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/conversion/getSupportedFormat`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversion (Nuxeo)
     * @name GetFilePath
     * @summary Get Files Path
     * @request GET:/api/nuxeo/conversion/getFilePath
     * @deprecated
     */
    getFilePath: (params: RequestParams = {}) =>
      this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/conversion/getFilePath`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversion (Nuxeo)
     * @name GetConversionHistory
     * @summary Get Conversion History
     * @request GET:/api/nuxeo/conversion/getConversionHistory
     */
    getConversionHistory: (
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

    /**
     * No description
     *
     * @tags Collection (Nuxeo)
     * @name GetAll2
     * @request GET:/api/nuxeo/collection/all/
     */
    getAll2: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/collection/all/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection (Nuxeo)
     * @name GetAll3
     * @request GET:/api/nuxeo/collection/all
     */
    getAll3: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/collection/all`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name GetVirtualFolderSystemSetting1
     * @request GET:/api/nuxeo/admin/virtualfolder/setting/{id}
     */
    getVirtualFolderSystemSetting1: (id: string, params: RequestParams = {}) =>
      this.request<ResultVirtualFolderSettingResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/virtualfolder/setting/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name DeleteVirtualFolderSystemSetting
     * @request DELETE:/api/nuxeo/admin/virtualfolder/setting/{id}
     */
    deleteVirtualFolderSystemSetting: (id: string, params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/virtualfolder/setting/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name GetLanguageSetting
     * @request GET:/api/nuxeo/admin/setting/language
     */
    getLanguageSetting: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/setting/language`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name GetSetting1
     * @request GET:/api/nuxeo/admin/setting/{system_id}
     */
    getSetting1: (systemId: string, params: RequestParams = {}) =>
      this.request<ResultMapObjectObject, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/setting/${systemId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NuxeoAdminController
     * @name GetAllIconId
     * @request GET:/api/nuxeo/admin/icons
     */
    getAllIconId: (params: RequestParams = {}) =>
      this.request<ResultListCustomIconDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/admin/icons`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageQueue
     * @name FindByDocumentId
     * @summary Query record By documentId
     * @request GET:/api/message/queue/{documentId}/message
     */
    findByDocumentId: (documentId: string, params: RequestParams = {}) =>
      this.request<ResultListBusinessResultRecord, ResultString | (ResultString | Result)>({
        path: `/api/message/queue/${documentId}/message`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageQueue
     * @name List
     * @summary message total of every message queue
     * @request GET:/api/message/queue/total
     */
    list: (
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
     * @name GroupByStatus
     * @summary Statistics by state
     * @request GET:/api/message/queue/report/statusGroup
     */
    groupByStatus: (params: RequestParams = {}) =>
      this.request<ResultListMQConsumeGroupStatusDTO, ResultString | (ResultString | Result)>({
        path: `/api/message/queue/report/statusGroup`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageQueue
     * @name GroupByDay
     * @summary Statistics by per day
     * @request GET:/api/message/queue/report/dayGroup
     */
    groupByDay: (params: RequestParams = {}) =>
      this.request<ResultListMQDayTotalDTO, ResultString | (ResultString | Result)>({
        path: `/api/message/queue/report/dayGroup`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageQueue
     * @name ConsumeInformation
     * @summary The configuration of message queue
     * @request GET:/api/message/queue/consumes
     */
    consumeInformation: (params: RequestParams = {}) =>
      this.request<void, ResultString | (ResultString | Result)>({
        path: `/api/message/queue/consumes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetFormProperties2
     * @request GET:/api/docpal/workflow/start/properties
     */
    getFormProperties2: (
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
     * @name GetFormProperties3
     * @request GET:/api/docpal/workflow/start/properties/
     */
    getFormProperties3: (
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
     * @name QuerydocumentTypeProFileId
     * @request GET:/api/docpal/workflow/querydocumentTypeProFileId
     */
    querydocumentTypeProFileId: (
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
     * @name QueryMetadataMapping
     * @request GET:/api/docpal/workflow/queryMetadataMapping
     */
    queryMetadataMapping: (
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
     * @name QueryMetadataMappingNames
     * @request GET:/api/docpal/workflow/queryMetadataMappingNames
     */
    queryMetadataMappingNames: (params: RequestParams = {}) =>
      this.request<ResultListString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/queryMetadataMappingNames`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name QueryMetaValidationRule
     * @request GET:/api/docpal/workflow/queryMetaValidationRule
     */
    queryMetaValidationRule: (
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
     * @name QueryDocumentTypeProfile
     * @request GET:/api/docpal/workflow/queryDocumentTypeProfile
     */
    queryDocumentTypeProfile: (
      query: {
        request: DocumentTypeProfileSettingRequest;
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
     * @name QueryDocumentTypeProFileSettings
     * @request GET:/api/docpal/workflow/queryDocumentTypeProFileSettings
     */
    queryDocumentTypeProFileSettings: (params: RequestParams = {}) =>
      this.request<ResultMapStringListMapStringString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/queryDocumentTypeProFileSettings`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name Query
     * @request GET:/api/docpal/workflow/process/instance/{processInstanceId}
     */
    query: (processInstanceId: string, params: RequestParams = {}) =>
      this.request<ResultProcessInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/process/instance/${processInstanceId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetProcessDefinitionList
     * @request GET:/api/docpal/workflow/process/getProcessDefinitionList
     */
    getProcessDefinitionList: (
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
     * @name GetProcessByProcDefId
     * @request GET:/api/docpal/workflow/process/getProcessByProcDefId
     */
    getProcessByProcDefId: (
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
     * @name IsDocumetIdCanStartAdhoc
     * @request GET:/api/docpal/workflow/isDocumetIdCanStartAdhoc
     */
    isDocumetIdCanStartAdhoc: (
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
     * @name IsDocumentIdCanApproval
     * @request GET:/api/docpal/workflow/isDocumetIdCanApproval
     */
    isDocumentIdCanApproval: (
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
     * @name GetHistoryExportHeader
     * @request GET:/api/docpal/workflow/history/getHistoryExportHeader
     */
    getHistoryExportHeader: (params: RequestParams = {}) =>
      this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/history/getHistoryExportHeader`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetHistoryExportHeader1
     * @request GET:/api/docpal/workflow/history/getHistoryExportHeader/
     */
    getHistoryExportHeader1: (params: RequestParams = {}) =>
      this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/history/getHistoryExportHeader/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GetCommentByProcessInstanceId
     * @summary get CommentBy ProcessInstanceId
     * @request GET:/api/docpal/workflow/getCommentByProcessInstanceId
     */
    getCommentByProcessInstanceId: (
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
     * @name GetBusinessKeyList
     * @request GET:/api/docpal/workflow/getBusinessKeyList
     */
    getBusinessKeyList: (
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
     * @name GenerateCaseId
     * @request GET:/api/docpal/workflow/generate/caseId/
     */
    generateCaseId: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/generate/caseId/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name GenerateCaseId1
     * @request GET:/api/docpal/workflow/generate/caseId
     */
    generateCaseId1: (params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/generate/caseId`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name FindForms
     * @summary Get the list of form properties associated with the process definition
     * @request GET:/api/docpal/workflow/forms
     */
    findForms: (
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
     * @name GetForm
     * @summary Get form properties of single element associated with the process definition
     * @request GET:/api/docpal/workflow/forms/{elementKey}
     */
    getForm: (
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
     * @name GetFormProperties4
     * @request GET:/api/docpal/workflow/form/properties
     */
    getFormProperties4: (
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
     * @name GetFormProperties5
     * @request GET:/api/docpal/workflow/form/properties/
     */
    getFormProperties5: (
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
     * @name CleanUp
     * @request GET:/api/docpal/workflow/cleanUp
     */
    cleanUp: (params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/cleanUp`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Template
     * @name GetById2
     * @summary Query watermark template by ID
     * @request GET:/api/docpal/watermark/templates/{id}
     */
    getById2: (id: string, params: RequestParams = {}) =>
      this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/templates/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Template
     * @name GetById3
     * @summary Query watermark template by ID
     * @request GET:/api/docpal/watermark/templates/{id}/
     */
    getById3: (id: string, params: RequestParams = {}) =>
      this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/templates/${id}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Template
     * @name GetByName
     * @summary Query watermark template by name
     * @request GET:/api/docpal/watermark/templates/name/{name}
     */
    getByName: (name: string, params: RequestParams = {}) =>
      this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/templates/name/${name}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Template
     * @name GetByName1
     * @summary Query watermark template by name
     * @request GET:/api/docpal/watermark/templates/name/{name}/
     */
    getByName1: (name: string, params: RequestParams = {}) =>
      this.request<ResultWMKTemplateRequestDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/templates/name/${name}/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Template
     * @name FindAll1
     * @summary Query watermark template and watermark setting list
     * @request GET:/api/docpal/watermark/templates/all/
     */
    findAll1: (params: RequestParams = {}) =>
      this.request<ResultListWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/templates/all/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Template
     * @name FindAll2
     * @summary Query watermark template and watermark setting list
     * @request GET:/api/docpal/watermark/templates/all
     */
    findAll2: (params: RequestParams = {}) =>
      this.request<ResultListWatermarkSettingsTemplate, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/templates/all`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Settings
     * @name FindByTemplateId
     * @summary Query list of watermark settings by template id
     * @request GET:/api/docpal/watermark/template/{templateId}
     */
    findByTemplateId: (templateId: string, params: RequestParams = {}) =>
      this.request<ResultListWatermarkSettingsDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/template/${templateId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Settings
     * @name PreviewPicture
     * @request GET:/api/docpal/watermark/settings/preview/{id}
     */
    previewPicture: (id: string, params: RequestParams = {}) =>
      this.request<string[], ResultString | (ResultString | Result)>({
        path: `/api/docpal/watermark/settings/preview/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Watermark Settings
     * @name DocTemplateWatermarkPreview
     * @request GET:/api/docpal/watermark/document/preview
     */
    docTemplateWatermarkPreview: (
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

    /**
     * No description
     *
     * @tags DocPalTypeController
     * @name FindByName1
     * @summary Obtain docpal type detail through name
     * @request GET:/api/docpal/types/name/{name}
     */
    findByName1: (name: string, params: RequestParams = {}) =>
      this.request<ResultDocPalTypeResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/types/name/${name}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocPalTypeController
     * @name FindRelatedType
     * @summary Query all related docpal type of current docpal type
     * @request GET:/api/docpal/types/name/{name}/related
     */
    findRelatedType: (name: string, params: RequestParams = {}) =>
      this.request<ResultListDocPalTypeRelated, ResultString | (ResultString | Result)>({
        path: `/api/docpal/types/name/${name}/related`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocPalTypeController
     * @name FindAllMetadata
     * @summary Query all metadata list of the docpal type through name
     * @request GET:/api/docpal/types/name/{name}/metadatas
     */
    findAllMetadata: (name: string, params: RequestParams = {}) =>
      this.request<ResultListDocPalTypeMetadataDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/types/name/${name}/metadatas`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocPalTypeController
     * @name CompareIntersection
     * @summary Compare metadata differences between two DocPal types
     * @request GET:/api/docpal/types/compare/intersection
     */
    compareIntersection: (oldDocPalType: string, newDocPalType: string, params: RequestParams = {}) =>
      this.request<ResultDocPalTypeDistinction, ResultString | (ResultString | Result)>({
        path: `/api/docpal/types/compare/intersection`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocPalTypeController
     * @name FindActive
     * @summary Find all docpal type
     * @request GET:/api/docpal/types/active
     */
    findActive: (params: RequestParams = {}) =>
      this.request<ResultListDocumentTypeDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/types/active`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name VerifyKeycloakToken
     * @request GET:/api/docpal/systemfeature/keycloak-token-verification
     */
    verifyKeycloakToken: (params: RequestParams = {}) =>
      this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/keycloak-token-verification`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name GetFeatures
     * @request GET:/api/docpal/systemfeature/getFeatures
     */
    getFeatures: (params: RequestParams = {}) =>
      this.request<ResultMapStringBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/getFeatures`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name GetFeatures1
     * @request GET:/api/docpal/systemfeature/getFeatures/
     */
    getFeatures1: (params: RequestParams = {}) =>
      this.request<ResultMapStringBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/getFeatures/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name FindAll3
     * @request GET:/api/docpal/systemfeature/findAll/
     */
    findAll3: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/findAll/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags system-feature-controller
     * @name FindAll4
     * @request GET:/api/docpal/systemfeature/findAll
     */
    findAll4: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/systemfeature/findAll`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags form-properties-relation-controller
     * @name Query1
     * @request GET:/api/docpal/relation/query
     */
    query1: (
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
     * @name QueryLanguage
     * @request GET:/api/docpal/relation/queryLanguage
     */
    queryLanguage: (
      query: {
        language: LanguageEntity;
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
     * @name QueryLanguageLocale
     * @request GET:/api/docpal/relation/queryLanguageLocale
     * @deprecated
     */
    queryLanguageLocale: (params: RequestParams = {}) =>
      this.request<ResultSetString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/relation/queryLanguageLocale`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags form-properties-relation-controller
     * @name IsLdapMode
     * @summary is Ldap Mode
     * @request GET:/api/docpal/relation/isLdapMode
     */
    isLdapMode: (params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/relation/isLdapMode`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags form-properties-relation-controller
     * @name IniteLanguageCache
     * @request GET:/api/docpal/relation/initeLanguageCache
     */
    initeLanguageCache: (params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/relation/initeLanguageCache`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags form-properties-relation-controller
     * @name GetKeyCloakProperty
     * @summary get keyCloakProperty
     * @request GET:/api/docpal/relation/getKeyCloakProperty
     */
    getKeyCloakProperty: (params: RequestParams = {}) =>
      this.request<ResultKeyCloakPropertyVO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/relation/getKeyCloakProperty`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name FindAllPolicies
     * @summary Obtain all retention policy
     * @request GET:/api/docpal/policy/retentions
     */
    findAllPolicies: (params: RequestParams = {}) =>
      this.request<ResultListRetentionPolicy, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name FindPolicyEvents
     * @summary Get policy events through policy id
     * @request GET:/api/docpal/policy/retentions/{retentionPolicyId}/events
     */
    findPolicyEvents: (retentionPolicyId: number, params: RequestParams = {}) =>
      this.request<ResultListRetentionPolicyEvent, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/${retentionPolicyId}/events`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name ScanRecordExecuteExpiredFlow
     * @request GET:/api/docpal/policy/retentions/{policyId}/scan/expired
     */
    scanRecordExecuteExpiredFlow: (policyId: number, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/${policyId}/scan/expired`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name ScanDocumentToUseRetentionPolicy
     * @summary Scan all documents to find the list of documents that match this retention policy
     * @request GET:/api/docpal/policy/retentions/{policyId}/scan/document
     */
    scanDocumentToUseRetentionPolicy: (policyId: number, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/${policyId}/scan/document`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name FindPolicies
     * @summary Obtain a retention policy details
     * @request GET:/api/docpal/policy/retentions/{id}
     */
    findPolicies: (id: number, params: RequestParams = {}) =>
      this.request<ResultRetentionPolicyResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name ScanRecordExecuteExpiredFlow1
     * @summary Scan all expired documents to find the list of documents that match all retention policy
     * @request GET:/api/docpal/policy/retentions/scan/expired
     */
    scanRecordExecuteExpiredFlow1: (params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/scan/expired`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name ScanDocumentToUseRetentionPolicy1
     * @summary Scan all documents to find the list of documents that match all retention policy
     * @request GET:/api/docpal/policy/retentions/scan/document
     */
    scanDocumentToUseRetentionPolicy1: (params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/scan/document`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name FindPolicyEvents1
     * @summary Get all policy events
     * @request GET:/api/docpal/policy/retentions/events
     */
    findPolicyEvents1: (params: RequestParams = {}) =>
      this.request<ResultMapLongListRetentionPolicyEvent, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/events`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name FindById
     * @summary Obtain retention policy detail
     * @request GET:/api/docpal/policy/retentions/document/{id}
     */
    findById: (id: number, params: RequestParams = {}) =>
      this.request<ResultRetentionPolicyDocument, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/document/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RetentionPolicyController
     * @name GetPageConditions
     * @summary Obtain all conditions that has been used
     * @request GET:/api/docpal/policy/retentions/document/page/conditions
     */
    getPageConditions: (params: RequestParams = {}) =>
      this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/retentions/document/page/conditions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HoldPolicyController
     * @name FindAll5
     * @summary Query all hold policy
     * @request GET:/api/docpal/policy/holds
     */
    findAll5: (params: RequestParams = {}) =>
      this.request<ResultListHoldPolicy, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/holds`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HoldPolicyController
     * @name Get13
     * @summary Obtain hold policy detail
     * @request GET:/api/docpal/policy/holds/{id}
     */
    get13: (id: number, params: RequestParams = {}) =>
      this.request<ResultHoldPolicy, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/holds/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PolicyDocumentController
     * @name Get14
     * @summary Obtain policy document detail
     * @request GET:/api/docpal/policy/documents/{id}
     */
    get14: (id: number, params: RequestParams = {}) =>
      this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/documents/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PolicyDocumentController
     * @name DeleteById
     * @request DELETE:/api/docpal/policy/documents/{id}
     */
    deleteById: (id: number, params: RequestParams = {}) =>
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
     * @name FindDocumentPolicy
     * @summary Obtain policy who document used
     * @request GET:/api/docpal/policy/documents/document/{documentId}
     */
    findDocumentPolicy: (documentId: string, params: RequestParams = {}) =>
      this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/documents/document/${documentId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PolicyDocumentController
     * @name FindApprovalDocumentPolicy
     * @summary Query my policy who document used
     * @request GET:/api/docpal/policy/documents/document/{documentId}/approval
     */
    findApprovalDocumentPolicy: (documentId: string, params: RequestParams = {}) =>
      this.request<ResultPolicyDocument, ResultString | (ResultString | Result)>({
        path: `/api/docpal/policy/documents/document/${documentId}/approval`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationRecordController
     * @name UnReadNumber
     * @summary Query count number of unread for current login user
     * @request GET:/api/docpal/notification/unRead/number
     */
    unReadNumber: (params: RequestParams = {}) =>
      this.request<any, ResultString | (ResultString | Result) | void>({
        path: `/api/docpal/notification/unRead/number`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationSubscriberController
     * @name Folders
     * @summary Find folder list of subscriber
     * @request GET:/api/docpal/notification/subscriber/{subscriber}/folders
     */
    folders: (subscriber: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/subscriber/${subscriber}/folders`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationSubscriberController
     * @name Get15
     * @summary Query whether the user is subscribed to the directory
     * @request GET:/api/docpal/notification/subscriber/subscriber/{subscriber}/idOrPath/{idOrPath}
     */
    get15: (subscriber: string, idOrPath: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/subscriber/subscriber/${subscriber}/idOrPath/${idOrPath}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationSubscriberController
     * @name Remove3
     * @summary Remove notification subscriber
     * @request DELETE:/api/docpal/notification/subscriber/subscriber/{subscriber}/idOrPath/{idOrPath}
     */
    remove3: (subscriber: string, idOrPath: string, params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/subscriber/subscriber/${subscriber}/idOrPath/${idOrPath}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationSettingController
     * @name FindByType
     * @summary All list of notification setting
     * @request GET:/api/docpal/notification/setting/type/{type}/all
     */
    findByType: (type: "SUB_DOCUMENT" | "SUBSCRIPTION", params: RequestParams = {}) =>
      this.request<Result, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/setting/type/${type}/all`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationSettingController
     * @name QueryModuleName
     * @request GET:/api/docpal/notification/setting/module_name
     */
    queryModuleName: (params: RequestParams = {}) =>
      this.request<ResultListString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/setting/module_name`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationRecordController
     * @name QueryNotificationUnreadCountList
     * @request GET:/api/docpal/notification/query_notification_unread_count_list
     */
    queryNotificationUnreadCountList: (params: RequestParams = {}) =>
      this.request<ResultListNotificationUnreadCountDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/notification/query_notification_unread_count_list`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MasterTableController
     * @name FindAll6
     * @summary Get all master tables
     * @request GET:/api/docpal/master/tables
     */
    findAll6: (params: RequestParams = {}) =>
      this.request<ResultListMasterTableResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/master/tables`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MasterTableController
     * @name GetById4
     * @summary Get data structure of master table and include associated table structures
     * @request GET:/api/docpal/master/tables/{id}
     */
    getById4: (id: string, params: RequestParams = {}) =>
      this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/master/tables/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MasterTableController
     * @name GetTableStructure
     * @summary Get data structure of master table，but not relation fields
     * @request GET:/api/docpal/master/tables/{id}/structure
     */
    getTableStructure: (id: string, params: RequestParams = {}) =>
      this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/master/tables/${id}/structure`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MasterTableController
     * @name QueryAcls
     * @summary Obtain all permission of current master table
     * @request GET:/api/docpal/master/tables/{id}/acls
     */
    queryAcls: (id: string, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/master/tables/${id}/acls`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MasterTableController
     * @name FindRecords
     * @summary query records with related fields of master table
     * @request GET:/api/docpal/master/tables/records
     */
    findRecords: (
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
     * @name FindByName2
     * @summary Obtain structure of master table through table label
     * @request GET:/api/docpal/master/tables/name/{name}
     */
    findByName2: (name: string, params: RequestParams = {}) =>
      this.request<ResultMasterTableResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/master/tables/name/${name}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags InternalShareController
     * @name InitScheduler
     * @request GET:/api/docpal/internalShare/initScheduler
     */
    initScheduler: (
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
     * @name InitScheduler1
     * @request GET:/api/docpal/internalShare/initScheduler/
     */
    initScheduler1: (
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

    /**
     * No description
     *
     * @tags FormDesignController
     * @name FindAll7
     * @summary Query form design
     * @request GET:/api/docpal/form/design
     */
    findAll7: (
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
     * @name DeleteRecord
     * @request DELETE:/api/docpal/form/design
     */
    deleteRecord: (
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
     * @name GetReleaseById
     * @summary Retrieve form design
     * @request GET:/api/docpal/form/design/{id}/detail
     */
    getReleaseById: (id: string, params: RequestParams = {}) =>
      this.request<ResultFormDesignResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/form/design/${id}/detail`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DAMSettingController
     * @name GetAllSetting
     * @request GET:/api/docpal/dam/settings
     */
    getAllSetting: (params: RequestParams = {}) =>
      this.request<ResultMapStringListDAMConversionSetting, ResultString | (ResultString | Result)>({
        path: `/api/docpal/dam/settings`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindAllCaseType
     * @summary Retrieve all case types
     * @request GET:/api/docpal/case/types
     */
    findAllCaseType: (
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
     * @name GetStyleJson
     * @summary Query style json of cmmn xml
     * @request GET:/api/docpal/case/types/{id}/styleJson
     */
    getStyleJson: (id: string, params: RequestParams = {}) =>
      this.request<ResultString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${id}/styleJson`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name GetStartHumanTask
     * @summary Retrieve start humanTask of a case model definition
     * @request GET:/api/docpal/case/types/{id}/startTask
     */
    getStartHumanTask: (
      id: string,
      query?: {
        startMatchSign?: string;
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
     * @name Get16
     * @summary Retrieve case type detail
     * @request GET:/api/docpal/case/types/{caseTypeId}
     */
    get16: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultCaseTypeResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindCaseTableByCaseType
     * @summary Retrieve the list of case tables that belong to the specified case type
     * @request GET:/api/docpal/case/types/{caseTypeId}/tables
     */
    findCaseTableByCaseType: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultListCaseTable, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/tables`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name GetDataPageConditions
     * @summary Obtain all conditions that Pagination Search data of deployed case type
     * @request GET:/api/docpal/case/types/{caseTypeId}/records/page/conditions
     */
    getDataPageConditions: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/records/page/conditions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindPrimaryForm
     * @summary Get information form of case type
     * @request GET:/api/docpal/case/types/{caseTypeId}/primaryForm
     */
    findPrimaryForm: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/primaryForm`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindAllPermission
     * @request GET:/api/docpal/case/types/{caseTypeId}/permissions
     */
    findAllPermission: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/permissions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name GetMaxPermission
     * @request GET:/api/docpal/case/types/{caseTypeId}/permissions/{userId}
     */
    getMaxPermission: (caseTypeId: string, userId: string, params: RequestParams = {}) =>
      this.request<ResultMapStringString, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/permissions/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindAllCaseInstance
     * @summary Retrieve all case instances of this case type
     * @request GET:/api/docpal/case/types/{caseTypeId}/instances
     */
    findAllCaseInstance: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnInstance, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/instances`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindDeployLatestVersion
     * @summary Query cmmn version information of the last successfully deployed version
     * @request GET:/api/docpal/case/types/{caseTypeId}/deploy/version
     */
    findDeployLatestVersion: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultCaseModelDraft, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/deploy/version`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindSupportPermissionRules
     * @summary Retrieve case type permission rules
     * @request GET:/api/docpal/case/types/permissions/rules
     */
    findSupportPermissionRules: (params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/permissions/rules`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindAllByPermission
     * @summary Find out what cases the logged-in user can see.
     * @request GET:/api/docpal/case/types/my
     */
    findAllByPermission: (params: RequestParams = {}) =>
      this.request<ResultListCaseType, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/my`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name GetInformation
     * @summary Retrieve a information of a case type
     * @request GET:/api/docpal/case/types/information/{id}
     */
    getInformation: (id: string, params: RequestParams = {}) =>
      this.request<ResultCaseTypeInfo, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/information/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name FindAllInformation
     * @summary Query all information of a case type
     * @request GET:/api/docpal/case/types/information/list
     */
    findAllInformation: (
      query: {
        caseTypeId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultListCaseTypeInfo, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/information/list`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseInstanceController
     * @name FindPlanItemInstanceOfMilestone
     * @summary Obtain Milestone Status of a case instance
     * @request GET:/api/docpal/case/instance/{caseInstanceId}/milestone/status
     */
    findPlanItemInstanceOfMilestone: (caseInstanceId: string, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/${caseInstanceId}/milestone/status`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindForm
     * @summary Retrieve all forms through a case instance
     * @request GET:/api/docpal/case/instance/{caseInstanceId}/forms
     */
    findForm: (caseInstanceId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/${caseInstanceId}/forms`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindUserEvents
     * @summary Retrieve all events from a case instance
     * @request GET:/api/docpal/case/instance/{caseInstanceId}/events
     */
    findUserEvents: (caseInstanceId: string, params: RequestParams = {}) =>
      this.request<ResultListUserEventInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/${caseInstanceId}/events`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseInstanceController
     * @name FindTaskFormData
     * @summary Retrieve form information of task
     * @request GET:/api/docpal/case/instance/tasks/{taskId}/form
     */
    findTaskFormData: (taskId: string, params: RequestParams = {}) =>
      this.request<ResultCaseInstanceFormDataDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/tasks/${taskId}/form`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindProcessDefinitionByBusinessKey
     * @summary Retrieve process definition of this case instance through case definition key
     * @request GET:/api/docpal/case/instance/process/definitions
     */
    findProcessDefinitionByBusinessKey: (
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
     * @name FindPlanItemForm
     * @summary Retrieve form information of plan item instance
     * @request GET:/api/docpal/case/instance/planItems/{planItemId}/form
     */
    findPlanItemForm: (
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
     * @name FindAll8
     * @summary Retrieve all case instances of this case type
     * @request GET:/api/docpal/case/instance/list
     */
    findAll8: (
      query: {
        /** Case model dashboard (RequestDTO) */
        request: CmmnDashboardRequestDTO;
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
     * @tags CaseInstanceController
     * @name GetDetail
     * @summary Retrieve form information of task
     * @request GET:/api/docpal/case/instance/caseId/{caseId}
     */
    getDetail: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultCmmnInstance, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/instance/caseId/${caseId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindForms1
     * @summary Get the list of form properties associated with the process definition
     * @request GET:/api/docpal/case/forms
     */
    findForms1: (
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
     * @name GetForm1
     * @summary Get form properties of single element associated with the process definition
     * @request GET:/api/docpal/case/forms/{elementKey}
     */
    getForm1: (
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
     * @name FindAllCaseDefinition
     * @summary Retrieve all case model definitions
     * @request GET:/api/docpal/case/definitions
     */
    findAllCaseDefinition: (params: RequestParams = {}) =>
      this.request<ResultListCaseDefinitionDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/definitions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindAllCaseInstance1
     * @summary Retrieve all running case instances of this case model
     * @request GET:/api/docpal/case/definitions/{caseDefinitionKey}/instances
     */
    findAllCaseInstance1: (caseDefinitionKey: string, params: RequestParams = {}) =>
      this.request<ResultListCaseInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/definitions/${caseDefinitionKey}/instances`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindProcessDefinition
     * @summary Retrieve process definition of this case instance through case definition key
     * @request GET:/api/docpal/case/definition/{caseDefinitionKey}/process/definitions
     */
    findProcessDefinition: (caseDefinitionKey: string, params: RequestParams = {}) =>
      this.request<ResultListProcessDefinitionDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/definition/${caseDefinitionKey}/process/definitions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name Get17
     * @summary Retrieve case dashboard detail
     * @request GET:/api/docpal/case/dashboard/{id}
     */
    get17: (id: string, params: RequestParams = {}) =>
      this.request<ResultCmmnDashboard, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindMilestonePlanItemInstances
     * @summary Obtain Milestone Status of a case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseInstanceId}/milestone/status
     */
    findMilestonePlanItemInstances: (caseInstanceId: string, params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseInstanceId}/milestone/status`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindTasks1
     * @summary Retrieve tasks of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/tasks
     */
    findTasks1: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/tasks`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindStageProcess
     * @summary Retrieve Stage planItem Instances of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/stages
     */
    findStageProcess: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/stages`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name QueryProcessInstancePageCondition
     * @summary Obtain process instance conditions that has been used
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/process/instance/page/conditions
     */
    queryProcessInstancePageCondition: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/process/instance/page/conditions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindPrimaryFormData
     * @summary Retrieve information and information data of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/primaryForm/data
     */
    findPrimaryFormData: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultCaseInstanceFormDataDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/primaryForm/data`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindHistoryPlanItems
     * @summary Retrieve all PlanItem Instances of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/planItems
     */
    findHistoryPlanItems: (
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
     * @name FindPersonalTasks
     * @summary Retrieve personal tasks of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/personal/tasks
     */
    findPersonalTasks: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnTaskDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/personal/tasks`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindAvailableEvents
     * @summary Retrieve all events of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/events
     */
    findAvailableEvents: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/events`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindActivity
     * @summary Retrieve activities of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/activity
     */
    findActivity: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnActivityItem, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/activity`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindMyActions
     * @summary Retrieve my action list of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/{caseId}/actions
     */
    findMyActions: (caseId: string, params: RequestParams = {}) =>
      this.request<ResultListPlanItemInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/instance/${caseId}/actions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindPlanItemsOfStage
     * @summary Retrieve all planItem instance of this case instance
     * @request GET:/api/docpal/case/dashboard/instance/stage/planItems
     */
    findPlanItemsOfStage: (
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

    /**
     * No description
     *
     * @tags CaseModeController
     * @name FindAll9
     * @summary Show all dashboard views for this case type. (Case Dashboard)
     * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}
     */
    findAll9: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/caseType/${caseTypeId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name GetDataPageConditions1
     * @summary Obtain all conditions that paging search data of deployed case type
     * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/records/page/conditions
     */
    getDataPageConditions1: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/records/page/conditions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindPrimaryForm1
     * @summary Retrieve information of case type
     * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/primaryForm
     */
    findPrimaryForm1: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultCmmnPlanFormDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/primaryForm`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CmmnDashboardController
     * @name FindAllWithPermission
     * @summary Show all dashboard views that belong to the current user of this case type. (Case Dashboard)
     * @request GET:/api/docpal/case/dashboard/caseType/{caseTypeId}/permission
     */
    findAllWithPermission: (caseTypeId: string, params: RequestParams = {}) =>
      this.request<ResultListCmmnDashboard, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/dashboard/caseType/${caseTypeId}/permission`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name GetCondition
     * @summary Obtain conditions of pagination search
     * @request GET:/api/docpal/cabinet/{templateId}/page/conditions
     */
    getCondition: (templateId: string, params: RequestParams = {}) =>
      this.request<ResultListConditionResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${templateId}/page/conditions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name GetById5
     * @summary get folder cabinet template tree
     * @request GET:/api/docpal/cabinet/{id}
     */
    getById5: (id: string, params: RequestParams = {}) =>
      this.request<ResultDocFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name DeleteById1
     * @summary Delete folder cabinet
     * @request DELETE:/api/docpal/cabinet/{id}
     */
    deleteById1: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name FindSublistTransformTree
     * @summary Get template details for tree structure
     * @request GET:/api/docpal/cabinet/{id}/tree
     */
    findSublistTransformTree: (id: string, params: RequestParams = {}) =>
      this.request<ResultDocumentFolderCabinet, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${id}/tree`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name FindByPathPrefix
     * @request GET:/api/docpal/cabinet/{id}/prefix
     */
    findByPathPrefix: (id: string, params: RequestParams = {}) =>
      this.request<ResultFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${id}/prefix`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name FindAll10
     * @request GET:/api/docpal/cabinet/{id}/list
     */
    findAll10: (id: string, params: RequestParams = {}) =>
      this.request<ResultListDocumentFolderCabinet, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${id}/list`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name DownloadSummaryReport
     * @request GET:/api/docpal/cabinet/{id}/download/summary/report
     */
    downloadSummaryReport: (id: string, params: RequestParams = {}) =>
      this.request<string[], ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/${id}/download/summary/report`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name Detail
     * @summary Get detail of folder cabinet template
     * @request GET:/api/docpal/cabinet/template/{id}
     */
    detail: (id: string, params: RequestParams = {}) =>
      this.request<ResultFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/template/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name FindByIdToTree
     * @summary Get template details for tree structure
     * @request GET:/api/docpal/cabinet/template/{id}/tree
     */
    findByIdToTree: (id: string, params: RequestParams = {}) =>
      this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/template/${id}/tree`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name GetCurrentUserList
     * @summary Query all Top-level folder cabinet template
     * @request GET:/api/docpal/cabinet/template/list
     */
    getCurrentUserList: (
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
     * @name RefreshCompleteStatus
     * @request GET:/api/docpal/cabinet/refreshCompleteStatus/{id}
     */
    refreshCompleteStatus: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/refreshCompleteStatus/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name RefreshCompleteStatus1
     * @request GET:/api/docpal/cabinet/refresh/complete/status/{id}
     */
    refreshCompleteStatus1: (id: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/refresh/complete/status/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name SendNotification
     * @request GET:/api/docpal/cabinet/notification
     */
    sendNotification: (params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/notification`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name QueryCurrentUserFolderCabinets
     * @summary Query template list of Top-level folder cabinet that belong to current logged-in user
     * @request GET:/api/docpal/cabinet/loginUser/list
     */
    queryCurrentUserFolderCabinets: (params: RequestParams = {}) =>
      this.request<ResultListFolderCabinetResponseDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/cabinet/loginUser/list`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FolderCabinetController
     * @name GetExportFields
     * @summary Get export header list
     * @request GET:/api/docpal/cabinet/header/list
     */
    getExportFields: (
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

    /**
     * No description
     *
     * @tags Auto Generated Value
     * @name AcceptedCrId
     * @request GET:/api/docpal/auto/crId/accepted/
     */
    acceptedCrId: (
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
     * @name AcceptedCrId1
     * @request GET:/api/docpal/auto/crId/accepted
     */
    acceptedCrId1: (
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

    /**
     * No description
     *
     * @tags Job (Nuxeo)
     * @name QueryAiTopicId
     * @request GET:/api/ai/ask_ai/ai_chat/queryAiTopicId
     */
    queryAiTopicId: (params: RequestParams = {}) =>
      this.request<ResultAiTopicIdVO, ResultString | (ResultString | Result)>({
        path: `/api/ai/ask_ai/ai_chat/queryAiTopicId`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Job (Nuxeo)
     * @name QueryAiChatInitInfo
     * @request GET:/api/ai/ask_ai/ai_chat/queryAiChatInitInfo
     */
    queryAiChatInitInfo: (params: RequestParams = {}) =>
      this.request<ResultAiChatInitInfoVO, ResultString | (ResultString | Result)>({
        path: `/api/ai/ask_ai/ai_chat/queryAiChatInitInfo`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AclUserPermissionController
     * @name Delete1
     * @summary Remove permission of business
     * @request DELETE:/api/user/permission/business/{businessId}/user/{userId}/aces/{aces}
     */
    delete1: (businessId: string, userId: string, aces: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/user/permission/business/${businessId}/user/${userId}/aces/${aces}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name UnsubscribeDocument
     * @summary Unsubscribe to be notified
     * @request DELETE:/api/nuxeo/document/unsubscribe/
     */
    unsubscribeDocument: (
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
     * @name UnsubscribeDocument1
     * @summary Unsubscribe to be notified
     * @request DELETE:/api/nuxeo/document/unsubscribe
     */
    unsubscribeDocument1: (
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
     * @name DeleteTempFileById
     * @summary deleteTempFileById
     * @request DELETE:/api/nuxeo/document/tempFile/{id}
     */
    deleteTempFileById: (id: number, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/tempFile/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name DeleteTempFileById1
     * @summary deleteTempFileById
     * @request DELETE:/api/nuxeo/document/tempFile/{id}/
     */
    deleteTempFileById1: (id: number, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/tempFile/${id}/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name PurgeDocuments
     * @summary Purge the trashcan
     * @request DELETE:/api/nuxeo/document/purge/
     */
    purgeDocuments: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/purge/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name PurgeDocuments1
     * @summary Purge the trashcan
     * @request DELETE:/api/nuxeo/document/purge
     */
    purgeDocuments1: (params: RequestParams = {}) =>
      this.request<ResultListDocumentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/document/purge`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Document (Nuxeo)
     * @name RemoveFromFavorites
     * @summary Remove document from favorites
     * @request DELETE:/api/nuxeo/document/favorites/remove/
     */
    removeFromFavorites: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name RemoveFromFavorites1
     * @summary Remove document from favorites
     * @request DELETE:/api/nuxeo/document/favorites/remove
     */
    removeFromFavorites1: (data: DocumentRequestDTO[], params: RequestParams = {}) =>
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
     * @name DeleteFile
     * @request DELETE:/api/nuxeo/document/deleteFile/
     */
    deleteFile: (
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
     * @name DeleteFile1
     * @request DELETE:/api/nuxeo/document/deleteFile
     */
    deleteFile1: (
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
     * @name DeleteChildren
     * @summary Delete children of a document
     * @request DELETE:/api/nuxeo/document/deleteChildren
     */
    deleteChildren: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteChildren1
     * @summary Delete children of a document
     * @request DELETE:/api/nuxeo/document/deleteChildren/
     */
    deleteChildren1: (data: DocumentRequestDTO, params: RequestParams = {}) =>
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
     * @name RemovePermission
     * @request DELETE:/api/nuxeo/document/acl/remove/
     */
    removePermission: (
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
     * @name RemovePermission1
     * @request DELETE:/api/nuxeo/document/acl/remove
     */
    removePermission1: (
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

    /**
     * No description
     *
     * @tags Comment (Nuxeo)
     * @name DeleteComment
     * @summary Delete a document comment
     * @request DELETE:/api/nuxeo/comments/delete/
     */
    deleteComment: (data: CommentRequestDTO, params: RequestParams = {}) =>
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
     * @name DeleteComment1
     * @summary Delete a document comment
     * @request DELETE:/api/nuxeo/comments/delete
     */
    deleteComment1: (data: CommentRequestDTO, params: RequestParams = {}) =>
      this.request<ResultCommentDTO, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/comments/delete`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collection (Nuxeo)
     * @name Remove1
     * @summary Remove documents from collection
     * @request DELETE:/api/nuxeo/collection/remove
     */
    remove1: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
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
     * @name Remove2
     * @summary Remove documents from collection
     * @request DELETE:/api/nuxeo/collection/remove/
     */
    remove2: (data: DocumentCollectionRequestDTO, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/nuxeo/collection/remove/`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name DeleteProcessInstanceByCreator
     * @request DELETE:/api/docpal/workflow/process/deleteProcessInstanceByCreator
     */
    deleteProcessInstanceByCreator: (
      query: {
        processInstanceId: string;
        userId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/process/deleteProcessInstanceByCreator`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workflow
     * @name DeleteProcessInstanceByApprover
     * @request DELETE:/api/docpal/workflow/process/deleteProcessInstanceByApprover
     */
    deleteProcessInstanceByApprover: (
      query: {
        processInstanceId: string;
        userId: string;
        deleteReason?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultListInstanceDTO, ResultString | (ResultString | Result)>({
        path: `/api/docpal/workflow/process/deleteProcessInstanceByApprover`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Audit Log
     * @name RemoveInvalidLogs
     * @request DELETE:/api/docpal/logs/recent/document/logs
     */
    removeInvalidLogs: (params: RequestParams = {}) =>
      this.request<ResultObject, ResultString | (ResultString | Result)>({
        path: `/api/docpal/logs/recent/document/logs`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CaseTypeController
     * @name DeleteCaseInstance
     * @summary Delete case instance of this case type
     * @request DELETE:/api/docpal/case/types/{caseTypeId}/instance/{caseId}
     */
    deleteCaseInstance: (caseTypeId: string, caseId: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/docpal/case/types/${caseTypeId}/instance/${caseId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags DocBlockPermissionController
     * @name Delete12
     * @summary Delete block permission
     * @request DELETE:/api/block/permission/document/{docId}/path/{docPath}
     */
    delete12: (docId: string, docPath: string, params: RequestParams = {}) =>
      this.request<ResultBoolean, ResultString | (ResultString | Result)>({
        path: `/api/block/permission/document/${docId}/path/${docPath}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identity (Nuxeo)
     * @name IsCanModified
     * @summary group is can modified ?
     * @request GET:/api/nuxeo/identity/isCanModified
     */
    isCanModified: (
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
     * @name IsCanModified3
     * @summary group is can modified ?
     * @request PUT:/api/nuxeo/identity/isCanModified
     */
    isCanModified3: (
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
     * @name IsCanModified2
     * @summary group is can modified ?
     * @request POST:/api/nuxeo/identity/isCanModified
     */
    isCanModified2: (
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
     * @name IsCanModified5
     * @summary group is can modified ?
     * @request DELETE:/api/nuxeo/identity/isCanModified
     */
    isCanModified5: (
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
     * @name IsCanModified6
     * @summary group is can modified ?
     * @request OPTIONS:/api/nuxeo/identity/isCanModified
     */
    isCanModified6: (
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
     * @name IsCanModified1
     * @summary group is can modified ?
     * @request HEAD:/api/nuxeo/identity/isCanModified
     */
    isCanModified1: (
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
     * @name IsCanModified4
     * @summary group is can modified ?
     * @request PATCH:/api/nuxeo/identity/isCanModified
     */
    isCanModified4: (
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
}
