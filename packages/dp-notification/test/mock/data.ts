class ResponseData {
  data: any;  
  code: number;  
  message: string;  
  result: boolean
  constructor(data: any, code: number = 200, msg: string = "success") {  
    this.data = data;  
    this.code = code;  
    this.message = msg;  
    this.result = true;
  }
}
class PaginationData {  
  // 类的属性  
  pageCount: number;  
  totalSize: number;  
  entryList: any;

  // 构造器  
  constructor(entryList: any, pageCount: number = 10, totalSize: number = 20) {  
      this.pageCount = pageCount;  
      this.totalSize = totalSize;  
      this.entryList = entryList
  }   
}   

export function trashApi() {
  console.log(2111111111111);
  
  const trashList = [
    {
      "id": "18cf171b-9fa9-4958-93cc-79a01c97c816",
      "name": "test3",
      "description": "null",
      "path": "/upload/automationtest/test3._1725588646776_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T02:09:04.588Z",
      "modifiedDate": "2024-09-06T02:09:04.618Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "test1",
        "dc:created": "2024-09-06T02:09:04.588Z",
        "dc:title": "test3",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T02:09:04.618Z",
        "dpa:country": "test",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T02:10:46.782Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/test3",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "8fadf73b-409d-4735-96c9-2af16272dcc9",
      "name": "will folder",
      "description": "null",
      "path": "/upload/automationtest/will folder._1725589788924_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T02:29:00.827Z",
      "modifiedDate": "2024-09-06T02:29:00.861Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T02:29:00.827Z",
        "dc:title": "will folder",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T02:29:00.861Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T02:29:48.925Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will folder",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "e50285c2-2024-4581-9464-5959b4ac4703",
      "name": "will folder",
      "description": "null",
      "path": "/upload/automationtest/will folder._1725590253425_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T02:31:14.817Z",
      "modifiedDate": "2024-09-06T02:31:14.877Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T02:31:14.817Z",
        "dc:title": "will folder",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T02:31:14.877Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T02:37:33.426Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will folder",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "c34388b0-349c-481a-a71e-e7440edf3869",
      "name": "will folder1",
      "description": "null",
      "path": "/upload/automationtest/will folder1._1725591003790_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T02:42:10.579Z",
      "modifiedDate": "2024-09-06T02:42:10.618Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T02:42:10.579Z",
        "dc:title": "will folder1",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T02:42:10.618Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T02:50:03.791Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will folder1",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "8a296238-a22d-4561-9864-5cf391a0ac19",
      "name": "will folder1",
      "description": "null",
      "path": "/upload/automationtest/will folder1._1725591176609_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T02:51:11.720Z",
      "modifiedDate": "2024-09-06T02:51:11.772Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T02:51:11.720Z",
        "dc:title": "will folder1",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T02:51:11.772Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T02:52:56.610Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will folder1",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "3f472e9f-fe47-4998-b6ee-1b5d11591e3f",
      "name": "will folder1",
      "description": "null",
      "path": "/upload/automationtest/will folder1._1725607954929_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T02:53:47.321Z",
      "modifiedDate": "2024-09-06T02:53:47.362Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T02:53:47.321Z",
        "dc:title": "will folder1",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T02:53:47.362Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T07:32:34.930Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will folder1",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "58c0930c-b0c0-433b-aa67-a11e0af4aaa3",
      "name": "will_folder_2qew14zf2xtkc4ui",
      "description": "null",
      "path": "/upload/automationtest/will_folder_2qew14zf2xtkc4ui._1725607957677_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T07:22:14.210Z",
      "modifiedDate": "2024-09-06T07:22:14.256Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T07:22:14.210Z",
        "dc:title": "will_folder_2qew14zf2xtkc4ui",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T07:22:14.256Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T07:32:37.680Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_2qew14zf2xtkc4ui",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "601c1471-5626-4329-8cf3-c48e74d3e473",
      "name": "will_folder_3t71hc9x1gsq3sw2",
      "description": "null",
      "path": "/upload/automationtest/will_folder_3t71hc9x1gsq3sw2._1725614564603_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T09:20:48.568Z",
      "modifiedDate": "2024-09-06T09:20:48.599Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T09:20:48.568Z",
        "dc:title": "will_folder_3t71hc9x1gsq3sw2",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T09:20:48.599Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T09:22:44.604Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_3t71hc9x1gsq3sw2",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "3a101820-af64-42f2-962e-3ec92c12d000",
      "name": "will_folder_5vtfkcdvz1qcxzdv",
      "description": "null",
      "path": "/upload/automationtest/will_folder_5vtfkcdvz1qcxzdv._1725612683202_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T08:15:11.986Z",
      "modifiedDate": "2024-09-06T08:15:12.023Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T08:15:11.986Z",
        "dc:title": "will_folder_5vtfkcdvz1qcxzdv",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T08:15:12.023Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T08:51:23.203Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_5vtfkcdvz1qcxzdv",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "66e6b295-3879-406e-8230-39ee96ce0eae",
      "name": "will_folder_7lw3xfi5rju5w0nz",
      "description": "null",
      "path": "/upload/automationtest/will_folder_7lw3xfi5rju5w0nz._1725612685930_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T08:24:17.108Z",
      "modifiedDate": "2024-09-06T08:24:17.153Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T08:24:17.108Z",
        "dc:title": "will_folder_7lw3xfi5rju5w0nz",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T08:24:17.153Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T08:51:25.932Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_7lw3xfi5rju5w0nz",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "638e7ecd-e079-4b1f-b73b-b2ab570e0002",
      "name": "will_folder_7pkr8t2jq58dvi7d",
      "description": "null",
      "path": "/upload/automationtest/will_folder_7pkr8t2jq58dvi7d._1725614567578_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T09:06:54.147Z",
      "modifiedDate": "2024-09-06T09:06:54.184Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T09:06:54.147Z",
        "dc:title": "will_folder_7pkr8t2jq58dvi7d",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T09:06:54.184Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T09:22:47.579Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_7pkr8t2jq58dvi7d",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "fab2d174-4f4c-4ceb-bef0-5dbb394c35db",
      "name": "will_folder_a2ukwstjupx7us3h",
      "description": "null",
      "path": "/upload/automationtest/will_folder_a2ukwstjupx7us3h._1725613515598_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T09:04:35.356Z",
      "modifiedDate": "2024-09-06T09:04:35.378Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T09:04:35.356Z",
        "dc:title": "will_folder_a2ukwstjupx7us3h",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T09:04:35.378Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T09:05:15.599Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_a2ukwstjupx7us3h",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "08e16539-821d-45e7-8466-9c060ea621b1",
      "name": "will_folder_ap9epfj9rcf49ij0",
      "description": "null",
      "path": "/upload/automationtest/will_folder_ap9epfj9rcf49ij0._1725612688745_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T08:13:21.254Z",
      "modifiedDate": "2024-09-06T08:13:21.292Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T08:13:21.254Z",
        "dc:title": "will_folder_ap9epfj9rcf49ij0",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T08:13:21.292Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T08:51:28.750Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_ap9epfj9rcf49ij0",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "e935e023-fe06-472d-8a9e-16ebf202f179",
      "name": "will_folder_cfxlrwq0k576sc3c",
      "description": "null",
      "path": "/upload/automationtest/will_folder_cfxlrwq0k576sc3c._1725614570341_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T09:21:52.039Z",
      "modifiedDate": "2024-09-06T09:21:52.079Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T09:21:52.039Z",
        "dc:title": "will_folder_cfxlrwq0k576sc3c",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T09:21:52.079Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T09:22:50.342Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_cfxlrwq0k576sc3c",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    },
    {
      "id": "790ac5df-fad8-4def-a62f-1ed4ce3b96bd",
      "name": "will_folder_kjzzk83uoqfl74f7",
      "description": "null",
      "path": "/upload/automationtest/will_folder_kjzzk83uoqfl74f7._1725607961087_.trashed",
      "type": "Folder",
      "version": "0.0",
      "createdBy": "will_du",
      "createdDate": "2024-09-06T07:27:15.388Z",
      "modifiedDate": "2024-09-06T07:27:15.426Z",
      "isFolder": true,
      "isCheckedOut": true,
      "properties": {
        "dc:creator": "will_du",
        "uid:minor_version": 0,
        "dc:lastContributor": "will_du",
        "dpa:vendorName": "will",
        "dc:created": "2024-09-06T07:27:15.388Z",
        "dc:title": "will_folder_kjzzk83uoqfl74f7",
        "common:icon": "/img/folder.gif",
        "dpa:docpalType": "Folder",
        "uid:major_version": 0,
        "dc:modified": "2024-09-06T07:27:15.426Z",
        "dpa:country": "hk",
        "dc:contributors": [
          "will_du"
        ],
        "trashed_date": "2024-09-06T07:32:41.089Z",
        "principalName": "will_du"
      },
      "parentRef": "9118444f-dfaf-4f1e-ade3-4c6b5d4f707c",
      "logicalPath": "upload/automationtest/will_folder_kjzzk83uoqfl74f7",
      "auditComment": null,
      "auditName": null,
      "permissionName": null
    }
  ]
  console.log(new PaginationData(trashList));
  return new PaginationData(trashList);
}

export function getNotiUnreadCount () {
  const data = [
    { "unreadCount": 0, "type": "Document-Acl" },
    { "unreadCount": 1, "type": "Ai-analysis" },
    { "unreadCount": 0, "type": "Workflow" },
    { "unreadCount": 0, "type": "Document-Share" },
    { "unreadCount": 11, "type": "Document" },
    { "unreadCount": 0, "type": "Upload-Request" }
  ]
  return new ResponseData(data)
}