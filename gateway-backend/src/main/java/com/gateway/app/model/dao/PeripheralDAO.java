package com.gateway.app.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.app.model.entity.Peripheral;

public interface PeripheralDAO extends JpaRepository<Peripheral, Long> {

}
