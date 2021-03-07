# haiku-detect

For detecting and formatting haikus

## usage

```
> var haiku = require("./index.js")
undefined
> haiku.detect("are you suggesting that instead of single lines haikus are preferred?")
true
> haiku.format("are you suggesting that instead of single lines haikus are preferred?")
[ 'are you suggesting ',
  'that instead of single lines ',
  'haikus are preferred?' ]
> haiku.detect("What about sentences that cannot be formed into haikus?");
false
> haiku.format("What about sentences that cannot be formed into haikus?");
[]
```
