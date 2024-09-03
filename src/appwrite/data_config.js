import { Client,Databases,Storage,Query,ID } from "appwrite";
import conf from "../config/conf";

 class Data_Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.getEndpoint(conf.appwriteUrl).setProject(conf.appwriteProject);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);


    }
    
    // data storage methods
    async getPostData(Document_id){
        try {
            return  await this.databases.getDocument(conf.appwriteDatabase,conf.appwriteCollection,Document_id);
        } catch (error) {
            console.log("AppWrite Error: " + error);
            
        }
    }
    async getPosts(query=[Query.equal("status",true)]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabase,conf.appwriteCollection,query);

        }catch{
            console.log("AppWrite Error: " + error);

        }
    }

    async createPost({title,slug,content,image_feature,status,userID}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabase,conf.appwriteCollection,slug,{title,content,image_feature,status,userID});
            
        } catch (error) {
            
        }
    }
    async updatePost(slug,{
        title,
        
        content,
        image_feature,
        status
    }){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabase,conf.appwriteCollection,slug,{title,content,image_feature,status});
            
        } catch (error) {
            
        }
    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appwriteDatabase,conf.appwriteCollection,slug);
             return true;
            
        } catch (error) {
            console.log("Appwrite error"+error.message);
        }
    }

    //creating the storage service


    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucket,ID.unique(),file);
        } catch (error) {
            console.log("Appwrite error"+error.message);
        }
    }

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucket,fileID);
        } catch (error) {
            console.log("Appwrite error"+error.message);
        }
    }

    async getFilePreview(fileID){
        try{
            return this.bucket.getFilePreview(conf.appwriteBucket,fileID).href;

        }catch(error){
            console.log("Appwrite error"+error.message);

        }
    }
}

const Database_Service_Object=new Data_Service();


export default Database_Service_Object;
