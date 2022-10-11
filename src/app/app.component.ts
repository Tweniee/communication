import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComAPIService } from './com-api.service';
import { PopupComponent } from './popup/popup.component';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
interface Data {
  name: string;
  email: string;
  status: string;
  gender: string;
}
interface Error {
  field: string;
  message: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isEdit = false;
  title = 'communication';
  search!: string;
  closeResult = '';
   sss ='';
  user: Data = {
    name: '',
    gender: '',
    email: '',
    status: '',
  };
  error: Error[] = [];
  allData!: Data[];
  constructor(public service: ComAPIService, private modalService: NgbModal) {
    service
      .getUser()
      .then((data) => {
        console.log('>>', data);
        this.allData = data as Data[];
      })
      .catch((err) => {
        this.error = err.error;
        this.setTime();
      });
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    console.log(this.closeResult);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  JoinAndClose(model: NgbModalRef) {
    model.close('Save click');
    model.close('Save click');
    if (!this.isEdit) {
      this.service
        .createUser(this.user)
        .then((res) => {
          console.log(res);
          this.service
            .getUser()
            .then((data) => {
              console.log('>>', data);
              this.allData = data as Data[];
            })
            .catch((err) => {
              this.error = err.error;
              this.setTime();
            });
        })
        .catch((err) => {
          this.error = err.error;
          this.setTime();
        });
    } else {
      this.service
        .updateUser(this.user)
        .then((res) => {
          console.log(res);
          this.service
            .getUser()
            .then((data) => {
              console.log('>>', data);
              this.allData = data as Data[];
            })
            .catch((err) => {
              this.error = err.error;
              this.setTime();
            });
        })
        .catch((err) => {
          this.error = err.error;
          this.setTime();
        });
    }
  }
  deleteMe(id: string) {
    this.service
      .deleteUser(id)
      .then((item) => {
        this.service
          .getUser()
          .then((data) => {
            console.log('>>', data);
            this.allData = data as Data[];
          })
          .catch((err) => {
            this.error = err.error;
            this.setTime();
          });
      })
      .catch((err) => {
        this.error = err.error;
        this.setTime();
      });
  }
  updateUser(index: number) {
    this.isEdit = true;
    this.user = this.allData[index];
  }
  clearForm(data: any) {
    for (let item in data) {
      data[item] = null;
    }
  }

  setTime() {
    setTimeout(() => {
      this.error = [];
    }, 5000);
  }
}
