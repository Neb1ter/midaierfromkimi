import { useEffect, useRef, useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: '李女士',
      avatar: 'L',
      role: '糖尿病患者',
      content:
        '终于找到既美味又健康的甜点了！作为糖尿病患者，我以前从来不敢吃蛋糕。甜悦控糖的产品让我重拾甜蜜时光，血糖也不会飙升。',
      rating: 5,
      product: '无糖奶酪蛋糕',
    },
    {
      id: 2,
      name: '王先生',
      avatar: 'W',
      role: '健身爱好者',
      content:
        '作为糖尿病患者，这里的产品让我重拾甜蜜时光。低糖配方让我在控制血糖的同时，也能享受美味的甜点。强烈推荐！',
      rating: 5,
      product: '零糖罐子蛋糕',
    },
    {
      id: 3,
      name: '张女士',
      avatar: 'Z',
      role: '生酮饮食者',
      content:
        '生酮系列让我的饮食计划更加轻松。终于可以在严格执行生酮饮食的同时，享受到美味的甜点了。口感和普通蛋糕几乎没有区别！',
      rating: 5,
      product: '生酮曲奇饼干',
    },
    {
      id: 4,
      name: '陈先生',
      avatar: 'C',
      role: '控糖减肥者',
      content:
        '在减肥期间发现了甜悦控糖，简直是救星！低卡又美味，完全满足了我的甜食欲望，而且不会影响减肥进度。',
      rating: 5,
      product: '低糖生日蛋糕',
    },
    {
      id: 5,
      name: '刘女士',
      avatar: 'L',
      role: '孕妇',
      content:
        '孕期需要控制血糖，甜悦控糖的产品让我可以安心享受甜点。原料天然健康，作为孕妇也能放心食用。',
      rating: 5,
      product: '无糖青团',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (translateX > 100) {
      prevSlide();
    } else if (translateX < -100) {
      nextSlide();
    }
    setIsDragging(false);
    setTranslateX(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f1efed] overflow-hidden"
    >
      {/* Background Quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Quote className="w-[400px] h-[400px] text-[#e0ddd5] opacity-20 rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="testimonials-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-[#e0ddd5]">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-[#5e5e5e]">
              客户心声
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#363533] mb-4">
            客户心声
          </h2>
          <p className="text-lg text-[#5e5e5e] max-w-2xl mx-auto">
            听听我们的用户怎么说，他们的满意是我们最大的动力
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% / 3 + ${translateX}px))`,
                transitionTimingFunction: isDragging ? 'linear' : 'var(--ease-expo)',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`testimonial-card w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 transition-all duration-500 ${
                    index === currentIndex
                      ? 'scale-100 opacity-100'
                      : 'scale-95 opacity-70'
                  }`}
                >
                  <div className="bg-white rounded-3xl p-8 border border-[#e0ddd5] h-full">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-[#363533] leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    {/* Product Tag */}
                    <div className="inline-flex px-3 py-1 bg-[#f1efed] rounded-full text-xs text-[#5e5e5e] mb-6">
                      购买产品：{testimonial.product}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-[#e0ddd5]">
                      <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-[#363533]">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-[#5e5e5e]">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border border-[#e0ddd5] flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
              aria-label="上一个"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-emerald-600'
                      : 'bg-[#e0ddd5] hover:bg-[#5e5e5e]'
                  }`}
                  aria-label={`转到第${index + 1}个评价`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border border-[#e0ddd5] flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
              aria-label="下一个"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: '10,000+', label: '满意客户' },
            { value: '4.9', label: '平均评分' },
            { value: '98%', label: '复购率' },
            { value: '30+', label: '产品种类' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e0ddd5]"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#363533] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#5e5e5e]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
