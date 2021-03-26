import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {
  result: any;
  userResult: any;

  constructor(private router: Router) {
    // Retrieving data from router state
    if (history.state.result) {
      this.result = JSON.parse(history.state.result);
    }
    else{
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.trimName();
  }

  // Trimming the user's full name
  trimName(): void{
    let name: string = this.result.name;
    this.userResult = {
      refcode: this.result.refcode,
      email: this.result.email,
      make: this.result.make,
      model: this.result.model,
      conditions: this.result.conditions,
    };
    if (name.length > 30) {
      this.userResult.name = name.slice(1, 30).concat('...');
      return;
    }
    this.userResult.name = this.result.name;
  }

  // submitting data
  submitData(): void{
    console.log(JSON.stringify(this.result));
  }
}
