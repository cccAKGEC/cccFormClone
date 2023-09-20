import Head from 'next/head';
import React, { useCallback, useEffect, useRef} from 'react';
import { getSession, useSession, signOut } from 'next-auth/react';
import Layout from '../../layout/layout';
import styles from '../styles/Form.module.css';
import { HiAtSymbol, HiOutlineUser } from 'react-icons/hi';
import { useFormik } from 'formik';
import { registerValidate } from '../../lib/validate';
import CommonDropdown from '@/components/DropDown';
import { FaHackerrank, FaMobileAlt, FaLaptop } from 'react-icons/fa';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { FaSpinner } from 'react-icons/fa';

// import ReCAPTCHA from 'react-google-recaptcha';
// import {
//   GoogleReCaptchaProvider,
//   useGoogleReCaptcha
// } from 'react-google-recaptcha-v3';

export default function Home() {
  const { data: session } = useSession();

  // Define the 'section' variable
  const section = ['1', '2', '3'];
  const branchOptions = [
    'CSE',
    'CS',
    'CSE(AIML)',
    'CSE(ds)',
    'CSE(Hindi)',
    'IT',
    'CSIT',
    'AIML',
    'ECE',
    'EN',
    'Mechanical',
    'Civil',
  ];
  
  const yearOptions = ['2'];
  
  const residenceOptions = ['Hosteller', 'Day Scholar'];
  
  const genderOptions = ['Male', 'Female', 'Others'];
  const domainOption = ["Developer","Designer"]
  const captchaRef = useRef();

  // Check if session exists and initialize initialValues accordingly
  const initialValues = {
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    studentNumber: '',
    phone: '',
    hackerRankUsername: '',
    UnstopUsername: '',
  };

  const [selectedSection, setSelectedSection] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedResidence, setSelectedResidence] = useState('');
  
  const [selectedDomain, setSelectedDomain] = useState('');
  const [reCaptchaValue, setReCaptchaValue] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = React.useState(null);


  const [isLoading, setIsLoading] = useState(false);


  // v3 
  // const { executeRecaptcha } = useGoogleReCaptcha();
   

  const formik = useFormik({
    initialValues,
    validate: registerValidate,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    if (!recaptchaToken) {
      alert("Please click reCAPTCHA checkbox!");
      return;
    }
    // Check if there are any validation errors
  const errors = registerValidate(values);

  if (Object.keys(errors).length > 0) {
    // If there are validation errors, do not submit the form
    return;
  }
    try {
      // Send data to your API for registration
      const valuesToSend = {
        ...values,

  section: selectedSection,
  branch: selectedBranch,
  year: selectedYear,
  gender: selectedGender,
  residence: selectedResidence,
  domain:selectedDomain,
  // captcha : reCaptchaValue,
  recaptchaToken,
        recaptchaVersion: "V2_CHECKBOX",
      };
  
      const response = await axios.post("https://v2-ccc1.onrender.com/api/students/register", valuesToSend);

      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful");
        toast.success("Registration successful");
        formik.resetForm();
        setSelectedSection('');
        setSelectedBranch('');
        setSelectedYear('');
        setSelectedGender('');
        setSelectedResidence('');
        setSelectedDomain('');
      } else {
        console.error("Registration failed with status:", response.status);
        console.error("Response data:", response.data); // Log the response data
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed");
      console.error("API request failed:", error);
    }
  }
  const handleReCAPTCHA = (value) => {
    formik.setFieldValue('captcha', value); // Update the formik field value
    setReCaptchaValue(value);
    setIsRecaptchaVerified(true); // Set reCAPTCHA verification status
    console.log('reCAPTCHA verified:', isRecaptchaVerified); // Debugging
  };
  const handleRecaptchaChange = React.useCallback((value) => {
    // console.log("FormWithCheckbox::handleRecaptchaChange > value: ", value);
    setRecaptchaToken(value);
    setReCaptchaValue(value);
    setIsRecaptchaVerified(true); // Set reCAPTCHA verification status
    // console.log('reCAPTCHA verified:', isRecaptchaVerified); // Debugging
  }, []);
  function handleSignOut() {
    signOut();
  }
  // v3
  // const handleReCaptchaVerify = useCallback(async () => {
  //   if (!executeRecaptcha) {
  //     console.log('Execute recaptcha not yet available');
  //     return;
  //   }

  //   const token = await executeRecaptcha('yourAction');
  //   // Do whatever you want with the token
  // }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  // useEffect(() => {
  //   handleReCaptchaVerify();
  // }, [handleReCaptchaVerify]);

  // function onChange(value) {
  //   console.log("Captcha value:", value);
  // }

  return (
    <>
          
          {/* <GoogleReCaptchaProvider reCaptchaKey="[Your recaptcha key]"> */}
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
      {/* Header  */}
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        {/* <GoogleReCaptchaProvider reCaptchaKey="[Your recaptcha key]"> */}
        <section className="hello  p-2 md:mx-auto flex flex-col gap-4 bg-cover">
          <div className="title">
            <h1 className="text-sky-800 text-4xl font-semibold py-4  ">REGISTER</h1>
          </div>
          {/* form */}
          <form className="flex flex-col gap-5 md:w-[98%] w-[95%] " onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.name && formik.touched.name ? 'border-rose-600' : ''
              }`}
            >
              <input
                type="text"
                name="name"
                placeholder={session?.user?.name || ''}
                className={styles.input_text}
                {...formik.getFieldProps('name')}
                required
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
              // disabled
                type="email"
                name="email"
                placeholder={session?.user?.email || ''}
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className="icon flex items-center px-4 ">
                <HiAtSymbol size={24} />
              </span>
              {formik.touched.email && formik.errors.email ? (
      <div className="text-red-500 flex justify-center items-center">{formik.errors.email}</div>
    ) : null}
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
                inputMode="numeric"
                required
              />
              <span className="icon flex items-center px-4 ">
                <BsFillPersonCheckFill size={24} />
              </span>
              {formik.touched.studentNumber && formik.errors.studentNumber ? (
      <div className="text-red-500 flex justify-center items-center">{formik.errors.studentNumber}</div>
    ) : null}
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.phone && formik.touched.phone ? 'border-rose-600' : ''
              }`}
            >
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                className={styles.input_text}
                {...formik.getFieldProps('phone')}
                required
              />
              <span className="icon flex items-center px-4 ">
                <FaMobileAlt size={24} />
              </span>
              {formik.touched.phone && formik.errors.phone ? (
      <div className="text-red-500 flex justify-center items-center">{formik.errors.phone}</div>
    ) : null}
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
                required
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
                required
              />
              <span className="icon flex items-center px-4 ">
                <FaLaptop size={24} />
              </span>
            </div>

            {/* Drop Down */}
            <div className={styles.dropdownContainer}>
              
              <CommonDropdown
              name = "year"
                options={yearOptions}
                selectedKeys={selectedYear}
                setSelectedKeys={setSelectedYear}
                initialState="Year"
              />
              <CommonDropdown
              name = "branch"
                options={branchOptions}
                selectedKeys={selectedBranch}
                setSelectedKeys={setSelectedBranch}
                initialState="Branch"
                
              />
              <CommonDropdown
              name = "section"
                options={section}
                selectedKeys={selectedSection}
                setSelectedKeys={setSelectedSection}
                initialState="Section"
                
              />
              
              </div>
               <div className={styles.dropdownContainer}>
               <CommonDropdown
              name = "gender"
                options={genderOptions}
                selectedKeys={selectedGender}
                setSelectedKeys={setSelectedGender}
                initialState="Gender"
              />
              <CommonDropdown
              name = "residence"
                options={residenceOptions}
                selectedKeys={selectedResidence}
                setSelectedKeys={setSelectedResidence}
                initialState="Residence"
              />
              <CommonDropdown
              name = "domain"
                options={domainOption}
                selectedKeys={selectedDomain}
                setSelectedKeys={setSelectedDomain}
                initialState="Domain"
              />
              
              {/* Other dropdowns here */}
            </div>
            <div className='flex justify-center items-center'>
            <ReCAPTCHA important sitekey ="6Le_np0mAAAAALMOBxjRyHfzDwsn3QLDIKZz7bMg" onChange={handleRecaptchaChange} ref={captchaRef} required  />
            </div>
            

            {/* login button */}
            <div className="input-button text-black">
  <button
    type="submit"
    className={`${styles.button} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={!isRecaptchaVerified || isLoading}
  >
    {isLoading ? (
      <span className="flex items-center">
        <FaSpinner className="animate-spin mr-2" />
        Registering...
      </span>
    ) : (
      'Register'
    )}
  </button>
</div>
          </form>
        </section>
        {/* </GoogleReCaptchaProvider> */}
      </Layout>
      <ToastContainer /> {/* Include ToastContainer here */}
      
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
