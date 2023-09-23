import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway"
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
    private _clientrepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientrepository = clientRepository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            email: input.email,
            document: input.document,
            street: input.street,
            complement: input.complement,
            number: input.number,
            city: input.city,
            state: input.state,
            zipcode: input.zipcode
        }

        const client = new Client(props);
        this._clientrepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            complement: client.complement,
            number: client.number,
            city: client.city,
            state: client.state,
            zipcode: client.zipcode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
}