import express, { Request, Response } from "express";
import PlaceOrderUseCase from "../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.factory";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "../../modules/checkout/usecase/place-order/place-order.dto";
import { OrderRepository } from "../../modules/checkout/repository/order.repository";

export const checkoutRoute = express.Router();
const repository = new OrderRepository();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();

    const usecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        catalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
    );

    try {

        const orderDto: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };

        const output: PlaceOrderOutputDto = await usecase.execute(orderDto);

        res.status(200).send(output);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});