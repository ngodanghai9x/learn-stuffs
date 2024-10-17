-- psql (PostgreSQL) 15.1
DROP TABLE IF EXISTS "aahaiTest";
CREATE TABLE "aahaiTest" (
	"id" INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"name" VARCHAR NULL DEFAULT NULL,
	"json" JSON NULL DEFAULT NULL,
	"jsonb" JSONB NULL DEFAULT NULL,
	"int" INTEGER NULL DEFAULT NULL,
	"boolean" BOOLEAN NULL DEFAULT NULL,
	"arrayInt" INTEGER[] NULL DEFAULT NULL,
	"arrayStr" VARCHAR[] NULL DEFAULT NULL
);

INSERT INTO "public"."aahaiTest" ("name", "json") VALUES ('abc1', '{
    "email": "sam1.trulet@gmail.com",
    "password": "123456aA@",
    "arr": [
        {
            "name": "abc",
            "age": 123,
            "isMale": false
        }
    ]
}');
-- SELECT "id", "name", "json", "jsonb", "int", "boolean", "bitVar" FROM "public"."aahaiTest" WHERE  "id"=nextval('"haiTest_id_seq"'::REGCLASS);

INSERT INTO "public"."aahaiTest" ("name", "jsonb") VALUES ('abc3', '{
    "email": "sam1.trulet@gmail.com",
    "password": "123456aA@",
    "arr": [
        {
            "name": "abc",
            "age": 123,
            "isMale": false
        }
    ]
}');
-- SELECT "id", "name", "json", "jsonb", "int", "boolean", "bitVar" FROM "public"."aahaiTest" WHERE  "id"=nextval('"haiTest_id_seq"'::regclass);

INSERT INTO "public"."aahaiTest" ("arrayInt", "arrayStr") VALUES (ARRAY [1, 2, 3], ARRAY ['abc','def']);

-- INSERT INTO "public"."aahaiTest" ("arrayStr", "arrayInt") VALUES ('{123, 456}', '{"abc123", "def456"}');

INSERT INTO "public"."aahaiTest" ("arrayInt", "arrayStr") VALUES ('{123, 456}', '{"abc123", "def456"}');

UPDATE "public"."aahaiTest"  SET "arrayInt"[2] = 10 WHERE "arrayInt" IS NOT NULL ;

INSERT INTO "public"."aahaiTest" ("arrayInt", "arrayStr") VALUES ('{123, 456}', '{abc123, def456}');

