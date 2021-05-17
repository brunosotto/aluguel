import { ListAluguelService } from './list-aluguel.service';
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

  constructor(
    private storage: Storage,
    private listAluguelService: ListAluguelService,
  ) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Caixa[]> {
    if (!this.store) {
      await this.init();
    }

    const lancamentos = await this.store.get(KEY) || [];
    return await this.agregate(lancamentos);
  }

  public async inserir(lancamento: Caixa): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    lancamento.id = uuid();
    const list = await this.listar() || [];
    list.push(this.sanitize(lancamento));
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(lancamento: Caixa): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(l => l.id).indexOf(lancamento.id);
    list[index] = this.sanitize(lancamento);
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

  private async agregate(lancamentos: Caixa[]): Promise<Caixa[]> {
    const alugueis = await this.listAluguelService.listar();
    return lancamentos.map(c => {
      c.aluguel = alugueis.find(a => c.aluguelId === a.id);
      return c;
    });
  }

  private sanitize(lancamento: Caixa): Caixa {
    // remove os objetos auxiliares
    delete lancamento.aluguel;

    return lancamento;
  }
}
