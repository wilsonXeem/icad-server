import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Course slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: null,
    },
    level: {
      type: String,
      trim: true,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
