import { ReciboConfig } from '../../model/recibo-config.model';
import { TABELAS } from '../configurar/constants';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

const KEY = TABELAS.RECIBO_CONFIG;

@Injectable({
  providedIn: 'root'
})
export class ReciboConfigService {
  private store: Storage | null = null;

  constructor(
    private storage: Storage,
  ) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async obter(): Promise<ReciboConfig> {
    if (!this.store) {
      await this.init();
    }

    return await this.store.get(KEY) || {};
  }

  public async manter(config: ReciboConfig): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    await this.store?.set(KEY, config);
    return true;
  }

}
