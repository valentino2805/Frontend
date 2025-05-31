export class Waste {
  id = "";
  typeWaste = "";
  amount = 0;

  constructor(waste: { id ?: string, typeWaste ?: string, amount ?: number}) {
    this.id = waste.id || "";
    this.typeWaste = waste.typeWaste || "";
    this.amount = waste.amount || 0;
  }
}
