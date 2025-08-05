

type MetadataGroup = 'DATA' | 'SYSTEM' | 'USER' | 'COMPREHENSIVE';

export const MASK_OPTIONS = [
  {
    label: 'MASK_ALL',
    value: 'Mask All'
  },
  {
    label: 'MASK_PREFIX',
    value: 'Mask Prefix'
  },
  {
    label: 'MASK_SUFFIX',
    value: 'Mask Suffix'
  }
]

// Base validation types
export type TextValidation = {
  validationRuleName: 'text';
  maxLength: number;
}

export type NumberValidation = {
  validationRuleName: 'number';
  minimum?: number;
  maximum?: number;
  decimal: number;
}

export type BooleanValidation = {
  validationRuleName: 'boolean';
}

export type SelectValidation = {
  validationRuleName: 'select';
  options: string[];
  isMultiple?: boolean;
}

export type DateValidation = {
  validationRuleName: 'date';
  dateOrDateTime: 'date' | 'dateTime';
  format: string,
  defaultValue ?: string
  isMultiple: false
}

export type DocumentValidation = {
  validationRuleName: 'document';
  isMultiple?: boolean;
}

export type CaseValidation = {
  validationRuleName: 'case';
  isMultiple?: boolean;
}

export type WorkflowValidation = {
  validationRuleName: 'workflow';
  isMultiple?: boolean;
}

export type MasterTableValidation = {
  validationRuleName: 'mastertable'; // Fixed writing method of the backend
  masterTableName: string,
  displayColumn: string,
  valueColumn: string,
  isMultiple: boolean
}

export type UserValidation = {
  validationRuleName: 'user';
  isMultiple: boolean
}

export type RoleValidation = {
  validationRuleName: 'user_role_user_group';
  allow?: "ALL" | "USER_ROLE" | "USER_GROUP";
  isMultiple: boolean
}



export type ObjectValidation = {
  validationRuleName: 'object';
  schema?: Record<string, any>;
}

export type ArrayValidation = {
  validationRuleName: 'array';
  itemType?: string;
  minItems?: number;
  maxItems?: number;
}

// Union of all validation types
type ValidationRule = 
  | TextValidation
  | NumberValidation
  | BooleanValidation
  | SelectValidation
  | DateValidation
  | DocumentValidation
  | CaseValidation
  | WorkflowValidation
  | MasterTableValidation
  | UserValidation
  | RoleValidation
  | ObjectValidation
  | ArrayValidation;

// Discriminated union for MetadataOption based on name
export type MetadataOption = 
  | { group: 'DATA'; name: 'Text'; validation: TextValidation }
  | { group: 'DATA'; name: 'Number'; validation: NumberValidation }
  | { group: 'DATA'; name: 'Boolean'; validation: BooleanValidation }
  | { group: 'DATA'; name: 'Select'; validation: SelectValidation }
  | { group: 'DATA'; name: 'Date'; validation: DateValidation }
  | { group: 'SYSTEM'; name: 'Document'; validation: DocumentValidation }
  | { group: 'SYSTEM'; name: 'Case'; validation: CaseValidation }
  | { group: 'SYSTEM'; name: 'Workflow'; validation: WorkflowValidation }
  | { group: 'SYSTEM'; name: 'MasterTable'; validation: MasterTableValidation }
  | { group: 'USER'; name: 'User'; validation: UserValidation }
  | { group: 'USER'; name: 'UserRoleUserGroup'; validation: RoleValidation };
  // | { group: 'COMPREHENSIVE'; name: 'Object'; validation: ObjectValidation }
  // | { group: 'COMPREHENSIVE'; name: 'Array'; validation: ArrayValidation };

export const METADATA_OPTIONS: {
  group : MetadataGroup,
  options: MetadataOption[]
}[] = [
  {
    group: 'DATA',
    options:[
      {
        group: 'DATA',
        name: "Text",
        validation: {
          validationRuleName: 'text',
          maxLength: 255
        }
      },
      {
        group: 'DATA',
        name: "Number",
        validation: {
          validationRuleName: 'number',
          minimum: -999999,
          maximum: 999999,
          decimal: 0
        }
      },
      {
        group: 'DATA',
        name: "Boolean",
        validation: {
          validationRuleName: 'boolean'
        }
      },
      {
        group: 'DATA',
        name: "Select",
        validation: {
          validationRuleName: 'select',
          options: [],
          isMultiple: false
        }
      },
      {
        group: 'DATA',
        name: "Date",
        validation: {
          validationRuleName: 'date',
          dateOrDateTime: 'date',
          format: 'YYYY-MM-DD',
          isMultiple: false
        }
      },
    ]
  },
  // SYSTEM OPTIONS
  {
    group: 'SYSTEM',
    options:[
      {
        group: 'SYSTEM',
        name: "Document",
        validation: {
          validationRuleName: 'document',
          isMultiple: false
        }
      },
      {
        group: 'SYSTEM',
        name: "Case",
        validation: {
          validationRuleName: 'case',
          isMultiple: false
        }
      },
      {
        group: 'SYSTEM',
        name: "Workflow",
        validation: {
          validationRuleName: 'workflow',
          isMultiple: false
        }
      },
      {
        group: 'SYSTEM',
        name: "MasterTable",
        validation: {
          validationRuleName: 'mastertable',
          masterTableName: '',
          displayColumn: '',
          valueColumn: '',
          isMultiple: false
        }
      },
    ]
  },

  // USER OPTIONS
  {
    group: 'USER',
    options:[
      {
        group: 'USER',
        name: "User",
        validation: {
          validationRuleName: 'user',
          isMultiple: false
        }
      },
      {
        group: 'USER',
        name: "UserRoleUserGroup",
        validation: {
          validationRuleName: 'user_role_user_group',
          allow: 'ALL',
          isMultiple: false
        }
      },
    ]
  }
  
  
  // COMPREHENSIVE OPTIONS
  // TODO : Add object and array validation
  // {
  //   group: 'COMPREHENSIVE',
  //   name: "OBJECT",
  //   validation: {
  //     validationRuleName: 'object'
  //   }
  // },
  // {
  //   group: 'COMPREHENSIVE',
  //   name: "ARRAY",
  //   validation: {
  //     validationRuleName: 'array'
  //   }
  // },
]

// Helper type to extract validation type for a specific metadata name
export type ValidationForName<T extends MetadataOption['name']> = Extract<MetadataOption, { name: T }>['validation'];

// Example usage:
// type TextValidationType = ValidationForName<'TEXT'>; // TextValidation
// type NumberValidationType = ValidationForName<'NUMBER'>; // NumberValidation
