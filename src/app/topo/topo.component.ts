import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from '../../../node_modules/rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertaService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
    .pipe(
      debounceTime(1000), // executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), // se o termo da pesquisa for igual ao termo da pesquisa anterior não faz a nova pesquisa
      switchMap((termoBusca: string) => {
        if (termoBusca.trim() === '') {
          return of<Oferta[]>([])
        }
        return this.ofertaService.pesquisaOfertas(termoBusca)
      }),
      catchError((erro: any) => {
        return of<Oferta[]>([])
      })
    )
  }

  public pesquisa(event: Event): void {
    let termoBusca = (<HTMLInputElement>event.target).value;
    this.subjectPesquisa.next(termoBusca);
  }

  public limparPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
