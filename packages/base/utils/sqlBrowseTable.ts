
import type {ColumnDefinition} from '#imports'
export interface DocumentApiData {
  id: string,
  name: string,
  path: string,
  isFolder: boolean,
  modifiedDate: string,
  fileModifiedDate: string,
  fileSize: number,
  createdDate: string,
  source: string,
  uploadId: string,
  mimeType?: string,
  documentType: string,
  docPalType: string,
  contributors: string[],
  tags: string[],
  version:string,
  status: number,
  statusName: string,
  collections: string[],
  permissionIds: number[],
  hold: string,
  parentRef: string,
  retention: string,
}

export interface DocumentColumnData {
  id: string,
  name: string,
  path: string,
  parentRef: string,
  isFolder: boolean,
  modifiedDate: string,
  fileModifiedDate: string,
  fileSize: number,
  createdDate: string,
  source: string,
  uploadId: string,
  mimeType?: string,
  documentType: string,
  docPalType: string,
  contributors: string,
  tags: string,
  version:string,
  status: number,
  statusName: string,
  collections: string,
  permissionIds: string,
  hold: string,
  retention: string,
}

export const documentColumn:ColumnDefinition[] = [
  {
    name: 'id',
    type: 'TEXT',
    primaryKey: true,
    autoIncrement: false
  },
  {
    name: "path",
    type: 'TEXT',
    nullable: false,
  },
  {
    name: "isFolder",
    type: 'BOOLEAN',
    nullable: false,
    default: false
  },
  {
    name: "collections",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "contributors",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "createdDate",
    type: 'DATE',
    nullable: false
  },
  {
    name: "docPalType",
    type: 'TEXT',
    nullable: false
  },
  {
    name: "documentType",
    type: 'TEXT',
    nullable: false
  },
  {
    name: "fileModifiedDate",
    type: 'DATE',
    nullable: true
  },
  {
    name: "fileSize",
    type: 'INTEGER',
    nullable: true,
    default: 0
  },
  {
    name: "modifiedDate",
    type: 'DATE',
    nullable: false
  },
  {
    name: "name",
    type: 'TEXT',
    nullable: false
  },
  {
    name: "source",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "status",
    type: 'INTEGER',
    nullable: false
  },
  {
    name: "statusName",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "uploadId",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "version",
    type: 'TEXT',
    nullable: false
  },
  {
    name: "mimeType",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "tags",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "permissionIds",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "hold",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "parentRef",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "retention",
    type: 'TEXT',
    nullable: true
  }
]

export const documentIndex:IndexDefinition[] = [
  {
    name: "idx_document_name",
    columns: ["name"],
    unique: false
  },
  {
    name: "idx_document_parentId",
    columns: ["parentId"],
    unique: false
  },
  {
    name: "idx_document_path",
    columns: ["path"],
    unique: false
  },
  {
    name: "idx_document_createdDate",
    columns: ["createdDate"],
    unique: false
  },
  {
    name: "idx_document_modifiedDate",
    columns: ["modifiedDate"],
    unique: false
  }
]



export const documentTransformers = {
  apiToColumn: (apiData:DocumentApiData, options?: QueryOptions):DocumentColumnData => {
    return {...apiData,
    permissionIds: apiData.permissionIds ? apiData.permissionIds.join(',') : '',
    collections: apiData.collections ? apiData.collections.join(',') : '',
    contributors: apiData.contributors ? apiData.contributors.join(',') : '',
    tags: apiData.tags ? apiData.tags.join(',') : '',
    hold: apiData.hold ? JSON.stringify(apiData.hold) : "",
    retention: apiData.retention ? JSON.stringify(apiData.retention) : ""}
  },
  columnToApi: (columnData:DocumentColumnData):DocumentApiData => ({
    ...columnData,
    permissionIds: columnData.permissionIds ? columnData.permissionIds.split(',').map(Number) : [],
    collections: columnData.collections ? columnData.collections.split(',') : [],
    contributors: columnData.contributors ? columnData.contributors.split(',') : [],
    tags: columnData.tags ? columnData.tags.split(',') : [],
    isFolder: columnData.isFolder ? true : false,
    fileSize: columnData.fileSize ? columnData.fileSize : 0,
    status: columnData.status ? columnData.status : 0,
    statusName: columnData.statusName ? columnData.statusName : '',
    hold: columnData.hold ? JSON.parse(columnData.hold) : "",
    retention: columnData.retention ? JSON.parse(columnData.retention) : ""
  }),
  queryTransformer: (dbQueryOptions: QueryOptions) => {
    return {
      idOrPath: dbQueryOptions.where?.idOrPath || ''
    }
  }
}

