import { addLPDto, RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth"
import { axiosInstance } from "./axios";

//auth
export const postSignup = async (
    body:RequestSignupDto
    ):Promise<ResponseSignupDto> => {
    const{data} =  await axiosInstance.post("/v1/auth/signup", body);

    return data;
} //회원가입

export const postSignin = async (
    body:RequestSigninDto
    ):Promise<ResponseSigninDto> => {
    const{data} =  await axiosInstance.post('/v1/auth/signin',body);

    return data;
}//로그인

export const postSignout = async() => {
    const {data} = await axiosInstance.post('/v1/auth/signout');
    return data;
}

//users
export const getMyInfo = async ():Promise<ResponseMyInfoDto> => {
    console.log('getMyInfo 호출')
    const{data} = await axiosInstance.get('/v1/users/me');

    return data;
} //내 정보 조회회

export const delemteMyAccount = async () => {
    console.log('delemteMyAccount 호출')
    const{data} = await axiosInstance.delete('/v1/users');

    return data;
}//회원 탈퇴퇴

export const updateMyInfo = async (body: {name: string, bio: string, avatar:File}) => {
    console.log('updateMyInfo 호출')
    const{data} = await axiosInstance.patch('/v1/users', body);

    return data;
}//내 정보 수정


//lps
export const postLP = async ( body: addLPDto) => {
    const{data} = await axiosInstance.post('/v1/lps', body);

    return data;
} //lp 생성

export const updateLP = async ({body, id}: {body:addLPDto, id: string}) => {
    const{data}= await axiosInstance.patch(`/v1/lps/${id}`, body);

    return data;
} //lp 수정

export const deleteLP = async (id:string) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${id}`);

    return data;
}// lp 삭제

export const getLPs = async({pageParam = null, order}: {pageParam: string | null, order: 'asc' | 'desc'}) => {
    const cursor = pageParam ?? 0 ;
    const {data} = await axiosInstance.get('/v1/lps',{
        params: {
            cursor,
            limit: 10,
            order
        }
    })
    return data;
}//lp 목록 조회

//comments
export const getComments = async({ pageParam = null, id, order }: { pageParam: string | null, id: string, order: 'asc' | 'desc' }) => {
    const cursor = pageParam ?? 0 ;
    const {data} = await axiosInstance.get(`/v1/lps/${id}/comments`,{
        params: {
            cursor,
            limit: 10,
            order
        }
    })
    return data;
} //댓글 목록 조회

export const postLPComment = async ({id, comment}: {id:string, comment:string}) => {
    const {data} = await axiosInstance.post(`/v1/lps/${id}/comments`, {content: comment});

    return data;
}//댓글 생성

export const deleteLPComment = async ({lpId, commentId}: {lpId:string, commentId:string}) => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`)

    return data;
}//댓글 삭제

export const changeLPComment = async ({lpId, commentId, comment}: {lpId:string, commentId:string, comment:string}) => {
    const {data} = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {content: comment})

    return data;    
}//댓글 수정


//likes
export const postLike = async(id:string) => {
    const {data}=await axiosInstance.post(`/v1/lps/${id}/likes`);

    return data;
} //좋아요

export const deleteLike = async(id:string) => {
    const {data}=await axiosInstance.delete(`/v1/lps/${id}/likes`);

    return data;
} //좋아요 취소

export const likeList = async()=>{
    const {data} = await axiosInstance.get('/v1/lps/likes/me');

    return data
}//내가 좋아요한 목록 조회회