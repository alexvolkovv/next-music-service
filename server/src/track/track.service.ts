import { Body, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(@Body() dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioFile = this.fileService.createFile(FileType.AUDIO, audio);
    const pictureFile = this.fileService.createFile(FileType.IMAGE, picture);

    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: pictureFile,
      audio: audioFile,
    });

    track.save();

    return track;
  }

  async getAll(count: number = 100, offset: number = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(+offset)
      .limit(+count);

    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');

    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);

    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });

    track.comments.push(comment._id);
    await track.save();

    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);

    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return tracks;
  }
}
