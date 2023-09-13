import Head from 'next/head';
import { useState } from 'react';
import { getSession, useSession, signOut } from 'next-auth/react';
import Layout from '../../layout/layout';
import styles from '../styles/Form.module.css';
import { HiAtSymbol, HiOutlineUser } from 'react-icons/hi';
import { useFormik } from 'formik';
import { registerValidate } from '../../lib/validate';
import CommonDropdown from '@/components/DropDown';
import {FaHackerrank,FaMobileAlt,FaLaptop} from "react-icons/fa"
import {BsFillPersonCheckFill} from "react-icons/bs"
import axios from 'axios';


export default function Home() {
  const { data: session } = useSession();

  // Check if session exists and initialize initialValues accordingly
  const initialValues = {
    username: session?.user?.name || '',
    email: session?.user?.email || '',
    studentNumber: '',
    phone:  '',
    hackerRankUsername: '',
    UnstopUsername:'',
  };

  const formik = useFormik({
    initialValues,
    validate: registerValidate,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('/api/register', values);
  
      // Check if the registration was successful
      if (response.status === 200) {
        // Show a success toast using sweetalert
        showSuccessToast('Registration successful');
  
        // Reset the form to its initial state (empty values)
        resetForm();
  
        // You can also clear the selectedKeys state if needed
        setSelectedKeys([]);
      } else {
        // Handle other responses or errors
      }
    } catch (error) {
      // Handle any network errors or API errors
      console.error('API request failed:', error);
    }
  }

  function handleSignOut() {
    signOut();
  }

  const [selectedKeys, setSelectedKeys] = useState([]);
  const section = [
    'S-1',
    'S-2',
    'S-3',
    'S-4',
    'S-5',
    'S-6',
    'S-7',
    'S-8',
    'S-9',
    'S-11',
    'S-12',
    'S-13',
    'S-14',
    'S-15',
    'S-16',
    'S-17',
    'S-18',
    'S-19',
  ];
  const branch = [
    'CSE',
    'CS',
    'CSE(AIML)',
    'CSE(Data Science)',
    'CSE(hindi)',
    'IT',
    'CSIT',
    'AIML',
    'ECE',
    'EN',
    'Mechanical',
    'Civil',
  ];
  const year = ['2nd Year'];
  const residence = ['Hosteller', 'Day Scholar'];
  const gender = ['Male', 'Female', 'Others'];

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
      {/* Header  */}
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        <section className="w-3/4 mx-auto flex flex-col gap-10 bg-cover">
          <div className="title">
            <h1 className="text-white text-4xl font-bold py-4 ">Register</h1>
          </div>
          {/* form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.username && formik.touched.username ? 'border-rose-600' : ''
              }`}
            >
              <input
                type="text"
                name="username"
                placeholder={session?.user?.name || ''}
                className={styles.input_text}
                {...formik.getFieldProps('username')}
              />
              <span className="icon flex items-center px-4 ">
                <HiOutlineUser size={24} />
              </span>
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email ? 'border-rose-600' : ''
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder={session?.user?.email || ''}
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className="icon flex items-center px-4 ">
                <HiAtSymbol size={24} />
              </span>
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.studentNumber && formik.touched.studentNumber
                  ? 'border-rose-600'
                  : ''
              }`}
            >
              <input
                type="number"
                name="studentNumber"
                placeholder="Student Number"
                className={styles.input_text}
                {...formik.getFieldProps('studentNumber')}
              />
              <span className="icon flex items-center px-4 ">
                <BsFillPersonCheckFill size={24} />
              </span>
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.phone && formik.touched.phone ? 'border-rose-600' : ''
              }`}
            >
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className={styles.input_text}
                {...formik.getFieldProps('phone')}
              />
              <span className="icon flex items-center px-4 ">
                <FaMobileAlt size={24} />
              </span>
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.hackerRankUsername && formik.touched.hackerRankUsername
                  ? 'border-rose-600'
                  : ''
              }`}
            >
              <input
                type="text"
                name="hackerRankUsername"
                placeholder="HackerRank Username"
                className={styles.input_text}
                {...formik.getFieldProps('hackerRankUsername')}
              />
              <span className="icon flex items-center px-4 ">
                <FaHackerrank size={24} />
              </span>
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.UnstopUsername && formik.touched.UnstopUsername
                  ? 'border-rose-600'
                  : ''
              }`}
            >
              <input
                type="text"
                name="UnstopUsername"
                placeholder="Unstop Username"
                className={styles.input_text}
                {...formik.getFieldProps('UnstopUsername')}
              />
              <span className="icon flex items-center px-4 ">
                <FaLaptop size={24} />
              </span>
            </div>

           

            {/* Drop Down */}
            <div className={styles.dropdownContainer}>
              <CommonDropdown options={section} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Section" />
              <CommonDropdown options={branch} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Branch" />
              <CommonDropdown options={year} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Year" />
            </div>
            <div className={styles.dropdownContainer}>
              <CommonDropdown options={gender} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Gender" />
              <CommonDropdown options={residence} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Residence" />
            </div>

            {/* login button */}
            <div className="input-button text-black">
              <button type="submit" className={styles.button}>
                Register
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
}



// Authorize
function User({ session, handleSignOut }) {
  return (
    <main>
      {/* Content for authorized users */}
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: './login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
