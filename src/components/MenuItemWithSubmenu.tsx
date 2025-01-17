import React from "react";
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface MenuItemWithSubmenuProps {
  title: string;
  icon: React.ReactNode;
  open: boolean;
  onClick: () => void;
  subMenus: string[];
}

const MenuItemWithSubmenu: React.FC<MenuItemWithSubmenuProps> = ({
  title,
  icon,
  open,
  onClick,
  subMenus,
}) => {
  return (
    <>
      <ListItem  onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenus.map((subMenu, index) => (
            <ListItem key={index} sx={{ pl: 4 }}>
              <ListItemText primary={subMenu} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MenuItemWithSubmenu;
