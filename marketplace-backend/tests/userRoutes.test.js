const request = require("supertest");
const app = require("../index");

describe("Pruebas de usuarios", () => {
  it("Debe registrar un nuevo usuario", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ name: "Juan", email: "juan@example.com", password: "123456" });
    expect(res.statusCode).toEqual(201);
  });

  it("Debe iniciar sesión con credenciales válidas", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "juan@example.com", password: "123456" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
