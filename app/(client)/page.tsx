import BenefitSection from "components/client/main/benefitSection";
import Cta from "components/client/main/cta";
import MainBanner from "components/client/main/mainBanner";

export default function Home() {
  return (
    <div>
      <MainBanner />
      <BenefitSection />
      <Cta />
    </div>
  );
}
