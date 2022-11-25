import { Entidade } from './Entidade';

export class Pessoa extends Entidade {
  private _nome: string;
  private _genero: string;
  private _data_nascimento: Date;

  constructor(nome: string, genero: string, data_nascimento: Date) {
    super();
    this.nome = nome;
    this.genero = genero;
    this.data_nascimento = data_nascimento;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get genero(): string {
    return this._genero;
  }

  public set genero(value: string) {
    this._genero = value;
  }

  public get data_nascimento(): Date {
    return this._data_nascimento;
  }

  public set data_nascimento(value: Date) {
    this._data_nascimento = value;
  }
}