import { PickedFile } from '@capawesome/capacitor-file-picker';
import * as pdfjsLib from 'pdfjs-dist';

export class PDFUtility {
  // Initialize workerSrc
  static initializeWorkerSrc() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
  }

  static async pdfToImage(file: PickedFile): Promise<HTMLCanvasElement> {
    const blobString = await file.blob?.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: blobString }).promise;

    const page = await pdf.getPage(1); // Get the first page

    const viewport = page.getViewport({ scale: 1 }); // Scale can be adjusted based on your needs

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      // Render the page into the canvas
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    }

    return canvas;
  }
}

// Initialize workerSrc when this script is loaded
PDFUtility.initializeWorkerSrc();
