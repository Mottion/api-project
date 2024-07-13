import { Prisma } from "@prisma/client";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class CreatePlaceDto{
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  city: string;
  @JoiSchema(Joi.string().required())
  state: string;

  constructor(args: Prisma.PlaceCreateInput){
    this.name = args.name;
    this.city = args.city;
    this.state = args.state;
  }
}