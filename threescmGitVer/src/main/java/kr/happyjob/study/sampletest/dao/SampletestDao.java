package kr.happyjob.study.sampletest.dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.happyjob.study.sampletest.model.Sam6list;

public interface SampletestDao {
	
	/** 목록 */	
	public List<Sam6list> samplepage6list(Map<String, Object> paramMap) throws Exception;

	/** 건수 */	
	public int samplepage6listtotcant(Map<String, Object> paramMap) throws Exception;
	
	// 한건조회
	public Sam6list samplepage6selectone(Map<String, Object> paramMap) throws Exception;
	
	// 등록
	public void samplepage6insert(Map<String, Object> paramMap) throws Exception;
	
	// 수정
	public void samplepage6update(Map<String, Object> paramMap) throws Exception;
	
	//삭제
	public void samplepage6delete(Map<String, Object> paramMap) throws Exception;
			
	
}
