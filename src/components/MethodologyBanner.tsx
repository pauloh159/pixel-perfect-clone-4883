import React from 'react';

export const MethodologyBanner: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center pt-40 pb-40" 
      style={{ backgroundImage: "url('/imagem nazaré.png')" }}
    >
      <div 
        className="absolute inset-0" 
        style={{ backgroundImage: "linear-gradient(to right, rgba(211, 190, 167, 1) 0%, rgba(211, 190, 167, 1) 40%, rgba(211, 190, 167, 0) 60%)" }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left text-white mb-16 md:mb-0">
            <h1 className="text-h1-custom font-jomolhari leading-tight mb-4 text-[#402510]">
              Nazaré Santos
            </h1>
            <p className="text-xl font-light mb-8 text-[#402510]">
              Esteticista renomada e CEO da Clínica Nazaré Santos, criou um método exclusivo facial e corporal que já <strong>formou mais de 100 profissionais no Brasil</strong>.
            </p>
            <p className="text-xl font-light mb-8 text-[#402510]">
              Com formação internacional em Thai Massage e Drenagem Linfática de Bruxelas, revoluciona a estética brasileira em 2025.
            </p>
            <p className="text-xl font-light mb-8 text-[#402510]">
              <strong>Especialista em terapias manuais</strong>, seu método inclui técnicas inovadoras como Drenagem Linfática da Naza e Powerlifting Facial, que garantem resultados imediatos.
            </p>
            <p className="text-xl font-light mb-8 text-[#402510]">
              Também compartilha sua expertise no <strong>curso "Estética Business"</strong>, ensinando os segredos para uma clínica de sucesso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};