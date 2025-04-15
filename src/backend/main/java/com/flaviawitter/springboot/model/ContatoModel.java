package com.flaviawitter.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ContatoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int codigo;

    @Column (nullable = false)
    public String tipo;

    @Column (nullable = false)
    public String texto;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "id") 
    @JsonIgnore
    private UsuarioModel usuarioModel;

    public void setUsuario(UsuarioModel usuarioModel) {
        this.usuarioModel = usuarioModel;
    }


    public int getCodigo() {
        return this.codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTexto() {
        return this.texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public UsuarioModel getUsuarioModel() {
        return this.usuarioModel;
    }

    public void setUsuarioModel(UsuarioModel usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    
    

}   