import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { promise } from 'protractor';
import { Cep } from './cep';


@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http:Http) { }

  buscar(cep:string){
    return this.http.get('https://viacep.com.br/ws/'+cep+'/json/')
    .toPromise()
    .then(response => {
      console.log(response);
      return this.converterResposParaCep(response.json());
    });
  }

  private converterResposParaCep(cepNaResposta):Cep{
    let cep = new Cep();
    cep.cep = cepNaResposta.cep;
    cep.logradouro = cepNaResposta.logradouro;
    cep.complemento = cepNaResposta.complemento;
    cep.bairro = cepNaResposta.bairro;
    cep.cidade = cepNaResposta.cidade;
    cep.estado = cepNaResposta.uf;
    return cep;
  }

}
