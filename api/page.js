import {students} from '../data/students';

export default function handler(req,res){
    if(req.method==='GET'){
        res.status(200).json(students)
    }
}