import React from 'react';

export const Treatments: React.FC = () => {
  const treatments = [
    {
      title: 'Massagem Facial',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a2db3712ab0f5f8d02a23435139a00c8a4be0569?width=844'
    },
    {
      title: 'Massagem Relaxante',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/c15f98c8c975e88c338170cdf3e042e37f8df2ba?width=844'
    },
    {
      title: 'Tratamento 1',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/839f40e4ce08093ca58416b16c042a48b0a0e7c1?width=844'
    }
  ];

  return (
    <section className="w-[1290px] h-[550px] absolute left-[960px] top-[1725px] max-md:relative max-md:w-full max-md:h-auto max-md:flex max-md:flex-col max-md:items-center max-md:gap-[30px] max-md:p-5 max-md:left-auto">
      {treatments.map((treatment, index) => (
        <article
          key={index}
          className={`w-[420px] h-[550px] absolute ${
            index === 0 ? 'left-0' : index === 1 ? 'left-[435px]' : 'left-[870px]'
          } top-0 group cursor-pointer`}
        >
          <div className="w-[420px] h-[550px] absolute bg-[#EFCFA6] rounded-[10px] left-0 top-0 group-hover:bg-[#A66642] transition-colors duration-300" />
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-[422px] h-[617px] aspect-[13/19] absolute top-[-67px] -left-0.5 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="w-[420px] h-[131px] backdrop-blur-sm absolute bg-[rgba(217,217,217,0.25)] left-0 top-[419px]" />
          <div className="w-[381px] h-24 text-[#402510] text-center text-[26px] font-normal absolute left-[21px] top-[434px] group-hover:text-white transition-colors duration-300">
            {treatment.title}
          </div>
        </article>
      ))}
    </section>
  );
};
