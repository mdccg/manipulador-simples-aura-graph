import { Driver } from 'neo4j-driver';
import { Empresa } from './../models/Empresa';
import { Controller } from './Controller';
import { Colaborador } from './../models/Colaborador';
import { criarSessao } from './../config/db';

export class EmpresaController extends Controller {
  private _empresa: Empresa;
  
  constructor(driver: Driver, empresa: Empresa) {
    super(driver);
    this.empresa = empresa;
  }

  public get empresa(): Empresa {
    return this._empresa;
  }

  public set empresa(value: Empresa) {
    this._empresa = value;
  }

  async inserirNoGrafo() {
    const sessao = criarSessao(this.driver);
    try {
      const writeQuery = `
        CREATE (:Empresa { nome: $nome_empresa })
      `;

      await sessao.executeWrite(transactionWork =>
        transactionWork.run(writeQuery, {
          nome_empresa: this.empresa.nome
        })
      );
      
      console.info(`A empresa ${this.empresa.nome} foi criada com sucesso.`);

    } catch(erro) {
      console.error(`Houston, temos um problema: ${erro}`);

    } finally {
      await sessao.close();
    }
  }

  async contratar(colaborador: Colaborador) {
    const sessao = criarSessao(this.driver);

    try {
      const writeQuery = `
        MATCH (empresa:Empresa) WHERE empresa.nome = $nome_empresa
        CREATE (colaborador:Colaborador { nome: $nome_colaborador, genero: $genero_colaborador, data_nascimento: $data_nascimento_colaborador, ocupacao: $ocupacao_colaborador })
        CREATE (colaborador)-[:TRABALHA_EM]->(empresa)
      `;
  
      await sessao.executeWrite(transactionWork => 
        transactionWork.run(writeQuery, {
          nome_empresa: this.empresa.nome,
          nome_colaborador: colaborador.nome,
          genero_colaborador: colaborador.genero,
          data_nascimento_colaborador: `${colaborador.data_nascimento}`,
          ocupacao_colaborador: colaborador.ocupacao
        })
      );
  
      console.info(`O colaborador ${colaborador.nome} foi contratado pela empresa ${this.empresa.nome}.`);

    } catch(erro) {
      console.error(`Houston, temos um problema: ${erro}`);

    } finally {
      await sessao.close();

    }
  }

  async estabelecerMentoria(senior: Colaborador, junior: Colaborador) {
    const sessao = criarSessao(this.driver);

    try {
      const writeQuery = `
        MATCH (senior:Colaborador) WHERE senior.nome = $nome_senior
        MATCH (junior:Colaborador) WHERE junior.nome = $nome_junior
        CREATE (senior)-[:ORIENTA]->(junior)
      `;

      await sessao.executeWrite(transactionWork => 
        transactionWork.run(writeQuery, {
          nome_senior: senior.nome,
          nome_junior: junior.nome
        })  
      );

      console.info(`O colaborador ${senior.nome} agora está orientando o colaborador ${junior.nome}.`);

    } catch(erro) {
      console.error(`Houston, temos um problema: ${erro}`);

    } finally {
      sessao.close();
    }
  }
}