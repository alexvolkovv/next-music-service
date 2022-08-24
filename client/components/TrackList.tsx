import React, { FC } from "react";
import { TrackType } from "../models/TrackType";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "./TrackItem";
import { useTypedSelector } from "../hooks/useTypedSelector";

type TrackListProps = {
  tracks: TrackType[];
};

const TrackList: FC<TrackListProps> = ({ tracks }) => {
  return (
    <Grid container direction={"column"}>
      <Box p={1}>
        {tracks.map((trackItem) => (
          <TrackItem key={trackItem._id} track={trackItem} />
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
