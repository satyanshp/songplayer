import { Box } from '@mui/material'
import React from 'react'
import songs from "../../assests/Home/icon_wrapper.png"
import logout from "../../assests/Home/logout.png"

import './Styles/SideMenu.css'

interface ButtonProps{
    img: string;
    text:string;
    selected:boolean;
    onClick?:() => void;
}

const ButtonClick = ({img,text,selected,onClick}:ButtonProps) => {
return(
    <Box onClick={onClick} className={`home__sidemenu_buttons ${selected&&'selected'}`}>
        <img src={img} alt={text} />
        <h2>{text}</h2>
    </Box>
)
}

const SideMenu = () => {
    const handleLogout = () =>{
        localStorage.removeItem("user");
        window.location.reload();
    }
  return (
    <Box className="home__sidemenu">
        <Box className="home__sidemenu_credit">
            <h1>Logo</h1>
        </Box>
        <Box className="home__sidemenu_menu">
            <Box className="home__sidemenu_menu_items">
                <ButtonClick text="Songs" img={songs} selected/>
            </Box>
            <Box className="home__sidemenu_menu_logout">
                <ButtonClick  onClick={handleLogout} text="Logout" img={logout} selected={false}/>
            </Box>
        </Box>
    </Box>
  )
}

export default SideMenu