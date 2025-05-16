import {AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import {GraphicCreateComponent} from "../components/graphic-create/graphic-create.component";
import {SensorCreateAndEditComponent} from "../components/sensor-create-and-edit/sensor-create-and-edit.component";
import {ZoneCreateComponent} from "../components/zone-create/zone-create.component";
import {Store} from "../model/Store.entity";
import { ZoneService } from '../../shared/services/zone.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-controlPanel',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    GraphicCreateComponent,
    SensorCreateAndEditComponent,
    ZoneCreateComponent
  ],
  templateUrl: './controlPanel.component.html',
  styleUrls: ['./controlPanel.component.css']
})

// @Autor: Gabriel Gordon
// This component works with the manage of all the waste that company generate

export class ControlPanelComponent implements OnInit, AfterViewInit{

  @ViewChild(SensorCreateAndEditComponent) sensorCreateAndEditComponent!: SensorCreateAndEditComponent;
  @ViewChild(ZoneCreateComponent) zoneCreateComponent!: ZoneCreateComponent;

  stores: Store[] = [];
  selectedZone: Store | null = null;
  showAddSensorModal: boolean = false;
  showDeleteSensorModal: boolean = false;
  sensorForm = {
    id: '',
    numberSensor: 0,
    wasteDetected: [],
    typeSensor: '',
    sensorUbication: '',
    status: '',
    batteryLevel: 0,
    lastReadingDate: '',
    unities: '',
    capacidad: '',
    nivelActual: '',
    porcentaje: '',
    recojo: ''
  };

  showGraphic = true;

  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.loadZones();
  }

  ngAfterViewInit() {}

  name = 'controlPanel';

  addNewSensor(e: string){
    this.sensorCreateAndEditComponent.getStoreNameFromFthr(e);
  };

  loadZones() {
    this.zoneService.getAll().subscribe((zones: Store[]) => {
      this.stores = zones;
    });
  }

  onZoneAdded() {
    this.loadZones();
  }

  deleteZone(id: string) {
    this.zoneService.deleteZone(id).subscribe(() => {
      this.stores = this.stores.filter(z => z.id !== id);
    });
  }

  showZoneDetails(zone: Store) {
    this.selectedZone = zone;
  }

  closeZoneDetails() {
    this.selectedZone = null;
  }

  openAddSensorModal(zone: Store) {
    this.selectedZone = zone;
    this.showAddSensorModal = true;
    this.sensorForm = {
      id: uuidv4(),
      numberSensor: (zone.sensor ? zone.sensor.length + 1 : 1),
      wasteDetected: [],
      typeSensor: '',
      sensorUbication: '',
      status: '',
      batteryLevel: 0,
      lastReadingDate: '',
      unities: '',
      capacidad: '',
      nivelActual: '',
      porcentaje: '',
      recojo: ''
    };
  }

  closeAddSensorModal() {
    this.showAddSensorModal = false;
  }

  saveSensor() {
    if (!this.selectedZone) return;
    if (!this.selectedZone.sensor) this.selectedZone.sensor = [];
    this.selectedZone.sensor.push({ ...this.sensorForm });
    this.zoneService.updateZone(this.selectedZone.id, this.selectedZone).subscribe(() => {
      this.loadZones();
      this.showAddSensorModal = false;
      this.selectedZone = null;
    });
  }

  openDeleteSensorModal(zone: Store) {
    this.selectedZone = zone;
    this.showDeleteSensorModal = true;
  }

  closeDeleteSensorModal() {
    this.showDeleteSensorModal = false;
    this.selectedZone = null;
  }

  deleteSensor(sensorId: string) {
    if (!this.selectedZone) return;
    this.selectedZone.sensor = this.selectedZone.sensor.filter(s => s.id !== sensorId);
    this.zoneService.updateZone(this.selectedZone.id, this.selectedZone).subscribe(() => {
      this.loadZones();
      this.showDeleteSensorModal = false;
      this.selectedZone = null;
    });
  }

  toggleGraphic() {
    this.showGraphic = !this.showGraphic;
  }
}

