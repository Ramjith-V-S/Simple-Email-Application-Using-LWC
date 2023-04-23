public class emailreadstatusupdate {
    public static void statusupdate(List<Sample_Email__c> emailist){
        Set<Id> emailrecId = new Set<Id>();
        for(Sample_Email__c ijk:emailist){
            emailrecId.add(ijk.Id);
        }
        
        list<Sample_Email__c> maillist =[Select Id, Name, To_Address__c, Subject__c, CC__c, Body__c, Status__c, Read_status__c From Sample_Email__c Where Id=: emailrecId limit 1];
        
        list<Sample_Email__c> updateemailstatus = new list<Sample_Email__c>();
          for(Sample_Email__c se:maillist){
            if(se.Read_status__c == 'Unread' ||se.Read_status__c == '--None--' ){
                
                se.Read_status__c = 'Read';
                updateemailstatus.add(se);
            }
            
        }
        if(!updateemailstatus.IsEmpty()){
             update updateemailstatus;
            updateemailstatus.clear();
            
        }
       
    }

}