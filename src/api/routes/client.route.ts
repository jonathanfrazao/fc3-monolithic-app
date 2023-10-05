import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create();

    try {

        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            street: req.body.street,
            complement: req.body.complement,
            number: req.body.number,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
        };

        await facade.add(clientDto);
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error);
    }
});