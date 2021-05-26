import React, { Component } from 'react'
import Card from '../../components/Card'
import ProdutoService from '../../services/ProdutoService'
import TabelaProdutos from '../produtos/TabelaDeProdutos'

import { withRouter } from 'react-router-dom'

const PESQUISA = '_PESQUISA'

class ConsultaProdutos extends Component {

    letras = []
    arrayPesquisa = []
    arrValores = []

    state = {
        produtos: [],
        digito: []

    }

    constructor() {
        super()
        this.service = new ProdutoService()
    }

    pesquisar = (valor) => {
        valor = this.state.digito

        localStorage.removeItem(PESQUISA, JSON.stringify(this.arrayPesquisa))
        const lista = this.service.obterProdutos()
        lista.filter((produto, i) => {

            this.service.obterProdutos()
            const prod = produto.nome.toLowerCase()
            console.log(prod)

            if (produto.nome === valor) {
                this.arrayPesquisa = [produto]
                localStorage.setItem(PESQUISA, JSON.stringify(this.arrayPesquisa))
            }

            return produto
        })
    }

    componentDidMount() {
        let produtos = this.service.obterProdutos()
        this.setState({ produtos })
    }

    preparaEditar = (sku) => {
        console.log('sku para editar: ', sku)
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }
    deletar = (sku) => {
        const produtos = this.service.deletar(sku)
        this.setState({ produtos })
    }

    render() {
        return (
            <Card header="Consulta de Produtos">

                <input
                    style={{ width: 220, paddingLeft: '10px', marginRight: '10px' }}
                    placeholder=" Digite o nome do produto"
                    value={this.arrValores}
                    type="text"
                    onChange={(event) => {
                        
                        this.arrValores = event.target.value.toLowerCase()
                        
                        this.letras.push(this.arrValores)
            
                        const ultimo = this.letras[this.letras.length-1]
                        console.log('rr', this.letras, 'u ',ultimo)
                        this.setState({ digito: ultimo })
                    }}
                    onKeyUp={this.pesquisar}
                />
                <button
                className='btn btn-outline-primary'
                 onClick={()=> window.location.reload() } >
                    Pesquisar
                </button>
                <button
                    className='btn btn-outline-dark'
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        window.location.reload()
                        localStorage.removeItem('_PESQUISA', JSON.stringify(this.arrayPesquisa))
                    }} >
                    Recarregar Lista Completa
                </button>

                <TabelaProdutos
                    produtos={this.state.produtos}
                    editarAction={this.preparaEditar}
                    deletarAction={this.deletar}
                >
                </TabelaProdutos>

            </Card>

        )
    }
}

export default withRouter(ConsultaProdutos)