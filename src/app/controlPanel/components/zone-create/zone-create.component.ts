import { Component, ElementRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIcon} from "@angular/material/icon";
import Swal from 'sweetalert2'
import {Store} from "../../model/Store.entity";
import { v4 as uuidv4 } from 'uuid';
import { ZoneService } from '../../../shared/services/zone.service';

@Component({
  selector: 'app-zone-create',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIcon],
  templateUrl: './zone-create.component.html',
  styleUrls: ['./zone-create.component.css']
})

// @Autor: Gabriel Gordon

export class ZoneCreateComponent implements OnInit {
  @Output() zoneAdded = new EventEmitter<void>();
  @Output() createGraphic = new EventEmitter<void>();
  numberOfStore = 0;
  store: Store[] = []

  constructor(private zoneService: ZoneService) {}

  @ViewChild('formAddZone') formAddZoneRef!: ElementRef<HTMLFormElement>;

  name = 'zone-create';

  ngOnInit() {
    this.zoneService.getAll().subscribe((zones: Store[]) => {
      this.store = zones;
      this.numberOfStore = zones.length;
    });
  }

  addNewZone(){
    let form = this.formAddZoneRef.nativeElement;
    form.classList.toggle('return-to-hide');
    form.classList.toggle('bring-to-front');
  };
  cancelAddNewZone(){
    let form = this.formAddZoneRef.nativeElement;
    form.classList.toggle('bring-to-front');
    form.classList.toggle('return-to-hide');
  };

  //Store, GRAPHIC AND SENSOR LOGIC
  //register the store on the page
  registerZone(){
    let form = this.formAddZoneRef.nativeElement;
    const nameZnInput = document.getElementById('nameZnInput') as HTMLInputElement;
    const ubicationZnInput = document.getElementById('ubicationZnInput') as HTMLInputElement;

    let zone = nameZnInput.value.trim();
    let ubicationZn = ubicationZnInput.value.trim();

    if (zone.length > 0 && ubicationZn.length > 0) {
      let randCl = "#" + Math.floor(Math.random() * 16777215).toString(16);
      let id = uuidv4();
      let num = this.numberOfStore + 1;
      this.numberOfStore++;

      let newStore = new Store({id: id, name: zone, numberStore: num, amountSensor: 0,
        percent: "0", sensor: [], color: randCl, ubication: ubicationZn});
      // Guardar en el backend
      this.zoneService.addZone(newStore).subscribe(() => {
        this.zoneAdded.emit();
      });

      nameZnInput.value = '';
      ubicationZnInput.value = '';

      form.classList.toggle('return-to-hide');
    }
    else{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "No let empty fields"
      });
    }
  }

  // Eliminar zona del backend
  deleteZone(id: string) {
    this.zoneService.deleteZone(id).subscribe(() => {
      this.store = this.store.filter((z: Store) => z.id !== id);
    });
  }

  onCreateGraphic() {
    this.createGraphic.emit();
  }
}

