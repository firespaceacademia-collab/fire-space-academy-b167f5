CREATE TABLE "solicitudes" (
	"id" serial PRIMARY KEY,
	"codigo" text NOT NULL UNIQUE,
	"nombre" text NOT NULL,
	"nombre_normalizado" text NOT NULL UNIQUE,
	"edad_on" integer NOT NULL,
	"edad_off" integer NOT NULL,
	"inteligencia" text NOT NULL,
	"talentos" text NOT NULL,
	"estado" text DEFAULT 'evaluacion' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"rechazada_at" timestamp with time zone
);
