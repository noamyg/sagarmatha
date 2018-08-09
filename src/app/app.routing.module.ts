import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderFormComponent } from './orders/order-form/order-form.component';

const APP_ROUTES: Routes = [
  {path: 'customers', component: CustomersComponent, children : [
    { path : 'new', component : CustomerFormComponent },
    { path : ':id/edit', component : CustomerFormComponent },
  ]},
  {path: 'orders', component: OrdersComponent, children : [
    { path : 'new', component : OrderFormComponent },
    { path : ':id/edit', component : OrderFormComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
