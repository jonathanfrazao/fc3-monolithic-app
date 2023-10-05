import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app).post("/clients").send({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "0000",
            street: "Address 1",
            complement: "complement",
            number: "1",
            city: "city",
            state: "state",
            zipcode: "zipCode"
        });

        expect(response.status).toEqual(201);
    });
});