import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import clientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: clientEntity): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            complement: client.complement,
            number: client.number,
            city: client.city,
            state: client.state,
            zipcode: client.zipcode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }

    async find(id: string): Promise<clientEntity> {
        const client = await ClientModel.findOne({
            where: { id }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        return new Client({
            id: new Id(client.dataValues.id),
            name: client.dataValues.name,
            document: client.dataValues.document,
            email: client.dataValues.email,
            street: client.dataValues.street,
            complement: client.dataValues.complement,
            number: client.dataValues.number,
            city: client.dataValues.city,
            state: client.dataValues.state,
            zipcode: client.dataValues.zipcode,
            createdAt: client.dataValues.createdAt,
            updatedAt: client.dataValues.updatedAt
        });
    }
}