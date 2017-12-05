<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>More Details</title>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/navbar.component.css' />" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/bootstrap.min.css' />" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/casedetails.component.css' />" />
	
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
	
<div class="panel">
  <div class="body-header jumbotron">
    <h1> Case details:</h1>
  </div>
  <div class="row body">
    <div class="col-md-12 content">
      <ul>
        <h1 class="header panel-heading">Drug details:</h1>
        <div class="panel-body well">
          <div class="col-md-6 left-menu">
            <li><p class="panel-sub-heading app-label">Case Number <span>:</span> <h5 class="label-data">${caseDetails.case_id}</h5></li>
            <li><p class="panel-sub-heading app-label">Category <span>:</span><h5 class="label-data">${caseDetails.category}</h5></li>
            <li><p class="panel-sub-heading app-label">Submitted By <span>:</span> <h5 class="label-data">${caseDetails.submitter}</h5></li>
          </div>
          <div class="col-md-6 right-menu">
            <li><p class="panel-sub-heading app-label">Date Received <span>:</span> <h5 class="label-data">${caseDetails.r_date}</h5></li>
            <li><p class="panel-sub-heading app-label">Date Assigned <span>:</span> <h5 class="label-data">${caseDetails.a_date}</h5></li>
            <li><p class="panel-sub-heading app-label">Status <span>:</span> <h5 class="label-data">${caseDetails.status}</h5></li>
          </div>
        </div>
        <div >
          <h4 class="panel-heading">Description: </h4>
          <p class="panel-body well well2">${caseDetails.detailed_desc}</p>
        </div>

        <div >
          <h4 class="panel-heading">Reviewer comments:</h4>
          <p class="panel-body well">Drug was submitted on ${caseDetails.r_date } and ready of the further process.</p>
        </div>
        <div >
          <h4 class="panel-heading">Documents submitted:</h4>
          <ul class="panel-body well">
            <li><a>index.pptx</a></li>
            <li><a>cost.ts</a></li>
          </ul>
        </div>
      </ul>
    </div>
  </div>
</div>
</body>
</html>