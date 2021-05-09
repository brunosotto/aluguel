import { Storage } from '@ionic/storage-angular';
import { Caixa } from '../../model/caixa.model';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

const KEY = 'caixa';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {
  private store: Storage | null = null;

  constructor(private storage: Storage) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Caixa[]> {
    if (!this.store) {
      await this.init();
    }

    return await this.store.get(KEY) || [];
  }

  public async inserir(lancamento: Caixa): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    lancamento.id = uuid();
    const list = await this.listar() || [];
    list.push(lancamento);
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(lancamento: Caixa): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(l => l.id).indexOf(lancamento.id);
    list[index] = lancamento;
    await this.store?.set(KEY, list);
    return true;
  }
}
