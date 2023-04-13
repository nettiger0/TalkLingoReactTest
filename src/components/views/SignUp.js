import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const SignUp = () =>{
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [email, setEmail] = useState('');

    const history = useNavigate();
    
    // axios 임시
     const onSubmit = async (e) => {
        e.preventDefault();
        /**검증 로직 만들기
         * 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
         * 2. 약관 동의를 확인한다.
         */
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log({
            id,
            password,
            passwordCheck,
            name,
            gender,
            birth,
            email,
            term
        });
        try {
            const response = await axios.post('http://localhost:8080/user/join', {
              id,
              password,
              name,
              birth,
              email,
              gender
            });
      
            if (response.data.success) {
              sessionStorage.setItem('user', JSON.stringify(response.data.user));
              history.push('/');
            } else {
              alert('Signup failed');
            }
          } catch (error) {
            console.error('Signup error:', error);
            alert("회원가입 오류!")
          }
    }; 


    // 세션 스토리지에 회원가입 정보 저장
    /*
    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== passwordCheck){
            return setPasswordError(true);
        }
         if(!term){
            return setTermError(true);
        }
        console.log({
            id,
            name,
            password,
            passwordCheck,
            gender,
            birth,
            term
        });

        sessionStorage.setItem('user', JSON.stringify({ id, password, name, gender, email }));

        if(sessionStorage.getItem("user") != null) {
           history('/');
        }
    } */

    // Coustom Hook 이전
    const onChangeId = (e) => {
        setId(e.target.value);
    };
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordChk = (e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };
    const onChangeTerm = (e) => {
        //체크박스 초기화
        setTermError(false);
        setTerm(e.target.checked);
    };

    const onChangeGender = (e) => {
        setGender(e.target.value)
    }

    const onChangeBirth = (e) => {
        setBirth(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <Container>
          <h1>Sign Up</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="user_id">아이디</Form.Label>
              <Form.Control name="user_id" value={id} required onChange={onChangeId} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="user_pw">비밀번호</Form.Label>
              <Form.Control
                name="user_pw"
                type="password"
                value={password}
                required
                onChange={onChangePassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="user-password-check">비밀번호체크</Form.Label>
              <Form.Control
                name="user-password-check"
                type="password"
                value={passwordCheck}
                required
                onChange={onChangePasswordChk}
              />
              {passwordError && (
                <Alert variant="danger">비밀번호가 일치하지 않습니다.</Alert>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="user_name">이름</Form.Label>
              <Form.Control name="user_name" value={name} required onChange={onChangeName} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="user_birth">나이</Form.Label>
              <Form.Control
                type="date"
                name="user_birth"
                value={birth}
                onChange={onChangeBirth}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="user_email">이메일</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                value={email}
                onChange={onChangeEmail}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="user_gender">성별</Form.Label>
              <Form.Control
                as="select"
                name="user_gender"
                value={gender}
                onChange={onChangeGender}
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                name="user-term"
                value={term}
                onChange={onChangeTerm}
                label="동의 합니까?"
              />
              {termError && (
                <Alert variant="danger">약관에 동의하셔야 합니다.</Alert>
              )}
            </Form.Group>
            <Button type="primary" htmltype="submit">
              가입하기
            </Button>
          </Form>
          <div style={{ marginTop: 10 }}>
            <Link to="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </div>
        </Container>
      );
    };

export default SignUp;