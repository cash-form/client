import { PageUrlConfig } from "src/config/page.config";
import { SLOGAN } from "src/config/constants";
import { Button } from "src/components/ui/button";
import Link from "next/link";

export default function MainBanner() {
  return (
    <section className="relative min-h-[40vh] bg-gradient-to-br from-banner-dark via-primary to-secondary text-white flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6  text-shadow-lg animate-fade-in-up">
          {SLOGAN.TITLE}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 opacity-95 text-shadow-sm max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          {SLOGAN.SUBTITLE}
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
    </section>
  );
}
