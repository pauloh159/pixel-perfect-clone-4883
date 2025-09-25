import React from 'react';

export const Gallery: React.FC = () => {
  const galleryImages = [
    {
      src: 'https://api.builder.io/api/v1/image/assets/TEMP/bbc120951dded6bb5bf68b00f31835314cfade88?width=1540',
      className: 'w-[770px] h-[358px] absolute left-0 top-0'
    },
    {
      src: 'https://api.builder.io/api/v1/image/assets/TEMP/c86741d3559b627048e962f3a4296e7b8e53e251?width=1105',
      className: 'w-[552px] h-[358px] absolute left-[782px] top-0'
    },
    {
      src: 'https://api.builder.io/api/v1/image/assets/TEMP/fa32b8cf265658d78ec50f42de3f7e14a4ef18e1?width=752',
      className: 'w-[348px] h-[370px] absolute left-0 top-[373px]'
    },
    {
      src: 'https://api.builder.io/api/v1/image/assets/TEMP/ca6c9094a9bd6fdbc2d4e695c8e02242c4bc1f76?width=1928',
      className: 'w-[970px] h-[370px] absolute left-[364px] top-[373px]'
    },
    {
      src: 'https://api.builder.io/api/v1/image/assets/TEMP/b244a5fbf689563de796746a165c401c7fac69b5?width=851',
      className: 'w-[370px] h-[743px] absolute left-[1348px] top-0'
    }
  ];

  return (
    <section className="relative">
      <div className="flex w-[1046px] h-[151px] flex-col justify-center text-center text-[46px] font-normal capitalize absolute left-[437px] top-[2934px]">
        <div className="text-[#402510]">
          Nada Melhor do que um atendimento de qualidade em um
        </div>
        <div className="text-[#A66642]">ambiente acolhedor</div>
      </div>
      
      <div className="w-[1718px] h-[743px] absolute left-[101px] top-[3143px]">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`${image.className} group cursor-pointer overflow-hidden rounded-[20px]`}
          >
            <div className="w-full h-full absolute bg-[#D9D9D9] rounded-[20px]" />
            <img
              src={image.src}
              alt={`Ambiente da clínica ${index + 1}`}
              className="transition-transform duration-[0.3s] ease-[ease] w-full h-full object-cover group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
