import { Component, OnInit } from '@angular/core';
import { AppService, CustomerData } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayFilterPipe } from '../pipes/array.filter.pipe';

declare const $: any;

enum sortModes {
  name,
  date
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  providers : [
    ArrayFilterPipe]
})
export class CustomersComponent implements OnInit {
  page = 0;
  sortBy: sortModes = sortModes.date;
  sortAscending = [false, false];
  sortModesEnum = sortModes;
  
  sortF = (customer1: CustomerData, customer2: CustomerData) => {
    if (this.sortBy === sortModes.date) {
      const b = new Date(customer1.lastUpdateDate).getTime() - new Date(customer2.lastUpdateDate).getTime();
      return (this.sortAscending[this.sortBy] ? 1 : -1) * b;
    } else if (this.sortBy === sortModes.name) {
      debugger;
      const b = customer1.text > customer2.text;
      if (b && this.sortAscending[this.sortBy] || !b && !this.sortAscending[this.sortBy]) {
        return 1;
      } else if (b && !this.sortAscending[this.sortBy] || !b && this.sortAscending[this.sortBy]) {
        return -1;
      }

      return 0;
    }
  };

  constructor(
    public appService : AppService,
    public arrayFilter : ArrayFilterPipe,
    public activatedRoute : ActivatedRoute,
    public router : Router) {
  }

  ngOnInit() {
  }
  
  sortCustomers(requestedSortBy : string){
    const requestedSortByEnum : sortModes = sortModes[requestedSortBy];
    this.sortBy === requestedSortByEnum ? this.sortAscending[this.sortBy] = !this.sortAscending[this.sortBy] : this.sortBy = requestedSortByEnum;
    //To prevent redirection on anchor clicks
    return false;
  }

  onCustomerRemoval(id : String){
    if(this.showConfirmationMessage('מחיקת הלקוח תמחק את כל ההזמנות הקשורות. האם אתה בטוח?')){
      this.appService.removeCustomer(id);
    }
  }

  arr(l: number): number[] {
    return Array(Math.ceil(l)).fill(0).map((x, i) => i);
  }

  private showConfirmationMessage(message : string){
    return confirm(message);
  }
}
