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
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/navbar.component.css' />" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/home.component.css' />" />
	<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/details.component.css' />" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/bootstrap.min.css' />" />

</head>
<body style="background: #F2F2F2;">
	<div class="navbar navbar-default" style="margin-bottom: 0">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-left" href="#"> <img
					src="<c:url value='/resources/images/fda.png' />"
					style="width: 80px; padding: 10px 10px 0 0;">
				</a>

			</div>
			<div class="navbar-collapse collapse" id="navbar">
				<ul class="nav navbar-nav">
					<li class="active"><a href="<c:url value='/home'/>">Home</a></li>
					<li><a href="<c:url value='/unassigned'/>">Unassigned
							Cases</a></li>
					<li><a href="<c:url value='/myCases'/>">MyCases</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a href="/home/user"> User<span
							class="sr-only">(current)</span>
					</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="wrapper"></div>
	</div>
	<div class="img-container">
		<div class="img-responsive image-banner">
			<img src="resources/images/lab.png" alt="lab">
			<div class="banner-description">
				<p>This is a brief description of the image.</p>
			</div>
		</div>
		<div class="img-responsive image-banner">
			<img src="resources/images/mouse.jpg" alt="lab">
			<div class="banner-description">
				<p>This is a brief description of the image.</p>
			</div>
		</div>
		<div class="img-responsive image-banner">
			<img src="resources/images/meeting.jpg" alt="lab">
			<div class="banner-description">
				<p>This is a brief description of the image.</p>
			</div>
		</div>
		<div class="img-responsive image-banner">
			<img src="resources/images/pills.jpg" alt="lab">
			<div class="banner-description">
				<p>This is a brief description of the image.</p>
			</div>
		</div>
	</div>
	  <section>
    <div class="container center">
      <div class="row">
        <div class="col-lg-6 middle">
          <div class="circle ">
            <a href="<c:url value='/unassigned'/>"><p>Unassigned Cases</p></a>
          </div>
          <div class="content">
            <p class="middle">Acesss Drug review cases here, that are submitted, but not yet assigned </p>
          </div>
        </div>

        <div class="col-lg-6 middle">
          <div class="circle circle-sm" >
            <a href="<c:url value='/myCases'/>"><p>My Cases</p></a>
          </div>
          <div class="content">
            <p class="middle">Cases assigned to you.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</body>
</html>
