import fs from 'fs-extra';
export declare function getWorkspaceRoot(): string;
export declare function getPackagesDir(): string;
export declare function getPagesDir(): string;
export declare function getExamplePackageDir(): string;
export declare function normalizePackageName(name: string): string;
export declare function validatePackageName(name: string): boolean;
export declare const existsSync: typeof fs.existsSync, ensureDir: typeof fs.ensureDir, readdir: typeof import("fs").readdir.__promisify__ & typeof import("fs").readdir, stat: typeof import("fs").stat.__promisify__ & typeof import("fs").stat, copyFile: typeof import("fs").copyFile.__promisify__ & typeof import("fs").copyFile, writeFile: typeof import("fs").writeFile.__promisify__ & typeof import("fs").writeFile, remove: typeof fs.remove, readFile: typeof import("fs").readFile.__promisify__ & typeof import("fs").readFile;
//# sourceMappingURL=path-utils.d.ts.map