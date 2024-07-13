import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceSearchDto } from './dto/place-search.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService
  ) {}

  @Post()
  async create(@Body() body: CreatePlaceDto){
    return await this.placeService.create(body);
  }

  @Get("/search")
  async search(@Query() query: PlaceSearchDto){
    return await this.placeService.search(query);
  }

  @Get("/:id")
  async getPlace(@Param() param: {id: string}){
    return await this.placeService.getPlace(param.id);
  }

  @Delete("/:id")
  async delete(@Param() param: {id: string}){
    return await this.placeService.delete(param.id);
  }

  @Patch("/:id")
  async patch(@Body() body: UpdatePlaceDto, @Param() param: {id: string}){
    return await this.placeService.patch(body, param.id);
  }
}
