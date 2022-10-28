import {useState} from 'react';
import {Alert} from 'react-native';
import client from '../api/client';
import ItemEmpty from '../lib/ItemEmpty';

/*
post 요청(url, null, 데이터)
get 요청(url, 데이터)
*/
// client
//   .post('/test', null, {params: {email: 'test1@first.com'}})
//   .then(console.log('안녕'))
//   .catch(errer => console.log(errer));

// const test = {
//   email: 'test5@first.com',
//   password: 't123456@',
//   name: 'test5',
//   birthday: '2022-10-28',
//   gender: '남',
//   phone: '01049937334',
//   profileImage: null,
//   nickname: 'test5',
//   introduce: '',
// };

// client
//   .get('/member', {params: {...test, choice: 1}})
//   .then(res => console.log(res))
//   .catch(errer => console.log(errer));

const Auth = {
  //회원가입 - 회원 정보 , choice 1
  async join(value) {
    console.log('join');
    const data = await client
      .post('/member', null, {params: {...value, choice: 1}})
      .then(res => {
        Alert.alert(res.data[0], res.data[1]);
        return res;
      })
      .catch(error => console.log(error));
    return data.data[2];
  },

  //로그인 - 이메일 and 비밀번호  , choice 2
  async login(value) {
    console.log('login');
    const data = await client
      .post('/member', null, {params: {...value, choice: 2}})
      .then(res => {
        if (ItemEmpty.check(res.data)) {
          return res.data;
        } else {
          Alert.alert('실패', '아이디 또는 비밀번호가 틀렸습니다.');
          return null;
        }
      })
      .catch(error => console.log(error));
    return data;
  },

  //로그아웃
  logout() {
    setUser(null);
  },

  //특정 회원 조회 - 이메일 , choice 3
  async selectMember(value) {
    console.log('selectMember');
    const data = await client
      .get('/member', {params: {...value, choice: 3}})
      .then(res => {
        if (ItemEmpty.check(res.data)) {
          return res.data;
        } else {
          return null;
        }
      })
      .catch(error => console.log(error));
    return data;
  },

  //회원 정보 수정(이름, 생일, 닉네임, 소개, 전화번호, 프로필 사진) - 이메일 , choice 4
  async updateMember(value) {
    console.log('updateMember');
    const data = await client
      .post('/member', null, {params: {...value, choice: 4}})
      .then(res => {
        Alert.alert(res.data[0], res.data[1]);
        return res;
      })
      .catch(error => console.log(error));
    return data.data[2];
  },

  //전체 회원 조회 , choice 5
  async selectMemberList() {
    console.log('selectMemberList');
    const data = await client
      .get('/member', null, {params: {choice: 4}})
      .then(res => {
        if (ItemEmpty.check(res.data)) {
          return res.data;
        } else {
          return null;
        }
      })
      .catch(error => console.log(error));
    return data;
  },

  //게시물 등록 - 게시물 정보
  async insertPost(value) {
    await client.post();
  },

  //게시물 수정(내용, 날짜) - 해당 게시물 번호
  async updatePost(value) {
    await client.post();
  },

  //게시물 삭제 - 해당 게시물 번호
  async deletePost(value) {
    await client.post();
  },

  //특정 회원이 올린 게시물 조회(개수도 필요) - email
  async selectMemberPost(value) {
    await client.get();
  },

  //전체 게시물 조회
  async selectPost(value) {
    await client.get();
  },

  //댓글 등록(null, 닉네임, 내용, Date, 작성자 이메일, 해당 게시물 번호)
  async insertComment(value) {
    await client.post();
  },

  //특정 게시물의 댓글들(개수) 조회
  async selectPostComment(value) {
    await client.get();
  },

  //좋아요 등록(해당 게시물 번호, 좋아요한 이메일)
  async insertLiking(value) {
    await client.post();
  },

  //좋아요 삭제 - 해당 게시물 번호 and 좋아요한 이메일
  async deleteLiking(value) {
    await client.post();
  },

  //특정 게시물 좋아요들(개수) 조회 - 해당 게시물 번호
  async selectPostLiking(value) {
    await client.get();
  },

  //팔로우 등록(이메일, 팔로우 당한 이메일)
  async insertFollow(value) {
    await client.post();
  },

  //팔로우 삭제 - 이메일 and 팔로우 삭제 당하는 이메일
  async deleteFollow(value) {
    await client.post();
  },

  //팔로잉(개수) 조회 - from_이메일(내가 팔로우한 사람들)
  async selectFromFollow(value) {
    await client.get();
  },

  //팔로워(개수) 조회 - to이메일(다른 사람이 날 팔로우 한 사람들)
  async selectToFollow(value) {
    await client.get();
  },
};

export default Auth;
