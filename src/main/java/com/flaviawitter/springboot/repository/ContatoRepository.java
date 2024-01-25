package com.flaviawitter.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flaviawitter.springboot.model.ContatoModel;

@Repository
public interface ContatoRepository extends JpaRepository<ContatoModel, Integer>{

}
