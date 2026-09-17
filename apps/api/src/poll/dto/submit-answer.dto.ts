import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateIf,
    ArrayMinSize,
} from "class-validator";

export class SubmitAnswerDto {
    @ApiProperty({
        description: "Session token returned by GET /poll/start",
        example: "abc123",
    })
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({
        description: "ID of the question being answered (e.g. q1, q2…)",
        example: "q1",
    })
    @IsString()
    @IsNotEmpty()
    questionId: string;

    /**
     * For single/text questions: a plain string.
     * For multiple-choice: an array of selected option values.
     */
    @ApiProperty({
        description:
            "Answer value — string (single/text) or string[] (multiple)",
        oneOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } },
        ],
        example: "first_responder",
    })
    @ValidateIf((o) => !Array.isArray(o.answer))
    @IsString()
    @ValidateIf((o) => Array.isArray(o.answer))
    @IsArray()
    @ArrayMinSize(1)
    answer: string | string[];
}
