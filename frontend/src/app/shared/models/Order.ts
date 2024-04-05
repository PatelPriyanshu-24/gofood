
import { LatLng } from "leaflet";
import { CartItems} from "./cartItems";

export class Order{
  id!:number;
  items!: CartItems [];
  totalPrice!:number;
  name!: string;
  address!: string;
  addressLatLng?:LatLng;
  paymentId!: string;
  createdAt!: string;
  status!: string;  
  // addressLatLng: any;
}