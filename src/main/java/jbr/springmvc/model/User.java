package jbr.springmvc.model;
//--PERSON_ID, --DESIGNATION_ID, --NAME, --ADDRESS, --PHONE_NUMBER, --EMAIL, --USERNAME, --PASSWORD,
public class User {

  private String person_id;
  private String designation_id;
  private String username;
  private String password;
  private String name;
  //private String lastname;
  private String email;
  private String address;
  private String phone;
  
	public String getPerson_id() {
		return person_id;
	}
	public void setPerson_id(String person_id) {
		this.person_id = person_id;
	}
	public String getDesignation_id() {
		return designation_id;
	}
	public void setDesignation_id(String designation_id) {
		this.designation_id = designation_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
  


}