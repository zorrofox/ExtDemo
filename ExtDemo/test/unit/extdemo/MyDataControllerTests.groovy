package extdemo



import org.junit.*
import grails.test.mixin.*

@TestFor(MyDataController)
@Mock(MyData)
class MyDataControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/myData/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.myDataInstanceList.size() == 0
        assert model.myDataInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.myDataInstance != null
    }

    void testSave() {
        controller.save()

        assert model.myDataInstance != null
        assert view == '/myData/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/myData/show/1'
        assert controller.flash.message != null
        assert MyData.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/myData/list'


        populateValidParams(params)
        def myData = new MyData(params)

        assert myData.save() != null

        params.id = myData.id

        def model = controller.show()

        assert model.myDataInstance == myData
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/myData/list'


        populateValidParams(params)
        def myData = new MyData(params)

        assert myData.save() != null

        params.id = myData.id

        def model = controller.edit()

        assert model.myDataInstance == myData
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/myData/list'

        response.reset()


        populateValidParams(params)
        def myData = new MyData(params)

        assert myData.save() != null

        // test invalid parameters in update
        params.id = myData.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/myData/edit"
        assert model.myDataInstance != null

        myData.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/myData/show/$myData.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        myData.clearErrors()

        populateValidParams(params)
        params.id = myData.id
        params.version = -1
        controller.update()

        assert view == "/myData/edit"
        assert model.myDataInstance != null
        assert model.myDataInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/myData/list'

        response.reset()

        populateValidParams(params)
        def myData = new MyData(params)

        assert myData.save() != null
        assert MyData.count() == 1

        params.id = myData.id

        controller.delete()

        assert MyData.count() == 0
        assert MyData.get(myData.id) == null
        assert response.redirectedUrl == '/myData/list'
    }
}
