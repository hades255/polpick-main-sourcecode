import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type SettingDocument = mongoose.HydratedDocument<Setting>;

@Schema({ timestamps: true, versionKey: false })
export class Setting {

    // @Prop({
    //     type: {
    //         botToDecreaseAfterOneUser: { type: Number, required: true },
    //         maxBotPerGame: { type: Number, required: true },
    //         avgBetAmountPerBot: { type: Number, required: true },
    //         minAmountOfBotPerGame: { type: Number, required: true },
    //     },
    //     required: true,
    // })


    // @Prop({
    //     type: {
    //         botToDecreaseAfterOneUser30: { type: Number, required: true },
    //         maxBotPerGame30: { type: Number, required: true },
    //         avgBetAmountPerBot30: { type: Number, required: true },
    //         minAmountOfBotPerGame30: { type: Number, required: true },
    //     },
    //     required: true,
    // })

    // botControlFifteen: {
    //     botToDecreaseAfterOneUser: number;
    //     maxBotPerGame: number;
    //     avgBetAmountPerBot: number;
    //     minAmountOfBotPerGame: number;
    // };

    // botControlThirty: {
    //     botToDecreaseAfterOneUser30: number;
    //     maxBotPerGame30: number;
    //     avgBetAmountPerBot30: number;
    //     minAmountOfBotPerGame30: number;
    // };


   
    @Prop({ type: Number, default: 0, index: true })
    botToDecreaseAfterOneUser30: number;

    @Prop({ type: Number, default: 0, index: true })
    maxBotPerGame30: number;

    @Prop({ type: Number, default: 0, index: true })
    avgBetAmountPerBot30: number;

    @Prop({ type: Number, default: 0, index: true })
    minAmountOfBotPerGame30: number;


    @Prop({ type: Number, default: 0, index: true })
    botToDecreaseAfterOneUser15: number;

    @Prop({ type: Number, default: 0, index: true })
    maxBotPerGame15: number;

    @Prop({ type: Number, default: 0, index: true })
    avgBetAmountPerBot15: number;

    @Prop({ type: Number, default: 0, index: true })
    minAmountOfBotPerGame15: number;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
SettingSchema.plugin(mongooseAggregatePaginate);
