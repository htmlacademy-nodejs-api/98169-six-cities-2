import { Command } from './command.interface.js';
import { MockDataDto } from '../../shared/types/api-response.type.js';
import { OfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { TSVFileWriter } from '../../shared/libs/file-reader/tsv-file-writer.js';
import { Offer } from '../../shared/types/offer.type.js';
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
      const offers = generator.generate(data, count);

      console.log(`Generated ${count} offers:`);
      offers.forEach((offer, index) => {
        console.log(`${index + 1}. ${offer.title} in ${offer.city}`);
      });

      await this.writeOffersToFile(offers, filepath);

      console.log(`Saved ${count} offers to ${filepath}`);
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      console.error(`Can't generate data: ${error.message}`);
    }
  }

  private async writeOffersToFile(
    offers: Offer[],
    filepath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const writer = new TSVFileWriter(filepath);
      let writtenCount = 0;

      writer.on('written', () => {
        writtenCount++;
        if (writtenCount === offers.length) {
          writer.end();
        }
      });

      writer.on('finish', () => {
        resolve();
      });

      writer.on('error', (error) => {
        reject(error);
      });

      offers.forEach((offer) => {
        writer.write(offer);
      });
    });
  }

  private async load(url: string): Promise<MockDataDto> {
    const response = await got(url);

    const data = JSON.parse(response.body) as MockDataDto;

    return data;
  }
}
