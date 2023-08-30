import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-admin.facade.interface";

export interface UseCasesprops{
   addUseCase: UseCaseInterface; 
   stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(usecasesProps: UseCasesprops){
        this._addUsecase = usecasesProps.addUseCase;
        this._checkStockUsecase = usecasesProps.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}