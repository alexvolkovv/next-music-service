import React, { FC } from "react";
import { TrackType } from "../models/TrackType";
import { Card, Grid, Icon } from "@mui/material";
import styles from "../styles/TrackItem.module.scss";
import IconButton from "@mui/material/IconButton";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { TrackService } from "../api/TrackService";
import { useDispatch } from "react-redux";
import { setTracks } from "../store/actions/track";

type TrackItemProps = {
  track: TrackType;
  active?: boolean;
};

const TrackItem: FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActive } = useActions();
  const { pause, active } = useTypedSelector((state) => state.player);
  const { tracks } = useTypedSelector((state) => state.track);
  // const {} = useActions()
  const dispatch = useDispatch();

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (pause) {
      if (active?._id !== track._id) {
        TrackService.addListen(track._id);
        setActive(track);
      }
      playTrack();

      return;
    }

    pauseTrack();

    if (active?._id !== track._id) {
      setActive(track);
    }
  };

  function deleteTrack(e: React.MouseEvent) {
    e.stopPropagation();

    TrackService.deleteTrack(track._id).then((id) => {
      dispatch(setTracks(tracks.filter((trackItem) => trackItem._id !== id)));
    });
  }

  return (
    <Card
      className={styles.track}
      onClick={() => {
        router.push("/tracks/" + track._id);
      }}
    >
      <IconButton onClick={play}>
        {active?._id === track._id && !pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img
        src={"http://localhost:8080/" + track.picture}
        alt="Picture"
        className={styles.image}
      />
      <Grid container direction={"column"} className={styles.information}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      <IconButton onClick={deleteTrack} className={styles.delete}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
