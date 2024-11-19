// RECEIVED         CONSTANT UTL_STATUS.sts_code%TYPE := 'R';
// VERSION1            CONSTANT VARCHAR2(100) := '$abc$';
// VERSION2           CONSTANT VARCHAR2(60) := 'xyz/$';
// ERR_INVALID_FILE   CONSTANT UTL_ERROR_MESSAGES.erm_number%TYPE := -20504;
// HAIND_F31_DETAILS   CONSTANT VARCHAR2(13):= 'HAIND_F31_____';
// HIND_RY21_DETAILS  CONSTANT VARCHAR2(14):= 'HIND_RY21_____';
// const output = [
//     {constant_name: 'RECEIVED', constant_type: 'UTL_STATUS.sts_code%TYPE', constant_val: 'R'},
//     {constant_name: 'VERSION1', constant_type: 'VARCHAR2(100)', constant_val: '$abc$'},
//     {constant_name: 'VERSION2', constant_type: 'VARCHAR2(60)', constant_val: 'xyz/$'},
//     {constant_name: 'ERR_INVALID_FILE', constant_type: 'UTL_ERROR_MESSAGES.erm_number%TYPE', constant_val: '-20504'},
//     {constant_name: 'HAIND_F31_DETAILS', constant_type: 'VARCHAR2(13)', constant_val: 'HAIND_F31_____'},
//     {constant_name: 'ERR_INVALID_FILE', constant_type: 'VARCHAR2(14)', constant_val: 'HIND_RY21_____'},
// ]
const pkgName = "utl_src_pkg";
const input = `
IN_DIR             CONSTANT VARCHAR2(4) := '/in/';
WRK_DIR            CONSTANT VARCHAR2(5) := 'abc';
`;
function parseConstants(input) {
  const lines = input.trim().split("\n");
  const constants = lines.map(line => {
      // Updated regex to handle cases with and without spaces around `:=`
      const match = line.match(/(\w+)\s+CONSTANT\s+([\w%.()]+)\s*:?=\s*['"]?(.+?)['"]?\s*;/);
      if (match) {
          return {
              constant_name: match[1],    // The constant name
              constant_type: match[2],   // The constant type
              constant_val: match[3]     // The constant value
          };
      }
  }).filter(Boolean); // Remove undefined entries

  return constants;
}

const transformed = parseConstants(input);
console.log("🚀 ~ transformed:", transformed);

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
  return Number.isNaN(+str) ? str : +str
};

const output2 = transformed
  .map((item) => {
    return `
CREATE OR REPLACE FUNCTION ${pkgName}.${item.constant_name}()
  RETURNS ${typed(item.constant_type)} AS
  $$
  BEGIN
  RETURN  '${item.constant_val}';
  END;
  $$ LANGUAGE plpgsql;`;
  })
  .join();
console.log("🚀 ~ output ~ output:", output2);
