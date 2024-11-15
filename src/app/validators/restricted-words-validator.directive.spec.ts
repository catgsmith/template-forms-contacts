import { RestrictedWordsValidator } from './restricted-words-validator.directive';
import { FormControl } from '@angular/forms';

describe('RestrictedWordsValidator', () => {
  let directive: RestrictedWordsValidator;

  beforeEach(() => {
    directive = new RestrictedWordsValidator();
  });

  it('should return null if no restricted words are provided', () => {
    directive.restrictedWords = [];
    const control = new FormControl('some text');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return null if the control value is empty', () => {
    directive.restrictedWords = ['forbidden'];
    const control = new FormControl('');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return null if control value does not contain restricted words', () => {
    directive.restrictedWords = ['forbidden'];
    const control = new FormControl('some text');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return validation error if control value contains a restricted word', () => {
    directive.restrictedWords = ['forbidden'];
    const control = new FormControl('this text contains forbidden word');
    const result = directive.validate(control);
    expect(result).toEqual({ restrictedWords: 'forbidden' });
  });

  it('should return validation error with multiple restricted words if found', () => {
    directive.restrictedWords = ['forbidden', 'banned'];
    const control = new FormControl('this text contains forbidden and banned words');
    const result = directive.validate(control);
    expect(result).toEqual({ restrictedWords: 'forbidden, banned' });
  });

  it('should update the restrictedWords input dynamically', () => {
    directive.restrictedWords = ['oldword'];
    let control = new FormControl('this text contains oldword');
    expect(directive.validate(control)).toEqual({ restrictedWords: 'oldword' });

    directive.restrictedWords = ['newword'];
    control = new FormControl('this text contains newword');
    expect(directive.validate(control)).toEqual({ restrictedWords: 'newword' });
  });
});

