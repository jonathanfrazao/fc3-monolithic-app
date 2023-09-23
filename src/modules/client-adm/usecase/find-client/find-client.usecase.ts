import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase {
    private _clientrepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientrepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

        const result = await this._clientrepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            email: result.email,
            document: result.document,
            street: result.street,
            complement: result.complement,
            number: result.number,
            city: result.city,
            state: result.state,
            zipcode: result.zipcode,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };
    }
}