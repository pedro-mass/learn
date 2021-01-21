import { downTo } from './helpers'

export class Bottles {
  verse(num) {
    const phrases = {
      opener: '%p %numBottles of beer on the wall, %p %numBottles of beer.\n',
      normal: {
        transition: 'Take one down and pass it around, ',
        end: '%p %numBottles of beer on the wall.\n',
      },
      oneLeft: {
        transition: 'Take it down and pass it around, ',
        end: 'no more bottles of beer on the wall.\n',
      },
      zero:
        'No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n',
    }

    const injectNum = (phrase, num) =>
      phrase
        .replace(/%p/g, num)
        .replace(/%numBottles/g, num > 1 ? 'bottles' : 'bottle')

    return num === 0
      ? phrases.zero
      : injectNum(phrases.opener, num) +
          injectNum(
            num - 1 > 0
              ? phrases.normal.transition + phrases.normal.end
              : phrases.oneLeft.transition + phrases.oneLeft.end,
            num - 1
          )
  }

  verses(start, stop) {
    return downTo(start, stop).map(this.verse).join('\n')
  }

  song() {
    return this.verses(99, 0)
  }
}
