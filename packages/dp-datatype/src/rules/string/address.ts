export const address = (value: string) => /[0-9]/.test(value) && /[a-zA-Z]/.test(value) && value.length >= 5; 
