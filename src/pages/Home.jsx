import HeroSection from '../components/layouts/HeroSection';
import InnovateSection from '../components/layouts/InnovateSection';

export default function Home() {
  return (
    <div className="page-home" style={{"overflow":"hidden"}}>
      <HeroSection />
      <InnovateSection/>
    </div>
  );
}