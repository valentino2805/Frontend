import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIcon} from "@angular/material/icon";
import {GraphicCreateComponent} from "../graphic-create/graphic-create.component";
import {Store} from "../../model/Store.entity";
import {ZoneCreateComponent} from "../zone-create/zone-create.component";
import {ControlPanelComponent} from "../../pages/controlPanel.component";
import { v4 as uuidv4 } from 'uuid';
import {Waste} from "../../model/Waste.entity";
import {Sensor} from "../../model/Sensor.entity";
import {StoreService} from "../../../shared/services/store.service";
import {GraphicService} from "../../../shared/services/graphic.service";

@Component({
  selector: 'app-sensor-create-and-edit',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIcon],
  templateUrl: './sensor-create-and-edit.component.html',
  styleUrls: ['./sensor-create-and-edit.component.css']
})

// @Autor: Gabriel Gordon
// This component works with the manage of all the waste that company generate

export class SensorCreateAndEditComponent implements OnInit{

  currentStore: Store | null = null;

  @ViewChild('formAddSensor') formAddSensorRef!: ElementRef<HTMLFormElement>;
  @ViewChild(GraphicCreateComponent) graphicCreateComponent!: GraphicCreateComponent;

  constructor(
    private storeService: StoreService,
    private graphicService: GraphicService
  ) {}

  sensorSelected = "";
  store: Store[] = [];

  ngOnInit(){
    this.storeService.store$.subscribe(store => {
      this.currentStore = store;
      if (store) {
        this.store.push(store);
      }
    })
  }

  getStoreNameFromFthr(e: string){
    let form = this.formAddSensorRef.nativeElement;
    form.classList.toggle('return-to-hide');
    form.classList.toggle('bring-to-front');
    this.sensorSelected = e;
  }

  cancelAddNewSensor(){
    let form = this.formAddSensorRef.nativeElement;
    form.classList.toggle('bring-to-front');
    form.classList.toggle('return-to-hide');
  };



  //ADD SENSOR
  implementSensor(){
    const typeWaste = document.getElementById('type-waste') as HTMLInputElement;
    const ubication = document.getElementById('ubication') as HTMLInputElement;
    const unities = document.getElementById('unities-sensor') as HTMLInputElement;

    this.store.forEach(store => {
      if (store.name == this.sensorSelected){
        let id = uuidv4();
        let currentDate = new Date();

        let idWaste = uuidv4();
        let amountWaste = Math.floor(Math.random() * 40);

        let newWaste = new Waste({
          id: idWaste,
          typeWaste: typeWaste.value,
          amount: amountWaste
        })

        let newSensor = new Sensor({id: id, numberSensor: 0, wasteDetected: [newWaste],
          sensorUbication: ubication.value, status: "Active", batteryLevel: 100,
          lastReadingDate: currentDate.toDateString(), typeSensor: "waste detection", unities: unities.value
        })
        store.sensor.push(newSensor)
        store.amountSensor++;
        console.log(store)
      }
    })
    let form = this.formAddSensorRef.nativeElement;
    form.classList.toggle('return-to-hide');
    this.graphicService.triggerRedraw();

    typeWaste.value = '';
    ubication.value = '';
    unities.value = '';
  }




}

