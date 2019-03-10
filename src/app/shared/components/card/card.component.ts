import { Component, Input } from '@angular/core';
import { collapse } from '../../animation/collapse-animate';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [collapse]
})
export class CardComponent {
  @Input() cardTitle: any;

  @Input() isCollapse: boolean = false;

  @Input() collapse: string = "on";

  @Input() clickableHeader: boolean = false;

  private collapseCard() {
    this.collapse === 'on' ? this.collapse = 'off' : this.collapse = 'on';
  }

  private onHeaderClick() {
    if (this.clickableHeader)
      this.collapseCard();
  }
}
