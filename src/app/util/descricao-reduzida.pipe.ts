import { PipeTransform, Pipe } from "../../../node_modules/@angular/core";

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, truncarEm: number, iniciarEm: number): string {
        if (texto.length > truncarEm){
            return texto.substr(iniciarEm, truncarEm) + '...'
        }
        return texto;
    }
}