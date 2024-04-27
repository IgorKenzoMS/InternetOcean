import { Connection } from 'mysql';
import { Conecta } from '../conexao';

export class Usuario {
    private connection : Connection;

    constructor(conexao: Conecta){
        this.connection = conexao.connection;
    }
    async createTableUsuario(dbName: string): Promise<void>{
        return new Promise((resolve, reject) =>{
            this.connection.query(`Use ${dbName};`, (useErro, useResults) =>{
                if (useErro) {
                    console.error('Erro ao selecionar o banco de dados:', useErro);
                    reject(useErro);
                }else {
                    console.log('Banco de dados selecionado com sucesso!');
                    this.connection.query(`create table if not exists usuario(
                        id_usuario int auto_increment primary key,
                        cpf int, rg varchar(9), nome varchar(50), foto varchar(50),
                        telefone varchar(14), email varchar(30), senha varchar(10),
                        endereco varchar(50), cep varchar(8), tipo int
                        );`, (error, results) =>{
                        if (error){
                            console.error('Erro ao criar a tabela:', error);
                            reject(error);
                        } else {
                            console.log('Tabela crida com sucesso!');
                            resolve();
                        }
                    })
                }
            })
        })
    } 

}