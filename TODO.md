# TODO

 * [ ] Refactor `Engine.prototype.onCardFlipOver` employing
       [event delegation](https://learn.javascript.ru/event-delegation)
 * [ ] Remove technical comments (`console.log`)
 * [ ] Let `const` not `var`
 * [ ] Get rid of redundant variables
       (`const onCardFlipOver = this.onCardFlipOver;`)
 * [ ] Employ ES6 classes
 * [ ] `Engine.prototype.init` : `push` called twice. `Array#push` is multiary
 * [ ] `cardSetIdList.forEach` : replace with `const cardSet = cardSetIdList.map(...`
 * [ ] Move subcontainer creation to `.render()` to split data
       creation and HTML elements attachment
 * [ ] Double `this.flippedCardQueue.shift();` =>
       `this.flippedCardQueue = this.flippedCardQueue.slice(2)`
 * [ ] Checks in `Engine.prototype.onCardFlipOver` are similar.
       Move to a designated method.
 * [ ] `this.flippedCardQueue[0]/[1] === const [ firstFlipped, secondFlipped ] = this.flippedCardQueue`
 * [ ] Employ CSS animation instead of JS animation
 * [ ] `Engine.prototype.onCardsRemoval`: `count` can be effectively
       replaced with `Array#some`
 * [ ] Remove objects from array instead of nullifying (NB! array indices
       will no longer serve as card id index)
