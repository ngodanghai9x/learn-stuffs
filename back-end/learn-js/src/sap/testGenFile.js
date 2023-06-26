const { generate } = require('@sap-cloud-sdk/generator');

// Create your options, adapt the input & output directory as well as the package name according to your setup.
const inputDir = 'seed/';
const outputDir = 'generated/';

// Create your project datastructure with all sourcefiles based on your options
const generatorConfig = {
  forceOverwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  clearOutputDir: true,
  generateNpmrc: false,
  generateTypedocJson: false,
  generatePackageJson: false,
  generateCSN: false,
  sdkAfterVersionScript: false,
  s4hanaCloud: false
  /* optional:
    serviceMapping: 'test/directory',
    changelogFile: 'test/directory',
    include: 'glob of files to include'
  */
};

// generate your project, you can also redefine options
generate({
  ...generatorConfig,
  inputDir,
  outputDir
});

// npx generate-odata-client -i generated/activity.edmx -o generated
// npx generate-odata-client -i activity.edmx -o generated/modules
// npx generate-odata-client -i seed/activity.edmx -o generated/modules/
// npx generate-odata-client -i seed -o generated --forceOverwrite --generateJs false