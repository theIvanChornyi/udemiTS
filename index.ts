enum TransferStatus {
  Pending = 'pending',
  Rejected = 'rejected',
  Completed = 'completed',
}

enum ErrorMessages {
  NotFound = 'Not found: 404',
  NotEnoughSpace = 'Not enough space: 507',
  Forbidden = 'Forbidden: 403',
}

interface ITransfer {
  path: string;
  data: string[];
  date?: Date;
  start: (p: string, d: string[]) => string;
  stop: (reason: string) => string;
}

interface TransferError {
  message: ErrorMessages;
}

class SingleFileTransfer implements ITransfer, TransferError {
  path: string;
  data: string[];
  date?: Date | undefined;
  message: ErrorMessages;
  status: TransferStatus;
  constructor(path: string, data: string[], date?: Date) {
    this.path = path;
    this.data = data;
    this.date = date;
    this.status = TransferStatus.Pending;
  }
  checkTransferStatus = (): string => {
    return `Operation is ${this.status}`;
  };

  start = (p: string, d: string[]): string => {
    if (d.length > 0) {
      this.status = TransferStatus.Completed;
      return `Your data saved od  server/${p}`;
    } else {
      this.status = TransferStatus.Rejected;
      this.stop(ErrorMessages.NotFound);
      return this.stop(ErrorMessages.NotFound);
    }
  };
  stop = (reason: string): string => {
    this.status = TransferStatus.Rejected;
    return `Process stoped by ${reason} at ${new Date().toLocaleString()}`;
  };

  rejected = (error: ErrorMessages): string => {
    return `Process crashed when it's ${this.status} with ${error}`;
  };
}
const file = new SingleFileTransfer('./home', ['mama', 'papa'], new Date());

console.log(file.checkTransferStatus());
console.log(file.stop('boring'));
console.log(file.rejected(ErrorMessages.NotFound));
console.log(file.start('', []));
