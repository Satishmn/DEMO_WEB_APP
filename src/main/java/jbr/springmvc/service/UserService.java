package jbr.springmvc.service;

import java.util.List;

import jbr.springmvc.model.Login;
import jbr.springmvc.model.UnAssignedCases;
import jbr.springmvc.model.User;

public interface UserService {

  void register(User user);

  User validateUser(Login login);
  
  List<UnAssignedCases> getUnAssignedCases();
}