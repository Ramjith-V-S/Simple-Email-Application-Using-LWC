import { LightningElement, track, wire } from 'lwc';
import Rislogo from '@salesforce/resourceUrl/Rislogo';
import retriveData from '@salesforce/apex/EmailController.retriveData';
import retriveviewData from '@salesforce/apex/EmailController.retriveviewData';
import retrivereadstatusData from '@salesforce/apex/EmailController.retrivereadstatusData';
import sendemailData from '@salesforce/apex/EmailController.sendemailData';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
export default class Emailapp extends LightningElement {
    @track logo = Rislogo;
    @track stem = false;
    @track fold = false;
    @track menuhet = false;
    // @track dothet = false;
    @track newmailhet = false;
    @track mailtemp = true;
    @track contacttemp = false;
    @track tasktemp = false;
    @track notetemp = false;
    @track booktemp = false;
    @track menuvalue = 'Inbox';
    maillist = [];
    mailreadlist =[];
    @track maillistview = true;
    @track mailreadlistview =false;
    @track mailviewhet = false;
    selectmail = '';
    readstatusmail = '';
    viewmailtoadd = '';
    viewmailName = '';
    viewmailsub = '';
    viewmailBody = '';
    viewmailCc = '';
    viewmailfrom ='';
    recordview;
    disablebtn = false;

    @track toaddressmail = '';
    @track ccaddressmail = '';
    @track subjectinsertmail = '';
    @track bodyinsertmail = '';
    viewmailread;
    record;



    @wire(retriveData, { StrStatus: '$menuvalue' })
    wiredjob({ error, data }) {
        if (data) {
            this.record = data;
            console.log('record' + JSON.stringify(this.record));
            this.maillist = data.map(mail => ({
                id: mail.Id,
                from: mail.Fromaddress__c,
                to: mail.To_Address__c,
                name: mail.Name,
                subject: mail.Subject__c,
                body: mail.Body__c,

            }));
            const datasection = this.template.querySelector('.mailtable');
            datasection.style.height = "75%";
        } else if (error) {
            console.log('Something went wrong:', error);
            const datasection = this.template.querySelector('.mailtable');
            datasection.style.height = "0%";
        }
    }

viewmailId;
viewmailreadstatus;

    @wire(retriveviewData, { mailId: '$selectmail' })
    wiredviewjob(result) {
        if (result.data) {
            this.recordview = result.data;

            console.log('recordview' + JSON.stringify(this.recordview));

            this.viewmailtoadd = this.recordview[0].To_Address__c;
            this.viewmailName = this.recordview[0].Name;
            this.viewmailfrom = this.recordview[0].Fromaddress__c;
            this.viewmailsub = this.recordview[0].Subject__c;
            this.viewmailBody = this.recordview[0].Body__c;
            this.viewmailCc = this.recordview[0].CC__c;
            this.viewmailread = this.recordview[0].Read_status__c;
            this.viewmailId = this.recordview[0].Id;

            
        

            // this.viewmailtoadd =this.recordview.To_Address__c;
            // this.viewmailName = this.recordview.Name;
            // this.viewmailsub = this.recordview.Subject__c;
            // this.viewmailBody = this.recordview.Body__c;
            // this.viewmailCc = this.recordview.CC__c;

        } else if (result.error) {
            console.log('Something went wrong in view form:', result.error);

        }
    }

       @wire(retrivereadstatusData, { readstatus: '$readstatusmail' })
    wiredreadstatusjob(result) {
        this.refreshdataview = result.data;
        if (result.data) {
            this.recordstatus = result.data;
            console.log('record' + JSON.stringify(this.record));
            this.mailreadlist = this.recordstatus.map(mail => ({
                id: mail.Id,
                to: mail.To_Address__c,
                name: mail.Name,
                subject: mail.Subject__c,
                body: mail.Body__c,

            }));
            const datasection = this.template.querySelector('.mailtable');
            datasection.style.height = "75%";
        } else if (result.error) {
            console.log('Something went wrong:', result.error);
            const datasection = this.template.querySelector('.mailtable');
            datasection.style.height = "0%";
        }
    }



    stemopen() {
        const stemheight = this.template.querySelector('.streamsopen');
        const stemmargin = this.template.querySelector('.streams');
        const foldertop = this.template.querySelector('.folderopen');


        if (!this.stem) {
            stemheight.style.height = "60px";
            stemmargin.style.marginBottom = "60px";
            foldertop.style.top = "265px";
            this.stem = true;
        } else if (this.stem) {
            stemheight.style.height = "0px";
            stemmargin.style.marginBottom = "0px";
            foldertop.style.top = "206px";
            this.stem = false;
        }


    }
    foldopen() {
        const stemheight = this.template.querySelector('.folderopen');
        if (!this.fold) {
            stemheight.style.height = "150px";
            this.fold = true;
        } else if (this.fold) {
            stemheight.style.height = "0px";
            this.fold = false;
        }

    }
    handlemail() {

        this.mailtemp = true;
        this.contacttemp = false;
        this.tasktemp = false;
        this.notetemp = false;
        this.booktemp = false;
        const mailsection = this.template.querySelector('.mailsec');
        const consection = this.template.querySelector('.consec');
        const tasksection = this.template.querySelector('.tasksec');
        const notesection = this.template.querySelector('.notesec');
        const booksection = this.template.querySelector('.booksec');

        consection.style.borderLeftWidth = "0px";
        tasksection.style.borderLeftWidth = "0px";
        notesection.style.borderLeftWidth = "0px";
        booksection.style.borderLeftWidth = "0px";
        mailsection.style.borderLeftWidth = "4px";


        mailsection.style.borderLeftStyle = "solid";
        mailsection.style.borderLeftColor = '#5097ff';





    }
    handlecontact() {
        this.mailtemp = false;
        this.contacttemp = true;
        this.tasktemp = false;
        this.notetemp = false;
        this.booktemp = false
        const mailsection = this.template.querySelector('.mailsec');
        const consection = this.template.querySelector('.consec');
        const tasksection = this.template.querySelector('.tasksec');
        const notesection = this.template.querySelector('.notesec');
        const booksection = this.template.querySelector('.booksec');

        consection.style.borderLeftWidth = "4px";
        tasksection.style.borderLeftWidth = "0px";
        notesection.style.borderLeftWidth = "0px";
        booksection.style.borderLeftWidth = "0px";
        mailsection.style.borderLeftWidth = "0px";


        consection.style.borderLeftStyle = "solid";
        consection.style.borderLeftColor = '#5097ff';

    }
    handleTask() {
        this.mailtemp = false;
        this.contacttemp = false;
        this.tasktemp = true;
        this.notetemp = false;
        this.booktemp = false
        const mailsection = this.template.querySelector('.mailsec');
        const consection = this.template.querySelector('.consec');
        const tasksection = this.template.querySelector('.tasksec');
        const notesection = this.template.querySelector('.notesec');
        const booksection = this.template.querySelector('.booksec');

        consection.style.borderLeftWidth = "0px";
        tasksection.style.borderLeftWidth = "4px";
        notesection.style.borderLeftWidth = "0px";
        booksection.style.borderLeftWidth = "0px";
        mailsection.style.borderLeftWidth = "0px";


        tasksection.style.borderLeftStyle = "solid";
        tasksection.style.borderLeftColor = '#5097ff';

    }
    handlenotes() {
        this.mailtemp = false;
        this.contacttemp = false;
        this.tasktemp = false;
        this.notetemp = true;
        this.booktemp = false
        const mailsection = this.template.querySelector('.mailsec');
        const consection = this.template.querySelector('.consec');
        const tasksection = this.template.querySelector('.tasksec');
        const notesection = this.template.querySelector('.notesec');
        const booksection = this.template.querySelector('.booksec');

        consection.style.borderLeftWidth = "0px";
        tasksection.style.borderLeftWidth = "0px";
        notesection.style.borderLeftWidth = "4px";
        booksection.style.borderLeftWidth = "0px";
        mailsection.style.borderLeftWidth = "0px";


        notesection.style.borderLeftStyle = "solid";
        notesection.style.borderLeftColor = '#5097ff';

    }
    handlebook() {
        this.mailtemp = false;
        this.contacttemp = false;
        this.tasktemp = false;
        this.notetemp = false;
        this.booktemp = true
        const mailsection = this.template.querySelector('.mailsec');
        const consection = this.template.querySelector('.consec');
        const tasksection = this.template.querySelector('.tasksec');
        const notesection = this.template.querySelector('.notesec');
        const booksection = this.template.querySelector('.booksec');

        consection.style.borderLeftWidth = "0px";
        tasksection.style.borderLeftWidth = "0px";
        notesection.style.borderLeftWidth = "0px";
        booksection.style.borderLeftWidth = "4px";
        mailsection.style.borderLeftWidth = "0px";


        booksection.style.borderLeftStyle = "solid";
        booksection.style.borderLeftColor = '#5097ff';

    }
    inboxmenu() {
         const loadingsec = this.template.querySelector('.loadingbox');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
             }, 1500);
       
        this.maillistview = true;
        this.mailreadlistview = false;
        this.menuvalue = 'Inbox';
        const menuheight = this.template.querySelector('.menu');
        menuheight.style.height = "0px";
        this.menuhet = false;

         
 

        //     retriveData({StrStatus :this.menuvalue})
        // .then( (data) => {
        //     this.listdata = data;

        //     console.log('data input :'+JSON.stringify(data));
        //     this.maillist = data.map(mail => ({
        //         id: mail.Id,
        //         subject : mail.Subject__c,
        //         body: mail.Body__c,

        //     }));
        //     //If response is ok
        // }).catch( error => {
        //     //If there is an error on response
        // })

    }
    unreadmenu(){
        const loadingsec = this.template.querySelector('.loadingbox');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
             }, 1500);
        
this.maillistview = false;
        this.mailreadlistview = true;
        this.readstatusmail = 'Unread';
 
    }
    Readmenu(){
        const loadingsec = this.template.querySelector('.loadingbox');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
             }, 1500);
       
this.maillistview = false;
        this.mailreadlistview = true;
        this.readstatusmail = 'Read';
 

    }
    sendmenu() {
        const loadingsec = this.template.querySelector('.loadingbox');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
             }, 1500);
        
        this.maillistview = true;
        this.mailreadlistview = false;
        this.menuvalue = 'Sent';
        const menuheight = this.template.querySelector('.menu');
        menuheight.style.height = "0px";
        this.menuhet = false;
  

    }
    trashmenu() {
        const loadingsec = this.template.querySelector('.loadingbox');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
             }, 1500);
       
        this.maillistview = true;
        this.mailreadlistview = false;
        this.menuvalue = 'Trash';
        const menuheight = this.template.querySelector('.menu');
        menuheight.style.height = "0px";
        this.menuhet = false;
    

    }
    spammenu() {
        const loadingsec = this.template.querySelector('.loadingbox');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
             },1500);
        
        this.maillistview = true;
        this.mailreadlistview = false;
        this.menuvalue = 'Spam';
        const menuheight = this.template.querySelector('.menu');
        menuheight.style.height = "0px";
        this.menuhet = false;

    }
    menuoption() {
      
        const menuheight = this.template.querySelector('.menu');
        if (!this.menuhet) {
            menuheight.style.height = "150px";
            this.menuhet = true;
        } else if (this.menuhet) {
            menuheight.style.height = "0px";
            this.menuhet = false;
        }


    }
    // handledots(){
    //      const dotheight = this.template.querySelector('.dotmenu');
    //     if (!this.dothet) {
    //         dotheight.style.height = "29px";
    //         this.dothet = true;
    //     }


    // }
    closedots() {
        this.toaddressmail = '';
        this.ccaddressmail = '';
        this.subjectinsertmail = '';
        this.template.querySelector('.slds-textarea').value ='';
        const newmailheight = this.template.querySelector('.composemail');
        if (this.newmailhet) {
            newmailheight.style.height = "0px";
            this.newmailhet = false;
        }

    }

    opennewmail() {
        this.toaddressmail = '';
        this.ccaddressmail = '';
        this.subjectinsertmail = '';
        this.template.querySelector('.slds-textarea').value ='';
        const newmailheight = this.template.querySelector('.composemail');
        if (!this.newmailhet) {
            newmailheight.style.height = "550px";
            this.newmailhet = true;
        }

    }
    selectedMail(event) {

        if (event.currentTarget.dataset.id === 'undefined') {
            this.selectmail = '';
        } else {
            this.selectmail = event.currentTarget.dataset.id;
        }
        const loadingsec = this.template.querySelector('.loadingbox');
         const mailviewheight = this.template.querySelector('.mailview');
            loadingsec.style.display = "block";
            setTimeout(() => {
             loadingsec.style.display = "none";
            if (!this.mailviewhet) {
                mailviewheight.style.width = "100%";
                this.mailviewhet = true;
            }
             },1000);
          

            let fields = {
                    Id: this.selectmail,
                    Read_status__c: 'Read'
                }
                const recordInput = { fields };
                updateRecord(recordInput);

    

    }
    closemailview() {
        const mailviewheight = this.template.querySelector('.mailview');
        if (this.mailviewhet) {
            mailviewheight.style.width = "0%";
            this.mailviewhet = false;
        }

    }

    toAddressInput(event) {
        this.toaddressmail = event.target.value;
        console.log('toadd: ' + this.toaddressmail);
    }
    ccAddressInput(event) {
        this.ccaddressmail = event.target.value;
        console.log('ccadd: ' + this.ccaddressmail);
    }
    subjectinsertInput(event) {
        this.subjectinsertmail = event.target.value;
        console.log('sub: ' + this.subjectinsertmail);
    }
    bodyinsertInput(event) {
        this.bodyinsertmail = event.target.value;
        console.log('body: ' + this.bodyinsertmail);
    }

    successwid = false;
    successtextwid = false;
    errortext;

    sendemail() {
         const successwidth = this.template.querySelector('.successtab');
            if (!this.successwid) {
                successwidth.style.width = "20%";
                this.successwid = true;
            }
            this.template.querySelector('.closetext').innerHTML = 'Sending...';
            
        this.disablebtn = true;
        if (this.ccaddressmail == '') {
            this.ccaddressmail = 'rockybai0097@gmail.com';
            console.log('email :' + this.ccaddressmail);
        }


        sendemailData({ 'toemail': this.toaddressmail, 'Ccadd': this.ccaddressmail, 'mailsub': this.subjectinsertmail, 'mailBody': this.bodyinsertmail })
            .then(result => {


                this.toaddressmail = '';
        this.ccaddressmail = '';
        this.subjectinsertmail = '';
        
        this.template.querySelector('.slds-textarea').value ='';
        this.template.querySelector('.slds-input').value ='';
                
this.template.querySelector('.closetext').innerHTML = '';
            const successdropwid = this.template.querySelector('.drop-main');
        
                successdropwid.style.fontSize = "2rem";
           
            
                // Clear the user enter values

const letter1 = this.template.querySelector('.d');
    letter1.classList.add('drop1');
    const letter2 = this.template.querySelector('.r');
    letter2.classList.add('drop2');
    const letter3 = this.template.querySelector('.o');
    letter3.classList.add('drop3');
    const letter4 = this.template.querySelector('.p');
    letter4.classList.add('drop4');
    const letter5 = this.template.querySelector('.s');
    letter5.classList.add('drop5');

                window.console.log('result ===> ' + result);

                setTimeout(() => {
                    const successwidth = this.template.querySelector('.successtab');
            if (this.successwid) {
                successwidth.style.width = "0px";
                this.successwid = false;
            }
            const letter1 = this.template.querySelector('.d');
    letter1.classList.remove('drop1');
    const letter2 = this.template.querySelector('.r');
    letter2.classList.remove('drop2');
    const letter3 = this.template.querySelector('.o');
    letter3.classList.remove('drop3');
    const letter4 = this.template.querySelector('.p');
    letter4.classList.remove('drop4');
    const letter5 = this.template.querySelector('.s');
    letter5.classList.remove('drop5');

    const successdropwid = this.template.querySelector('.drop-main');
        
                successdropwid.style.fontSize = "0rem";

        }, 4000);

                
                const newmailheight = this.template.querySelector('.composemail');
                if (this.newmailhet) {
                    newmailheight.style.height = "0px";
                    this.newmailhet = false;
                }
              
            })
            .catch(error => {
                this.error = error.message;
                const newmailheight = this.template.querySelector('.composemail');
                if (this.newmailhet) {
                    newmailheight.style.height = "0px";
                    this.newmailhet = false;
                }

                
                    const successwidth1 = this.template.querySelector('.successtab');
                successwidth1.style.backgroundColor = "red";


                this.template.querySelector('.closetext').innerHTML = 'todaysLimitover';
               const errorwid = this.template.querySelector('.closetext');
               errorwid.style.color = "white";
        


                

            

                setTimeout(() => {
                    
            if (this.successwid) {
                successwidth.style.width = "0px";
                this.template.querySelector('.closetext').innerHTML = '';
                successwidth1.style.backgroundColor = "limegreen";
                this.successwid = false;
            }
        }, 4000);
            });


    }




}