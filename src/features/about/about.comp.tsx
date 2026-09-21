import { AboutHeroSectionComp } from './hero.comp'
import { AboutFeaturesSectionComp } from './features.comp'
import { AboutTeamSectionComp } from './team.comp'
import { AboutCTASectionComp } from './cta.comp'

export const AboutPageMainComp = () => {
    return (
        <div>
            <AboutHeroSectionComp />
            <AboutFeaturesSectionComp />
            <AboutTeamSectionComp />
            <AboutCTASectionComp />
        </div>
    )
}

