package lt.techin.vegan.order.server.dto;

public class UserDto {
	private Long id;
	private String username;
	private String email;
	private boolean isAdmin;
	
	public UserDto() {
		super();
	}
	
	public UserDto(Long id, String username, String email, boolean isAdmin) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.isAdmin = isAdmin;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	
}
