import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfileIconSelectorComponent } from './profile-icon-selector.component';
import { profileIconNames } from './profile-icon-names';

describe('ProfileIconSelectorComponent', () => {
  let component: ProfileIconSelectorComponent;
  let fixture: ComponentFixture<ProfileIconSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileIconSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileIconSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display all icons when `showAllIcons` is true', () => {
    component.showAllIcons = true;
    fixture.detectChanges();

    const iconElements = fixture.debugElement.queryAll(By.css('ul li img'));
    expect(iconElements.length).toBe(profileIconNames.length);
    iconElements.forEach((img, index) => {
      expect(img.nativeElement.src).toContain(`/assets/profile/${profileIconNames[index]}`);
    });
  });

  it('should display only the selected icon when `showAllIcons` is false', () => {
    const selectedIcon = profileIconNames[0];
    component.showAllIcons = false;
    component.selectedIcon = selectedIcon;
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img.selected'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.src).toContain(`/assets/profile/${selectedIcon}`);
    expect(fixture.debugElement.query(By.css('ul'))).toBeNull();
  });

  it('should toggle `showAllIcons` to false and set `selectedIcon` when an icon is clicked', () => {
    component.showAllIcons = true;
    fixture.detectChanges();

    const iconElements = fixture.debugElement.queryAll(By.css('ul li img'));
    const iconToSelect = profileIconNames[1];
    const iconElement = iconElements[1]; // Select the second icon

    iconElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showAllIcons).toBe(false);
    expect(component.selectedIcon).toBe(iconToSelect);
  });

  it('should toggle `showAllIcons` to true when the selected icon is clicked', () => {
    component.showAllIcons = false;
    component.selectedIcon = profileIconNames[0];
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img.selected'));
    imgElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showAllIcons).toBe(true);
    expect(component.selectedIcon).toBe(profileIconNames[0]); // Selected icon should remain the same
  });

  it('should add "selected" class to the selected icon', () => {
    component.showAllIcons = true;
    component.selectedIcon = profileIconNames[0];
    fixture.detectChanges();

    const iconElements = fixture.debugElement.queryAll(By.css('ul li img'));
    const selectedIconElement = iconElements[0];

    expect(selectedIconElement.nativeElement.classList).toContain('selected');
  });
});

