package lt.techin.vegan.order.server.service;

import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.vegan.order.server.dto.MenuDto;
import lt.techin.vegan.order.server.dto.MenuResponse;
import lt.techin.vegan.order.server.exception.NoEntries;
import lt.techin.vegan.order.server.exception.NotFound;
import lt.techin.vegan.order.server.model.Menu;
import lt.techin.vegan.order.server.repository.MenuRepository;

@Service
public class MenuService {
	
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<MenuDto> getMenus() {
		List<Menu> menus = menuRepository.findAll();
		if (menus.isEmpty()) {
			throw new NoEntries("menus");
		}
		return menus.stream().map(menu -> modelMapper.map(menu, MenuDto.class)).toList();
	}
	 
	public MenuDto getMenuById(Long id) {
		Menu menu =  menuRepository.findById(id).orElseThrow(() -> new NotFound("menu", "id", id.toString()));
		return modelMapper.map(menu, MenuDto.class);
	}
	
	public void createMenu(MenuResponse menuResponse) { 
		Menu menu = modelMapper.map(menuResponse, Menu.class);
		menuRepository.save(menu);
	}
	
	public void updateMenu(Long id, MenuResponse updatedMenuResponse) {
		Menu existingMenu = menuRepository.findById(id).orElseThrow(() -> new NotFound("menu", "id", id.toString()));
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
		modelMapper.map(updatedMenuResponse, existingMenu);
		menuRepository.save(existingMenu);
	}
	
	public void deleteMenu(Long id) {
		Menu menu =  menuRepository.findById(id).orElseThrow(() -> new NotFound("menu", "id", id.toString()));
		menuRepository.delete(menu);
	}
}
