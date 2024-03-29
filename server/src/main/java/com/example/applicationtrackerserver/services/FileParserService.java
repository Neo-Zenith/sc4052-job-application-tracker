package com.example.applicationtrackerserver.services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.applicationtrackerserver.exceptions.FileExceptions.UnsupportedFileTypeException;

@Service
public class FileParserService {
    public String parseFile(MultipartFile file) throws IOException, UnsupportedFileTypeException {
        String content = "";
        switch (file.getContentType()) {
            case "application/pdf":
                PDDocument document = PDDocument.load(file.getBytes());
                if (document.isEncrypted()) {
                    throw new IOException("Error reading PDF file");
                }
                PDFTextStripperByArea stripper = new PDFTextStripperByArea();
                stripper.setSortByPosition(true);
                PDFTextStripper tStripper = new PDFTextStripper();
                content = tStripper.getText(document);
                document.close();
                break;
            case "text/plain":
                content = new String(file.getBytes(), StandardCharsets.UTF_8);
                break;
            default:
                throw new UnsupportedFileTypeException("Unsupported file type");
        }
        return content;
    }
}
