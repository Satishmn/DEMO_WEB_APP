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

		<div class="wrapper">
			<div class="jumbotron" style="background: #1F2E46; color: #c9c9c9;">
				<h1 class="header">My Cases</h1>
			</div>
			<div>
			<div class="row">
					<div class="col-md-12">
						<div class="container">
						<h3 class="table-header"
							style="margin-bottom: 20px; padding: 0; font-weight: 400">List
							of Assigned cases</h3>
							<div class="table-responsive">
								<table class="table spacing-table" data-toggle="table">
									<thead>
										<tr>
											<th>Case no.</th>
											<th>Drug Name</th>
											<th>Description</th>
											<th>Category</th>
											<th>Submitted By</th>
											<th>Date Received</th>
											<th>Channel</th>
										</tr>
									</thead>
									<tbody>
										<c:forEach items="${assignedCasesList}" var="assignedCase">
											<tr>
												<td><c:url value="editProduct" var="uaCaseURL">
														<c:param name="case_id" value="${assignedCase.case_id}" />
													</c:url> <a href="${caseURL}"><c:out
															value="${assignedCase.case_id}" /></a></td>
												<td>${assignedCase.drug_name}</td>
												<td>${assignedCase.drug_desc}</td>
												<td>${assignedCase.category}</td>
												<td>${assignedCase.submitter}</td>
												<td>${assignedCase.r_date}</td>
												<td>${assignedCase.channel}</td>
												<td><a
													href="deleteProduct?code=${assignedCase.case_id}"> <img
														src="<c:url value='/resources/images/personIcon.png'/>"
														height="25" width="25" />
												</a></td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
