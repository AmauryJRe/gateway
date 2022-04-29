package com.gateway.app.model.dao;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gateway.app.model.entity.Gateway;

public interface GatewayDAO extends JpaRepository<Gateway, Long> {
	
	String query = "SELECT sum(Linked) as Linked, sum(unlinked ) as unlinked  FROM (\r\n"
			+ "select count(*) as linked, 0 as unlinked from GATEWAY g join PERIPHERAL p on p.gateway_id = g.id\r\n"
			+ "union \r\n"
			+ "select 0 as linked, count(*) as unlinked from GATEWAY where id not in (select GATEWAY_ID  from PERIPHERAL )\r\n"
			+ ")";
	@Query(value = query,nativeQuery = true)
	Object[] metadata();

}
