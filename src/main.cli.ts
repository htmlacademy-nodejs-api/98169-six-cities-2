#!/usr/bin/env node
import { CLIApplication } from './cli/cli-application.js';
import { HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new ImportCommand(),
    new HelpCommand(),
    new VersionCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
