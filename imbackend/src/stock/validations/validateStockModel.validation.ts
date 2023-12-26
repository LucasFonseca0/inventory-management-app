import { StockItemModel } from "../models/StockModel";

export default function validateStockModel(item: object, itemModel: StockItemModel[]): true | string[] {
    const CopiedModel = [...itemModel];
    const copiedItem = { ...item };
    const errors: string[] = [];
  
    CopiedModel.forEach((e,i) => {
      if (!(e.key in item)) {
        errors.push(`should have ${e.key} in Item`);
      } else {
        delete copiedItem[e.key];
        delete CopiedModel[i];
        if (typeof item[e.key] != e.type) {
        errors.push(`the type in *${e.key}* is different from ModelType, it needs to be a *${e.type}*`);
      } }
      
    });
  
    if (Object.keys(copiedItem).length !== 0) {
      errors.push(`shouldn't have these items: ${Object.keys(copiedItem).join(', ')}`);
    }
  
    if (errors.length !== 0) {
      return errors;
    }


  
  
    return true;
  }