package Util

import extdemo.Book;

class ServiceMethods {

	def serviceMethod(Object className,String hql){
		ArrayList list = className.executeQuery(hql)
//		for(List lt:list){
//			lt
//		}
//		return list.size
//		return list.toString()
		return list
	}
}
