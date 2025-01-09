import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Banker e2e (End to End, EndPoints) SUPERTEST (Need DB and everything set up with Docker)\n Test is Done with username "test" and password: "abc123."\n DO IT WITH EMPTY NEW CREATED DATABASE!!**\n **Use in the Docker Exec Instance of Transaction Docker!!', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //Fast guide: 
  //.send is the body of the request as JSON
  //.set is to set a Header of the request
  //.expect is the response. 
  //.expect(({body})=>{}) access to the body response directly and later expect(something).toBe(expectedValue)



  //  JWT Bearer Token got /login POST Test
  let authValue: string;
  authValue: " ";




  //First Create user test with password abc123.
  it('/user/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/create')
      .send({ name: "test", password: "abc123.", email: "hola@hola" })
      .expect(201)
      .expect(({ body }) => {

      })
  });






  //Login into test with abc123. and return JWT Bearer Token to var "authValue"
  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login/login')
      .set("Authorization", "Hola")
      .send({ name: "test", password: "abc123." })
      .expect(201)
      .expect(({ body }) => {
        authValue = "Bearer " + body.access_token;
        let firstLetter = body.access_token.charAt(0);
        expect(firstLetter).toBe("e");
        // Bearer Token always start by e
      })
  });







  // NOW START THE AUTH TESTS WITH BEARER TOKEN ACTIVE in .set

  it('/accounts/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/accounts/create')
      .set("Authorization", authValue)
      .send({
        userid: 1,
        name: "EstoesTest",
        type: "Corriente",
        balance: 500
      })
      .expect(201)
      .expect(({ body }) => {

      })
  });

  it('/movements/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/movements/create')
      .set("Authorization", authValue)
      .send({
        origin_account_id: 1,
        destination_account_id: 1,
        money:200
      })
      .expect(201)
      .expect(({ body }) => {

      })
  });


  //  LIST ACCOUNTS AND MOVEMENTS

  it('/accounts/list (POST)', () => {
    return request(app.getHttpServer())
      .post('/movements/list')
      .set("Authorization", authValue)
      .send({
        id:1
      })
      .expect(201)
      .expect(({ body }) => {

      })
  });

  it('/movements/list (POST)', () => {
    return request(app.getHttpServer())
      .post('/movements/list')
      .set("Authorization", authValue)
      .send({
        origin_account_id:1
      })
      .expect(201)
      .expect(({ body }) => {

      })
  });


  // DELETE ENDPOINTS
  it('/movements/delete (POST)', () => {
    return request(app.getHttpServer())
      .post('/movements/delete')
      .set("Authorization", authValue)
      .send({ origin_account_id:1, id:1, destination_account_id:1 })
      .expect(201)
      .expect(({ body }) => {

      })
  });

  it('/accounts/delete (POST)', () => {
    return request(app.getHttpServer())
      .post('/accounts/delete')
      .set("Authorization", authValue)
      .send({ id: 1 })
      .expect(201)
      .expect(({ body }) => {

      })
  });

  it('/user/delete (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/delete')
      .set("Authorization", authValue)
      .send({ id: 1 })
      .expect(201)
      .expect(({ body }) => {

      })
  });
});
