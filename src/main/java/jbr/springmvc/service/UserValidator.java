package jbr.springmvc.service;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import jbr.springmvc.model.Login;

@Component
public class UserValidator implements Validator {
//	@Autowired
//	UserService userService;

	@Override
	public boolean supports(Class<?> clazz) {
		return Login.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		ValidationUtils.rejectIfEmpty(errors, "username", "username.required");
		ValidationUtils.rejectIfEmpty(errors, "password", "password.required");
		
	//	Login login = (Login) obj;
		
/*		User user = userService.validateUser(login);
		if(StringUtils.isEmpty(user)) {
			 errors.rejectValue("username", "Username or Password is wrong!!");
		}*/
	}
	
}
