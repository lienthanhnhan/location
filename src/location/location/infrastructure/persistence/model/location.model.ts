export class Location {
  id: string;
  name: string;
  locationNumber: string;
  area: number;
  parentId?: string;

  constructor(data: Partial<Location>) {
    Object.assign(this, data);
  }
}
