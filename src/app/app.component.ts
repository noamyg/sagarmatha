import { Component, OnInit } from '@angular/core';
import { AppService, CustomerData, OrderData } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  constructor(public appService: AppService,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private localSt : LocalStorageService) {}

  ngOnInit() {
    this.loadData();
    this.saveCustomersOnChanges();
  }

  loadData() {
    this.appService.customers = this.localSt.retrieve("customersLocalData") ? this.localSt.retrieve("customersLocalData") : []; 
    this.appService.orders = this.localSt.retrieve("ordersLocalData") ? this.localSt.retrieve("ordersLocalData") : [];
    this.router.navigate(['/customers']);
  }

  saveCustomersOnChanges(){
    this.appService.customersChanged.subscribe(
      (customers : CustomerData[]) => {
        this.localSt.store("customersLocalData", customers)
      }
    )
    this.appService.ordersChanged.subscribe(
      (orders : OrderData[]) => {
        this.localSt.store("ordersLocalData", orders)
      }
    )
  }


}
