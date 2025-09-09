#!/usr/bin/env node
import { Command } from 'commander';
import { generatePackage } from './generators/package-generator.js';
import { generatePage } from './generators/page-generator.js';
import { chalk } from './utils/chalk.js';
const program = new Command();
program
    .name('docpal')
    .description('CLI tool for generating new packages and pages in DocPal monorepo')
    .version('1.0.0');
program
    .command('generate')
    .alias('g')
    .description('Generate a new package or page')
    .option('-t, --type <type>', 'Type of generation: package or page')
    .option('-n, --name <name>', 'Name of the package/page')
    .option('-d, --description <description>', 'Description of the package/page')
    .option('-y, --yes', 'Skip confirmation prompts')
    .action(async (options) => {
    try {
        if (!options.type) {
            console.log(chalk.yellow('Please specify the type: package or page'));
            return;
        }
        if (!options.name) {
            console.log(chalk.yellow('Please specify the name for the new package/page'));
            return;
        }
        if (options.type === 'package') {
            await generatePackage(options);
        }
        else if (options.type === 'page') {
            await generatePage(options);
        }
        else {
            console.log(chalk.red(`Invalid type: ${options.type}. Use 'package' or 'page'`));
        }
    }
    catch (error) {
        console.error(chalk.red('Error generating package/page:'), error);
        process.exit(1);
    }
});
program
    .command('package')
    .alias('pkg')
    .description('Generate a new package')
    .argument('<name>', 'Name of the package')
    .option('-d, --description <description>', 'Description of the package')
    .option('-y, --yes', 'Skip confirmation prompts')
    .action(async (name, options) => {
    try {
        await generatePackage({ name, ...options });
    }
    catch (error) {
        console.error(chalk.red('Error generating package:'), error);
        process.exit(1);
    }
});
program
    .command('page')
    .alias('pg')
    .description('Generate a new page')
    .argument('<name>', 'Name of the page')
    .option('-d, --description <description>', 'Description of the page')
    .option('-y, --yes', 'Skip confirmation prompts')
    .action(async (name, options) => {
    try {
        await generatePage({ name, ...options });
    }
    catch (error) {
        console.error(chalk.red('Error generating page:'), error);
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=index.js.map