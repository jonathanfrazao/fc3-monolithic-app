import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../modules/product-adm/repository/product.model";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import { productsRoute } from "./routes/product.route";
import { clientsRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoicesRoute } from "./routes/invoice.route";
import { InvoiceItemModel } from "../modules/invoice/repository/invoice-item.model";

export const app: Express = express();
app.use(express.json());

app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoicesRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });

    sequelize.addModels([
        ProductModel,
        ClientModel,
        InvoiceModel,
        InvoiceItemModel,
    ]);

    await sequelize.sync();
}

setupDb();