export type SignatureSetting = {
  id: string // timestamp as a uuid
  type: "personal" | "company", // what type of signature 
  prefix: string, // signature prefix with template string replace
  suffix: string, // signature suffix with template string replace
  value: any, // acture value of the signature to replace with
  signBy?: string // userId of sign user
  company?:string // only when type is company, should store the company id
  signatureId?: string  // the signature to replace with
}


