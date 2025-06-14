import Benefit from "./benefit";

export default function BenefitSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black text-black-90 mb-4 text-shadow-sm">
          이용자 혜택
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-black/60 font-semibold max-w-2xl mx-auto leading-relaxed">
          사용자와 사업자 모두에게 최적화된 혜택을 제공합니다.
        </p>
      </div>
      <Benefit />
    </section>
  );
}
