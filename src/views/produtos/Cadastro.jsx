import React, { Component } from 'react'
import ProdutoService from '../../services/ProdutoService'
import Card from '../../components/Card'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    quantidade: 0,
    msgSucesso: false,
    errors: [],
}
class CadastroProdutos extends Component {
    
    state = estadoInicial
    atualizando = false

    constructor() {
        super()
        this.service = new ProdutoService()
    }

    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({ [nomeDoCampo]: valor }) // entre colchetes para valores dinamicos
    }

    onSubmit = (event) => {
        event.preventDefault()
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor,
            quantidade: this.state.quantidade
        }
        try {
            this.service.salvar(produto)
            this.limparCampos()
            this.setState({ msgSucesso: true })
        } catch (erro) {
            const errors = erro.errors
            this.setState({ errors: errors })
        }

    }

    limparCampos = (event) => {
        this.setState(estadoInicial)

    }

    componentDidMount() {
        const sku = this.props.match.params.sku
        if (sku) {
            const resultado = this.service.obterProdutos().filter((produto, i) => produto.sku === sku)
            if (resultado.length === 1) {
                const produtoEncontrado = resultado[0]
                this.atualizando = true
                this.setState({ ...produtoEncontrado })
            }
        }
    }

    render() {

        return (
            <Card header={this.atualizando ? 'Atualização dos Produtos ' : 'Cadastro dos Produtos'}>
                
                    <form id='frmProduto' onSubmit={this.onSubmit} onReset={this.limparCampos} >
                        {/* SE FOR VERDADEIRO IMPRIMA ALERTA SUCESSO  SENAO FAÇA NADA*/}
                        {this.state.msgSucesso &&

                            <div className="alert alert-dismissible alert-success">
                                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                <strong>Salvo com Sucesso! </strong>

                            Produto foi {this.atualizando ? ' atualizado' : ' cadastrado'}.
                            </div>
                        }
                        {/* FIM ALERTA */}
                        {/* SE FOR VERDADEIRO IMPRIMA ALERTA ERRO  SENAO FAÇA NADA*/}
                        {this.state.errors.length > 0 &&

                            this.state.errors.map((msg, i) => {
                                return (
                                    <div className="alert alert-dismissible alert-danger">
                                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                        <strong>Erro!</strong> {msg}
                                    </div>
                                )
                            })
                        }
                        {/* FIM ALERTA */}


                        {/* Primeira linha se adapta a metade do tamanho total de 12 colunas */}
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Nome: *</label>
                                    <input
                                        name='nome'
                                        type="text"
                                        className='form-control'
                                        onChange={this.onChange}
                                        value={this.state.nome}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>SKU: *</label>
                                    <input
                                        minLength='14'
                                        maxLength='14'
                                        name='sku'
                                        type="text"
                                        style={{textTransform: 'uppercase'}}
                                        disabled={this.atualizando}
                                        className='form-control'
                                        onChange={this.onChange}
                                        value={this.state.sku}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* fim linha */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Descrição: *</label>
                                    <textarea
                                        name='descricao'
                                        className="form-control"
                                        onChange={this.onChange}
                                        value={this.state.descricao}
                                    ></textarea>

                                </div>

                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <label>Preço: *</label>
                                    <input
                                        name='preco'
                                        type="text"
                                        className='form-control'
                                        onChange={this.onChange}
                                        value={this.state.preco}
                                    />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <label>Fornecedor: *</label>
                                    <input
                                        name='fornecedor'
                                        type="text"
                                        className='form-control'
                                        onChange={this.onChange}
                                        value={this.state.fornecedor}
                                    />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <label>Quantidade: *</label>
                                    <input
                                        name='quantidade'
                                        type="text"
                                        className='form-control'
                                        onChange={this.onChange}
                                        value={this.state.quantidade}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1 mt-2">
                                <button type='submit' className="btn btn-success">
                                    {this.state.atualizando ? 'Atualizar' : 'Salvar'}
                                </button>
                            </div>

                            <div className="col-md-1 mt-2">
                                <button type='reset' className="btn btn-primary">Limpar</button>
                            </div>
                        </div>
                    </form>

            </Card>
        )
    }
}

export default withRouter(CadastroProdutos) // withrouter para ter medodos de decoração