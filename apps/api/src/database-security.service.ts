import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";

/**
 * Ensures Supabase Security Advisor stays green: RLS on public app tables.
 * Nest connects as postgres (bypasses RLS); anon/authenticated cannot.
 */
@Injectable()
export class DatabaseSecurityService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseSecurityService.name);

    constructor(private readonly dataSource: DataSource) {}

    async onModuleInit() {
        try {
            await this.dataSource.query(`
                ALTER TABLE IF EXISTS public.poll_session ENABLE ROW LEVEL SECURITY;
                ALTER TABLE IF EXISTS public.poll_answer ENABLE ROW LEVEL SECURITY;
                ALTER TABLE IF EXISTS public."user" ENABLE ROW LEVEL SECURITY;
                REVOKE ALL ON TABLE public.poll_session FROM anon, authenticated;
                REVOKE ALL ON TABLE public.poll_answer FROM anon, authenticated;
                REVOKE ALL ON TABLE public."user" FROM anon, authenticated;
            `);
            this.logger.log("RLS enabled on poll_session, poll_answer, user");
        } catch (err) {
            // Local Docker may lack anon/authenticated roles — still try ENABLE RLS alone.
            this.logger.warn(
                `Full RLS harden skipped (${(err as Error).message}); trying ENABLE only`
            );
            try {
                await this.dataSource.query(`
                    ALTER TABLE IF EXISTS public.poll_session ENABLE ROW LEVEL SECURITY;
                    ALTER TABLE IF EXISTS public.poll_answer ENABLE ROW LEVEL SECURITY;
                    ALTER TABLE IF EXISTS public."user" ENABLE ROW LEVEL SECURITY;
                `);
                this.logger.log("RLS enabled (without revoke)");
            } catch (err2) {
                this.logger.warn(`RLS enable failed: ${(err2 as Error).message}`);
            }
        }
    }
}
