import { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(
        badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
      );

      // Title animation - character by character
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.4,
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 1 }
      );

      // Scroll indicator animation
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.5 }
      );

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToBrand = () => {
    const element = document.querySelector('#brand-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text into characters
  const brandName = '甜悦控糖';
  const brandChars = brandName.split('');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f1efed]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/brand-hero.jpg"
          alt="甜悦控糖"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f1efed]/70 via-[#f1efed]/50 to-[#f1efed]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#e0ddd5] rounded-full opacity-50" />
      <div className="absolute bottom-40 right-20 w-48 h-48 border border-[#e0ddd5] rounded-full opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#363533] rounded-full" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#e0ddd5] rounded-full" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Brand Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full mb-8 border border-[#e0ddd5] shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-[#363533] tracking-wide">
            高端控糖烘焙品牌
          </span>
        </div>

        {/* Brand Name */}
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold text-[#363533] mb-6 tracking-tight"
          style={{ perspective: '1000px' }}
        >
          {brandChars.map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl text-[#5e5e5e] font-light tracking-wide mb-4"
        >
          无糖美味 · 悦享甜蜜
        </p>

        {/* Brand Promise */}
        <p className="text-base sm:text-lg text-[#5e5e5e]/80 max-w-2xl mx-auto leading-relaxed mb-12">
          专为控糖人群精心打造的低糖烘焙品牌
          <br className="hidden sm:block" />
          让健康与美味完美平衡，重新定义甜点时光
        </p>

        {/* Brand Values */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-16">
          {[
            { value: '0糖', label: '健康配方' },
            { value: '30+', label: '精选产品' },
            { value: '100%', label: '天然原料' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-[#363533] mb-1">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-[#5e5e5e]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={scrollToBrand}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-sm text-[#5e5e5e] group-hover:text-[#363533] transition-colors">
          探索品牌故事
        </span>
        <div className="w-10 h-10 rounded-full border border-[#e0ddd5] flex items-center justify-center group-hover:border-emerald-600 group-hover:bg-emerald-600 transition-all">
          <ArrowDown className="w-4 h-4 text-[#5e5e5e] group-hover:text-white transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
