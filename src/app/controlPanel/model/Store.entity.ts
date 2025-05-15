import {Sensor} from "./Sensor.entity";

export class Store {
  id = "";
  name = "";
  numberStore = 0;
  amountSensor = 0;
  percent = "";
  sensor: Sensor[] = [];
  color = "";
  ubication = "";

  constructor(store: {
    id: string,
    name:string,
    numberStore: number,
    amountSensor: number,
    percent: string,
    sensor: Sensor[],
    color: string,
    ubication: string
  }) {
    this.id = store.id;
    this.name = store.name;
    this.numberStore = store.numberStore;
    this.amountSensor = store.amountSensor;
    this.percent = store.percent;
    this.sensor = store.sensor ? store.sensor : [];
    this.color = store.color;
    this.ubication = store.ubication;
  }
}
