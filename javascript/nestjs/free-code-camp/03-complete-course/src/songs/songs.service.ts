import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  // local DB
  // local array
  private readonly songs: CreateSongDto[] = [];

  create(song: CreateSongDto) {
    // save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch the songs from the db

    // errors come while fetching the data from DB

    throw new Error('Error in Db while fetching the songs');
  }
}
