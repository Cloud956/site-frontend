import React, { PropsWithChildren, useState } from "react";
import { MenuItem, Button } from "@mui/material";
import { Menu } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoreVert } from "@mui/icons-material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

interface Props {
  menuItems: string[];
  onItemClick: (string: string) => void;
}

export default function TransformationsMenu({ menuItems, onItemClick }: Props) {
  const MAX_HEIGHT = "50vh";
  const [menuState, menuStateChanger] = useState<null | HTMLElement>(null);
  const [menuSelectedItem, menuSelectedItemChanger] = useState<string>("");
  const open = Boolean(menuState);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    menuStateChanger(event.currentTarget);
  };
  const handleClose = () => {
    menuStateChanger(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownCircleIcon />}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
        sx={{
          height:"4vh"
        }}
        
      >
        <span style={{fontSize:"1.3vh"}}>Select a transformation! </span>
        
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={menuState}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: MAX_HEIGHT,
            width: "auto",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item}
            selected={menuSelectedItem === item}
            onClick={() => {
              menuSelectedItemChanger(item);
              handleClose();
              onItemClick(item);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
