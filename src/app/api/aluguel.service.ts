import { ListAluguelService } from './list-aluguel.service';
import { Aluguel } from '../../model/aluguel.model';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

const KEY = 'aluguel';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {
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

  public async listar(): Promise<Aluguel[]> {
    if (!this.store) {
      await this.init();
    }
    return await this.listAluguelService.listar();
  }

  public async insereLote(alugueis: Aluguel[]): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    alugueis.forEach(aluguel => list.push(this.sanitize(aluguel)));
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(aluguel: Aluguel): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(v => v.id).indexOf(aluguel.id);
    list[index] = this.sanitize(aluguel);
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

  private sanitize(aluguel: Aluguel): Aluguel {
    // remove os objetos auxiliares
    delete aluguel.contrato;
    delete aluguel.aluguelOrigem;

    return aluguel;
  }

}
