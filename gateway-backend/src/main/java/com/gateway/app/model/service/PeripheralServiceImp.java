package com.gateway.app.model.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gateway.app.model.dao.PeripheralDAO;
import com.gateway.app.model.entity.Peripheral;

@Service
public class PeripheralServiceImp implements PeripheralService {

	@Autowired
	PeripheralDAO peripheralDAO;

	@Override
	public List<Peripheral> findAll() {
		return peripheralDAO.findAll();
	}

	@Override
	public void flush() {
		peripheralDAO.flush();
	}

	@Override
	public <S extends Peripheral> S saveAndFlush(S entity) {
		return peripheralDAO.saveAndFlush(entity);
	}

	@Override
	public <S extends Peripheral> List<S> saveAllAndFlush(Iterable<S> entities) {
		return peripheralDAO.saveAllAndFlush(entities);
	}

	@Override
	public void deleteAllByIdInBatch(Iterable<Long> ids) {
		peripheralDAO.deleteAllByIdInBatch(ids);
	}

	@Override
	public Optional<Peripheral> findById(Long id) {
		return peripheralDAO.findById(id);
	}

	@Override
	public boolean existsById(Long id) {
		return peripheralDAO.existsById(id);
	}

	@Override
	public void deleteById(Long id) {
		peripheralDAO.deleteById(id);
	}

	@Override
	public List<Peripheral> findByIds(Iterable<Long> ids) {
		return peripheralDAO.findAllById(ids);
	}
}
