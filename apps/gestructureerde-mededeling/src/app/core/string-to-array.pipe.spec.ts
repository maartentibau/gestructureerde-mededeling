import { StringToArrayPipe } from './string-to-array.pipe';

describe('StringToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new StringToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
