import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { Prisma } from "@prisma/client";
import { pickSelect } from "../../utils/pick-select";
import { PlaceSearchDto } from "./dto/place-search.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";

@Injectable()
export class PlaceRepository{
  constructor(
    private readonly prisma: PrismaService
  ){}

  async findById(
    id: string,
    keys: (keyof Prisma.PlaceSelect)[] = ["id", "name", "city", "state", "createdAt", "updatedAt"]
  ){
    const response = await this.prisma.place.findFirst({
      where: {id},
      select: pickSelect(keys) as Prisma.PlaceSelect
    });
    return response;
  }

  async update(
    id: string,
    data: UpdatePlaceDto,
    keys: (keyof Prisma.PlaceSelect)[] = ["id", "name", "city", "state", "createdAt", "updatedAt"]
  ){
    const response = await this.prisma.place.update({
      where: {id},
      data,
      select: pickSelect(keys) as Prisma.PlaceSelect
    });
    return response;
  }

  async delete(
    id: string,
    keys: (keyof Prisma.PlaceSelect)[] = ["id", "name", "city", "state", "createdAt", "updatedAt"]
  ){
    const response = await this.prisma.place.delete({
      where: {id},
      select: pickSelect(keys) as Prisma.PlaceSelect
    });
    return response;
  }

  async create(
    data: CreatePlaceDto,
    keys: (keyof Prisma.PlaceSelect)[] = ["id", "name", "city", "state", "createdAt", "updatedAt"]
  ){
    const response = await this.prisma.place.create({
      data,
      select: pickSelect(keys) as Prisma.PlaceSelect
    });
    return response;
  }

  async search(
    params: PlaceSearchDto
  ){
    const query: Prisma.PlaceFindManyArgs = {
      skip: (params.page - 1) * params.take,
      take: params.take,
    }

    if(params.search){
      query.where = {OR: [
        {city: {contains: params.search}},
        {state: {contains: params.search}},
        {name: {contains: params.search}}
      ]}
    }

    if(params.orderBy){
      query.orderBy = { [params.orderBy]: params.orderType };
    }

    const response = await this.prisma.place.findMany(query);
    const count = await this.prisma.place.count({where: query.where});
    return {response, count}
  }
}