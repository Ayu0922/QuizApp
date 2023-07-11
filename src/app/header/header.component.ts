import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  @ViewChild('name') nameKey!:ElementRef

  constructor(){}

  ngOnInit(): void {
    
  }
  startQuiz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }
}
