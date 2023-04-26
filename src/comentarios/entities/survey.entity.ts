import mongoose, { HydratedDocument, now } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SentimentAnalysis } from "../../language-services/dtos/sentiment-analysis.dto";

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {


    nickname: string;

    @Prop()
    category: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({required:true})
    surveyMessage: string;

    @Prop()
    translatedSurveyMessage: string;
    @Prop()
    rate: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SentimentAnalysis' })
    surveySentiment: SentimentAnalysis

}

export const SurveySchema = SchemaFactory.createForClass(Survey);