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
import lt.techin.vegan.order.server.dto.MenuDto;
import lt.techin.vegan.order.server.service.MenuService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/menus")
public class MenuController {
	
	@Autowired
	private MenuService menuService;
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping
	public ResponseEntity<List<MenuDto>> getMenus(){
		return new ResponseEntity<>(menuService.getMenus(), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/{id}")
	public ResponseEntity<MenuDto> getMenuById(@PathVariable Long id){
		return new ResponseEntity<>(menuService.getMenuById(id), HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PostMapping()
	public ResponseEntity<HttpStatus> createMenu(@RequestBody MenuDto menuDto){
		menuService.createMenu(menuDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PatchMapping("/{id}")
	public ResponseEntity<HttpStatus> updateMenu(@PathVariable Long id, @RequestBody MenuDto menuDto){
		menuService.updateMenu(id, menuDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteMenu(@PathVariable Long id){
		menuService.deleteMenu(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
