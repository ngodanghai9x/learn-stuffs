const express = require("express");
const multer = require("multer");
const fs = require("node:fs/promises");

const app = express();
const port = 4567; // You can change the port as needed
app.use(express.json());
// Set up Multer for file uploads
const upload = multer({ dest: "./uploads/" }); // Uploaded files will be stored in the "uploads" folder

function getSchemaName(input) {
  const match = input.match(/CREATE\s+OR\s+REPLACE\s+PACKAGE\s+(\w+)\s+AS.*/i);
  console.log("🚀 ~ ~ input:", { input, match });
  if (match) {
    const schemaName = match[1];
    return schemaName;
  } else {
    return null;
  }
}

function parseConstants(oracleSql) {
  const lines = oracleSql.trim().split("\n");
  let schemaName = null;
  const transformed = lines
    .map((line) => {
      schemaName = schemaName || getSchemaName(line);
      // Updated regex to handle cases with and without spaces around `:=`
      const match = line.match(
        /(\w+)\s+CONSTANT\s+([\w%.()]+)\s*:?=\s*['"]?(.+?)['"]?\s*;/
      );
      if (match) {
        return {
          constant_name: match[1], // The constant name
          constant_type: match[2], // The constant type
          constant_val: match[3], // The constant value
        };
      }
    })
    .filter(Boolean); // Remove undefined entries

  return { transformed, schemaName };
}

const typed = (type) => {
  return type
    .replace(/VARCHAR2/i, "VARCHAR")
    .replace(/number/i, "NUMERIC")
    .replace(/date/i, "TIMESTAMP")
    .replace(/SYSDATE/i, "CURRENT_TIMESTAMP");
  // .replace(/date/i, "")
  // .replace(/date/i, "")
  // .replace(/date/i, "");
};

const formatNum = (str) => {
  return Number.isNaN(+str) ? `'${str}'` : +str
};


app.post("/", upload.single("oracleSql"), async (req, res) => {
  const filePath = req?.file?.path;
  try {
    let { pkgName } = req.body;

    // Validate the input
    if (!pkgName || !req.file) {
      return res.status(400).send({ error: "pkgName and a file are required" });
    }
    const oracleSql = await fs.readFile(filePath, { encoding: "utf8" });
    const { transformed, schemaName } = parseConstants(oracleSql);
    console.log(
      "🚀 ~ transformed:",
      transformed,
      schemaName,
      transformed.length
    );
    pkgName = schemaName || pkgName;

    const output = transformed.map((item) => {
      return `
CREATE OR REPLACE FUNCTION ${pkgName}.${item.constant_name}()
RETURNS ${typed(item.constant_type)} AS
$$
BEGIN
RETURN  ${formatNum(item.constant_val)};
END;
$$ LANGUAGE plpgsql;
`;
    });
    const header = {
      transformed_length: transformed.length,
      schemaName,
      pkgName,
    };
    output.unshift(
      schemaName ? `CREATE SCHEMA IF NOT EXISTS ${schemaName};\n` : "\n"
    );
    output.unshift(JSON.stringify(header) + "\n");

    res.set(header);
    res.send(output.join(""));
  } catch (error) {
    console.log("🚀 ~ app.post ~ error:", error);
  } finally {
    fs.unlink(filePath).catch(console.error);
  }
});

app.get("/", (req, res) => {
  res.send("helloworld");
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
