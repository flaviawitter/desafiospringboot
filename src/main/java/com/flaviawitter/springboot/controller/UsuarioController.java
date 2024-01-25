package com.flaviawitter.springboot.controller;

import com.flaviawitter.springboot.model.UsuarioModel;
import com.flaviawitter.springboot.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/cliente")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping (path = "/listarClientes")
    public List<UsuarioModel> listarClientes(){
        return repository.findAll();
    }
    
    @GetMapping(path = "/usuario/{id}")
    public UsuarioModel retornaClienteEspecifico(@PathVariable Integer id){
       return repository.findById(id).orElse(null);
    }

    @PostMapping (path = "/cadastrarCliente")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioModel cadastrarClientes(@RequestBody UsuarioModel cliente){
        return repository.save(cliente);
    }

    @PutMapping (path = "/alterarCliente/{id}")
    public UsuarioModel alterarCliente(@PathVariable Integer id, @RequestBody UsuarioModel cliente){
       if (repository.existsById(id)) {
            cliente.setId(id);
            return repository.save(cliente);
       }
       else
            return null;
    }

    @DeleteMapping (path = "/deletarCliente/{id}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deletarCliente(@PathVariable Integer id){
        if (repository.existsById(id)){
            repository.deleteById(id);
        }
    }

}
