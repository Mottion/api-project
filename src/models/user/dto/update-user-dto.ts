import { Prisma } from "@prisma/client";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class updateUserDto implements Prisma.UserUpdateInput{
  @JoiSchema(Joi.string().optional())
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  @JoiSchema(Joi.string().optional())
  newPassword?: string | Prisma.StringFieldUpdateOperationsInput;
  @JoiSchema(Joi.string().required())
  passwordConfirm?: string | Prisma.StringFieldUpdateOperationsInput;

  constructor(args: Prisma.UserUpdateInput){
    this.name = args.name;
    // não há retorno de password por motivos de segurança
  }
}