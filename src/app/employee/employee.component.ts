import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  EmployeeArray : any[] = [];

  teacherName: string="";
  address:string="";

  currentTeacherID="";

  constructor(private http: HttpClient){
    // calling  the method of same file in below
    this.getAll();
  }

  register(){

    let bodyData={
      "teacherName":this.teacherName,
      "address":this.address
    };

    this.http.post("http://localhost:8080/teacher/add",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Teacher Registered Successfully");
        this.getAll();
 
        this.teacherName = '';
        this.address = '';
    });
  }

 getAll(){
  this.http.get("http://localhost:8080/teacher/getAll")
  .subscribe((resultData: any)=>
  {
    console.log(resultData);
    this.EmployeeArray=resultData;
  })
 }

 setUpdate(data:any){
  this.teacherName=data.teacherName;
  this.address=data.address;
  this.currentTeacherID=data.id;
 }

 updateRecords(){
  let bodyData={
    "teacherid":this.currentTeacherID,
    "teacherName":this.teacherName,
    "address":this.address
  };

  this.http.put("http://localhost:8080/teacher/update"+"/"+this.currentTeacherID,bodyData,{responseType:"text"}).subscribe((resultData:any)=>
  {
    console.log(resultData);
    alert("Teacher Registered updateded")
    this.getAll();

    this.teacherName='';
    this.address='';
  });
 }

 save(){
  if(this.currentTeacherID==''){
    this.register();
  }
  else{
    this.updateRecords();
  }
 }


 setDelete(data:any){
  let bodyData={
    "teacherid":this.currentTeacherID,
    "teacherName":this.teacherName,
    "address":this.address
  };

  this.http.delete("http://localhost:8080/teacher/delete"+"/"+data.id,{responseType:'text'}).subscribe((resultData:any)=>
  {
    console.log(resultData);
    alert("Teacher Deleteted")
    this.getAll();

    this.teacherName='';
    this.address='';
  });
 }

 

}
