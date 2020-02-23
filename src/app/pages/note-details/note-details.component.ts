import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;
  noteId: any;
  new: boolean;

  constructor(private notesService: NotesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // check to see if new is in the params
    this.activatedRoute.params.subscribe((params: Params) => {
      this.note = new Note;

      if (params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      // save notes
      this.notesService.add(form.value);
    } else {
      // update service
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }

    this.router.navigateByUrl('/');


  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
