import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (GET)', () => {
    return request(app.getHttpServer())
      .post('/login/login')
      .set("Authorization","Hola")
      .send("{'name':'dario','password':'abc123.'}")
      .expect(200)
      .expect(({body})=>{
        return body.access_token;
      })
  });
});
