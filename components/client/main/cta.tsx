import Link from "next/link";
import { Button } from "src/components/ui/button";
import { PageUrlConfig } from "src/config/page.config";

export default function Cta() {
  return (
    <section className="relative bg-gradient-to-r from-banner-dark to-primary text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto ">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            준비되셨나요?
          </h2>

          <p className="text-lg md:text-xl mb-8 opacity-90">
            지금 바로 설문조사의 새로운 경험을 시작해보세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button
              asChild
              className="bg-white/25 hover:bg-white/35 text-white border-2 border-white/40 backdrop-blur-sm px-8 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl min-w-[200px]"
            >
              <Link href={PageUrlConfig.SURVEYS}>설문참여하기</Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="bg-white/95 hover:bg-white text-black/80 hover:text-black/90 px-8 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl min-w-[200px] border-0"
            >
              <Link href={PageUrlConfig.REGISTER}>설문등록하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
