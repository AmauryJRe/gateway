package com.gateway.app.exception;

import java.util.Date;

import lombok.Data;

@Data
public class ExceptionResponse {
	private Date date;
	private String message;
	private String field;
	private String details;
	private String trace;

	public ExceptionResponse(Date timestamp, String field, String message, String details, String trace) {
		super();
		this.date = timestamp;
		this.message = message;
		this.field = field;
		this.details = details;
		this.trace = trace;
	}
}