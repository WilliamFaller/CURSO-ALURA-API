// Importação do Livro apartir do MongoDB
import livros from '../models/Livro.js';

class LivroController {
    // Mostrar os livros cadastrados
  static listarLivros = (req, res) => {
    livros.find()
      .populate('autor')
    .exec((err, livros) => {
      res.status(200).json(livros)
    })
  }

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate('autor', 'nome')
      .exec((err, livros) => {
        if(err) {
          res.status(400).send({message: `${err.message} - falha ao buscar o livro!`})
        } else {
          res.status(200).send(livros);
        }
      })
  }

    // Cadastrar um novo livro
  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if(err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar o livro!`})
      } else {
        res.status(201).send(livro.toJSON())
      }
    });
  }
    // 
  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    //Achar pelo id e Substituir (ID do livro, Critério de atualização) no mongo utilizase $set 
    livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(err) {
        res.status(500).send({message: err.message})
      } else {
        res.status(200).send({message: 'Livro atualizado com sucesso!'})        
      }
    })
  }

  static excluirLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) =>{
      if(err) {
        res.status(400).send({message: `${err.message} - falha ao excluir o livro!`})
      } else {
        res.status(200).send({message: `Excluido com sucesso!`})
      }
    })
  }

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora

    livros.find({'editora': editora}, {}, (err, livros) => {
      if(err) {
        res.status(400).send({message: `${err.message} - falha ao excluir ao Localizar a Editora!`})
      } else {
      res.status(200).send(livros)
      }
    });
  }


}





export default LivroController