import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public usuario: number;
  public nombre: string;
  public id: number
  constructor() { }
}
