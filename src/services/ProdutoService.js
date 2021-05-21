const PRODUTOS = '_PRODUTOS ' //key
export default class ProdutoService {

    salvar = (produto) =>{
        let produtos = localStorage.getItem(PRODUTOS)
        if(!produtos){
            produtos = []
        }else{
            produtos = JSON.parse(produtos) // string para array
        }
        produtos.push(produto)

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }
}