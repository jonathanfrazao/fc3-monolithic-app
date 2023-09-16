import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

//Item 1
const invoiceItem = new InvoiceItems({
    id: new Id("1"),
    name: "Invoice Item 1",
    price: 20,
})
//

//Item 2
const invoiceItem2 = new InvoiceItems({
    id: new Id("2"),
    name: "Invoice Item 2",
    price: 80,
})
//

const invoiceProps = {
    id: new Id("1"),
    name: "Invoice 1",
    document: "123456789",
    address: new Address("Street", "1", "Complement", "City", "State", "123456789"),
    items: [invoiceItem, invoiceItem2]
};

const invoice = new Invoice(invoiceProps);

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(invoice),
    };
};

describe("Find Invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const input = {
            id: invoice.id.id
        }

        const result = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalledTimes(1)
        expect(invoice.name).toEqual(result.name);
        expect(invoice.document).toEqual(result.document);
        expect(invoice.address.street).toEqual(result.address.street);
        expect(invoice.address.number).toEqual(result.address.number);
        expect(invoice.address.complement).toEqual(result.address.complement);
        expect(invoice.address.city).toEqual(result.address.city);
        expect(invoice.address.zipCode).toEqual(result.address.zipCode);
        expect(100).toEqual(result.total);
        expect(invoice.items[0].id.id).toEqual(result.items[0].id);
        expect(invoice.items[0].name).toEqual(result.items[0].name);
        expect(invoice.items[0].price).toEqual(result.items[0].price);
        expect(invoice.items[1].id.id).toEqual(result.items[1].id);
        expect(invoice.items[1].name).toEqual(result.items[1].name);
        expect(invoice.items[1].price).toEqual(result.items[1].price);
    });
});