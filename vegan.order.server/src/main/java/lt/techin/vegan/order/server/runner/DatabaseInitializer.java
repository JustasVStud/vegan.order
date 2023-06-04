package lt.techin.vegan.order.server.runner;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import lt.techin.vegan.order.server.model.User;
import lt.techin.vegan.order.server.repository.MealRepository;
import lt.techin.vegan.order.server.repository.MenuRepository;
import lt.techin.vegan.order.server.repository.UserRepository;
import lt.techin.vegan.order.server.security.WebSecurityConfig;

@Slf4j
@Component
public class DatabaseInitializer implements CommandLineRunner {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private MealRepository mealRepository;
	
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        });
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "user@mycompany.com", WebSecurityConfig.USER)
    );
}

