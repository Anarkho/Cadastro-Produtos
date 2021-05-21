import React, { Component } from 'react'
import ProdutoService from '../../services/ProdutoService'
const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0.0,
    fornecedor: '',
    quantidade: 0,
    msgSucesso: false
}
export default class CadastroProdutos extends Component {

    state = estadoInicial

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
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor,
            quantidade: this.state.quantidade
        }
        this.service.salvar(produto)
        this.limparCampos()
        this.setState({msgSucesso: true})
    }

    limparCampos = (event) => {
        this.setState(estadoInicial)
        console.log(this.state)
    }

    render() {
        return (
            <div className='card'>
                <div className='card-header'>Cadastro de Produtos</div>
                <div className='card-body'>
                    {/* SE FOR VERDADEIRO IMPRIMA ALERTA  SENAO FAÇA NADA*/}
                    {this.state.msgSucesso &&
                
                            <div class="alert alert-dismissible alert-success">
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                <strong>Salvo com Sucesso!</strong> Produto foi cadastrado.
                            </div>
                    
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
                            <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                        </div>

                        <div className="col-md-1 mt-2">
                            <button onClick={this.limparCampos} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>

                </div>



            </div>
        )
    }
}