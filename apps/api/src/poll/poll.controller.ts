import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    UseGuards,
    Req,
} from "@nestjs/common";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { PollService } from "./poll.service";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";

@ApiTags("poll")
@Controller("poll")
export class PollController {
    constructor(private readonly pollService: PollService) {}

    /**
     * Start a new poll session.
     * Requires Auth. Returns an opaque session token plus the first question.
     */
    @Get("start")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Start a new poll session",
        description:
            "Creates a session and returns a session token + the first question. " +
            "Store the token client-side and send it with every subsequent answer.",
    })
    @ApiResponse({
        status: 200,
        description: "Session created — first question returned.",
    })
    startPoll(@Req() req) {
        return this.pollService.startPoll(req.user.userId);
    }

    /**
     * Resume an existing poll session.
     * Requires Auth. Returns the current question for the user's active session.
     */
    @Get("resume")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Resume an existing poll session",
        description:
            "Returns the current question for the user's active session.",
    })
    @ApiResponse({
        status: 200,
        description: "Current question returned.",
    })
    resumePoll(@Req() req) {
        return this.pollService.resumePoll(req.user.userId);
    }

    /**
     * Submit an answer and advance the session.
     * The backend validates that the submitted questionId matches the
     * current expected step, preventing clients from jumping ahead.
     *
     * Returns the next question payload, or a completion signal when done.
     */
    @Post("answer")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Submit an answer and get the next question",
        description:
            "Send the session token, the current questionId, and the answer. " +
            "Answers must be submitted in order. Returns the next question " +
            "or a completion object when all questions have been answered.",
    })
    @ApiResponse({
        status: 200,
        description: "Next question or completion signal.",
    })
    @ApiResponse({
        status: 400,
        description: "Invalid step or bad answer format.",
    })
    @ApiResponse({ status: 404, description: "Session token not found." })
    submitAnswer(@Body() dto: SubmitAnswerDto, @Req() req) {
        return this.pollService.submitAnswer(dto, req.user.userId);
    }

    @Post("back")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Undo one step and reopen that node",
        description:
            "Removes the latest answer only. Call repeatedly to walk back 7→6→…→1→start. Does not end the session.",
    })
    undoBack(@Req() req) {
        return this.pollService.undoLastDecision(req.user.userId);
    }

    @Get("status")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({ summary: "Active algorithm session status for CTA labels" })
    getStatus(@Req() req) {
        return this.pollService.getStatus(req.user.userId);
    }

    /**
     * Retrieve the full result set for a completed (or in-progress) session.
     * Protected by JWT — only authenticated users (admins) can preview answers.
     */
    @Get("results/:sessionId")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Preview all answers for a poll session (admin)",
        description:
            "Returns the session metadata and every submitted answer enriched " +
            "with the original question title and type. Requires a JWT.",
    })
    @ApiParam({
        name: "sessionId",
        description: "UUID of the poll session",
        example: "550e8400-e29b-41d4-a716-446655440000",
    })
    @ApiResponse({ status: 200, description: "Session results." })
    @ApiResponse({ status: 404, description: "Session not found." })
    getResults(@Param("sessionId") sessionId: string) {
        return this.pollService.getResults(sessionId);
    }
}
