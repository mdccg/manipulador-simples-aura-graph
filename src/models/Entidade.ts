export abstract class Entidade {
  private _id?: number | undefined;

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number | undefined) {
    this._id = value;
  }

}