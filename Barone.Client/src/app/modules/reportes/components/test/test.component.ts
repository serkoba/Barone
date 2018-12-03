import { Component, OnInit } from '@angular/core';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, ThemePalette } from '@angular/material';


export interface Person {
  name: string;
}

export interface DemoColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  tabIndex = 0;
  visible = true;
  color = '';
  selectable = true;
  removable = true;
  addOnBlur = true;
  message = '';

  // Enter, comma, semi-colon
  separatorKeysCodes = [ENTER, COMMA, 186];

  selectedPeople = null;

  people: Person[] = [
    { name: 'Kara' },
    { name: 'Jeremy' },
    { name: 'Topher' },
    { name: 'Elad' },
    { name: 'Kristiyan' },
    { name: 'Paul' }
  ];

  availableColors: DemoColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  displayMessage(message: string): void {
    this.message = message;
  }

  public subir() {
    var water = document.getElementById("liquid");
    var beerFoam = document.getElementById("beerFoam");
    water.style.height = '35px';
    beerFoam.style.bottom = '100px';
  }
  ngOnInit() {


    // var cnt = document.getElementById("count");
    // var water = document.getElementById("liquid");

    // var percent = parseInt(cnt.innerText);
    // var interval;

    // interval = setInterval(function () {
    //   percent = percent + 1;
    //   cnt.innerHTML = percent.toString();
    //   water.style.transform = 'translate(0' + ',' + (100 - percent) + '%)';
    //   water.style.height = '100'
    //   if (percent == 50) {
    //     clearInterval(interval);
    //   }
    // }, 60);

    //   $('.pour') //Pour Me Another Drink, Bartender!
    //   .delay(2000)
    //   .animate({
    //     height: '360px'
    //     }, 1500)
    //   .delay(1600)
    //   .slideUp(500);

    // $('#liquid') // I Said Fill 'Er Up!
    //   .delay(3400)
    //   .animate({
    //     height: '170px'
    //   }, 2500);

    // $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
    //   .delay(3400)
    //   .animate({
    //     bottom: '200px'
    //     }, 2500);
  }

  add(event: MatChipInputEvent): void {
    const { input, value } = event;

    // Add our person
    if ((value || '').trim()) {
      this.people.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(person: Person): void {
    const index = this.people.indexOf(person);

    if (index >= 0) {
      this.people.splice(index, 1);
    }
  }

  removeColor(color: DemoColor) {
    let index = this.availableColors.indexOf(color);

    if (index >= 0) {
      this.availableColors.splice(index, 1);
    }

    index = this.selectedColors.indexOf(color.name);

    if (index >= 0) {
      this.selectedColors.splice(index, 1);
    }
  }

  toggleVisible(): void {
    this.visible = false;
  }
  selectedColors: string[] = ['Primary', 'Warn'];
  selectedColor = 'Accent';
}
