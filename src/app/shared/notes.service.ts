import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes;


  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get<Note[]>('https://my-json-server.typicode.com/annagriffin/notes-app/notes');
    // fetch('https://my-json-server.typicode.com/annagriffin/notes-app/notes')
    //   .then(response => response.json())
    //   .then(json => this.notes = json)
    return this.http.get('https://my-json-server.typicode.com/annagriffin/notes-app/notes');

    // return this.notes;
  }

  get(id: number) {
    return this.notes[id];
  }

  // getAll() {
  //   return this.notes;
  // }

  // getId(note: Note) {
  //   return this.notes.indexOf(note)
  // }

  add(note: Note) {
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    // id and delete count
    // this.notes.splice(id, 1);
    return this.http.delete(`https://my-json-server.typicode.com/annagriffin/notes-app/notes/{${id}}`);
  }
}
