import mongoose from 'mongoose';

const courseModuleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required'],
    },
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    videoUrl: {
      type: String,
      trim: true,
      default: null,
    },
    position: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPreview: {
      type: Boolean,
      default: false,
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

courseModuleSchema.index({ course: 1, position: 1 });

const CourseModule = mongoose.model('CourseModule', courseModuleSchema);

export default CourseModule;
