package com.gateway.app.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.app.model.entity.Peripheral;
import com.gateway.app.model.service.PeripheralService;

@RestController
@RequestMapping(value = "/peripheral")
public class PeripheralController {
	
	@Autowired
	private PeripheralService peripheralService;
	
	private final static Logger log = LoggerFactory.getLogger(PeripheralController.class);
	
	@GetMapping(value = "/list")
	public Page<Peripheral> list(@RequestParam(defaultValue = "5") int size,
			@RequestParam(defaultValue = "0") Integer page){
		Pageable pageable = PageRequest.of(page, size);
		return peripheralService.findAll(pageable);
	}
	
	@GetMapping(value = "/detail/{id}")
	public Peripheral detail(@PathVariable(name = "id") Long id) throws Exception{
		return peripheralService.findById(id).orElseThrow(()->new Exception("Not Found"));
	}
	
	@PostMapping(value = "/save")
	public Peripheral detail(@Valid @RequestBody Peripheral peripheral,BindingResult result) throws Exception{
		if(!result.hasErrors())
		return peripheralService.saveAndFlush(peripheral);
		throw new Exception(result.getObjectName()+"."+result.getFieldError().getField().toString());
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public void delete(@PathVariable(name = "id") Long id) throws Exception{
		if(!peripheralService.existsById(id)) throw new Exception("Not Found");
		peripheralService.deleteById(id);
	}
	
	@GetMapping(value = "/metadata")
	public Map<String, Object> metadata(){
		return peripheralService.metadata();
	}
	
	@GetMapping(value = "/unlinked")
	public List<Peripheral> findAllUnlinked() {
		return peripheralService.findAllUnlinked();
	}
}
