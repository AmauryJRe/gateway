package com.gateway.app.model.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gateway.app.model.entity.Peripheral;

public interface PeripheralService {

	public Page<Peripheral> findAll(Pageable pageable);

	public List<Peripheral> findAllUnlinked();

	public List<Peripheral> findByIds(Iterable<Long> ids);

	public void flush();

	public <S extends Peripheral> S saveAndFlush(S entity);

	public <S extends Peripheral> List<S> saveAllAndFlush(Iterable<S> entities);

	public void deleteAllByIdInBatch(Iterable<Long> ids);

	public Optional<Peripheral> findById(Long id);

	public boolean existsById(Long id);

	public void deleteById(Long id);

	public Map<String, Object> metadata();
}