const PRODUTOS = '_PRODUTOS ' //key

export function Errorvalidacao(erros) {
    this.errors = erros
}

export default class ProdutoService {

    obterProdutos = () => {
        const produtos = localStorage.getItem(PRODUTOS)
        if (!produtos) {
            return []
        }
        return JSON.parse(produtos)
    }

    validar = (produto) => {
        const errors = []

        if (!produto.nome) {
            errors.push('O campo nome é obrigatório!')
        }
        if (!produto.sku) {
            errors.push('O campo SKU é obrigatório!')
        }
        if (!produto.preco || produto.preco <= 0) {
            errors.push('O campo Preço deve ter um valor maior que zero(0)!')
        }
        if (!produto.quantidade || produto.quantidade <= 0) {
            errors.push('O campo Quantidade deve ter um valor maior que zero(0)!')
        }
        if (!produto.fornecedor) {
            errors.push('O campo fornecedor é obrigatório!')
        }

        if (errors.length > 0) {
            throw new Errorvalidacao(errors)
        }
    }

    obterIndex = (sku) => {
        let index = null
        this.obterProdutos().forEach((produto, i) => {
            if (produto.sku === sku) {
                index = i
            }
        })

        return index
    }

    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if(index !== null){
            const produtos = this.obterProdutos()
            produtos.splice(index,1)
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
            return produtos // atualizado
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
        const index = this.obterIndex(produto.sku)
        
        if (index === null) {
            produtos.push(produto) // cadastro novo produto
        } else {
            produtos.splice(index,1) // remove
            produtos.splice(index,0,produto) //!  atualiza produto
        }

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }

}