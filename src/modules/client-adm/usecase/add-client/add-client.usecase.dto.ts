export interface AddClientInputDto {
    id?: string;
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

export interface AddClientOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    complement: string;
    number: string;
    city: string;
    state: string;
    zipcode: string;
    createdAt: Date;
    updatedAt: Date;
}