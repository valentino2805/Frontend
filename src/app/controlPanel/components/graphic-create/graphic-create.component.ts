import {AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import { MatOption, MatSelect} from "@angular/material/select";
import Chart from 'chart.js/auto';
import {Store} from "../../model/Store.entity";
import {StoreService} from "../../../shared/services/store.service";
import {GraphicService} from "../../../shared/services/graphic.service";
import {FormsModule} from "@angular/forms";

interface Type {
  value: string;
  viewValue: string;
}

interface Time {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-graphic-create',
  standalone: true,
  imports: [FormsModule,CommonModule, TranslateModule, MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatSelect, MatOption],
  templateUrl: './graphic-create.component.html',
  styleUrls: ['./graphic-create.component.css']
})

// @Autor: Gabriel Gordon


export class GraphicCreateComponent implements OnInit{

  currentStore: Store | null = null;
  selectedType: string = '';
  selectedTime: string = '';

  months = ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  currentDate = new Date();

  constructor(
    private storeService: StoreService,
    private graphicService: GraphicService
  ) {}

  stores: Store[] = [];

  ngOnInit(){
    this.storeService.store$.subscribe(store => {
      this.currentStore = store;
      if (store) {
        this.stores.push(store);
      }
    })
    this.graphicService.redrawChart$.subscribe(() => {
      this.buildGraphic();
    });
  }


  @ViewChild('wasteChart') wasteChartRef!: ElementRef;
  chart: Chart | undefined;


  name = 'graphic-create';




  types: Type[] = [
    {value: 'none', viewValue: 'none'},
    {value: 'zone', viewValue: 'zone'},
    {value: 'type-waste', viewValue: 'type-waste'},
  ];
  times: Time[] = [
    {value: 'none', viewValue: 'none'},
    {value: 'monthly', viewValue: 'monthly'},
    {value: 'weekly', viewValue: 'weekly'},
    {value: 'annual', viewValue: 'annual'},
  ];





  //GENERATE A RANDOM NUMBER ARRAY
  randomArrayNumber(){
    let array = [];
    for (let i = 0; i < this.months.length; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
    return array;
  }

  // BUILD A GRAPHIC FOR STATISTICS
  buildGraphic() {
    const ctx = this.wasteChartRef.nativeElement.getContext('2d');

    //Destroy last graphic
    if (this.chart) {
      this.chart.destroy();
    }

    const  datasetsZn = this.stores
      .filter(store => store.amountSensor > 0)
      .map(store => ({
        label: store.name,
        data: this.randomArrayNumber().slice(0, this.currentMonth + 1),
        backgroundColor: store.color,
      }));

    //Build a new graphic
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months.slice(0, this.currentMonth + 1),
        datasets: datasetsZn,
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'kg'
            },
            beginAtZero: true
          }
        }
      }
    });
  }


}

