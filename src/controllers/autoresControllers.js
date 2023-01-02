// Importação do Autor apartir do MongoDB
import autores from '../models/Autor.js';

class AutorController {
    // Mostrar os autores cadastrados
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores)
    })
  }

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;

    autores.findById(id, (err, autores) => {
      if(err) {
        res.status(400).send({message: `${err.message} - falha ao buscar o autor!`})
      } else {
        res.status(200).send(autores);
      }
    })
  }

    // Cadastrar um novo autor
  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);

    autor.save((err) => {
      if(err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar o autor!`})
      } else {
        res.status(201).send(autor.toJSON())
      }
    });
  }
    // 
  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    //Achar pelo id e Substituir (ID do autor, Critério de atualização) no mongo utilizase $set 
    autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(err) {
        res.status(500).send({message: err.message})
      } else {
        res.status(200).send({message: 'Autor atualizado com sucesso!'})        
      }
    })
  }

  static excluirAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) =>{
      if(err) {
        res.status(400).send({message: `${err.message} - falha ao excluir o autor!`})
      } else {
        res.status(200).send({message: `Excluido com sucesso!`})
      }
    })
  }
}



export default AutorController;