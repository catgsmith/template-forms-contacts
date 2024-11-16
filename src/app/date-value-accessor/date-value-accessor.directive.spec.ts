import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DateValueAccessorDirective } from './date-value-accessor.directive';

describe('DateValueAccessorDirective', () => {
  let directive: DateValueAccessorDirective;
  let elementRefMock: ElementRef;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: {
        value: ''
      }
    } as ElementRef;

    TestBed.configureTestingModule({
      declarations: [DateValueAccessorDirective],
      providers: [
        { provide: ElementRef, useValue: elementRefMock }
      ]
    });

    directive = new DateValueAccessorDirective(elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('writeValue', () => {
    it('should set the input value to the formatted date if a Date object is provided', () => {
      const testDate = new Date('2024-11-16T00:00:00Z');
      directive.writeValue(testDate);
      expect(elementRefMock.nativeElement.value).toBe('2024-11-16');
    });

    it('should not set the input value if the value is not a Date object', () => {
      directive.writeValue('not-a-date');
      expect(elementRefMock.nativeElement.value).toBe('');
    });
  });

/*   describe('registerOnChange', () => {
    it('should call the provided function with the Date value when the input event occurs', () => {
      const mockFn = jasmine.createSpy('onChangeSpy');
      directive.registerOnChange(mockFn);

      const testDate = new Date('2024-11-16T00:00:00Z');
      directive.onChange(testDate);

      expect(mockFn).toHaveBeenCalledWith(testDate);
    });
  }); */

/*   describe('registerOnTouched', () => {
    it('should call the provided function when the blur event occurs', () => {
      const mockFn = jasmine.createSpy('onTouchedSpy');
      directive.registerOnTouched(mockFn);

      directive.onTouched();

      expect(mockFn).toHaveBeenCalled();
    });
  }); */

/*   describe('HostListener behavior', () => {
    it('should trigger onChange with the correct value on input event', () => {
      const mockFn = jasmine.createSpy('onChangeSpy');
      directive.registerOnChange(mockFn);

      const testDate = new Date('2024-11-16T00:00:00Z');
      elementRefMock.nativeElement.valueAsDate = testDate;

      const inputEvent = new Event('input');
      directive.onChange(elementRefMock.nativeElement.valueAsDate);

      expect(mockFn).toHaveBeenCalledWith(testDate);
    }); */

/*     it('should trigger onTouched on blur event', () => {
      const mockFn = jasmine.createSpy('onTouchedSpy');
      directive.registerOnTouched(mockFn);

      const blurEvent = new Event('blur');
      directive.onTouched();

      expect(mockFn).toHaveBeenCalled();
    });
  }); */
});
