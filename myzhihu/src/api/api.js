import axios from 'axios'


/**
 * 获取所有新闻列表
 */
export const getNews = () => {
    var random = ("?v=" + Math.random()).replace(".","");
    return axios.get('/api/4/news/latest'+random).then(res => res.data);
}

/**
 * 获取历史消息
 */
export const getHistoryNews = (params) => {
    return axios.get(`/api/4/news/before/${params.data}`).then(res => res.data);
}


/**
 * 获取主题信息
 */
export const getThemes = () => {
    return axios.get('/api/4/themes').then(res => res.data);
}

/**
 * 获取详细信息
 */
export const getNewsDetail = (params) => {
    return axios.get('/api/4/news/'+params.id).then(res => res.data);
}
