import { model, Schema } from 'mongoose';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.post('save', saveErrorHandler);

sessionSchema.pre('findOneAndUpdate', setUpdateSettings);

sessionSchema.post('findOneAndUpdate', saveErrorHandler);

export const SessionCollection = model('session', sessionSchema);
