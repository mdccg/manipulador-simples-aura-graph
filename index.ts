import dotenv from 'dotenv';
import { criarDriver, resetarGrafo } from './src/config/db';
import { Colaborador } from './src/models/Colaborador';
import { Empresa } from './src/models/Empresa';
import { EmpresaController } from './src/controllers/EmpresaController';

dotenv.config();

const funcaoPrincipal = async () => {
  const driver = criarDriver();
  await resetarGrafo(driver);

  const colaborador1: Colaborador = new Colaborador('Matheus D. C. C. Gomes', 'Masculino',    new Date(2001, 11 - 1, 27), 'Desenvolvedor Front-end Jr.');
  const colaborador2: Colaborador = new Colaborador('Diego A. Sant\'Ana',     'Masculino',    new Date(1889, 4 - 1, 16),  'Desenvolvedor Fullstack Sênior');
  const colaborador3: Colaborador = new Colaborador('Mestre Yoda',            'Desconhecido', new Date(3000, 1 - 1, 1),   'Mestre Jedi');
  
  const empresa: Empresa = new Empresa('Google');
  const empresaController: EmpresaController = new EmpresaController(driver, empresa);
  await empresaController.inserirNoGrafo();
  await empresaController.contratar(colaborador1);
  await empresaController.contratar(colaborador2);
  await empresaController.contratar(colaborador3);
  await empresaController.estabelecerMentoria(colaborador3, colaborador1); // Yoda orienta o Matheus
  await empresaController.estabelecerMentoria(colaborador3, colaborador2); // Yoda orienta o Diego
  await empresaController.estabelecerMentoria(colaborador2, colaborador1); // Diego orienta o Matheus

  await driver.close();
}

funcaoPrincipal();