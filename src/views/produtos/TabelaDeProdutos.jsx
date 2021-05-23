import React from 'react'

const tabela = (props) => (
    <table className='table table-hover'>
        <thead>
            <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Fornecedor</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {props.produtos.map((produto, index) => {
                return (
                    <tr key={index}>
                        <th>{produto.nome}</th>
                        <th style={{ textTransform: 'uppercase' }}>{produto.sku}</th>
                        <th>R$ {produto.preco}</th>
                        <th>{produto.quantidade}</th>
                        <th>{produto.fornecedor}</th>
                        <th>
                            <button 
                            onClick={()=> props.editarAction(produto.sku)} 
                            className="btn btn-primary">
                                Editar
                            </button>
                            <button 
                            onClick={()=> props.deletarAction(produto.sku)} 
                            className="btn btn-danger">
                                Remover
                            </button>
                        </th>
                    </tr>
                )
            })
            }
        </tbody>
    </table>
)

export default tabela