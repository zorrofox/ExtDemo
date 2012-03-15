
<%@ page import="extdemo.MyData" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'myData.label', default: 'MyData')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-myData" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-myData" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list myData">
			
				<g:if test="${myDataInstance?.addtime}">
				<li class="fieldcontain">
					<span id="addtime-label" class="property-label"><g:message code="myData.addtime.label" default="Addtime" /></span>
					
						<span class="property-value" aria-labelledby="addtime-label"><g:formatDate date="${myDataInstance?.addtime}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${myDataInstance?.author}">
				<li class="fieldcontain">
					<span id="author-label" class="property-label"><g:message code="myData.author.label" default="Author" /></span>
					
						<span class="property-value" aria-labelledby="author-label"><g:fieldValue bean="${myDataInstance}" field="author"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${myDataInstance?.checked}">
				<li class="fieldcontain">
					<span id="checked-label" class="property-label"><g:message code="myData.checked.label" default="Checked" /></span>
					
						<span class="property-value" aria-labelledby="checked-label"><g:formatBoolean boolean="${myDataInstance?.checked}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${myDataInstance?.hits}">
				<li class="fieldcontain">
					<span id="hits-label" class="property-label"><g:message code="myData.hits.label" default="Hits" /></span>
					
						<span class="property-value" aria-labelledby="hits-label"><g:fieldValue bean="${myDataInstance}" field="hits"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${myDataInstance?.title}">
				<li class="fieldcontain">
					<span id="title-label" class="property-label"><g:message code="myData.title.label" default="Title" /></span>
					
						<span class="property-value" aria-labelledby="title-label"><g:fieldValue bean="${myDataInstance}" field="title"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${myDataInstance?.id}" />
					<g:link class="edit" action="edit" id="${myDataInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
