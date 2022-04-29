package com.gateway.app.model.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gateway.app.model.entity.Gateway;

public interface GatewayService {
	
	public Page<Gateway> findAll(Pageable pageable);

	public void flush();

	public <S extends Gateway> S saveAndFlush(S entity);

	public <S extends Gateway> List<S> saveAllAndFlush(Iterable<S> entities);

	public void deleteAllByIdInBatch(Iterable<Long> ids);

	public Optional<Gateway> findById(Long id);

	public boolean existsById(Long id);

	public void deleteById(Long id);
	
	Map<String, Object> metadata();
}
