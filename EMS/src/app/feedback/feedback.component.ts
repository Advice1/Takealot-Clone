import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  message:string=''
constructor(private route: ActivatedRoute) {
}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const messageType = params['type'];
      this.message = this.getMessageForType(messageType);
    });
  }
  getMessageForType(type: string): string {
    if (type === 'success') {
      //todo: clear the chart
      return 'payment Successfully';
    } else if (type === 'cancel') {
      return 'payment Canceled';
    } else {
      return 'Something went wrong';
    }
  }



}
