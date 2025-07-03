export class Waste {
  id = 0;
  typeWaste = "";
  name = "";
  amount = 0;

  constructor(waste: { id ?: number, typeWaste ?: string, name ?: string, amount ?: number}) {
    this.id = waste.id || 0;
    this.typeWaste = waste.typeWaste || "";
    this.name = waste.name || "";
    this.amount = waste.amount || 0;
  }
}
