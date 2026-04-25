import mongoose from 'mongoose';

const activitySubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModule',
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Submission title is required'],
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: null,
    },
    fileUrl: {
      type: String,
      trim: true,
      default: null,
    },
    feedback: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'approved', 'needs_revision'],
      default: 'submitted',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
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

activitySubmissionSchema.index({ user: 1, submittedAt: -1 });

const ActivitySubmission = mongoose.model('ActivitySubmission', activitySubmissionSchema);

export default ActivitySubmission;
