import {Waste} from "./Waste.entity";

export class Sensor {
  id = "";
  numberSensor = 0;
  wasteDetected: Waste[] = [];
  sensorUbication = "";
  status = "";
  batteryLevel = 0;
  lastReadingDate = "";
  typeSensor = "";
  unities = "";
  capacidad = "";
  nivelActual = "";
  porcentaje = "";
  recojo = "";

  constructor(sensor: {
    id: string,
    numberSensor: number,
    wasteDetected: Waste[],
    sensorUbication: string,
    status: string,
    batteryLevel: number,
    lastReadingDate: string,
    typeSensor: string,
    unities: string,
    capacidad?: string,
    nivelActual?: string,
    porcentaje?: string,
    recojo?: string
  }) {
    this.id = sensor.id;
    this.numberSensor = sensor.numberSensor;
    this.wasteDetected = sensor.wasteDetected ? sensor.wasteDetected : [];
    this.sensorUbication = sensor.sensorUbication;
    this.status = sensor.status;
    this.batteryLevel = sensor.batteryLevel ? sensor.batteryLevel : 0;
    this.lastReadingDate = sensor.lastReadingDate ? sensor.lastReadingDate : "";
    this.typeSensor = sensor.typeSensor ? sensor.typeSensor : "";
    this.unities = sensor.unities;
    this.capacidad = sensor.capacidad || "";
    this.nivelActual = sensor.nivelActual || "";
    this.porcentaje = sensor.porcentaje || "";
    this.recojo = sensor.recojo || "";
  }
}
