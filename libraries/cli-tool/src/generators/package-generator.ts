import * as path from 'path';
import { chalk } from '../utils/chalk.js';
import { 
  getPackagesDir, 
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
import { GenerateOptions, PackageConfig } from '../types/index.js';

export async function generatePackage(options: GenerateOptions): Promise<void> {
  const { name, description, yes } = options;
  
  if (!validatePackageName(name)) {
    console.log(chalk.yellow(`Invalid package name: ${name}`));
    console.log(chalk.yellow('Package names must be lowercase, start with a letter, and contain only letters, numbers, and hyphens'));
    return;
  }

  const normalizedName = normalizePackageName(name);
  const packagesDir = getPackagesDir();
  const targetDir = path.join(packagesDir, normalizedName);
  const exampleDir = getExamplePackageDir();

  // Check if package already exists
  if (existsSync(targetDir)) {
    console.log(chalk.red(`Package '${normalizedName}' already exists at ${targetDir}`));
    return;
  }

  // Gather additional information if not provided
  let packageConfig: PackageConfig;
  
  if (yes) {
    packageConfig = {
      name: normalizedName,
      description: description || `DocPal ${normalizedName} package`,
      version: '1.0.0',
      author: 'DocPal Team',
      license: 'ISC'
    };
  } else {
    // Dynamic import for inquirer
    const inquirer = await import('inquirer');
    const answers = await inquirer.default.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Package description:',
        default: description || `DocPal ${normalizedName} package`
      },
      {
        type: 'input',
        name: 'version',
        message: 'Package version:',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Package author:',
        default: 'DocPal Team'
      },
      {
        type: 'input',
        name: 'license',
        message: 'Package license:',
        default: 'ISC'
      }
    ]);

    packageConfig = {
      name: normalizedName,
      description: answers.description,
      version: answers.version,
      author: answers.author,
      license: answers.license
    };
  }

  try {
    console.log(chalk.blue(`Creating package '${normalizedName}'...`));

    // Create package directory
    await ensureDir(targetDir);

    // Copy example package structure
    await copyDirectory(exampleDir, targetDir, packageConfig);

    // Create package-specific directories
    await ensureDir(path.join(targetDir, 'components'));
    await ensureDir(path.join(targetDir, 'public'));
    await ensureDir(path.join(targetDir, 'src'));

    console.log(chalk.green(`✅ Package '${normalizedName}' created successfully at ${targetDir}`));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.blue(`1. cd packages/${normalizedName}`));
    console.log(chalk.blue('2. pnpm install'));
    console.log(chalk.blue('3. Start developing!'));
    
  } catch (error) {
    console.error(chalk.red('Error creating package:'), error);
    // Clean up on error
    if (existsSync(targetDir)) {
      await remove(targetDir);
    }
    throw error;
  }
}

async function copyDirectory(src: string, dest: string, config: PackageConfig): Promise<void> {
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

async function processPackageJson(srcPath: string, destPath: string, config: PackageConfig): Promise<void> {
  let content = await readFile(srcPath, 'utf-8');
  
  // Replace placeholders with actual values
  content = content.replace(/"name": "example-package"/, `"name": "${config.name}"`);
  content = content.replace(/"description": "all DocPal module entry"/, `"description": "${config.description}"`);
  content = content.replace(/"version": "1.0.0"/, `"version": "${config.version}"`);
  content = content.replace(/"author": ""/, `"author": "${config.author}"`);
  content = content.replace(/"license": "ISC"/, `"license": "${config.license}"`);
  
  await writeFile(destPath, content);
}

async function processNuxtConfig(srcPath: string, destPath: string, config: PackageConfig): Promise<void> {
  let content = await readFile(srcPath, 'utf-8');
  
  // Update the config for the new package
  content = content.replace(
    '// https://nuxt.com/docs/api/configuration/nuxt-config',
    `// ${config.name} package configuration`
  );
  
  await writeFile(destPath, content);
}
