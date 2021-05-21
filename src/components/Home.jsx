import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem Vindo</h1>
            <p className="lead">Este é seu sitema, utilize a barra de navegação para acessar as paginas.</p>
            <hr className="my-4"/>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/cadastro-produtos" role="button">Cadastrar</Link>
                </p>
</div>
    )
}

export default Home