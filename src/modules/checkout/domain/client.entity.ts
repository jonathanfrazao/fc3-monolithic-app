import AggregateRoot from "../../@shared/domain/entity/aggredate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
    id: Id;
    name: string;
    email: string;
    document: string;
    street: string;
    complement: string;
    number: string;
    city: string;
    state: string;
    zipcode: string;
}

export default class Client extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _document: string;
    private _email: string;
    private _street: string;
    private _complement: string;
    private _number: string;
    private _city: string;
    private _state: string;
    private _zipcode: string;

    constructor(props: ClientProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._email = props.email;
        this._street = props.street;
        this._complement = props.complement;
        this._number = props.number;
        this._state = props.state;
        this._city = props.city;
        this._zipcode = props.zipcode;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get email(): string {
        return this._email;
    }

    get street(): string {
        return this._street;
    }

    get complement(): string {
        return this._complement;
    }

    get number(): string {
        return this._number;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipcode(): string {
        return this._zipcode;
    }
}