import { createWriteStream, WriteStream } from 'node:fs';
import { EventEmitter } from 'node:events';
import { FileWriter } from './file-writer.interface.js';
import { Offer } from '../../types/offer.type.js';

export class TSVFileWriter extends EventEmitter implements FileWriter {
  private writeStream: WriteStream;

  constructor(private readonly filename: string) {
    super();
    this.writeStream = createWriteStream(this.filename, { encoding: 'utf-8' });

    this.writeStream.on('error', (error) => {
      this.emit('error', error);
    });

    this.writeStream.on('close', () => {
      this.emit('finish');
    });
  }

  private offerToTSVString(offer: Offer): string {
    const {
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavourite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      user,
      coordinates,
    } = offer;

    return [
      title,
      description,
      postDate.toISOString().split('T')[0],
      city,
      previewImage,
      images,
      isPremium.toString(),
      isFavourite.toString(),
      rating.toString(),
      type,
      rooms.toString(),
      guests.toString(),
      price.toString(),
      amenities.join(';'),
      user.name,
      user.email,
      user.avatarPath || '',
      user.type,
      coordinates.latitude.toString(),
      coordinates.longitude.toString(),
    ].join('\t');
  }

  public write(data: Offer): void {
    try {
      const tsvLine = this.offerToTSVString(data);
      const success = this.writeStream.write(`${tsvLine}\n`);

      if (success) {
        this.emit('written', data);
      } else {
        this.writeStream.once('drain', () => {
          this.emit('written', data);
        });
      }
    } catch (error) {
      this.emit('error', error);
    }
  }

  public end(): void {
    this.writeStream.end();
  }
}
