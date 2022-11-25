import neo4j, { Driver, AuthToken, Session } from 'neo4j-driver';

export const criarDriver = (): Driver => {
  const uri: string = process.env.DATABASE_URI_CONNECTION as string;
  const user: string = process.env.DATABASE_USER_NAME as string;
  const password: string = process.env.DATABASE_USER_PASSWORD as string;
  const authToken: AuthToken = neo4j.auth.basic(user, password);
  const driver: Driver = neo4j.driver(uri, authToken);
  return driver;
}

export const criarSessao = (driver: Driver): Session => {
  const sessao = driver.session({ database: 'neo4j' });
  return sessao;
}

export const resetarGrafo = async (driver: Driver) => {
  const sessao = criarSessao(driver);

  try {
    let writeQuery: string;

    writeQuery = `MATCH (a) - [b] -> (c) DELETE a, b, c`;
    await sessao.executeWrite(transactionWork => transactionWork.run(writeQuery));
    
    writeQuery = `MATCH (a) DELETE a`;
    await sessao.executeWrite(transactionWork => transactionWork.run(writeQuery));
    
    console.info('Grafo resetado.');

  } catch(erro) {
    console.error(`Houston, temos um problema: ${erro}`);

  } finally {
    sessao.close();

  }
}