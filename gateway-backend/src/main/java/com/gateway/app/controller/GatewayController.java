package com.gateway.app.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
	
	private final static Logger log = LoggerFactory.getLogger(GatewayController.class);
	
	@GetMapping(value = "/list")
	public Page<Gateway> list(@RequestParam(defaultValue = "5") int size,
			@RequestParam(defaultValue = "0") Integer page){
		Pageable pageable = PageRequest.of(page, size);
		return gatewayService.findAll(pageable);
	}
	
	@GetMapping(value = "/detail/{id}")
	public Gateway detail(@PathVariable(name = "id") Long id) throws Exception{
		return gatewayService.findById(id).orElseThrow(()->new Exception("Not Found"));
	}
	
	@PostMapping(value = "/save")
	public ResponseEntity<?> detail(@Valid @RequestBody Gateway gateway, BindingResult result) throws Exception{
		if(!result.hasErrors()) {
			Gateway saved = gatewayService.saveAndFlush(gateway);
			EntityModel<Gateway> response = EntityModel.of(saved, linkTo(methodOn(GatewayController.class).detail(gateway.getId())).withSelfRel());
			return ResponseEntity.ok().body(response);
		}

		throw new Exception(result.getFieldError().getField().toString());
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
	
	@GetMapping(value = "/metadata")
	public Map<String, Object> metadata(){
		return gatewayService.metadata();
	}
}
