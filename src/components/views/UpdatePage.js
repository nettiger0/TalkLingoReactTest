import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

const Update = () => {
    const storedUser = sessionStorage.getItem("user");
	let storedId, storedName, storedAge, storedGender = "";
    
    // sessionStorage에서 값 불러오기
	if (storedUser) {
		const {id, name, gender, age} = JSON.parse(storedUser);
        storedId = id;
		storedName = name;
        storedGender = gender;
        storedAge = age;
        
	}

    const [id,setId] = useState(storedId);
    const [name,setName] = useState(storedName);
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [gender, setGender] = useState(storedGender);
    const [age, setAge] = useState(storedAge);

    const history = useNavigate();
    
    // axios 임시
    //  const onSubmit = async (e) => {
    //     e.preventDefault();
    //     /**검증 로직 만들기
    //      * 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
    //      * 2. 약관 동의를 확인한다.
    //      */
    //     if(password !== passwordCheck){
    //         return setPasswordError(true);
    //     }
    //     if(!term){
    //         return setTermError(true);
    //     }
    //     console.log({
    //         id,
    //         nick,
    //         password,
    //         passwordCheck,
    //         gender,
    //         age,
    //         term
    //     });
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/signup', {
    //           id,
    //           nick,
    //           password,
    //           gender,
    //           age,
    //         });
      
    //         if (response.data.success) {
    //           sessionStorage.setItem('user', JSON.stringify(response.data.user));
    //           history.push('/login');
    //         } else {
    //           alert('Signup failed');
    //         }
    //       } catch (error) {
    //         console.error('Signup error:', error);
    //         alert("회원가입 오류!")
    //       }
    // }; 

    //Submit 버튼 동작
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
            age,
            term
        });

        sessionStorage.setItem('user', JSON.stringify({ id, password, name, gender, age }));

        if(sessionStorage.getItem("user") != null) {
           history('/');
        }
        
    }

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

    const onChangeAge = (e) => {
        setAge(e.target.value)
    }

    return (
        <>
        <form onSubmit={onSubmit} style={{padding:10}}>
            <div>
                <label htmlFor="user-id">아이디</label><br/>
                <input name="user-id" value={id} required onChange={onChangeId} readOnly />
            </div>
            <div>
                <label htmlFor="user-name">이름</label><br/>
                <input name="user-name" value={name} required onChange={onChangeName} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label><br/>
                <input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호체크</label><br/>
                <input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordChk} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            <div>
                <label htmlFor='gender'>성별</label><br/>
                <select name='gender' value={gender} onChange={onChangeGender}>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
            </div>
            <div>
                <label htmlFor='age'>나이</label><br/>
                <input type='number' name='age' onChange={onChangeAge} required></input>
            </div>
            <div>
                <input type='checkbox' name="user-term" value={term} onChange={onChangeTerm} />동의 합니까?
                {termError && <div style={{color : 'red'}}>약관에 동의하셔야 합니다.</div>}
            </div>
            <div style={{marginTop:10}}>
                <button type="primary" htmltype="submit" >가입하기</button>
            </div>
        </form>
        <div>
            <Link to='/'>
                <button>홈으로 돌아가기</button>
            </Link>
        </div>
        </>
    );
};

export default Update;