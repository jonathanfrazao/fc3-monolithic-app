import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-items.entity";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
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

    it("should create a invoice", async () => {

        let items: InvoiceItems[] = []

        //Item 1
        const invoiceItemProps = {
            id: new Id("1"),
            name: "Invoice Item 1",
            price: 20,
        }
        const invoiceItem = new InvoiceItems(invoiceItemProps)
        items.push(invoiceItem)
        //

        //Item 2
        const invoiceItemProps2 = {
            id: new Id("2"),
            name: "Invoice Item 2",
            price: 80,
        }
        const invoiceItem2 = new InvoiceItems(invoiceItemProps2)
        items.push(invoiceItem2)
        //

        const invoiceProps = {
            id: new Id("1"),
            name: "Invoice 1",
            document: "123456789",
            address: new Address("Street", "1", "Complement", "City", "State", "123456789"),
            items: items
        };

        const invoice = new Invoice(invoiceProps);
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.add(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoiceProps.id.id },
            include: ['items']
        });

        expect(invoiceProps.id.id).toEqual(invoiceDb.dataValues.id);
        expect(invoiceProps.name).toEqual(invoiceDb.dataValues.name);
        expect(invoiceProps.document).toEqual(invoiceDb.dataValues.document);
        expect(invoiceProps.address.street).toEqual(invoiceDb.dataValues.street);
        expect(invoiceProps.address.number).toEqual(invoiceDb.dataValues.number);
        expect(invoiceProps.address.complement).toEqual(invoiceDb.dataValues.complement);
        expect(invoiceProps.address.city).toEqual(invoiceDb.dataValues.city);
        expect(invoiceProps.address.zipCode).toEqual(invoiceDb.dataValues.zipCode);
        expect(invoiceItemProps.id.id).toEqual(invoiceDb.dataValues.items[0].dataValues.id);
        expect(invoiceItemProps.name).toEqual(invoiceDb.dataValues.items[0].dataValues.name);
        expect(invoiceItemProps.price).toEqual(invoiceDb.dataValues.items[0].dataValues.price);
        expect(invoiceItemProps2.id.id).toEqual(invoiceDb.dataValues.items[1].dataValues.id);
        expect(invoiceItemProps2.name).toEqual(invoiceDb.dataValues.items[1].dataValues.name);
        expect(invoiceItemProps2.price).toEqual(invoiceDb.dataValues.items[1].dataValues.price);
    });

    it("should find a invoice", async () => {

        let items: InvoiceItems[] = []

        //Item 1
        const invoiceItemProps = {
            id: new Id("1"),
            name: "Invoice Item 1",
            price: 20,
        }
        const invoiceItem = new InvoiceItems(invoiceItemProps)
        items.push(invoiceItem)
        //

        //Item 2
        const invoiceItemProps2 = {
            id: new Id("2"),
            name: "Invoice Item 2",
            price: 80,
        }
        const invoiceItem2 = new InvoiceItems(invoiceItemProps2)
        items.push(invoiceItem2)
        //

        const invoiceProps = {
            id: new Id("1"),
            name: "Invoice 1",
            document: "123456789",
            address: new Address("Street", "1", "Complement", "City", "State", "123456789"),
            items: items
        };

        const invoice = new Invoice(invoiceProps);

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
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

        const invoiceRepository = new InvoiceRepository()
        const invoiceDb = await invoiceRepository.find(invoice.id.id)

        expect(invoiceProps.id.id).toEqual(invoiceDb.id.id);
        expect(invoiceProps.name).toEqual(invoiceDb.name);
        expect(invoiceProps.document).toEqual(invoiceDb.document);
        expect(invoiceProps.address.street).toEqual(invoiceDb.address.street);
        expect(invoiceProps.address.number).toEqual(invoiceDb.address.number);
        expect(invoiceProps.address.complement).toEqual(invoiceDb.address.complement);
        expect(invoiceProps.address.city).toEqual(invoiceDb.address.city);
        expect(invoiceProps.address.zipCode).toEqual(invoiceDb.address.zipCode);
        expect(invoiceItemProps.id.id).toEqual(invoiceDb.items[0].id.id);
        expect(invoiceItemProps.name).toEqual(invoiceDb.items[0].name);
        expect(invoiceItemProps.price).toEqual(invoiceDb.items[0].price);
        expect(invoiceItemProps2.id.id).toEqual(invoiceDb.items[1].id.id);
        expect(invoiceItemProps2.name).toEqual(invoiceDb.items[1].name);
        expect(invoiceItemProps2.price).toEqual(invoiceDb.items[1].price);
    });
});