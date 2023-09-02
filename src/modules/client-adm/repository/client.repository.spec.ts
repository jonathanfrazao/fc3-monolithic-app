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
            email: "x@x.com",
            address: "Address 1"
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({ where: { id: "1" } });

        expect(clientDb).toBeDefined();
        expect(clientDb.dataValues.id).toBe(client.id.id);
        expect(clientDb.dataValues.name).toBe(client.name);
        expect(clientDb.dataValues.email).toBe(client.email);
        expect(clientDb.dataValues.address).toBe(client.address);
        expect(clientDb.dataValues.createdAt).toStrictEqual(client.createdAt);
        expect(clientDb.dataValues.updatedAt).toStrictEqual(client.updatedAt);
    });

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.dataValues.id);

        expect(result.id.id).toEqual(client.dataValues.id);
        expect(result.name).toEqual(client.dataValues.name);
        expect(result.email).toEqual(client.dataValues.email);
        expect(result.address).toEqual(client.dataValues.address);
        expect(result.createdAt).toStrictEqual(client.dataValues.createdAt);
        expect(result.updatedAt).toStrictEqual(client.dataValues.updatedAt);
    });
});