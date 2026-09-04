import { Features } from './features.comp'
import { CTA } from './cta.comp'
import { Hero } from './hero.comp'
import Team from './team.comp'

const AboutPage = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Team />
            <CTA />
        </div>
    )
}

export { AboutPage }