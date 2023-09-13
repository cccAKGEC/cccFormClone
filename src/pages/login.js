import Head from "next/head"
import Layout from "../../layout/layout"
import Link from "next/link"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { HiAtSymbol,HiFingerPrint } from "react-icons/hi";
import { useState } from "react"
import {signIn,signOut } from "next-auth/react"
import { useFormik  } from "formik"
import login_validate from "../../lib/validate"


const login = () => {
  const[show,setShow] = useState(false);
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validate : login_validate,
    onSubmit
  })
  // console.log(formik.errors)
  async function onSubmit(values){
    console.log(values)
  }
  //Google Handle function
  async function handleGoogleSign(){
    signIn('google',{callbackUrl : "http://localhost:3000/"})

  }
  //Github Handle function
  async function handleGithubSign(){
    signIn('github',{callbackUrl : "http://localhost:3000/"})

  }
  return (
    <Layout>
    
    <Head>
        <title>Login</title>
    </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10 bg-cover">
      <div className="title">
      <h1 className="text-white text-4xl font-bold py-4 ">SIGN IN</h1>
      {/* <p className="w-3/4 mx-auto text-gray-400  ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p> */}

      </div>
      {/* form */}
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      {/* login button */}
      
        <div className="input-button text-black">  
        <button onClick={handleGoogleSign} type="button" className={styles.button_custom}>
        <Image src={'./assets/google.svg'} width={20} height={20} alt="google"></Image>  Google
        </button>
        </div>
        

    {/* bottom */}
    {/* <p className="text-center text-gray-400">
      don't have an account yet? <Link href={'/register'} className="text-blue-700">Sign Up</Link>

    </p> */}

      </form>
      
      
      </section>

    </Layout>
    
  )
}

export default login
