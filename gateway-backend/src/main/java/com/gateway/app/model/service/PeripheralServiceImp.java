package com.gateway.app.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gateway.app.model.dao.PeripheralDAO;
import com.gateway.app.model.entity.Peripheral;

@Service
public class PeripheralServiceImp implements PeripheralService {

	@Autowired
	PeripheralDAO peripheralDAO;

	@Override
	public Page<Peripheral> findAll(Pageable pageable) {
		return peripheralDAO.findAll(pageable);
	}
	
	@Override
	public List<Peripheral> findAllUnlinked() {
		return peripheralDAO.findAllUnlinked();
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

	@Override
	public Map<String, Object> metadata() {
		
		Map<String,Object> data = new HashMap<>();
		Object[] values= peripheralDAO.metadata();
		String[] labels = {"ONLINE","OFFLINE"};
		data.put("labels", labels);
		data.put("dataset", values[0]);
		return data;	
	}
}
