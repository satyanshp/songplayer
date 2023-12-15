import { Box, Typography } from '@mui/material'
import React, { useRef } from 'react'
import albumArt from "../../../../assests/Home/albumart.png";
import pause from "../../../../assests/Home/pause.png";
import next from "../../../../assests/Home/next.png";
import play from "../../../../assests/Home/start.png";
import { SongProp } from './AddForm';

interface MusicPlayerProp{
    song?: SongProp;
    handlePrevious:()=>void;
    handleNext:()=>void;
}

const MusicPlayer = ({song,handlePrevious,handleNext}:MusicPlayerProp) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    console.log(audioRef);
    React.useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, audioRef]);
    
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const handleTimeUpdate = () => {
        if(audioRef.current){
            setCurrentTime(audioRef.current?.currentTime);
            setDuration(audioRef.current?.duration);
        }
    };
    const percentagePlayed = (duration&&currentTime)&&currentTime / duration * 100;
    console.log(duration,currentTime,percentagePlayed);
    React.useEffect(() => {
        audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
          audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
        };
      }, []);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(audioRef.current)
        audioRef.current.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    };
  return (
    <Box className="home__mainmenu_music">
        <div style={{display:'flex'}}>
            <audio src={song?.link} ref={audioRef}/>
        </div>
        <Box display={'flex'} height={'4.167px'} width={'100%'} alignItems={'center'} position={'relative'}>
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                style={{position:'absolute', opacity: 0, width:'100%'}}
            />
            <Box width={`${percentagePlayed}%`} bgcolor={'rgba(0, 0, 0, 0.50)'} height={'100%'}></Box>
            <Box display={'flex'} height={20} width={20} bgcolor={'#FDB927'} borderRadius={'50%'}></Box>
            <Box width={`${percentagePlayed?(100-percentagePlayed):100}%`} bgcolor={'rgba(0, 0, 0, 0.31)'} height={'100%'}></Box>
        </Box>
        <Box className="home__mainmenu_musicPlayer">
            <Box className="home__mainmenu_musicPlayer_song">
                <img src={song?song.albumArt:albumArt} alt="album art" />
                <Typography>{song?.songName}</Typography>
            </Box>
            <Box className="home__mainmenu_musicPlayer_controls">
                <Box onClick={handlePrevious}><img src={next} alt="previous" /></Box>
                <Box onClick={()=>setIsPlaying(!isPlaying)} sx={{minWidth:'23.958px'}}>{isPlaying?<img src={pause} alt="pause" />:<img src={play} alt="play" />}</Box>
                <Box onClick={handleNext}><img src={next} alt="next" style={{transform:'rotate(180deg)'}} /></Box>
            </Box>
        </Box>
    </Box>
  )
}

export default MusicPlayer