import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Iuser } from '../../core/entity/user.entity';
import { EuserType } from '../../commons/enum/user-type.enum';

export type UserDocument = User & Document;

@Schema({
  //   toJSON: {
  //     getters: true,
  //     virtuals: true,
  //   },
  //   toObject: { virtuals: true },
  collection: 'user',
  timestamps: true,
})
export class User implements Iuser {
  @Prop({ type: String, unique: true, index: true })
  userId: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true, index: true })
  email: string;

  @Prop({
    type: String,
    enum: Object.values(EuserType),
    index: true,
  })
  userType: EuserType;

  @Prop({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
