package lt.techin.vegan.order.server.controller;

import static lt.techin.vegan.order.server.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lt.techin.vegan.order.server.dto.MealDto;
import lt.techin.vegan.order.server.service.MealService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/meals")
public class MealController {
	
	@Autowired
	private MealService mealService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping
	public ResponseEntity<List<MealDto>> getMeals(){
		return new ResponseEntity<>(mealService.getMeals(), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/{id}")
	public ResponseEntity<MealDto> getMealById(@PathVariable Long id){
		return new ResponseEntity<>(mealService.getMealById(id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping()
	public ResponseEntity<HttpStatus> createMeal(@RequestBody MealDto mealDto){
		mealService.createMeal(mealDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("/{id}")
	public ResponseEntity<HttpStatus> updateMenu(@PathVariable Long id, @RequestBody MealDto mealDto){
		mealService.updateMeal(id, mealDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteMeal(@PathVariable Long id){
		mealService.deleteMeal(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
