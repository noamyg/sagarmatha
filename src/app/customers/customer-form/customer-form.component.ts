import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AppService, CustomerData } from '../../app.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  customer : CustomerData = null;
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
          this.customer = {...this.appService.getCustomerById(params.id)};
        }
        else{
            this.editMode = false;
            this.customer = {
              id : UUID.UUID(),
              text : '',
              lastUpdateDate : null
          }
          this.customer.lastUpdateDate = new Date();
        }  
      }
    )
  }

  saveCustomer(formEl : NgForm, event){
    if (!this.editMode){
      this.appService.pushCustomer(this.customer);
    }
    else{
      this.appService.saveCustomer(this.customer);
    }
    this.router.navigate(['customers']);
  }

}
