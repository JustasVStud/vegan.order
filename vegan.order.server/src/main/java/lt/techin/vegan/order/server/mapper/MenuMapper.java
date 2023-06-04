package lt.techin.vegan.order.server.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lt.techin.vegan.order.server.dto.MenuDto;
import lt.techin.vegan.order.server.model.Menu;

@Component
public class MenuMapper {
	
	private final ModelMapper modelMapper;

    public MenuMapper() {
        this.modelMapper = new ModelMapper();
    }

    public MenuDto toDto(Menu menu) {
        return modelMapper.map(menu, MenuDto.class);
    }

    public Menu toEntity(MenuDto menuDto) {
        return modelMapper.map(menuDto, Menu.class);
    }

    public void updateMenuFromDto(MenuDto menuDto, Menu menu) {
        modelMapper.map(menuDto, menu);
    }
}
