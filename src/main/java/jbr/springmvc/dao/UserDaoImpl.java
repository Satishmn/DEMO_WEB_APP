package jbr.springmvc.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import jbr.springmvc.model.Login;
import jbr.springmvc.model.UnAssignedCases;
import jbr.springmvc.model.User;

public class UserDaoImpl implements UserDao {
  @Autowired
  DataSource datasource;
  @Autowired
  JdbcTemplate jdbcTemplate;
  
  public void register(User user) {
    String sql = "insert into users values(?,?,?,?,?,?,?)";
    jdbcTemplate.update(sql, new Object[] { user.getUsername(), user.getPassword(), user.getFirstname(),
    user.getLastname(), user.getEmail(), user.getAddress(), user.getPhone() });
    }
  
    public User validateUser(Login login) {
    String sql = "select * from users where username='" + login.getUsername() + "' and password='" + login.getPassword()
    + "'";
    List<User> users = jdbcTemplate.query(sql, new UserMapper());
    return users.size() > 0 ? users.get(0) : null;
    }

    
  public List<UnAssignedCases> getUnAssignedCases() {
//	  String queryString ="select a.case_id case_id, "
//	  		+ "nvl(b.category_desc,' ') category,"
//	  		+ "nvl(c.name,' ') name,"
//	  		+ "nvl(d.channel_name,' ') channel" + 
//		 		" ,e.company_name submitter,"
//		 		+ "nvl(f.status_description,' ') status,"
//		 		+ "a.received_date r_date" + 
//		 		"      ,nvl(a.assigned_date,' ') a_date,"
//		 		+ "a.drug_name drug_name,"
//		 		+ "a.drug_description drug_desc,"
//		 		+ "nvl(a.reviewer_comments,' ') rev_comments" + 
//		 		"      ,nvl(a.case_documents,' ') case_docs,"
//		 		+ "nvl(a.approved_date,' ') ap_date,"
//		 		+ "nvl(a.detailed_description,' ') detailed_desc" + 
//		 		" from CASE_INFORMATION a,CASE_CATEGORIES b, CASE_PEOPLE c, CASE_CHANNELS d, CASE_COMPANIES e, CASE_STATUS f" + 
//		 		"where a.category_id=b.category_id" + 
//		 		"  and a.person_id=c.person_id" + 
//		 		"  and a.channel_id=d.channel_id" + 
//		 		"  and a.company_id=e.company_id" + 
//		 		"  and a.status_id=f.status_id" + 
//		 		"  and c.name is null" + 
//		 		"order by a.case_id";
//	
	  
	  String queryString ="select a.case_id case_id, nvl(b.category_desc,' ') category,nvl(c.name,' ') name,nvl(d.channel_name,' ') channel\n" + 
		 		"      ,e.company_name submitter,nvl(f.status_description,' ') status,a.received_date r_date\n" + 
		 		"      ,nvl(a.assigned_date,' ') a_date,a.drug_name drug_name,a.drug_description drug_desc,nvl(a.reviewer_comments,' ') rev_comments\n" + 
		 		"      ,nvl(a.case_documents,' ') case_docs,nvl(a.approved_date,' ') ap_date,nvl(a.detailed_description,' ') detailed_desc\n" + 
		 		" from CASE_INFORMATION a,CASE_CATEGORIES b, CASE_PEOPLE c, CASE_CHANNELS d, CASE_COMPANIES e, CASE_STATUS f\n" + 
		 		"where a.category_id=b.category_id(+)\n" + 
		 		"  and a.person_id=c.person_id(+)\n" + 
		 		"  and a.channel_id=d.channel_id(+)\n" + 
		 		"  and a.company_id=e.company_id(+)\n" + 
		 		"  and a.status_id=f.status_id(+)\n" + 
		 		"  and c.name is null\n" + 
		 		"order by a.case_id";
	  
	    List<UnAssignedCases> usAssignedCases = jdbcTemplate.query(queryString, new UnAssignedCasesMapper());
	    return usAssignedCases.size() > 0 ? usAssignedCases : null;
	    }
  }
  
  class UserMapper implements RowMapper<User> {
  public User mapRow(ResultSet rs, int arg1) throws SQLException {
    User user = new User();
    user.setUsername(rs.getString("username"));
    user.setPassword(rs.getString("password"));
    user.setFirstname(rs.getString("firstname"));
    user.setLastname(rs.getString("lastname"));
    user.setEmail(rs.getString("email"));
    user.setAddress(rs.getString("address"));
    user.setPhone(rs.getInt("phone"));
    return user;
  }
	  }
  
  class UnAssignedCasesMapper implements RowMapper<UnAssignedCases> {
  public UnAssignedCases mapRow(ResultSet rs, int arg1) throws SQLException {
	  
	UnAssignedCases usAssignedCases = new UnAssignedCases();
	usAssignedCases.setCase_id(rs.getString("case_id"));
	usAssignedCases.setCategory(rs.getString("category"));
	usAssignedCases.setName(rs.getString("name"));
	usAssignedCases.setChannel(rs.getString("channel"));
	usAssignedCases.setSubmitter(rs.getString("submitter"));
	usAssignedCases.setStatus(rs.getString("status"));
	usAssignedCases.setR_date(rs.getString("r_date"));
	usAssignedCases.setA_date(rs.getString("a_date"));
	usAssignedCases.setDrug_name(rs.getString("drug_name"));
	usAssignedCases.setDrug_desc(rs.getString("drug_desc"));
	usAssignedCases.setRev_comments(rs.getString("rev_comments"));
	usAssignedCases.setCase_docs(rs.getString("case_docs"));
	usAssignedCases.setAp_date(rs.getString("ap_date"));
	usAssignedCases.setDetailed_desc(rs.getString("detailed_desc"));

    return usAssignedCases;
  }
  }
