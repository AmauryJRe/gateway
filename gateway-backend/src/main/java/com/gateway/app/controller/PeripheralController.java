package com.gateway.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.app.model.entity.Peripheral;
import com.gateway.app.model.service.PeripheralService;

@RestController
@RequestMapping(value = "/peripheral")
public class PeripheralController {
	
	@Autowired
	private PeripheralService peripheralService;
	
	@GetMapping(value = "/list")
	public List<Peripheral> list(){
		return peripheralService.findAll();
	}
	
	@GetMapping(value = "/detail/{id}")
	public Peripheral detail(@PathVariable(name = "id") Long id) throws Exception{
		return peripheralService.findById(id).orElseThrow(()->new Exception("Not Found"));
	}
	
	@PostMapping(value = "/create")
	public Peripheral detail(@RequestBody @Valid Peripheral peripheral) throws Exception{
		return peripheralService.saveAndFlush(peripheral);
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public void delete(@PathVariable(name = "id") Long id) throws Exception{
		if(!peripheralService.existsById(id)) throw new Exception("Not Found");
		peripheralService.deleteById(id);
	}
}
