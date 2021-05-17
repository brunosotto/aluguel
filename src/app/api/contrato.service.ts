import { InquilinoService } from './inquilino.service';
import { Contrato } from '../../model/contrato.model';
import { Storage } from '@ionic/storage-angular';
import { ImovelService } from './imovel.service';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

const KEY = 'contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private store: Storage | null = null;

  constructor(
    private storage: Storage,
    private inquilinoService: InquilinoService,
    private imovelService: ImovelService
  ) {
  }

  async init(): Promise<boolean> {
    this.store = await this.storage.create();
    return true;
  }

  public async listar(): Promise<Contrato[]> {
    if (!this.store) {
      await this.init();
    }

    const contratos = await this.store.get(KEY) || [];
    return await this.agregate(contratos);
  }

  public async listarAtivos(): Promise<Contrato[]> {
    if (!this.store) {
      await this.init();
    }

    return (await this.listar())
      .filter(v => !v.obsoleto)
      .filter(v => !v.dataEncerramento);
  }

  public async inserir(contrato: Contrato): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    // coloca id
    contrato.id = uuid();
    const list = await this.listar() || [];
    list.push(this.sanitize(contrato));
    await this.store?.set(KEY, list);
    return true;
  }

  public async alterar(contrato: Contrato): Promise<boolean> {
    if (!this.store) {
      await this.init();
    }

    const list = await this.listar() || [];
    const index = list.map(v => v.id).indexOf(contrato.id);
    list[index] = this.sanitize(contrato);
    await this.store?.set(KEY, list);
    return true;
  }

  public async getSequencia(contrato: Contrato): Promise<string> {
    if (!this.store) {
      await this.init();
    }

    const sequencia = contrato.sequencia;
    contrato.sequencia = (Number(contrato.sequencia)+1).toString();
    await this.alterar(contrato);
    return sequencia;
  }

  public async clear(): Promise<void> {
    if (!this.store) {
      await this.init();
    }

    await this.store?.set(KEY, []);
    return;
  }

  private async agregate(contratos: Contrato[]): Promise<Contrato[]> {
    const inquilinos = await this.inquilinoService.listar();
    const imoveis = await this.imovelService.listar();
    return contratos.map(c => {
      c.inquilino = inquilinos.find(i => c.inquilinoId === i.id);
      c.imovel = imoveis.find(i => c.imovelId === i.id);
      return c;
    });
  }

  private sanitize(contrato: Contrato): Contrato {
    // remove os objetos auxiliares
    delete contrato.inquilino;
    delete contrato.imovel;

    return contrato;
  }

}
