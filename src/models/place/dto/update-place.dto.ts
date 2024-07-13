import { Prisma } from "@prisma/client";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class UpdatePlaceDto{
  @JoiSchema(Joi.string())
  name?: string;
  @JoiSchema(Joi.string())
  city?: string;
  @JoiSchema(Joi.string())
  state?: string;

  constructor(args: Prisma.PlaceCreateInput){
    this.name = args.name;
    this.city = args.city;
    this.state = args.state;
  }
}