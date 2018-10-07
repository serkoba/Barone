import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-list',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listFilter: string;
  @Input() title: string;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }



  getEachChar(value: any) {
      this.change.emit(value);
  }

  clearFilter() {
      this.listFilter = null;
      this.change.emit(null);
  }

  getPasteData(value: any) {
      let pastedVal = value.clipboardData.getData('text/plain');
      this.change.emit(pastedVal);
      value.preventDefault();
  }

}
