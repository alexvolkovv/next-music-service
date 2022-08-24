import axios from "axios";
import { api } from "../utils/api";
import { TrackType } from "../models/TrackType";
import { CommentType } from "../models/CommentType";

export type CreateTrackRequest = {
  name: string;
  artist: string;
};

export type CreateCommentRequest = {
  username: string;
  text: string;
  trackId: string;
};

export class TrackService {
  static async getTracks(): Promise<TrackType[]> {
    const response = await axios.get<TrackType[]>(api + "/tracks");

    return response.data;
  }

  static async searchTracks(query: string): Promise<TrackType[]> {
    const response = await axios.get<TrackType[]>(
      api + "/tracks/search?query=" + query
    );

    return response.data;
  }

  static async deleteTrack(id: string): Promise<string> {
    const response = await axios.delete<string>(api + "/tracks/" + id);

    return response.data;
  }

  static async createTrack(data: FormData) {
    const response = await axios.post(api + "/tracks", data);

    return response;
  }

  static async addComment(data: CreateCommentRequest): Promise<CommentType> {
    const response = await axios.post<CommentType>(
      api + "/tracks/comment",
      data
    );

    return response.data;
  }

  static async addListen(id: string) {
    await axios.post(api + "/tracks/listen/" + id);
  }
}
