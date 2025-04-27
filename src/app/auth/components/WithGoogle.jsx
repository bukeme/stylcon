// import api from "@/api";
import GoogleIcon from "@/components/Icons/Google";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
import Link from "next/link";

const WithGoogle = ({ text }) => {
  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const { access_token } = response;
  //       console.log(response);

  //       // Fetch the `id_token` and `code` if needed using Google's API
  //       // const userInfoResponse = await axios.get(
  //       //   `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/auth/login&prompt=consent&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`
  //       // );

  //       // const userInfoResponse = await axios.get(
  //       //   `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`
  //       // );

  //       // console.log(userInfoResponse);

  //       const id_token = userInfoResponse.data.id_token;
  //       const code = userInfoResponse.data.code || ""; // Replace with your logic to fetch the code

  //       // Send data to your custom backend endpoint
  //       const result = await api.post("/api/auth/google", {
  //         access_token,
  //         id_token,
  //         code,
  //       });

  //       console.log("Authentication successful:", result.data);
  //     } catch (error) {
  //       console.error("Error during Google authentication:", error);
  //     }
  //   },
  //   onError: () => {
  //     console.log("2nd");
  //     console.error("Google login failed");
  //   },
  // });

  return <></>;

  return (
    <Link
      href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/auth/google&prompt=consent&response_type=code&client_id=1067278177140-1ofl6k6cfv048fuq9mlvbge4354f6h1k.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline`}
    >
      <button
        type="button"
        className="w-full flex gap-4 items-center border border-dark justify-center py-4 rounded-lg"
        // onClick={() => {
        //   handleGoogleLogin();
        // }}
      >
        <GoogleIcon />
        <p>{text}</p>
      </button>
    </Link>
  );
};

export default WithGoogle;
