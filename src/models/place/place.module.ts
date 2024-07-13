import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PrismaService } from '../../prisma.service';
import { PlaceRepository } from './place.repository';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService, PrismaService, PlaceRepository],
  exports: [PlaceService]
})
export class PlaceModule {}
