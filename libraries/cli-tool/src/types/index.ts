export interface GenerateOptions {
  name: string;
  description?: string;
  yes?: boolean;
}

export interface PackageConfig {
  name: string;
  description: string;
  version: string;
  author: string;
  license: string;
}

export interface PageConfig {
  name: string;
  description: string;
  route: string;
}

export type PackageType = 'package' | 'page';
