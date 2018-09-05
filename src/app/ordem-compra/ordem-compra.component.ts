import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    "enderco": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, [Validators.required])
  })

  public idPedidoCompra: number

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      alert('Formulário inválido');
      //this.formulario.get('endereco').markAsTouched()
      //this.formulario.get('numero').markAsTouched()
      //this.formulario.get('complemento').markAsTouched()
      //this.formulario.get('formaPagamento').markAsTouched()

    } else {
      let pedido: Pedido = new Pedido(
        this.formulario.value.enderco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
      )

      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido: number) => {
          this.idPedidoCompra = idPedido
      })

    }
    console.log(this.formulario)
  }
}
