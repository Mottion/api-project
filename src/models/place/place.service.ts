import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceSearchDto } from './dto/place-search.dto';
import { Prisma } from '@prisma/client';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    private readonly placeRepository: PlaceRepository
  ){}

  async create(place: CreatePlaceDto){
    const response = await this.placeRepository.create(place);
    return response;
  }

  async search(query: PlaceSearchDto){
    const params = new PlaceSearchDto(query);

    const validOrderArguments: (keyof Prisma.PlaceSelect)[] = ["createdAt", "updatedAt", "name", "name", "state"];
    if(params.orderBy && !validOrderArguments.includes(params.orderBy as keyof Prisma.PlaceSelect)){
      throw new BadRequestException("impossible to sort by parameter:" + params.orderBy);
    }

    let data = await this.placeRepository.search(params);
    const searchResult = {
      results: data.response,
      count: data.count,
      ...params
    }
    return searchResult;
  }

  async delete(id: string){
    const place = await this.placeRepository.findById(id);
    if(!place) throw new NotFoundException("Place not found");
    
    const response = await this.placeRepository.delete(id);
    return response;
  }

  async getPlace(id: string){
    const response = await this.placeRepository.findById(id);
    if(!response) throw new NotFoundException("Place not found");
    return response;
  }

  async patch(place: UpdatePlaceDto, id: string){
    const oldPlace = await this.placeRepository.findById(id, ["id"]);
    if(!oldPlace){
      throw new NotFoundException("Place not found");
    }

    const response = await this.placeRepository.update(id, place);
    return response;
  }
}
