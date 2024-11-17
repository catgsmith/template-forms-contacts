import { CommonModule } from '@angular/common';
import { Component, Provider, forwardRef } from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true,
}

@Component({
  selector: 'profile-icon-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (showAllIcons) {
    <ul>
      @for (icon of profileIcons; track $index) {
      <li>
        <img [src]="'/assets/profile/{{icon}}'" (click)="iconSelected(icon)" [alt]="icon" [class.selected]="icon===selectedIcon"/>
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
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  profileIcons = profileIconNames;
  showAllIcons: boolean = true; 
  selectedIcon!: string | null;

  onChange!: Function;
  onTouched!: Function;

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }

  writeValue(icon: string | null) {
    this.selectedIcon = icon;

    if (icon && icon !== '')
      this.showAllIcons = false;
    else 
      this.showAllIcons = true;
    
  }

  registerOnChange(fn: Function) {
    this.onChange = (icon: string) => { fn(icon); }
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
}
