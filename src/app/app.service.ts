import { Subject } from "../../node_modules/rxjs";

export interface CustomerData {
    id: String;
    text: String;
    lastUpdateDate: Date
}

export interface OrderData {
  id: String;
  text: String;
  amount: number;
  costPerUnit: number;
  customer: CustomerData;
  lastUpdateDate: Date;
}

export class AppService {
  private _customers: CustomerData[] = [];
  private _orders: OrderData[] = [];
  customersChanged = new Subject<CustomerData[]>();
  ordersChanged = new Subject<OrderData[]>();

  get customers(): CustomerData[] {
    return this._customers.slice();
  }

  set customers(customers : CustomerData[]){
    this._customers = customers;
  }
  
  get orders(): OrderData[] {
    return this._orders.slice();
  }

  set orders(orders : OrderData[]){
    this._orders = orders;
  }

  removeCustomer(id : String){
    this._customers = this._customers.filter(
      element => {
          return element.id != id
      }
    );
    this._orders = this._orders.filter(
      element => {
        return element.customer.id != id
      }
    )
    this._customersChanged();
    this._ordersChanged();
  }

  saveCustomer(customer : CustomerData){
    this._customers.forEach((element, index) => {
      if(element.id === customer.id) {
          this._customers[index] = customer;
      }
    });
    this._customersChanged();
  }

  resetCustomers() {
    this._customers = [];
    this._customersChanged();
  }

  getCustomerById(id : String){
    return this._customers.find(
        element => {
            return element.id == id
        }
    )
  }

  pushCustomer(customer : CustomerData) {
    this._customers.push(customer);
    this._customersChanged();
  }

  private _customersChanged(){
    this.customersChanged.next(this._customers.slice());
  }
  
  removeOrder(id : String){
    this._orders = this._orders.filter(
      element => {
          return element.id != id
      }
    );
    this._ordersChanged();
  }

  saveOrder(order : OrderData){
    this._orders.forEach((element, index) => {
      if(element.id === order.id) {
          this._orders[index] = order;
      }
    });
    this._ordersChanged();
  }

  resetOrders() {
    this._orders = [];
    this._ordersChanged();
  }

  getOrderById(id : String){
    return this._orders.find(
        element => {
            return element.id == id
        }
    )
  }
  
  pushOrder(order : OrderData) {
    this._orders.push(order);
    this._ordersChanged();
  }

  getOrdersByCustomerId(customerId : String){
    return this._orders.filter(
        element => {
            return element.customer.id == customerId
        }
    )
  }
  
  private _ordersChanged(){
    this.ordersChanged.next(this._orders.slice());
  }

}
