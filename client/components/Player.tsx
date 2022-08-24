import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import styles from "../styles/Player.module.scss";
import { Grid } from "@mui/material";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { api } from "../utils/api";

let audio: any;

const Player: React.FC = () => {
  const { active, pause, volume, currentTime, duration } = useTypedSelector(
    (state) => state.player
  );
  const {
    playTrack,
    pauseTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActive,
  } = useActions();

  const play = () => {
    if (pause) {
      playTrack();
    } else {
      pauseTrack();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +e.target?.value / 100;
    setVolume(+e.target?.value);
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target?.value;
    setCurrentTime(+e.target?.value);
  };

  const setAudio = () => {
    if (active) {
      audio.src = api + "/" + active.audio;
      audio.volume = volume / 100;
      audio.loop = true;

      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };

      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };

      audio.onended = () => {
        if (!pause) {
          setCurrentTime(duration);
        }
      };
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      if (api + "/" + active?.audio !== audio.src) {
        setAudio();
        playTrack();
      }
    }
  }, [active]);

  useEffect(() => {
    if (pause) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [pause]);

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          play();
        }}
      >
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid style={{ margin: "0 15px" }}>
        <div>{active?.name}</div>
        <div>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />

      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
