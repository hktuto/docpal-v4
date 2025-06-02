export const isFuture = (value: Date | string) => new Date(value).getTime() > Date.now(); 
