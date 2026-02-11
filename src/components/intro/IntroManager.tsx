import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import IntroTech from './IntroTech';
import IntroClean from './IntroClean';
import IntroBrutalism from './IntroBrutalism';
import IntroAmoled from './IntroAmoled';
import IntroNeumorphism from './IntroNeumorphism';
import IntroClaymorphism from './IntroClaymorphism';
import IntroGlassmorphism from './IntroGlassmorphism';

export default function IntroManager() {
    const { theme, isIntroPlaying, setIntroPlaying } = useTheme();

    const getIntroComponent = () => {
        const handleComplete = () => setIntroPlaying(false);

        switch (theme) {
            case 'cyberpunk':
                return <IntroTech onComplete={handleComplete} />;
            case 'brutalism':
                return <IntroBrutalism onComplete={handleComplete} />;
            case 'amoled':
                return <IntroAmoled onComplete={handleComplete} />;
            case 'neumorphism':
                return <IntroNeumorphism onComplete={handleComplete} />;
            case 'claymorphism':
                return <IntroClaymorphism onComplete={handleComplete} />;
            case 'glassmorphism':
                return <IntroGlassmorphism onComplete={handleComplete} />;
            case 'minimalism':
            default:
                return <IntroClean onComplete={handleComplete} />;
        }
    };

    return (
        <AnimatePresence>
            {isIntroPlaying && getIntroComponent()}
        </AnimatePresence>
    );
}
