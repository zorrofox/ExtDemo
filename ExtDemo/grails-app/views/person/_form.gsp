<%@ page import="extdemo.Person" %>



<div class="fieldcontain ${hasErrors(bean: personInstance, field: 'address', 'error')} ">
	<label for="address">
		<g:message code="person.address.label" default="Address" />
		
	</label>
	<g:textField name="address" value="${personInstance?.address}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: personInstance, field: 'age', 'error')} required">
	<label for="age">
		<g:message code="person.age.label" default="Age" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="age" required="" value="${fieldValue(bean: personInstance, field: 'age')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: personInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="person.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${personInstance?.name}"/>
</div>

