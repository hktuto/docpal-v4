

export const menuList: MenuItem[] = [
  // { feature: "SEARCH", name: "file_search", routeName: "search", url: "/search", icon: "/icons/menu/search.svg", 
  //   order: 1, condition: "search"
  // },
  { feature: "CORE", name: "adminMenu.User", routeName: "user", url: "/user", icon: "/icons/menu/userManage.svg", 
    order: 1, parentId: "adminMenu.UserAndGroup"
  },
  { feature: "CORE", name: "adminMenu.group", routeName: "group", url: "/group", icon: "/icons/menu/group.svg", 
    order: 2, parentId: "adminMenu.UserAndGroup"
  },
  { feature: "BULK_IMPORT", name: "adminMenu.bulkImportConfig", routeName: "bulkImport", url: "/bulkImport", icon: "/icons/menu/bulkImportConfig.svg", 
    order: 11
  },
  { feature: "SHARE_EXTERNAL", name: "adminMenu.share", routeName: "shareList", url: "/shareList", icon: "/icons/menu/share.svg", 
    order: 25, parentId: "adminMenu.shareManage"
  },
  { feature: "SHARE_INTERNAL", name: "adminMenu.shareInternal", routeName: "shareInternal", url: "/shareInternal", icon: "/icons/menu/shareMe.svg", 
    order: 27, parentId: "adminMenu.shareManage"
  },
  { feature: "SMART_FOLDER", name: "adminMenu.smartFolder", routeName: "smartFolder", url: "/smartFolder", icon: "/icons/menu/preSearchConfig.svg", 
    order: 31, parentId: "adminMenu.browse", parentIcon: "/icons/menu/browser.svg"
  },
  { feature: "CORE", name: "adminMenu.documentType", routeName: "documentType", url: "/documentType", icon: "/icons/menu/meta.svg", 
    order: 32, parentId: "adminMenu.browse"
  },
  { feature: "FOLDER_CABINET", name: "adminMenu.folderCabinet", routeName: "folderCabinetSetting", url: "/folderCabinetSetting", icon: "/icons/menu/folderCabinet.svg", 
    order: 41
  },
  { feature: "DAM_FILE_CONVERTION", name: "adminMenu.DAM", routeName: "dam", url: "/dam", icon: "/icons/menu/dam.svg", 
    order: 51
  },
  { feature: "WATERMARK", name: "adminMenu.watermark", routeName: "watermark", url: "/watermark", icon: "/icons/menu/watermark.svg", 
    order: 61
  },
  { feature: "WORKFLOW", name: "adminMenu.runningWorkflow", routeName: "workflowManage", url: "/workflowManage", icon: "/icons/menu/workflow.svg",
    order: 71, parentId: "adminMenu.workflow"
  },
  { feature: "WORKFLOW", name: "adminMenu.WorkflowRetry", routeName: "workflow-retry", url: "/workflow-retry", icon: "/icons/menu/workflow-retry.svg",
    order: 72, parentId: "adminMenu.workflow"
  },
  { name: "adminMenu.workflowEditor", routeName: "workflowEditor", url: "/workflowEditor", icon: "/icons/menu/workflowEditor.svg", 
    order: 72, parentId: "adminMenu.workflow"
  },
  { feature: "DASHBOARD", name: "adminMenu.dashboard", routeName: "data-dashboard", url: "/data-dashboard", icon: "/icons/menu/dashboard.svg", 
    order: 81, parentId: "DASHBOARD"
  },
  { feature: "DASHBOARD", name: "adminMenu.workPanel", routeName: "personalDashboardManage", url: "/personalDashboardManage", icon: "/icons/menu/workbench.svg", 
    order: 80, parentId: "DASHBOARD"
  },
  { feature: "GENERATE_TEMPLATE", name: "adminMenu.template", routeName: "template", url: "/template", icon: "/icons/menu/docTemplate.svg", 
    order: 91, parentId: "adminMenu.templateManagement"
  },
  { feature: "EMAIL_TEMPLATE", name: "adminMenu.emailTemplate", routeName: "emailTemplate", url: "/emailTemplate", icon: "/icons/menu/mailConfig.svg", 
    order: 92, parentId: "adminMenu.templateManagement"
  },
  { feature: "HOLD_POLICIES", name: "adminMenu.holdPoliciesManage", routeName: "holdPoliciesManage", url: "/holdPoliciesManage", icon: "/icons/menu/holdPoliciesManage.svg", 
    order: 101, parentId: "adminMenu.policy", parentIcon: "/icons/menu/holdFile.svg"
  },
  { feature: "RETENTION_POLICIES", name: "adminMenu.retention", routeName: "retentionManage", url: "/retentionManage", icon: "/icons/menu/retention.svg", 
    order: 102, parentId: "adminMenu.policy"
  },
  { feature: "MASTER_TABLE", name: "adminMenu.masterTable", routeName: "master-table", url: "/master-table", icon: "/icons/menu/masterTable.svg", 
    order: 111
  },
  { feature: "VOCABULARY", name: "adminMenu.glossary", routeName: "vocabulary", url: "/vocabulary", icon: "/icons/menu/vocabulary.svg", 
    order: 121, role: ['ROLE_SUPER']
  },
  { menuFeature: ['AUDIT','LOG_MANAGE', 'DOCKER_LOG'], name: "adminMenu.log", icon: "/icons/menu/log.svg", 
    order: 141, parentId: "adminMenu.system", parentIcon: "/icons/menu/log.svg"
  },
  { feature: "LOG_MANAGE", name: "adminMenu.logManage", routeName: "logManage", url: "/logManage", icon: "/icons/menu/log.svg", 
    order: 1410, parentId: "adminMenu.log"
  },
  { feature: "AUDIT", name: "adminMenu.audit", routeName: "audit", url: "/audit", icon: "/icons/menu/log.svg", 
    order: 1411, parentId: "adminMenu.log", 
  },
  { feature: "DOCKER_LOG", name: "adminMenu.systemLog", routeName: "dockerLog", url: "/dockerLog", icon: "/icons/menu/dockerLog.svg", 
    order: 1413, parentId: "adminMenu.log", parentIcon: "/icons/menu/log.svg", role: ['ROLE_SUPER']
  },
  { feature: "JOB_STATUS", name: "adminMenu.message_queue", routeName: "messageQueue", url: "/messageQueue", icon: "/icons/menu/dockerLog.svg", 
    order: 145, parentId: "adminMenu.system", parentIcon: "/icons/menu/system.svg"
  },
  { feature: "CORE", name: "adminMenu.ACL", routeName: "acl", url: "/acl", icon: "/icons/menu/acl.svg", 
    order: 146, parentId: "adminMenu.system", parentIcon: "/icons/menu/system.svg"
  },
  { feature: "MAIL_CONFIG", name: "adminMenu.mailConfig", routeName: "mailConfig", url: "/mailConfig", icon: "/icons/menu/mailConfig.svg", 
    order: 147, parentId: "adminMenu.system", parentIcon: "/icons/menu/system.svg"
  },
  { feature: "AZURE_OCR", name: "adminMenu.azure", routeName: "azure", url: "/azure", icon: "/icons/menu/azure.svg", 
    order: 150
  },
  {
    name:"adminMenu.caseManagement", routeName:"caseManagement", url: "/caseManage", icon: "/icons/menu/briefcase.svg", 
    order: 160
  },
  {
    name:"adminMenu.easyForm", routeName:"easyFormManagement", url: "/easyFormManage", icon: "/icons/menu/easyForm.svg",
    order: 170
  },
  {
    name:"adminMenu.uniqueIdGenerator", routeName:"uniqueIdGenerator",url: "/uniqueIdGenerator", icon: "/icons/menu/uniqueIdGenerator.svg",
    order:180
  }
  // { feature: "DOCKER_LOG", name: "adminMenu.docker_log", routeName: "dockerLog", url: "/dockerLog", icon: "/icons/menu/dockerLog.svg", 
  //   order: 59, parentId: "adminMenu.system", parentIcon: "/icons/menu/system.svg"
  // },
  
]
