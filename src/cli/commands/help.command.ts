import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    const helpText = [
      '',
      `${chalk.bold.blue('Usage:')}`,
      `  ${chalk.cyan('node main.cli.js')} ${chalk.yellow('[command]')}`,
      '',
      `${chalk.bold.blue('Description:')}`,
      `  ${chalk.white('This CLI application prepares and validates data to be sent to a REST API server.')}`,
      `  ${chalk.white('It supports various commands to inspect, transform, and format data before submission.')}`,
      '',
      `${chalk.bold.blue('Available Commands:')}`,
      `  ${chalk.green('--version')}       ${chalk.gray('Display the current application version')}`,
      `  ${chalk.green('--help')}          ${chalk.gray('Show this help message')}`,
      `  ${chalk.green('--import <file>')} ${chalk.gray('Import data from a TSV file')}`,
      `  ${chalk.green('--generate <n> <file> <url>')} ${chalk.gray('Generate test data')}`,
      '',
      `${chalk.bold.blue('Examples:')}`,
      `  ${chalk.cyan('node main.cli.js')} ${chalk.green('--version')}`,
      `  ${chalk.cyan('node main.cli.js')} ${chalk.green('--help')}`,
      `  ${chalk.cyan('node main.cli.js')} ${chalk.green('--import')} ${chalk.yellow('src/mocks/data.tsv')}`,
      `  ${chalk.cyan('node main.cli.js')} ${chalk.green('--generate')} ${chalk.yellow('10 output.tsv http://localhost:3001/offers')}`,
      ''
    ].join('\n');

    console.info(helpText);
  }
}
