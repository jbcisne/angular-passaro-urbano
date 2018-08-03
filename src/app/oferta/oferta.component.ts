import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval } from '../../../node_modules/rxjs';
//import { Observable } from '../../../node_modules/rxjs';
//import { interval } from 'rxjs';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute, 
    private ofertaService: OfertasService
  ) { }

  ngOnInit() {

    this.ofertaService.getOferta(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
      .catch((params:any) => {console.log(params)})
/*
    this.route.params.subscribe(
      (parametro: any) => {console.log('parametro: ', parametro)},
      (erro: any) => {console.log('erro: ', erro)},
      () => {console.log('Processamento foi classificado como concluído.')}
    )
*/
    let tempo = interval(500)

    //tempo.subscribe((intervalo: number) => {
    //  console.log(intervalo)
    //})



  }

}
