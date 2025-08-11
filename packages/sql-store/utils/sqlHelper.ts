type TableParams = {
  tableName: string,
  tableSchema: string,
  getTableData: (params:any) => Promise<any[]>,
  createRecord: (record: any) => Promise<any>,
  updateRecord: (record: any) => Promise<any>,
  deleteRecord: (record: any) => Promise<any>,
  patchRecord?: (record: any) => Promise<any>,
  dataToColumn: (record: any) => any,
  columnToData: (column: any) => any,
}

type TableEventResult = {
  success: boolean,
  error?: string,
  data?: any,
}

export const createTableEvent = ({
  tableName,
  tableSchema,
  getTableData,
  createRecord,
  updateRecord,
  deleteRecord,
  patchRecord,
  dataToColumn,
  columnToData,
}:TableParams) =>{

}
