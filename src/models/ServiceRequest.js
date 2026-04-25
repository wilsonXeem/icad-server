import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    organization: {
      type: String,
      trim: true,
      default: null,
    },
    projectTitle: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    serviceCategory: {
      type: String,
      required: [true, 'Service category is required'],
      trim: true,
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
      default: null,
    },
    budgetRange: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'quoted', 'in_progress', 'closed'],
      default: 'new',
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

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

export default ServiceRequest;
