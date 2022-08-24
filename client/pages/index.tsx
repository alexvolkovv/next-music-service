import React from "react";
import styles from "../styles/index.module.scss";
import Navbar from "../components/Navbar/Navbar";
import MainLayout from "../layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <div className={styles.center}>
        <Navbar />
        <h1>Добро пожаловать</h1>
        <h3>Здесь собраны самые лучшие треки</h3>
      </div>
    </MainLayout>
  );
};

export default Index;
