#!/usr/bin/env node
import { CLIApplication } from './cli/cli-application.js';
import {
  HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
} from './cli/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new ImportCommand(),
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
