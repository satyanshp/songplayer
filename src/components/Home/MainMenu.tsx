import React from 'react'
import Title from './subComponents/MainMenu/Title'
import SongsTable from './subComponents/MainMenu/SongsTable'
import MusicPlayer from './subComponents/MainMenu/MusicPlayer'
import albumArt from "../../assests/Home/albumart.png";
import audio from "../../assests/sample.mp3";
import audio1 from "../../assests/sample2.mp3";
import audio2 from "../../assests/sample3.mp3";

import './Styles/MainMenu.css'
import { Box, Modal } from '@mui/material';
import AddForm, { SongProp } from './subComponents/MainMenu/AddForm';

const MainMenu = () => {
    const [songArr, setSongArr] = React.useState([
        {
            songName: "Song1",
            source: "YouTube",
            addedOn: "01/02/2017",
            albumArt: albumArt,
            link:audio,
        },
        {
            songName: "Song2",
            source: "YouTube",
            addedOn: "01/02/2017",
            albumArt: albumArt,
            link:audio1,
        },
        {
            songName: "Song3",
            source: "YouTube",
            addedOn: "01/02/2017",
            albumArt: albumArt,
            link:audio2,
        },
    ]);

    const [songsList, setSongsList] = React.useState<SongProp[]>()

    React.useEffect(() => {
        localStorage.setItem('songsList', JSON.stringify(songArr));
        var x = localStorage.getItem("songsList");
        if (x)
            setSongsList(JSON.parse(x));
    }, [songArr])
    
    console.log(songsList);
    
    const [selectedSong, setSelectedSong] = React.useState(0);
    const handleDelete = (index: number) => {
        let arr = [...songArr]
        arr.splice(index,1)
        setSongArr(arr)
    };
    const handlePlay = (index: number) => {
        setSelectedSong(index)
    };
    const handleNext = () => {
        if(selectedSong===songArr.length-1){
            setSelectedSong(0)
        }
        else{
            setSelectedSong(selectedSong+1)
        }
    };
    const handlePrevious = () => {
        if(selectedSong===0){
            setSelectedSong(songArr.length-1)
        }
        else{
            setSelectedSong(selectedSong-1)
        }
    };
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (obj:SongProp) => {
        setSongArr([...songArr,obj]);
        setOpen(false);
    };
  return (
    <div className='home__mainmenu'>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AddForm handleClose={handleClose} handleSubmit={handleSubmit}/>
            </Box>
        </Modal>
        <Title handleOpen={handleOpen}/>
        <SongsTable songArr={songsList} handleDelete={handleDelete} handlePlay={handlePlay}/>
        <MusicPlayer song={songsList&&songsList[selectedSong]} handlePrevious={handlePrevious} handleNext={handleNext} />
    </div>
  )
}

export default MainMenu