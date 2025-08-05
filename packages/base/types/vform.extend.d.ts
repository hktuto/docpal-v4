export type VariableItem = {
    name: string,
    label: string,
    type: 'date' | 'input' | 'switch' | 'textarea' | 'number' | 'select',
    disabled: Boolean,
    hidden: Boolean,
    required: Boolean,
    // format?: string,
    options?: any,
    // maxLength?: number,
    // onValidate?: string
}
