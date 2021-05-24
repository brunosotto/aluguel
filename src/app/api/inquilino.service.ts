import { Inquilino } from '../../model/inquilino.model';
import { TABELAS } from '../configurar/constants';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

const KEY = TABELAS.INQUILINO;

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {
  private store: Storage | null = null;

  constructor(
    private storage: Storage,
  ) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Inquilino[]> {
    if (!this.store) {
      await this.init();
    }

    return await this.store.get(KEY) || [];
  }

  public async inserir(inquilino: Inquilino): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    inquilino.id = uuid();
    const list = await this.listar() || [];
    list.push(inquilino);
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(inquilino: Inquilino): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(v => v.id).indexOf(inquilino.id);
    list[index] = inquilino;
    await this.store?.set(KEY, list);
    return true;
  }

  public async clear(): Promise<void> {
    if (!this.store) {
      await this.init();
    }

    await this.store?.set(KEY, []);
    return;
  }

}
