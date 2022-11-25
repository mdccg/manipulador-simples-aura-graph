import { Entidade } from './Entidade';

export class Empresa extends Entidade {
  private _nome: string;

  constructor(nome: string) {
    super();
    this.nome = nome;
  }

  public get nome(): string {
    return this._nome;
  }
  
  public set nome(value: string) {
    this._nome = value;
  }
}