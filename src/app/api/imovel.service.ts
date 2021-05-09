import { Storage } from '@ionic/storage-angular';
import { Imovel } from '../../model/imovel.model';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

const KEY = 'imovel';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private store: Storage | null = null;

  constructor(private storage: Storage) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Imovel[]> {
    if (!this.store) {
      await this.init();
    }

    return await this.store.get(KEY) || [];
  }

  public async inserir(imovel: Imovel): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    imovel.id = uuid();
    const list = await this.listar() || [];
    list.push(imovel);
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(imovel: Imovel): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(v => v.id).indexOf(imovel.id);
    list[index] = imovel;
    await this.store?.set(KEY, list);
    return true;
  }

}
