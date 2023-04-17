import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
    @Prop()
    name: string;

    @Prop({required:true})
    email: string;

}

export const SurveySchema = SchemaFactory.createForClass(Survey);