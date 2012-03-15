
<%@ page import="extdemo.MyData" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'myData.label', default: 'MyData')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
		
		<link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css" /> 
		<link rel="stylesheet" type="text/css" href="../examples/ux/css/CheckHeader.css" /> 
		<style type="text/css"> 
        #search-results a { 
            color: #385F95; 
            font:bold 11px tahoma, arial, helvetica, sans-serif; 
            text-decoration:none; 
        } 
        .add { 
            background-image:url(../../examples/shared/icons/fam/cog.gif) !important; 
        } 
        #search-results a:hover { 
            text-decoration:underline; 
        } 
         
        #search-results p { 
            margin:3px !important; 
        } 
         
        .search-item { 
            font:normal 11px tahoma, arial, helvetica, sans-serif; 
            padding:3px 10px 3px 10px; 
            border:1px solid #fff; 
            border-bottom:1px solid #eeeeee; 
            white-space:normal; 
            color:#555; 
        } 
        .search-item h3 { 
            display:block; 
            font:inherit; 
            font-weight:bold; 
            color:#222; 
        } 

        .search-item h3 span { 
            float: right; 
            font-weight:normal; 
            margin:0 0 5px 5px; 
            width:100px; 
            display:block; 
            clear:none; 
        } 
         
        .x-form-clear-trigger { 
            background-image: url(../../resources/themes/images/default/form/clear-trigger.gif); 
        } 
         
        .x-form-search-trigger { 
            background-image: url(../../resources/themes/images/default/form/search-trigger.gif); 
        } 
    </style> 
	<script type="text/javascript" src="../bootstrap.js"></script> 
	<script type="text/javascript" src="../locale/ext-lang-zh_CN.js"></script> 
	<script type="text/javascript" src="../extjs/editgrid.js"></script> 
		
	</head>
	<body>
		<a href="#list-myData" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		
		
		<div id="demo"></div> 
		
		
		
	</body>
</html>
