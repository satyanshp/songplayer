import { Box, Typography } from '@mui/material';
import React from 'react';
import play from "../../../../assests/Home/play.png";
import deleteImg from "../../../../assests/Home/DeleteOutlined.png";
import { SongProp } from './AddForm';

interface SongsTableProp{
    songArr?:SongProp[];
    handlePlay: (index:number)=>void;
    handleDelete: (index:number)=>void;
}

const SongsTable = ({songArr,handlePlay,handleDelete}:SongsTableProp) => {
    const srcImg = (item:any) => {
        if (item.albumArt){
            if(typeof item.albumArt==='string'){
               return item.albumArt
            }else{
               return URL.createObjectURL(item.albumArt)
            }
        }
    }
    return (
    <Box className="home__maimmenu_songsTable">
        <Box className="home__maimmenu_songsTable_header">
            <Typography width={'40%'} style={{textAlign:'left',paddingLeft:'29px'}}>Song Name</Typography>
            <Typography width={'20%'}>Source</Typography>
            <Typography width={'20%'}>Added ON</Typography>
            <Typography width={'12%'}></Typography>
            <Typography width={'8%'}></Typography>
        </Box>
        <Box className="home__mainmenu_songsTable_list">
            {songArr?.map((item,index)=>(
                <Box key={`song-list-${index}`} className="home__mainmenu_songsTable_row">
                    <Box width={'40%'} style={{textAlign:'left'}} className="home__mainmenu_songsTable_songName">
                        <img src={srcImg(item)} alt="album art" />
                        <Typography>{item.songName}</Typography>
                    </Box>
                    <Box width={'20%'}>{item.source}</Box>
                    <Box width={'20%'}>{item.addedOn}</Box>
                    <Box width={'12%'} sx={{cursor:'pointer'}} onClick={()=>handlePlay(index)}> <img src={play} alt="play" /> </Box>
                    <Box width={'8%'}  sx={{cursor:'pointer'}} onClick={()=>handleDelete(index)}> <img src={deleteImg} alt="delete" /> </Box>
                </Box>
            ))}
        </Box>
    </Box>
  )
}

export default SongsTable