import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Generate Invoice usecase unit test", () => {
    it("should generate a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
            id: "1",
            name: "Invoice 1",
            document: "123456789",
            street: "Street",
            number: "1",
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "123456789",
            items: [{
                id: "1",
                name: "Invoice Item 1",
                price: 20,
            },
            {
                id: "2",
                name: "Invoice Item 2",
                price: 80,
            }]
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.add).toHaveBeenCalledTimes(1)
        expect(input.name).toEqual(result.name);
        expect(input.document).toEqual(result.document);
        expect(input.street).toEqual(result.street);
        expect(input.number).toEqual(result.number);
        expect(input.complement).toEqual(result.complement);
        expect(input.city).toEqual(result.city);
        expect(input.zipCode).toEqual(result.zipCode);
        expect(100).toEqual(result.total);
        expect(input.items[0].id).toEqual(result.items[0].id);
        expect(input.items[0].name).toEqual(result.items[0].name);
        expect(input.items[0].price).toEqual(result.items[0].price);
        expect(input.items[1].id).toEqual(result.items[1].id);
        expect(input.items[1].name).toEqual(result.items[1].name);
        expect(input.items[1].price).toEqual(result.items[1].price);
    });
});