import { Injectable } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file";
import { FileTransferObject, FileTransfer } from "@ionic-native/file-transfer";
import * as AppConfig from "../../app/config";
import { AndroidPermissions } from "@ionic-native/android-permissions";

@Injectable()
export class DownloadProvider {
  public fileObject: any = {};

  constructor(
    private file: File,
    private platform: Platform,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private androidPermissions: AndroidPermissions
  ) { }

  initializeFileObject(filePath, fileName, extension) {
    this.fileObject = this.getFileObject(filePath, fileName, extension);
  }

  /**
   * Check if a file exists in the localstorage of the device.
   *
   * @param {string} checkOnDeviceFirst If this flag is true It will check if the file exists in a device before download it.
   * @returns {Promise<string>} Returns a "downloaded" or "opened"text that will be used to specify a toast message for the user.
   */
  openOrDownloadFile(checkOnDeviceFirst: boolean) {
    return new Promise<string>((resolve, reject) => {
      if (checkOnDeviceFirst) {
        this.file.checkFile(this.fileObject.targetPath, this.fileObject.targeFileName)
          .then(() => {
            this.openDocument();
            resolve(AppConfig.FILE_STATUS.opened);
          }).catch((err) => {
            this.downloadFile(resolve, reject);
          });
      } else {
        this.downloadFile(resolve, reject);
      }
    })
  }

  checkAndroidPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  openDocument() {
    let mimeType = AppConfig.fileMimeTypes.find(
      type => type.name.toLowerCase() === this.fileObject.extension
    );

    this.fileOpener.open(this.fileObject.targetFullPath, mimeType.type);
  }

  downloadFile(resolve, reject) {
    this.checkAndroidPermission();

    if (this.fileObject) {
      const fileTransfer: FileTransferObject = this.transfer.create();

      const fullSourcePath = `${AppConfig.cfg.baseUrl}${this.fileObject.sourceFilePath}/${this.fileObject.sourceFileName}`; //"http://198.180.251.216:10002/Temp/Library/Bobber_DSG_EN.pdf";

      fileTransfer.download(
        fullSourcePath,
        this.getDocumentPathFromDevice(this.fileObject.sourceFileName)
      ).then(() => {
        resolve(AppConfig.FILE_STATUS.downloaded);
      }).catch(err => {
        reject(err);
      });
    }
  }

  getDocumentPathFromDevice(fileName: string) {
    if (this.platform.is(AppConfig.DEVICE.ios)) {
      return `${this.file.documentsDirectory}/${fileName}`;
    } else {
      return `${this.file.externalRootDirectory}Download/${fileName}`;
    }
  }

  getFileObject(filePath: string, fileName: string, extension: string) {
    let fileObject: any = {};

    if (this.platform.is(AppConfig.DEVICE.ios)) {
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
