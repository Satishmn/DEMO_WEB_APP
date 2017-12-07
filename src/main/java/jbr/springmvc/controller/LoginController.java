package jbr.springmvc.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import jbr.springmvc.model.Login;
import jbr.springmvc.model.User;
import jbr.springmvc.service.UserService;
import jbr.springmvc.service.UserValidator;

@Controller
public class LoginController {
	
	@Autowired
    private UserValidator userValidator;
	   
	@Autowired
	UserService userService;
	
    @InitBinder("login")
    protected void initBinder(final WebDataBinder binder){
        binder.setValidator(userValidator);
    }
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView showLogin(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView("login");
		mav.addObject("login", new Login());
		return mav;
	}
	
	@RequestMapping(value = "/loginProcess", method = RequestMethod.POST)
	public ModelAndView loginProcess(HttpServletRequest request, HttpServletResponse response,
			@Valid @ModelAttribute("login") Login login, BindingResult result) {
		ModelAndView mav = null;	
		
		if (result.hasErrors()) {
			System.out.println("hasErrors called:");
            return new ModelAndView("login");
        }
		
		User user = userService.validateUser(login);
		
		if(user == null) {
			System.out.println("user == null");
			mav = new ModelAndView("login");
			mav.addObject("message", "Username or Password is wrong!!");
			return mav;
		}
			
		//no errors
		System.out.println("no errors detected:");
		mav = new ModelAndView("welcome");
		mav.addObject("name", user.getName());
		return mav;
		
		/*
		
		String validationMsg= isValidLoginFormat(login);
		if ( validationMsg==null)
		{
			User user = userService.validateUser(login);
			if (null != user) {
				mav = new ModelAndView("welcome");
				mav.addObject("name", user.getName());
			} else {
				mav = new ModelAndView("login");
				mav.addObject("message", "Username or Password is wrong!!");
			}
		}
		else
		{
			mav = new ModelAndView("login");
			mav.addObject("message", validationMsg);
		}
		//		mav = new ModelAndView("welcome");
		//		mav.addObject("firstname", "Test Username");

		return mav;
		
		*/
	}
	
	@RequestMapping(value = "/unassigned", method = RequestMethod.GET)
	public ModelAndView showUnAssigned(HttpServletRequest request, HttpServletResponse response) {
		
		ModelAndView mav = null;
		mav = new ModelAndView("unassigned");
		mav.addObject("unAssignedCasesList", userService.getUnAssignedCases());
		
		return mav;
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public ModelAndView showHome(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView("welcome");
		mav.addObject("firstname", "Test Username");
		return mav;
	}
	
	
	@RequestMapping(value = "/myCases", method = RequestMethod.GET)
	public ModelAndView showAssigned(HttpServletRequest request, HttpServletResponse response) {
		
		ModelAndView mav = null;
		mav = new ModelAndView("myCases");
		mav.addObject("assignedCasesList", userService.getAssignedCases());
		
		return mav;
	}
	
	
	@RequestMapping(value = "/caseDetails", method = RequestMethod.GET)
	public ModelAndView showcaseDetails(HttpServletRequest request, HttpServletResponse response, String caseID) {
		
		ModelAndView mav = null;
		mav = new ModelAndView("caseDetails");
		mav.addObject("caseDetails", userService.getCaseDetails(caseID));
		
		return mav; 
		
	}
	
/*	public String isValidLoginFormat(Login login)
	{
		String validationMessageStr=null;
		
		if(login !=null)
		{
			if (login.getUsername()!=null || login.getPassword() !=null) 
			{
				if (login.getUsername().trim().length() >0  
						&& login.getPassword().trim().length() >0 && !(login.getPassword().trim().length() <8))
				{
					validationMessageStr =null;
				}
				else
				{
					validationMessageStr ="Username or Password should have minimun length(8) !";
				}
			}
			else
			{
				validationMessageStr ="Username and Password cannot be null";
			}
		}
		else
		{
			validationMessageStr ="Please enter valid Login credentails";
		}
		return validationMessageStr;
	}*/
}