<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login</title>
<link  rel="stylesheet" type="text/css" href="<c:url value='/resources/css/login.component.css' />" />
<link  rel="stylesheet" type="text/css" href="<c:url value='/resources/css/bootstrap.min.css' />" />

<!-- Static navbar -->


<header>
	<!-- Static navbar -->
	<nav class="navbar navbar-default">
	<div class="container-fluid">
	<div class="navbar-header">
	<a href="#" class="navbar-left">
			<img style="width: 165px; padding: 16px 0;" src="<c:url value='/resources/images/fda.png' />">
		</a>
	<a class="navbar-brand">Drug
	Review System</a>
	</div>
	<div id="navbar" class="navbar-collapse collapse">
	<ul class="nav navbar-right">
	<img style="width: 300px; padding: 16px 0;" src="<c:url value='/resources/images/fda2.png' />" >
	</ul>
	</div>
	</div>
	</nav>
</header>

</head>
<body>
	<div class="container">
		<div class="wrapper">
			<form:form class="form-styles form-signin" id="loginForm" modelAttribute="login"
				action="loginProcess" method="post">
				<h2 class="form-signin-heading" align="center"> Welcome, Please Login  </h2>
				<hr>
				<form:label cssClass="form-label" path="username">Username</form:label>
					<input type="text" placeholder="username" class="form-control" name="username" />
					<form:errors path="username" cssStyle="color: #ff0000;" /><br>
					<form:label cssClass="form-label" path="password">Password</form:label>
					<input type="password" class="form-control" name="password" placeholder="password"/>
					<form:errors path="password" cssStyle="color: #ff0000;" /><br>
					<a name="login" id ="login"><form:button class="btn btn-lg btn-primary btn-block" >Login</form:button></a>
			</form:form>
		</div>
	</div>
	<table align="center">
		<tr>
			<td style="font-style: italic; color: red;">${message}</td>
		</tr>
	</table>
</body>
</html>