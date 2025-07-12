import { Command } from './command.interface.js';
import { MockDataDto } from '../../shared/types/api-response.type.js';
import { writeFile } from 'node:fs/promises';
import { OfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import got from 'got';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;

    if (!count || !filepath || !url) {
      console.error('Usage: --generate <count> <filepath> <url>');
      return;
    }

    const offerCount = parseInt(count, 10);
    if (isNaN(offerCount) || offerCount <= 0) {
      console.error('Count must be a positive number');
      return;
    }

    this.executeAsync(offerCount, filepath, url);
  }

  private async executeAsync(
    count: number,
    filepath: string,
    url: string
  ): Promise<void> {
    try {
      const data = await this.load(url);

      const generator = new OfferGenerator();
      const tsvData = generator.generate(data, count);

      await writeFile(filepath, tsvData, 'utf-8');

      console.log(`Generated ${count} offers and saved to ${filepath}`);
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      console.error(`Can't generate data: ${error.message}`);
    }
  }

  private async load(url: string): Promise<MockDataDto> {
    const response = await got(url);

    const data = JSON.parse(response.body) as MockDataDto;

    return data;
  }
}
