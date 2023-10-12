import { useState } from "react";
import Authpage from "./pages/Authpage";
import Chat from "./pages/Chat";

import { signOut } from "firebase/auth";
import { auth } from "./Firebase/config";

function App() {
  // kullanıcı yetkili mi state'ini tutuyoruz
  // state'in ilk değeri local'deki token'a göre belirlernir
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  // kulanıcnın girdiği odanın state'i
  const [room, setRoom] = useState(null);

  // form gönderildiğini odayı belirler
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  // yetkisi yoksa > giriş
  if (!isAuth) {
    return <Authpage setIsAuth={setIsAuth} />;
  }

  // yetkisi varsa
  return (
    <div className="h-screen bg-gray-400 grid place-items-center">
      {room ? (
        // odayı belirlediyse > sohbet
        <Chat room={room} setRoom={setRoom} />
      ) : (
        // odayı belirlemediyse > oda seçme
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-5 p-7 rounded text-center"
        >
          <h1 className="text-xl ">Chat Odası</h1>
          <p>Hangi Odaya Gireceksiniz</p>

          <input
            className="shadow-xl mt-4 p-3 outline-none rounded "
            type="text"
            placeholder="örn:haftaiçi"
          />

          <button className="bg-red-500 text-white py-2 rounded" type="submit">
            Odaya Gir
          </button>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // lokal'den token'ı kaldırma
                  localStorage.removeItem("token");
                  // yetkili state'ini false'a çek
                  setIsAuth(false);
                })
                .catch((err) => console.log(err));
            }}
            className="bg-green-500 text-white py-2 rounded"
            id="logout"
            type="button"
          >
            Çıkış Yap
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
