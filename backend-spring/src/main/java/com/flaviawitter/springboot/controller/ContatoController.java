package com.flaviawitter.springboot.controller;

import com.flaviawitter.springboot.repository.UsuarioRepository;
import com.flaviawitter.springboot.model.ContatoModel;
import com.flaviawitter.springboot.repository.ContatoRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/api/contato")
public class ContatoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ContatoRepository contatoRepository;
    
    @GetMapping(path = "/contato/{codigo}")
    public ContatoModel retornaContatoEspecifico(@PathVariable Integer codigo){
       return contatoRepository.findById(codigo).orElse(null);
    }

    @GetMapping("/listarContatosDoUsuario/{id}")
    public List<ContatoModel> listarContatosDoUsuario(@PathVariable Integer id) {
        return contatoRepository.findByUsuarioModelId(id);
    }


    @PostMapping(path = "/cadastrarContato/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ContatoModel cadastrarContato(@PathVariable Integer id, @RequestBody ContatoModel contato) {
        try {
            return usuarioRepository.findById(id)
                    .map(usuario -> {
                        contato.setUsuarioModel(usuario);
                        return contatoRepository.save(contato);
                    })
                    .orElseThrow(() -> new RuntimeException("Usuário com ID " + id + " não encontrado"));
        } catch (Exception e) {
            e.printStackTrace(); // Mostra o erro no console
            throw new RuntimeException("Erro ao cadastrar contato: " + e.getMessage());
        }
    }


    @PutMapping(path = "/alterarContato/{codigo}")
    public ContatoModel alterarContato(@PathVariable Integer codigo, @RequestBody ContatoModel contatoAtualizado){
        return contatoRepository.findById(codigo)
            .map(contatoExistente -> {
                // Atualiza os campos modificáveis
                contatoExistente.setTipo(contatoAtualizado.getTipo());
                contatoExistente.setValor(contatoAtualizado.getValor());
                contatoExistente.setObservacao(contatoAtualizado.getObservacao());
                // ⚠️ Não remove o vínculo com o usuário
                return contatoRepository.save(contatoExistente);
            })
            .orElse(null);
    }


    @DeleteMapping (path = "/deletarContato/{codigo}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deletarContato(@PathVariable Integer codigo){
        if (contatoRepository.existsById(codigo)){
            contatoRepository.deleteById(codigo);
        }
    }

}