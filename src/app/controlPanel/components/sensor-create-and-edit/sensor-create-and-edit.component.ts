import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIcon} from "@angular/material/icon";
import {GraphicCreateComponent} from "../graphic-create/graphic-create.component";
import {Store} from "../../model/store.entity";
import { v4 as uuidv4 } from 'uuid';
import {Waste} from "../../model/waste.entity";
import {Sensor} from "../../model/sensor.entity";
import {GraphicService} from "../../services/graphic.service";
import {ZoneApiService} from "../../services/zone-api.service";
import {SensorApiService} from "../../services/sensor-api.service";
import {WasteApiService} from "../../services/waste-api.service";

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

  protected storeData !: Store;
  protected sensorData !: Sensor;
  protected waste !: Waste;

  protected storesSource: Store[] = [];
  protected sensorsSource: Sensor[] = [];
  protected wastesSource: Waste[] = [];

  private storeService = inject(ZoneApiService);
  private sensorService = inject(SensorApiService);
  private wasteService = inject(WasteApiService);

  @ViewChild('formAddSensor') formAddSensorRef!: ElementRef<HTMLFormElement>;
  @ViewChild(GraphicCreateComponent) graphicCreateComponent!: GraphicCreateComponent;



  constructor(
    private graphicService: GraphicService
  ) {
    this.storeData = new Store({})
    this.sensorData = new Sensor({})
    this.waste = new Waste({})
  }

  sensorSelected = "";

  ngOnInit(){
    this.storeService.stores$.subscribe(stores => {
      this.storesSource = stores;
    });

    this.sensorService.sensor$.subscribe(sensors => {
      this.sensorsSource = sensors;
    });

    this.getAllWastes();
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

    const store = this.storesSource.filter(store => store.name == this.sensorSelected);

    let id = uuidv4();
    let currentDate = new Date();
    let capacities = Math.random() * 100;
    let currentLevel = Math.floor(Math.random() * 100);
    let percentage = Math.floor(Math.random() * 100);

    let idWaste = uuidv4();
    let amountWaste = Math.floor(Math.random() * 40);

    let newWaste = new Waste({
      id: idWaste,
      typeWaste: typeWaste.value,
      amount: amountWaste
    })

    let newSensor = new Sensor({id: id, sensorNumber: 0, wasteIds: [],
      location: ubication.value, status: "Active", batteryLevel: 100,
      lastReadingDate: currentDate.toDateString(), typeSensor: "waste detection",
      units: unities.value, capacity: capacities.toString(),
      currentLevel: currentLevel.toString(), percentage: percentage.toString(),
      collection: "No"
    })

    this.sensorService.createSensor(newSensor).subscribe({
      next: () => {
        store[0].sensorIds.push(id);
        store[0].amountSensor++;

        this.storeService.update(store[0].id, store[0]).subscribe(() => {
          this.storeService.updateStoreLocally(store[0]);

          let form = this.formAddSensorRef.nativeElement;
          form.classList.toggle('return-to-hide');
          typeWaste.value = '';
          ubication.value = '';
          unities.value = '';

          this.graphicService.triggerRedraw();
        });
      },
      error: (err) => {
        console.error('Error ', err);
      }
    });

    this.graphicService.triggerRedraw();

  }


  // Get all from api

  private getAllWastes() {
    this.wasteService.getAll().subscribe((wastes: Array<Waste>) => {
      this.wastesSource = wastes;
    });
  }


}

