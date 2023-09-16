import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasesprops{
    generateUseCase: UseCaseInterface; 
    findUseCase: UseCaseInterface;
 }
 
 export default class InvoiceFacade implements InvoiceFacadeInterface {
     private _generateUsecase: UseCaseInterface;
     private _findUsecase: UseCaseInterface;
 
     constructor(usecasesProps: UseCasesprops){
         this._generateUsecase = usecasesProps.generateUseCase;
         this._findUsecase = usecasesProps.findUseCase;
     }
 
     generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
         return this._generateUsecase.execute(input);
     }
     findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
         return this._findUsecase.execute(input);
     }
 }