import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Note } from '../../shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // entry animation
      transition('void => *', [
        // set initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }),
        // animate the spacing
        animate('50ms', style({
          height: '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        // animate spacing
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0',
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[];
  filteredNotes: Note[] = new Array<Note>();

  @ViewChild('filterInput', {static: true}) filterInputElmtRef: ElementRef;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    // get notes from notes service
    // this.notes = this.notesService.getAll();
    // this.filter("");

    this.notesService.getAll().subscribe((allNotes: Note[]) => {
      this.notes = allNotes;
      this.filter("");
    });


  }

  // deleteNote(note: Note) {
    deleteNote(id: number) {
    // let noteId = this.notesService.getId(note);
    this.notesService.delete(id).subscribe((note: any) => {
      location.reload();
    });
    this.filter(this.filterInputElmtRef.nativeElement.value);
  }

  generateNoteUrl(id: number) {
    return id;

  }


  filter(query: string) {
    if (query) {
      query = query.toLowerCase().trim();

      let allResults: Note[] = new Array<Note>();
      let terms: string[] = query.split(" "); // split on spaces
      terms = this.removeDuplicates(terms);
      terms.forEach(element => {
        let results: Note[] = this.relevantNotes(element);
        allResults = [...allResults, ...results];
      });

      let uniqueResults = this.removeDuplicates(allResults);
      this.filteredNotes = uniqueResults;
      this.sortByRelevancy(allResults);
    } else {
      this.filteredNotes = this.notes;
      console.log(this.filteredNotes)
    }



  }

  removeDuplicates(arr: Array<any>) : any {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): any {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(elmt => {
      if (elmt.title && elmt.title.toLowerCase().includes(query)) {
        return true;
      }
      if (elmt.body && elmt.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })

    return relevantNotes
  }

  // determine relevancy of search query
  sortByRelevancy(searchResults: Note[]) {
    let noteCountObject: Object = {}; // noteId: number (note object id : count )

    searchResults.forEach(note => {
      // let noteId = this.notesService.getId(note);
      if (noteCountObject[note.id]) {
        noteCountObject[note.id] += 1;
      } else {
        noteCountObject[note.id] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = a.id;
      let bId = b.id;

      let aCount = noteCountObject[aId];
      let bCount = noteCountObject[bId];

      // more relevant at the top
      return bCount - aCount;
    })

  }

}
