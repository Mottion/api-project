import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './providers/auth/auth.module';
import { JoiPipeModule } from 'nestjs-joi';
import { PlaceModule } from './models/place/place.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', ".env.development"]
    }),
    UserModule,
    AuthModule,
    JoiPipeModule,
    PlaceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
