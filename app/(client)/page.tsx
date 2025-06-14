import BusinessBenefit from "components/client/main/businessBenefit";
import ClientBenefit from "components/client/main/clientBenefit";
import Cta from "components/client/main/cta";
import MainBanner from "components/client/main/mainBanner";

export default function Home() {
  return (
    <div>
      <MainBanner />
      <ClientBenefit />
      <BusinessBenefit />
      <Cta />
    </div>
  );
}
