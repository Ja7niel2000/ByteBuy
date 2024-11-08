import { Item } from "./item"
export class Invoice{
    invoice_id:Number=0;
    rfc:String='';
    subtotal:Number =7572.6; 
    taxes:Number = 1442.4; 
    total:Number = 9015; 
    created_at:String= ""
    items:Array<Item>=[] ;
}