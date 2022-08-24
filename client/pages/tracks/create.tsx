import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import { Button, Grid, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import { setActive } from "../../store/actions/player";
import { TrackService } from "../../api/TrackService";
import { useRouter } from "next/router";

const Create = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(activeStep + 1);
    } else {
      const formData = new FormData();

      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", picture!);
      formData.append("audio", audio!);

      TrackService.createTrack(formData).then((resp) => {
        router.push("/tracks");
      });
    }
  };

  const back = () => {
    setActiveStep((prevState) => {
      return prevState === 0 ? prevState : prevState - 1;
    });
  };

  return (
    <MainLayout title={"Создание трека"}>
      <StepWrapper activeStep={activeStep}>
        {activeStep == 0 && (
          <Grid container p={2}>
            <TextField
              label={"Название трека"}
              style={{ margin: "10px" }}
              fullWidth
              value={name.value}
              onChange={(e) => name.onChange(e)}
            />
            <TextField
              value={artist.value}
              onChange={(e) => artist.onChange(e)}
              label={"Имя исполнителя"}
              style={{ margin: "10px" }}
              fullWidth
            />
            <TextField
              value={text.value}
              onChange={(e) => text.onChange(e)}
              label={"Текст"}
              multiline
              rows={4}
              style={{ margin: "10px" }}
              fullWidth
            />
          </Grid>
        )}

        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept={"image/*"}>
            <Button>Загрузить изображение</Button>
          </FileUpload>
        )}

        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept={"audio/*"}>
            <Button>Загрузить трек</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent={"space-between"}>
        <Button onClick={back}>Назад</Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
