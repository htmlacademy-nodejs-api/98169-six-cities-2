import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Usage:
          node cli.js [command]

        Description:
          This CLI application prepares and validates data to be sent to a REST API server.
          It supports various commands to inspect, transform, and format data before submission.

        Available Commands:
          --version       Display the current application version.
          --help          Show this help message.

        Examples:
          node cli.js --version
          node cli.js --help
    `);
  }
}
