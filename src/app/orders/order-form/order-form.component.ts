import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AppService, CustomerData, OrderData } from '../../app.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UUID } from 'angular2-uuid';

declare const $: any;

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  order : OrderData = null;
  savedCustomer : CustomerData = null;
  editMode : boolean;

  constructor(private appService : AppService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        if (params.id){
          this.editMode = true;
          this.order = {...this.appService.getOrderById(params.id)};
        }
        else{
            this.editMode = false;
            this.order = {
              id : UUID.UUID(),
              text : '',
              amount : null,
              costPerUnit : null,
              lastUpdateDate : null,
              customer : null
          }
          this.order.lastUpdateDate = new Date();
        }  
      }
    );
  }
  
  saveOrder(formEl : NgForm, event){
    if (!this.editMode){
      this.appService.pushOrder(this.order);
    }
    else{
      this.appService.saveOrder(this.order);
    }
    this.router.navigate(['orders']);
  }

}
