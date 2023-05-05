import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconComponent from "../../components/icon";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useTranslation } from "react-i18next";
import { JsonDataType, PropTypes } from "../../interface";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default function Layout(props: PropTypes) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [formats, setFormats] = React.useState("en");
  const data = useContext(AppContext);
  const [componentData, setComponentData] = useState(data);
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child as React.ReactElement, {
      index: props.index,
      level: props.level
    })
  );
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string
  ) => {
    setFormats(newFormats);
    i18n.changeLanguage(newFormats);
  };
  const handleClick = (component: JsonDataType) => {
    let tempComponentList = [...componentData];
    let tempComponent = {
      ...component,
      dropdownOpen: !component?.dropdownOpen
    };

    tempComponentList[component.id] = tempComponent;
    setComponentData(tempComponentList);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flex: 1 }}>
            DigiCloud Assignment
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={formats}
            exclusive
            onChange={handleFormat}
            aria-label="language format"
          >
            <ToggleButton value="en">En</ToggleButton>
            <ToggleButton value="hn">Hn</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {componentData?.map((component: JsonDataType, index: number) => {
            return !component.hideInMenu ? (
              !component?.isDropdownNeeded ? (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => navigate(component.url)}>
                    <ListItemIcon>
                      {<IconComponent icon={component.icon || ""} />}
                    </ListItemIcon>
                    <ListItemText primary={component.name} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => navigate(component.url)}>
                      <ListItemIcon>
                        {<IconComponent icon={component.icon || ""} />}
                      </ListItemIcon>
                      <ListItemText primary={component.name} />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClick(component)}>
                      {component.dropdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse
                    in={component.dropdownOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {component?.routes &&
                        component.routes.map(
                          (childComponent: JsonDataType, index: number) => {
                            return !childComponent.hideInMenu ? (
                              <ListItemButton
                                key={index}
                                sx={{ pl: 4 }}
                                onClick={() => {
                                  navigate(childComponent.url);
                                }}
                              >
                                <ListItemIcon>
                                  {
                                    <IconComponent
                                      icon={childComponent.icon || ""}
                                    />
                                  }
                                </ListItemIcon>
                                <ListItemText primary={childComponent.name} />
                              </ListItemButton>
                            ) : (
                              <></>
                            );
                          }
                        )}
                    </List>
                  </Collapse>
                </>
              )
            ) : (
              <></>
            );
          })}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {childrenWithProps}
      </Main>
    </Box>
  );
}
