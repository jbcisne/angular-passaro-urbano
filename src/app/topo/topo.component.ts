import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from '../../../node_modules/rxjs';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  constructor(private ofertaService: OfertasService) { }

  ngOnInit() {
  }

  public pesquisa(event: Event): void {
    let termoBusca = (<HTMLInputElement>event.target).value;
    this.ofertas = this.ofertaService.pesquisaOfertas(termoBusca)
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas)
    ) 
  }
}
