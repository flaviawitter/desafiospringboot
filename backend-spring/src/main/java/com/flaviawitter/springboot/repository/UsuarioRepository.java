package com.flaviawitter.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.flaviawitter.springboot.model.UsuarioModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Integer> {
    Optional<UsuarioModel> findByCpf(String cpf);
    List<UsuarioModel> findByNomeContainingIgnoreCase(String nome);
    List<UsuarioModel> findByCpfContaining(String cpf);
}
