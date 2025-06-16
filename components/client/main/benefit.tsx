import { FEATURE_LIST } from "src/config/constants";

export default function Benefit() {
  const sections = [FEATURE_LIST.USER, FEATURE_LIST.BUSINESS];

  return (
    <section className=" relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={sectionIndex === 0 ? "mb-20" : ""}
          >
            <div className="text-center ">
              <h2 className="text-3xl md:text-4xl font-bold text-black-90 mb-4 text-shadow-sm">
                {section.title}
              </h2>
              <p className="text-lg text-foreground/60 max-w-xl mx-auto">
                {section.desc}
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {section.benefits.map((feature, index) => (
                <div
                  key={feature.title}
                  className="border-2 border-foreground/20 rounded-2xl p-8 shadow-md group hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-5xl mb-6 text-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-center text-foreground whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
