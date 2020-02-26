import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Note } from '../models/Note';
import { AddNote, DeleteNote, GetNotes, SetSelectedNote, UpdateNote } from '../actions/note.action';
import { NotesService } from '../shared/notes.service';
import { tap } from 'rxjs/operators';
import { Note } from '../shared/note.model';
import { state } from '@angular/animations';

export class NoteStateModel {
  notes: Note[];
  selectedNote: Note;
}

@State<NoteStateModel>({
  name: 'todos',
  defaults: {
      notes: [],
      selectedNote: null
  }
})

export class NoteState {
  
  constructor(private notesService: NotesService) {
  }

  @Selector()
  static getNoteList(state: NoteStateModel) {
    return state.notes;
  }

  @Selector()
  static getSelectedNote(state: NoteStateModel) {
    return state.selectedNote;
  }

  // TODO: add actions



}