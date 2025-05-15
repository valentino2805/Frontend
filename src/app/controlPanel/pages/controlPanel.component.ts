import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {GraphicCreateComponent} from "../components/graphic-create/graphic-create.component";
import {SensorCreateAndEditComponent} from "../components/sensor-create-and-edit/sensor-create-and-edit.component";
import {ZoneCreateComponent} from "../components/zone-create/zone-create.component";
import {Store} from "../model/Store.entity";

@Component({
  selector: 'app-controlPanel',
  standalone: true,
  imports: [CommonModule, TranslateModule, GraphicCreateComponent, SensorCreateAndEditComponent, ZoneCreateComponent],
  templateUrl: './controlPanel.component.html',
  styleUrls: ['./controlPanel.component.css']
})

// @Autor: Gabriel Gordon
// This component works with the manage of all the waste that company generate

export class ControlPanelComponent implements AfterViewInit{

  @ViewChild(SensorCreateAndEditComponent) sensorCreateAndEditComponent!: SensorCreateAndEditComponent;
  @ViewChild(ZoneCreateComponent) zoneCreateComponent!: ZoneCreateComponent;

  stores: Store[] = [];

  ngAfterViewInit() {
    this.stores = this.zoneCreateComponent.store;
  }

  name = 'controlPanel';

  addNewSensor( e: string){
    this.sensorCreateAndEditComponent.getStoreNameFromFthr(e);
  };


}

