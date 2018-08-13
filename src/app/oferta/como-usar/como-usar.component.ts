import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(
    private route:ActivatedRoute,
    private ofertaService: OfertasService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      this.ofertaService.getComoUsarOferta(params.id)
      .then((descricao: string) =>{
        this.comoUsar = descricao
      })
      .catch((params:any) => {console.log(params)})
    })
  }

}
