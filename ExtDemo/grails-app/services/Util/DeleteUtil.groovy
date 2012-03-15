package Util

import extdemo.Person;

class DeleteUtil {
		def results
		def delMethod(id){
		try {
			if(id > 0){
				results = Person.findById(id)
				}
			return results
		} catch (Exception e) {
			println e.toString()
			return null
		}
	}
}
