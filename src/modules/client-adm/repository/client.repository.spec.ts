import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            document: "0000",
            email: "x@x.com",
            street: "Address 1",
            complement: "complement",
            number: "1",
            city: "city",
            state: "state",
            zipcode: "zipCode"
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({ where: { id: "1" } });

        expect(clientDb).toBeDefined();
        expect(clientDb.dataValues.id).toBe(client.id.id);
        expect(clientDb.dataValues.name).toBe(client.name);
        expect(clientDb.dataValues.document).toBe(client.document);
        expect(clientDb.dataValues.email).toBe(client.email);
        expect(clientDb.dataValues.street).toBe(client.street);
        expect(clientDb.dataValues.complement).toBe(client.complement);
        expect(clientDb.dataValues.number).toBe(client.number);
        expect(clientDb.dataValues.state).toBe(client.state);
        expect(clientDb.dataValues.city).toBe(client.city);
        expect(clientDb.dataValues.zipcode).toBe(client.zipcode);
        expect(clientDb.dataValues.createdAt).toStrictEqual(client.createdAt);
        expect(clientDb.dataValues.updatedAt).toStrictEqual(client.updatedAt);
    });

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            document: "0000",
            email: "x@x.com",
            street: "Address 1",
            complement: "complement",
            number: "1",
            city: "city",
            state: "state",
            zipcode: "zipCode",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.dataValues.id);

        expect(result.id.id).toEqual(client.dataValues.id);
        expect(result.name).toEqual(client.dataValues.name);
        expect(result.document).toBe(client.dataValues.document);
        expect(result.email).toBe(client.dataValues.email);
        expect(result.street).toBe(client.dataValues.street);
        expect(result.complement).toBe(client.dataValues.complement);
        expect(result.number).toBe(client.dataValues.number);
        expect(result.state).toBe(client.dataValues.state);
        expect(result.city).toBe(client.dataValues.city);
        expect(result.zipcode).toBe(client.dataValues.zipcode);
        expect(result.createdAt).toStrictEqual(client.dataValues.createdAt);
        expect(result.updatedAt).toStrictEqual(client.dataValues.updatedAt);
    });
});