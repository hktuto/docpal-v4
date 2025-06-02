export const isPast = (value: Date | string) => new Date(value).getTime() < Date.now(); 
