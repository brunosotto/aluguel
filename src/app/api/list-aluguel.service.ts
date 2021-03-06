import { ContratoService } from './contrato.service';
import { Aluguel } from '../../model/aluguel.model';
import { TABELAS } from '../configurar/constants';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

const KEY = TABELAS.ALUGUEL;

@Injectable({
  providedIn: 'root'
})
export class ListAluguelService {
  private store: Storage | null = null;

  constructor(
    private storage: Storage,
    private contratoService: ContratoService,
  ) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Aluguel[]> {
    if (!this.store) {
      await this.init();
    }

    const alugueis = await this.store.get(KEY) || [];
    return await this.agregate(alugueis);
  }

  private async agregate(alugueis: Aluguel[]): Promise<Aluguel[]> {
    const contratos = await this.contratoService.listar();
    return alugueis.map(a => {
      a.contrato = contratos.find(c => a.contratoId === c.id);
      a.aluguelOrigem = alugueis.find(aa => a.aluguelOrigemId === aa.id);
      return a;
    });
  }

}
