export const validateHKID = (value: string) => /^[A-Z]{1,2}[0-9]{6}\([0-9A]\)$/.test(value); 
