import Id from "../../@shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";

export class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      status: order.status,
      client: order.client,
      products: order.products
    });
  }

  async findOrder(id: string): Promise<Order> {
    const orderOnDB = await OrderModel.findByPk(id);

    return new Order({
        id: new Id(orderOnDB.dataValues.id),
        status: orderOnDB.dataValues.status,
        client: orderOnDB.dataValues.client,
        products: orderOnDB.dataValues.products
      });
  }
}