-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "website" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,

    CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_to_companies" (
    "employeeToCompanyId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "PK_56114d65eb93ed7e00fc5ccac90" PRIMARY KEY ("employeeToCompanyId")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" SERIAL NOT NULL,
    "more_detail" VARCHAR,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "role_id" INTEGER NOT NULL,
    "email" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "birthday" DATE,
    "bank_number" VARCHAR,
    "anti_phishing_code" VARCHAR,
    "user_status" VARCHAR NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "decimal" DECIMAL,
    "money" MONEY,

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "REL_ef1a1915f99bcf7a87049f7449" ON "user_details"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_fe0bb3f6520ee0469504521e710" ON "users"("username");

-- AddForeignKey
ALTER TABLE "employee_to_companies" ADD CONSTRAINT "FK_9347f53698172b971f903ebcc04" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_to_companies" ADD CONSTRAINT "FK_e755744bf6c814ad7686aed2394" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
