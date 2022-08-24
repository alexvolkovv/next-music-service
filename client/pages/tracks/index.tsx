import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Card, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { TrackActionTypes, TrackType } from "../../models/TrackType";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store/store";
import { fetchTracks, searchTracks } from "../../store/actions/track";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const { active } = useTypedSelector((state) => state.player);
  const [query, setQuery] = useState<string>("");
  const [timer, setTimer] = useState<any>(null);

  async function search(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        // @ts-ignore
        dispatch(searchTracks(e.target.value));
      }, 500)
    );
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTracks());
  }, []);

  if (error) {
    return (
      <MainLayout title={"Ошибка"}>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={active ? `${active.artist} - ${active.name}` : "Треки"}>
      <Grid container justifyContent={"center"}>
        <Card style={{ width: "900px" }}>
          <Box p={2}>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <h1>Список треков</h1>
              <Button
                onClick={() => {
                  router.push("/tracks/create");
                }}
              >
                Загрузить
              </Button>
            </Grid>
            <TextField fullWidth={true} value={query} onChange={search} />
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     const dispatch = store.dispatch as NextThunkDispatch;
//     await dispatch(await fetchTracks());
//   }
// );
