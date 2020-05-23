/* Error thrown in a try block is caught in the catch block */
try {
    throw new Error('Fail');
} catch(err) {
    console.log('Custom Error:', err.message);
}

/* Error thrown by asynchronous code in a try block wil NOT be caught in the catch block*/
try {
    setTimeout(() => {
        throw new Error('Fail!');
    }, Math.round(Math.random()*100))
} catch(err) {
    console.log('Custom Error:', err.message);
}
