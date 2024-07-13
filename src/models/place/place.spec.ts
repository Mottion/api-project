import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthModule } from '../../providers/auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { cleanDB } from '../../../test/clean-db';
import { fakePlace, fakeUser, fakeUserComplete } from '../../mocks/random-mock';
import { User } from '@prisma/client';
import { setupTokenUser } from '../../../test/setup-token-user';
import { JoiPipeModule } from 'nestjs-joi';
import { PrismaExceptionFilter } from '../../filters/prisma-exception.filter';
import { PlaceModule } from './place.module';
import { JwtService } from '@nestjs/jwt';

describe('User:', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlaceModule, AuthModule, JoiPipeModule],
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

  describe('POST /place', () => {
    let token: string;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      token = tokenData
    })

    test("Should return 200 and create a place", async () => {
      const {updatedAt, ...place} = fakePlace();
      const response = await request(app.getHttpServer())
      .post("/place")
      .set({ Authorization: `Bearer ${token}` })
      .send(place)
      .expect(HttpStatus.CREATED);
      expect(response.body.name).toBe(place.name);
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const {updatedAt, ...place} = fakePlace();
      const response = await request(app.getHttpServer())
      .post("/place")
      .set({ Authorization: `Bearer ${token}1` })
      .send(place)
      .expect(HttpStatus.UNAUTHORIZED);
    })
    test("It should return 400 and report an error due to the lack of necessary data", async () => {
      const {updatedAt, ...place} = fakePlace();
      delete place.name;
      const response = await request(app.getHttpServer())
      .post("/place")
      .set({ Authorization: `Bearer ${token}` })
      .send(place)
      .expect(HttpStatus.BAD_REQUEST);
    })
  })
  describe('PATCH /place/:id', () => {
    let token: string;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      token = tokenData
    })

    test("Should return 200 and update a place", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .patch(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({name: "Name Test"})
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe("Name Test");
    });
    test("It should return 401 if the JWT token is not valid", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .patch(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}1` })
      .send({name: "Name Test"})
      .expect(HttpStatus.UNAUTHORIZED);
    });
    test("It should return 400 and report an error when trying to put data already in use", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const place2 = fakePlace();
      delete place2.updatedAt
      await prisma.place.create({data: place2});

      const response = await request(app.getHttpServer())
      .patch(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({name: place2.name, city: place2.city})
      .expect(HttpStatus.BAD_REQUEST);
    });
  })
  describe("GET /place/:id", () => {
    let token: string;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      token = tokenData
    })

    test("It should return 200 and bring the place data", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .get(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe(place.name);
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .get(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}1` })
      .expect(HttpStatus.UNAUTHORIZED);
    });
    test("It should return 404 and report that it did not find the place", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .get(`/place/${place.id}1`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.NOT_FOUND);
    })
    
  })
  describe("DELETE /place/:id", () => {
    let token: string;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      token = tokenData
    })

    test("It should return 200 and a copy of the deleted place", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .delete(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe(place.name);
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .delete(`/place/${place.id}`)
      .set({ Authorization: `Bearer ${token}1` })
      .expect(HttpStatus.UNAUTHORIZED);
    });
  })
  describe("GET /place/search", () => {
    let token: string;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      token = tokenData
    })

    test("It should return 200 and bring a result containing 'Sao' in the name", async () => {
      const place1 = {...fakePlace(), name: "Sao Paulo"};
      const place2 = fakePlace();
      await prisma.place.create({data: place1});
      await prisma.place.create({data: place2});
      
      const response = await request(app.getHttpServer())
      .get(`/place/search?search=Sao`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.results).toHaveLength(1);
      expect(response.body.results[0].name).toBe(place1.name);
    })
    test("It should return 401 if the JWT token is not valid", async () => {
      const {updatedAt, ...data} = fakePlace();
      const place = await prisma.place.create({data});
      
      const response = await request(app.getHttpServer())
      .get(`/place/search`)
      .set({ Authorization: `Bearer ${token}1` })
      .expect(HttpStatus.UNAUTHORIZED);
    });
    test("It should return 200 and bring 5 results, stating that the database total is 6", async () => {
      const places = Array.from({ length: 6 }, () => fakePlace());
      await prisma.place.createMany({data: places});
      
      const response = await request(app.getHttpServer())
      .get(`/place/search`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.results).toHaveLength(5);
      expect(response.body.count).toBe(6);
    })
    test("It should return 200 and bring 1 results from the second page", async () => {
      const places = Array.from({ length: 6 }, () => fakePlace());
      await prisma.place.createMany({data: places});
      
      const response = await request(app.getHttpServer())
      .get(`/place/search?page=2`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.results).toHaveLength(1);
      expect(response.body.count).toBe(6);
    })
  })
});