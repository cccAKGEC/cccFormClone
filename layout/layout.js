import Image from 'next/image';
import styles from '../src/styles/Layout.module.css';


const Layout = ({ children }) => {
  const spooc23Style = {
    fontFamily: 'Monomaniac One, sans-serif', // Specify the font family here
  };

  return (
    <div className={`flex h-screen bg-blue-400 ${styles.BackImg}`}>
      <div className="m-auto rounded-md w-4/5 h-4/4 grid lg:grid-cols-2">
        <div className='mt-12'>
        <div className="flex justify-center items-center space-x-6">
  <Image src="/assets/logo.png" width={60} height={60} alt="CCC-logo" />
  <h2 className="text-white text-3xl">Cloud Computing Cell</h2>
</div>

          <div>
            <h3 className="flex mt-16 ml-64 text-white text-2xl">Presents</h3>
          </div>
          <div className="mt-32">
            <h1 className="text-left text-white text-[8rem] uppercase w-[100rem]"  style={spooc23Style}>SPOCC’ 23</h1>
            <h2 className="mt-10 text-white text-3xl text-center">THE RECRUITMENT DRIVE</h2>
          </div>
        </div>
        <div className="right flex flex-col justify-evenly ">
          <div className="text-center py-2 pl-16">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
