package extdemo

import org.springframework.dao.DataIntegrityViolationException

class MyDataController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [myDataInstanceList: MyData.list(params), myDataInstanceTotal: MyData.count()]
    }

    def create() {
        [myDataInstance: new MyData(params)]
    }

    def save() {
        def myDataInstance = new MyData(params)
        if (!myDataInstance.save(flush: true)) {
            render(view: "create", model: [myDataInstance: myDataInstance])
            return
        }

		flash.message = message(code: 'default.created.message', args: [message(code: 'myData.label', default: 'MyData'), myDataInstance.id])
        redirect(action: "show", id: myDataInstance.id)
    }

    def show() {
        def myDataInstance = MyData.get(params.id)
        if (!myDataInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'myData.label', default: 'MyData'), params.id])
            redirect(action: "list")
            return
        }

        [myDataInstance: myDataInstance]
    }

    def edit() {
        def myDataInstance = MyData.get(params.id)
        if (!myDataInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'myData.label', default: 'MyData'), params.id])
            redirect(action: "list")
            return
        }

        [myDataInstance: myDataInstance]
    }

    def update() {
        def myDataInstance = MyData.get(params.id)
        if (!myDataInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'myData.label', default: 'MyData'), params.id])
            redirect(action: "list")
            return
        }

        if (params.version) {
            def version = params.version.toLong()
            if (myDataInstance.version > version) {
                myDataInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'myData.label', default: 'MyData')] as Object[],
                          "Another user has updated this MyData while you were editing")
                render(view: "edit", model: [myDataInstance: myDataInstance])
                return
            }
        }

        myDataInstance.properties = params

        if (!myDataInstance.save(flush: true)) {
            render(view: "edit", model: [myDataInstance: myDataInstance])
            return
        }

		flash.message = message(code: 'default.updated.message', args: [message(code: 'myData.label', default: 'MyData'), myDataInstance.id])
        redirect(action: "show", id: myDataInstance.id)
    }

    def delete() {
        def myDataInstance = MyData.get(params.id)
        if (!myDataInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'myData.label', default: 'MyData'), params.id])
            redirect(action: "list")
            return
        }

        try {
            myDataInstance.delete(flush: true)
			flash.message = message(code: 'default.deleted.message', args: [message(code: 'myData.label', default: 'MyData'), params.id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
			flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'myData.label', default: 'MyData'), params.id])
            redirect(action: "show", id: params.id)
        }
    }
}
