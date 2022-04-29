package com.gateway.app.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gateway.app.model.dao.GatewayDAO;
import com.gateway.app.model.entity.Gateway;

@Service
public class GatewayServiceImp implements GatewayService {
	
	@Autowired
	GatewayDAO gatewayDAO;

	@Override
	public Page<Gateway> findAll(Pageable pageable) {
		return gatewayDAO.findAll(pageable);
	}

	@Override
	public void flush() {
		gatewayDAO.flush();
	}

	@Override
	public <S extends Gateway> S saveAndFlush(S entity) {
		return gatewayDAO.saveAndFlush(entity);
	}

	@Override
	public <S extends Gateway> List<S> saveAllAndFlush(Iterable<S> entities) {
		return gatewayDAO.saveAllAndFlush(entities);
	}

	@Override
	public void deleteAllByIdInBatch(Iterable<Long> ids) {
		gatewayDAO.deleteAllByIdInBatch(ids);
	}

	@Override
	public Optional<Gateway> findById(Long id) {
		return gatewayDAO.findById(id);
	}

	@Override
	public boolean existsById(Long id) {
		return gatewayDAO.existsById(id);
	}

	@Override
	public void deleteById(Long id) {
		gatewayDAO.deleteById(id);
	}

	@Override
	public Map<String, Object> metadata() {
		Map<String,Object> data = new HashMap<>();
		Object[] values= gatewayDAO.metadata();
		String[] labels = {"LINKED","UNLINKED"};
		data.put("labels", labels);
		data.put("dataset", values[0]);
		return data;	
	}

}
