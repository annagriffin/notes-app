import { Note } from '../models/Note';

export class AddNote {
  static readonly type = '[Node] Add';

  constructor(public payload: Note) {
  }
}

export class GetNotes {
  static readonly type = '[Note] Get';
}

export class UpdateNote {
  static readonly type = '[Note] Update';

  constructor(public payload: Note, public id: number) {
  }
}

export class DeleteNote {
  static readonly type = '[Note] Delete';

  constructor(public id: number) {
  }
}

export class SetSelectedNote {
  static readonly type = '[Note] Set';

  constructor(public payload: Note) {
  }
 }