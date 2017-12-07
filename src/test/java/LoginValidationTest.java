import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;

import jbr.springmvc.model.Login;
import jbr.springmvc.service.UserValidator;

public class LoginValidationTest {

    
    @Test
    public void testValidationWithValidLogin() {
    	UserValidator userValidatorTest = new UserValidator();
     
        Login login = new Login();
        login.setUsername("abcd1234");
        login.setPassword("p12345678");
        
        Errors errors = new BeanPropertyBindingResult(login, "validLogin");
        userValidatorTest.validate(login, errors);

        assertFalse(errors.hasErrors()); 
    }

    
    @Test
    public void testValidationWithEmptyUserNameLogin() {
    	UserValidator userValidatorTest = new UserValidator();
     
        Login login = new Login();
        login.setUsername("");
        login.setPassword("p12345678");
        
        Errors errors = new BeanPropertyBindingResult(login, "InvalidLogin");
        userValidatorTest.validate(login, errors);

        assertTrue(errors.hasErrors());
        assertNotNull(errors.getFieldError("username"));
    }
    
}