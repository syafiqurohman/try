import * as React from "react";
import { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import { Box, IconButton, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import logoSMK from '../../assets/images/smk-informatika.png';
import BasicDialogs from '../../components/common/Modal/dialog';
import DaftarUlangForm from '../modal/DaftarUlangForm';
import { useForm } from 'react-hook-form';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tentackle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[200],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography fontWeight="medium">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Beranda");
  const [open, setOpen] = React.useState(false);
  const { control, watch, setValue, handleSubmit } = useForm();

  const onSubmit = (props) => {
    console.log(props)
  }
  return (
    <Box
      sx={{
        position: "sticky",
        height: "100vh",
        top: 0,
        bottom: 0,
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#4389a9 !important",
        },
        "& .pro-menu-item.active": {
          color: "#4389a9 !important",
        },
      }}
    >
      <ProSidebar breakPoint="md" collapsed={isCollapsed}>
        <SidebarHeader>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuRoundedIcon /> : undefined}
              style={{
                margin: "10px 0 0 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="20px"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="30px"
                      height="30px"
                      src={logoSMK}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.blueAccent[400]}
                  >
                    Admin PPDB
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuRoundedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Beranda"
                to="/beranda"
                fontWeight="bold"
                icon={<HomeRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Siswa Terdaftar"
                to="/siswa_terdaftar"
                fontWeight="bold"
                icon={<InventoryRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Box
            sx={{ mt: 2, mb: 2, ml: 1 }}
            paddingLeft={isCollapsed ? undefined : "16%"}
          >
            <BasicDialogs
              title="Formulir Daftar Ulang"
              setOpen={setOpen}
              open={open}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            >
              <DaftarUlangForm {...{ control, watch, setValue }} />
            </BasicDialogs>
            <Button
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <HowToRegRoundedIcon sx={{ mr: "3px" }} />
              {!isCollapsed && "Daftar Ulang!"}
            </Button>
          </Box>
          <Copyright sx={{ mt: 2, mb: 2 }} />
        </SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
