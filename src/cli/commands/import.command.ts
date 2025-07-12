import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Offer } from '../../shared/types/offer.type.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename);
    const offers: Offer[] = [];

    fileReader.on('offer', (offer: Offer) => {
      offers.push(offer);
    });

    fileReader.on('end', () => {
      console.log(`Imported ${offers.length} offers from ${filename}`);
      console.log(offers);
    });

    fileReader.on('error', (error: Error) => {
      console.error(`Can't import data from ${filename}`);
      console.error(`Details: ${error.message}`);
    });

    fileReader.read();
  }
}
