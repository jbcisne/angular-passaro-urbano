import { Oferta } from "./shared/oferta.model";
import { Http, Response } from "../../node_modules/@angular/http";
import { Injectable } from "../../node_modules/@angular/core";
import { URL_API } from "./app.api";
import { Observable } from "../../node_modules/rxjs";
import { map, retry } from "../../node_modules/rxjs/operators";

@Injectable()
export class OfertasService {

    constructor(private http: Http){}

    public getOferta(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas/${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getComoUsarOferta(id: Number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar/${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json().descricao)
    }

    public getOndeFicaOferta(id: Number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica/${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json().descricao)
    }

    public pesquisaOfertas(termoDaBusca: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termoDaBusca}`)
        .pipe(
            retry(10), //nr de tentativas em caso de erro
            map((resposta: Response) => resposta.json())
        )
    }


    /*
    public getOfertas2(): Promise<Array<Oferta>>{
        return new Promise((resolve, reject) => {
            console.log('Será que passou por aki');
            
            let deu_certo = true;
            if(deu_certo){
                setTimeout(() => {resolve(this.ofertas)}, 3000)
            }else{
                reject({codigo_erro:404, mensagem_erro:"Recuso não encontrado"});
            }
            
        })
        .then((ofertas: Array<Oferta>) => {
            console.log('1° then')
            return ofertas
        })
        .then((ofertas: Array<Oferta>) => {
            console.log('2° then')
            return new Promise((resolve2, reject2)=>{
                setTimeout(() => {resolve2(ofertas)}, 3000)
            })
        })
        .then((ofertas: Array<Oferta>) => {
            console.log('3° then apos 3s pois estava aguardando promise')
            return ofertas
        });
    }
    */
}