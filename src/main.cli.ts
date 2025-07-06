#!/usr/bin/env node
/* eslint-disable node/no-unsupported-features/es-syntax */
import { glob } from 'glob';
import { CLIApplication } from './cli/cli-application.js';
import { Command } from './cli/commands/command.interface.js';
import { resolve } from 'node:path';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  const commands: Command[] = [];

  const commandFiles = await glob('src/cli/commands/*.command.ts');

  for (const file of commandFiles) {
    const modulePath = resolve(file);

    const module = await import(modulePath);
    const CommandClass = Object.values(module).find(
      (exported) => typeof exported === 'function'
    ) as new () => Command;
    if (CommandClass) {
      commands.push(new CommandClass());
    }
  }

  cliApplication.registerCommands(commands);
  cliApplication.processCommand(process.argv);
}

bootstrap();
