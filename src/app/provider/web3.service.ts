import { Injectable } from '@angular/core';
//import { resolveDefinition } from '@angular/core/src/view/util';

const Web3 = require('web3');

const contractAbi = require("./abi-contract.json");
const contractAddress = "0x4C84596980Ab93A16EE2e9e38419146BFEaA565e";

declare let window: any
declare let require: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  _web3: any;
  _contract: any;
  account: String="";

  constructor() {
    this.initializeWeb3()
  }

  initializeWeb3() {
    if (typeof window.web3 !== 'undefined') {
      //console.log("inside initializeWeb3");
      //this._web3.eth.defaultAccount=web3.eth.accounts[0];
      // console.log(this.web3.eth.defaultAccount);
      this._web3 = new Web3(window.web3.currentProvider);
    //  console.log("inside window.web3.currentProvider");

      this._contract = this._web3.eth.contract(contractAbi).at(contractAddress);
      //console.log("inside abi address");

      this._web3.eth.getAccounts((err, result) => {
      //  console.log("inside web3 get accounts");

       //Web3.eth.personal.unlockAccount("0x0573CB7b9c60D8f482C9Eb2003659eF31C560227", "Metamask@123", 1200).then(console.log('Account unlocked!'));
        if (err !== false) {
          // this._web3.eth.defaultAccount=web3.eth.accounts[0];
          // this.account=  this._web3.eth.defaultAccount;
          this.account = result[0];//ACCOUNT IS EMPTY HERE
          console.log('account');
        }
      });
      console.log('metamask found');
      console.log(this.account);
    } else {
      // set the provider you want from Web3.providers
      console.log("no provider found");
    }
  }

  public async addTranscript(): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("new promise of addtranscript");

// contract has a addTranscript function which will call the function in the contract on Blockchain
      this._contract.addTranscript("A", "A", "A", 1, 1, { from: this.account }, (err, result) => { //BREAKING FROM HERE
        //console.log("inside new promise of addtranscript A A");

        if (err !== null) {
          console.log("inside error");
          return reject(err);
        }
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async verifyTranscript(rollNumber: string, firstName: string, lastName: string, passingyear: number, percentage: number): Promise<any> {
      return new Promise((resolve, reject) => {
        this._contract.verifyTranscript.call(rollNumber, firstName, lastName, passingyear, percentage, (err, result) => {
          if (err !== null) {
            return reject(err);
          }

          return resolve(result)
        })
      }) as Promise<any>
    }

}
