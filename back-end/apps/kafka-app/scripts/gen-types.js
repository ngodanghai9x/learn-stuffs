// gen-types.js
const fs = require('fs');
const path = require('path');

function mapPrimitive(avroType) {
    switch (avroType) {
        case 'string':
            return 'string';
        case 'boolean':
            return 'boolean';
        case 'int':
        case 'long':
        case 'float':
        case 'double':
            return 'number';
        case 'bytes':
            return 'Buffer';
        case 'null':
            return 'null';
        default:
            return 'any';
    }
}

function avroTypeToTS(avroType) {
    if (typeof avroType === 'string') {
        return mapPrimitive(avroType);
    }

    if (Array.isArray(avroType)) {
        return avroType.map(avroTypeToTS).join(' | ');
    }

    if (avroType.type === 'array') {
        return `${avroTypeToTS(avroType.items)}[]`;
    }

    if (avroType.type === 'map') {
        return `{ [key: string]: ${avroTypeToTS(avroType.values)} }`;
    }

    if (avroType.type === 'record') {
        return generateInterface(avroType, true);
    }

    if (avroType.type === 'enum') {
        return avroType.symbols.map((s) => `'${s}'`).join(' | ');
    }

    return 'any';
}

function generateInterface(schema, inline = false) {
    const fields = schema.fields.map((f) => {
        const tsType = avroTypeToTS(f.type);
        const optional = Array.isArray(f.type) && f.type.includes('null');
        return `  ${f.name}${optional ? '?' : ''}: ${tsType};`;
    });

    const iface = `export interface ${schema.name} {\n${fields.join('\n')}\n}`;
    return inline ? iface : iface + '\n';
}

function generateTypesForFile(avscPath, outDir) {
    const schema = JSON.parse(fs.readFileSync(avscPath, 'utf8'));

    if (schema.type !== 'record') {
        throw new Error(`${avscPath} must have top-level type=record`);
    }

    const tsDef = generateInterface(schema);
    const outPath = path.join(outDir, `${schema.name}.ts`);

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, tsDef, 'utf8');
    console.log(`✅ Generated ${outPath}`);
}

function generateTypes(inputPath, outDir) {
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
        const files = fs.readdirSync(inputPath).filter((f) => f.endsWith('.avsc'));
        files.forEach((file) => {
            generateTypesForFile(path.join(inputPath, file), outDir);
        });
    } else if (stat.isFile() && inputPath.endsWith('.avsc')) {
        generateTypesForFile(inputPath, outDir);
    } else {
        throw new Error('Input must be .avsc file or directory');
    }
}

// node ./scripts/gen-types.js ../src/schemas ../src/schemas/types
if (require.main === module) {
    const [, , input, output] = process.argv;
    if (!input || !output) {
        console.error('Usage: node scripts/gen-types.js <input(.avsc|dir)> <outputDir>');
        process.exit(1);
    }

    const inputPath = path.resolve(__dirname, input);
    console.log("🚀 ~ inputPath:", inputPath)
    const outputPath = path.resolve(__dirname, output);

    generateTypes(inputPath, outputPath);
}

module.exports = { generateTypes };
