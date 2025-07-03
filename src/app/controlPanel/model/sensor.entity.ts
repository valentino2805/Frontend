export class Sensor {
  id = 0;
  serialNumber = "";
  wasteIds: number[] = [];
  location = "";
  status = "";
  batteryLevel = 0;
  lastReadingDate = "";
  typeSensor = "";
  units = "";
  capacity = "";
  currentLevel = "";
  percentage = "";
  collection = "";

  constructor(sensor: {
    id ?: number,
    serialNumber ?: string,
    wasteIds ?: number[],
    location ?: string,
    status ?: string,
    batteryLevel ?: number,
    lastReadingDate ?: string,
    typeSensor ?: string,
    units ?: string,
    capacity?: string,
    currentLevel?: string,
    percentage?: string,
    collection?: string
  }) {
    this.id = sensor.id || 0;
    this.serialNumber = sensor.serialNumber || "";
    this.wasteIds = sensor.wasteIds ? sensor.wasteIds : [] || null;
    this.location = sensor.location || "";
    this.status = sensor.status || "";
    this.batteryLevel = sensor.batteryLevel || 0;
    this.lastReadingDate = sensor.lastReadingDate || "";
    this.typeSensor = sensor.typeSensor || "";
    this.units = sensor.units || "";
    this.capacity = sensor.capacity || "";
    this.currentLevel = sensor.currentLevel || "";
    this.percentage = sensor.percentage || "";
    this.collection = sensor.collection || "";
  }
}
