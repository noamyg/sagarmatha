import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppService } from './app.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { SprintfPipe } from './pipes/sprintf.pipe';
import { ArrayFilterPipe } from './pipes/array.filter.pipe';
import { ArraySortPipe } from './pipes/array.sort.pipe';
import { ArrayTopPipe } from './pipes/array.top.pipe';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderFormComponent } from './orders/order-form/order-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SprintfPipe,
    ArrayFilterPipe,
    ArraySortPipe,
    ArrayTopPipe,
    CustomersComponent,
    CustomerFormComponent,
    OrdersComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2Webstorage
  ],
  providers: [
    AppService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
