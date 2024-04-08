import {connect , ConnectOptions} from 'mongoose';

export const dbConnect = () =>
{
    connect("mongodb+srv://gofood:8gB2Oxd6HPdR8wWF@gofood.fatvtpr.mongodb.net/gofood",{
      
    } as ConnectOptions).then(()=>{
        console.log('connect Successfully'),
        (error: any) => console.log(error)
        
    }
)}