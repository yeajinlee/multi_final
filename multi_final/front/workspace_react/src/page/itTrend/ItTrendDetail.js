import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import './itTrendDetail.scss'
import axios from 'axios';

const ItTrendDetail = () => {
    const { title } = useParams();
    console.log(title);
    const navigate = useNavigate(); 
    const BackToItTrendMain = () => {
        navigate('/itTrend');
      };
    const [trendDetail, setTrendDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8085/itTrend/${title}`);
                setTrendDetail(response.data);
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    if(loading) {
        return <div>트렌드 기사 내용을 불러오는 중</div>
    }
    if (error) {
        return (
            <div>
                오류가 발생했습니다. 관리자에게 문의해주세요.
                <button className='detailButton' value="목록으로" onClick={BackToItTrendMain} > </button>
            </div>
        );
    }
    if(!trendDetail) {
        return (
            <div>
                오류가 발생했습니다. 관리자에게 문의해주세요.
                <button className='detailButton' value="원문보기" onClick={() => window.open(`${trendDetail.url}`, "_blank")}> </button>
                <button className='detailButton' value="목록으로" onClick={BackToItTrendMain} > </button>
            </div>
        );
    }

    if(trendDetail.summary === " ") {
        return (
            <div>
                <h3>{trendDetail.title}</h3>
                <div><img src={trendDetail.urlToImage} alt="" width={500}></img></div>
                본문 요약 보기를 지원하지 않는 기사입니다.<br/>
                {/* <div>{trendDetail.description}</div> */}
                {trendDetail.content}
                <input type="button" value="원문보기" onClick={() => window.open(`${trendDetail.url}`, "_blank")}/>
                <input type="button" value="목록으로" onClick={BackToItTrendMain} />
            </div>
        );
    }

    return(
        <div id="itTrendDetailAll" className='detailMain'>
            <p>{trendDetail.title}</p>
            <div>
                <img src={trendDetail.urlToImage} alt="" />
            </div>
            <div className='trendContent'>
                {trendDetail.summary.split('\\n').map((line) => {
                    return (
                        <div>
                            {line}<br/>
                        </div>
                    );
                })}
                {/* {trendDetail.summary} */}
            </div>
            <div >
            <button className='detailButton' value="원문보기" onClick={() => window.open(`${trendDetail.url}`, "_blank")}>
                원문보기</button>
            <button className='detailButton' value="목록으로" onClick={BackToItTrendMain} >목록으로</button>
            </div>
        </div>    
    ); 
};

export default ItTrendDetail;