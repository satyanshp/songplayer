import { Grid } from '@mui/material'
import React from 'react'
import SideMenu from '../components/Home/SideMenu'
import MainMenu from '../components/Home/MainMenu'

import './styles/Home.css'

const Home = () => {
  return (
    <Grid container className='home'>
      <Grid item xs={2.5} display={'flex'}>
        <SideMenu/>
      </Grid>
      <Grid item xs={9.5} display={'flex'}>
        <MainMenu/>
      </Grid>
    </Grid>
  )
}

export default Home