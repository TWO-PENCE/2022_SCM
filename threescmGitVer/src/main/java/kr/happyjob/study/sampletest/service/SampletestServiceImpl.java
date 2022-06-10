package kr.happyjob.study.sampletest.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.happyjob.study.common.comnUtils.FileUtilCho;
import kr.happyjob.study.common.comnUtils.ComnUtil;
import kr.happyjob.study.sampletest.model.Sam6list;

import kr.happyjob.study.sampletest.dao.SampletestDao;

@Service("SampletestService")
public class SampletestServiceImpl implements SampletestService {

	// Set logger
	private final Logger logger = LogManager.getLogger(this.getClass());
	
	@Autowired
	private SampletestDao sampletestDao;
	
	@Value("${fileUpload.rootPath}")
	private String rootPath;
	
	@Value("${fileUpload.virtualRootPath}")
	private String virtualRootPath;
	
	@Value("${fileUpload.noticePath}")
	private String noticePath;
	
	/** 목록*/
	public List<Sam6list> samplepage6list(Map<String, Object> paramMap) throws Exception {
		return sampletestDao.samplepage6list(paramMap);
	}

	
	/** 목록*/
	public int samplepage6listtotcant(Map<String, Object> paramMap) throws Exception {
		return sampletestDao.samplepage6listtotcant(paramMap);
	}	

	/** 한건 조회*/
	public Sam6list samplepage6selectone(Map<String, Object> paramMap) throws Exception {
		return sampletestDao.samplepage6selectone(paramMap);
	}
	
	// 등록
	public void samplepage6insert(Map<String, Object> paramMap,HttpServletRequest request) throws Exception {
		
		MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
		
		String itemFilePath = noticePath + File.separator; // 업로드 실제 경로 조립 (무나열생성)
		FileUtilCho fileUtil = new FileUtilCho(multipartHttpServletRequest, rootPath, itemFilePath);
		Map<String, Object> fileInfo = fileUtil.uploadFiles(); // 실제 럽로드 처리
		
        //map.put("file_nm", file_nm);
        //map.put("file_size", file_Size);
        //map.put("file_loc", file_loc);
        //map.put("fileExtension", fileExtension);
		
		if(fileInfo == null) {
			paramMap.put("file_name","");    
			paramMap.put("logical_path", "" );                          
			paramMap.put("phygical_path","");    
			paramMap.put("file_size","");   
		} else {
			paramMap.put("file_name",fileInfo.get("file_nm"));    
			paramMap.put("logical_path", virtualRootPath + File.separator + itemFilePath + fileInfo.get("file_nm") );                          
			paramMap.put("phygical_path",fileInfo.get("file_loc"));    
			paramMap.put("file_size",fileInfo.get("file_size"));   
		}
		
 

		logger.info("file_name : " + paramMap.get("file_name")); 
		logger.info("logical_path : " + paramMap.get("logical_path"));   
		logger.info("phygical_path : " + paramMap.get("phygical_path"));   
		logger.info("file_size : " + paramMap.get("file_size"));   
		  		
		
		
		sampletestDao.samplepage6insert(paramMap);
	}
	
	// 수정
	public void samplepage6update(Map<String, Object> paramMap,HttpServletRequest request) throws Exception {
		
		MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
		
		String itemFilePath = noticePath + File.separator; // 업로드 실제 경로 조립 (무나열생성)
		FileUtilCho fileUtil = new FileUtilCho(multipartHttpServletRequest, rootPath, itemFilePath);
		Map<String, Object> fileInfo = fileUtil.uploadFiles(); // 실제 럽로드 처리
		
		
		paramMap.put("no",paramMap.get("noticeno"));
		
		Sam6list resultone = sampletestDao.samplepage6selectone(paramMap);
		
		if(!"".equals(resultone.getFile_name())) {
			File uploadfilr = new File(resultone.getPhygical_path());
			uploadfilr.delete();
		}
		
		
        //map.put("file_nm", file_nm);
        //map.put("file_size", file_Size);
        //map.put("file_loc", file_loc);
        //map.put("fileExtension", fileExtension);
		
		if(fileInfo == null) {
			paramMap.put("file_name","");    
			paramMap.put("logical_path", "" );                          
			paramMap.put("phygical_path","");    
			paramMap.put("file_size","");   
		} else {
			paramMap.put("file_name",fileInfo.get("file_nm"));    
			paramMap.put("logical_path", virtualRootPath + File.separator + itemFilePath + fileInfo.get("file_nm") );                          
			paramMap.put("phygical_path",fileInfo.get("file_loc"));    
			paramMap.put("file_size",fileInfo.get("file_size"));   
		}  

		logger.info("file_name : " + paramMap.get("file_name")); 
		logger.info("logical_path : " + paramMap.get("logical_path"));   
		logger.info("phygical_path : " + paramMap.get("phygical_path"));   
		logger.info("file_size : " + paramMap.get("file_size")); 
		
		sampletestDao.samplepage6update(paramMap);
	}
		
	// 삭제
	public void samplepage6delete(Map<String, Object> paramMap) throws Exception {
		
		paramMap.put("no",paramMap.get("noticeno"));
		
		Sam6list resultone = sampletestDao.samplepage6selectone(paramMap);
		
		if(!"".equals(resultone.getFile_name())) {
			File uploadfilr = new File(resultone.getPhygical_path());
			uploadfilr.delete();
		}
		
		sampletestDao.samplepage6delete(paramMap);
	}	
}
