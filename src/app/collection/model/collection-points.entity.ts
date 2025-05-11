export class CollectionPoint {
  id: number;
  name: string;
  schedule: string;
  phone: string;
  materials: string[];
  lat: number;
  lng: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.schedule = '';
    this.phone = '';
    this.materials = [];
    this.lat = 0;
    this.lng = 0;
  }
}
