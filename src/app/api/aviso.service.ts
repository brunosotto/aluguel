import { TABELAS } from '../configurar/constants';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import moment from 'moment';

const KEY = TABELAS.AVISO;

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private store: Storage | null = null;

  constructor(
    private storage: Storage,
  ) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async mostrar(): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const last = await this.store.get(KEY) || null;
    return !last ? true : moment(last).diff(moment(), 'days') >= 14;
  }

  public async atualizar(): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    await this.store?.set(KEY, moment().toISOString());
    return true;
  }

}
