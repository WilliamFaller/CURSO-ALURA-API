import express from "express";
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js'

const routes = (app) => {
    //Rota Padrão
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "Curso de Node!"})
    })
    //Usar outras rotas
    app.use(
        express.json(),
        livros,
        autores
    )
}

export default routes;