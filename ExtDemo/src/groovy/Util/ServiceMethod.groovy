package Util

import extdemo.Book;

class ServiceMethod {

	def serviceMethods(Object className,String hql){
		ArrayList list = className.executeQuery(hql)
//		for(List ls:list){
//			ls
//			}
		return list.toString()
		}
}
