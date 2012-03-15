<%@ page import="extdemo.MyData" %>



<div class="fieldcontain ${hasErrors(bean: myDataInstance, field: 'addtime', 'error')} required">
	<label for="addtime">
		<g:message code="myData.addtime.label" default="Addtime" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="addtime" precision="day"  value="${myDataInstance?.addtime}"  />
</div>

<div class="fieldcontain ${hasErrors(bean: myDataInstance, field: 'author', 'error')} ">
	<label for="author">
		<g:message code="myData.author.label" default="Author" />
		
	</label>
	<g:textField name="author" value="${myDataInstance?.author}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: myDataInstance, field: 'checked', 'error')} ">
	<label for="checked">
		<g:message code="myData.checked.label" default="Checked" />
		
	</label>
	<g:checkBox name="checked" value="${myDataInstance?.checked}" />
</div>

<div class="fieldcontain ${hasErrors(bean: myDataInstance, field: 'hits', 'error')} required">
	<label for="hits">
		<g:message code="myData.hits.label" default="Hits" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="hits" required="" value="${fieldValue(bean: myDataInstance, field: 'hits')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: myDataInstance, field: 'title', 'error')} ">
	<label for="title">
		<g:message code="myData.title.label" default="Title" />
		
	</label>
	<g:textField name="title" value="${myDataInstance?.title}"/>
</div>

