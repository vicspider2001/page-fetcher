const fs = require('fs');
const request = require('request');

const [url, filePath] = process.argv.slice(2);

if (!url || !filePath) {
  console.log('Please provide both a URL and a local file path.');
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error('Error downloading the resource:', error.message);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to download the resource. Status code: ${response.statusCode}`);
    process.exit(1);
  }

  fs.writeFile(filePath, body, 'utf8', (wError) => {
    if (wError) {
      console.error('Error writing to the file:', wError.message);
      process.exit(1);
    }

    const fileSize = Buffer.from(body).length;
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});
