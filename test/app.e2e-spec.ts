import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { useContainer } from "class-validator";
import { MerchantRequestDTO } from "../src/merchant/dto/merchant-request.dto";
import { Prisma } from "@prisma/client";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const merchantPayload: MerchantRequestDTO = {
    MerchantID: "M000000007",
    Daspos_Ref: "SG-NEW-9209bf82-c2f7-4edb-8e8f-c8f92fb2b0ef",
    // Autopos_Ref: "SG-NEW-9209bf82-c2f7-4edb-8e8f-c8f92fb2b0ef",
    Status: "APPROVED",
    LegalName: "Diksha Pet Shop Pte Ltd",
    Country: "SG",
    SubsidiaryID: "SG",
    RegistrationNumber: "2011458213D",
    PrimaryAddress: [
      {
        Line1: "98 UPPER SERANGOON RD",
        Line2: "",
        Line3: "",
        Line4: "",
        Region: "",
        Country: "SG",
        AddrType: "Registered_Address",
        Locality: "Singapore",
        PostCode: "457812",
      },
    ],
    SecondaryAddress: "same",
    ContactFirstname: "Kim Wei",
    ContactLastname: "Teo",
    ContactMiddleName: "null",
    ContactEmail: "kimweiteo@hotmail.com",
    ContactPhone: "87852163",
    UserName: "kimweiteohotmailcom",
    SecretKey: "bWCOBNKz1BJeObtGlXKU4VpeV75no53j",
    SecretKeyTest: "bWCOBNKz1BJeObtGlXKU4VpeV75no53jLvZIZK0=",
    OneTimePassword:
      "2d79f4e9965cc95779ba225751c815f773b41773cc235f69036c8a219db31645",
    IsDeleted: false,
    CreatedBy: 3,
    UpdatedBy: 4,
    // CreatedAt: "2022-06-23 10:21:04.007",
    // UpdatedAt: "2022-06-23 10:21:04.007",
  };

  const Subsidiary: Prisma.SubsidiaryCreateInput = {
    uuid: "1f72a64b-6967-491e-9df2-279620ae22ab",
    SubsidiaryID: "SG",
    Country: "Singapore",
    // CreatedAt: "2022-06-23 12:58:50.910",
    // UpdatedAt: "2022-06-23 12:58:50.910",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true })
    );

    await app.init();

    await prisma.subsidiary.create({
      data: Subsidiary,
    });
    await prisma.merchant.create({
      data: merchantPayload,
    });
  });

  describe("GET /merchant", () => {
    it("Should return 403 FORBIDDEN", async () => {
      const { status } = await request(app.getHttpServer()).get("/merchant");

      expect(status).toBe(403);
    });

    it("Should return 200 OK", async () => {
      const { status } = await request(app.getHttpServer())
        .get("/merchant")
        .set(
          "Authorization",
          "eyJraWQiOiJSM3dzUFVxUUxNVzhDTUZUZ3Q3U1JzXC9rY0VBZnVYTU1NaW1NaWpISWRodz0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206U3Vic2lkaWFyaWVzIjoiW1wiU0dcIixcIkpQXCJdIiwic3ViIjoiZTFjY2NmZDctZDEyMS00MWY1LTk0MjMtN2FkNmMyMzI1NjM2IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpHcm91cHMiOiJbXCJGUkFVRFwiLFwiUklTS1wiLFwiUklTS0lTU1VJTkdcIixcIlJJU0tNT05JVE9SSU5HXCIsXCJSSVNLQUNRVUlSSU5HXCIsXCJSSVNLQ09NUExJQU5DRVwiLFwiQ09NUExJQU5DRVwiLFwiT1BFUkFUSU9OU1wiLFwiU0FMRVNcIixcIlNBTEVTT1BTXCIsXCJTVVBQT1JUXCIsXCJQQ0lEU1NcIixcIlBPU1NVUFBPUlRcIixcIkNPT1JESU5BVE9SXCIsXCJJTlRFR1JBVElPTlwiLFwiU0VUVExFTUVOVFwiLFwiU1lTQURNSU5cIixcIlRISVJEUEFSVFlcIl0iLCJjdXN0b206SXNJbnRlcm5hbCI6ImZhbHNlIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzBhREFwOHFWRyIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0ZnVsbGFjY2Vzc3Rlc3Rjb20iLCJtaWRkbGVfbmFtZSI6Im51bGwiLCJvcmlnaW5fanRpIjoiZTM3NzE4YzItNGRiOC00OTA4LTk1M2MtYWYxYjI4ZmQwYjdlIiwiYXVkIjoiNjMxbHAxMjE0OHRqcDhmM25uYTd0ZWtqbDIiLCJldmVudF9pZCI6IjIwODBkYzI2LTBjM2UtNDI0Zi1iODYzLWUxYTk5YTY3NmU5MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU5ODkxMzU2LCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjU5ODk0OTU2LCJpYXQiOjE2NTk4OTEzNTYsImp0aSI6IjI4OTYzNWIwLWUxNzYtNDViZi04NTIxLTEwMDczYWM2Mjk3NSIsImVtYWlsIjoidGVzdGZ1bGxhY2Nlc3NAdGVzdC5jb20iLCJjdXN0b206QXB2bExldmxJZCI6IjAifQ.IpLEu2PTcEv5zIKyhRBfhguJoSh13W1WteBGx0wBrMZ_dzqqHPHB5RjSi-O701sWzgKhs0HM_siutjYVPgLV6eaEFYO0EXLFo27eX3Y3Z1Z0xfUgx9i46GN7qB91dTnf77SroNsqDyNKunf0hNXYc4V9VCBhAYwV03ZdrXtHxiBpdH0E0-ICHwuyR1KYc2m8KSYl-fEscl0-AGr71ITUlhZiC9j4P_Qlen0BaHt9Gx1gvzknlVMrjdYLpLai0j-cLoUS6G8loenc-AY27i1IxYH668baUgN4I3D0x9XpwpFNRm294_UV7radcUXHW9ylL0jsu5jp80gnoIYugqroQw"
        );
      expect(status).toBe(200);
    });

    it("Return a list of all merchant", async () => {
      const merchantFindAllPayload = {
        data: {
          MerchantID: "M000000007",
          LegalName: "Diksha Pet Shop Pte Ltd",
          // CreatedAt: "2022-06-23 10:21:04.007",
          Country: "SG",
          _count: 2,
          Status: "APPROVED",
        },
        message: "xyz",
        success: true,
      };
      const { status, body } = await request(app.getHttpServer())
        .get("/merchant")
        .set(
          "Authorization",
          "eyJraWQiOiJSM3dzUFVxUUxNVzhDTUZUZ3Q3U1JzXC9rY0VBZnVYTU1NaW1NaWpISWRodz0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206U3Vic2lkaWFyaWVzIjoiW1wiU0dcIixcIkpQXCJdIiwic3ViIjoiZTFjY2NmZDctZDEyMS00MWY1LTk0MjMtN2FkNmMyMzI1NjM2IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpHcm91cHMiOiJbXCJGUkFVRFwiLFwiUklTS1wiLFwiUklTS0lTU1VJTkdcIixcIlJJU0tNT05JVE9SSU5HXCIsXCJSSVNLQUNRVUlSSU5HXCIsXCJSSVNLQ09NUExJQU5DRVwiLFwiQ09NUExJQU5DRVwiLFwiT1BFUkFUSU9OU1wiLFwiU0FMRVNcIixcIlNBTEVTT1BTXCIsXCJTVVBQT1JUXCIsXCJQQ0lEU1NcIixcIlBPU1NVUFBPUlRcIixcIkNPT1JESU5BVE9SXCIsXCJJTlRFR1JBVElPTlwiLFwiU0VUVExFTUVOVFwiLFwiU1lTQURNSU5cIixcIlRISVJEUEFSVFlcIl0iLCJjdXN0b206SXNJbnRlcm5hbCI6ImZhbHNlIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzBhREFwOHFWRyIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0ZnVsbGFjY2Vzc3Rlc3Rjb20iLCJtaWRkbGVfbmFtZSI6Im51bGwiLCJvcmlnaW5fanRpIjoiZTM3NzE4YzItNGRiOC00OTA4LTk1M2MtYWYxYjI4ZmQwYjdlIiwiYXVkIjoiNjMxbHAxMjE0OHRqcDhmM25uYTd0ZWtqbDIiLCJldmVudF9pZCI6IjIwODBkYzI2LTBjM2UtNDI0Zi1iODYzLWUxYTk5YTY3NmU5MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU5ODkxMzU2LCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjU5ODk0OTU2LCJpYXQiOjE2NTk4OTEzNTYsImp0aSI6IjI4OTYzNWIwLWUxNzYtNDViZi04NTIxLTEwMDczYWM2Mjk3NSIsImVtYWlsIjoidGVzdGZ1bGxhY2Nlc3NAdGVzdC5jb20iLCJjdXN0b206QXB2bExldmxJZCI6IjAifQ.IpLEu2PTcEv5zIKyhRBfhguJoSh13W1WteBGx0wBrMZ_dzqqHPHB5RjSi-O701sWzgKhs0HM_siutjYVPgLV6eaEFYO0EXLFo27eX3Y3Z1Z0xfUgx9i46GN7qB91dTnf77SroNsqDyNKunf0hNXYc4V9VCBhAYwV03ZdrXtHxiBpdH0E0-ICHwuyR1KYc2m8KSYl-fEscl0-AGr71ITUlhZiC9j4P_Qlen0BaHt9Gx1gvzknlVMrjdYLpLai0j-cLoUS6G8loenc-AY27i1IxYH668baUgN4I3D0x9XpwpFNRm294_UV7radcUXHW9ylL0jsu5jp80gnoIYugqroQw"
        );
      body.MerchantID = merchantFindAllPayload.data.MerchantID;
      expect(status).toBe(200);
      expect(body).toBeDefined();

      expect(body.MerchantID).toEqual(merchantPayload.MerchantID);
    });
  });

  describe("GET /merchant/:id", () => {
    const MerchantID = "M000000007";

    it("Should return 403 FORBIDDEN", async () => {
      const { status } = await request(app.getHttpServer()).get(
        `/merchant/${MerchantID}`
      );
      expect(status).toBe(403);
    });

    it("fails to return invalid ID -- 404 NOT_FOUND", async () => {
      const { status } = await request(app.getHttpServer())
        .get(`/merchant/100`)
        .set(
          "Authorization",
          "eyJraWQiOiJSM3dzUFVxUUxNVzhDTUZUZ3Q3U1JzXC9rY0VBZnVYTU1NaW1NaWpISWRodz0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206U3Vic2lkaWFyaWVzIjoiW1wiU0dcIixcIkpQXCJdIiwic3ViIjoiZTFjY2NmZDctZDEyMS00MWY1LTk0MjMtN2FkNmMyMzI1NjM2IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpHcm91cHMiOiJbXCJGUkFVRFwiLFwiUklTS1wiLFwiUklTS0lTU1VJTkdcIixcIlJJU0tNT05JVE9SSU5HXCIsXCJSSVNLQUNRVUlSSU5HXCIsXCJSSVNLQ09NUExJQU5DRVwiLFwiQ09NUExJQU5DRVwiLFwiT1BFUkFUSU9OU1wiLFwiU0FMRVNcIixcIlNBTEVTT1BTXCIsXCJTVVBQT1JUXCIsXCJQQ0lEU1NcIixcIlBPU1NVUFBPUlRcIixcIkNPT1JESU5BVE9SXCIsXCJJTlRFR1JBVElPTlwiLFwiU0VUVExFTUVOVFwiLFwiU1lTQURNSU5cIixcIlRISVJEUEFSVFlcIl0iLCJjdXN0b206SXNJbnRlcm5hbCI6ImZhbHNlIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzBhREFwOHFWRyIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0ZnVsbGFjY2Vzc3Rlc3Rjb20iLCJtaWRkbGVfbmFtZSI6Im51bGwiLCJvcmlnaW5fanRpIjoiZTM3NzE4YzItNGRiOC00OTA4LTk1M2MtYWYxYjI4ZmQwYjdlIiwiYXVkIjoiNjMxbHAxMjE0OHRqcDhmM25uYTd0ZWtqbDIiLCJldmVudF9pZCI6IjIwODBkYzI2LTBjM2UtNDI0Zi1iODYzLWUxYTk5YTY3NmU5MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU5ODkxMzU2LCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjU5ODk0OTU2LCJpYXQiOjE2NTk4OTEzNTYsImp0aSI6IjI4OTYzNWIwLWUxNzYtNDViZi04NTIxLTEwMDczYWM2Mjk3NSIsImVtYWlsIjoidGVzdGZ1bGxhY2Nlc3NAdGVzdC5jb20iLCJjdXN0b206QXB2bExldmxJZCI6IjAifQ.IpLEu2PTcEv5zIKyhRBfhguJoSh13W1WteBGx0wBrMZ_dzqqHPHB5RjSi-O701sWzgKhs0HM_siutjYVPgLV6eaEFYO0EXLFo27eX3Y3Z1Z0xfUgx9i46GN7qB91dTnf77SroNsqDyNKunf0hNXYc4V9VCBhAYwV03ZdrXtHxiBpdH0E0-ICHwuyR1KYc2m8KSYl-fEscl0-AGr71ITUlhZiC9j4P_Qlen0BaHt9Gx1gvzknlVMrjdYLpLai0j-cLoUS6G8loenc-AY27i1IxYH668baUgN4I3D0x9XpwpFNRm294_UV7radcUXHW9ylL0jsu5jp80gnoIYugqroQw"
        );
      expect(status).toBe(404);
    });

    it("Should return 200 OK", async () => {
      const { status } = await request(app.getHttpServer())
        .get(`/merchant/${MerchantID}`)
        .set(
          "Authorization",
          "eyJraWQiOiJSM3dzUFVxUUxNVzhDTUZUZ3Q3U1JzXC9rY0VBZnVYTU1NaW1NaWpISWRodz0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206U3Vic2lkaWFyaWVzIjoiW1wiU0dcIixcIkpQXCJdIiwic3ViIjoiZTFjY2NmZDctZDEyMS00MWY1LTk0MjMtN2FkNmMyMzI1NjM2IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpHcm91cHMiOiJbXCJGUkFVRFwiLFwiUklTS1wiLFwiUklTS0lTU1VJTkdcIixcIlJJU0tNT05JVE9SSU5HXCIsXCJSSVNLQUNRVUlSSU5HXCIsXCJSSVNLQ09NUExJQU5DRVwiLFwiQ09NUExJQU5DRVwiLFwiT1BFUkFUSU9OU1wiLFwiU0FMRVNcIixcIlNBTEVTT1BTXCIsXCJTVVBQT1JUXCIsXCJQQ0lEU1NcIixcIlBPU1NVUFBPUlRcIixcIkNPT1JESU5BVE9SXCIsXCJJTlRFR1JBVElPTlwiLFwiU0VUVExFTUVOVFwiLFwiU1lTQURNSU5cIixcIlRISVJEUEFSVFlcIl0iLCJjdXN0b206SXNJbnRlcm5hbCI6ImZhbHNlIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzBhREFwOHFWRyIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0ZnVsbGFjY2Vzc3Rlc3Rjb20iLCJtaWRkbGVfbmFtZSI6Im51bGwiLCJvcmlnaW5fanRpIjoiZTM3NzE4YzItNGRiOC00OTA4LTk1M2MtYWYxYjI4ZmQwYjdlIiwiYXVkIjoiNjMxbHAxMjE0OHRqcDhmM25uYTd0ZWtqbDIiLCJldmVudF9pZCI6IjIwODBkYzI2LTBjM2UtNDI0Zi1iODYzLWUxYTk5YTY3NmU5MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU5ODkxMzU2LCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjU5ODk0OTU2LCJpYXQiOjE2NTk4OTEzNTYsImp0aSI6IjI4OTYzNWIwLWUxNzYtNDViZi04NTIxLTEwMDczYWM2Mjk3NSIsImVtYWlsIjoidGVzdGZ1bGxhY2Nlc3NAdGVzdC5jb20iLCJjdXN0b206QXB2bExldmxJZCI6IjAifQ.IpLEu2PTcEv5zIKyhRBfhguJoSh13W1WteBGx0wBrMZ_dzqqHPHB5RjSi-O701sWzgKhs0HM_siutjYVPgLV6eaEFYO0EXLFo27eX3Y3Z1Z0xfUgx9i46GN7qB91dTnf77SroNsqDyNKunf0hNXYc4V9VCBhAYwV03ZdrXtHxiBpdH0E0-ICHwuyR1KYc2m8KSYl-fEscl0-AGr71ITUlhZiC9j4P_Qlen0BaHt9Gx1gvzknlVMrjdYLpLai0j-cLoUS6G8loenc-AY27i1IxYH668baUgN4I3D0x9XpwpFNRm294_UV7radcUXHW9ylL0jsu5jp80gnoIYugqroQw"
        );
      expect(status).toBe(200);
    });

    it("Should return a given task", async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/merchant/${MerchantID}`)
        .set(
          "Authorization",
          "eyJraWQiOiJSM3dzUFVxUUxNVzhDTUZUZ3Q3U1JzXC9rY0VBZnVYTU1NaW1NaWpISWRodz0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206U3Vic2lkaWFyaWVzIjoiW1wiU0dcIixcIkpQXCJdIiwic3ViIjoiZTFjY2NmZDctZDEyMS00MWY1LTk0MjMtN2FkNmMyMzI1NjM2IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpHcm91cHMiOiJbXCJGUkFVRFwiLFwiUklTS1wiLFwiUklTS0lTU1VJTkdcIixcIlJJU0tNT05JVE9SSU5HXCIsXCJSSVNLQUNRVUlSSU5HXCIsXCJSSVNLQ09NUExJQU5DRVwiLFwiQ09NUExJQU5DRVwiLFwiT1BFUkFUSU9OU1wiLFwiU0FMRVNcIixcIlNBTEVTT1BTXCIsXCJTVVBQT1JUXCIsXCJQQ0lEU1NcIixcIlBPU1NVUFBPUlRcIixcIkNPT1JESU5BVE9SXCIsXCJJTlRFR1JBVElPTlwiLFwiU0VUVExFTUVOVFwiLFwiU1lTQURNSU5cIixcIlRISVJEUEFSVFlcIl0iLCJjdXN0b206SXNJbnRlcm5hbCI6ImZhbHNlIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzBhREFwOHFWRyIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0ZnVsbGFjY2Vzc3Rlc3Rjb20iLCJtaWRkbGVfbmFtZSI6Im51bGwiLCJvcmlnaW5fanRpIjoiZTM3NzE4YzItNGRiOC00OTA4LTk1M2MtYWYxYjI4ZmQwYjdlIiwiYXVkIjoiNjMxbHAxMjE0OHRqcDhmM25uYTd0ZWtqbDIiLCJldmVudF9pZCI6IjIwODBkYzI2LTBjM2UtNDI0Zi1iODYzLWUxYTk5YTY3NmU5MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU5ODkxMzU2LCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNjU5ODk0OTU2LCJpYXQiOjE2NTk4OTEzNTYsImp0aSI6IjI4OTYzNWIwLWUxNzYtNDViZi04NTIxLTEwMDczYWM2Mjk3NSIsImVtYWlsIjoidGVzdGZ1bGxhY2Nlc3NAdGVzdC5jb20iLCJjdXN0b206QXB2bExldmxJZCI6IjAifQ.IpLEu2PTcEv5zIKyhRBfhguJoSh13W1WteBGx0wBrMZ_dzqqHPHB5RjSi-O701sWzgKhs0HM_siutjYVPgLV6eaEFYO0EXLFo27eX3Y3Z1Z0xfUgx9i46GN7qB91dTnf77SroNsqDyNKunf0hNXYc4V9VCBhAYwV03ZdrXtHxiBpdH0E0-ICHwuyR1KYc2m8KSYl-fEscl0-AGr71ITUlhZiC9j4P_Qlen0BaHt9Gx1gvzknlVMrjdYLpLai0j-cLoUS6G8loenc-AY27i1IxYH668baUgN4I3D0x9XpwpFNRm294_UV7radcUXHW9ylL0jsu5jp80gnoIYugqroQw"
        );
      body.MerchantID = MerchantID;
      expect(status).toBe(200);
      expect(body).toBeDefined();

      expect(body.MerchantID).toEqual(merchantPayload.MerchantID);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
