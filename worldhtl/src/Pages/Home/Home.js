import React, { useState } from 'react'
import HomeContent from '../../components/HomeContent/HomeContent'
import ExploreRoom from '../../components/ExploreRoom/ExploreRoom'
import FooterContainer from '../../components/footer/FooterContainer'
import Accommodations from '../../components/Accommodations/Accommodations'


const Home = () => {

  return (
    <div
  >
    <HomeContent />
    <ExploreRoom />
    <Accommodations />
  </div>
  
  )
}

export default Home