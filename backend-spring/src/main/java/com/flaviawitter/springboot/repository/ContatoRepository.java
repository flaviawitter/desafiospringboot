package com.flaviawitter.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flaviawitter.springboot.model.ContatoModel;

@Repository
public interface ContatoRepository extends JpaRepository<ContatoModel, Integer>{
    List<ContatoModel> findByUsuarioModelId(Integer id);
}
