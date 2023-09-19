import Image from 'next/image';
import styles from '../src/styles/Layout.module.css';

const Layout2 = ({ children }) => {
  return (
    <div className={`flex md:h-[110vh] h-[105%] ${styles.BackImg}`}>
      <div className="m-auto rounded-md md:py-0 grid lg:grid-cols-2 md:w-[90%] ">
        <div className="mt-2 md:mt-10 flex justify-center items-begin ml-0 md:mr-[0]">
          <Image
            src="/assets/img1.png"
            width={600}
            height={600}
            alt="Image1"
            priority
            style={{ boxShadow: '15px 10px 15px rgba(41, 62, 117, 0.35)' }}
            className='w-64 lg:w-[38rem] lg:h-[40rem]'
          />
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center md:pl-32 md:pr-16">{children}</div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          /* Styles for mobile screens */

          .text-3xl {
            font-size: 1.5rem; /* Adjust the font size for mobile */
          }

          .md\:text-1xl {
            font-size: 1rem; /* Adjust the font size for mobile */
          }

          .grid {
            grid-template-columns: 1fr; /* Stack columns for the form */
          }

          .text-center {
            text-align: center;
          }

          /* Adjust the image size for mobile screens */
          .mobile-image {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout2;
