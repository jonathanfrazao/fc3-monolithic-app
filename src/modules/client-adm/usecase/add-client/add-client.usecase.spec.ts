import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe("add client usecase unit test", () => {
    it("shoul add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            document: "0000",
            street: "Address 1",
            complement: "complement",
            number: "1",
            city: "city",
            state: "state",
            zipcode: "zipCode"
        }

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.complement).toBe(input.complement);
        expect(result.number).toBe(input.number);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipcode).toBe(input.zipcode);
    })
})