package com.example.applicationtrackerserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ApplicationTrackerServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationTrackerServerApplication.class, args);
	}

	@RestController
	public class HelloController {
		@GetMapping("/")
		public String sayHello(jakarta.servlet.http.HttpServletRequest request) {
			String ip = request.getRemoteAddr();
			return "Hello, " + ip + "!";
		}
	}
}
