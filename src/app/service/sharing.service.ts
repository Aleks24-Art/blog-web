import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private storageName: string = "ReloadCount";

  constructor() { }

  setReload(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  getReload() {
    let data = localStorage.getItem(this.storageName);
    // @ts-ignore
    return JSON.parse(data);
  }

  clearReloadSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }
}
