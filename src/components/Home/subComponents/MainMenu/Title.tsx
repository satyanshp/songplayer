import { Box, Button } from '@mui/material'
import React from 'react'

interface TitleProps{
    handleOpen:()=>void;
}

const Title = ({handleOpen}:TitleProps) => {
    const pageInletArr = [
        "home","player","songs"
    ]
    
  return (
    <Box component={'section'} className='home__mainmenu_title'>
        <Box className="home__mainmenu_title_pagination">
            {pageInletArr.map((item,index)=>(<h3 key={`page-${index}`} style={{color:index===pageInletArr.length-1?'rgba(0, 0, 0, 0.85)':'rgba(0, 0, 0, 0.45)'}}>{item} {index===pageInletArr.length-1?"":"/"}</h3>))}
        </Box>
        <Box className="home__mainmenu_title_header">
            <h1>Songs</h1>
            <Button onClick={handleOpen}>Add Songs</Button>
        </Box>
    </Box>
  )
}

export default Title