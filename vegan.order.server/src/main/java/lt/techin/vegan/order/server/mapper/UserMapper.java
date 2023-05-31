package lt.techin.vegan.order.server.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import lt.techin.vegan.order.server.dto.RegistrationDto;
import lt.techin.vegan.order.server.dto.UserDto;
import lt.techin.vegan.order.server.model.User;
import lt.techin.vegan.order.server.security.WebSecurityConfig;

public class UserMapper {
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	public UserDto toDto(User user) {
        UserDto userDTO = new UserDto();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        return userDTO;
	}
	
	public User toEntity(UserDto userDto) {
		User user = new User();
		user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        return user;
	}
	
	public User mapRegistrationDtoToUser(RegistrationDto registrationDto) {
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setEmail(registrationDto.getEmail());
        user.setRole(WebSecurityConfig.USER);
        return user;
    }
	
}
