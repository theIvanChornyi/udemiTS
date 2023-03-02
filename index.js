"use strict";
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["Pending"] = "pending";
    TransferStatus["Rejected"] = "rejected";
    TransferStatus["Completed"] = "completed";
})(TransferStatus || (TransferStatus = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["NotFound"] = "Not found: 404";
    ErrorMessages["NotEnoughSpace"] = "Not enough space: 507";
    ErrorMessages["Forbidden"] = "Forbidden: 403";
})(ErrorMessages || (ErrorMessages = {}));
class SingleFileTransfer {
    constructor(path, data, date) {
        this.checkTransferStatus = () => {
            return `Operation is ${this.status}`;
        };
        this.start = (p, d) => {
            if (d.length > 0) {
                this.status = TransferStatus.Completed;
                return `Your data saved od  server/${p}`;
            }
            else {
                this.status = TransferStatus.Rejected;
                this.stop(ErrorMessages.NotFound);
                return this.stop(ErrorMessages.NotFound);
            }
        };
        this.stop = (reason) => {
            this.status = TransferStatus.Rejected;
            return `Process stoped by ${reason} at ${new Date().toLocaleString()}`;
        };
        this.rejected = (error) => {
            return `Process crashed when it's ${this.status} with ${error}`;
        };
        this.path = path;
        this.data = data;
        this.date = date;
        this.status = TransferStatus.Pending;
    }
}
const file = new SingleFileTransfer('./home', ['mama', 'papa'], new Date());
console.log(file.checkTransferStatus());
console.log(file.stop('boring'));
console.log(file.rejected(ErrorMessages.NotFound));
console.log(file.start('', []));
