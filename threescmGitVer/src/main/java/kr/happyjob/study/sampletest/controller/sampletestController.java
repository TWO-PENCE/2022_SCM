package kr.happyjob.study.sampletest.controller;

import java.io.File;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import kr.happyjob.study.common.comnUtils.ComnCodUtil;
import kr.happyjob.study.sampletest.model.Sam6list;

import kr.happyjob.study.sampletest.service.SampletestService;;

@Controller
@RequestMapping("/sampletest/")
public class sampletestController {
   
   @Autowired
   SampletestService sampletestService;
   
   // Set logger
   private final Logger logger = LogManager.getLogger(this.getClass());

   // Get class name for logger
   private final String className = this.getClass().toString();
   
   
   @RequestMapping("samplepage1.do")
   public String samplepage1(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage1";
   }
     

   @RequestMapping("samplepage2.do")
   public String samplepage2(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage2";
   }
   

   @RequestMapping("samplepage3.do")
   public String samplepage3(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage3";
   }
   

   @RequestMapping("samplepage4.do")
   public String samplepage4(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage4";
   }
   

   @RequestMapping("samplepage5.do")
   public String samplepage5(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage5";
   }
   
   

   
   
   
   
   
   
   
   @RequestMapping("samplepage6.do")
   public String samplepage6(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".samplepage6");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".samplepage6");

      return "sampletest/samplepage6";
   }
     
   
   @RequestMapping("samplepage6list.do")
   public String samplepage6list(Model model, @RequestParam Map<String, Object> rparm) throws Exception {
	   
	   logger.info("+ Start " + className + ".samplepage6list");
	   logger.info("   - rparm : " + rparm);
	  	
	   int pagenum = Integer.parseInt((String) rparm.get("pagenum"));
	   int pagesize = Integer.parseInt((String) rparm.get("pagesize"));
	   int pageindex = (pagenum - 1) * pagesize;
	   
	   rparm.put("pagesize", pagesize);
	   rparm.put("pageindex", pageindex);
	   
	   List<Sam6list> searchlist = sampletestService.samplepage6list(rparm);
	   model.addAttribute("searchlist", searchlist);
	   
	   int totalcnt = sampletestService.samplepage6listtotcant(rparm);
	   
	   model.addAttribute("totalcnt", totalcnt);
	   
	   logger.info("+ End " + className + ".samplepage6list");	   	  
	   
	   return "sampletest/samplepage6list";
   }
   
   
   @RequestMapping("samplepage6selectone.do")
   @ResponseBody
   public Map<String,Object> samplepage6selectone(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
	         HttpServletResponse response, HttpSession session) throws Exception {
	   
      logger.info("+ Start " + className + ".samplepage6selectone");
      logger.info("   - paramMap : " + paramMap);
      
      Map<String,Object> returnval = new HashMap<String,Object>();
      
      Sam6list resultone = sampletestService.samplepage6selectone(paramMap);
      returnval.put("resultone", resultone);
      
      logger.info("+ End " + className + ".samplepage6selectone");

	  return returnval; 
   }
   
   @RequestMapping("samplepage6save.do")
   @ResponseBody
   public Map<String,Object> samplepage6save(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
	         HttpServletResponse response, HttpSession session) throws Exception {
	      
	      logger.info("+ Start " + className + ".samplepage6save");
	      logger.info("   - paramMap : " + paramMap);
	      
	      String action = (String) paramMap.get("action");
	      
	      Map<String,Object> returnval = new HashMap<String,Object>();
	      
	      paramMap.put("loginID",session.getAttribute("loginId"));
	      
	      
	      if("I".equals(action)) {
	    	  sampletestService.samplepage6insert(paramMap,request);
	      } else if("U".equals(action)) {
	    	  sampletestService.samplepage6update(paramMap,request);
	      } else if("D".equals(action)) {
	    	  sampletestService.samplepage6delete(paramMap);
	      }
	      
	      returnval.put("result", "SUCCESS");
	      
	      
	      logger.info("+ End " + className + ".samplepage6save");  
	      
	      return returnval;
	   
   }

   @RequestMapping("samplepage7.do")
   public String samplepage7(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage7";
   }
   

   @RequestMapping("samplepage8.do")
   public String samplepage8(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage8";
   }
   

   @RequestMapping("samplepage9.do")
   public String samplepage9(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage9";
   }
   

   @RequestMapping("samplepage10.do")
   public String samplepage10(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
         HttpServletResponse response, HttpSession session) throws Exception {
      
      logger.info("+ Start " + className + ".initComnCod");
      logger.info("   - paramMap : " + paramMap);
      
      logger.info("+ End " + className + ".initComnCod");

      return "sampletest/samplepage10";
   }
   
   @RequestMapping("samplepage6download.do")
   public void samplepage6download(Model model, @RequestParam Map<String, Object> paramMap, HttpServletRequest request,
			HttpServletResponse response, HttpSession session) throws Exception {
	
		logger.info("+ Start " + className + ".samplepage6download");
		logger.info("   - paramMap : " + paramMap);
		
		// 첨부파일 조회
		Sam6list resultone = sampletestService.samplepage6selectone(paramMap);
		
		byte fileByte[] = FileUtils.readFileToByteArray(new File(resultone.getPhygical_path()));
		
		response.setContentType("application/octet-stream");
	    response.setContentLength(fileByte.length);
	    response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(resultone.getFile_name(),"UTF-8")+"\";");
	    response.setHeader("Content-Transfer-Encoding", "binary");
	    response.getOutputStream().write(fileByte);
	     
	    response.getOutputStream().flush();
	    response.getOutputStream().close();

		logger.info("+ End " + className + ".samplepage6download");
	}   
   
     
   
   
   
   
   
   
   
}