import { Driver } from 'neo4j-driver';

export abstract class Controller {
  private _driver?: Driver | undefined;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  public get driver(): Driver | undefined {
    return this._driver;
  }

  public set driver(value: Driver | undefined) {
    this._driver = value;
  }
}