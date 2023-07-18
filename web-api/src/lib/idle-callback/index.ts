/* eslint-disable @typescript-eslint/no-unused-vars */
// Here is example of how to use Background Tasks WEB API:

//  #1 the function we are going to refactor
function log(arr: string[],action: string) {
  const message = action + ': done!';
  arr.push(message);
  alert(message);
  // Do something like sending analytics...
}

function doSomething(arr: string[], action: string) {
  const message = action + ': executing...';
  arr.push(message);
  alert(message);
  // Do something...
  log(arr, action)
}

export function demonstrateSimple (messages: string[]): string[] {
  doSomething(messages, 'SIMPLE operation #1');
  doSomething(messages, 'SIMPLE operation #2');
  console.log('SIMPLE another operation');
  doSomething(messages, 'SIMPLE operation #3');
  return messages;
}

//  We will receive next output:
//  operation #1: executing...
//  operation #1: done!
//  operation #2: executing...
//  operation #2: done!
//  another operation
//  operation #3: executing...
//  operation #3: done!

//  #2 WRONG workaround for log function with setTimeout:
function logSetTimeout(action: string) {
  setTimeout(() => {
    console.log(action + ': done!');
    // Do something like sending analytics...
  }, 1);
}
// Unfortunately, even in this way the problem can't be completely addressed because
// in doSomething() there could be asynchronous functions or event handlers.
// In these cases, in fact, it isn't possible predict when they will be scheduled
// so we can't be sure to execute the secondary tasks after the main ones.

// #3 idleCallback() syntax
// const idleCallbackId = requestIdleCallback(
//   function (idleDeadline) {
//     // True if the callback has been executed because setted 'timeout' has expired.
//     const didTimeout = idleDeadline.didTimeout;
//     // Time remaining to the end of the current idle state.
//     const timeRemaining = idleDeadline.timeRemaining();
//   },
//   {
//     // Maximum delay to execute the passed callback. Optional.
//     timeout: 3000,
//   }
// );

// // Cancel the callback's execution
// cancelIdleCallback(idleCallbackId)

// #4 Refactored log function with idleCallback()
function logIdleCallback(arr: string[], action: string) {
  requestIdleCallback(() => {
    const message = action + ': done!';
    arr.push(message);
    alert(message);
    // Do something like sending analytics...
  })
}

function doSomethingIdleCallback(arr: string[], action: string) {
  const message = action + ': executing...'
  arr.push(message);
  console.log(message);
  // Do something...
  logIdleCallback(arr, action);
}

export function demonstrateIdle (messages: string[]): string[] {
  console.log('===============================');
  doSomethingIdleCallback(messages, 'IDLECB operation #1');
  doSomethingIdleCallback(messages, 'IDLECB operation #2');
  console.log('IDLECB another operation');
  doSomethingIdleCallback(messages, 'IDLECB operation #3');
  console.log('===============================');
  console.log(messages)
  return messages;
}

//  We will receive next output:
//  operation #1: executing...
//  operation #2: executing...
//  another operation
//  operation #3: executing...
//  operation #1: done!
//  operation #2: done!
//  operation #3: done!


function updatePageTitle(fragment: DocumentFragment) {
  if (requestAnimationFrame) {
    requestAnimationFrame(function () {
      document.body.insertBefore(fragment, document.body.firstChild)
    })
  } else {
    document.body.insertBefore(fragment, document.body.firstChild)
  }
}

export function insertPageTitle() {
  requestIdleCallback(function () {
    const documentFragment = document.createDocumentFragment()
    const title = document.createElement('h1')
    title.textContent = 'My title from idle callback'
    documentFragment.appendChild(title)
    updatePageTitle(documentFragment)
  })
}
