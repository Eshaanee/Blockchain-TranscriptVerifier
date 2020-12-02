import { Component } from '@angular/core';
import { Web3Service } from './provider/web3.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Record Keeper';
  rollNumber: string='';
  firstName: string='';
  lastName: string='';
  passingYear: number=0;
  percentage: number=0;

  constructor(private web3: Web3Service,
    private modal: NgbModal
  ) {

  }

  addTranscript() {
    return this.web3.addTranscript().then(result => {
      console.log(result);
    })
  }

  verifyTranscript(content) {
    this.web3.verifyTranscript(this.rollNumber, this.firstName, this.lastName, this.passingYear, this.percentage).then(result => {
      console.log(result);
      this.rollNumber=result[0];
      this.firstName=result[1];
      this.lastName=result[2];
      this.passingYear=result[3];
      this.percentage=result[4];
      this.modal.open(content).result.then(result => {
        console.log('result');
      })
        })
  }


}
