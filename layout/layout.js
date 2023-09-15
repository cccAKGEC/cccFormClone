import Image from 'next/image';
import styles from '../src/styles/Layout.module.css';

const Layout = ({ children }) => {
  const spooc23Style = {
    fontFamily: 'Monomaniac One, sans-serif', // Specify the font family here
  };

  return (
    <div className={`flex h-[100%] lg:h-[125vh] ${styles.BackImg}`}>
      <div className="m-auto rounded-md md:py-0 grid lg:grid-cols-2 md:w-[90w] ">
        <div className="mt-2 md:mt-12">
          <div className="flex ml-[10%] justify-left items-center space-x-2 md:space-x-6 md:justify-center"  >
            <Image src="/assets/logo.png" width={60} height={60} alt="CCC-logo" />
            <h2 className="text-white text-3xl md:text-1xl text-center">Cloud Computing Cell</h2>
          </div>

          <div>
            <h3 className="mt-1 md:mt-10 flex ml-[30%]  text-white text-2xl text-center md:flex md:justify-center md:16 md:ml-0">Presents</h3>
          </div>
          <div className="mt-3 md:mt-16">
            <h1 className="md:text-center md:ml-0 font-semibold text-white text-3xl text-left ml-[12%] md:text-[5rem] uppercase w-full md:w-[43rem]" style={spooc23Style}>HACKOVERFLOW</h1>
            <h2 className="md:mt-10 mt-3 text-white md:text-3xl text-[1.2rem] md:text-center ml-[18%] md:ml-0">WILD CARD ROUND</h2>
          </div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center  pl-[3rem] md:pl-16">{children}</div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          /* Styles for mobile screens */
          
          .text-3xl {
            font-size: 1.875rem; /* Adjust the font size as needed */
          }

          .md\:text-1xl {
            font-size: 1.125rem; /* Adjust the font size as needed */
          }

          .grid {
            grid-template-columns: 1fr; /* Stack columns for the form */
          }

          /* Center-align text on mobile screens */
          .text-center {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
