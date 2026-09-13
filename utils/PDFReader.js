const fs = require('fs');
const { PDFParse } = require('pdf-parse');

class PDFReader {

    static async readText(filePath) {

        // Read the downloaded PDF.
        const pdfBuffer = fs.readFileSync(filePath);

        // Create a PDF parser using the PDF buffer.
        const parser = new PDFParse({
            data: pdfBuffer
        });

        // Extract text from the PDF.
        const result = await parser.getText();

        // Clean up the parser resources.
        await parser.destroy();

        // Return the extracted PDF text.
        return result.text;
    }
}

module.exports = PDFReader;