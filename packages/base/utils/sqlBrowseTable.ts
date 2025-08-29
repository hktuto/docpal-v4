
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
    nullable: true,
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
    nullable: true
  },
  {
    name: "documentType",
    type: 'TEXT',
    nullable: true
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
    nullable: true
  },
  {
    name: "name",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "source",
    type: 'TEXT',
    nullable: true
  },
  {
    name: "status",
    type: 'INTEGER',
    nullable: true
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
    nullable: true
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
    name: "idx_document_parentRef",
    columns: ["parentRef"],
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

export const apiToColumn = (apiData:DocumentApiData, options?: QueryOptions):DocumentColumnData => {
    return {...apiData,
      permissionIds: apiData.permissionIds ? apiData.permissionIds.join(',') : '',
      collections: apiData.collections ? apiData.collections.join(',') : '',
      contributors: apiData.contributors ? apiData.contributors.join(',') : '',
      tags: apiData.tags ? apiData.tags.join(',') : '',
      hold: apiData.hold ? JSON.stringify(apiData.hold) : "",
      retention: apiData.retention ? JSON.stringify(apiData.retention) : ""
    } as DocumentColumnData
  }
export const columnToApi = (columnData:DocumentColumnData):DocumentApiData => {
  return {
    ...columnData,
    permissionIds: columnData.permissionIds ? columnData.permissionIds.split(',').map(Number) : [],
    collections: columnData.collections ? columnData.collections.split(',') : [],
    contributors: columnData.contributors ? columnData.contributors.split(',') : [],
    tags: columnData.tags ? columnData.tags.split(',') : [],
  }
}
  

