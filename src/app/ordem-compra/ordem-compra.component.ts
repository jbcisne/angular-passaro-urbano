import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.mode';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {
  
  public idPedidoCompra: number

  public endereco: string =''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  public enderecoValido: boolean
  public numeroValido: boolean 
  public complementoValido: boolean 
  public formaPagamentoValido: boolean 

//estado primitivo dos campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  public submitButton: string = 'disabled'

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    //this.ordemCompraService.efetivarCompra()
  }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco
    this.enderecoEstadoPrimitivo = false
    this.enderecoValido=false
    if (endereco.length > 3) {
      this.enderecoValido = true
    }else{
      this.enderecoValido=false
    }
    this.habilitaSubmitButton()
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero
    this.numeroEstadoPrimitivo = false
    if (numero !== '') {
      this.numeroValido = true
    } else {
      this.numeroValido=false
    }
    this.habilitaSubmitButton()
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento
    this.complementoEstadoPrimitivo = false
    this.complementoValido=false
    if (complemento.length > 3) {
      this.complementoValido = true
    }
    this.habilitaSubmitButton()
  }

  public atualizaFormaPagamento(fp: string): void {
    this.formaPagamento = fp
    this.formaPagamentoEstadoPrimitivo = false;
    if (fp !== '') {
      this.formaPagamentoValido = true
    } else {
      this.formaPagamentoValido=false
    }
    this.habilitaSubmitButton()
  }

  public habilitaSubmitButton(): void {
    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido) {
      this.submitButton = ''
    } else {
      this.submitButton = 'disabled'
    }
  }

  public confirmarCompra() {
    let pedido = new Pedido(
      this.endereco,
      this.numero,
      this.complemento,
      this.formaPagamento
    )
    
    this .ordemCompraService.efetivarCompra(pedido)
    .subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }
}
