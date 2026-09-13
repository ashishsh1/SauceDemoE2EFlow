const fs = require('fs');
const path = require('path');

class FileUtils {

    static getGeneratedFilePath(fileName) {

        // Define the generated artifacts directory.
        const generatedDirectory =path.join(process.cwd(), 'generated');

        // Create the directory if it does not exist.
        fs.mkdirSync(generatedDirectory, {recursive: true});

        // Return the complete file path.
        return path.join(generatedDirectory,fileName);
    }

    static async saveDownload(download, fileName) {

        // Get the destination path.
        const filePath =this.getGeneratedFilePath(fileName);

        // Save the downloaded file.
        await download.saveAs(filePath);

        // Return the saved file path.
        return filePath;
    }

    static exists(filePath) {

        // Return whether the file exists.
        return fs.existsSync(filePath);
    }

    static getFileSize(filePath) {

        // Get file information.
        const fileStats =fs.statSync(filePath);

        // Return the file size in bytes.
        return fileStats.size;
    }
}

module.exports = FileUtils;