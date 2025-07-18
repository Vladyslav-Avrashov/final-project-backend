import { model, Schema } from 'mongoose';
import { emailRegExp } from '../../constants/index.js';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegExp, unique: true, required: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', saveErrorHandler);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', saveErrorHandler);

export const UsersCollection = model('user', userSchema);
