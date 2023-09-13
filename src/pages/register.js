import Head from "next/head";
import Layout from "../../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiOutlineUser } from "react-icons/hi";
import { PiPasswordBold } from "react-icons/pi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../../lib/validate";
import { signIn } from "next-auth/react";
import React from "react";
import CommonDropdown from "@/components/DropDown";



async function handleGoogleSign() {
  signIn('google', { callbackUrl: "http://localhost:3000/" });
}

const register = () => {
  const [show, setShow] = useState({ password: false, copassword: false });
  const [selectedKeys, setSelectedKeys] = useState([]);
  const section = ["S-1","S-2","S-3","S-4","S-5","S-6","S-7","S-8","S-9","S-11","S-12","S-13","S-14","S-15","S-16","S-17","S-18","S-19"];
  const branch = ["CSE","CS","CSE(AIML)","CSE(Data Science)","CSE(hindi)","IT","CSIT","AIML","ECE","EN","Mechanical","Civil"];
  const year = ["2nd Year"]
  // Define the options array here


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      studentNumber: "",
    },
    validate: registerValidate,
    onSubmit: onSubmit,
  });
  async function onSubmit(values) {
    // Log the inputted values
    console.log("Form Values:", values);
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10 bg-cover">
      <div className="title">
      <h1 className="text-white text-4xl font-bold py-4 ">Register</h1>
      {/* <p className="w-3/4 mx-auto text-gray-400  ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p> */}

      </div>
      {/* form */}
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-600' : '' }`}>
      <input type="text" name="Username" placeholder="Name" className={styles.input_text} {...formik.getFieldProps('username')} />
      <span className="icon flex items-center px-4 "><HiOutlineUser size={24}/></span>
      </div>
      {/* {formik.errors.username&&formik.touched.username?<span className="text-rose-500">{formik.errors.username}</span>:<></>} */}
      <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : '' }`}>
      <input type="email" name="email" placeholder="Email" className={styles.input_text} {...formik.getFieldProps('email')} />
      <span className="icon flex items-center px-4 "><HiAtSymbol size={24}/></span>
      </div>

      <div className={`${styles.input_group} ${formik.errors.studentNumber && formik.touched.studentNumber ? 'border-rose-600' : '' }`}>
  <input
    type="number"
    name="studentNumber"
    placeholder="Student Number"
    className={styles.input_text}
    {...formik.getFieldProps('studentNumber')}
  />
  <span className="icon flex items-center px-4 "><HiAtSymbol size={24}/></span>
</div>
{formik.errors.studentNumber && formik.touched.studentNumber && (
  <span className="text-rose-500">{formik.errors.studentNumber}</span>
)}  
      {/* Drop Down */}
      
    <div className={styles.dropdownContainer}>
      <CommonDropdown options={section} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Section" />
      <CommonDropdown options={branch} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Branch" />
      <CommonDropdown options={year} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} initialState="Year" />
      </div>
      
      {/* login button */}
      <div className="input-button text-black">  
        <button onClick={handleGoogleSign} type="button" className={styles.button_custom}>
        <Image src={'./assets/google.svg'} width={20} height={20} alt="google"></Image>  Google
        </button>
        </div>
      <div className="input-button text-black">
        <button type="submit" className={styles.button}>
         Register
        </button>
        </div>
        
      

    {/* bottom */}
    {/* <p className="text-center text-gray-400">
      Have an account <Link href={'/login'} className="text-blue-700">Sign In</Link>

    </p> */}

      </form>
      
      
      </section>
    </Layout>
  )
}

export default register
