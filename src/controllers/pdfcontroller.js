import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDF from '../models/PDF.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPDF = async (req, res) => {
    const { author, title, internalPages } = req.body;
    const pdfData = {
        author,
        title,
        frontCoverImage: req.files['frontCover'][0].path,
        backCoverImage: req.files['backCover'][0].path,
        internalPages: JSON.parse(internalPages).map((page, index) => ({
            ...page,
            backgroundImage: req.files['internalPages'][index]?.path || ''
        }))
    };

    const newPDF = new PDF(pdfData);
    await newPDF.save();

    // Generate PDF
    const doc = new PDFDocument();
    const filePath = `./pdfs/${newPDF._id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    // Front Cover
    doc.image(pdfData.frontCoverImage, 0, 0, { width: doc.page.width, height: doc.page.height });
    doc.fontSize(25).text(pdfData.title, 100, 100);
    doc.fontSize(20).text(`By ${pdfData.author}`, 100, 150);

    // Internal Pages
    pdfData.internalPages.forEach(page => {
        doc.addPage();
        if (page.backgroundImage) {
            doc.image(page.backgroundImage, 0, 0, { width: doc.page.width, height: doc.page.height });
        }
        doc.text(page.content, {
            align: page.alignment,
            valign: 'center'
        });
    });

    // Back Cover
    doc.addPage();
    doc.image(pdfData.backCoverImage, 0, 0, { width: doc.page.width, height: doc.page.height });
    doc.end();

    res.status(201).json(newPDF);
};

export const getPDFs = async (req, res) => {
    const pdfs = await PDF.find();
    res.status(200).json(pdfs);
};

export const downloadPDF = (req, res) => {
    const file = path.resolve(__dirname, `../pdfs/${req.params.id}.pdf`);
    res.download(file, err => {
        if (err) {
            res.status(500).send({
                message: 'Could not download the file. ' + err,
            });
        }
    });
};

export const viewPDF = (req, res) => {
    const file = path.resolve(__dirname, `../pdfs/${req.params.id}.pdf`);
    res.sendFile(file);
};