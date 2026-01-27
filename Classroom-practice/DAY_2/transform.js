const transformOutputfilePath = path.join(__dirname, "transformoutput.txt");
const readStream = fs.CreateReadStream(inputFilePath);
const { Transform } = require('stream');
const writeStream = fs.createWriteStream(transformOutputFilePath);
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const transformedData = chunk.toString().toUpperCase();
        callback(null, transformedData);
    }
});
readStream.pipe(upperCaseTransform).pipe(writeStream);