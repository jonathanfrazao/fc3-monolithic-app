import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create();

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

        const result = await invoiceFacade.generateInvoice(input);

        expect(input.id).toEqual(result.id);
        expect(input.name).toEqual(result.name);
        expect(input.document).toEqual(result.document);
        expect(input.street).toEqual(result.street);
        expect(input.number).toEqual(result.number);
        expect(input.complement).toEqual(result.complement);
        expect(input.city).toEqual(result.city);
        expect(input.zipCode).toEqual(result.zipCode);
        expect(input.items[0].id).toEqual(result.items[0].id);
        expect(input.items[0].name).toEqual(result.items[0].name);
        expect(input.items[0].price).toEqual(result.items[0].price);
        expect(input.items[1].id).toEqual(result.items[1].id);
        expect(input.items[1].name).toEqual(result.items[1].name);
        expect(input.items[1].price).toEqual(result.items[1].price);
    });

    it("should find a invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        //Item 1
        const invoiceItem = new InvoiceItems({
            id: new Id("1"),
            name: "Invoice Item 1",
            price: 20,
        });
        //

        //Item 2
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Invoice Item 2",
            price: 80,
        });
        //

        const input = {
            id: "1",
            name: "Invoice 1",
            document: "123456789",
            address: new Address("Street", "1", "Complement", "City", "State", "123456789"),
            items: [invoiceItem, invoiceItem2]
        };

        await InvoiceModel.create({
            id: input.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            items: input.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
            {
                include: [{ model: InvoiceItemModel }],
            });

        const result = await invoiceFacade.findInvoice(input);

        expect(input.id).toEqual(result.id);
        expect(input.name).toEqual(result.name);
        expect(input.document).toEqual(result.document);
        expect(input.address.street).toEqual(result.address.street);
        expect(input.address.number).toEqual(result.address.number);
        expect(input.address.complement).toEqual(result.address.complement);
        expect(input.address.city).toEqual(result.address.city);
        expect(input.address.zipCode).toEqual(result.address.zipCode);
        expect(invoiceItem.id.id).toEqual(result.items[0].id);
        expect(invoiceItem.name).toEqual(result.items[0].name);
        expect(invoiceItem.price).toEqual(result.items[0].price);
        expect(invoiceItem2.id.id).toEqual(result.items[1].id);
        expect(invoiceItem2.name).toEqual(result.items[1].name);
        expect(invoiceItem2.price).toEqual(result.items[1].price);
    });
});