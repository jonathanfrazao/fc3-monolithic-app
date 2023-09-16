import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async add(invoice: Invoice): Promise<void> {
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
                price: item.price
            })),
            createdAt: invoice.createdAt || new Date(),
            updatedAt: invoice.updatedAt || new Date()
        },
        {
            include: [{ model: InvoiceItemModel }],
        })
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
            rejectOnEmpty: true,
            include: ["items"]
        });

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`)
        }
        console.log(invoice.dataValues)
        return new Invoice({
            id: new Id(invoice.dataValues.id),
            name: invoice.dataValues.name,
            document: invoice.dataValues.document,
            address: new Address(
                invoice.dataValues.street,
                invoice.dataValues.number,
                invoice.dataValues.complement,
                invoice.dataValues.city,
                invoice.dataValues.state,
                invoice.dataValues.zipCode
            ),
            items: invoice.items.map((item) => new InvoiceItems({
                id: new Id(item.dataValues.id),
                name: item.dataValues.name,
                price: item.dataValues.price,
                createdAt: item.dataValues.createdAt,
                updatedAt: item.dataValues.createdAt,
            })),
            createdAt: invoice.dataValues.createdAt,
            updatedAt: invoice.dataValues.updatedAt
        })
    }
}