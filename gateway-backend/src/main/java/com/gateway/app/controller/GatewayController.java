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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gateway.app.model.entity.Gateway;
import com.gateway.app.model.service.GatewayService;
import com.gateway.app.model.service.PeripheralService;

@RestController
@RequestMapping(value = "/gateway")
public class GatewayController {
	
	@Autowired
	private GatewayService gatewayService;
	
	@Autowired
	private PeripheralService peripheralService;
	
	@GetMapping(value = "/list")
	public List<Gateway> list(){
		return gatewayService.findAll();
	}
	
	@GetMapping(value = "/detail/{id}")
	public Gateway detail(@PathVariable(name = "id") Long id) throws Exception{
		return gatewayService.findById(id).orElseThrow(()->new Exception("Not Found"));
	}
	
	@PostMapping(value = "/create")
	public Gateway detail(@RequestBody @Valid Gateway gateway) throws Exception{
		return gatewayService.saveAndFlush(gateway);
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public void delete(@PathVariable(name = "id") Long id) throws Exception{
		if(!gatewayService.existsById(id)) throw new Exception("Not Found");
		gatewayService.deleteById(id);
	}
	
	@PostMapping(value = "/asociate_peripheral")
	public Gateway linkPeripheralToGateway(@RequestParam(name = "gateway_id") Long gateway_id,
            @RequestParam(name = "peripheral_id") Long peripheral_id) throws Exception {
		if(!gatewayService.existsById(gateway_id)) throw new Exception("Gateway Not Found");
		if(!peripheralService.existsById(peripheral_id)) throw new Exception("Peripheral Not Found");
		Gateway gateway = gatewayService.findById(gateway_id).get();
		gateway.getPeripheral().add(peripheralService.findById(peripheral_id).get());
		return gatewayService.saveAndFlush(gateway);
	}
	
	@PostMapping(value = "/unlink_peripheral")
	public Gateway unlinkPeripheralToGateway(@RequestParam(name = "gateway_id") Long gateway_id,
            @RequestParam(name = "peripheral_id") Long peripheral_id) throws Exception {
		if(!gatewayService.existsById(gateway_id)) throw new Exception("Gateway Not Found");
		if(!peripheralService.existsById(peripheral_id)) throw new Exception("Peripheral Not Found");
		Gateway gateway = gatewayService.findById(gateway_id).get();
		gateway.getPeripheral().remove(peripheralService.findById(peripheral_id).get());
		return gatewayService.saveAndFlush(gateway);
	}
}
