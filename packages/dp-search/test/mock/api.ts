
import { vi } from 'vitest'
import { 
  TABLE,
  defaultTableSetting,
  getJsonApi
} from '../../../../packages/dp-api'

export {
  TABLE,
  defaultTableSetting,
  getJsonApi}
// export const SaveSearchApi = async () => {
//   console.log("api mock success, getCommentList")
//   return [
//     { id: 1, label: 'Test Search 1', queryCondition: '{"key": "value1"}' },
//     { id: 2, label: 'Test Search 2', queryCondition: '{"key": "value2"}' },
//   ]
// }
export const SaveSearchApi = vi.fn(() => Promise.resolve(true))
export const GetSearchApi =  vi.fn(() => Promise.resolve([
    { id: 1, label: 'Test Search 1', queryCondition: '{"docId": "", "query": [{"matchs": [{"value": "学习", "option": {"synonyms": true, "fullMatch": false, "includeLanguages": ["chi_sim", "chi_tra"]}, "queryType": "keyword"}], "condition": "and"}], "condition": "and"}' },
    { id: 2, label: 'Test Search 2', queryCondition: '{"docId": "", "query": [{"matchs": [{"value": "test", "option": {"synonyms": false, "fullMatch": false, "includeLanguages": []}, "queryType": "keyword"}], "condition": "and"}], "condition": "and"}' },
  ]))
export const DeleteSearchApi = vi.fn(() => Promise.resolve(true))
export const getRecentDocumentPage = vi.fn(() => Promise.resolve())

export const SearchGroupGetApi = vi.fn(() => Promise.resolve({
  aggregation: {
    authors: [
      { "key": "Administrator","value": null, "count": 3727, "formatCount": 0, "subAgg": null }
    ]
  },
  entryList: [
    {
      "id": "d507f219-ec3c-43b4-91fe-6527b3326185",
      "name": "OY34",
      "description": "null",
      "path": "/default-domain/OY3",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "OOYY",
      "createdDate": "2024-08-08T09:43:36.241Z",
      "modifiedDate": "2024-09-11T01:55:04.707Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "OOYY",
        "uid:minor_version": 0,
        "dc:contributors": [
          "OOYY"
        ],
        "summarys": [
          {
            "summaryKey": "dpa:vendorName",
            "summaryValue": "8test"
          }
        ]
      },
      "parentRef": "2e978d7b-c71d-44e7-b977-81f44d1e1e14",
      "logicalPath": "default domain/OY34",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    }
  ],
  totalSize: 1
}))
export const mockQItem = {
  "id": "query17334550879741",
  "condition": "and",
  "matchs": [
      {
          "id": "matchs17334550879742",
          "queryType": "keyword",
          "value": "test",
          "type": "string",
          "option": {
              "matchCase": false,
              "fullMatch": false,
              "synonyms": false,
              "includeLanguages": [
                  
              ]
          }
      },
      {
          "id": "matchs17334551977203",
          "queryType": "keyword",
          "value": "test",
          "type": "string",
          "option": {
              "matchCase": false,
              "fullMatch": false,
              "synonyms": false,
              "includeLanguages": [
                  
              ]
          }
      }
  ]
};
