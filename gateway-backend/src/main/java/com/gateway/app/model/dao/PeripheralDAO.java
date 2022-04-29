package com.gateway.app.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gateway.app.model.entity.Peripheral;

public interface PeripheralDAO extends JpaRepository<Peripheral, Long> {

	String query="select sum(ONLINE) as ONLINE, sum(OFFLINE) as OFFLINE from (SELECT  0 as ONLINE ,count(*) as OFFLINE FROM PERIPHERAL p where p.status=0 UNION SELECT  count(*) as ONLINE,0 as OFFLINE FROM PERIPHERAL p where p.status=1)";
	@Query(value = query,nativeQuery = true)
	public Object[] metadata();
	
	String queryUnlinked = "select * from Peripheral where gateway_id is null";
	@Query(value = queryUnlinked,nativeQuery = true)
	public List<Peripheral> findAllUnlinked();
}
