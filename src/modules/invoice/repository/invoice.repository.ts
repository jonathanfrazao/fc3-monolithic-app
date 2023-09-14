import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRespository implements InvoiceGateway {

    async add(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: new Id(),
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: new Id(),
                name: item.name,
                price: item.price
            })),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
            include: ["items"]
        });

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`)
        }

        return new Invoice({
            id: new Id(invoice.dataValues.id),
            name: invoice.dataValues.name,
            document: invoice.dataValues.document,
            address: new Address(
                invoice.dataValues.address.street,
                invoice.dataValues.address.number,
                invoice.dataValues.address.complement,
                invoice.dataValues.address.city,
                invoice.dataValues.address.state,
                invoice.dataValues.address.zipCode
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