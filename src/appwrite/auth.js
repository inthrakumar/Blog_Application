import conf from "../conf/conf";


import { Client, Account, ID } from "appwrite";

export class Account{
     client = new Client();
     account;
    constructor(){
        this.client.getEndpoint(conf.appwriteUrl).setProject(conf.appwriteProject);
        this.account=new Account(this.client);

    }

    async createAccount({email,password,name}){
        try{
           const UserAccount= await this.account.create(ID.unique(), email, password, name);
           if(UserAccount){
                    this.login({email,password});
           }else{
            return UserAccount;
           }

        }catch{

        }

    }
    
    async login({email,password}){
        try{
            return this.account.createEmailPasswordSession(email,password);
        }catch(error){
            return error
        }
    }
    async logout(){
        try{
            return this.account.deleteSessions();
        }catch(error){
            return error;
        }
    }
    async getAccount(){
        try{
            return this.account.get();
        }catch(error){
            return error;
        }
    }
}
 const authservice=new Account();
 export default authservice;