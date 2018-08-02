import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    let idOferta = this.route.parent.snapshot.params['id']
    this.ofertaService.getComoUsarOferta(idOferta)
      .then((descricao: string) =>{
        this.comoUsar = descricao
        console.log(descricao)
      })
      .catch((params:any) => {console.log(params)})
  }

}
