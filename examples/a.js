
import { hello } from '../source/hello.js'

export const a = () => {
	
	const fn = hello
	const { push } = fn.unlock(fn.key())
	push((args, next) => console.log('Hello !!!!!'))
	hello()
}

// when module `b` imports and calls the function `hello`,
// it will also print "Hello !!!!!" instead of the default message "Hello"
