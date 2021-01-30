import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  pdfMake: any;

  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(visit) {

    await this.loadPdfMaker();

    // const def = { content: 'A sample PDF document generated using Angular and PDFMake' };
    const def = { content:  
      [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
    
            body: [
              [ 'First Name', 'Gender', 'Age', 'Mobile' ],
              [ { text: visit[0].patientName , bold: true }, visit[0].patientGender, visit[0].patientAge, visit[0].patientMobile ],
              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            ]
          }
        }
      ]
    };

    this.pdfMake.createPdf(def).open();
  }

}