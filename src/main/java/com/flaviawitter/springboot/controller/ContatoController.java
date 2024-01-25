package com.flaviawitter.springboot.controller;

import com.flaviawitter.springboot.repository.UsuarioRepository;
import com.flaviawitter.springboot.model.ContatoModel;
import com.flaviawitter.springboot.repository.ContatoRepository;
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

    @PostMapping(path = "/cadastrarContato/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ContatoModel cadastrarContato(@PathVariable Integer id, @RequestBody ContatoModel contato) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    contato.setUsuario(usuario);
                    return contatoRepository.save(contato);
                })
                .orElse(null);
    }

    @PutMapping (path = "/alterarContato/{codigo}")
    public ContatoModel alterarContato(@PathVariable Integer codigo, @RequestBody ContatoModel contato){
       if (contatoRepository.existsById(codigo)) {
            contato.setCodigo(codigo);
            return contatoRepository.save(contato);
       }
       else
            return null;
    }

    @DeleteMapping (path = "/deletarContato/{codigo}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deletarContato(@PathVariable Integer codigo){
        if (contatoRepository.existsById(codigo)){
            contatoRepository.deleteById(codigo);
        }
    }

}
