import * as path from 'path';
import { chalk } from '../utils/chalk.js';
import { 
  getPagesDir, 
  getExamplePackageDir, 
  normalizePackageName, 
  validatePackageName,
  existsSync,
  ensureDir,
  readdir,
  stat,
  copyFile,
  writeFile,
  remove,
  readFile
} from '../utils/path-utils.js';
import { GenerateOptions, PageConfig } from '../types/index.js';

export async function generatePage(options: GenerateOptions): Promise<void> {
  const { name, description, yes } = options;
  
  if (!validatePackageName(name)) {
    console.log(chalk.yellow(`Invalid page name: ${name}`));
    console.log(chalk.yellow('Page names must be lowercase, start with a letter, and contain only letters, numbers, and hyphens'));
    return;
  }

  const normalizedName = normalizePackageName(name);
  const pagesDir = getPagesDir();
  const targetDir = path.join(pagesDir, normalizedName);
  const exampleDir = getExamplePackageDir();

  // Check if page already exists
  if (existsSync(targetDir)) {
    console.log(chalk.red(`Page '${normalizedName}' already exists at ${targetDir}`));
    return;
  }

  // Gather additional information if not provided
  let pageConfig: PageConfig;
  
  if (yes) {
    pageConfig = {
      name: normalizedName,
      description: description || `DocPal ${normalizedName} page`,
      route: `/${normalizedName}`
    };
  } else {
    // Dynamic import for inquirer
    const inquirer = await import('inquirer');
    const answers = await inquirer.default.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Page description:',
        default: description || `DocPal ${normalizedName} page`
      },
      {
        type: 'input',
        name: 'route',
        message: 'Page route (e.g., /admin/users):',
        default: `/${normalizedName}`
      }
    ]);

    pageConfig = {
      name: normalizedName,
      description: answers.description,
      route: answers.route
    };
  }

  try {
    console.log(chalk.blue(`Creating page '${normalizedName}'...`));

    // Create page directory
    await ensureDir(targetDir);

    // Copy example package structure
    await copyDirectory(exampleDir, targetDir, pageConfig);

    // Create page-specific directories
    await ensureDir(path.join(targetDir, 'components'));
    await ensureDir(path.join(targetDir, 'public'));
    await ensureDir(path.join(targetDir, 'src'));

    // Create a basic page component
    await createPageComponent(targetDir, pageConfig);

    console.log(chalk.green(`✅ Page '${normalizedName}' created successfully at ${targetDir}`));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.blue(`1. cd pages/${normalizedName}`));
    console.log(chalk.blue('2. pnpm install'));
    console.log(chalk.blue('3. Customize the page component'));
    console.log(chalk.blue('4. Start developing!'));
    
  } catch (error) {
    console.error(chalk.red('Error creating page:'), error);
    // Clean up on error
    if (existsSync(targetDir)) {
      await remove(targetDir);
    }
    throw error;
  }
}

async function copyDirectory(src: string, dest: string, config: PageConfig): Promise<void> {
  const files = await readdir(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    const fileStat = await stat(srcPath);
    
    if (fileStat.isDirectory()) {
      // Skip node_modules and dist directories
      if (file === 'node_modules' || file === 'dist' || file === '.playground') {
        continue;
      }
      await ensureDir(destPath);
      await copyDirectory(srcPath, destPath, config);
    } else {
      // Process file content based on file type
      if (file === 'package.json') {
        await processPackageJson(srcPath, destPath, config);
      } else if (file === 'nuxt.config.ts') {
        await processNuxtConfig(srcPath, destPath, config);
      } else if (file === 'tsconfig.json') {
        await copyFile(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  }
}

async function processPackageJson(srcPath: string, destPath: string, config: PageConfig): Promise<void> {
  let content = await readFile(srcPath, 'utf-8');
  
  // Replace placeholders with actual values
  content = content.replace(/"name": "example-package"/, `"name": "${config.name}-page"`);
  content = content.replace(/"description": "all DocPal module entry"/, `"description": "${config.description}"`);
  content = content.replace(/"version": "1.0.0"/, `"version": "1.0.0"`);
  content = content.replace(/"author": ""/, `"author": "DocPal Team"`);
  content = content.replace(/"license": "ISC"/, `"license": "ISC"`);
  
  await writeFile(destPath, content);
}

async function processNuxtConfig(srcPath: string, destPath: string, config: PageConfig): Promise<void> {
  let content = await readFile(srcPath, 'utf-8');
  
  // Update the config for the new page
  content = content.replace(
    '// https://nuxt.com/docs/api/configuration/nuxt-config',
    `// ${config.name} page configuration`
  );
  
  await writeFile(destPath, content);
}

async function createPageComponent(targetDir: string, config: PageConfig): Promise<void> {
  const pageComponentPath = path.join(targetDir, 'components', `${config.name}.vue`);
  
  const pageComponent = `<template>
  <div class="${config.name}-page">
    <h1>{{ config.name }}</h1>
    <p>{{ config.description }}</p>
    <p>Route: {{ config.route }}</p>
  </div>
</template>

<script setup lang="ts">
const config = {
  name: '${config.name}',
  description: '${config.description}',
  route: '${config.route}'
}
</script>

<style scoped>
.${config.name}-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  line-height: 1.6;
}
</style>
`;

  await writeFile(pageComponentPath, pageComponent);
}
