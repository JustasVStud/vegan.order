package lt.techin.vegan.order.server.runner;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import lt.techin.vegan.order.server.dto.MealDto;
import lt.techin.vegan.order.server.dto.MenuResponse;
import lt.techin.vegan.order.server.model.User;
import lt.techin.vegan.order.server.repository.UserRepository;
import lt.techin.vegan.order.server.security.WebSecurityConfig;
import lt.techin.vegan.order.server.service.MealService;
import lt.techin.vegan.order.server.service.MenuService;

@Slf4j
@Component
public class DatabaseInitializer implements CommandLineRunner {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private MealService mealService;
	
	@Autowired
	private MenuService menuService;
	
	@Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        });
    	MENUS.forEach(menu -> {
    		menuService.createMenu(menu);
    	});
    	MEALS_SALADS.forEach(meal -> {
    		mealService.createMeal(1l, meal);
    	});
    	MEALS_DISHES.forEach(meal -> {
    		mealService.createMeal(2l, meal);
    	});
    	
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "user@mycompany.com", WebSecurityConfig.USER)
    );
    private static final List<MenuResponse> MENUS = Arrays.asList(
    		new MenuResponse("Salads"),
    		new MenuResponse("Dishes")
    		);
    private static final List<MealDto> MEALS_SALADS = Arrays.asList(
    		new MealDto(null, " salad", "For his pleasure", 1),
    		new MealDto(null, "other salad", "For his and his pleasure", 2),
    		new MealDto(null, "another salad", "For her pleasure", 3)
    		);
    private static final List<MealDto> MEALS_DISHES = Arrays.asList(
    		new MealDto(null, "Spicy dish", "To make you thirsty", 69),
    		new MealDto(null, "Thirst dish", "For the already thirsty", 8),
    		new MealDto(null, "Delicious carpet", "For the super thirst", 78)
    		);
}

