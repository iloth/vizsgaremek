import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  error: HttpErrorResponse | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.error = JSON.parse(params['error']);
    });
  }

}
