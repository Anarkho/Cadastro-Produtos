import React, { Component } from 'react'
import Card from '../../components/Card'
import ProdutoService from '../../services/ProdutoService'
import TabelaProdutos from '../produtos/TabelaDeProdutos'

import { withRouter } from 'react-router-dom'

class ConsultaProdutos extends Component {

    state = {
        produtos: []
    }

    constructor() {
        super()
        this.service = new ProdutoService()
    }

    componentDidMount() {
        const produtos = this.service.obterProdutos()
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

                <TabelaProdutos
                    produtos={this.state.produtos}
                    editarAction={this.preparaEditar}
                    deletarAction={this.deletar}>
                </TabelaProdutos>

            </Card>

        )
    }
}

export default withRouter(ConsultaProdutos)