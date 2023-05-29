package lt.techin.vegan.order.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.vegan.order.server.dto.UserDto;
import lt.techin.vegan.order.server.exception.NoEntries;
import lt.techin.vegan.order.server.exception.NotFound;
import lt.techin.vegan.order.server.mapper.UserMapper;
import lt.techin.vegan.order.server.model.User;
import lt.techin.vegan.order.server.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	private UserMapper userMapper;
	
	public List<UserDto> getUsers(){
		List<User> users = userRepository.findAll();
		if(users.isEmpty()) {
			throw new NoEntries("users");
		}
		return users
				.stream()
				.map(userMapper::toDto)
				.toList();
	}
	
	public UserDto getUserById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new NotFound("user", "id", id.toString()));
		return userMapper.toDto(user);
	}
	
	public UserDto getUserByName(String username) {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new NotFound("user", "username", username));
		return userMapper.toDto(user);
	}
	
	public void deleteUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new NotFound("user", "id", id.toString()));
		userRepository.delete(user);
	}
}
