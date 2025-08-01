import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local DB
  // local array
  private readonly songs: string[] = [];

  create(song: string) {
    // save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
}
