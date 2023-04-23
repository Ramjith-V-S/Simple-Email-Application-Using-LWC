public with sharing class EmailController {
    
    @AuraEnabled(Cacheable = true)
    public static List<Sample_Email__c> retriveData(String StrStatus){
        system.debug('status :'+StrStatus);
        List<Sample_Email__c> samEmail = [Select Id, Name, To_Address__c,Fromaddress__c, Subject__c, CC__c, Body__c, Status__c From Sample_Email__c Where Status__c=: StrStatus order by CreatedDate DESC];
        return samEmail;
    }
    @AuraEnabled(Cacheable = true)
    public static List<Sample_Email__c> retriveviewData(Id mailId){
        system.debug('status :'+mailId);
        List<Sample_Email__c> samEmail = [Select Id, Name, To_Address__c,Fromaddress__c, Subject__c, CC__c, Body__c, Status__c From Sample_Email__c Where Id=: mailId];
        return samEmail;
    }
    
     @AuraEnabled(Cacheable = true)
    public static List<Sample_Email__c> retrivereadstatusData(String readstatus){
        
        List<Sample_Email__c> samEmail = [Select Id, Name, To_Address__c,Fromaddress__c, Subject__c, CC__c, Body__c, Read_status__c, Status__c From Sample_Email__c Where Read_status__c=: readstatus AND Status__c ='Inbox' order by CreatedDate DESC ];
        return samEmail;
    }
    
    @AuraEnabled
    public static void sendemailData(String toemail, String Ccadd, String mailsub, String mailBody){
        system.debug('status :'+toemail);
        system.debug('status :'+Ccadd);
        system.debug('status :'+mailsub); 
        system.debug('status :'+mailBody);
        
        try{
            List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            
            List<String> sendTo = new List<String>();
            sendTo.add(toemail);
            
            mail.setToAddresses(sendTo);
            
            
            mail.setReplyTo('mockrissuppor@gmail.com');
            mail.setSenderDisplayName('Mock RIS Support');
            if(Ccadd != 'rockybai0097@gmail.com'){
                List<String> CcTo = new List<String>();
            CcTo.add(Ccadd);
            
            mail.setCcAddresses(CcTo);
                
            }
            
            mail.setSubject(mailsub);
            mail.setHtmlBody(mailBody);
            mails.add(mail);
            
            Messaging.SendEmailResult[] results = Messaging.sendEmail(mails);
            
            if (results[0].success) {
                String leftPart = toemail.substringBefore('@');
                system.debug('namefrom email : '+leftPart);
                
                Sample_Email__c eml = new Sample_Email__c();
                
                eml.Name = leftPart;
               
                eml.Fromaddress__c ='mockrissuppor@gmail.com';
                eml.To_Address__c = toemail;
                
                if(Ccadd != 'rockybai0097@gmail.com'){
                eml.CC__c = Ccadd;
                }
                eml.Body__c = mailBody;
                eml.Subject__c = mailsub;
                eml.Status__c = 'Sent';
          
          
                insert eml;
            } else {
                System.debug('The email failed to send: ' + results[0].errors[0].message);
            }
            
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
}