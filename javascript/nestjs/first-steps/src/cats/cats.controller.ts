import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return {
      fn: 'CatsController.create',
      createCatDto,
    };
  }

  @Get()
  async findAll(@Query('age') age: number, @Query('breed') breed: string) {
    return Promise.resolve(
      `This action returns all cats filtered by age: ${age} and breed: ${breed}`,
    );
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
