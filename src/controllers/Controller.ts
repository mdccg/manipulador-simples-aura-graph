import { Driver } from 'neo4j-driver';

export abstract class Controller {
  private _driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  public get driver(): Driver {
    return this._driver;
  }

  public set driver(value: Driver) {
    this._driver = value;
  }
}