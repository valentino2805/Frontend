import {AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import { MatOption, MatSelect} from "@angular/material/select";
import Chart from 'chart.js/auto';
import { Store } from '../../model/Store.entity';
import { ZoneService } from '../../../shared/services/zone.service';
import { GraphicService } from '../../../shared/services/graphic.service';
import { FormsModule } from "@angular/forms";

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


export class GraphicCreateComponent implements OnInit, AfterViewInit{

  currentStore: Store | null = null;
  selectedType: string = '';
  selectedTime: string = '';

  months = ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  currentDate = new Date();

  constructor(
    private graphicService: GraphicService,
    private zoneService: ZoneService
  ) {}

  stores: Store[] = [];

  ngOnInit(){
    // Si necesitas redibujar el gráfico desde otro lugar, deberás volver a obtener las zonas y llamar a buildGraphic(zones)
  }

  @ViewChild('wasteChart') wasteChartRef!: ElementRef<HTMLCanvasElement>;
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

  randomArrayNumber(){
    let array = [];
    for (let i = 0; i < this.months.length; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
    return array;
  }

  ngAfterViewInit() {
    this.zoneService.getAll().subscribe((zones: Store[]) => {
      this.buildGraphic(zones);
    });
  }

  buildGraphic(zones: Store[]) {
    const ctx = this.wasteChartRef.nativeElement.getContext('2d');
    if (this.chart) this.chart.destroy();

    // Etiquetas de ejemplo (puedes hacerlas dinámicas si tienes fechas)
    const labels = ['Enero', 'Febrero', 'Marzo'];
    const colors = ['#E75C5C', '#22306A', '#4EC6D0', '#F7B801', '#A259F7', '#43AA8B'];
    const datasets = zones.map((zone, idx) => {
      // Suma de nivelActual de todos los sensores (puedes adaptar si tienes fechas)
      const data = labels.map(_ => {
        if (!zone.sensor) return 0;
        return zone.sensor.reduce((sum, s) => sum + (parseFloat(s.nivelActual) || 0), 0);
      });
      return {
        label: zone.name,
        data,
        backgroundColor: colors[idx % colors.length]
      };
    });

    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'kg' }
          }
        }
      }
    });
  }
}

