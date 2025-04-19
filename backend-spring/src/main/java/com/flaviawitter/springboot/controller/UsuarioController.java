package com.flaviawitter.springboot.controller;

import com.flaviawitter.springboot.model.UsuarioModel;
import com.flaviawitter.springboot.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping(path = "/pesquisar")
    public List<UsuarioModel> pesquisarClientes(@RequestParam(required = false) String nomeCpf) {
        if (nomeCpf == null || nomeCpf.isEmpty()) {
            return repository.findAll();
        }

        // Se for apenas número, busca por CPF (parcial)
        if (nomeCpf.matches("\\d+")) {
            return repository.findByCpfContaining(nomeCpf);
        }

        // Caso contrário, busca por nome (parcial)
        return repository.findByNomeContainingIgnoreCase(nomeCpf);
    }

    @PostMapping(path = "/cadastrarCliente")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioModel cadastrarClientes(@RequestBody UsuarioModel cliente) {
        // Validação de campos obrigatórios
        if (cliente.getNome() == null || cliente.getCpf() == null) {
            throw new IllegalArgumentException("Nome e CPF são obrigatórios");
        }

        // Verifica se o CPF já existe no banco
        if (repository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        // Verifica se a data de nascimento está no futuro
        if (cliente.getDataNascimento().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data de nascimento não pode ser no futuro");
        }

        return repository.save(cliente);
    }


    @PutMapping (path = "/alterarCliente/{id}")
    public UsuarioModel alterarCliente(@PathVariable Integer id, @RequestBody UsuarioModel cliente){
       if (repository.existsById(id)) {
            cliente.setId(id);
            return repository.save(cliente);
       }
       // Verifica se a data de nascimento está no futuro
       if (cliente.getDataNascimento().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Data de nascimento não pode ser no futuro");
        }
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