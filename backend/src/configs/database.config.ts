import {connect , ConnectOptions} from 'mongoose';

export const dbConnect = () =>
{
    connect("mongodb+srv://GoFood:ZnidscB9HLdYWile@cluster-gofood.qqdnuij.mongodb.net/Food",{
      
    } as ConnectOptions).then(()=>{
        console.log('connect Successfully'),
        (error: any) => console.log(error)
        
    }
)}