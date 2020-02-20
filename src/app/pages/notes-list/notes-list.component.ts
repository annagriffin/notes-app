import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  cardTitle: string = "abc";
  cardBody: string = "hi there this is bosy text la la la";
  constructor() { }

  ngOnInit() {
  }

}
