package com.gateway.app.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gateway.app.model.entity.Gateway;

public interface GatewayDAO extends JpaRepository<Gateway, Long> {

}
