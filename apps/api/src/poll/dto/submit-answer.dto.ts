import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class SubmitAnswerDto {
    @ApiProperty({
        description: "Session token returned by GET /poll/start",
        example: "abc123",
    })
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({
        description: "Current flow node id (e.g. intro_wounds, q1, s2)",
        example: "q1",
    })
    @IsString()
    @IsNotEmpty()
    questionId: string;

    @ApiProperty({
        description: "yes | no for questions; ack for intros / instructions / outcomes",
        enum: ["yes", "no", "ack"],
        example: "yes",
    })
    @IsString()
    @IsIn(["yes", "no", "ack"])
    answer: "yes" | "no" | "ack";
}
