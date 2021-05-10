import { Storage } from '@ionic/storage-angular';
import { Contrato } from '../../model/contrato.model';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

const KEY = 'contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private store: Storage | null = null;

  constructor(private storage: Storage) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Contrato[]> {
    if (!this.store) {
      await this.init();
    }

    return await this.store.get(KEY) || [];
  }

  public async inserir(contrato: Contrato): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    contrato.id = uuid();
    const list = await this.listar() || [];
    list.push(contrato);
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(contrato: Contrato): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(v => v.id).indexOf(contrato.id);
    list[index] = contrato;
    await this.store?.set(KEY, list);
    return true;
  }

}
