
const descent = (fns, args, level = fns.length - 1) => {
	
	let result
	const descend = () => {
		let result
		if (level - 1 >= 0) result = descent(fns, args, level - 1)
		return result
	}
	if (level === 0) result = fns[level](...args)
	else result = fns[level](args, descend)
	return result
}

export const fn = main => {
	
	const key = Symbol()
	let fns = [main]
	let locked = false
	return Object.assign((...args) => descent(fns, args), {
		key: key_get,
		unlock,
		reset
	})
	
	function key_get() {
		
		if (locked) throw new Error(`The key to edit this function may be accessed one time only.`)
		locked = true
		return key
	}

	function unlock(key_) {
		
		if (key_ = key) return {
			push: fns.push.bind(fns),
			set_at: (value, index) => fns[index] = value,
			length: () => fns.length
		}
		else throw new Error('The key to edit this function is not correct.')		
	}
	
	function reset(key_) {
		
		if (key_ = key) fns = [main]
		else throw new Error('The key to edit this function is not correct.')		
	}
}
