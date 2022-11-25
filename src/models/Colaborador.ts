import { Pessoa } from './Pessoa';

export class Colaborador extends Pessoa {
  private _ocupacao: string;

  constructor(nome: string, genero: string, data_nascimento: Date, ocupacao: string) {
    super(nome, genero, data_nascimento);
    this.ocupacao = ocupacao;
  }

  public get ocupacao(): string {
    return this._ocupacao;
  }

  public set ocupacao(value: string) {
    this._ocupacao = value;
  }
}