import { Injectable } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file";
import { FileTransferObject, FileTransfer } from "@ionic-native/file-transfer";
import * as AppConfig from "../../app/config";

@Injectable()
export class DonwloadProvider {
  public fileObject: any = {};

  constructor(
    private file: File,
    private platform: Platform,
    private fileOpener: FileOpener,
    private transfer: FileTransfer
  ) {}

  initializeFileObject(filePath, fileName, extension) {
    this.fileObject = this.getFileObject(filePath, fileName, extension);
  }

  openFile(checkFileOnDevice: boolean) {
    if (checkFileOnDevice) {
      return this.getFileFromDevice()
        .then(resolve => {
          this.openDocument();
        })
        .catch(() => {
          //If the file was not found on the device, then I should download it from Source.
          this.donwloadFile();
          return "downloaded";
        });
    } else {
      return this.donwloadFile();
    }
  }

  openDocument() {
    let mimeType = AppConfig.fileMimeTypes.find(
      type => type.name.toLowerCase() === this.fileObject.extension
    );

    this.fileOpener.open(this.fileObject.targetFullPath, mimeType.type);
  }

  donwloadFile() {
    if (this.fileObject) {
      const fileTransfer: FileTransferObject = this.transfer.create();

      const fullSourcePath = `${AppConfig.cfg.baseUrl}${
        this.fileObject.sourceFilePath
      }/${this.fileObject.sourceFileName}`; //"http://198.180.251.216:10002/Temp/Library/Bobber_DSG_EN.pdf";

      return fileTransfer.download(
        fullSourcePath,
        this.getDocumentPathFromDevice(this.fileObject.sourceFileName)
      );
    }
  }

  getDocumentPathFromDevice(fileName: string) {
    if (this.platform.is("ios")) {
      return `${this.file.documentsDirectory}/${fileName}`;
    } else {
      return `${this.file.externalRootDirectory}Download/${fileName}`;
    }
  }

  getFileFromDevice() {
    const promise = new Promise((resolve, reject) => {
      this.file
        .checkFile(this.fileObject.targetPath, this.fileObject.targeFileName)
        .then(() => resolve())
        .catch(() => reject());
    });

    return promise;
  }

  getFileObject(filePath: string, fileName: string, extension: string) {
    let fileObject: any = {};

    if (this.platform.is("ios")) {
      fileObject.targetPath = this.file.documentsDirectory;
      fileObject.targeFileName = fileName;
    } else {
      fileObject.targetPath = this.file.externalRootDirectory;
      fileObject.targeFileName = `Download/${fileName}`;
    }

    fileObject.sourceFileName = fileName;
    fileObject.sourceFilePath = filePath;
    fileObject.extension = extension.replace(".", "");
    fileObject.targetFullPath =
      fileObject.targetPath + fileObject.targeFileName;

    return fileObject;
  }
}
