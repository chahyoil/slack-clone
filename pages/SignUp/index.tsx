import useInput from '@hooks/useInput';
import React, { useCallback, useState, VFC } from "react";
import axios from "axios";
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router";

const SignUp = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 1000 * 60,
  });

  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);


  const onChangePassword =  useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck)
  }, [passwordCheck]);

  const onChangePasswordCheck =  useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password);
  }, [password]);

  const onSubmit =  useCallback((e) => {
    e.preventDefault();
    console.log(email, nickname, password, passwordCheck);

    if(!mismatchError && nickname) {
      console.log('서버로 회원가입 신청');
      setSignUpError(false);
      setSignUpSuccess(false);
      axios.post('http://localhost:3095/api/users', {
        email,
        nickname,
        password,
      })
        .then((res) => {
          console.log(res);
          setSignUpSuccess(true);
        }).catch((error) => {
          console.log(error.response);
          setSignUpError(true);
        }).finally(() => {})
    }

  }, [email, nickname, password, passwordCheck, mismatchError]);

  if(data) {
    return <Redirect to={"/workspace/channel"} />
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  )
}

export default SignUp;