class ItemCarrinho {
    constructor(
        public id: number,
        public img: object,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number
    ){}
}

/* 
 * Mais uma maneira de exportar. Neste caso posso exportar mais de uma class 
 * Ex.: export { Xpto, Ypto, Zpto }
 */
export { ItemCarrinho }