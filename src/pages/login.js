import Head from "next/head"
import Layout2 from "../../layout/layout2"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useFormik } from "formik"
import login_validate from "../../lib/validate"
// import { useRouter } from 'next/router';

const Login = () => {
  const [show, setShow] = useState(false);
  // const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  // Google Handle function
  async function handleGoogleSign() {
    
    signIn('google', { callbackUrl: "http://localhost:3000/" });
    // router.push('/');
  }

  // Github Handle function
  async function handleGithubSign() {
    signIn('github', { callbackUrl: "http://localhost:3000/" });
  }

  return (
    <Layout2>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10 bg-cover">
        <div className="title">
          <h1 className="text-blue-800 text-4xl font-bold py-5 ">SIGN IN</h1>
          
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className="input-button text-black">
            <button onClick={handleGoogleSign} type="button" className={styles.button_custom}>
              <Image src={'./assets/google.svg'} width={20} height={20} alt="google"></Image> Google
    
            </button>
          </div>
        </form>
      </section>
    </Layout2>
  );
};

export default Login;
