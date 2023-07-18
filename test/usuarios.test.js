import supertest from 'supertest';
import assert from 'node:assert'
import chai from 'chai';
import { app } from '../src/server.js'; // Asegúrate de exportar el servidor desde tu archivo de servidor
const expect = chai.expect;
const requester = supertest;

describe('Pruebas de usuarios', () => {
    it('Debería retornar un código de estado 200 al obtener todos los usuarios', async () => {
      const response = await requester(app).get('/api/usuarios');
      expect(response.statusCode).to.equal(200);
    });
  
    it('Debería crear un nuevo usuario y retornar un código de estado 200', async () => {
      const nuevoUsuario = {
        input_first_name: 'John',
        input_last_name: 'Doe',
        input_email: 'johndoe@example.com',
        input_age: 30,
        input_password: '123456'
      };
  
      const response = await requester(app).post('/api/usuarios').send(nuevoUsuario);
      expect(response.statusCode).to.equal(200);
    });
  
    // Agrega más pruebas según tus requerimientos
  });