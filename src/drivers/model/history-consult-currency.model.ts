import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Ecurrency } from '../../commons/enum/currency.enum';
import { IhistoryConsultCurrency } from '../../core/entity/history-consult-currency.entity';

export type HistoryConsultCurrencyDocument = HistoryConsultCurrency & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: { virtuals: true },
  collection: 'history_consult_currency',
  timestamps: true,
})
export class HistoryConsultCurrency implements IhistoryConsultCurrency {
  @Prop({ type: String, index: true })
  userId: string;

  @Prop({ type: String })
  from: Ecurrency;

  @Prop({
    type: String,
  })
  to: Ecurrency;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  rate: number;
}

export const HistoryConsultCurrencySchema = SchemaFactory.createForClass(
  HistoryConsultCurrency,
);

HistoryConsultCurrencySchema.virtual('result').get(function (
  this: HistoryConsultCurrencyDocument,
) {
  return this.amount * this.rate;
});
