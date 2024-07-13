import { Body, Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../../providers/auth/public.decorator';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user-dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Public()
  @Post()
  async create(@Body() body: createUserDto){
    return await this.userService.create(body);
  }

  @Delete()
  async delete(@Req() req: Request){
    return await this.userService.delete(req["user"].id);
  }

  @Patch()
  async update(@Req() req: Request, @Body() body: updateUserDto){
    return await this.userService.update(req["user"].id, body);
  }

  @Get()
  async getMyUser(@Req() req: Request){
    return await this.userService.getMyUser(req["user"])
  }

}
