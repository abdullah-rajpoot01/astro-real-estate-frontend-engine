import Features from '../home/features'
import AboutCTA from './about-cta'
import AboutHero from './about-hero'
import Team from './team'

const AboutPage = () => {
    return (
        <div>
            <AboutHero/>
            <Features />
            <Team />
            <AboutCTA/>
        </div>
    )
}

export default AboutPage