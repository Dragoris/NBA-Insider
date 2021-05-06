package com.nbainsider.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class testController {
    @RequestMapping("/i")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
