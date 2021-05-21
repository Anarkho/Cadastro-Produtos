const PRODUTOS = '_PRODUTOS ' //key

export function Errorvalidacao(erros) {
    this.errors = erros
}


export default class ProdutoService {

    obterProdutos = () =>{
        const produtos = localStorage.getItem(PRODUTOS)
        return JSON.parse(produtos)
    }

    validar = (produto) => {
        const errors = []

        if(!produto.nome){
            errors.push('O campo nome é obrigatório!')
        }
        if(!produto.sku){
            errors.push('O campo SKU é obrigatório!')
        }
        if(!produto.preco || produto.preco <=0 ){
            errors.push('O campo Preço deve ter um valor maior que zero(0)!')
        }
        if(!produto.quantidade || produto.quantidade <=0 ){
            errors.push('O campo Quantidade deve ter um valor maior que zero(0)!')
        }
        if(!produto.fornecedor){
            errors.push('O campo fornecedor é obrigatório!')
        }

        if (errors.length > 0) {
            throw new Errorvalidacao(errors)
        }
    }

    salvar = (produto) => {
        this.validar(produto)

        let produtos = localStorage.getItem(PRODUTOS)
        if (!produtos) {
            produtos = []
        } else {
            produtos = JSON.parse(produtos) // string para array
        }
        produtos.push(produto)

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }
}