export class Action {
  id: number;
  title: string;
  description: string;
  type: string;
  favorite: boolean;

  constructor(action: {
    id?: number,
    title?: string,
    description?: string,
    type?: string,
    favorite?: boolean
  }) {
    this.id = action.id || 0;
    this.title = action.title || '';
    this.description = action.description || '';
    this.type = action.type || '';
    this.favorite = action.favorite ?? false;
  }
}
