import * as React from 'react';
import supabase from "../../helper/supabaseClient";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
      return;
    }
    console.log("Utilisateur déconnecté");
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    signOut();
  };

  const handleAccount = () => {
    handleClose();
    console.log("Account");
  }

  const handleSettings = () => {
    handleClose();
    console.log("Settings");
  }

  useEffect(() => {
    const fetchUsername = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Erreur récupération utilisateur :", userError.message);
        return;
      }

      const user = userData?.user;
      if (!user) {
        // S'il n'y a pas d'utilisateur, on redirige vers /login
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Erreur en récupérant le profil :", error.message);
        return;
      }
      setUsername(data.username);
    }

    fetchUsername();

  }, [navigate]);

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton onClick={handleClick} size="small">
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleAccount}>
          <AccountCircleIcon sx={{ marginRight: 1 }} /> {username}
        </MenuItem>
        <MenuItem onClick={handleSettings}>
          <SettingsIcon sx={{ marginRight: 1 }} /> Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
