import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profileIconNames } from './profile-icon-names';

@Component({
  selector: 'profile-icon-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (showAllIcons) {
    <ul>
      @for (icon of profileIcons; track $index) {
      <li>
        <img [src]="'/assets/profile/' + icon" (click)="iconSelected(icon)" [alt]="icon" [class.selected]="icon===selectedIcon"/>
      </li>
      }
    </ul>
  } @else {
    <img [src]="'/assets/profile/' + selectedIcon" (click)="showAllIcons = true" [alt]="selectedIcon" class="selected" />
  }
  `,
  styles: [
    `
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      img {
        cursor: pointer;
        width: 100px;
      }
      .selected {
        border-radius: 60px;
        background-color: #e0fecb;
      }
    `,
  ],
})
export class ProfileIconSelectorComponent {
  profileIcons = profileIconNames;
  showAllIcons = true;
  selectedIcon!: string | null;

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
  }
}
