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
import {interval} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sensor-create-and-edit',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIcon, FormsModule],
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

  wasteTypes: string[] = ['glass', 'metal', 'paper', 'plastic', 'organic'];
  selectedType = "";

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

  randomFrom(list: string[]): string {
    return list[Math.floor(Math.random() * list.length)];
  }

  //ADD SENSOR
  implementSensor(){
    const typeWaste = document.getElementById('type-waste') as HTMLInputElement;
    const ubication = document.getElementById('ubication') as HTMLInputElement;
    const unities = document.getElementById('unities-sensor') as HTMLInputElement;

    const store = this.storesSource.filter(store => store.name == this.sensorSelected);

    /*
    * Add sensor to store
    * */
    let id = Math.floor(Math.random() * 1423 + 1345);
    this.sensorsSource.forEach(ss => {
      while (id === ss.id){
        id++;
      }
    })
    let currentDate = new Date();
    let capacities = Math.floor((Math.random() * 30)+70);
    let currentLevel = (Math.floor(Math.random() * 80)) + 20;

    /*
    * Add a name of waste about its type
    **/
    var GlassWastesList = ["Glass bottles", "Jars", "Perfume containers", "Glass cups"];
    var MetalWastesList = ["Cans", "Nails", "Screws", "Metal caps", "Aluminum foil"];
    var PaperWastesList = ["Newspapers", "Cardboard boxes", "Used sheets", "Magazines"];
    var PlasticWastesList = ["Plastic bottles", "Plastic caps", "Packaging", "Plastic bags"];
    var BrownWastesList = ["Fruit peels", "Food scraps", "Dry leaves", "Used coffee grounds"];

    let nameWaste = "";

    /*
    * Create Waste
    **/
    let arrayWaste: Waste[] = [];
    for (let i = 0; i < Math.floor(Math.random() * 4 + 1); i++){

      /**
       * Unique id for every waste
       * */
      let idWaste = Math.floor(Math.random() * 1423 + 1345);
      this.wastesSource.forEach(ss => {
        while (idWaste === ss.id){
          idWaste++;
        }
      });

      /**
       * Different name for every waste
       * @param: typeWaste.value
       * */
      switch (this.selectedType.toLowerCase()){
        case 'glass':
          nameWaste = this.randomFrom(GlassWastesList);
          break;
        case 'metal':
          nameWaste = this.randomFrom(MetalWastesList);
          break;
        case 'paper':
          nameWaste = this.randomFrom(PaperWastesList);
          break;
        case 'plastic':
          nameWaste = this.randomFrom(PlasticWastesList);
          break;
        case 'organic':
          nameWaste = this.randomFrom(BrownWastesList);
          break;
        default:
          nameWaste = "Unknown waste";
      }

      let amountWaste = Math.floor(Math.random() * 80 + 25);

      let newWaste = new Waste({
        id: idWaste,
        typeWaste: typeWaste.value,
        name: nameWaste,
        amount: amountWaste
      })
      arrayWaste.push(newWaste);
    }

    /****/
    function randomChars(charSet: string, length: number): string {
      return Array.from({ length }, () =>
        charSet.charAt(Math.floor(Math.random() * charSet.length))
      ).join('');
    }

    /*
    * Generation of serialNumber
    * example: 12BN-1M
    * */
    function generateSerialNumber(): string {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";

      const part1 = randomChars(numbers, 2) + randomChars(letters, 2);
      const part2 = randomChars(letters, 1) + randomChars(numbers, 1);

      return `${part1}-${part2}`;
    }

    /*
    * Connect waste with sensors && creation of one sensor
    **/
    arrayWaste.forEach(aw => {
      this.wasteService.createWaste(aw).subscribe();
    })

    let newSensor = new Sensor({id: id, serialNumber: generateSerialNumber(), wasteIds:arrayWaste.map(wi=>wi.id),
      location: ubication.value, status: "Active", batteryLevel: 100,
      lastReadingDate: currentDate.toDateString(), typeSensor: "waste detection",
      units: unities.value, capacity: capacities.toString(),
      currentLevel: currentLevel.toString(), percentage: "",
      collection: "No"
    })

    /*
    * Active the graphic with the new sensor
    * */
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

