import React, { FC } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

type MainLayoutProps = {
  title?: string;
  description?: string;
  children: any;
};

const MainLayout: FC<MainLayoutProps> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title || "Cringify"}</title>
        <meta
          name={"description"}
          content={
            "Музыкальная площака Cringify. Делись кринжом со всем миром." +
            description
          }
        />
        <meta name={"robots"} content={"index, follow"} />
        <meta
          name={"keywords"}
          content={"музыка, треки, cringify, яндекс музыка"}
        />
        <meta
          name={"viewport"}
          content={"width=device-width, initial-scale=1"}
        />
      </Head>
      <Navbar />
      <div style={{ margin: "90px auto", width: "1000px" }}>{children}</div>
      <Player />
    </>
  );
};

export default MainLayout;
