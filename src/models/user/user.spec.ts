import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from '../../providers/auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { cleanDB } from '../../../test/clean-db';
import { fakeUser, fakeUserComplete } from '../../mocks/random-mock';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { setupTokenUser } from '../../../test/setup-token-user';
import { JoiPipeModule } from 'nestjs-joi';
import { PrismaExceptionFilter } from '../../filters/prisma-exception.filter';

describe('User:', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, AuthModule, JoiPipeModule],
      providers: [PrismaService]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new PrismaExceptionFilter());
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwtService =  moduleRef.get<JwtService>(JwtService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await cleanDB(prisma);
  });
  
  describe('POST /user', () => {
    test("Should return 201 and create a user", async () => {
      const user = fakeUser()
      const response = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.CREATED);
      expect(response.body.access_token).not.toBeNull();
    });
    test("It should return 400 and report an error due to the lack of necessary data", async () => {
      const user = fakeUser()
      delete user.name;
      const response:any = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.BAD_REQUEST);
    })
    test("It should return 400 and inform that the email is already in use", async () => {
      const user = fakeUser()
      await prisma.user.create({data: user})

      const response = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBe("This email is already in use");
    })
  })
  describe('DELETE /user', () => {
    let token: string;
    let user: User;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      user = userData
      token = tokenData
    })

    test("It should return 200 and a copy of the deleted user", async () => {
      const response = await request(app.getHttpServer())
      .delete(`/user`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe(user.name);
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const response = await request(app.getHttpServer())
      .delete(`/user`)
      .set({ Authorization: `Bearer ${token}1` })
      .expect(HttpStatus.UNAUTHORIZED);
    })
  })
  describe('PATCH /user', () => {
    let token: string;
    let user: User;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      user = userData
      token = tokenData
    })

    test("Should return 200 and update a user's data successfully", async () => {
      const response = await request(app.getHttpServer())
      .patch(`/user`)
      .set({ Authorization: `Bearer ${token}` })
      .send({passwordConfirm: user.password, name: "Name Teste"})
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe("Name Teste");
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const response = await request(app.getHttpServer())
      .patch(`/user`)
      .set({ Authorization: `Bearer ${token}1` })
      .send({passwordConfirm: user.password, name: "Name Teste"})
      .expect(HttpStatus.UNAUTHORIZED);
    })
    test("It should return 200 and correctly change the password", async () => {
      const user2 = fakeUserComplete();
      const response = await request(app.getHttpServer())
      .patch(`/user`)
      .set({ Authorization: `Bearer ${token}` })
      .send({passwordConfirm: user.password, newPassword: user2.password})
      .expect(HttpStatus.OK);
    })
  })
  describe('GET /user', () => {
    let token: string;
    let user: User;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      user = userData
      token = tokenData
    })

    test("It should return 200 and bring the user data", async () => {
      const response = await request(app.getHttpServer())
      .get(`/user`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe(user.name);
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const response = await request(app.getHttpServer())
      .get(`/user`)
      .set({ Authorization: `Bearer ${token}1` })
      .expect(HttpStatus.UNAUTHORIZED);
    })
  })
})
