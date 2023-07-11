import { Component ,OnInit} from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
public name:string="";
public questionList : any=[];
public currQuestion:number=0;
public points:number=0;
counter=60;
correctAnswer:number=0;       
incorrectAnswer:number=0;
interval$:any
progress:string="";
isQuizCompleted:boolean=false;

constructor(private queService:QuestionService){}


ngOnInit(): void {
  this.name = localStorage.getItem("name")!; //should not be null add some value
  this.getAllQuestion();
  this.startCounter();
}

getAllQuestion(){
this.queService.getQuestion().subscribe(res=>{
  console.log(res.questions)
  this.questionList = res.questions;
})
}

nextQuestion(){
  this.currQuestion++;
}
previousQuestion(){
  this.currQuestion--;
}

answer(currQuestion:number,option:any){
  if(currQuestion === this.questionList.length){
    this.isQuizCompleted =true;
    this.stopCounter();
  }
if(option.correct){
  this.points += 10;
  this.correctAnswer++;
  setTimeout(()=>{
    this.currQuestion ++;
    // this.points = this.points + 10;
    this.resetCounter();
    this.getProgressPercent();
  },1000);
 
}
else{
  setTimeout(()=>{
    this.currQuestion ++;
    this.incorrectAnswer++;
    this.resetCounter();
    this.getProgressPercent();
  },1000);
  

  this.points -=10;
}
}

startCounter(){
this.interval$ = interval(1000)
.subscribe(val=>{
  this.counter--;
  if(this.counter==0){   // if time is over then 
   
    this.currQuestion++;   //it will move to next question
    this.counter=60;        //start counter for next question (60 sec)
    this.points -= 10       //deduct 10 pointes
  }
});
setTimeout(()=>{
this.interval$.unsubscribe();  // stop counter after 9 questions
},60000)
}
stopCounter(){
this.interval$.unsubscribe();
this.counter = 0;
}
resetCounter(){
this.stopCounter();
this.counter = 60;
this.startCounter();
}


resetQuiz(){
  this.resetCounter();
  this.getAllQuestion();
  this.currQuestion = 0;
  this.points = 0;
  this.counter = 60;
  this.progress="0";
}

getProgressPercent(){
this.progress = ((this.currQuestion / this.questionList.length)*100).toString();
return this.progress;
}
}
