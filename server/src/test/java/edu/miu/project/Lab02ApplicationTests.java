package edu.miu.project;

import edu.miu.project.entity.dto.LoginResponse;
import edu.miu.project.entity.dto.RefreshTokenRequest;
import edu.miu.project.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class ApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	AuthService authService;

	@Test
	void testRefreshToken() {
		String accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInN1YiI6ImFkbWluQG1pdS5lZHUiLCJpYXQiOjE3MzIwMjE5MjQsImV4cCI6MTczMjAyMTkzMX0.gcqztQ21se7gPpOMUxox8cO6KIIV_SwuTzaUbCOO_Ns";
		String refreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInN1YiI6ImFkbWluQG1pdS5lZHUiLCJpYXQiOjE3MzIwMjE5MjQsImV4cCI6MTczMjA0NzEyNH0.08ZyaSTVVVvRsSIUs_VEjKCVBx-Q61AF2ScxvoJlrKY";
		RefreshTokenRequest refreshTokenRequest = new RefreshTokenRequest(accessToken, refreshToken);

		LoginResponse response = authService.refreshToken(refreshTokenRequest);

		System.out.println(response.getAccessToken());
	}
}
