global class emailfromoutbox implements Messaging.InboundEmailHandler {
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email,Messaging.InboundEnvelope envelope) {
        Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();
        List<Attachment> attachmentList = new List<Attachment>();
      
            Sample_Email__c sam = new Sample_Email__c();
            sam.Name = email.fromName;
        sam.Fromaddress__c = email.fromAddress;
        list<string> toemailadd = email.toAddresses;
        String toaddress ='';
        for(integer i=0;i<=toemailadd.Size();i++){
            if(i==0){
               toaddress = toemailadd[i];
            }
        }
        
        list<string> Ccemailadd = new list<string>(email.ccAddresses) ;
         String Ccaddress ='';
        if(!Ccemailadd.isEmpty()){
            for(integer i=0;i<=Ccemailadd.Size();i++){
            if(i==0){
               Ccaddress = Ccemailadd[i];
            }else if(i>0){
                Ccaddress = toaddress+' , '+Ccemailadd[i];
            }
        }
            
        }
        
        
            sam.To_Address__c = toaddress;
        sam.CC__c = Ccaddress;
        sam.Body__c = email.plainTextBody;
        sam.Subject__c =email.subject;
        if(email.subject != ''){
            sam.Status__c = 'Inbox';
            
        }else {
            sam.Status__c = 'Spam';
        }
        sam.Read_status__c = 'Unread';
        
        
            insert sam;
            
            // Save attachments, if any
         /*   if(email.textAttachments.size()>0) {
                for (Messaging.Inboundemail.TextAttachment tAttachment : email.textAttachments) {
                    Attachment attachment = new Attachment();
                    attachment.Name = tAttachment.fileName;
                    attachment.Body = Blob.valueOf(tAttachment.body);
                    attachment.ParentId = sam.Id;
                    attachmentList.add(attachment);
                }
            }
            
            //Save any Binary Attachment
            if(email.binaryAttachments.size()>0){
                for (Messaging.Inboundemail.BinaryAttachment bAttachment : email.binaryAttachments) {
                    Attachment attachment = new Attachment();
                    attachment.Name = bAttachment.fileName;
                    attachment.Body = bAttachment.body;
                    attachment.ParentId = sam.Id;
                    attachmentList.add(attachment);
                }
            }
            
            if(!attachmentList.isEmpty()){
                insert attachmentList;
            } */
        
        result.success = true;
        return result;
    }
}