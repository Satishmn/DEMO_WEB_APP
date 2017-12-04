
package jbr.springmvc.dao;

import java.util.List;

import jbr.springmvc.model.Login;
import jbr.springmvc.model.UnAssignedCases;
import jbr.springmvc.model.User;

public interface UserDao {
	void register(User user);
	User validateUser(Login login);
	List<UnAssignedCases> getUnAssignedCases(); 
}