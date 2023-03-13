import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
// import router
var socket;
export default function Home() {
  // const [input, setInput] = useState("");
  const [welcome, setWelcome] = useState("");
  const isSocketConnected = () => {
    return socket && socket.connected;
  };
  const socketInitializer = async () => {
    await fetch("/api/sockets");
    socket = io();

    socket.on("connect", () => {
      console.log("connected", isSocketConnected());
      console.log("connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnected", isSocketConnected());
      setWelcome("Adios!");
    });
    socket.on("welcome", (msg) => {
      console.log(msg);
      setWelcome(msg);
    });
    socket.on("new_user", (msg) => {
      console.log(msg);
        // setWelcome(msg);
    });
  };
  useEffect(() => {
    console.log("SE EJECUTA");
    socketInitializer();
  }, []);
  console.log("is Connected", socket);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{welcome}</h1>
        <button
          onClick={() => {
            console.log("test");
            // window.location.href = "/";
          }}
        >
          PRESS ME
          {isSocketConnected() ? "Connected" : "Disconnected"}
        </button>
      </main>
    </>
  );
}
