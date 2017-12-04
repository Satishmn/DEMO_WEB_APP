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
<link  rel="stylesheet" type="text/css" href="<c:url value='login.component.css' />"
	 />
<!-- Static navbar -->
<!-- <nav class="navbar navbar-default"> -->
<div class="container-fluid">
	<div class="navbar-header">
		<a href="#" class="navbar-left"><img
			style="width: 165px; padding: 16px 0;"
			src="fda.png"></a> <a class="navbar-brand">Drug
			Review System</a>
	</div>
	<div id="navbar" class="navbar-collapse collapse" >
		<ul class="nav navbar-right">
			<img style="width: 300px; padding: 16px 0;"
				src="fda2.png">
		</ul>

	</div>
	<!--/.nav-collapse -->
</div>
<!--/.container-fluid 
</nav> --> 

</head>
<body>
	<div class="container">
		<div class="wrapper">
			<form:form id="loginForm" modelAttribute="login"
				action="loginProcess" method="post">
				<table align="center">
					<tr>
						<td><form:label cssClass="form-label" path="username">Username2 : </form:label></td>
						<td><form:input cssClass="form-control" path="username" name="username" id="username" />
						</td>
					</tr>
					<tr>
						<td><form:label cssClass="form-label" path="password">Password2 :</form:label></td>
						<td><form:password cssClass="form-control" path="password" name="password"
								id="password" /></td>
					</tr>
					<tr>
						<td></td>
						<td align="left"><form:button  id="login" name="login" cssClass="btn btn-lg btn-primary btn-block">Login</form:button>
						</td>
					</tr>
					<tr></tr>
					<tr>
						<td></td>
						<td><a href="home.jsp">Home</a></td>
					</tr>
				</table>
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