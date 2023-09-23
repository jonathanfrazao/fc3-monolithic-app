import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("ClientAdmFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: undefined,
        });

        const input = {
            id: "1",
            name: "Client 1",
            document: "0000",
            email: "x@x.com",
            street: "Address 1",
            complement: "complement",
            number: "1",
            city: "city",
            state: "state",
            zipcode: "zipCode"
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        expect(client.dataValues.name).toBe(input.name);
        expect(client.dataValues.email).toBe(input.email);
        expect(client.dataValues.document).toBe(input.document);
        expect(client.dataValues.street).toBe(input.street);
        expect(client.dataValues.complement).toBe(input.complement);
        expect(client.dataValues.number).toBe(input.number);
        expect(client.dataValues.city).toBe(input.city);
        expect(client.dataValues.state).toBe(input.state);
        expect(client.dataValues.zipcode).toBe(input.zipcode);
    });

    it("should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            document: "0000",
            email: "x@x.com",
            street: "Address 1",
            complement: "complement",
            number: "1",
            city: "city",
            state: "state",
            zipcode: "zipCode"
        };

        await facade.add(input);

        const client = await facade.find({ id: "1" });

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document);
        expect(client.street).toBe(input.street);
        expect(client.complement).toBe(input.complement);
        expect(client.number).toBe(input.number);
        expect(client.city).toBe(input.city);
        expect(client.state).toBe(input.state);
        expect(client.zipcode).toBe(input.zipcode);
    });
});