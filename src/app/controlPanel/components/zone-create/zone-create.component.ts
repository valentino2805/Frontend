import { Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIcon} from "@angular/material/icon";
import Swal from 'sweetalert2'
import {Store} from "../../model/Store.entity";
import { v4 as uuidv4 } from 'uuid';
import {StoreService} from "../../../shared/services/store.service";


@Component({
  selector: 'app-zone-create',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIcon],
  templateUrl: './zone-create.component.html',
  styleUrls: ['./zone-create.component.css']
})

// @Autor: Gabriel Gordon

export class ZoneCreateComponent {
  numberOfStore = 0;
  store: Store[] = []

  constructor(private storeService: StoreService) {}

  @ViewChild('formAddZone') formAddZoneRef!: ElementRef<HTMLFormElement>;

  name = 'zone-create';

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
      this.store.push(newStore)

      nameZnInput.value = '';
      ubicationZnInput.value = '';

      console.log(this.store.map(store => (
        {
          id: store.id,
          numberStore: store.numberStore,
          amountSensor: store.amountSensor,
          percent: store.percent,
          sensor: store.sensor,
          color: store.color
        }
      )))

      this.saveStore(newStore)
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

  saveStore(store: Store){
    this.storeService.setStore(store)
  }

}

