package lt.techin.vegan.order.server.mapper;

import lt.techin.vegan.order.server.dto.UserDto;
import lt.techin.vegan.order.server.model.User;

public class UserMapper {
	
	public UserDto toDto(User user) {
		if(user == null) {
			return null;
		}
		return new UserDto(
				user.getId(), 
				user.getUsername(), 
				user.getEmail(),
				user.isAdmin());
	}
	
}
