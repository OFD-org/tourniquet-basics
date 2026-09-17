import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PollController } from "./poll.controller";
import { PollService } from "./poll.service";
import { PollSession } from "./entities/poll-session.entity";
import { PollAnswer } from "./entities/poll-answer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PollSession, PollAnswer])],
    controllers: [PollController],
    providers: [PollService],
})
export class PollModule {}
