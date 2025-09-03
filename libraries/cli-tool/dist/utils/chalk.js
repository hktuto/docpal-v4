import chalk from 'chalk';
// Ensure chalk works on Windows
if (process.platform === 'win32') {
    chalk.level = 1;
}
export { chalk };
//# sourceMappingURL=chalk.js.map