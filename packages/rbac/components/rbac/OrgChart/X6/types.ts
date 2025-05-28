export interface OrgNode {
  id: string
  name: string
  grade?: string
  tag?: string
  children?: OrgNode[]
  style?: Record<string, string | number>
  parentId?: string,
  userCount?: number,
} 
