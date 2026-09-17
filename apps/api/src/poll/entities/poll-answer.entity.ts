import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { PollSession } from "./poll-session.entity";

@Entity("poll_answer")
export class PollAnswer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => PollSession, (session) => session.answers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "session_id" })
    session: PollSession;

    /** ID matching the static question definition in poll-questions.data.ts */
    @Column()
    questionId: string;

    /** Snapshot of the question order so results stay stable if data changes. */
    @Column()
    questionOrder: number;

    /**
     * The actual answer payload.
     * - single/multi choice: string | string[]
     * - free text: string
     */
    @Column({ type: "jsonb" })
    answer: string | string[];

    @CreateDateColumn()
    answeredAt: Date;
}
