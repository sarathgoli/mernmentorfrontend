import React from 'react'
import {HeroContainer,HeroBg,VideoBg} from './HeroElements'
import Video from '../videos/video (5).mp4'
function Hero() {
    return (
        <>
            <HeroContainer>
                <HeroBg>
                    <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
                </HeroBg>
            </HeroContainer>
        </>
    )
}

export default Hero
