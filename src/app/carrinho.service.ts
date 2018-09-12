import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

class CarrinhoService {

    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void{
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        //.find é nativo
        //aqui temos uma REFERÊNCIA para o item dentro do array this.itens
        //caso a condição seja atendida e o item for retornado
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        } else {
            this.itens.push(itemCarrinho)
        }
    }

    public totalCarrinhoCompra(): number {
        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })

        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
        
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
        
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1
            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
            }
        } 
    }

    public limparCarrinho(): void {
        this.itens = []
    }
}

export { CarrinhoService }