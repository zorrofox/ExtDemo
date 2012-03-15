<%@ page import="extdemo.Author" %>



<div class="fieldcontain ${hasErrors(bean: authorInstance, field: 'age', 'error')} required">
	<label for="age">
		<g:message code="author.age.label" default="Age" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="age" required="" value="${fieldValue(bean: authorInstance, field: 'age')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: authorInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="author.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${authorInstance?.name}"/>
</div>

