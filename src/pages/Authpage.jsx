import React from "react";
import { auth, provider } from "../Firebase/config";
import { signInWithPopup } from "firebase/auth";

const Authpage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("token", res.user.refreshToken);
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className=" bg-[#00000048] text-white grid place-items-center h-screen  ">
      <div className="border flex flex-col gap-4 text-center p-10 bg-white text-black rounded-xl ">
        <h1 className="text-[36px] font-bold">Chat odası</h1>
        <p>Devam etmek için giriş yapın</p>
        <button
          onClick={handleClick}
          className="bg-black text-white py-2 rounded mt-4 flex items-center gap-3 justify-center"
        >
          <img src="g2.png" alt="" className="w-[20px]" />
          <span>Google ile giriş yap</span>
        </button>
      </div>
    </section>
  );
};

export default Authpage;
