import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { TrackType } from "../../models/TrackType";
import { GetServerSideProps } from "next";
import axios from "axios";
import { api } from "../../utils/api";
import { useInput } from "../../hooks/useInput";
import { TrackService } from "../../api/TrackService";

type TrackPageProps = {
  serverTrack: TrackType;
};

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
  const [track, setTrack] = useState<TrackType>(serverTrack);
  const name = useInput("");
  const text = useInput("");

  const addComment = async () => {
    const data = await TrackService.addComment({
      trackId: track._id,
      username: name.value,
      text: text.value,
    });

    setTrack({ ...track, comments: [...track.comments, data] });
  };

  const router = useRouter();

  return (
    <MainLayout title={track.artist + " - " + track.name}>
      <Button
        variant={"outlined"}
        onClick={() => {
          router.push("/tracks");
        }}
        style={{ marginBottom: "10px" }}
      >
        К списку
      </Button>
      <Grid container>
        <img
          src={"http://localhost:8080/" + track.picture}
          alt="Song picture"
          width={200}
          height={200}
        />
        <div style={{ marginLeft: "25px" }}>
          <h1>Название - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      {track.text && (
        <>
          <h1>Текст</h1>
          <p>{track.text}</p>
        </>
      )}
      <Grid container>
        <TextField
          value={name.value}
          onChange={(e) => name.onChange(e)}
          label={"Имя..."}
          fullWidth
        />
        <TextField
          value={text.value}
          onChange={(e) => text.onChange(e)}
          label={"Текст..."}
          style={{ margin: "10px 0" }}
          fullWidth
          multiline
          rows={4}
        />
        <Button variant={"outlined"} onClick={addComment}>
          Отправить
        </Button>
      </Grid>
      <Grid>
        <h2>Комментарии</h2>
        {track.comments.length > 0 ? (
          track.comments.map((comment) => (
            <div
              style={{
                margin: 10,
                border: "1px solid black",
                borderRadius: 4,
                padding: 10,
              }}
            >
              <div>Автор: {comment.username}</div>
              <div>Комментарий: {comment.text}</div>
            </div>
          ))
        ) : (
          <p>Этот трек еще никто не комментировал</p>
        )}
      </Grid>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(api + "/tracks/" + params?.id);

  return {
    props: {
      serverTrack: response.data,
    },
  };
};
