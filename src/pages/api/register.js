async function onSubmit(values) {
    try {
      // Verify reCAPTCHA on the server
      const captchaResponse = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=6Lc7_CEoAAAAAMB-BkTI59MAPxwi-H2Mxa8UhRvT&response=${values.recaptchaToken}`,
        }
      );
  
      const captchaData = await captchaResponse.json();
  
      if (captchaData.success) {
        // reCAPTCHA verification successful, continue with registration
        const response = await axios.post("/api/register", values);
  
        if (response.status === 200) {
          // Show a success toast using sweetalert
          showSuccessToast("Registration successful");
  
          // Reset the form to its initial state (empty values)
          resetForm();
  
          // You can also clear the selectedKeys state if needed
          setSelectedKeys([]);
        } else {
          // Handle other responses or errors
        }
      } else {
        // reCAPTCHA verification failed
        console.error("reCAPTCHA verification failed");
      }
    } catch (error) {
      // Handle any network errors or API errors
      console.error("API request failed:", error);
    }
  }
  