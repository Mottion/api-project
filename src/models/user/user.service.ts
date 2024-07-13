import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from './dto/create-user.dto';
import { AccessTokenDto } from '../../providers/auth/dto/access-token.dto';
import { updateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ){}
  
  async create(user: createUserDto){
    const response = await this.userRepository.create(user);
    const payload = { id: response.id, name: response.name };
    return new AccessTokenDto(await this.jwtService.signAsync(payload));
  }

  async findByEmail(email: string){
    const response = await this.userRepository.findByEmail(email);
    if(!response) throw new NotFoundException("Email not registered in the system");
    return response;
  }

  async delete(id: string){
    const response = await this.userRepository.delete(id);
    return response
  }
  
  async getMyUser(user: {id: string}){
    const response = await this.userRepository.findById(user.id);
    if(!response) throw new NotFoundException("User Not Found");
    return response;
  }

  async update(id: string, data: updateUserDto){
    const user = await this.userRepository.getById(id, ['password']);
    
    if(user.password !== data.passwordConfirm){
      throw new ConflictException("error validating password confirmation");
    }
    const {name, newPassword} = data; 

    const response = await this.userRepository.update(id, {
      name, password: newPassword
    });
    return response
  }

}
