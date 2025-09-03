import * as path from 'path';
import fs from 'fs-extra';
export function getWorkspaceRoot() {
    let currentDir = process.cwd();
    // Walk up the directory tree to find the workspace root
    while (currentDir !== path.dirname(currentDir)) {
        const pnpmWorkspacePath = path.join(currentDir, 'pnpm-workspace.yaml');
        if (fs.existsSync(pnpmWorkspacePath)) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    throw new Error('Could not find workspace root (pnpm-workspace.yaml not found)');
}
export function getPackagesDir() {
    const workspaceRoot = getWorkspaceRoot();
    return path.join(workspaceRoot, 'packages');
}
export function getPagesDir() {
    const workspaceRoot = getWorkspaceRoot();
    return path.join(workspaceRoot, 'pages');
}
export function getExamplePackageDir() {
    const workspaceRoot = getWorkspaceRoot();
    return path.join(workspaceRoot, 'example-package');
}
export function normalizePackageName(name) {
    // Convert to kebab-case and ensure it's valid
    return name
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
}
export function validatePackageName(name) {
    const normalized = normalizePackageName(name);
    return normalized.length > 0 && /^[a-z][a-z0-9-]*$/.test(normalized);
}
// Export fs functions for use in generators
export const { existsSync, ensureDir, readdir, stat, copyFile, writeFile, remove, readFile } = fs;
//# sourceMappingURL=path-utils.js.map