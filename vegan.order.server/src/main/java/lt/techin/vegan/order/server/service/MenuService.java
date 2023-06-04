package lt.techin.vegan.order.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.vegan.order.server.dto.MenuDto;
import lt.techin.vegan.order.server.exception.NoEntries;
import lt.techin.vegan.order.server.exception.NotFound;
import lt.techin.vegan.order.server.mapper.MenuMapper;
import lt.techin.vegan.order.server.model.Menu;
import lt.techin.vegan.order.server.repository.MenuRepository;

@Service
public class MenuService {
	
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
	private MenuMapper menuMapper;
	
	public List<MenuDto> getMenus() {
		List<Menu> menus = menuRepository.findAll();
		if (menus.isEmpty()) {
			throw new NoEntries("menus");
		}
		
		return menus.stream().map(menuMapper::toDto).toList();
	}
	
	public MenuDto getMenuById(Long id) {
		Menu menu =  menuRepository.findById(id).orElseThrow(() -> new NotFound("menu", "id", id.toString()));
		return menuMapper.toDto(menu);
	}
	
	public void createMenu(MenuDto menuDto) {
		menuRepository.save(menuMapper.toEntity(menuDto));
	}
	
	public void updateMenu(Long id, MenuDto updatedMenuDto) {
		
		MenuDto currentMenuDto = getMenuById(id);
		
		currentMenuDto.setTitle(updatedMenuDto.getTitle());
		currentMenuDto.setMeals(updatedMenuDto.getMeals());
		menuRepository.save(menuMapper.toEntity(currentMenuDto));
	}
	
	public void deleteMenu(Long id) {
		menuRepository.deleteById(id);
	}
}
