import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  @Input() items: any[] = [];

  constructor(private router: Router) {}

  redirectCard(item: any) {
    let itemId;

    if (item.type === 'artist') {
      itemId = item.id;
    } else {
      itemId = item.artists[0].id;
    }
    this.router.navigate(['/artist', itemId]);
  }
}
