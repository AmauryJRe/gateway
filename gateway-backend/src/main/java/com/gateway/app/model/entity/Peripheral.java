package com.gateway.app.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Peripheral {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@Column(unique = true)
	@NotNull
	Long uid;
	
	@NotNull
	String vendor;
	
	@Temporal(TemporalType.DATE)
	Date date;
	
	@NotNull
	PeripheralStatus status;
	
	@PrePersist
    private void prePersist() {
        date = new Date();
    }

}
