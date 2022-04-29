package com.gateway.app.exception;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
	
	
	@Autowired
	Environment env;
	
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<?> handleExceptio(Exception ex) {
		
//		List<String> details = new ArrayList<>();
////		details.add("Detail" + dex.getMostSpecificCause().getMessage());
//		ErrorResponse error = new ErrorResponse("Validation Failed", details);
		
		ExceptionResponse exh = new ExceptionResponse(new Date(),ex.getMessage().toUpperCase(),ex.getMessage(),null,null); 
		
		return new ResponseEntity(exh, HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	

	@ExceptionHandler(DataIntegrityViolationException.class)
	public final ResponseEntity<?> handleDuplicateKey(DataIntegrityViolationException dex) {
		String field = "";
		String message = "";
		if(dex.getMostSpecificCause().getMessage().startsWith("NULL not allowed for column ")) {
			field = dex.getMostSpecificCause().getMessage().split("\\\"")[1];
			message = env.getProperty(String.format("Gateway.%s.notNull", field.toLowerCase()));
		}
		if(dex.getMostSpecificCause().getMessage().startsWith("Unique index or primary key violation")) {
			field = dex.getMostSpecificCause().getMessage().split("\\(")[1].split("\\)")[0];
			message = env.getProperty(String.format("Gateway.%s.duplicate", field.toLowerCase()));
		}
		ExceptionResponse response = new ExceptionResponse(new Date(),field,message,null,null);
		return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
