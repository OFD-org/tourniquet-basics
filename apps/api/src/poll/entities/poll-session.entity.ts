import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { PollAnswer } from "./poll-answer.entity";

@Entity("poll_session")
export class PollSession {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /** Short opaque token sent to the client to identify the session. */
    @Column({ unique: true })
    token: string;

    /** Optional relation to User account. */
    @Column({ nullable: true })
    userId: number;

    /**
     * Legacy linear index — number of answers saved.
     * Navigation uses currentNodeId.
     */
    @Column({ default: 0 })
    currentStep: number;

    /** Decision-tree node id from poll-flow.definition.ts */
    @Column({ default: "intro_wounds" })
    currentNodeId: string;

    @Column({ default: false })
    completed: boolean;

    @CreateDateColumn()
    startedAt: Date;

    @Column({ type: "timestamp", nullable: true })
    completedAt: Date | null;

    @OneToMany(() => PollAnswer, (answer) => answer.session, { cascade: true })
    answers: PollAnswer[];
}
