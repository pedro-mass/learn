import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create() {
    return this.songsService.create('Animals by Martin Garrix');
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `find one song endpoint: ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `update song endpoint: ${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `delete song endpoint: ${id}`;
  }
}
