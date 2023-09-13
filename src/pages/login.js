import Head from "next/head"
import Layout from "../../layout/layout"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useFormik } from "formik"
import login_validate from "../../lib/validate"

const Login = () => {
  const [show, setShow] = useState(false);
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
  }

  // Github Handle function
  async function handleGithubSign() {
    signIn('github', { callbackUrl: "http://localhost:3000/" });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10 bg-cover">
        <div className="title">
          <h1 className="text-white text-4xl font-bold py-4 ">SIGN IN</h1>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className="input-button text-black">
            <button onClick={handleGoogleSign} type="button" className={styles.button_custom}>
              <Image src={'./assets/google.svg'} width={20} height={20} alt="google"></Image> Google
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
