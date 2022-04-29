package com.gateway.app;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.gateway.app.model.entity.Gateway;
import com.gateway.app.model.entity.Peripheral;
import com.gateway.app.model.entity.PeripheralStatus;
import com.gateway.app.model.service.GatewayService;
import com.gateway.app.model.service.PeripheralService;
import com.github.javafaker.Faker;

@SpringBootApplication
public class GatewayBackendApplication  implements CommandLineRunner{
	
	@Autowired
	PeripheralService peripheralService;
	
	@Autowired
	GatewayService gatewayService;
	
	private static final Logger log = LoggerFactory.getLogger(GatewayBackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(GatewayBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		fakeData();
	}
	
	private void fakeData() {
		log.info("FAKING DATA HERE");
		Faker fake = new Faker();
		final int peripheralCount = 100;
		final int gatewayCount = 10;
		
		List<Peripheral> ps = new ArrayList<>();
		List<Gateway> gs = new ArrayList<>();
		
		LinkedHashSet<String> vendor = new LinkedHashSet<>();
		while(vendor.size()<peripheralCount) {
			vendor.add(fake.company().name());
		}
		LinkedHashSet<String> uuid = new LinkedHashSet<>();
		while(uuid.size()<peripheralCount) {
			uuid.add(String.format("%s", (int)fake.number().randomNumber(5, true)));
		}
		
		for (int i = 0; i < peripheralCount; i++) {
			Peripheral p = new Peripheral();
			p.setUid(Long.valueOf(uuid.toArray()[i].toString()));
			p.setVendor(vendor.toArray()[i].toString());
			p.setStatus(PeripheralStatus.values()[i%2]);
			ps.add(p);
		}
		
		peripheralService.saveAllAndFlush(ps);
		
		
		LinkedHashSet<Integer> serials = new LinkedHashSet<>();
		while(serials.size()<gatewayCount) {
			serials.add((int)fake.number().randomNumber(5, true));
		}
		LinkedHashSet<String> ipv4 = new LinkedHashSet<>();
		while(ipv4.size()<gatewayCount) {
			ipv4.add(fake.internet().ipV4Address());
		}
		LinkedHashSet<String> names = new LinkedHashSet<>();
		while(names.size()<gatewayCount) {
			names.add(fake.internet().domainName());
		}
		
		for (int i = 0; i < gatewayCount; i++) {
			List<Long> ids = LongStream.iterate(i*10, n->n+1).limit((i+1)*10).boxed().collect(Collectors.toList());
			Gateway g = new Gateway();
			g.setIpv4(ipv4.toArray()[i].toString());
			g.setName(names.toArray()[i].toString());
			g.setSerialNumber(Integer.parseInt(serials.toArray()[i].toString()));
			g.setPeripheral(peripheralService.findByIds(ids));
			gs.add(g);
		}
		
		gatewayService.saveAllAndFlush(gs);
		
		
	}

}
