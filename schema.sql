


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."leads" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid",
    "client_name" "text" NOT NULL,
    "client_email" "text" NOT NULL,
    "client_phone" "text",
    "project_type" "text",
    "budget" "text",
    "timeline" "text",
    "status" "text" DEFAULT 'new'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "notes" "text"
);


ALTER TABLE "public"."leads" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "lead_id" "uuid",
    "tenant_id" "uuid",
    "amount" numeric NOT NULL,
    "description" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "stripe_checkout_id" "text",
    "stripe_url" "text"
);


ALTER TABLE "public"."payments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_files" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "lead_id" "uuid",
    "tenant_id" "uuid",
    "file_name" "text" NOT NULL,
    "file_url" "text" NOT NULL,
    "file_size" bigint
);


ALTER TABLE "public"."project_files" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_updates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "lead_id" "uuid",
    "tenant_id" "uuid",
    "title" "text" NOT NULL,
    "description" "text",
    "status_type" "text" DEFAULT 'update'::"text"
);


ALTER TABLE "public"."project_updates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tenants" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "payments_enabled" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "owner_id" "uuid",
    "created_by" "uuid",
    "stripe_account_id" "text",
    "stripe_onboarding_complete" boolean DEFAULT false
);


ALTER TABLE "public"."tenants" OWNER TO "postgres";


ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_files"
    ADD CONSTRAINT "project_files_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_updates"
    ADD CONSTRAINT "project_updates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_files"
    ADD CONSTRAINT "project_files_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_files"
    ADD CONSTRAINT "project_files_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_updates"
    ADD CONSTRAINT "project_updates_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_updates"
    ADD CONSTRAINT "project_updates_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Allow public lead ingestion" ON "public"."leads" FOR INSERT WITH CHECK (true);



CREATE POLICY "Anyone can submit a lead" ON "public"."leads" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Authenticated users can insert project files" ON "public"."project_files" FOR INSERT TO "authenticated" WITH CHECK (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Authenticated users can view project files" ON "public"."project_files" FOR SELECT TO "authenticated" USING (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Contractors can insert files" ON "public"."project_files" FOR INSERT TO "authenticated" WITH CHECK (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Contractors can insert updates" ON "public"."project_updates" FOR INSERT TO "authenticated" WITH CHECK (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Contractors can view files" ON "public"."project_files" FOR SELECT TO "authenticated" USING (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Contractors can view updates" ON "public"."project_updates" FOR SELECT TO "authenticated" USING (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Leads are not viewable by the public" ON "public"."leads" FOR SELECT TO "anon" USING (false);



CREATE POLICY "Owners can manage payments" ON "public"."payments" TO "authenticated" USING (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Tenant owners can update their leads" ON "public"."leads" FOR UPDATE TO "authenticated" USING (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Tenant owners can view their leads" ON "public"."leads" FOR SELECT TO "authenticated" USING (("tenant_id" IN ( SELECT "tenants"."id"
   FROM "public"."tenants"
  WHERE ("tenants"."owner_id" = "auth"."uid"()))));



CREATE POLICY "Users can update their tenant's leads" ON "public"."leads" FOR UPDATE USING (("tenant_id" = (("auth"."jwt"() ->> 'tenant_id'::"text"))::"uuid"));



CREATE POLICY "Users can view their tenant's leads" ON "public"."leads" FOR SELECT USING (("tenant_id" = (("auth"."jwt"() ->> 'tenant_id'::"text"))::"uuid"));



ALTER TABLE "public"."leads" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_files" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_updates" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";














































































































































































GRANT ALL ON TABLE "public"."leads" TO "anon";
GRANT ALL ON TABLE "public"."leads" TO "authenticated";
GRANT ALL ON TABLE "public"."leads" TO "service_role";



GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";



GRANT ALL ON TABLE "public"."project_files" TO "anon";
GRANT ALL ON TABLE "public"."project_files" TO "authenticated";
GRANT ALL ON TABLE "public"."project_files" TO "service_role";



GRANT ALL ON TABLE "public"."project_updates" TO "anon";
GRANT ALL ON TABLE "public"."project_updates" TO "authenticated";
GRANT ALL ON TABLE "public"."project_updates" TO "service_role";



GRANT ALL ON TABLE "public"."tenants" TO "anon";
GRANT ALL ON TABLE "public"."tenants" TO "authenticated";
GRANT ALL ON TABLE "public"."tenants" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































