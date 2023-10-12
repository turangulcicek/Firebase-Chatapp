import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import Message from "../Components/message";

const Chat = ({ room, setRoom }) => {
  const messagesCol = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    await addDoc(messagesCol, {
      text,
      room,

      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uuid: auth.currentUser.uid,
      },
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    onSnapshot(queryOptions, (snapshot) => {
      let tempMessages = [];
      snapshot.docs.forEach((doc) =>
        tempMessages.push({ ...doc.data(), id: doc.id })
      );
      setMessages(tempMessages);
    });
  }, []);

  return (
    <div className=" chat flex flex-col  bg-white h-96 w-96 rounded ">
      <header className="flex justify-between items-center bg-red-700 py-4 px-2 rounded-b-none ">
        <p className="text-white uppercase">
          {" "}
          {auth?.currentUser?.displayName}
        </p>
        <h1 className="text-xl font-bold">{room}</h1>
        <button
          onClick={() => setRoom(null)}
          className="bg-blue-400 p-2 rounded-full text-white "
        >
          Farklı Oda
        </button>
      </header>
      <main className="">
        {messages?.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>
      <form
        className="flex justify-between gap-4 py-2 px-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-2/4  rounded border-2 outline-none"
          placeholder="mesajınızı yazın..."
          type="text"
          required
        />
        <button className="bg-blue-400 p-2 rounded">Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
