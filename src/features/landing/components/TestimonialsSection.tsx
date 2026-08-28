import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Rajesh Choudhary',
      role: 'Owner & Operator',
      company: 'Jai Hanuman Brick Industries (UP)',
      quote:
        'BrickOS eliminated all disputes in pathera labour counts and tractor delivery trips. We recovered our entire annual software cost within the first 3 weeks through reduced diesel and billing leakages.',
      rating: 5,
    },
    {
      name: 'Anand Murthy',
      role: 'Managing Director',
      company: 'Apex Paver Blocks & Precast (Telangana)',
      quote:
        'The GPS delivery challan with OTP signature changed our customer experience. Developers no longer dispute whether the materials arrived on site. The GST billing is fully automatic.',
      rating: 5,
    },
    {
      name: 'Virendra Patel',
      role: 'Director',
      company: 'Shree Ram Clay & Flyash Products (Gujarat)',
      quote:
        'Managing 3 different kiln locations used to be a nightmare with paper notebooks. Now I check daily production, raw coal stocks, and outstanding customer payments live on my mobile phone.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-[#D8232A] uppercase mb-2 block">
            TRUSTED BY INDUSTRY LEADERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
            What Plant Owners Are Saying
          </h2>
          <p className="text-slate-600 font-medium mt-3">
            Real stories of transformation from brick kilns and material manufacturers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-[#FAFAFC] border-2 border-slate-200/80 rounded-3xl p-7 hover:border-[#D8232A]/50 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-950">{item.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                <p className="text-[11px] font-bold text-[#D8232A] mt-0.5">{item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
