<%@ page import="extdemo.Book" %>



<div class="fieldcontain ${hasErrors(bean: bookInstance, field: 'price', 'error')} required">
	<label for="price">
		<g:message code="book.price.label" default="Price" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="price" required="" value="${fieldValue(bean: bookInstance, field: 'price')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: bookInstance, field: 'publish', 'error')} ">
	<label for="publish">
		<g:message code="book.publish.label" default="Publish" />
		
	</label>
	<g:textField name="publish" value="${bookInstance?.publish}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: bookInstance, field: 'title', 'error')} ">
	<label for="title">
		<g:message code="book.title.label" default="Title" />
		
	</label>
	<g:textField name="title" value="${bookInstance?.title}"/>
</div>

