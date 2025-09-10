import React from 'react';

export const Footer: React.FC = () => {
  const navigationItems = ['Home', 'Quem é Nazaré Santos', 'Métodologia', 'Blog'];

  return (
    <footer className="w-full h-[504px] absolute left-0 top-[4488px]">
      <div className="w-full h-[504px] absolute bg-[#EFCFA6] left-0 top-0" />
      
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/930ec04cac667605ffc854e8f9dad0159f7a80e1?width=676"
        alt="Logo Clínica Nazaré Santos"
        className="w-[338px] h-[219px] aspect-[54/35] absolute left-[77px] top-3.5"
      />
      
      <div className="w-[760px] h-[227px] absolute left-[580px] top-24">
        <div className="inline-flex items-center gap-[200px] absolute w-[757px] h-[45px] left-[3px] top-0 max-sm:flex-col max-sm:gap-5 max-sm:text-center">
          <h3 className="text-[#402510] text-3xl font-bold relative max-sm:gap-5 max-sm:text-center">
            Entre em contato
          </h3>
          <h3 className="text-[#402510] text-3xl font-bold relative">
            Navegação Rápida
          </h3>
        </div>
        
        <address className="w-[270px] h-[114px] text-[#402510] text-lg font-normal absolute left-[15px] top-[55px] not-italic">
          R. Barbosa de Freitas, 1415 loja C - Aldeota<br />
          Telefone: (85) 99620-9515
        </address>
        
        <nav className="w-[270px] h-[184px] text-[#402510] text-lg font-normal leading-[46px] absolute left-[465px] top-[43px]">
          {navigationItems.map((item, index) => (
            <div key={index} className="hover:text-[#A66642] cursor-pointer transition-colors duration-300">
              {item}
            </div>
          ))}
        </nav>
        
        <div className="absolute left-[-10px] top-[75px]">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="phone-icon"
          >
            <path
              d="M13.7337 15.276L15.0082 14.0013C15.2044 13.8028 15.438 13.6451 15.6954 13.5376C15.9529 13.43 16.2291 13.3747 16.508 13.3747C16.7871 13.3747 17.0633 13.43 17.3208 13.5376C17.5782 13.6451 17.8118 13.8028 18.0078 14.0013L19.5028 15.4964C19.7013 15.6925 19.8589 15.9258 19.9665 16.1833C20.074 16.4407 20.1294 16.7171 20.1294 16.9961C20.1294 17.2752 20.074 17.5514 19.9665 17.8089C19.8589 18.0664 19.7013 18.2997 19.5028 18.4958L18.8224 19.1858C18.3536 19.6592 17.7473 19.9726 17.0898 20.081C16.4324 20.1893 15.7576 20.0875 15.1616 19.7896C10.0329 17.1495 5.85547 12.9754 3.21119 7.84888C2.91308 7.25224 2.81186 6.57643 2.92207 5.91864C3.03228 5.26084 3.34824 4.65487 3.82454 4.18798L4.50492 3.49801C4.90352 3.10181 5.44271 2.87939 6.00471 2.87939C6.56672 2.87939 7.1059 3.10181 7.5045 3.49801L9.0091 5.00265C9.40529 5.40126 9.62768 5.94038 9.62768 6.50239C9.62768 7.0644 9.40529 7.60352 9.0091 8.00213L7.73449 9.27679C8.57726 10.4167 9.50297 11.4929 10.5041 12.4966C11.4994 13.4937 12.5695 14.4133 13.7049 15.2472L13.7337 15.276Z"
              stroke="#402510"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      <div className="w-[1093px] h-0 absolute bg-[#A66642] left-[414px] top-[360px]" />
      
      <div className="w-[831px] h-[79px] text-[#402510] text-center text-base font-normal leading-[27px] absolute left-[520px] top-[378px]">
        <div className="text-black">
          © 2025 Clínica Nazaré Santos. Todos os direitos reservados.
        </div>
        <div className="text-black">Desenvolvido por</div>
        <div className="text-[#402510] underline cursor-pointer hover:text-[#A66642] transition-colors duration-300">
          Phsprojet_
        </div>
      </div>
      
      <div className="inline-flex items-center gap-1 absolute w-[110px] h-[60px] left-[191px] top-[179px]">
        <button className="cursor-pointer transition-transform duration-300 hover:scale-110">
          <svg
            width="60"
            height="61"
            viewBox="0 0 60 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="instagram-icon"
          >
            <path
              d="M39.3062 19.3252C38.1562 19.3252 37.2937 20.1877 37.2937 21.3377C37.2937 22.4877 38.1562 23.3502 39.3062 23.3502C40.4562 23.3502 41.3187 22.4877 41.3187 21.3377C41.3187 20.1877 40.4562 19.3252 39.3062 19.3252Z"
              fill="#402510"
            />
            <path
              d="M30.25 21.9126C25.5063 21.9126 21.7688 25.7938 21.7688 30.3938C21.7688 34.9938 25.65 38.8751 30.25 38.8751C34.85 38.8751 38.7313 34.9938 38.7313 30.3938C38.7313 25.7938 34.9938 21.9126 30.25 21.9126ZM30.25 35.8563C27.2313 35.8563 24.7875 33.4126 24.7875 30.3938C24.7875 27.3751 27.2313 24.9313 30.25 24.9313C33.2688 24.9313 35.7125 27.3751 35.7125 30.3938C35.7125 33.4126 33.2688 35.8563 30.25 35.8563Z"
              fill="#402510"
            />
            <path
              d="M37.15 13H23.4938C17.6 13 13 17.6 13 23.35V37.0063C13 42.7563 17.6 47.3563 23.35 47.3563H37.0063C42.7563 47.3563 47.3563 42.7563 47.3563 37.0063V23.35C47.5 17.6 42.9 13 37.15 13ZM44.1938 37.15C44.1938 41.0312 41.0313 44.3375 37.0063 44.3375H23.35C19.4687 44.3375 16.1625 41.175 16.1625 37.15V23.4938C16.1625 19.6125 19.325 16.3063 23.35 16.3063H37.0063C40.8875 16.3063 44.1938 19.4688 44.1938 23.4938V37.15Z"
              fill="#402510"
            />
          </svg>
        </button>
        
        <button className="cursor-pointer transition-transform duration-300 hover:scale-110">
          <svg
            width="46"
            height="47"
            viewBox="0 0 46 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="youtube-icon"
          >
            <g clipPath="url(#clip0_27_258)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3734 29.1262V16.219C22.9555 18.3751 26.5043 20.4579 30.7014 22.7035C27.2397 24.6233 22.9555 26.7774 18.3734 29.1262ZM43.9093 9.79968C43.1189 8.75833 41.7718 7.94773 40.3376 7.67937C36.1221 6.87885 9.82327 6.87657 5.61005 7.67937C4.45995 7.89497 3.43582 8.41611 2.55607 9.2258C-1.15083 12.6664 0.0107322 31.117 0.904239 34.1058C1.27997 35.3994 1.76569 36.3324 2.3774 36.9448C3.16551 37.7545 4.24457 38.312 5.48402 38.562C8.95495 39.28 26.8365 39.6814 40.2643 38.6698C41.5014 38.4542 42.5965 37.8788 43.4602 37.0347C46.8876 33.6079 46.654 14.121 43.9093 9.79968Z"
                fill="#402510"
              />
            </g>
            <defs>
              <clipPath id="clip0_27_258">
                <rect width="46" height="46.2" fill="white" transform="translate(0 0.078125)" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </footer>
  );
};
