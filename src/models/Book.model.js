import { Schema, model, Types } from "mongoose";

const bookSchema = new Schema(
  {
    bookTitle: { type: String, required: true },
    bookContent: { type: String, required: true },
    frontCoverImage: { type: String, required: true },
    backCoverImage: { type: String, required: true },
    textAlign: { type: String, default: 'left' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }
);

const booksModel = model("Books", bookSchema);

export default booksModel;

