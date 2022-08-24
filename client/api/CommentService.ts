import axios from "axios";
import { api } from "../utils/api";

export class CommentService {
  static async create() {
    const response = await axios.post(api + "/");
  }
}
